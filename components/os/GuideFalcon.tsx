"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { Logo } from "../Logo";
import { usePrefersReducedMotion } from "../motion/usePrefersReducedMotion";
import { useWindows } from "./WindowContext";
import type { AppId } from "./types";

const DISMISS_KEY = "dynamogic-os-guide-dismissed";

type Tip = {
  id: string;
  label: string;
  appId: AppId;
};

const TIPS: Tip[] = [
  { id: "demo", label: "Open Demo", appId: "demo" },
  { id: "brand", label: "Set Brand Kit", appId: "brand" },
];

/**
 * Small M2h guide falcon parked near the dock / mobile app bar.
 * Tips open apps via WindowContext.openApp (same as dock icons).
 */
export function GuideFalcon() {
  const { openApp, isMobile, focusedId } = useWindows();
  const reduced = usePrefersReducedMotion();
  const [tipsOpen, setTipsOpen] = useState(true);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(DISMISS_KEY) === "1") {
        setTipsOpen(false);
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  const persistDismiss = useCallback(() => {
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
  }, []);

  const clearDismiss = useCallback(() => {
    try {
      localStorage.removeItem(DISMISS_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const dismissTips = useCallback(() => {
    setTipsOpen(false);
    persistDismiss();
  }, [persistDismiss]);

  const toggleTips = useCallback(() => {
    setTipsOpen((prev) => {
      const next = !prev;
      if (next) clearDismiss();
      else persistDismiss();
      return next;
    });
  }, [clearDismiss, persistDismiss]);

  const onTip = useCallback(
    (tip: Tip) => {
      openApp(tip.appId);
    },
    [openApp]
  );

  // Hide under mobile fullscreen sheets so we never block them
  if (isMobile && focusedId) return null;
  if (!hydrated) return null;

  return (
    <div
      className={`pointer-events-none absolute z-[5] ${
        isMobile
          ? "bottom-[calc(4.75rem+env(safe-area-inset-bottom))] right-3"
          : "bottom-[5.75rem] right-[max(1.25rem,calc(50%-280px))]"
      }`}
      aria-live="polite"
    >
      <div className="relative flex flex-col items-end gap-2">
        <AnimatePresence>
          {tipsOpen && (
            <motion.div
              className="pointer-events-auto flex flex-col items-end gap-1.5"
              initial={reduced ? false : { opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduced ? undefined : { opacity: 0, y: 6, scale: 0.96 }}
              transition={
                reduced
                  ? { duration: 0 }
                  : { duration: 0.2, ease: [0.22, 1, 0.36, 1] }
              }
            >
              <div className="flex items-center gap-1.5">
                <p className="pr-1 text-[10px] font-medium uppercase tracking-[0.16em] text-fg-muted">
                  Guide
                </p>
                <button
                  type="button"
                  onClick={dismissTips}
                  className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] text-fg-muted/80 transition-colors hover:bg-fg/[0.06] hover:text-fg"
                  aria-label="Dismiss guide tips"
                >
                  ✕
                </button>
              </div>

              {TIPS.map((tip, i) => (
                <motion.button
                  key={tip.id}
                  type="button"
                  onClick={() => onTip(tip)}
                  className="group relative max-w-[200px] rounded-2xl rounded-br-md border border-border/70 bg-bg-paper/90 px-3.5 py-2 text-left shadow-[0_8px_28px_rgba(42,42,40,0.08),0_0_0_0.5px_rgba(42,42,40,0.04),inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-xl transition-colors hover:bg-bg-paper"
                  initial={reduced ? false : { opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={
                    reduced
                      ? { duration: 0 }
                      : {
                          delay: 0.04 + i * 0.05,
                          duration: 0.2,
                          ease: [0.22, 1, 0.36, 1],
                        }
                  }
                  aria-label={`${tip.label} — open app`}
                >
                  <span className="block text-[12.5px] font-semibold tracking-tight text-fg">
                    {tip.label}
                  </span>
                  <span className="mt-0.5 block text-[10.5px] font-medium text-fg-muted">
                    Tap to open
                  </span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={toggleTips}
          className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-bg-paper/85 shadow-[0_4px_16px_rgba(42,42,40,0.08),inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-xl transition-transform hover:scale-[1.04] active:scale-[0.96]"
          aria-label={tipsOpen ? "Hide guide tips" : "Show guide tips"}
          aria-expanded={tipsOpen}
          whileTap={reduced ? undefined : { scale: 0.94 }}
        >
          <span className="opacity-90">
            <Logo variant="mark" size={18} />
          </span>
        </motion.button>
      </div>
    </div>
  );
}
