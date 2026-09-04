"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  BubbleChatIcon,
  CheckListIcon,
  Clock01Icon,
  DashboardSpeed01Icon,
  FavouriteIcon,
  FileRemoveIcon,
  Location01Icon,
  Message01Icon,
  Notification02Icon,
  Notification03Icon,
  Refresh01Icon,
  SecurityCheckIcon,
  ShieldUserIcon,
  TaskDone01Icon,
  UserCheck01Icon,
  ViewIcon,
} from "@hugeicons/core-free-icons";
import SectionCaption from "@/components/SectionCaption";

const OVERVIEW = [
  {
    icon: ShieldUserIcon,
    title: "Safeguard Students",
    body: "Easily manage guardian verification, visitors, student entry and exit, and school buses.",
    tint: "bg-brand/10 text-brand",
  },
  {
    icon: DashboardSpeed01Icon,
    title: "Streamline Operations",
    body: "Attendance, late arrivals, early dismissals, bus changes and play dates, all in one real-time system.",
    tint: "bg-brand-yellow/15 text-brand-yellow-dark",
  },
  {
    icon: BubbleChatIcon,
    title: "Simplify Communications",
    body: "Parents notify pickups, request changes and receive attendance alerts through the Potto app and SMS.",
    tint: "bg-brand/10 text-brand",
  },
];

const ROLES = [
  {
    id: "administrators",
    title: "For Administrators",
    intro:
      "Potto simplifies school operations by helping administrators manage attendance, student movement, pickups, permissions and notifications from one centralised platform.",
    points: [
      {
        icon: Clock01Icon,
        label: "Save Time",
        detail: "Automate routine administrative tasks.",
      },
      {
        icon: SecurityCheckIcon,
        label: "Improve Safety",
        detail: "Verify guardians and control school access.",
      },
      {
        icon: TaskDone01Icon,
        label: "Track Attendance",
        detail: "Monitor check-ins and check-outs in real time.",
      },
      {
        icon: Notification02Icon,
        label: "Stay Connected",
        detail: "Send timely updates and notifications to parents.",
      },
    ],
    image: "/roles/admins.webp",
    width: 760,
    height: 768,
    imageClass: "max-w-md",
  },
  {
    id: "parents",
    title: "For Parents",
    intro:
      "Potto keeps parents informed, connected and confident about their child's safety.",
    points: [
      {
        icon: ViewIcon,
        label: "Stay Informed",
        detail: "Real-time updates on attendance and movements.",
      },
      {
        icon: UserCheck01Icon,
        label: "Safer Pickups",
        detail: "Easily verify and manage authorised guardians.",
      },
      {
        icon: Notification03Icon,
        label: "Quick Notifications",
        detail: "Alerts about arrivals, dismissals and updates.",
      },
      {
        icon: FavouriteIcon,
        label: "Peace of Mind",
        detail: "Know when your child arrives at or leaves school.",
      },
    ],
    image: "/roles/parents.webp",
    width: 900,
    height: 692,
    imageClass: "max-w-lg",
  },
  {
    id: "teachers",
    title: "For Teachers",
    intro:
      "Potto helps teachers save time, stay organised and keep track of students effortlessly.",
    points: [
      {
        icon: CheckListIcon,
        label: "Easy Attendance",
        detail: "Record student attendance quickly and accurately.",
      },
      {
        icon: Refresh01Icon,
        label: "Real-Time Updates",
        detail: "Stay informed about arrivals, absences and movements.",
      },
      {
        icon: FileRemoveIcon,
        label: "Less Paperwork",
        detail: "Reduce manual attendance and administrative tasks.",
      },
      {
        icon: Message01Icon,
        label: "Better Communication",
        detail: "Alerts and updates from school administrators.",
      },
      {
        icon: Location01Icon,
        label: "Improved Safety",
        detail: "Know which students are on campus and when they leave.",
      },
    ],
    image: "/roles/teacher.webp",
    width: 640,
    height: 1170,
    imageClass: "max-w-2xs",
  },
];

const LABELS = ["Everyone", "Administrators", "Parents", "Teachers"];
const LAST = ROLES.length;

const ease = [0.22, 1, 0.36, 1] as const;

