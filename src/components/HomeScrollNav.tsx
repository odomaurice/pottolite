"use client";

import { useCallback, useEffect, useState } from "react";

// Each id must match an anchor rendered on the homepage, AND this list must
// stay in the same order the sections appear in page.tsx. The active dot is the
// last entry whose top has passed the probe, walked in list order — so an entry
// out of sequence highlights the wrong dot and sends clicks to the wrong place.
// It had drifted once already (hardware and plans had both moved in page.tsx).
type Section = { id: string | null; label: string };

const SECTIONS: Section[] = [
  { id: null, label: "Top" },
  { id: "intro-video", label: "Potto in action" },
  { id: "features", label: "Features" },
  { id: "problem", label: "The problem" },
  { id: "hardware", label: "Hardware" },
  { id: "suite", label: "Potto Suite" },
  { id: "solutions", label: "Solutions" },
  { id: "plans", label: "Plans" },
  { id: "testimonials", label: "Testimonials" },
  { id: "faq", label: "FAQ" },
];

const LAST = SECTIONS.length - 1;

export default function HomeScrollNav() {
  const [active, setActive] = useState(0);

  // Absolute document offset of a section's top (0 for the hero/top entry).
  const topOf = (s: Section) => {
    if (!s.id) return 0;
    const el = document.getElementById(s.id);
    return el
      ? el.getBoundingClientRect().top + window.scrollY
      : Number.POSITIVE_INFINITY;
  };

  useEffect(() => {
    let ticking = false;

    const compute = () => {
      ticking = false;

      const probe = window.scrollY + window.innerHeight * 0.3;
      let idx = 0;
      for (let i = 0; i < SECTIONS.length; i += 1) {
        if (probe >= topOf(SECTIONS[i])) idx = i;
      }

      if (
        window.innerHeight + window.scrollY >=
        document.body.scrollHeight - 4
      ) {
        idx = LAST;
      }
      setActive(idx);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const goTo = useCallback((i: number) => {
    const target = SECTIONS[Math.max(0, Math.min(LAST, i))];
    if (!target.id) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    document.getElementById(target.id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      {/* Left — section indicator */}
      <nav
        aria-label="Section navigation"
        className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
      >
        <ul className="flex flex-col items-center gap-3">
          {SECTIONS.map((s, i) => {
            const isActive = active === i;
            return (
              <li key={s.label}>
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to ${s.label}`}
                  aria-current={isActive ? "true" : undefined}
                  className="group relative flex cursor-pointer items-center py-1"
                >
                  <span
                    className={`block rounded-full transition-all duration-300 ${
                      isActive
                        ? "h-6 w-1.5 bg-brand"
                        : "h-1.5 w-1.5 bg-line group-hover:bg-soft"
                    }`}
                  />
                  {/* Label on hover */}
                  <span className="pointer-events-none absolute left-6 whitespace-nowrap rounded-md border border-line bg-surface px-2 py-1 text-xs font-medium text-ink opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100">
                    {s.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

    </>
  );
}
