"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "../motion/usePrefersReducedMotion";
import { useWindows } from "./WindowContext";

const KEY = "dynamogic-os-welcome-dismissed";

export function StickyNote() {
  const { openApp, isMobile } = useWindows();
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(KEY) === "1") return;
    } catch {
      /* ignore */
    }
    setVisible(true);
  }, []);

  function dismiss() {
    setVisible(false);
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
  }

  if (!visible || isMobile) return null;

  return (
    <motion.aside
      className="absolute right-10 top-16 z-20 w-[200px] rotate-2 rounded-sm border border-[#E8D9A8]/80 bg-[#FBF3D0] p-4 shadow-paper"
      initial={reduced ? false : { opacity: 0, y: -12, rotate: 6 }}
      animate={{ opacity: 1, y: 0, rotate: 2 }}
      transition={
        reduced
          ? { duration: 0 }
          : { type: "spring", stiffness: 260, damping: 22, delay: 0.8 }
      }
      aria-label="Welcome note"
    >
      <button
        type="button"
        onClick={dismiss}
        className="absolute right-2 top-1.5 text-[11px] text-[#8A7A4A]/70 hover:text-[#5A4A2A]"
        aria-label="Dismiss welcome note"
      >
        ✕
      </button>
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8A7A4A]">
        Welcome
      </p>
      <p className="mt-2 text-[13px] font-medium leading-snug text-[#3A3420]">
        You’re on Dynamogic OS. Open Demo to brand a PDF — or double-click any
        icon.
      </p>
      <button
        type="button"
        onClick={() => {
          openApp("demo");
          dismiss();
        }}
        className="mt-3 text-[12px] font-semibold text-[#3A3420] underline decoration-[#C8B878] underline-offset-2"
      >
        Open Demo →
      </button>
    </motion.aside>
  );
}
