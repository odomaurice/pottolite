"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  DialpadSquare01Icon,
  FaceIdIcon,
  IdentityCardIcon,
  NfcIcon,
  Notification03Icon,
  QrCodeIcon,
  SecurityCheckIcon,
  TaskDone01Icon,
} from "@hugeicons/core-free-icons";
import SectionCaption from "@/components/SectionCaption";

const STEPS = [
  {
    icon: IdentityCardIcon,
    title: "Identify",
    body: "Students or staff interact with the attendance",
    subtext: "  device.",
  },
  {
    icon: SecurityCheckIcon,
    title: "Verify",
    body: "The device securely verifies the individual.",
    
  },
  {
    icon: TaskDone01Icon,
    title: "Record",
    body: "Attendance is automatically logged with",
     subtext: " the exact time.",
  },
  {
    icon: Notification03Icon,
    title: "Notify",
    body: "Relevant attendance information is made",
    subtext: " available through the Potto system.",
  },
];

const HANDHELD = {
  name: "Potto Hand-Held Device",
  image: "/hardware/handheld.webp",
  cases: ["Indoor use", "Smaller institutions", "Handy"],
};

const TERMINAL = {
  name: "Potto Terminal Device",
  image: "/hardware/terminal.webp",
  cases: ["Large institutions", "High-traffic areas or kiosks"],
};

const CAPABILITIES = [
  { icon: FaceIdIcon, label: "Face recognition" },
  { icon: NfcIcon, label: "RFID" },
  { icon: QrCodeIcon, label: "QR code" },
  { icon: DialpadSquare01Icon, label: "PIN" },
];

const BADGES = ["Water proof", "Dust proof", "User friendly"];

const ease = [0.22, 1, 0.36, 1] as const;

function DeviceLabel({
  device,
}: {
  device: { name: string; cases: string[] };
}) {
  return (
    <>
      <h3 className="font-header text-2xl leading-tight font-extrabold tracking-tight">
        {device.name}
      </h3>
      <p className="mt-3 text-sm font-semibold text-brand-yellow-light">
        Best use case
      </p>

      <ul className="mt-2.5 space-y-2">
        {device.cases.map((useCase) => (
          <li
            key={useCase}
            className="flex gap-3 text-[0.95rem] leading-7 text-white/90"
          >
            <span
              aria-hidden
              className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-yellow-light"
            />
            {useCase}
          </li>
        ))}
      </ul>
    </>
  );
}

export default function HardwareSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });

  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: 22 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
    transition: { duration: 0.65, delay, ease },
  });

  return (
    <section
      id="hardware"
      data-nav-tone="dark"
      data-nav-bg="var(--color-brand-teal-dark)"
      className="relative isolate bg-brand-teal-dark py-24 text-white md:py-32"
    >
      <div ref={ref} className="mx-auto w-full max-w-7xl px-5 md:px-6 lg:px-8">
        <SectionCaption tone="dark" {...reveal(0)} className="mb-14">
          Potto Hardware
        </SectionCaption>

        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 xl:gap-16">
          <div>
            <motion.h2
              {...reveal(0)}
              className="font-header text-4xl leading-[1.04] font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Hardware
              <br />
              you can trust
            </motion.h2>

            <motion.p
              {...reveal(0.1)}
              className="mt-6 max-w-md text-base leading-8 text-white/90 lg:text-lg"
            >
              A reliable, intelligent device for real-time student and staff
              attendance tracking.
            </motion.p>

            <motion.h3
              {...reveal(0.2)}
              className="mt-16 font-header text-3xl font-extrabold tracking-tight sm:text-4xl"
            >
              How it works
            </motion.h3>

            <ol className="mt-10 space-y-8">
              {STEPS.map((step, i) => (
                <motion.li
                  key={step.title}
                  {...reveal(0.3 + i * 0.1)}
                  className="flex gap-5"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-yellow text-white">
                    <HugeiconsIcon
                      icon={step.icon}
                      size={24}
                      strokeWidth={1.9}
                    />
                  </span>

                  <div>
                    <h4 className="font-header text-lg font-extrabold tracking-tight">
                      {step.title}
                    </h4>
                    <p className="mt-1.5 text-[0.85rem] leading-4 text-white/90">
                      {step.body}
                    </p>
                    <p className="mt-1.5 text-[0.85rem] leading-4 text-white/90">
                      {step.subtext}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>

          {/* ---------- Devices and specification ---------- */}
          <div>
            <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-[0.95fr_0.7fr_1fr] lg:items-start">
              <motion.article
                {...reveal(0.15)}
                className="lg:col-start-1 lg:row-start-1 lg:pt-8"
              >
                <div className="relative h-52 w-full sm:h-60 lg:h-56">
                  <Image
                    src={HANDHELD.image}
                    alt={HANDHELD.name}
                    fill
                    loading="eager"
                    sizes="(min-width: 1024px) 200px, (min-width: 640px) 40vw, 70vw"
                    className="object-contain"
                  />
                </div>

                <div className="mt-7">
                  <DeviceLabel device={HANDHELD} />
                </div>
              </motion.article>
              <div className="lg:contents">
                <motion.div
                  {...reveal(0.25)}
                  className="lg:col-start-2 lg:row-start-1"
                >
                  <div className="relative mt-12 h-80 w-full sm:h-96 lg:h-120">
                    <Image
                      src={TERMINAL.image}
                      alt={TERMINAL.name}
                      fill
                      sizes="(min-width: 1024px) 160px, (min-width: 640px) 32vw, 60vw"
                      className="object-contain"
                    />
                  </div>
                </motion.div>

                <motion.div
                  {...reveal(0.32)}
                  className="mt-7 lg:col-start-3 lg:row-start-1 lg:mt-0 lg:pt-16"
                >
                  <DeviceLabel device={TERMINAL} />
                  <div
                    aria-hidden
                    className="relative mt-9 h-44 w-44 sm:mt-10 sm:h-48 sm:w-48 lg:h-52 lg:w-52"
                  >
                    <Image
                      src="/hardware/cards.webp"
                      alt=""
                      fill
                      loading="eager"
                      sizes="(min-width: 1024px) 208px, (min-width: 640px) 192px, 176px"
                      className="object-contain"
                    />
                  </div>
                </motion.div>
              </div>
            </div>

            <motion.ul
              {...reveal(0.5)}
              className="mt-14 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4 sm:gap-x-4"
            >
              {CAPABILITIES.map((capability) => (
                <li
                  key={capability.label}
                  className="flex items-center gap-2.5 text-[0.8rem] font-semibold tracking-[0.08em] uppercase"
                >
                  <HugeiconsIcon
                    icon={capability.icon}
                    size={26}
                    strokeWidth={1.8}
                    className="shrink-0 text-brand-yellow-light"
                  />
                  {capability.label}
                </li>
              ))}
            </motion.ul>

            <motion.ul
              {...reveal(0.6)}
              className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3"
            >
              {BADGES.map((badge) => (
                <li
                  key={badge}
                  className="rounded-lg sm:mt-8 bg-white/10 py-2.5 text-center text-sm font-medium text-white"
                >
                  {badge}
                </li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
}
