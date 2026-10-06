import Image from "next/image";

/**
 * The Potto hand plus "Pottolite" set in type. There is no Pottolite wordmark
 * artwork, so the name is live text and recolours with the ground for free.
 */
export default function Wordmark({
  tone = "light",
  priority = false,
  className = "",
}: {
  tone?: "light" | "dark";
  priority?: boolean;
  className?: string;
}) {
  const onDark = tone === "dark";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Image
        src="/pottolite-mark.webp"
        alt=""
        width={93}
        height={160}
        priority={priority}
        className={`h-8 w-auto transition duration-300 ${onDark ? "brightness-0 invert" : ""}`}
      />
      <span
        className={`font-header text-xl font-extrabold tracking-tight transition-colors duration-300 ${
          onDark ? "text-white" : "text-ink"
        }`}
      >
        Pottolite
      </span>
    </span>
  );
}
