"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  AnalyticsUpIcon,
  DashboardSpeed01Icon,
  SquareLock01Icon,
  UserGroupIcon,
  ViewIcon,
} from "@hugeicons/core-free-icons";
import SectionCaption from "@/components/SectionCaption";

const BENEFITS = [
  {
    icon: DashboardSpeed01Icon,
    title: "Streamlined operations",
    body: "Staff records, leave, visitors and messages run through one system instead of paper and spreadsheets.",
  },
  {
    icon: UserGroupIcon,
    title: "Improved collaboration",
    body: "Email, SMS and WhatsApp from one place keep every team working from the same information.",
  },
  {
    icon: SquareLock01Icon,
    title: "Secure file handling",
    body: "IDs, certificates and staff documents are stored digitally, with access recorded in the audit log.",
  },
  {
    icon: ViewIcon,
    title: "Real-time monitoring",
    body: "The dashboard shows your workforce at a glance — headcount, expected hours and activity.",
  },
  {
    icon: AnalyticsUpIcon,
    title: "Better decision-making",
    body: "Printable reports and a complete activity trail put the facts behind every decision.",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function BenefitsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: 22 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
    transition: { duration: 0.65, delay, ease },
  });

  return (
    <section
      id="benefits"
      data-nav-tone="light"
      data-nav-bg="var(--canvas)"
      className="relative py-24 text-ink md:py-32"
    >
      <div ref={ref} className="mx-auto w-full max-w-7xl px-5 md:px-6 lg:px-8">
        <SectionCaption {...reveal(0)}>Benefits</SectionCaption>

        <motion.h2
          {...reveal(0.12)}
          className="mx-auto mt-7 max-w-4xl text-center font-header text-4xl leading-[1.06] font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
        >
          Why teams choose <span className="text-brand">Pottolite</span>
        </motion.h2>

        <div className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12 xl:grid-cols-5">
          {BENEFITS.map((benefit, i) => (
            <motion.article key={benefit.title} {...reveal(0.3 + i * 0.12)}>
              <div className="relative mt-2 flex h-20 items-end sm:h-24">
                <span
                  aria-hidden
                  className="pointer-events-none absolute top-0 left-0 font-header text-[4.5rem] leading-none font-extrabold tracking-tight text-brand/15 select-none sm:text-[5.5rem]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <HugeiconsIcon
                  icon={benefit.icon}
                  size={40}
                  strokeWidth={1.6}
                  className="relative ml-1 text-brand"
                />
              </div>

              <h3 className="mt-8 font-header text-xl leading-snug font-extrabold tracking-tight">
                {benefit.title}
              </h3>
              <p className="mt-4 text-[0.95rem] leading-8 text-soft">
                {benefit.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
