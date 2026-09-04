"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Add01Icon,
  Cancel01Icon,
  Search01Icon,
} from "@hugeicons/core-free-icons";
import SectionCaption from "@/components/SectionCaption";

/**
 * Frequently asked questions.
 *
 * The questions are phrased as the objections a school actually raises when it
 * is close to buying ("Do we have to set everything up ourselves?" rather than
 * "Will Potto's team handle setup?"). That is the point of the copy, so resist
 * tidying them into product-spec headings.
 */
type Group = { title: string; items: { q: string; a: string }[] };

const GROUPS: Group[] = [
  {
    title: "Before we get started",
    items: [
      {
        q: "We're interested in Potto. What happens after we sign up?",
        a: "Once you sign up, our team will guide you through the onboarding process. We'll help you set up your school, prepare your records, configure the features you need, train your team, and get you ready to start using Potto.",
      },
      {
        q: "What information do you need from us to get started?",
        a: "We'll provide you with a simple list of the information we need. This may include your student, staff, parent/guardian, class, and other relevant school records, depending on the Potto solutions you choose.",
      },
      {
        q: "Do we have to set everything up ourselves?",
        a: "No. Our team will guide you through the setup and help you get your school properly configured.",
      },
      {
        q: "How long will it take before we can start using Potto?",
        a: "It depends on the size of your school, the solutions you're implementing, and how quickly the required information is provided. We'll work with you to agree on a suitable implementation timeline.",
      },
      {
        q: "Will you train our staff?",
        a: "Yes. We'll train the relevant members of your team so they understand how to use Potto and can confidently handle their responsibilities on the platform.",
      },
    ],
  },
  {
    title: "About your subscription",
    items: [
      {
        q: "How much will Potto cost our school?",
        a: "Potto has different subscription plans designed to meet different school needs. We'll help you choose the plan that gives your school the features you need without paying for what you don't.",
      },
      {
        q: "What exactly am I paying for?",
        a: "Your subscription gives you access to the features included in your chosen plan. Before you subscribe, we'll clearly explain what's included so you know exactly what you're getting.",
      },
      {
        q: "Are there any extra charges I should know about?",
        a: "We'll clearly communicate all applicable costs before you subscribe. If there are additional services or requirements outside your plan, you'll be informed beforehand.",
      },
      {
        q: "What if we start with one plan and later need more features?",
        a: "That's not a problem. As your school grows or your needs change, you can discuss upgrading your plan with our team.",
      },
      {
        q: "Can we pay for Potto annually?",
        a: "Yes, you can discuss the available billing options with our team and choose the arrangement that works best for your school.",
      },
    ],
  },
  {
    title: "Getting your school ready",
    items: [
      {
        q: "Can you help us move our existing school records to Potto?",
        a: "Yes. We'll guide you on how to prepare your existing records and help you through the process of getting them into Potto.",
      },
      {
        q: "What if our school has a lot of students and staff?",
        a: "That's exactly why we have an onboarding process. We'll work with your school to organize your information and set up Potto in a way that works for your size and structure.",
      },
      {
        q: "Can we add new students or staff ourselves later?",
        a: "Yes. Authorized school administrators can add, update, and manage relevant records as your school changes.",
      },
      {
        q: "What happens when a staff member leaves the school?",
        a: "You can update the staff member's status and manage their access to the platform so that they no longer have access to information they shouldn't.",
      },
      {
        q: "Can we decide what each staff member is allowed to see?",
        a: "Yes. Access can be managed according to staff roles and responsibilities, so users can have access to the information and features they need.",
      },
    ],
  },
  {
    title: "For parents",
    items: [
      {
        q: "Do parents need to be tech-savvy to use Potto?",
        a: "Not at all. Potto is designed to be easy to use, and parents can be guided through the process of accessing and using the features available to them.",
      },
      {
        q: "How will our parents get access to Potto?",
        a: "Your school will provide the necessary parent/guardian information during onboarding, and our team will guide you on how to get parents connected.",
      },
      {
        q: "Can both parents or guardians have access to a child's information?",
        a: "Yes, multiple authorized parents or guardians can be linked to a student where applicable.",
      },
      {
        q: "What if some of our parents don't have smartphones?",
        a: "Let us know during onboarding. We'll discuss the available options with your school so you can determine the best way to accommodate those parents.",
      },
    ],
  },
  {
    title: "Safety and security",
    items: [
      {
        q: "How does Potto actually help keep our students safe?",
        a: "Potto gives your school tools to better control and monitor student movement, verify parents and guardians, manage visitors, monitor attendance, and respond to emergencies.",
      },
      {
        q: "Can someone just come to school and pick up a child?",
        a: "Potto is designed to help schools control student release and verify authorized persons before a student is allowed to leave.",
      },
      {
        q: "What happens if there's an emergency in our school?",
        a: "Potto's emergency features help your school raise alerts and quickly notify the appropriate people so that action can be taken when it matters most.",
      },
      {
        q: "Who can see our students' information?",
        a: "Access is controlled based on user roles and permissions. This helps ensure that sensitive student information is only available to authorized users.",
      },
      {
        q: "Is our school's data safe with Potto?",
        a: "We take the security and privacy of school, student, parent, and staff information seriously. Potto uses access controls and security measures designed to protect your information.",
      },
    ],
  },
  {
    title: "Support after you subscribe",
    items: [
      {
        q: "What happens if we have a problem after we go live?",
        a: "You won't be left on your own. You can reach out to our support team, and we'll help your school troubleshoot and resolve the issue.",
      },
      {
        q: "Who do we contact when we need help?",
        a: "Your school will receive the appropriate support contact and guidance during onboarding.",
      },
      {
        q: "What if our staff don't understand how to use a particular feature?",
        a: "Reach out to our team. We can provide guidance and help your staff understand how to use the feature correctly.",
      },
      {
        q: "What happens if our internet goes down?",
        a: "Some Potto features require an internet connection to work. If your school's connection goes down, affected online features may be temporarily unavailable until connectivity is restored.",
      },
    ],
  },
  {
    title: "One last question",
    items: [
      {
        q: "We're ready. How do we get started?",
        a: "Great! Simply contact the Potto team or sign up through our website. We'll help you choose the right solution, complete your onboarding, train your team, and get your school up and running.",
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

/**
 * Panel ids come from the question text, not its position.
 *
 * Filtering reorders and removes entries, so an index-based id would let an
 * open card keep an id that now belongs to a different question — the wrong
 * panel would appear expanded the moment you typed.
 */
const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);

/**
 * Marks each matched term inside a string.
 *
 * The split pattern is capturing, so the matches come back as array entries
 * alongside the text between them; a term is identified by lowercased lookup
 * rather than by re-testing the RegExp, because a /g/ RegExp carries lastIndex
 * between calls and would match every other time.
 */
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
          Get clear answers about Potto, its features, and how our solutions
          make school management safer, simpler, and smarter.
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
              placeholder="Search the questions — try &quot;cost&quot; or &quot;parents&quot;"
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

        <div className="mt-16 space-y-14">
          {filtered.map((group) => (
            <div key={group.title}>
              <motion.h3
                {...reveal}
                className="font-header text-lg font-extrabold tracking-tight text-brand sm:text-xl"
              >
                {group.title}
              </motion.h3>

              {/* items-start so opening one card does not stretch the card
                  beside it to match. */}
              <ul className="mt-6 grid gap-4 md:grid-cols-2 md:items-start">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
