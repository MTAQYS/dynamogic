"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { usePrefersReducedMotion } from "../motion/usePrefersReducedMotion";
import {
  PREF_COMPACT_DOCK,
  PREF_DND,
  PREF_REDUCE_MOTION,
  readPref,
  writePref,
} from "./osPrefs";

const EASE = [0.22, 1, 0.36, 1] as const;

type Props = {
  open: boolean;
  onClose: () => void;
  isMobile: boolean;
};

export function ControlCenter({ open, onClose, isMobile }: Props) {
  const systemReduced = usePrefersReducedMotion();
  const [reduceMotion, setReduceMotion] = useState(false);
  const [dnd, setDnd] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    if (!open) return;
    setReduceMotion(readPref(PREF_REDUCE_MOTION));
    setDnd(readPref(PREF_DND));
    setCompact(readPref(PREF_COMPACT_DOCK));
  }, [open]);

  const toggle = useCallback((key: string, value: boolean, setter: (v: boolean) => void) => {
    setter(value);
    writePref(key, value);
  }, []);

  const panel = (
    <motion.div
      role="dialog"
      aria-label="Control Center"
      className={
        isMobile
          ? "fixed inset-x-0 bottom-0 z-[220] overflow-auto rounded-t-2xl border border-border bg-bg-paper p-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-paper"
          : "absolute right-2 top-8 z-[220] w-[280px] overflow-hidden rounded-xl border border-border bg-bg-paper p-3.5 shadow-paper"
      }
      initial={systemReduced ? false : { opacity: 0, y: isMobile ? 8 : 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={systemReduced ? undefined : { opacity: 0, y: isMobile ? 8 : 4 }}
      transition={systemReduced ? { duration: 0 } : { duration: 0.18, ease: EASE }}
      onClick={(e) => e.stopPropagation()}
    >
      {isMobile && (
        <div className="mb-3 flex justify-center" aria-hidden>
          <span className="h-1 w-9 rounded-full bg-fg/15" />
        </div>
      )}
      <p className="px-1 text-[10px] font-medium uppercase tracking-[0.16em] text-fg-muted">
        Control Center
      </p>
      <ul className="mt-2 space-y-1.5">
        <ToggleRow
          label="Reduce motion"
          hint="Overrides decorative motion in this OS"
          on={reduceMotion}
          onChange={(v) => toggle(PREF_REDUCE_MOTION, v, setReduceMotion)}
        />
        <ToggleRow
          label="Do Not Disturb"
          hint="Hides falcon mission tips"
          on={dnd}
          onChange={(v) => toggle(PREF_DND, v, setDnd)}
        />
        <ToggleRow
          label="Compact dock"
          hint="Slightly smaller dock icons"
          on={compact}
          onChange={(v) => toggle(PREF_COMPACT_DOCK, v, setCompact)}
        />
      </ul>
    </motion.div>
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          {isMobile && (
            <motion.button
              type="button"
              aria-label="Close Control Center"
              className="fixed inset-0 z-[215] bg-fg/20"
              initial={systemReduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={systemReduced ? undefined : { opacity: 0 }}
              onClick={onClose}
            />
          )}
          {panel}
        </>
      )}
    </AnimatePresence>
  );
}

function ToggleRow({
  label,
  hint,
  on,
  onChange,
}: {
  label: string;
  hint: string;
  on: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onChange(!on)}
        aria-pressed={on}
        className="flex min-h-[44px] w-full items-center justify-between gap-3 rounded-xl border border-border/80 bg-bg-muted/30 px-3 py-2.5 text-left transition-colors hover:bg-bg-muted/60"
      >
        <span>
          <span className="block text-[13px] font-semibold tracking-tight text-fg">
            {label}
          </span>
          <span className="mt-0.5 block text-[11px] text-fg-muted">{hint}</span>
        </span>
        <span
          className={`relative h-6 w-10 shrink-0 rounded-full transition-colors ${
            on ? "bg-fg" : "bg-border"
          }`}
          aria-hidden
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-bg-paper shadow-soft transition-transform ${
              on ? "translate-x-4" : "translate-x-0.5"
            }`}
          />
        </span>
      </button>
    </li>
  );
}
