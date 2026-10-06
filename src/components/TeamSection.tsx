"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionCaption from "@/components/SectionCaption";

const TEAM = [
  {
    name: "Otis Chiemezie",
    role: "CTO and Software Engineer",
    photo: "/team/otis-chiemezie.webp",
  },
  {
    name: "Chigoziem Chinaza Linda",
    role: "Support Team",
    photo: "/team/chinaza-chigoziem.webp",
  },
  {
    name: "Ogbu Lawrencia Chincherem",
    role: "Support Team",
    photo: "/team/lawrencia-ogbu.webp",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function TeamSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: 22 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
    transition: { duration: 0.65, delay, ease },
  });

  return (
    <section
      id="team"
      data-nav-tone="dark"
      data-nav-bg="var(--color-brand-teal-dark)"
      className="relative isolate overflow-hidden bg-brand-teal-dark py-24 text-white md:py-32"
    >
      <div ref={ref} className="mx-auto w-full max-w-7xl px-5 md:px-6 lg:px-8">
        <SectionCaption tone="dark" {...reveal(0)}>
          Our Team
        </SectionCaption>

        <motion.h2
          {...reveal(0.1)}
          className="mx-auto mt-7 max-w-4xl text-center font-header text-4xl leading-[1.06] font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
        >
          The people behind{" "}
          <span className="text-brand-yellow-light">Pottolite</span>
        </motion.h2>

        <motion.p
          {...reveal(0.2)}
          className="mx-auto mt-5 max-w-2xl text-center text-base leading-7 text-white/90 sm:text-lg sm:leading-8"
        >
          The engineers who build it and the support team who help your staff
          get the most from it.
        </motion.p>

        <ul className="mt-16 grid gap-14 sm:grid-cols-2 md:mt-20 lg:grid-cols-3 sm:max-lg:[&>li:last-child]:col-span-2">
          {TEAM.map((person, i) => (
            <motion.li
              key={person.name}
              {...reveal(0.3 + i * 0.12)}
              className="text-center"
            >
              <Image
                src={person.photo}
                alt={person.name}
                width={480}
                height={480}
                sizes="(min-width: 640px) 208px, 176px"
                className="mx-auto h-44 w-44 rounded-full object-cover ring-6 ring-white sm:h-52 sm:w-52"
              />
              <h3 className="mt-7 font-header text-xl font-extrabold tracking-tight sm:text-2xl">
                {person.name}
              </h3>
              <p className="mt-2 text-[0.95rem] text-white/90">
                {person.role}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
