"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../motion/usePrefersReducedMotion";
import { AppIcon } from "./AppIcon";
import { useWindows } from "./WindowContext";
import { APP_META, type AppId } from "./types";
import { PREF_COMPACT_DOCK, readPref } from "./osPrefs";

const DOCK_APPS: AppId[] = [
  "demo",
  "brand",
  "mcp",
  "pricing",
  "faq",
  "how",
  "about",
];

const MOBILE_PRIMARY: AppId[] = ["demo", "brand", "mcp", "pricing", "faq"];
const MOBILE_MORE: AppId[] = ["how", "about"];

const BASE_FULL = 48;
const BASE_COMPACT = 40;
const MAX_EXTRA = 12;
const EASE = [0.22, 1, 0.36, 1] as const;

export function Dock() {
  const { openApp, windows, bounceId, focusedId, isMobile } = useWindows();
  const reduced = usePrefersReducedMotion();
  const listRef = useRef<HTMLUListElement>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const mouseXRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const [moreOpen, setMoreOpen] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const sync = () => setCompact(readPref(PREF_COMPACT_DOCK));
    sync();
    window.addEventListener("dynamogic-os-prefs", sync);
    return () => window.removeEventListener("dynamogic-os-prefs", sync);
  }, []);

  const BASE = compact ? BASE_COMPACT : BASE_FULL;

  const applyMagnify = useCallback(() => {
    rafRef.current = null;
    const mx = mouseXRef.current;
    btnRefs.current.forEach((el, index) => {
      if (!el) return;
      let scale = 1;
      if (mx !== null && !reduced) {
        const itemCenter = 10 + index * (BASE + 8) + BASE / 2;
        const dist = Math.abs(mx - itemCenter);
        const influence = Math.max(0, 1 - dist / 90);
        scale = 1 + (MAX_EXTRA / BASE) * influence * influence;
      }
      el.style.transform = `scale(${scale})`;
      el.style.transformOrigin = "bottom center";
    });
  }, [reduced, BASE]);

  const scheduleMagnify = useCallback(() => {
    if (rafRef.current != null) return;
    rafRef.current = window.requestAnimationFrame(applyMagnify);
  }, [applyMagnify]);

  useEffect(() => {
    return () => {
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      if (reduced) return;
      const rect = listRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseXRef.current = e.clientX - rect.left;
      scheduleMagnify();
    },
    [reduced, scheduleMagnify]
  );

  const onLeave = useCallback(() => {
    mouseXRef.current = null;
    scheduleMagnify();
  }, [scheduleMagnify]);

  if (isMobile) {
    return (
      <nav
        className="fixed inset-x-0 bottom-0 z-[90] border-t border-border/50 bg-bg-paper/92 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 shadow-soft backdrop-blur-md"
        aria-label="Apps"
      >
        <AnimatePresence>
          {moreOpen && (
            <motion.div
              className="mb-2 overflow-hidden rounded-2xl border border-border/60 bg-bg-paper/95 shadow-soft"
              initial={reduced ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: 6 }}
              transition={
                reduced ? { duration: 0 } : { duration: 0.2, ease: EASE }
              }
              role="menu"
              aria-label="More apps"
            >
              <ul className="grid grid-cols-2 gap-1 p-2">
                {MOBILE_MORE.map((id) => {
                  const meta = APP_META[id];
                  const open = windows.some((w) => w.id === id);
                  return (
                    <li key={id}>
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          openApp(id);
                          setMoreOpen(false);
                        }}
                        className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left transition-colors ${
                          focusedId === id
                            ? "bg-fg/[0.06]"
                            : "hover:bg-fg/[0.04]"
                        }`}
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-[11px] border border-border/60 bg-gradient-to-b from-bg-paper to-bg-muted shadow-soft">
                          <AppIcon id={id} size={18} />
                        </span>
                        <span className="flex-1 text-[12px] font-semibold tracking-tight text-fg">
                          {meta.label}
                        </span>
                        {open && (
                          <span
                            className="h-1.5 w-1.5 rounded-full bg-fg/40"
                            aria-hidden
                          />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <ul className="mx-auto flex max-w-lg justify-between gap-1">
          {MOBILE_PRIMARY.map((id) => {
            const meta = APP_META[id];
            const open = windows.some((w) => w.id === id);
            return (
              <li key={id} className="flex-1">
                <button
                  type="button"
                  onClick={() => {
                    setMoreOpen(false);
                    openApp(id);
                  }}
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
          <li className="flex-1">
            <button
              type="button"
              onClick={() => setMoreOpen((v) => !v)}
              aria-expanded={moreOpen}
              aria-label={moreOpen ? "Hide more apps" : "More apps"}
              className={`flex w-full flex-col items-center gap-1 rounded-xl px-1 py-1.5 transition-colors ${
                moreOpen || MOBILE_MORE.some((id) => focusedId === id)
                  ? "bg-fg/[0.06]"
                  : ""
              }`}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-[11px] border border-border/60 bg-gradient-to-b from-bg-paper to-bg-muted text-[15px] font-semibold text-fg/70 shadow-soft">
                ···
              </span>
              <span className="truncate text-[9px] font-medium tracking-tight text-fg-muted">
                More
              </span>
              <span
                className={`h-0.5 w-3 rounded-full transition-opacity ${
                  MOBILE_MORE.some((id) => windows.some((w) => w.id === id))
                    ? "bg-fg/40 opacity-100"
                    : "opacity-0"
                }`}
                aria-hidden
              />
            </button>
          </li>
        </ul>
      </nav>
    );
  }

  return (
    <nav
      className="pointer-events-none absolute inset-x-0 bottom-5 z-[90] flex justify-center"
      aria-label="Dock"
    >
      <div className="pointer-events-auto rounded-[22px] border border-border/70 bg-bg-paper/85 p-[5px] shadow-paper backdrop-blur-md">
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

            return (
              <li
                key={id}
                className="relative flex flex-col items-center"
                style={{ width: BASE }}
              >
                <motion.button
                  ref={(el) => {
                    btnRefs.current[index] = el;
                  }}
                  type="button"
                  onClick={() => openApp(id)}
                  title={meta.label}
                  aria-label={`Open ${meta.label}`}
                  className="group relative flex items-center justify-center rounded-[14px] border border-border/40 bg-gradient-to-b from-bg-paper to-bg-muted shadow-[0_2px_6px_rgba(42,42,40,0.06),inset_0_1px_0_rgba(255,255,255,0.7)] will-change-transform"
                  style={{ width: BASE, height: BASE }}
                  animate={
                    bouncing && !reduced ? { y: [0, -10, 0] } : { y: 0 }
                  }
                  transition={
                    bouncing && !reduced
                      ? { duration: 0.2, ease: EASE }
                      : { duration: 0.18, ease: EASE }
                  }
                  whileTap={reduced ? undefined : { scale: 0.94 }}
                >
                  <AppIcon id={id} size={20} />
                </motion.button>
                <span
                  className={`mt-1.5 h-[3px] w-[3px] rounded-full bg-fg/50 transition-all duration-200 ${
                    open ? "opacity-100 scale-100" : "opacity-0 scale-50"
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
