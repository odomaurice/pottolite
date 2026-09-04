"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  City01Icon,
  Layers01Icon,
  Rocket01Icon,
  School01Icon,
} from "@hugeicons/core-free-icons";
import SectionCaption from "@/components/SectionCaption";

/**
 * Subscription plans.
 *
 * ── COPY NEEDS SIGN-OFF ──────────────────────────────────────────────────
 * These four descriptions say who each plan is FOR, not what it includes,
 * and that is deliberate. The reference mock's descriptions were recycled
 * from the Solutions section — all four carried word-for-word the same
 * paragraph — so there is no real tier definition to copy from, and
 * inventing entitlements ("bus attendance on Basic", "priority response on
 * Enterprise") would put commercial promises on a live page that nobody has
 * agreed to. Audience descriptors commit to nothing while still telling a
 * visitor which card is theirs.
 *
 * When the team has the real tiers, the feature lists and prices drop in
 * under `body` and this note goes away.
 * ─────────────────────────────────────────────────────────────────────────
 */
const PLANS = [
  {
    name: "Free",
    icon: Rocket01Icon,
    body: "For schools trying Potto for the very first time, on a single class, at no cost.",
    href: "/register?plan=free",
  },
  {
    name: "Basic",
    icon: School01Icon, // one school
    body: "For a single school running day-to-day student safety across every class.",
    href: "/register?plan=basic",
  },
  {
    name: "Suite",
    icon: Layers01Icon, // the whole stack of products, not just security
    body: "For schools that want the whole Potto toolkit on one account, not just security.",
    href: "/register?plan=suite",
  },
  {
    name: "Enterprise",
    icon: City01Icon, // many buildings — groups and multi-campus
    body: "For groups, multi-campus institutions and anyone needing a bespoke deployment.",
    href: "/register?plan=enterprise",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function PlansSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

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
      <div ref={ref} className="mx-auto w-full mt-24 max-w-7xl px-5 md:px-6 lg:px-8">
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

        
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {PLANS.map((plan, i) => (
            <motion.article
              key={plan.name}
              {...reveal(0.3 + i * 0.1)}
              className="group relative flex flex-col rounded-3xl bg-brand-teal-dark px-6 py-20 text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-brand-teal hover:shadow-2xl"
            >
              <span
                aria-hidden
                className="grid absolute top-8 right-8 h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/10 transition duration-300 group-hover:bg-white/20"
              >
                <HugeiconsIcon icon={plan.icon} size={36} strokeWidth={1.9} />
              </span>

              <h3 className="mt-6 font-header text-2xl font-extrabold tracking-tight lg:text-3xl">
                {plan.name}
              </h3>

              <p className="mt-4 text-sm leading-6 text-white/80">
                {plan.body}
              </p>

              <Link
                href={plan.href}
                aria-label={`Choose the ${plan.name} plan`}
                className="mt-auto inline-flex h-10 px-4 shrink-0 items-center justify-center  self-start rounded-full bg-brand-yellow text-white transition duration-300 group-hover:scale-105 text-sm group-hover:bg-brand-yellow"
                style={{ marginTop: "36px" }}
              >
                {/* <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  size={20}
                  strokeWidth={2.6}
                />  */}
                Click to Activate
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
