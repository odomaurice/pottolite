"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  City01Icon,
  Layers01Icon,
  Rocket01Icon,
  School01Icon,
} from "@hugeicons/core-free-icons";
import PlanDrawer from "@/components/PlanDrawer";
import SectionCaption from "@/components/SectionCaption";
import { formatPrice, planTagline, planTitle, type Plan } from "@/lib/plans";


const ICONS = {
  free: Rocket01Icon,
  basic: School01Icon,
  suite: Layers01Icon,
  enterprise: City01Icon,
};
const iconFor = (name: string) =>
  ICONS[name.toLowerCase() as keyof typeof ICONS] ?? Layers01Icon;

const ease = [0.22, 1, 0.36, 1] as const;

export default function PlansSection({ plans }: { plans: Plan[] | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const [openId, setOpenId] = useState<string | null>(null);

  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: 22 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
    transition: { duration: 0.65, delay, ease },
  });

  return (
    <section
      id="plans"
      data-nav-tone="light"
      data-nav-bg="var(--canvas)"
      className="relative pt-4 pb-24 text-ink md:pt-5 md:pb-28"
    >
      <div
        ref={ref}
        className="mx-auto mt-24 w-full max-w-7xl px-5 md:px-6 lg:px-8"
      >
        <SectionCaption {...reveal(0)}>Potto Plans</SectionCaption>

        <motion.h2
          {...reveal(0.1)}
          className="mt-7 max-w-3xl font-header text-4xl leading-[1.06] font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
        >
          Amazing Subscriptions for all client types
        </motion.h2>

        <motion.p
          {...reveal(0.2)}
          className="mt-5 max-w-2xl text-base leading-7 text-soft sm:text-lg sm:leading-8"
        >
          Join Potto today by subscribing to one of our amazing plans.
        </motion.p>

        {plans ? (
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            {plans.map((plan, i) => (
              <motion.article
                key={plan.id}
                {...reveal(0.3 + i * 0.1)}
                className="group relative flex flex-col rounded-3xl bg-brand-teal-dark px-6 py-20 text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-brand-teal hover:shadow-2xl"
              >
                <span
                  aria-hidden
                  className="absolute top-8 right-8 grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/10 transition duration-300 group-hover:bg-white/20"
                >
                  <HugeiconsIcon
                    icon={iconFor(plan.name)}
                    size={36}
                    strokeWidth={1.9}
                  />
                </span>

                <h3 className="mt-6 font-header text-2xl font-extrabold tracking-tight lg:text-3xl">
                  {plan.name}
                </h3>

                <p className="mt-4 text-sm leading-6 text-white/80">
                  {planTagline(plan)}
                </p>
                <button
                  type="button"
                  onClick={() => setOpenId(plan.id)}
                  aria-haspopup="dialog"
                  aria-label={`View the ${planTitle(plan)} plan`}
                  className="mt-9 cursor-pointer self-start rounded-full outline-none after:absolute after:inset-0 after:rounded-3xl focus-visible:after:ring-2 focus-visible:after:ring-brand-yellow-light"
                >
                  <span className="inline-flex h-10 items-center gap-2 rounded-full bg-brand-yellow px-4 text-sm font-semibold text-ink transition duration-300 group-hover:scale-105">
                    View plan
                    <HugeiconsIcon
                      icon={ArrowRight01Icon}
                      size={16}
                      strokeWidth={2.4}
                    />
                  </span>
                </button>
              </motion.article>
            ))}
          </div>
        ) : (
          <p className="mt-14 max-w-2xl text-soft">
            Plans are unavailable right now.{" "}
            <a
              href="https://core.potto.ng"
              className="font-semibold text-brand underline underline-offset-4"
            >
              See them on the Potto app
            </a>
            .
          </p>
        )}
      </div>

      {plans && (
        <PlanDrawer
          plans={plans}
          planId={openId}
          onSelect={setOpenId}
          onClose={() => setOpenId(null)}
        />
      )}
    </section>
  );
}
