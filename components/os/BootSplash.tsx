"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "../Logo";
import { usePrefersReducedMotion } from "../motion/usePrefersReducedMotion";

const EASE = [0.22, 1, 0.36, 1] as const;
const SESSION_KEY = "dynamogic-os-splash-seen";

/**
 * Single-falcon boot: enter from left → settle above lockup → fade out.
 * Desktop ≤1.6s, mobile ≤1.2s, reduced-motion ≤400ms lockup fade (no flight).
 * Once per tab session via sessionStorage; click/tap/Esc skips.
 */
export function BootSplash({ onDone }: { onDone: () => void }) {
  const reduced = usePrefersReducedMotion();
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState<"fly" | "settle" | "exit">("fly");
  const [isMobile, setIsMobile] = useState(false);
  const doneRef = useRef(false);
  const timers = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }, []);

  const handoff = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    clearTimers();
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* ignore */
    }
    setShow(false);
    onDone();
  }, [clearTimers, onDone]);

  const skip = useCallback(() => {
    handoff();
  }, [handoff]);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY) === "1") {
        doneRef.current = true;
        onDone();
        return;
      }
    } catch {
      /* ignore */
    }

    const mobile = window.matchMedia("(max-width: 767px)").matches;
    setIsMobile(mobile);
    setShow(true);

    // Exit fade must fit inside the budget (including AnimatePresence fade).
    const EXIT_MS = 280;

    if (reduced) {
      // ≤400ms total including fade — lockup fade only, no flight
      setPhase("settle");
      timers.current.push(window.setTimeout(handoff, Math.max(0, 400 - EXIT_MS)));
      return () => clearTimers();
    }

    // Desktop ≤1.6s; mobile ≤1.2s *including* exit fade
    const totalMs = mobile ? 1200 : 1600;
    const exitAt = totalMs - EXIT_MS;
    const settleAt = mobile ? 650 : 900;

    timers.current.push(window.setTimeout(() => setPhase("settle"), settleAt));
    timers.current.push(
      window.setTimeout(() => {
        setPhase("exit");
        handoff();
      }, exitAt)
    );

    return () => clearTimers();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- boot once
  }, [handoff, onDone, reduced, clearTimers]);

  useEffect(() => {
    if (!show) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") skip();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [show, skip]);

  const falconSize = isMobile ? 36 : 48;
  const lockupSize = isMobile ? 20 : 26;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[300] flex cursor-pointer flex-col items-center justify-center overflow-hidden bg-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: EASE }}
          onClick={skip}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") skip();
          }}
          role="button"
          tabIndex={0}
          aria-label="Skip splash"
        >
          <div className="relative flex h-[140px] w-full max-w-lg flex-col items-center justify-center sm:h-[160px]">
            {reduced ? (
              <motion.div
                className="flex flex-col items-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.28, ease: EASE }}
              >
                <Logo variant="mark" size={falconSize} />
                <Logo variant="lockup" size={lockupSize} />
              </motion.div>
            ) : (
              <>
                <motion.div
                  className="absolute left-1/2 top-[28%] z-10"
                  style={{ marginLeft: -((falconSize * 128.01) / 64) / 2 }}
                  initial={{
                    x: "-45vw",
                    y: 6,
                    opacity: 0,
                    scale: 0.92,
                  }}
                  animate={
                    phase === "fly"
                      ? {
                          x: 0,
                          y: 0,
                          opacity: 1,
                          scale: 1,
                        }
                      : {
                          x: 0,
                          y: 0,
                          opacity: phase === "exit" ? 0 : 1,
                          scale: 1,
                        }
                  }
                  transition={{
                    duration: phase === "fly" ? (isMobile ? 0.65 : 0.85) : 0.3,
                    ease: EASE,
                  }}
                >
                  <Logo variant="mark" size={falconSize} />
                </motion.div>

                <motion.div
                  className="absolute left-1/2 top-[58%] z-0 -translate-x-1/2"
                  initial={{ opacity: 0, y: 6 }}
                  animate={
                    phase === "fly"
                      ? { opacity: 0, y: 6 }
                      : { opacity: phase === "exit" ? 0 : 1, y: 0 }
                  }
                  transition={{ duration: 0.28, ease: EASE }}
                >
                  <Logo variant="lockup" size={lockupSize} />
                </motion.div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
