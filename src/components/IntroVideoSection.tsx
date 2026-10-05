"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import VideoLightbox from "./VideoLightbox";
import {
  AnalyticsUpIcon,
  PlayIcon,
  Shield01Icon,
  SquareLock01Icon,
} from "@hugeicons/core-free-icons";
import SectionCaption from "@/components/SectionCaption";


const DEVICES_IMAGE = "/devices/potto-devices.webp";

const CLAIMS = [
  {
    icon: Shield01Icon,
    title: "All-in-One Platform",
    body: "Manage payments, fees, expenses and more in one place.",
  },
  {
    icon: AnalyticsUpIcon,
    title: "Real-time Insights",
    body: "Get real-time data and visual reports to make informed decisions.",
  },
  {
    icon: SquareLock01Icon,
    title: "Secure & Reliable",
    body: "Your data is protected with top level security and reliability.",
  },
];
const COLUMNS = "md:grid-cols-[5fr_7fr] md:gap-8 lg:gap-12";

const VIDEO_SRC = "/videos/intro.mp4";

const CHECKLIST = ["Gate Check-in", "Live Register", "Real-time Alert"];

const ease = [0.22, 1, 0.36, 1] as const;
// separate viewport triggers.
const T = {
  pill: 0,
  headline: 0.15,
  listHeading: 0.3,
  firstPoint: 0.55,
  betweenPoints: 0.35,
  play: 0.55 + 3 * 0.35 + 0.25,
};

export default function IntroVideoSection() {
  const [open, setOpen] = useState(false);

  const copyRef = useRef<HTMLDivElement>(null);
  const inView = useInView(copyRef, { once: true, amount: 0.2 });
  const artRef = useRef<HTMLDivElement>(null);
  const artInView = useInView(artRef, { once: true, amount: 0.25 });

  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    transition: { duration: 0.6, delay, ease },
  });

  const close = useCallback(() => setOpen(false), []);

  return (
    <section
      id="intro-video"
      data-nav-tone="light"
      data-nav-bg="var(--canvas)"
      className="relative isolate  overflow-hidden  py-24  text-ink md:py-32"
    >
      <div
        ref={copyRef}
        className="mx-auto w-full  max-w-7xl px-5 md:px-6 lg:px-8"
      >
        <SectionCaption {...reveal(T.pill)} className="mb-12">
          Potto in action
        </SectionCaption>

        <div className={`grid items-start gap-10  ${COLUMNS}` }>
          <div>
            <motion.h2
              {...reveal(T.headline)}
              className="font-header text-4xl font-extrabold leading-[1.04] tracking-tight sm:text-5xl md:text-5xl lg:text-6xl"
            >
              Ninety seconds
              <br />
              with <span className="text-brand">Potto</span>
            </motion.h2>
          </div>
          <div className="md:pt-2 lg:pt-4 lg:pl-10 xl:pl-12">
            <motion.p
              {...reveal(T.listHeading)}
              className="font-header text-xl font-extrabold leading-snug tracking-tight sm:text-2xl md:text-xl lg:text-2xl xl:text-3xl"
            >
              Watch a school day run on Potto:
            </motion.p>
            <div className="mt-6 flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-10 lg:gap-12">
              <ul className="space-y-3">
                {CHECKLIST.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -24 }}
                    animate={
                      inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }
                    }
                    transition={{
                      duration: 0.5,
                      delay: T.firstPoint + i * T.betweenPoints,
                      ease,
                    }}
                    className="flex items-center gap-3 text-lg font-medium sm:gap-3.5 sm:text-xl md:text-base lg:text-lg xl:text-xl"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : { scale: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: T.firstPoint + i * T.betweenPoints,
                        ease: "backOut",
                      }}
                      className="h-3 w-3 shrink-0 rounded-full bg-brand-gold"
                    />
                    {item}
                  </motion.li>
                ))}
              </ul>

              <motion.div
                {...reveal(T.play)}
                className="flex shrink-0 items-center gap-4"
              >
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  aria-label="Play the Potto introduction video"
                  className="group relative grid h-16 w-16 shrink-0 animate-glow place-items-center rounded-full bg-brand-yellow text-ink [--glow:var(--color-brand-yellow)] transition duration-300 hover:scale-105 hover:bg-brand-yellow-light hover:[--glow:var(--color-brand-yellow-light)] sm:h-18 sm:w-18 lg:h-20 lg:w-20"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 -z-10 animate-pulse-ring rounded-full bg-brand-yellow"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 -z-10 animate-pulse-ring rounded-full bg-brand-yellow [animation-delay:1.3s]"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 -z-10 animate-halo rounded-full bg-brand-yellow blur-md"
                  />

                  <HugeiconsIcon
                    icon={PlayIcon}
                    size={30}
                    strokeWidth={2}
                    className="translate-x-0.5 cursor-pointer"
                  />
                </button>

                <span className="text-base font-medium text-soft">
                  Play the intro
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <div
        ref={artRef}
        className="mx-auto mt-14 w-full max-w-7xl px-5 md:mt-20 md:px-6 lg:px-8"
      >
        <div className={`grid items-center gap-12 ${COLUMNS}`}>
          <div
            aria-hidden
            className="pointer-events-none md:col-start-2 md:row-start-1"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={artInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, ease }}
            >
              <Image
                src={DEVICES_IMAGE}
                alt=""
                width={1400}
                height={671}
                priority
                sizes="(min-width: 1280px) 690px, (min-width: 768px) 56vw, 92vw"
                className="h-auto w-full"
              />
            </motion.div>
          </div>

          <div className="md:col-start-1 md:row-start-1">
            <div className="flex flex-col gap-8 lg:gap-10">
              {CLAIMS.map((claim, i) => (
                <motion.div
                  key={claim.title}
                  initial={{ opacity: 0, y: 22 }}
                  animate={
                    artInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }
                  }
                  // Picks up after the artwork has landed.
                  transition={{ duration: 0.6, delay: 0.35 + i * 0.12, ease }}
                  className="flex items-start gap-4"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand text-brand-fg lg:h-14 lg:w-14">
                    <HugeiconsIcon
                      icon={claim.icon}
                      size={26}
                      strokeWidth={1.9}
                    />
                  </span>

                  <div>
                    <h3 className="font-header text-lg font-extrabold tracking-tight lg:text-xl">
                      {claim.title}
                    </h3>
                    <p className="mt-1.5 text-[0.925rem] leading-6 text-soft">
                      {claim.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <VideoLightbox
        src={VIDEO_SRC}
        label="Potto introduction video"
        open={open}
        onClose={close}
      />
    </section>
  );
}
