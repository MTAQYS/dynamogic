"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { usePrefersReducedMotion } from "./motion/usePrefersReducedMotion";

/**
 * Soft mist keynote interstitial —
 * stacked soft-charcoal 3D planes = "brand layer" metaphor (light, airy).
 */
export function BrandLayer() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 32,
    restDelta: 0.001,
  });

  const p1y = useTransform(smooth, [0, 1], [80, -120]);
  const p2y = useTransform(smooth, [0, 1], [140, -180]);
  const p3y = useTransform(smooth, [0, 1], [40, -90]);
  const p4y = useTransform(smooth, [0, 1], [100, -150]);
  const rot = useTransform(smooth, [0, 1], [-8, 12]);
  const rotNeg = useTransform(rot, (r) => r * -0.6);
  const rotSoft = useTransform(rot, (r) => r * 0.35);
  const copyY = useTransform(smooth, [0.2, 0.55], [36, 0]);
  const copyOpacity = useTransform(smooth, [0.12, 0.38, 0.78, 0.96], [0, 1, 1, 0.55]);

  if (reduced) {
    return (
      <section
        className="relative overflow-hidden bg-bg-muted section-pad text-fg"
        aria-label="Brand layer"
      >
        <div className="site-wrap max-w-4xl text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-fg-muted">
            The metaphor
          </p>
          <p className="display-xl mx-auto mt-5 max-w-[18ch] text-[clamp(2rem,5vw,3.75rem)] text-fg">
            Your brand sits as a layer on every AI draft.
          </p>
          <div className="mx-auto mt-12 flex max-w-md flex-col gap-3">
            {[0.12, 0.2, 0.32, 0.45].map((o, i) => (
              <div
                key={i}
                className="h-16 border border-fg/10 bg-fg/[0.03]"
                style={{ opacity: o, transform: `translateX(${i * 8}px)` }}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className="relative h-[160vh] overflow-hidden bg-bg-muted"
      aria-label="Brand layer"
    >
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        <div className="theater-vignette-light pointer-events-none absolute inset-0" aria-hidden />

        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          style={{ perspective: "1400px" }}
          aria-hidden
        >
          <motion.div
            className="absolute h-[52vh] w-[70vw] max-w-3xl border border-fg/[0.06] bg-fg/[0.02]"
            style={{
              y: p1y,
              rotateX: 62,
              rotateZ: rot,
              transformStyle: "preserve-3d",
            }}
          />
          <motion.div
            className="absolute h-[48vh] w-[64vw] max-w-2xl border border-fg/[0.08] bg-fg/[0.03]"
            style={{
              y: p2y,
              rotateX: 58,
              rotateZ: rotNeg,
              transformStyle: "preserve-3d",
            }}
          />
          <motion.div
            className="absolute h-[44vh] w-[58vw] max-w-xl border border-fg/[0.1] bg-fg/[0.045]"
            style={{
              y: p3y,
              rotateX: 54,
              rotateZ: rotSoft,
              transformStyle: "preserve-3d",
            }}
          />
          <motion.div
            className="absolute h-[38vh] w-[50vw] max-w-lg border border-fg/15 bg-gradient-to-b from-bg-paper/80 to-fg/[0.04]"
            style={{
              y: p4y,
              rotateX: 50,
              scale: 1.05,
              transformStyle: "preserve-3d",
              boxShadow: "0 32px 64px rgba(42,42,40,0.12)",
            }}
          />
        </div>

        <motion.div
          className="relative z-10 site-wrap max-w-4xl text-center"
          style={{ y: copyY, opacity: copyOpacity }}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-fg-muted">
            The metaphor
          </p>
          <p className="display-xl mx-auto mt-5 max-w-[16ch] text-[clamp(2.25rem,6vw,4.25rem)] text-fg">
            Your brand sits as a layer on every AI draft.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
