"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowUp01Icon,
  Call02Icon,
  Clock01Icon,
  Facebook01Icon,
  InstagramIcon,
  Linkedin01Icon,
  Location05Icon,
  Mail01Icon,
} from "@hugeicons/core-free-icons";
import Wordmark from "@/components/Wordmark";

const MODULES = [
  "Staff Management",
  "Leave Management",
  "Monitoring & Reporting",
  "Visitation & Appointments",
  "Communication Tools",
  "Document Management",
  "Audit Record",
];

const EXPLORE = [
  { label: "What is Pottolite?", href: "/#about" },
  { label: "Features", href: "/#features" },
  { label: "Benefits", href: "/#benefits" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Our team", href: "/#team" },
  { label: "FAQ", href: "/#faq" },
];

const PHONES = ["+234 808 472 4276", "+234 812 557 8825"];
const EMAILS = ["Info@potto.ng", "support@potto.ng"];

const OFFICE_HOURS = [
  { days: "Monday – Friday", time: "8AM – 4PM" },
  { days: "Saturday", time: "8AM – 12 Noon" },
];

const ADDRESS =
  "House 83 Coal City Gardens, Behind Central Bank of Nigeria, Okpara Avenue, Enugu.";

const SOCIALS = [
  {
    label: "Potto on Facebook",
    icon: Facebook01Icon,
    href: "https://www.facebook.com/potto.ngr",
  },
  {
    label: "Potto on Instagram",
    icon: InstagramIcon,
    href: "https://www.instagram.com/potto.ng",
  },
  {
    label: "Potto on LinkedIn",
    icon: Linkedin01Icon,
    href: "https://www.linkedin.com/company/potto-ng",
  },
];

const BUILD_YEAR = new Date().getFullYear();
const subscribeToNothing = () => () => {};

export default function SiteFooter() {
  const year = useSyncExternalStore(
    subscribeToNothing,
    () => new Date().getFullYear(),
    () => BUILD_YEAR,
  );

  return (
    <footer
      id="contact"
      data-nav-tone="dark"
      data-nav-bg="var(--color-brand-teal-dark)"
      className="relative bg-brand-teal-dark pt-20 pb-10 text-white md:pt-24"
    >
      <div className="w-full px-5 md:px-8 lg:px-12">
        <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-3 lg:gap-10 xl:grid-cols-[1.5fr_1fr_1fr_1.5fr_1fr]">
          <div className="max-w-sm">
            <Link
              href="/"
              aria-label="Pottolite home"
              className="inline-flex items-center"
            >
              <Wordmark tone="dark" />
            </Link>

            <p className="mt-5 text-[0.95rem] leading-8 text-white/90">
              A productivity management system for digital workforce
              operations, by Potto Technologies Ltd.
            </p>

            <p className="mt-6 text-sm text-white/90" suppressHydrationWarning>
              © {year} Potto Technologies Ltd. All rights reserved
            </p>
            <a
              href="https://www.instagram.com/potto.ng"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block text-sm font-semibold text-highlight transition-colors hover:text-brand-yellow-light"
            >
              @Potto.ng
            </a>

            <ul className="mt-6 flex gap-2.5">
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white hover:text-brand-teal-dark"
                  >
                    <HugeiconsIcon
                      icon={social.icon}
                      size={17}
                      strokeWidth={2}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-header text-sm font-bold uppercase tracking-[0.14em]">
              Modules
            </h2>
            <ul className="mt-5 space-y-3">
              {MODULES.map((module) => (
                <li key={module}>
                  <Link
                    href="/#features"
                    className="text-[0.95rem] text-white/90 transition-colors hover:text-highlight"
                  >
                    {module}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-header text-sm font-bold uppercase tracking-[0.14em]">
              Explore
            </h2>
            <ul className="mt-5 space-y-3">
              {EXPLORE.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[0.95rem] text-white/90 transition-colors hover:text-highlight"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://potto.ng"
                  className="text-[0.95rem] text-white/90 transition-colors hover:text-highlight"
                >
                  Potto.ng
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-header text-sm font-bold uppercase tracking-[0.14em]">
              Contact
            </h2>
            <ul className="mt-5 space-y-4 text-[0.95rem] text-white/90">
              <li className="flex items-start gap-3">
                <HugeiconsIcon
                  icon={Location05Icon}
                  size={18}
                  strokeWidth={1.8}
                  className="mt-1 shrink-0 text-highlight"
                />
                <span className="leading-7">{ADDRESS}</span>
              </li>

              {EMAILS.map((email) => (
                <li key={email}>
                  <a
                    href={`mailto:${email}`}
                    className="flex items-start gap-3 transition-colors hover:text-highlight"
                  >
                    <HugeiconsIcon
                      icon={Mail01Icon}
                      size={18}
                      strokeWidth={1.8}
                      className="mt-0.5 shrink-0 text-highlight"
                    />
                    {email}
                  </a>
                </li>
              ))}

              {PHONES.map((phone) => (
                <li key={phone}>
                  <a
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="flex items-start gap-3 transition-colors hover:text-highlight"
                  >
                    <HugeiconsIcon
                      icon={Call02Icon}
                      size={18}
                      strokeWidth={1.8}
                      className="mt-0.5 shrink-0 text-highlight"
                    />
                    {phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-header text-sm font-bold uppercase tracking-[0.14em]">
              Office Hours
            </h2>
            <ul className="mt-5 space-y-4 text-[0.95rem] text-white/90">
              {OFFICE_HOURS.map((slot) => (
                <li key={slot.days} className="flex items-start gap-3">
                  <HugeiconsIcon
                    icon={Clock01Icon}
                    size={18}
                    strokeWidth={1.8}
                    className="mt-0.5 shrink-0 text-highlight"
                  />
                  <span>
                    <span className="block font-medium text-white">
                      {slot.days}
                    </span>
                    <span className="mt-0.5 block">{slot.time}</span>
                  </span>
                </li>
              ))}
            </ul>

            <a
              href="mailto:support@potto.ng?subject=Pottolite"
              className="mt-7 inline-flex animate-glow items-center justify-center rounded-full bg-brand-yellow px-6 py-3 text-sm font-semibold text-ink [--glow:var(--color-brand-yellow)] transition duration-300 hover:bg-brand-yellow-light hover:[--glow:var(--color-brand-yellow-light)]"
            >
              Email support
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-5 border-t border-white/15 pt-8 sm:flex-row sm:justify-between">
          <p className="order-2 text-sm text-white/90 sm:order-1">
            Pottolite is a product of Potto Technologies Ltd.
          </p>

          <div className="order-1 flex items-center gap-6 sm:order-2">
            <a
              href="#"
              aria-label="Back to top"
              className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            >
              <HugeiconsIcon icon={ArrowUp01Icon} size={16} strokeWidth={2} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
