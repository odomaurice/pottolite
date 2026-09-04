"use client";

import type { ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

type Props = Omit<HTMLMotionProps<"p">, "children"> & {
  tone?: "light" | "dark";
  children: ReactNode;
};

export default function SectionCaption({
  tone = "light",
  className = "",
  children,
  ...rest
}: Props) {
  return (
    <motion.p
      {...rest}
      className={`text-center text-xs font-semibold tracking-[0.22em] uppercase ${
        tone === "dark" ? "text-white/70" : "text-soft"
      } ${className}`}
    >
      {children}
      <span
        aria-hidden
        className={`mx-auto mt-3 block h-0.5 w-10 ${
          tone === "dark" ? "bg-white/50" : "bg-brand"
        }`}
      />
    </motion.p>
  );
}
