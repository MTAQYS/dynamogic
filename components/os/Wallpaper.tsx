"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";
import { usePrefersReducedMotion } from "../motion/usePrefersReducedMotion";

export function Wallpaper() {
  const reduced = usePrefersReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 20 });
  const sy = useSpring(my, { stiffness: 40, damping: 20 });

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mx.set(((e.clientX - cx) / cx) * 12);
      my.set(((e.clientY - cy) / cy) * 8);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, reduced]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute -inset-[8%]"
        style={reduced ? undefined : { x: sx, y: sy }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 90% 70% at 20% 15%, rgba(255,255,255,0.85) 0%, transparent 55%),
              radial-gradient(ellipse 70% 60% at 85% 75%, rgba(232,230,225,0.9) 0%, transparent 50%),
              radial-gradient(ellipse 50% 40% at 60% 30%, rgba(240,238,233,0.6) 0%, transparent 60%),
              linear-gradient(165deg, #F7F6F3 0%, #F0EEE9 45%, #EDEBE6 100%)
            `,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "180px 180px",
          }}
        />
        <div className="fog-layer absolute inset-0" />
      </motion.div>
    </div>
  );
}
