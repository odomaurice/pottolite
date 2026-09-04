"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import Modal from "./Modal";
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Certificate01Icon,
  CreditCardIcon,
  DatabaseIcon,
  Message02Icon,
  ShoppingCart01Icon,
  Wallet02Icon,
} from "@hugeicons/core-free-icons";
import SectionCaption from "@/components/SectionCaption";


const ANCILLARY = [
  {
    icon: Certificate01Icon,
    name: "Potto Assess",
    image: "/services/assess.webp",
    href: "/services/potto-assess",
    tagline: "Result Management System",
    points: [
      "Instant result processing and generation",
      "Teacher privilege setting to avoid buddy inputting",
      "Online access by student to check results",
      "Friendly mobile app for easy access to child's records",
    ],
  },
  {
    icon: CreditCardIcon,
    name: "Potto Pay",
    image: "/services/pay.webp",
    href: "/services/potto-pay",
    tagline: "Electronic Payment and Fee Collection System",
    points: [
      "Collection of all type of fees for school",
      "Payment history generation and financial status report",
      "Creation of different type of fees and automatic receipt generation",
    ],
  },
  {
    icon: Wallet02Icon,
    name: "Potto Pocket",
    image: "/services/pocket.webp",
    href: "/services/potto-pocket",
    tagline: "Students Pocket Money Management",
    points: [
      "Seamless payment of fees",
      "Student budget allocation",
      "Expenses tracking of child's spending",
      "Easy and cashless purchases in school",
    ],
  },
  {
    icon: ShoppingCart01Icon,
    name: "Potto Store",
    image: "/services/store.webp",
    href: "/services/potto-store",
    tagline: "Mini Ecommerce System",
    points: [
      "Sales of admission forms and other school materials",
      "Proper inventory management",
      "Seamless account reconciliation",
    ],
  },
  {
    icon: DatabaseIcon,
    name: "Potto Admin",
    image: "/services/admin.webp",
    href: "/services/potto-admin",
    tagline: "School Database Management System",
    points: [
      "Student and Staff Data processing",
      "Communication Management using SMS and Emails",
      "Dynamic School Configuration",
      "Full customization to suit your look and feel",
    ],
  },
  {
    icon: Message02Icon,
    name: "Potto Comm",
    image: "/services/comm.webp",
    href: "/services/potto-comm",
    tagline: "Bulk Messaging System",
    points: [
      "Sends, tracks and stores bulk SMS to parents and teachers in one click",
    ],
  },
];

const BLURB =
  "Solutions that lift the productivity of teachers and students across your school.";

const ease = [0.22, 1, 0.36, 1] as const;

