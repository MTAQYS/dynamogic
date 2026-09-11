"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../motion/usePrefersReducedMotion";
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

export function Dock() {
  const { openApp, windows, bounceId, focusedId, isMobile } = useWindows();
  const reduced = usePrefersReducedMotion();

  if (isMobile) {
    return (
      <nav
        className="fixed inset-x-0 bottom-0 z-[90] border-t border-border/70 bg-bg-paper/90 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl"
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
                  className={`flex w-full flex-col items-center gap-0.5 rounded-lg px-1 py-1.5 ${
                    focusedId === id ? "bg-fg/8" : ""
                  }`}
                >
                  <span className="text-xl" aria-hidden>
                    {meta.icon}
                  </span>
                  <span className="truncate text-[9px] font-medium text-fg-muted">
                    {meta.label}
                  </span>
                  {open && (
                    <span className="h-1 w-1 rounded-full bg-fg/50" aria-hidden />
                  )}
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
      className="pointer-events-none absolute inset-x-0 bottom-4 z-[90] flex justify-center"
      aria-label="Dock"
    >
      <ul className="pointer-events-auto flex items-end gap-1.5 rounded-2xl border border-border/70 bg-bg-paper/75 px-2.5 py-2 shadow-paper backdrop-blur-2xl">
        {DOCK_APPS.map((id) => {
          const meta = APP_META[id];
          const open = windows.some((w) => w.id === id && !w.minimized);
          const bouncing = bounceId === id;
          return (
            <li key={id} className="relative flex flex-col items-center">
              <motion.button
                type="button"
                onClick={() => openApp(id)}
                title={meta.label}
                aria-label={`Open ${meta.label}`}
                className="group relative flex h-12 w-12 items-center justify-center rounded-xl border border-border/50 bg-gradient-to-b from-bg-paper to-bg-muted text-xl shadow-soft transition-transform hover:-translate-y-1.5 hover:shadow-paper"
                animate={
                  bouncing && !reduced
                    ? { y: [0, -18, 0, -8, 0] }
                    : { y: 0 }
                }
                transition={
                  bouncing && !reduced
                    ? { duration: 0.55, ease: "easeOut" }
                    : { duration: 0 }
                }
                whileHover={reduced ? undefined : { scale: 1.08 }}
                whileTap={reduced ? undefined : { scale: 0.94 }}
              >
                <span aria-hidden>{meta.icon}</span>
              </motion.button>
              <span
                className={`mt-1 h-1 w-1 rounded-full transition-opacity ${
                  open ? "bg-fg/55 opacity-100" : "opacity-0"
                }`}
                aria-hidden
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
