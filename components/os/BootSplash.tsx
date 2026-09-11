"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "../Logo";
import { usePrefersReducedMotion } from "../motion/usePrefersReducedMotion";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Dramatic peregrine boot: falcon enters from far left, crosses right with a
 * soft mist trail, arcs back, and settles above the Dynamogic lockup.
 * Full sequence ~2.5–3.5s; mobile slightly shorter. Reduced motion skips flight.
 */
export function BootSplash({ onDone }: { onDone: () => void }) {
  const reduced = usePrefersReducedMotion();
  const [show, setShow] = useState(true);
  const [phase, setPhase] = useState<"fly" | "settle" | "hold">("fly");
  const [isMobile, setIsMobile] = useState(false);
  const doneRef = useRef(false);

  const handoff = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    setShow(false);
    onDone();
  }, [onDone]);

  // Lock mobile + timing once on mount so late mq updates don't restart the flight.
  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    setIsMobile(mobile);

    if (reduced) {
      setPhase("hold");
      const t = window.setTimeout(handoff, 600);
      return () => window.clearTimeout(t);
    }

    // Desktop ~3.2s total; mobile ~2.6s (still dramatic)
    const settleAt = mobile ? 1600 : 2000;
    const holdAt = mobile ? 2200 : 2800;
    const exitAt = mobile ? 2600 : 3200;

    const t1 = window.setTimeout(() => setPhase("settle"), settleAt);
    const t2 = window.setTimeout(() => setPhase("hold"), holdAt);
    const t3 = window.setTimeout(handoff, exitAt);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- boot sequence must not restart
  }, [handoff, reduced]);

  const falconSize = isMobile ? 36 : 48;
  const lockupSize = isMobile ? 20 : 26;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center overflow-hidden bg-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          aria-hidden
        >
          {/* Soft parallax mist layers */}
          {!reduced && (
            <>
              <motion.div
                className="pointer-events-none absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: phase === "hold" ? 0 : 1,
                }}
                transition={{ duration: 0.8, ease: EASE }}
              >
                <motion.div
                  className="absolute -left-[10%] top-[28%] h-[42%] w-[55%] rounded-full bg-fg/[0.04] blur-3xl"
                  animate={{ x: [0, 40, 80], opacity: [0.3, 0.55, 0.2] }}
                  transition={{
                    duration: isMobile ? 2.4 : 3.0,
                    ease: EASE,
                  }}
                />
                <motion.div
                  className="absolute left-[35%] top-[38%] h-[28%] w-[40%] rounded-full bg-fg/[0.03] blur-[48px]"
                  animate={{ x: [0, 30, 60], opacity: [0.2, 0.4, 0.15] }}
                  transition={{
                    duration: isMobile ? 2.4 : 3.0,
                    ease: EASE,
                    delay: 0.1,
                  }}
                />
                <motion.div
                  className="absolute right-[5%] top-[32%] h-[36%] w-[45%] rounded-full bg-fg/[0.035] blur-3xl"
                  animate={{ x: [0, -20, -40], opacity: [0.25, 0.45, 0.1] }}
                  transition={{
                    duration: isMobile ? 2.4 : 3.0,
                    ease: EASE,
                    delay: 0.15,
                  }}
                />
              </motion.div>
              <motion.div
                className="pointer-events-none absolute inset-x-0 top-[42%] h-24 -translate-y-1/2"
                initial={{ opacity: 0, x: "-20%" }}
                animate={{
                  opacity: phase === "hold" ? 0 : [0, 0.35, 0.2, 0],
                  x: ["-20%", "10%", "40%", "60%"],
                }}
                transition={{
                  duration: isMobile ? 2.0 : 2.5,
                  ease: EASE,
                }}
              >
                <div className="mx-auto h-full w-[70%] rounded-full bg-gradient-to-r from-transparent via-fg/[0.06] to-transparent blur-2xl" />
              </motion.div>
            </>
          )}

          {/* Stage: falcon + lockup */}
          <div className="relative flex h-[140px] w-full max-w-lg flex-col items-center justify-center sm:h-[160px]">
            {reduced ? (
              <SettledMark size={falconSize} lockupSize={lockupSize} />
            ) : (
              <>
                <FlightTrail
                  size={falconSize}
                  active={phase === "fly"}
                  mobile={isMobile}
                />

                {/* Flying / settling falcon (logo-mark / M2h) */}
                <motion.div
                  className="absolute left-1/2 top-[28%] z-10"
                  style={{ marginLeft: -((falconSize * 128.01) / 64) / 2 }}
                  initial={{
                    x: "-58vw",
                    y: 8,
                    opacity: 0,
                    scale: 0.82,
                    rotate: -8,
                  }}
                  animate={
                    phase === "fly"
                      ? {
                          x: ["-58vw", "42vw", "8vw", "0vw"],
                          y: [8, -18, -6, 0],
                          opacity: [0, 1, 1, 1],
                          scale: [0.82, 1.05, 0.98, 1],
                          rotate: [-8, 4, -2, 0],
                        }
                      : {
                          x: 0,
                          y: 0,
                          opacity: 1,
                          scale: phase === "settle" ? [1, 1.08, 1.02] : 1.02,
                          rotate: 0,
                        }
                  }
                  transition={
                    phase === "fly"
                      ? {
                          duration: isMobile ? 1.55 : 1.95,
                          times: [0, 0.45, 0.78, 1],
                          ease: EASE,
                        }
                      : {
                          duration: 0.55,
                          ease: EASE,
                        }
                  }
                >
                  <div
                    className="relative"
                    style={{
                      filter:
                        phase !== "fly"
                          ? "drop-shadow(0 0 18px rgba(28,28,28,0.18)) drop-shadow(0 4px 12px rgba(28,28,28,0.08))"
                          : "drop-shadow(0 2px 8px rgba(28,28,28,0.10))",
                      transition: "filter 0.5s ease",
                    }}
                  >
                    <Logo variant="mark" size={falconSize} />
                  </div>
                </motion.div>

                {/* Lockup settles underneath */}
                <motion.div
                  className="absolute left-1/2 top-[58%] z-0 -translate-x-1/2"
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  animate={
                    phase === "fly"
                      ? { opacity: 0, y: 10, scale: 0.96 }
                      : { opacity: 1, y: 0, scale: 1 }
                  }
                  transition={{ duration: 0.55, ease: EASE, delay: 0.05 }}
                >
                  <Logo variant="lockup" size={lockupSize} />
                </motion.div>

                {/* Soft settle glow */}
                <motion.div
                  className="pointer-events-none absolute left-1/2 top-[40%] h-32 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fg/[0.05] blur-3xl"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{
                    opacity: phase === "fly" ? 0 : [0, 0.7, 0.35],
                    scale: phase === "fly" ? 0.6 : [0.6, 1.15, 1],
                  }}
                  transition={{ duration: 0.7, ease: EASE }}
                />
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SettledMark({
  size,
  lockupSize,
}: {
  size: number;
  lockupSize: number;
}) {
  return (
    <motion.div
      className="flex flex-col items-center gap-4"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: EASE }}
    >
      <div
        style={{
          filter: "drop-shadow(0 0 14px rgba(28,28,28,0.14))",
        }}
      >
        <Logo variant="mark" size={size} />
      </div>
      <Logo variant="lockup" size={lockupSize} />
    </motion.div>
  );
}

function FlightTrail({
  size,
  active,
  mobile,
}: {
  size: number;
  active: boolean;
  mobile: boolean;
}) {
  if (!active) return null;
  const ghosts = [0.18, 0.1, 0.05];
  return (
    <>
      {ghosts.map((op, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-[28%] z-[1]"
          style={{
            marginLeft: -((size * 128.01) / 64) / 2,
            opacity: op,
          }}
          initial={{ x: "-58vw", y: 8, scale: 0.8 }}
          animate={{
            x: ["-58vw", "42vw", "8vw", "0vw"],
            y: [8, -18, -6, 0],
            scale: [0.8, 1.0, 0.96, 0.94],
          }}
          transition={{
            duration: mobile ? 1.55 : 1.95,
            times: [0, 0.45, 0.78, 1],
            ease: EASE,
            delay: (i + 1) * 0.045,
          }}
        >
          <Logo variant="mark" size={size} />
        </motion.div>
      ))}
    </>
  );
}
