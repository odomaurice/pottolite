"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import {
  AnimatePresence,
  motion,
  useDragControls,
  useReducedMotion,
} from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";

const ease = [0.22, 1, 0.36, 1] as const;

const subscribeToNothing = () => () => {};
const openStack: symbol[] = [];
const DISMISS_DISTANCE = 120; // px
const DISMISS_VELOCITY = 600; // px/s

export default function Modal({
  open,
  onClose,
  label,
  placement = "center",
  children,
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  placement?: "center" | "bottom";
  children: React.ReactNode;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dragControls = useDragControls();
  const reduced = useReducedMotion();
  const mounted = useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );

  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);
  const close = useCallback(() => onCloseRef.current(), []);

  useEffect(() => {
    if (!open) return;

    const token = Symbol("modal");
    openStack.push(token);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && openStack[openStack.length - 1] === token) {
        close();
      }
    };
    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();

    return () => {
      openStack.splice(openStack.indexOf(token), 1);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open &&
        (placement === "bottom" ? (
          <motion.div
            key="sheet"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            onClick={close}
            className="fixed inset-0 z-100 flex items-end justify-center bg-ink/60 backdrop-blur-sm"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={label}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={
                reduced
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 320, damping: 36 }
              }
              drag="y"
              dragControls={dragControls}
              dragListener={false}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.7 }}
              onDragEnd={(_, info) => {
                if (
                  info.offset.y > DISMISS_DISTANCE ||
                  info.velocity.y > DISMISS_VELOCITY
                ) {
                  close();
                }
              }}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-[92svh] w-full max-w-7xl flex-col rounded-t-[2rem] bg-surface-2 text-ink shadow-2xl"
            >
              <div
                onPointerDown={(e) => dragControls.start(e)}
                className="relative flex h-14 shrink-0 cursor-grab touch-none items-center justify-center active:cursor-grabbing"
              >
                <span aria-hidden className="h-1.5 w-12 rounded-full bg-ink/15" />

                <button
                  ref={closeRef}
                  type="button"
                  onClick={close}
                  onPointerDown={(e) => e.stopPropagation()}
                  aria-label="Close"
                  className="absolute top-1/2 right-4 grid h-9 w-9 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white text-ink/70 shadow-sm transition hover:text-ink sm:right-6"
                >
                  <HugeiconsIcon
                    icon={Cancel01Icon}
                    size={18}
                    strokeWidth={2.2}
                  />
                </button>
              </div>

              {children}
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="dialog"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            className="fixed inset-0 z-100 flex flex-col items-center justify-center gap-5 bg-ink/80 px-4 py-6 backdrop-blur-md md:px-8"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close"
              className="flex shrink-0 cursor-pointer items-center gap-2 self-end rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition hover:border-white/30 hover:bg-white/15 hover:text-white"
            >
              Close
              <HugeiconsIcon icon={Cancel01Icon} size={16} strokeWidth={2} />
            </button>

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{
                type: "spring",
                stiffness: 240,
                damping: 26,
                mass: 0.7,
              }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[86vh] w-full max-w-5xl justify-center"
            >
              {children}
            </motion.div>
          </motion.div>
        ))}
    </AnimatePresence>,
    document.body,
  );
}
