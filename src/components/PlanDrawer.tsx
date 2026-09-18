"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  Cancel01Icon,
  PlayIcon,
  SquareLock02Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import Modal from "@/components/Modal";
import VideoLightbox from "@/components/VideoLightbox";
import { cloudinaryLoader } from "@/lib/cloudinary";
import {
  activateUrl,
  formatPrice,
  planTagline,
  planTitle,
  upgradeFor,
  type Plan,
  type PlanApp,
} from "@/lib/plans";


const PLAN_VIDEO = "/videos/intro.mp4";

const ease = [0.22, 1, 0.36, 1] as const;

function Flag({ on, label }: { on: boolean; label: string }) {
  return (
    <li
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
        on ? "bg-brand/10 text-brand" : "bg-ink/5 text-ink/70"
      }`}
    >
      <HugeiconsIcon
        icon={on ? Tick02Icon : Cancel01Icon}
        size={14}
        strokeWidth={2.4}
        aria-hidden
      />
      {label} {on ? "included" : "not included"}
    </li>
  );
}

function AppCard({
  app,
  upgrade,
  onUpgrade,
}: {
  app: PlanApp;
  upgrade: Plan | null;
  onUpgrade: (planId: string) => void;
}) {
  const included = !app.altUrl;

  return (
    <li className="flex gap-4 rounded-2xl bg-white p-4 sm:p-5">
      {app.icon ? (
        <Image
          src={app.icon}
          loader={cloudinaryLoader}
          alt=""
          width={40}
          height={40}
          className={`h-10 w-10 shrink-0 object-contain ${
            included ? "" : "opacity-40 grayscale"
          }`}
        />
      ) : (
        <span aria-hidden className="h-10 w-10 shrink-0 rounded-xl bg-ink/5" />
      )}

      <div className="min-w-0">
        <p className="flex items-center gap-2 font-header font-extrabold tracking-tight">
          {app.name}
          {!included && (
            <>
              <HugeiconsIcon
                icon={SquareLock02Icon}
                size={15}
                strokeWidth={2}
                className="text-soft"
                aria-hidden
              />
              <span className="sr-only">(not included in this plan)</span>
            </>
          )}
        </p>

        <p className="mt-1 text-sm leading-6 text-soft">{app.desc}</p>

        {!included &&
          (upgrade ? (
            <button
              type="button"
              onClick={() => onUpgrade(upgrade.id)}
              className="mt-3 inline-flex cursor-pointer items-center gap-1 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand transition hover:bg-brand/15"
            >
              Available on {upgrade.name}
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={14}
                strokeWidth={2.4}
                aria-hidden
              />
            </button>
          ) : (
            <p className="mt-3 text-xs font-semibold text-soft">
              Not included in this plan
            </p>
          ))}
      </div>
    </li>
  );
}

export default function PlanDrawer({
  plans,
  planId,
  onSelect,
  onClose,
}: {
  plans: Plan[];
  planId: string | null;
  onSelect: (planId: string) => void;
  onClose: () => void;
}) {
  const plan = plans.find((candidate) => candidate.id === planId) ?? null;
  const [videoOpen, setVideoOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const switchTo = (id: string) => {
    scrollRef.current?.scrollTo({ top: 0 });
    onSelect(id);
  };

  const others = plan ? plans.filter((other) => other.id !== plan.id) : [];
  const apps = plan
    ? [...plan.apps].sort(
        (a, b) => Number(Boolean(a.altUrl)) - Number(Boolean(b.altUrl)),
      )
    : [];
  const includedCount = apps.filter((app) => !app.altUrl).length;
  const tagline = plan ? planTagline(plan) : "";

  return (
    <>
      <Modal
        open={plan !== null}
        onClose={onClose}
        label={plan ? `${planTitle(plan)} plan details` : "Plan details"}
        placement="bottom"
      >
        {plan && (
          <div
            ref={scrollRef}
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-10 sm:px-8 lg:px-12 lg:pb-14"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: reduced ? 0 : 0.25, ease }}
                className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_24rem]"
              >
                {/* ---------- The plan ---------- */}
                <div>
                  <h2 className="font-header text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                    {planTitle(plan)}
                  </h2>
                  <p className="mt-2 font-header text-2xl font-extrabold text-brand sm:text-3xl">
                    {formatPrice(plan.price)}
                  </p>

                  {tagline && (
                    <p className="mt-6 max-w-2xl text-lg leading-snug font-semibold sm:text-xl">
                      {tagline}
                    </p>
                  )}
                  {plan.shortDesc && (
                    <p className="mt-3 max-w-2xl text-sm leading-6 whitespace-pre-line text-soft sm:text-[0.95rem] sm:leading-7">
                      {plan.shortDesc}
                    </p>
                  )}

                  <ul className="mt-5 flex flex-wrap gap-2">
                    <Flag on={plan.onCustomization} label="Customization" />
                    <Flag on={plan.onManagedService} label="Managed service" />
                  </ul>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <a
                      href={activateUrl(plan.id)}
                      className="inline-flex animate-glow items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white [--glow:var(--color-brand-teal)] transition duration-300 hover:bg-brand-teal sm:text-[0.95rem]"
                    >
                      Sign up
                      <HugeiconsIcon
                        icon={ArrowRight01Icon}
                        size={18}
                        strokeWidth={2.4}
                        aria-hidden
                      />
                    </a>

                    <button
                      type="button"
                      onClick={() => setVideoOpen(true)}
                      className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ink shadow-sm transition duration-300 hover:text-brand sm:text-[0.95rem]"
                    >
                      Play video
                      <HugeiconsIcon
                        icon={PlayIcon}
                        size={18}
                        strokeWidth={2.2}
                        aria-hidden
                      />
                    </button>
                  </div>

                  <div className="mt-10 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-xs font-semibold tracking-[0.22em] text-soft uppercase">
                      Featured apps
                    </h3>
                    {includedCount < apps.length && (
                      <p className="text-xs font-semibold text-soft">
                        {includedCount} of {apps.length} included
                      </p>
                    )}
                  </div>

                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {apps.map((app) => (
                      <AppCard
                        key={app.id}
                        app={app}
                        upgrade={upgradeFor(app, plans)}
                        onUpgrade={switchTo}
                      />
                    ))}
                  </ul>
                </div>

                {/* ---------- The other plans ---------- */}
                {others.length > 0 && (
                  <aside className="lg:sticky lg:top-0 lg:self-start">
                    <h3 className="text-xs font-semibold tracking-[0.22em] text-soft uppercase">
                      More plans
                    </h3>

                    <ul className="mt-4 space-y-3">
                      {others.map((other) => (
                        <li key={other.id}>
                          <button
                            type="button"
                            onClick={() => switchTo(other.id)}
                            className="flex w-full cursor-pointer items-center gap-4 rounded-2xl bg-white p-4 text-left shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md"
                          >
                            {other.icon ? (
                              <Image
                                src={other.icon}
                                loader={cloudinaryLoader}
                                alt=""
                                width={56}
                                height={56}
                                className="h-14 w-14 shrink-0 rounded-full object-cover"
                              />
                            ) : (
                              <span
                                aria-hidden
                                className="h-14 w-14 shrink-0 rounded-full bg-brand/10"
                              />
                            )}

                            <span className="min-w-0 flex-1">
                              <span className="block font-header font-extrabold tracking-tight">
                                {other.name}
                              </span>
                              <span className="mt-0.5 line-clamp-2 block text-sm leading-5 text-soft">
                                {planTagline(other)}
                              </span>
                            </span>

                            <span className="flex shrink-0 flex-col items-end gap-1">
                              <span className="font-header font-extrabold text-brand">
                                {formatPrice(other.price)}
                              </span>
                              <HugeiconsIcon
                                icon={ArrowRight01Icon}
                                size={16}
                                strokeWidth={2.2}
                                className="text-soft"
                                aria-hidden
                              />
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </aside>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </Modal>

      <VideoLightbox
        src={PLAN_VIDEO}
        label={plan ? `${planTitle(plan)} video` : "Potto video"}
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
      />
    </>
  );
}
