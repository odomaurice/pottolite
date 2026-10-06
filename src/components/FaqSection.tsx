"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Add01Icon,
  ArrowDown01Icon,
  Cancel01Icon,
  Search01Icon,
} from "@hugeicons/core-free-icons";
import SectionCaption from "@/components/SectionCaption";

type Group = { title: string; items: { q: string; a: string }[] };

const GROUPS: Group[] = [
  {
    title: "About Pottolite",
    items: [
      {
        q: "What is Pottolite?",
        a: "Pottolite is a productivity management system for digital workforce operations. It gives your organisation one centralised platform for staff records, communication and reporting, so you rely less on manual processes and get more transparency into how work is done.",
      },
      {
        q: "Who makes Pottolite?",
        a: "Pottolite is built by Potto Technologies Ltd, a software and digital solutions company focused on productivity, efficiency and collaboration. Our mission is to empower organisations with tools that simplify work.",
      },
      {
        q: "What can Pottolite do?",
        a: "Pottolite brings together seven modules: Staff Management, Leave Management, Digital Monitoring and Reporting, Visitation and Appointment Management, Communication Tools, Document Management, and an Audit Record of everything that happens on the platform.",
      },
      {
        q: "How does Pottolite help our organisation?",
        a: "It streamlines day-to-day operations, improves collaboration, keeps staff files handled securely, lets you monitor your workforce in real time from the dashboard, and gives you the reports you need to make better decisions.",
      },
    ],
  },
  {
    title: "Using Pottolite",
    items: [
      {
        q: "How do we add a staff member?",
        a: "Go to Staff Management from the dashboard, add the staff member and fill in their details, such as name and designation. You can upload their ID, certificates or other documents, then save to create their digital staff profile.",
      },
      {
        q: "Can we keep staff documents in Pottolite?",
        a: "Yes. IDs, certificates and other documents can be uploaded to each staff profile, and the File Management module keeps your files together in one place instead of in paper folders.",
      },
      {
        q: "How do we send messages to staff?",
        a: "Open Communication and choose Email, WhatsApp or SMS. Select your recipients, type your message, and then send it, save it for later or cancel it. You can open any message afterwards to view its details.",
      },
      {
        q: "How do staff monitoring reports work?",
        a: "Open Staff Report from the dashboard to view and print staff monitoring summaries. You can filter the report by date and exempt specific dates so they are not counted.",
      },
      {
        q: "How do we manage visitors and appointments?",
        a: "Go to the Visitor Appointment module to schedule or approve appointments. Record each visitor's details and check them in and out, and Pottolite keeps the security and visitor logs for you.",
      },
      {
        q: "Can we see who did what on the platform?",
        a: "Yes. The Audit log, available from the admin panel, records staff actions such as logins, uploads and updates. You can filter it by date, user or activity.",
      },
      {
        q: "Does Pottolite handle staff leave?",
        a: "Yes. Leave Management is one of Pottolite's core modules, so staff leave is handled on the same platform as their profiles and reports.",
      },
    ],
  },
  {
    title: "Training and support",
    items: [
      {
        q: "Will our team be trained?",
        a: "Pottolite training walks your team through each module: staff management, communication, monitoring and reporting, visitation and appointments, and the audit log.",
      },
      {
        q: "Who do we contact when we need help?",
        a: "Our support team is here to help. Email support@potto.ng, call one of the numbers at the bottom of this page, or use the WhatsApp button to chat with us.",
      },
      {
        q: "We're interested. How do we get started?",
        a: "Get in touch using the contact details at the bottom of this page and our team will take it from there.",
      },
    ],
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

const TOTAL = GROUPS.reduce((n, group) => n + group.items.length, 0);

/** A query is a set of words, all of which must appear somewhere in the entry. */
const termsOf = (query: string) =>
  query.toLowerCase().split(/\s+/).filter(Boolean);

// User input goes into a RegExp below, so the metacharacters have to go.
const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");


const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);


function Highlight({ text, terms }: { text: string; terms: string[] }) {
  if (!terms.length) return <>{text}</>;

  const pattern = new RegExp(`(${terms.map(escapeRegExp).join("|")})`, "gi");
  const wanted = new Set(terms);

  return (
    <>
      {text.split(pattern).map((part, i) =>
        wanted.has(part.toLowerCase()) ? (
          <mark
            key={i}
            className="rounded-sm bg-brand-yellow-light px-0.5 text-ink"
          >
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  );
}

export default function FaqSection() {
  // One panel at a time. With cards in a two-column grid, several open at once
  // pushes rows around underneath whatever the reader is currently looking at.
  const [open, setOpen] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const reduced = useReducedMotion();

  // Sections collapse and expand as a whole, several at a time if you like.
  // The first starts open so the FAQ never loads as a bare list of headings.
  const [openGroups, setOpenGroups] = useState<Set<string>>(
    () => new Set([GROUPS[0].title]),
  );
  const toggleGroup = (title: string) =>
    setOpenGroups((current) => {
      const next = new Set(current);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });
  const allOpen = GROUPS.every((group) => openGroups.has(group.title));
  const controlsRef = useRef<HTMLDivElement>(null);

  const terms = useMemo(() => termsOf(query), [query]);

  // Questions AND answers are searched: someone looking for "refund" or
  // "smartphone" is searching for the subject, and the subject usually lives in
  // the answer rather than in the phrasing of the question.
  const filtered = useMemo(() => {
    if (!terms.length) return GROUPS;
    return GROUPS.map((group) => ({
      ...group,
      items: group.items.filter((item) => {
        const haystack = `${item.q} ${item.a}`.toLowerCase();
        return terms.every((term) => haystack.includes(term));
      }),
    })).filter((group) => group.items.length > 0);
  }, [terms]);

  const matches = filtered.reduce((n, group) => n + group.items.length, 0);

  // While searching, every section with a match is forced open: a match hidden
  // inside a collapsed section would look exactly like no match at all.
  // Clearing the search puts back whatever was open before.
  const searching = terms.length > 0;

  /**
   * Reveal on enter, hide again on leave.
   *
   * Note the deliberate absence of `viewport.once` — that flag is what makes
   * the rest of the site animate in and then stay put. Leaving it off is the
   * whole feature here: framer-motion returns the element to `initial` once it
   * is out of view, so cards fade back out behind you.
   *
   * No extra library is involved, and none is needed (see the README note on
   * this): data-fetching packages have nothing to do with scroll position.
   */
  const reveal = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 26 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { amount: 0.25 },
        transition: { duration: 0.5, ease },
      };

  return (
    <section
      id="faq"
      data-nav-tone="light"
      data-nav-bg="var(--canvas)"
      className="relative scroll-mt-24 py-24 text-ink md:py-32"
    >
      <div className="mx-auto w-full max-w-7xl px-5 md:px-6 lg:px-8">
        <SectionCaption>Frequently Asked Questions</SectionCaption>

        <motion.h2
          {...reveal}
          className="mx-auto mt-7 max-w-4xl text-center font-header text-4xl leading-[1.06] font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
        >
          Everything You Need To Know
        </motion.h2>

        <motion.p
          {...reveal}
          className="mx-auto mt-5 max-w-2xl text-center text-base leading-7 text-soft sm:text-lg sm:leading-8"
        >
          Clear answers about Pottolite, what each module does, and how to get
          your team started.
        </motion.p>

        {/* Deliberately not wrapped in `reveal`: the cards fade out as they
            leave the viewport, and a search box that faded out under the
            cursor while you were typing in it would be worse than useless. */}
        <div className="mx-auto mt-10 max-w-xl">
          <div className="relative">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-5 grid place-items-center text-soft"
            >
              <HugeiconsIcon icon={Search01Icon} size={20} strokeWidth={1.9} />
            </span>

            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search the questions — try &quot;leave&quot; or &quot;audit&quot;"
              aria-label="Search frequently asked questions"
              className="w-full rounded-full bg-surface-2 py-4 pr-14 pl-14 text-sm outline-none transition duration-300 placeholder:text-soft focus:bg-white focus:ring-2 focus:ring-brand sm:text-base [&::-webkit-search-cancel-button]:hidden"
            />

            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute inset-y-0 right-4 grid cursor-pointer place-items-center text-soft transition-colors hover:text-ink"
              >
                <HugeiconsIcon
                  icon={Cancel01Icon}
                  size={20}
                  strokeWidth={2.2}
                />
              </button>
            )}
          </div>

          {/* aria-live so the count is announced as the list narrows, rather
              than the change being silent to a screen reader. */}
          <p aria-live="polite" className="mt-3 text-center text-sm text-soft">
            {query
              ? `${matches} of ${TOTAL} question${matches === 1 ? "" : "s"} match`
              : `${TOTAL} questions`}
          </p>
        </div>

        {filtered.length === 0 && (
          <div className="mt-14 text-center">
            <p className="font-header text-xl font-extrabold tracking-tight">
              No questions match “{query}”.
            </p>
            <p className="mt-3 text-soft">
              Try a different word, or{" "}
              <button
                type="button"
                onClick={() => setQuery("")}
                className="cursor-pointer font-semibold text-brand underline underline-offset-4"
              >
                clear the search
              </button>{" "}
              to see all {TOTAL}.
            </p>
          </div>
        )}

        {/* Hidden while searching, when the matching sections are open anyway;
            min-h keeps the layout from jumping as it comes and goes. */}
        <div
          ref={controlsRef}
          className="mt-12 flex min-h-6 scroll-mt-28 justify-end"
        >
          {!searching && (
            <button
              type="button"
              onClick={() => {
                if (!allOpen) {
                  setOpenGroups(new Set(GROUPS.map((group) => group.title)));
                  return;
                }
                setOpenGroups(new Set());
                // Collapsing everything removes most of the page below here,
                // and the FAQ sits just above the footer, so the browser has
                // to pull the scroll up — which threw the reader into
                // the section above, with the headers they wanted below the fold.
                // Bringing the controls to the top (clear of the fixed header,
                // via scroll-mt) keeps the collapsed sections in view.
                //
                // Instant, not smooth, on purpose. The collapse animates
                // height "auto" -> 0, which framer-motion has to measure; after
                // measuring it calls window.scrollTo(0, <the scrollY it
                // recorded>) to undo any shift (motion-dom KeyframesResolver).
                // Landing mid-way through a smooth scroll, that call cancels
                // it — the page did not move at all. An instant scroll has
                // already finished when motion records the position, so motion
                // "restores" the page to the new place instead.
                controlsRef.current?.scrollIntoView({ block: "start" });
              }}
              className="cursor-pointer text-sm font-semibold text-brand underline-offset-4 hover:underline"
            >
              {allOpen ? "Collapse all" : "Expand all"}
            </button>
          )}
        </div>

        <div className="mt-4 space-y-3">
          {filtered.map((group) => {
            const gid = slug(group.title);
            const expanded = searching || openGroups.has(group.title);
            const count = group.items.length;
            const noun = searching
              ? count === 1
                ? "match"
                : "matches"
              : count === 1
                ? "question"
                : "questions";

            return (
              <div key={group.title}>
                {/* A tinted fill rather than an outline — the page avoids
                    frames — lifting to the brand tint on hover. */}
                <motion.div {...reveal}>
                  <button
                    type="button"
                    id={`faq-group-${gid}`}
                    aria-expanded={expanded}
                    aria-controls={`faq-group-panel-${gid}`}
                    onClick={() => toggleGroup(group.title)}
                    disabled={searching}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-2xl bg-surface-2 px-5 py-4 text-left transition-colors duration-300 hover:bg-brand/10 disabled:cursor-default disabled:hover:bg-surface-2 sm:px-6 sm:py-5"
                  >
                    <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="font-header text-lg font-extrabold tracking-tight text-brand sm:text-xl">
                        {group.title}
                      </span>
                      <span className="text-sm text-soft">
                        {count} {noun}
                      </span>
                    </span>

                    {!searching && (
                      <span
                        aria-hidden
                        className={`grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-brand shadow-sm transition-transform duration-300 ${
                          expanded ? "rotate-180" : ""
                        }`}
                      >
                        <HugeiconsIcon
                          icon={ArrowDown01Icon}
                          size={20}
                          strokeWidth={2.4}
                        />
                      </span>
                    )}
                  </button>
                </motion.div>

                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.div
                      key="group"
                      id={`faq-group-panel-${gid}`}
                      role="region"
                      aria-labelledby={`faq-group-${gid}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduced ? 0 : 0.4, ease }}
                      className="overflow-hidden"
                    >
                      {/* items-start so opening one card does not stretch the
                          card beside it. The spacing is padding in here, not
                          margin outside, so a closed section collapses to its
                          header with nothing left over. */}
                      <ul className="grid gap-4 pt-4 pb-6 md:grid-cols-2 md:items-start">
                        {group.items.map((item) => {
                          const id = slug(item.q);
                          const isOpen = open === id;

                          return (
                            <motion.li
                              key={item.q}
                              {...reveal}
                              className="overflow-hidden rounded-2xl bg-brand-teal/35 transition-colors duration-300 hover:bg-brand-teal/45"
                            >
                              <button
                                type="button"
                                id={`faq-trigger-${id}`}
                                aria-expanded={isOpen}
                                aria-controls={`faq-panel-${id}`}
                                onClick={() => setOpen(isOpen ? null : id)}
                                className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left sm:p-6"
                              >
                                <span className="font-header text-[0.95rem] leading-snug font-extrabold tracking-tight sm:text-base">
                                  <Highlight text={item.q} terms={terms} />
                                </span>

                                {/* One icon, rotated, rather than swapping plus for a
                                    cross: the 45 degree turn animates the state change
                                    instead of cutting between two glyphs. */}
                                <span
                                  aria-hidden
                                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-brand transition-transform duration-300 ${
                                    isOpen ? "rotate-45" : ""
                                  }`}
                                >
                                  <HugeiconsIcon
                                    icon={Add01Icon}
                                    size={20}
                                    strokeWidth={2.4}
                                  />
                                </span>
                              </button>

                              <AnimatePresence initial={false}>
                                {isOpen && (
                                  <motion.div
                                    key="panel"
                                    id={`faq-panel-${id}`}
                                    role="region"
                                    aria-labelledby={`faq-trigger-${id}`}
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{
                                      duration: reduced ? 0 : 0.32,
                                      ease,
                                    }}
                                    className="overflow-hidden"
                                  >
                                    <p className="px-5 pb-5 text-[0.9rem] leading-6 text-ink/75 sm:px-6 sm:pb-6">
                                      <Highlight text={item.a} terms={terms} />
                                    </p>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.li>
                          );
                        })}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
