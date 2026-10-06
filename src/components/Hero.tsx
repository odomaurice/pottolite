"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";

const DASHBOARD = "/screens/dashboard.webp";

const PHRASES = [
  "Staff management",
  "Leave management",
  "Monitoring & reporting",
  "Visitor appointments",
  "Email, SMS & WhatsApp",
  "Document management",
  "Audit trail",
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const marquee = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-hero-item]", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.2,
      });

      if (marquee.current) {
        gsap.to(marquee.current, {
          xPercent: -50,
          duration: 34,
          ease: "none",
          repeat: -1,
        });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      data-nav-tone="dark"
      data-nav-bg="var(--color-brand-teal-dark)"
      className="relative isolate overflow-hidden rounded-b-[1.75rem] bg-brand-teal-dark pt-36 text-white sm:rounded-b-[2.5rem] md:pt-44"
    >
      <div className="mx-auto w-full max-w-4xl px-5 text-center md:px-6 lg:px-8">
        <p
          data-hero-item
          className="text-xs font-semibold tracking-[0.22em] text-white/90 uppercase"
        >
          By Potto Technologies Ltd
        </p>

        <h1
          data-hero-item
          className="mt-6 font-header text-[2.5rem] leading-[1.06] font-extrabold tracking-tight sm:text-6xl lg:text-[4.25rem]"
        >
          Empowering digital{" "}
          <span className="text-brand-yellow-light">workforce</span>{" "}
          productivity
        </h1>

        <p
          data-hero-item
          className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/90 sm:text-lg"
        >
          Pottolite is one platform for your staff, communication and
          reporting — fewer manual processes, more transparency.
        </p>

        <div
          data-hero-item
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            href="/#how-it-works"
            className="inline-flex animate-glow items-center gap-2 rounded-full bg-brand-yellow px-7 py-3.5 text-sm font-semibold text-ink [--glow:var(--color-brand-yellow)] transition duration-300 hover:bg-brand-yellow-light hover:[--glow:var(--color-brand-yellow-light)] sm:text-base"
          >
            See how it works
            <HugeiconsIcon icon={ArrowRight01Icon} size={18} strokeWidth={2} />
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center rounded-full bg-white/10 px-7 py-3.5 text-sm font-semibold text-white transition duration-300 hover:bg-white/20 sm:text-base"
          >
            Talk to us
          </Link>
        </div>
      </div>

      <div
        data-hero-item
        className="mx-auto mt-16 w-full max-w-6xl px-5 md:mt-20 md:px-6"
      >
        <Image
          src={DASHBOARD}
          alt="The Pottolite dashboard: total staff, expected weekly hours, staff by local government area and upcoming birthdays"
          width={1898}
          height={830}
          priority
          sizes="(min-width: 1200px) 1152px, calc(100vw - 40px)"
          className="h-auto w-full rounded-t-2xl shadow-2xl shadow-black/30 mask-b-from-75%"
        />
      </div>

      <div className="relative -mt-8 pb-3 sm:-mt-12">
        <div className="flex overflow-hidden mask-[linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <div ref={marquee} className="flex w-max">
            {[0, 1].map((copyIndex) => (
              <div
                key={copyIndex}
                aria-hidden={copyIndex === 1}
                className="flex shrink-0 items-center py-4"
              >
                {PHRASES.map((phrase) => (
                  <div
                    key={phrase}
                    className="flex shrink-0 items-center whitespace-nowrap"
                  >
                    <span className="text-xs font-semibold tracking-[0.22em] text-white/90 uppercase md:text-sm">
                      {phrase}
                    </span>
                    <span
                      aria-hidden
                      className="px-6 text-brand-yellow-light md:px-8"
                    >
                      ✳
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
