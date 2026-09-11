"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "../motion/usePrefersReducedMotion";
import { useWindows } from "./WindowContext";

const EASE = [0.22, 1, 0.36, 1] as const;

const NOTIFS = [
  {
    title: "Try Demo",
    body: "Paste AI text and generate a branded PDF.",
    action: "demo" as const,
  },
  {
    title: "Brand Kit tips",
    body: "Color stays inside the PDF — never on chrome.",
    action: "brand" as const,
  },
  {
    title: "MCP later",
    body: "Agents will call create_branded_pdf in Phase 3.",
    action: "mcp" as const,
  },
];

type Props = {
  open: boolean;
  onClose: () => void;
  isMobile: boolean;
};

export function ClockPanel({ open, onClose, isMobile }: Props) {
  const { openApp } = useWindows();
  const reduced = usePrefersReducedMotion();
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    if (!open) return;
    setNow(new Date());
  }, [open]);

  const timeLarge = now.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
  const dateLine = now.toLocaleDateString([], {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const year = now.getFullYear();
  const month = now.getMonth();
  const first = new Date(year, month, 1);
  const startPad = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = now.getDate();
  const monthLabel = now.toLocaleDateString([], { month: "long", year: "numeric" });

  const panel = (
    <motion.div
      role="dialog"
      aria-label="Calendar and notifications"
      className={
        isMobile
          ? "fixed inset-x-0 bottom-0 z-[220] max-h-[85dvh] overflow-auto rounded-t-2xl border border-border bg-bg-paper p-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-paper"
          : "absolute right-2 top-8 z-[220] w-[300px] overflow-hidden rounded-xl border border-border bg-bg-paper p-4 shadow-paper"
      }
      initial={reduced ? false : { opacity: 0, y: isMobile ? 8 : 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? undefined : { opacity: 0, y: isMobile ? 8 : 4 }}
      transition={reduced ? { duration: 0 } : { duration: 0.18, ease: EASE }}
      onClick={(e) => e.stopPropagation()}
    >
      {isMobile && (
        <div className="mb-3 flex justify-center" aria-hidden>
          <span className="h-1 w-9 rounded-full bg-fg/15" />
        </div>
      )}
      <p className="text-[2rem] font-semibold tracking-tight tabular-nums text-fg">
        {timeLarge}
      </p>
      <p className="mt-0.5 text-[13px] text-fg-muted">{dateLine}</p>

      <div className="mt-4 rounded-xl border border-border bg-bg-muted/40 p-3">
        <p className="text-[11px] font-semibold tracking-tight text-fg">
          {monthLabel}
        </p>
        <div className="mt-2 grid grid-cols-7 gap-1 text-center text-[10px] font-medium text-fg-muted">
          {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
            <span key={`${d}-${i}`}>{d}</span>
          ))}
        </div>
        <div className="mt-1 grid grid-cols-7 gap-1 text-center text-[11px]">
          {Array.from({ length: startPad }).map((_, i) => (
            <span key={`pad-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const isToday = day === today;
            return (
              <span
                key={day}
                className={`flex h-7 items-center justify-center rounded-lg tabular-nums ${
                  isToday
                    ? "bg-fg text-invert-fg font-semibold"
                    : "text-fg/80"
                }`}
              >
                {day}
              </span>
            );
          })}
        </div>
      </div>

      <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.16em] text-fg-muted">
        Notifications
      </p>
      <ul className="mt-2 space-y-2">
        {NOTIFS.map((n) => (
          <li key={n.title}>
            <button
              type="button"
              onClick={() => {
                openApp(n.action);
                onClose();
              }}
              className="flex min-h-[44px] w-full flex-col rounded-xl border border-border/80 bg-bg-paper px-3 py-2.5 text-left transition-colors hover:bg-bg-muted/60"
            >
              <span className="text-[12px] font-semibold tracking-tight text-fg">
                {n.title}
              </span>
              <span className="mt-0.5 text-[11px] leading-relaxed text-fg-muted">
                {n.body}
              </span>
            </button>
          </li>
        ))}
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
              aria-label="Close calendar"
              className="fixed inset-0 z-[215] bg-fg/20"
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduced ? undefined : { opacity: 0 }}
              transition={reduced ? { duration: 0 } : { duration: 0.15 }}
              onClick={onClose}
            />
          )}
          {panel}
        </>
      )}
    </AnimatePresence>
  );
}
