"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Menu01Icon,
  Cancel01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";
import Wordmark from "@/components/Wordmark";

const navItems = [
  { label: "About", href: "/#about" },
  { label: "Features", href: "/#features" },
  { label: "Benefits", href: "/#benefits" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Team", href: "/#team" },
  { label: "FAQ", href: "/#faq" },
];

const PROBE_Y = 48;
const DEFAULT_NAV = { tone: "light" as const, bg: "var(--canvas)" };

export default function HomeHeader() {
  const [open, setOpen] = useState(false);
  const [nav, setNav] = useState<{ tone: "light" | "dark"; bg: string }>({
    tone: "dark",
    bg: "transparent",
  });
  const onDark = nav.tone === "dark";

  useEffect(() => {
    let ticking = false;

    const compute = () => {
      ticking = false;
      const sections =
        document.querySelectorAll<HTMLElement>("[data-nav-tone]");
      let next = DEFAULT_NAV as { tone: "light" | "dark"; bg: string };

      sections.forEach((section) => {
        const r = section.getBoundingClientRect();
        if (r.top <= PROBE_Y && r.bottom > PROBE_Y) {
          next = {
            tone: section.dataset.navTone === "dark" ? "dark" : "light",
            bg: section.dataset.navBg ?? "transparent",
          };
        }
      });

      setNav(next);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <header
        style={{
          backgroundImage: `linear-gradient(to bottom, ${nav.bg} 55%, transparent)`,
        }}
        className="fixed inset-x-0 top-0 z-50 transition-[background-image] duration-300"
      >
        <div className="flex h-18 w-full items-center justify-between px-5 md:px-8 lg:px-12">
          <Link href="/" aria-label="Pottolite home" className="flex items-center">
            <Wordmark tone={onDark ? "dark" : "light"} priority />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-300 ${
                  onDark
                    ? "text-white/80 hover:bg-white/10 hover:text-white"
                    : "text-soft hover:bg-ink/5 hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/#contact"
              className="hidden animate-glow items-center gap-1.5 rounded-full bg-brand-yellow px-5 py-3 text-sm font-semibold text-ink [--glow:var(--color-brand-yellow)] transition duration-300 hover:bg-brand-yellow-light hover:[--glow:var(--color-brand-yellow-light)] sm:inline-flex lg:px-8 lg:py-4 lg:text-base"
            >
              Talk to us
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={16}
                strokeWidth={2}
              />
            </Link>

            {/* Hamburger — always available on mobile, logged in or out */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className={`grid h-10 w-10 place-items-center rounded-full border transition-colors duration-300 lg:hidden ${
                onDark
                  ? "border-white/15 bg-white/5 text-white hover:bg-white/10"
                  : "border-line bg-surface text-ink hover:bg-surface-2"
              }`}
            >
              <HugeiconsIcon
                icon={open ? Cancel01Icon : Menu01Icon}
                size={19}
                strokeWidth={1.8}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu — matches the dark bar above it */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-3 top-19 z-40 rounded-2xl border border-white/10 bg-ink/95 p-3 shadow-lg backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-2 grid gap-2 border-t border-white/10 pt-3">
                <Link
                  href="/#contact"
                  onClick={() => setOpen(false)}
                  className="rounded-xl bg-brand-yellow px-4 py-2.5 text-center text-sm font-semibold text-ink transition hover:bg-brand-yellow-light"
                >
                  Talk to us
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
