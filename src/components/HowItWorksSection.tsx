"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ChartHistogramIcon,
  Layers01Icon,
  Location01Icon,
  Message01Icon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons";
import SectionCaption from "@/components/SectionCaption";

// The training slides, step for step. The screenshots are the real admin
// panel; other people's names, faces and phone numbers are blurred out.
const MODULES = [
  {
    id: "staff",
    icon: UserGroupIcon,
    label: "Staff",
    title: "Staff Management",
    steps: [
      "Go to Staff Management from the dashboard.",
      "Add staff and fill in their details — name, designation and so on.",
      "Upload IDs, certificates or other documents.",
      "Save, and manage every staff profile digitally.",
    ],
    image: "/screens/staff.webp",
    width: 976,
    height: 533,
    alt: "The Staff Management list, showing each staff member's photo, name, gender and role",
  },
  {
    id: "communication",
    icon: Message01Icon,
    label: "Communication",
    title: "Communication Tool",
    steps: [
      "Choose between Email, WhatsApp or SMS.",
      "Select your recipients and type your message.",
      "Send it, save it for later, or cancel it.",
      "Open any message to view its details.",
    ],
    image: "/screens/communication.webp",
    width: 898,
    height: 659,
    alt: "The Communication screen with SMS, Email and WhatsApp tabs and a new message form",
  },
  {
    id: "reports",
    icon: ChartHistogramIcon,
    label: "Reports",
    title: "Monitoring & Reporting",
    steps: [
      "Open Staff Report from the dashboard.",
      "View and print staff monitoring summaries.",
      "Filter monitoring by date.",
      "Exempt specific dates.",
    ],
    image: "/screens/reports.webp",
    width: 826,
    height: 590,
    alt: "The Staff Report screen filtered to a date range, with expected hours shown",
  },
  {
    id: "visitors",
    icon: Location01Icon,
    label: "Visitors",
    title: "Visitation & Appointments",
    steps: [
      "Go to the Visitor Appointment module.",
      "Schedule or approve appointments.",
      "Record visitor details and check them in and out.",
      "Keep security and visitor logs.",
    ],
    image: "/screens/appointments.webp",
    width: 904,
    height: 581,
    alt: "The Appointment screen showing expected visitors for a date and the total checked in",
  },
  {
    id: "audit",
    icon: Layers01Icon,
    label: "Audit log",
    title: "Audit Log",
    steps: [
      "Open Audit from the admin panel.",
      "See every staff action — logins, uploads and updates.",
      "Filter by date, user or activity.",
    ],
    image: "/screens/audit.webp",
    width: 769,
    height: 487,
    alt: "The System Audit trail listing actions by user account",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function HowItWorksSection() {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: 22 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
    transition: { duration: 0.65, delay, ease },
  });

  // Arrow keys move between tabs, as the WAI-ARIA tabs pattern expects.
  const onKeyDown = (event: KeyboardEvent) => {
    const step =
      event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = (index + step + MODULES.length) % MODULES.length;
    setIndex(next);
    tabs.current[next]?.focus();
  };

  const mod = MODULES[index];

  return (
    <section
      id="how-it-works"
      data-nav-tone="light"
      data-nav-bg="var(--canvas)"
      className="relative py-24 text-ink md:py-32"
    >
      <div ref={ref} className="mx-auto w-full max-w-7xl px-5 md:px-6 lg:px-8">
        <SectionCaption {...reveal(0)}>Using Pottolite</SectionCaption>

        <motion.h2
          {...reveal(0.12)}
          className="mx-auto mt-7 max-w-4xl text-center font-header text-4xl leading-[1.06] font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
        >
          How it works, <span className="text-brand">step by step</span>
        </motion.h2>

        <motion.p
          {...reveal(0.2)}
          className="mx-auto mt-5 max-w-2xl text-center text-base leading-7 text-soft sm:text-lg sm:leading-8"
        >
          The same walkthrough we use to train your team, one module at a time.
        </motion.p>

        <motion.div
          {...reveal(0.3)}
          role="tablist"
          aria-label="Pottolite modules"
          onKeyDown={onKeyDown}
          className="mx-auto mt-12 flex max-w-full gap-2 overflow-x-auto pb-2 [scrollbar-width:none] sm:justify-center [&::-webkit-scrollbar]:hidden"
        >
          {MODULES.map((m, i) => {
            const selected = i === index;
            return (
              <button
                key={m.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`module-tab-${m.id}`}
                aria-selected={selected}
                aria-controls={`module-panel-${m.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setIndex(i)}
                className={`flex shrink-0 cursor-pointer items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors duration-300 ${
                  selected
                    ? "bg-brand text-brand-fg"
                    : "bg-surface-2 text-soft hover:bg-brand/10 hover:text-ink"
                }`}
              >
                <HugeiconsIcon icon={m.icon} size={18} strokeWidth={2} />
                {m.label}
              </button>
            );
          })}
        </motion.div>

        <div className="mt-14 min-h-120 md:mt-16">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={mod.id}
              id={`module-panel-${mod.id}`}
              role="tabpanel"
              aria-labelledby={`module-tab-${mod.id}`}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease }}
              className="grid items-center gap-12 md:grid-cols-[5fr_7fr] md:gap-10 lg:gap-16"
            >
              <div>
                <h3 className="font-header text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl">
                  {mod.title}
                </h3>
                <ol className="mt-8 space-y-5">
                  {mod.steps.map((step, i) => (
                    <li key={step} className="flex items-start gap-4">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand text-sm font-bold text-brand-fg">
                        {i + 1}
                      </span>
                      <span className="pt-1.5 text-base leading-7 text-ink">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              <Image
                src={mod.image}
                alt={mod.alt}
                width={mod.width}
                height={mod.height}
                sizes="(min-width: 1280px) 680px, (min-width: 768px) 55vw, calc(100vw - 40px)"
                className="h-auto w-full rounded-2xl shadow-xl shadow-ink/10"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
