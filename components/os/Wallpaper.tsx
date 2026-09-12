"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";
import { usePrefersReducedMotion } from "../motion/usePrefersReducedMotion";

export function Wallpaper() {
  const reduced = usePrefersReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 36, damping: 24, mass: 1.1 });
  const sy = useSpring(my, { stiffness: 36, damping: 24, mass: 1.1 });

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mx.set(((e.clientX - cx) / cx) * 10);
      my.set(((e.clientY - cy) / cy) * 7);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, reduced]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute -inset-[10%]"
        style={reduced ? undefined : { x: sx, y: sy }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 100% 80% at 12% 8%, rgba(255,255,255,0.55) 0%, transparent 52%),
              radial-gradient(ellipse 75% 65% at 88% 18%, rgba(250,250,248,0.52) 0%, transparent 48%),
              radial-gradient(ellipse 70% 55% at 72% 82%, rgba(244,243,240,0.45) 0%, transparent 55%),
              radial-gradient(ellipse 55% 45% at 28% 70%, rgba(244,243,240,0.33) 0%, transparent 60%),
              radial-gradient(ellipse 40% 35% at 50% 40%, rgba(255,255,255,0.28) 0%, transparent 70%),
              linear-gradient(168deg, #FAFAF8 0%, #F4F3F0 42%, #F0EEEA 100%)
            `,
          }}
        />
        {/* Very subtle film grain */}
        <div
          className="absolute inset-0 opacity-[0.018] mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "220px 220px",
          }}
        />
        <div className="fog-layer absolute inset-0" />
      </motion.div>
    </div>
  );
}
