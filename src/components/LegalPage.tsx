import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import HomeHeader from "@/components/HomeHeader";
import PageBackdrop from "@/components/PageBackdrop";
import SiteFooter from "@/components/SiteFooter";


export type LegalBlock = string | { list: string[] } | { confirm: string };
export type LegalSection = { heading: string; blocks: LegalBlock[] };

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function Blocks({ blocks }: { blocks: LegalBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        if (typeof block === "string") {
          return (
            <p key={i} className="mt-4 text-[0.95rem] leading-7 text-soft">
              {block}
            </p>
          );
        }

        if ("list" in block) {
          return (
            <ul key={i} className="mt-4 space-y-2.5">
              {block.list.map((item) => (
                <li
                  key={item}
                  className="flex gap-3.5 text-[0.95rem] leading-7 text-soft"
                >
                  <span
                    aria-hidden
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold"
                  />
                  {item}
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p
            key={i}
            className="mt-4 rounded-xl bg-brand-yellow-light/30 px-4 py-3 text-[0.9rem] leading-6 text-ink"
          >
            <span className="font-semibold">To confirm: </span>
            {block.confirm}
          </p>
        );
      })}
    </>
  );
}

export default function LegalPage({
  kicker,
  title,
  updated,
  intro,
  sections,
}: {
  kicker: string;
  title: string;
  updated: string;
  intro: string[];
  sections: LegalSection[];
}) {
  return (
    <main className="relative min-h-screen overflow-x-hidden font-poppins text-ink">
      <PageBackdrop />
      <HomeHeader />

     
      <section
        data-nav-tone="light"
        data-nav-bg="var(--canvas)"
        className="relative px-5 pt-32 pb-24 md:px-6 md:pt-40 md:pb-28 lg:px-8"
      >
        <div className="mx-auto w-full max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.22em] text-soft uppercase">
            {kicker}
          </p>

          <h1 className="mt-6 font-header text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-sm font-semibold text-soft">
            Last revised {updated}
          </p>

          {intro.map((paragraph) => (
            <p
              key={paragraph}
              className="mt-5 text-base leading-8 text-soft sm:text-[1.05rem]"
            >
              {paragraph}
            </p>
          ))}

          <nav aria-label="Contents" className="mt-12">
            <h2 className="text-xs font-semibold tracking-[0.22em] text-soft uppercase">
              Contents
            </h2>
            <ol className="mt-4 space-y-2">
              {sections.map((section, i) => (
                <li key={section.heading} className="text-[0.95rem]">
                  <Link
                    href={`#${slug(section.heading)}`}
                    className="text-brand underline-offset-4 hover:underline"
                  >
                    {i + 1}. {section.heading}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-14 space-y-12">
            {sections.map((section, i) => (
              <section
                key={section.heading}
                id={slug(section.heading)}
                className="scroll-mt-28"
              >
                <h2 className="font-header text-xl font-extrabold tracking-tight sm:text-2xl">
                  <span className="text-brand">{i + 1}.</span> {section.heading}
                </h2>
                <Blocks blocks={section.blocks} />
              </section>
            ))}
          </div>

          <div className="mt-16">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand underline-offset-4 hover:underline"
            >
              <HugeiconsIcon
                icon={ArrowLeft01Icon}
                size={16}
                strokeWidth={2.4}
                aria-hidden
              />
              Back to the homepage
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
