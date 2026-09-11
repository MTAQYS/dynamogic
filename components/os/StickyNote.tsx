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
      className="absolute right-10 top-14 z-20 w-[208px] origin-top-right"
      initial={reduced ? false : { opacity: 0, y: -10, rotate: 4 }}
      animate={{ opacity: 1, y: 0, rotate: 1.5 }}
      transition={
        reduced
          ? { duration: 0 }
          : { type: "spring", stiffness: 220, damping: 26, mass: 0.9, delay: 0.55 }
      }
      aria-label="Welcome note"
    >
      <div
        className="relative rounded-[2px] border border-[#E4D6A4]/70 bg-[#FBF4D4] px-4 pb-4 pt-3.5 shadow-[0_1px_0_rgba(255,255,255,0.55)_inset,0_10px_28px_rgba(42,42,40,0.08),0_2px_6px_rgba(42,42,40,0.04)]"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(255,255,255,0.35) 0%, transparent 28%), repeating-linear-gradient(0deg, transparent, transparent 23px, rgba(196,178,100,0.12) 23px, rgba(196,178,100,0.12) 24px)",
        }}
      >
        <button
          type="button"
          onClick={dismiss}
          className="absolute right-2 top-1.5 flex h-5 w-5 items-center justify-center rounded-full text-[10px] text-[#8A7A4A]/55 transition-colors hover:bg-[#E8D9A8]/40 hover:text-[#5A4A2A]"
          aria-label="Dismiss welcome note"
        >
          ✕
        </button>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9A8A55]">
          Welcome
        </p>
        <p className="mt-2.5 text-[13px] font-medium leading-[1.45] tracking-[-0.01em] text-[#3A3420]">
          You’re on Dynamogic OS. Open Demo to brand a PDF — or click any icon.
        </p>
        <button
          type="button"
          onClick={() => {
            openApp("demo");
            dismiss();
          }}
          className="mt-3.5 text-[12px] font-semibold tracking-tight text-[#3A3420] underline decoration-[#C8B878]/80 underline-offset-[3px] transition-colors hover:decoration-[#3A3420]"
        >
          Open Demo →
        </button>
      </div>
    </motion.aside>
  );
}
