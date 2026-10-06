"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Calendar03Icon,
  ChartHistogramIcon,
  Folder01Icon,
  Location01Icon,
  Message01Icon,
  Layers01Icon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons";
import SectionCaption from "@/components/SectionCaption";

// The seven modules from the Pottolite training deck, in its order.
const FEATURES = [
  {
    icon: UserGroupIcon,
    title: "Staff Management",
    body: "Digital staff profiles with names, designations, and uploaded IDs and certificates.",
  },
  {
    icon: Calendar03Icon,
    title: "Leave Management",
    body: "Handle staff leave in the same place as their profiles and reports.",
  },
  {
    icon: ChartHistogramIcon,
    title: "Digital Monitoring & Reporting",
    body: "Staff monitoring summaries you can filter by date, exempt days from, and print.",
  },
  {
    icon: Location01Icon,
    title: "Visitation & Appointments",
    body: "Schedule and approve appointments, check visitors in and out, and keep the log.",
  },
  {
    icon: Message01Icon,
    title: "Communication Tools",
    body: "Reach staff by email, SMS or WhatsApp, and keep every sent and saved message.",
  },
  {
    icon: Folder01Icon,
    title: "Document Management",
    body: "Keep staff files and documents together, digitally, instead of in cabinets.",
  },
  {
    icon: Layers01Icon,
    title: "Audit Record",
    body: "Every login, upload and update is recorded, and filterable by date, user or activity.",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: 22 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
    transition: { duration: 0.65, delay, ease },
  });

  return (
    <section
      id="features"
      data-nav-tone="dark"
      data-nav-bg="var(--color-brand-teal-dark)"
      className="relative isolate bg-brand-teal-dark py-28 text-white md:py-36"
    >
      <div ref={ref} className="mx-auto w-full max-w-7xl px-5 md:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <SectionCaption tone="dark" {...reveal(0)}>
            Core Features
          </SectionCaption>

          <motion.h2
            {...reveal(0.12)}
            className="mt-4 font-header text-3xl leading-[1.1] font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Seven modules, one{" "}
            <span className="text-brand-yellow-light">Pottolite</span>
          </motion.h2>

          <motion.p
            {...reveal(0.24)}
            className="mt-5 text-lg leading-8 text-white/90"
          >
            Everything an organisation needs to run its people day to day.
          </motion.p>
        </div>

        {/* Seven does not divide by three: the lone last card is moved to the
            middle column so the row reads as deliberate. */}
        <div className="mt-20 grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-14 lg:[&>*:last-child:nth-child(3n+1)]:col-start-2 sm:max-lg:[&>*:last-child:nth-child(odd)]:col-span-2">
          {FEATURES.map((feature, i) => (
            <motion.article
              key={feature.title}
              {...reveal(0.36 + i * 0.08)}
              className="text-center"
            >
              <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-white/10 text-white">
                <HugeiconsIcon
                  icon={feature.icon}
                  size={34}
                  strokeWidth={1.7}
                />
              </span>

              <h3 className="mt-7 font-header text-2xl leading-snug font-extrabold tracking-tight">
                {feature.title}
              </h3>
              <p className="mx-auto mt-4 max-w-xs text-[0.95rem] leading-8 text-white/90">
                {feature.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
