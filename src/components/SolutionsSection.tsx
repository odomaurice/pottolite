"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  AlarmClockIcon,
  AmbulanceIcon,
  Bus01Icon,
  IdentityCardIcon,
  Message01Icon,
  UserCheck01Icon,
} from "@hugeicons/core-free-icons";
import SectionCaption from "@/components/SectionCaption";

const SOLUTIONS = [
  {
    icon: Bus01Icon,
    title: "Mobility Management",
    body: "Real-time bus activity, arrivals and dismissal, sent to parents by SMS and push notification.",
  },
  {
    icon: UserCheck01Icon,
    title: "Guardian and Visitor Validation",
    body: "Verifies who is dropping off and collecting each child, and schedules every visitor properly.",
  },
  {
    icon: AmbulanceIcon,
    title: "Emergency Management",
    body: "One alert reaches parents, police, fire and medical responders the moment an emergency is raised.",
  },
  {
    icon: AlarmClockIcon,
    title: "Truancy Control",
    body: "Tracks student and staff attendance against the timetable, class by class, and builds a punctuality record.",
  },
  {
    icon: IdentityCardIcon,
    title: "Smart ID Cards",
    body: "Issue RFID cards and QR codes instantly for every enrolled student and staff member.",
  },
  {
    icon: Message01Icon,
    title: "Communication Management",
    body: "Bulk and individual SMS, push notifications and in-app messaging, all from one place.",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function SolutionsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: 22 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
    transition: { duration: 0.65, delay, ease },
  });

  return (
    <section
      id="solutions"
      data-nav-tone="dark"
      data-nav-bg="var(--color-brand-teal-dark)"
      className="relative isolate py-28 text-white md:py-36"
    >
      {/* Ground */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-brand-teal-dark"
      >
        <div className="absolute inset-0 bg-[url('/Potto-logo-only_iebxw7.webp')] bg-size-[340px_340px] bg-repeat opacity-[0.00] brightness-0 invert" />
      </div>

      <div ref={ref} className="mx-auto w-full max-w-7xl px-5 md:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <SectionCaption tone="dark" {...reveal(0)}>
            Potto Solutions
          </SectionCaption>

          <motion.h2
            {...reveal(0.12)}
            className="mt-4 font-header text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl"
          >
            One platform that handles your students’ safety challenges
          </motion.h2>

          <motion.p
            {...reveal(0.24)}
            className="mt-5 text-lg leading-8 text-white/70"
          >
            A technological ecosystem to efficiently keep your students secured.
          </motion.p>
        </div>
        <div className="mt-20 grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-14">
          {SOLUTIONS.map((solution, i) => (
            <motion.article
              key={solution.title}
              // Staggered across the grid, one after the next.
              {...reveal(0.36 + i * 0.1)}
              className="text-center"
            >
              <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-white/10 text-white">
                <HugeiconsIcon
                  icon={solution.icon}
                  size={34}
                  strokeWidth={1.7}
                />
              </span>

              <h3 className="mt-7 font-header text-2xl font-extrabold leading-snug tracking-tight">
                {solution.title}
              </h3>
              <p className="mt-4 text-[0.95rem] leading-9 text-white/70">
                {solution.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