export default function FeaturesSection() {
  const [[index, direction], setState] = useState<[number, number]>([0, 0]);
  const reduced = useReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);

  // Every panel change returns to the top of the section. The panels run
  // taller than a short viewport, so advancing while scrolled part-way down
  // used to drop you into the middle of the next one, past its headline.
  const go = useCallback(
    (next: number) => {
      setState(([current]) => [next, next > current ? 1 : -1]);
      sectionRef.current?.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "start",
      });
    },
    [reduced],
  );
  useEffect(() => {
    window.dispatchEvent(new Event("scroll"));
  }, [index]);

  const onDark = index > 0;
  const role = index > 0 ? ROLES[index - 1] : null;

  const slide = {
    initial: reduced
      ? { opacity: 0 }
      : { opacity: 0, x: direction >= 0 ? 64 : -64 },
    animate: { opacity: 1, x: 0 },
    exit: reduced
      ? { opacity: 0 }
      : { opacity: 0, x: direction >= 0 ? -64 : 64 },
    transition: { duration: 0.5, ease },
  };

  return (
    <section
      id="features"
      ref={sectionRef}
      data-nav-tone={onDark ? "dark" : "light"}
      data-nav-bg={onDark ? "var(--color-brand-teal-dark)" : "var(--canvas)"}
      className={`relative scroll-mt-24 overflow-hidden py-16 transition-colors duration-500 md:py-20 ${
        onDark ? "bg-brand-teal-dark text-white" : "text-ink"
      }`}
    >
      <div className="mx-auto w-full max-w-7xl px-5 md:px-6 lg:px-8">
        <SectionCaption
          tone={onDark ? "dark" : "light"}
          className="mb-12 transition-colors duration-500"
        >
          Potto Benefits
        </SectionCaption>

        <div className="min-h-112 md:min-h-100 lg:min-h-112">
          <AnimatePresence mode="wait" initial={false}>
            {index === 0 ? (
              <motion.div key="overview" {...slide}>
                <div className="mx-auto max-w-3xl text-center">
                  <h2 className="font-header text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                    Amazing benefits for{" "}
                    <span className="text-brand">everyone</span>
                  </h2>
                  <p className="mt-5 text-lg leading-8 text-soft">
                    Potto is a security management solution designed to ensure
                    the safety of students against varying security threats.
                  </p>
                </div>

                <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10 lg:gap-14">
                  {OVERVIEW.map((item) => (
                    <article key={item.title}>
                      <div className="flex items-center gap-4">
                        <span
                          className={`grid h-16 w-16 bg-brand-gold shrink-0 place-items-center rounded-full sm:h-18 sm:w-18 ${item.tint}`}
                        >
                          <HugeiconsIcon
                            icon={item.icon}
                            size={32}
                            strokeWidth={1.8}
                           
                          />
                        </span>
                        <h3 className="font-header text-xl font-extrabold tracking-tight">
                          {item.title}
                        </h3>
                      </div>
                      <p className="mt-5 text-[0.95rem] leading-7 text-soft">
                        {item.body}
                      </p>
                    </article>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div key={role!.id} {...slide}>
                <div className="grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-10 lg:gap-16">
                  <div>
                    <h2 className="font-header text-4xl leading-[1.05] font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                      {role!.title}
                    </h2>

                    <p className="mt-6 text-base leading-8 text-white/80 lg:text-lg">
                      {role!.intro}
                    </p>

                    {/* Tinted fills, no borders: an outline here would read
                        as the framing this design avoids, and the teal
                        ground already separates the cards from the page.

                        The last card spans both columns when the count is
                        odd (Teachers has five), so a lone card reads as
                        deliberate rather than orphaned. */}
                    <ul className="mt-8 grid gap-3 sm:grid-cols-2 sm:[&>li:last-child:nth-child(odd)]:col-span-2">
                      {role!.points.map((point) => (
                        <li
                          key={point.label}
                          className="rounded-2xl bg-white/8 p-4 transition duration-300 hover:bg-white/15"
                        >
                          <div className="flex items-center gap-3">
                            <span
                              aria-hidden
                              className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-yellow [--glow:var(--color-brand-yellow)]"
                            >
                              <HugeiconsIcon
                                icon={point.icon}
                                size={20}
                                strokeWidth={1.9}
                              />
                            </span>
                            <h3 className="font-header text-[0.95rem] font-extrabold tracking-tight">
                              {point.label}
                            </h3>
                          </div>
                          <p className="mt-2.5 text-[0.8rem] leading-5 text-white/90">
                            {point.detail}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex justify-center md:justify-end">
                    <Image
                      src={role!.image}
                      alt=""
                      aria-hidden
                      width={role!.width}
                      height={role!.height}
                      sizes="(min-width: 768px) 40vw, 80vw"
                      className={`h-auto w-full mask-b-from-88% ${role!.imageClass}`}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="mt-8 grid grid-cols-1 items-center gap-y-6 md:mt-10 md:grid-cols-[1fr_auto_1fr] md:gap-x-8 md:gap-y-0">
          <div className="order-2 flex justify-start md:order-1">
            {index > 0 && (
              <button
                type="button"
                onClick={() => go(index - 1)}
                className="group flex cursor-pointer items-center gap-3 text-sm font-semibold sm:text-base"
              >
                <span
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition duration-300 group-hover:scale-110 ${
                    onDark
                      ? "bg-white text-brand-teal-dark"
                      : "bg-brand text-brand-fg"
                  }`}
                >
                  <HugeiconsIcon
                    icon={ArrowLeft01Icon}
                    size={20}
                    strokeWidth={2.4}
                  />
                </span>
                Benefit to {LABELS[index - 1]}
              </button>
            )}
          </div>

          <div
            className="order-1 flex items-center justify-center gap-2 md:order-2"
            role="tablist"
            aria-label="Benefits panels"
          >
            {LABELS.map((label, i) => (
              <button
                key={label}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Benefits for ${label}`}
                onClick={() => go(i)}
                className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${
                  i === index
                    ? `w-8 ${onDark ? "bg-highlight" : "bg-brand"}`
                    : `w-2 ${onDark ? "bg-white/35 hover:bg-white/60" : "bg-ink/20 hover:bg-ink/40"}`
                }`}
              />
            ))}
          </div>

          <div className="order-3 flex justify-end">
            {index < LAST && (
              <button
                type="button"
                onClick={() => go(index + 1)}
                className="group flex cursor-pointer items-center gap-3 text-sm font-semibold sm:text-base"
              >
                Benefit to {LABELS[index + 1]}
                <span
                  className={`grid h-10 w-10 shrink-0 animate-glow place-items-center rounded-full transition duration-300 group-hover:scale-110 ${
                    onDark
                      ? "bg-white text-brand-teal-dark [--glow:var(--color-brand-yellow-light)]"
                      : "bg-brand text-brand-fg [--glow:var(--color-brand-teal)]"
                  }`}
                >
                  <HugeiconsIcon
                    icon={ArrowRight01Icon}
                    size={20}
                    strokeWidth={2.4}
                  />
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
