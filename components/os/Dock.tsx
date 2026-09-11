"use client";

import { motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../motion/usePrefersReducedMotion";
import { AppIcon } from "./AppIcon";
import { useWindows } from "./WindowContext";
import { APP_META, type AppId } from "./types";

const DOCK_APPS: AppId[] = [
  "demo",
  "brand",
  "mcp",
  "pricing",
  "faq",
  "how",
  "about",
];

const BASE = 48;
const MAX_EXTRA = 16;

export function Dock() {
  const { openApp, windows, bounceId, focusedId, isMobile } = useWindows();
  const reduced = usePrefersReducedMotion();
  const listRef = useRef<HTMLUListElement>(null);
  const [mouseX, setMouseX] = useState<number | null>(null);

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      if (reduced) return;
      const rect = listRef.current?.getBoundingClientRect();
      if (!rect) return;
      setMouseX(e.clientX - rect.left);
    },
    [reduced]
  );

  const onLeave = useCallback(() => setMouseX(null), []);

  function scaleForIndex(index: number) {
    if (mouseX === null || reduced) return 1;
    const itemCenter = 10 + index * (BASE + 8) + BASE / 2;
    const dist = Math.abs(mouseX - itemCenter);
    const influence = Math.max(0, 1 - dist / 90);
    return 1 + (MAX_EXTRA / BASE) * influence * influence;
  }

  if (isMobile) {
    return (
      <nav
        className="fixed inset-x-0 bottom-0 z-[90] border-t border-border/50 bg-bg-paper/80 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-8px_32px_rgba(42,42,40,0.06)] backdrop-blur-2xl backdrop-saturate-150"
        aria-label="Apps"
      >
        <ul className="mx-auto flex max-w-lg justify-between gap-1">
          {DOCK_APPS.slice(0, 5).map((id) => {
            const meta = APP_META[id];
            const open = windows.some((w) => w.id === id);
            return (
              <li key={id} className="flex-1">
                <button
                  type="button"
                  onClick={() => openApp(id)}
                  className={`flex w-full flex-col items-center gap-1 rounded-xl px-1 py-1.5 transition-colors ${
                    focusedId === id ? "bg-fg/[0.06]" : ""
                  }`}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-[11px] border border-border/60 bg-gradient-to-b from-bg-paper to-bg-muted shadow-soft">
                    <AppIcon id={id} size={18} />
                  </span>
                  <span className="truncate text-[9px] font-medium tracking-tight text-fg-muted">
                    {meta.label}
                  </span>
                  <span
                    className={`h-0.5 w-3 rounded-full transition-opacity ${
                      open ? "bg-fg/40 opacity-100" : "opacity-0"
                    }`}
                    aria-hidden
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }

  return (
    <nav
      className="pointer-events-none absolute inset-x-0 bottom-5 z-[90] flex justify-center"
      aria-label="Dock"
    >
      <div className="pointer-events-auto rounded-[22px] border border-white/50 bg-bg-paper/60 p-[5px] shadow-[0_8px_40px_rgba(42,42,40,0.10),0_0_0_0.5px_rgba(42,42,40,0.06),inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-2xl backdrop-saturate-150">
        <ul
          ref={listRef}
          className="flex items-end gap-2 px-1.5 pb-1 pt-1.5"
          onMouseMove={onMove}
          onMouseLeave={onLeave}
        >
          {DOCK_APPS.map((id, index) => {
            const meta = APP_META[id];
            const open = windows.some((w) => w.id === id && !w.minimized);
            const bouncing = bounceId === id;
            const scale = scaleForIndex(index);
            const size = BASE * scale;

            return (
              <li
                key={id}
                className="relative flex flex-col items-center"
                style={{ width: BASE, marginBottom: (size - BASE) / 2 }}
              >
                <motion.button
                  type="button"
                  onClick={() => openApp(id)}
                  title={meta.label}
                  aria-label={`Open ${meta.label}`}
                  className="group relative flex items-center justify-center rounded-[14px] border border-border/40 bg-gradient-to-b from-bg-paper to-bg-muted shadow-[0_2px_6px_rgba(42,42,40,0.06),inset_0_1px_0_rgba(255,255,255,0.7)]"
                  style={{ width: size, height: size }}
                  animate={
                    bouncing && !reduced
                      ? { y: [0, -14, 0, -5, 0] }
                      : { y: 0 }
                  }
                  transition={
                    bouncing && !reduced
                      ? { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
                      : { type: "spring", stiffness: 400, damping: 28 }
                  }
                  whileTap={reduced ? undefined : { scale: 0.92 }}
                >
                  <AppIcon id={id} size={Math.round(20 * scale)} />
                </motion.button>
                <span
                  className={`mt-1.5 h-[3px] w-[3px] rounded-full bg-fg/50 transition-all duration-200 ${
                    open
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-50"
                  }`}
                  aria-hidden
                />
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
