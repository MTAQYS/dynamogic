"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { Logo } from "../Logo";
import { usePrefersReducedMotion } from "../motion/usePrefersReducedMotion";
import { useWindows } from "./WindowContext";
import { PREF_DND, readPref } from "./osPrefs";

const MISSION_KEY = "dynamogic-os-mission";
const EASE = [0.22, 1, 0.36, 1] as const;

type StepId = "open_demo" | "generate_pdf" | "open_brand" | "done";

const STEPS: { id: StepId; title: string; body: string; cta?: string }[] = [
  {
    id: "open_demo",
    title: "Mission 1 · Open Demo",
    body: "Open Demo to brand a PDF.",
    cta: "Open Demo",
  },
  {
    id: "generate_pdf",
    title: "Mission 2 · Generate a PDF",
    body: "Hit Generate PDF in Demo. You’re free to explore meanwhile.",
  },
  {
    id: "open_brand",
    title: "Mission 3 · Open Brand Kit",
    body: "Tweak the kit — color stays inside the PDF.",
    cta: "Open Brand Kit",
  },
  {
    id: "done",
    title: "You’re cleared",
    body: "First PDF path unlocked. Falcon out.",
  },
];

function readMission(): StepId | "skipped" {
  try {
    const v = localStorage.getItem(MISSION_KEY);
    if (v === "skipped" || v === "done") return v === "skipped" ? "skipped" : "done";
    if (v === "open_demo" || v === "generate_pdf" || v === "open_brand") return v;
  } catch {
    /* ignore */
  }
  return "open_demo";
}

function writeMission(step: StepId | "skipped") {
  try {
    localStorage.setItem(MISSION_KEY, step === "done" ? "done" : step);
  } catch {
    /* ignore */
  }
}

/**
 * Light first-run mission near the dock. z under windows. Skip anytime.
 * Never blocks Generate or nav.
 */
export function GuideFalcon() {
  const { openApp, isMobile, focusedId, windows } = useWindows();
  const reduced = usePrefersReducedMotion();
  const [hydrated, setHydrated] = useState(false);
  const [step, setStep] = useState<StepId | "skipped">("open_demo");
  const [panelOpen, setPanelOpen] = useState(true);
  const [dnd, setDnd] = useState(false);

  useEffect(() => {
    const sync = () => setDnd(readPref(PREF_DND));
    sync();
    window.addEventListener("dynamogic-os-prefs", sync);
    return () => window.removeEventListener("dynamogic-os-prefs", sync);
  }, []);

  useEffect(() => {
    const initial = readMission();
    setStep(initial);
    setPanelOpen(initial !== "skipped" && initial !== "done");
    setHydrated(true);
  }, []);

  const advanceTo = useCallback((next: StepId) => {
    setStep(next);
    writeMission(next);
    if (next === "done") {
      setPanelOpen(true);
    }
  }, []);

  const skip = useCallback(() => {
    setStep("skipped");
    writeMission("skipped");
    setPanelOpen(false);
  }, []);

  // Auto-advance: open Demo / Brand from any chrome
  useEffect(() => {
    if (!hydrated || step === "skipped" || step === "done") return;
    const openIds = new Set(windows.map((w) => w.id));
    if (step === "open_demo" && openIds.has("demo")) {
      advanceTo("generate_pdf");
    } else if (step === "open_brand" && openIds.has("brand")) {
      advanceTo("done");
    }
  }, [windows, step, hydrated, advanceTo]);

  // Auto-advance: PDF generated (DemoApp dispatches)
  useEffect(() => {
    if (!hydrated) return;
    const onMission = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (detail === "generate_pdf" && step === "generate_pdf") {
        advanceTo("open_brand");
      } else if (detail === "open_demo" && step === "open_demo") {
        advanceTo("generate_pdf");
      } else if (detail === "open_brand" && step === "open_brand") {
        advanceTo("done");
      }
    };
    window.addEventListener("dynamogic-mission", onMission);
    return () => window.removeEventListener("dynamogic-mission", onMission);
  }, [hydrated, step, advanceTo]);

  if (isMobile && focusedId) return null;
  if (!hydrated) return null;
  if (dnd) return null;
  if (step === "skipped") return null;
  // First-run only: after dismiss / hydrate with done, hide falcon entirely
  if (step === "done" && !panelOpen) return null;

  const current = STEPS.find((s) => s.id === step) ?? STEPS[0];
  const stepIndex = STEPS.findIndex((s) => s.id === step);

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
          {panelOpen && (
            <motion.div
              className="pointer-events-auto w-[220px] rounded-xl border border-border/80 bg-bg-paper p-3.5 text-left shadow-paper"
              initial={reduced ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: 4 }}
              transition={
                reduced ? { duration: 0 } : { duration: 0.18, ease: EASE }
              }
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-fg-muted">
                  {step === "done" ? "Mission" : `Step ${Math.min(stepIndex + 1, 3)} / 3`}
                </p>
                <button
                  type="button"
                  onClick={skip}
                  className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-[11px] font-medium text-fg-muted transition-colors hover:bg-fg/[0.05] hover:text-fg sm:min-h-0 sm:min-w-0 sm:h-6 sm:w-auto sm:px-1.5"
                  aria-label="Skip mission"
                >
                  Skip
                </button>
              </div>
              <p className="mt-2 text-[13px] font-semibold tracking-tight text-fg">
                {current.title}
              </p>
              <p className="mt-1 text-[12px] leading-relaxed text-fg-muted">
                {current.body}
              </p>
              {current.cta && step !== "done" && (
                <button
                  type="button"
                  onClick={() => {
                    if (step === "open_demo") openApp("demo");
                    if (step === "open_brand") openApp("brand");
                  }}
                  className="btn-soft mt-3 inline-flex min-h-[44px] items-center rounded-xl px-3.5 text-[12px] font-semibold tracking-tight sm:min-h-[36px]"
                >
                  {current.cta}
                </button>
              )}
              {step === "done" && (
                <button
                  type="button"
                  onClick={skip}
                  className="mt-3 inline-flex min-h-[44px] items-center rounded-xl border border-border px-3.5 text-[12px] font-semibold tracking-tight text-fg transition-colors hover:bg-bg-muted sm:min-h-[36px]"
                >
                  Dismiss
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={() => setPanelOpen((v) => !v)}
          className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-bg-paper shadow-soft transition-transform active:scale-[0.96]"
          aria-label={panelOpen ? "Hide mission" : "Show mission"}
          aria-expanded={panelOpen}
          whileTap={reduced ? undefined : { scale: 0.94 }}
        >
          <Logo variant="mark" size={18} />
        </motion.button>
      </div>
    </div>
  );
}
