import { HugeiconsIcon } from "@hugeicons/react";
import { PlayIcon } from "@hugeicons/core-free-icons";


export default function PlayBadge({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 grid place-items-center"
    >
      <span
        className={`relative grid h-20 w-20 place-items-center sm:h-24 sm:w-24 ${className}`}
      >
        <span className="absolute inset-0 animate-halo rounded-full bg-brand-yellow blur-lg" />
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-brand-yellow" />
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-brand-yellow [animation-delay:1.3s]" />

        <span className="relative grid h-full w-full animate-glow place-items-center rounded-full bg-brand-yellow text-ink shadow-xl [--glow:var(--color-brand-yellow)] transition duration-300 group-hover:scale-110 group-hover:bg-brand-yellow-light group-hover:[--glow:var(--color-brand-yellow-light)]">
          <HugeiconsIcon
            icon={PlayIcon}
            size={34}
            strokeWidth={2.2}
            className="translate-x-0.5"
          />
        </span>
      </span>
    </span>
  );
}
