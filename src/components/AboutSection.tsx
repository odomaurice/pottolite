"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  DashboardSquare01Icon,
  FileRemoveIcon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons";
import SectionCaption from "@/components/SectionCaption";

const POINTS = [
  {
    icon: UserGroupIcon,
    title: "Built for digital workforce operations",
    body: "A productivity management system that keeps your people, their records and their work in view.",
  },
  {
    icon: DashboardSquare01Icon,
    title: "One centralised platform",
    body: "Staff, communication and reporting live in one place instead of across files, inboxes and spreadsheets.",
  },
  {
    icon: FileRemoveIcon,
    title: "Less paperwork, more transparency",
    body: "Digital records replace manual processes, and every action leaves a trail you can check.",
  },
];

const COMPANY = [
  "A software and digital solutions company",
  "Focused on productivity, efficiency and collaboration",
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: 22 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
    transition: { duration: 0.65, delay, ease },
  });

  return (
    <section
      id="about"
      data-nav-tone="light"
      data-nav-bg="var(--canvas)"
      className="relative py-24 text-ink md:py-32"
    >
      <div ref={ref} className="mx-auto w-full max-w-7xl px-5 md:px-6 lg:px-8">
        <SectionCaption {...reveal(0)}>What is Pottolite?</SectionCaption>

        <div className="mt-12 grid gap-14 lg:grid-cols-[7fr_5fr] lg:gap-16">
          <div>
            <motion.h2
              {...reveal(0.12)}
              className="max-w-2xl font-header text-4xl leading-[1.06] font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
            >
              Your whole workforce, on{" "}
              <span className="text-brand">one dashboard</span>
            </motion.h2>

            <ul className="mt-12 space-y-9">
              {POINTS.map((point, i) => (
                <motion.li
                  key={point.title}
                  {...reveal(0.3 + i * 0.12)}
                  className="flex items-start gap-4"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand text-brand-fg lg:h-14 lg:w-14">
                    <HugeiconsIcon
                      icon={point.icon}
                      size={26}
                      strokeWidth={1.9}
                    />
                  </span>
                  <div>
                    <h3 className="font-header text-lg font-extrabold tracking-tight lg:text-xl">
                      {point.title}
                    </h3>
                    <p className="mt-1.5 max-w-xl text-[0.95rem] leading-7 text-soft">
                      {point.body}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* A tinted fill, not a bordered card: the page avoids frames. */}
          <motion.aside
            {...reveal(0.5)}
            className="self-start rounded-3xl bg-brand/8 p-8 sm:p-10"
          >
            <p className="text-xs font-semibold tracking-[0.22em] text-soft uppercase">
              About Potto Technologies Ltd
            </p>

            <ul className="mt-6 space-y-3">
              {COMPANY.map((line) => (
                <li
                  key={line}
                  className="flex gap-3.5 text-[0.95rem] leading-7 text-ink"
                >
                  <span
                    aria-hidden
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold"
                  />
                  {line}
                </li>
              ))}
            </ul>

            <p className="mt-8 text-xs font-semibold tracking-[0.22em] text-brand uppercase">
              Our mission
            </p>
            <p className="mt-3 font-header text-2xl leading-snug font-extrabold tracking-tight sm:text-3xl">
              Empower organisations with tools that simplify work.
            </p>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
