"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/** Thin ink progress line at the top of the viewport. */
export function ScrollProgress() {
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  if (reduced) {
    return (
      <div
        className="pointer-events-none fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-fg/20"
        aria-hidden="true"
      />
    );
  }

  return (
    <motion.div
      className="pointer-events-none fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-fg"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
