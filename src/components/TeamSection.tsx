"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import PlayBadge from "@/components/PlayBadge";
import SectionCaption from "@/components/SectionCaption";
import VideoLightbox from "@/components/VideoLightbox";



const POSTER = "/team/placeholder-team.webp";
const VIDEO = { src: "/videos/intro.mp4", label: "Meet the Potto team" };

const ease = [0.22, 1, 0.36, 1] as const;

export default function TeamSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [playing, setPlaying] = useState(false);

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
     
      <div
        aria-hidden
        className=" "
      />

      <div ref={ref} className="mx-auto w-full max-w-7xl px-5 md:px-6 lg:px-8">
        <SectionCaption tone="dark" {...reveal(0)}>
          Our Team
        </SectionCaption>

        <motion.h2
          {...reveal(0.1)}
          className="mx-auto mt-7 max-w-4xl text-center font-header text-4xl leading-[1.06] font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
        >
          The people behind{" "}
          <span className="text-brand-yellow-light">Potto</span>
        </motion.h2>

        <motion.p
          {...reveal(0.2)}
          className="mx-auto mt-5 max-w-2xl text-center text-base leading-7 text-white/90 sm:text-lg sm:leading-8"
        >
          Meet the people building Potto, and hear why keeping school
          communities safe matters to them.
        </motion.p>

        <motion.div {...reveal(0.3)} className="mt-12 md:mt-16">
         
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={"Play: " + VIDEO.label}
            className="group relative mx-auto block aspect-video w-full max-w-6xl cursor-pointer"
          >
            <Image
              src={POSTER}
              alt="The Potto team"
              fill
              sizes="(min-width: 1216px) 1152px, 100vw"
              className="object-cover mask-b-from-70% transition duration-700 group-hover:scale-[1.015]"
            />

           
            <PlayBadge className="sm:mt-24" />

            <span className="absolute bottom-[8%] left-1/2 -translate-x-1/2 text-xs font-semibold tracking-[0.22em] whitespace-nowrap text-white uppercase sm:text-sm">
              Meet the team
            </span>
          </button>
        </motion.div>
      </div>

      <VideoLightbox
        src={VIDEO.src}
        label={VIDEO.label}
        open={playing}
        onClose={() => setPlaying(false)}
      />
    </section>
  );
}