export default function SuiteSection() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, amount: 0.5 });
  const auxRef = useRef<HTMLDivElement>(null);
  const auxInView = useInView(auxRef, { once: true, amount: 0.1 });
  const trackRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const measure = () => {
      const total = Math.max(1, Math.round(el.scrollWidth / el.clientWidth));
      setPages(total);
      setPage(Math.min(total - 1, Math.round(el.scrollLeft / el.clientWidth)));
    };

    const observer = new ResizeObserver(measure);
    observer.observe(el);
    el.addEventListener("scroll", measure, { passive: true });

    return () => {
      observer.disconnect();
      el.removeEventListener("scroll", measure);
    };
  }, []);

  const goToPage = useCallback(
    (index: number) => {
      const el = trackRef.current;
      if (!el) return;
      el.scrollTo({
        left: index * el.clientWidth,
        behavior: reducedMotion ? "auto" : "smooth",
      });
    },
    [reducedMotion],
  );

  const [openService, setOpenService] = useState<
    (typeof ANCILLARY)[number] | null
  >(null);

  const reveal = (visible: boolean, delay: number) => ({
    initial: { opacity: 0, y: 22 },
    animate: visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
    transition: { duration: 0.65, delay, ease },
  });

  return (
    <section
      id="suite"
      data-nav-tone="light"
      data-nav-bg="var(--canvas)"
      className="relative py-24 text-ink md:py-32"
    >
      <div
        ref={headRef}
        className="mx-auto w-full max-w-7xl px-5 text-center md:px-6 lg:px-8"
      >
        <SectionCaption {...reveal(headInView, 0)}>Potto Suite</SectionCaption>
      </div>

      <div className="mx-auto w-full max-w-7xl px-5 md:px-6 lg:px-8">
        {/* ---------- Ancillary services ---------- */}
        <div ref={auxRef} className="mt-28 md:mt-36">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-10">
            <div>
              <motion.h2
                {...reveal(auxInView, 0)}
                className="font-header text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl"
              >
                Potto Ancillary{" "}
                <span className="relative inline-block">
                  <span
                    aria-hidden
                    className="absolute inset-x-[-0.08em] bottom-[0.07em] h-[0.36em] rounded-[3px] bg-highlight/70"
                  />
                  <span className="relative">Services</span>
                </span>
              </motion.h2>

              <motion.p
                {...reveal(auxInView, 0.12)}
                className="mt-5 max-w-2xl text-lg leading-8 text-soft"
              >
                {BLURB}
              </motion.p>
            </div>

            {pages > 1 && (
              <div className="flex shrink-0 items-center gap-5">
                <div
                  className="flex items-center gap-2"
                  role="tablist"
                  aria-label="Ancillary service pages"
                >
                  {Array.from({ length: pages }, (_, i) => (
                    <button
                      key={i}
                      type="button"
                      role="tab"
                      aria-selected={i === page}
                      aria-label={`Go to page ${i + 1} of ${pages}`}
                      onClick={() => goToPage(i)}
                      className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${
                        i === page
                          ? "w-8 bg-brand"
                          : "w-2 bg-ink/20 hover:bg-ink/40"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => goToPage(Math.max(0, page - 1))}
                    disabled={page === 0}
                    aria-label="Previous services"
                    className="grid h-11 w-11 cursor-pointer place-items-center rounded-full bg-brand text-brand-fg transition duration-300 hover:scale-110 hover:bg-brand-teal disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:scale-100"
                  >
                    <HugeiconsIcon
                      icon={ArrowLeft01Icon}
                      size={20}
                      strokeWidth={2.4}
                    />
                  </button>

                  <button
                    type="button"
                    onClick={() => goToPage(Math.min(pages - 1, page + 1))}
                    disabled={page === pages - 1}
                    aria-label="More services"
                    className="grid h-11 w-11 cursor-pointer place-items-center rounded-full bg-brand text-brand-fg transition duration-300 hover:scale-110 hover:bg-brand-teal disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:scale-100"
                  >
                    <HugeiconsIcon
                      icon={ArrowRight01Icon}
                      size={20}
                      strokeWidth={2.4}
                    />
                  </button>
                </div>
              </div>
            )}
          </div>
          <div
            ref={trackRef}
            className="-my-3 mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto py-3 scrollbar-none [&::-webkit-scrollbar]:hidden"
          >
            {ANCILLARY.map((product, i) => (
              <motion.button
                key={product.name}
                type="button"
                onClick={() => setOpenService(product)}
                aria-label={"Open " + product.name + " details"}
                // Staggered one after another across the grid.
                {...reveal(auxInView, 0.24 + i * 0.1)}
                className="group relative flex min-h-88 shrink-0 basis-[82%] cursor-pointer snap-start flex-col items-center overflow-hidden rounded-3xl bg-brand-teal-dark p-8 text-center text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl sm:basis-[44%] lg:basis-[30%]"
              >
                <Image
                  src={product.image}
                  alt=""
                  aria-hidden
                  fill
                  sizes="(min-width: 1024px) 384px, (min-width: 640px) 45vw, 90vw"
                  className="absolute inset-0 object-cover"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-linear-to-b from-brand-teal-dark/50 via-brand-teal-dark/78 to-brand-teal-dark/95 transition-colors duration-300 group-hover:from-brand-teal-dark/35"
                />

                <span className="relative grid h-14 w-14 place-items-center rounded-full bg-brand-gold text-white shadow-md transition duration-300 group-hover:scale-110">
                  <HugeiconsIcon
                    icon={product.icon}
                    size={26}
                    strokeWidth={1.9}
                  />
                </span>

                <h3 className="relative mt-6 font-header text-2xl font-extrabold tracking-tight">
                  {product.name}
                </h3>
                <p className="relative mt-2 text-sm leading-6 font-medium text-white/85">
                  {product.tagline}
                </p>

                <span className="relative mt-auto grid h-9 w-9 place-items-center rounded-full bg-brand-gold text-white transition duration-300 group-hover:scale-110">
                  <HugeiconsIcon
                    icon={ArrowRight01Icon}
                    size={18}
                    strokeWidth={2.4}
                  />
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
      <Modal
        open={openService !== null}
        onClose={() => setOpenService(null)}
        label={openService ? openService.name : "Service"}
      >
        {openService && (
          <div className="max-h-full w-full max-w-xl overflow-y-auto rounded-3xl bg-white p-7 text-center text-ink shadow-2xl sm:p-10">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand-gold text-white">
              <HugeiconsIcon
                icon={openService.icon}
                size={30}
                strokeWidth={1.9}
              />
            </span>

            <h3 className="mt-5 font-header text-2xl font-extrabold tracking-tight sm:text-3xl">
              {openService.name}
            </h3>
            <p className="mt-1.5 text-sm font-medium text-soft sm:text-base">
              {openService.tagline}
            </p>
            <ul className="mx-auto mt-7 max-w-md space-y-3.5 text-left">
              {openService.points.map((point) => (
                <li
                  key={point}
                  className="flex gap-3.5 text-[0.95rem] leading-7"
                >
                  <span
                    aria-hidden
                    className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-brand-gold"
                  />
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex justify-center">
              <Link
                href={openService.href}
                className="inline-flex animate-glow items-center gap-2.5 rounded-full bg-brand-gold px-7 py-3.5 text-[0.95rem] font-semibold text-white [--glow:var(--color-brand-gold)] transition duration-300 hover:scale-105 hover:bg-brand-yellow hover:[--glow:var(--color-brand-yellow)]"
              >
                Learn More
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  size={18}
                  strokeWidth={2.4}
                />
              </Link>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
