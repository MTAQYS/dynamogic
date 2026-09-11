"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "../../motion/usePrefersReducedMotion";
import { useWindows } from "../WindowContext";

const TOOL_LINES = [
  "create_branded_pdf({",
  '  content: "# Q3 Product Update…",',
  '  brand_kit_id: "acme"',
  "})",
];

const RESULT_LINES = [
  "→ pdf_url: https://dynamogic.app/s/q3-acme",
  "→ expires: null · plan: pro",
];

export function McpTerminalApp() {
  const { brand } = useWindows();
  const reduced = usePrefersReducedMotion();
  const [phase, setPhase] = useState(0);
  const [replay, setReplay] = useState(0);

  useEffect(() => {
    if (reduced) {
      setPhase(3);
      return;
    }
    setPhase(0);
    const t0 = window.setTimeout(() => setPhase(1), 200);
    const t1 = window.setTimeout(() => setPhase(2), 1400);
    const t2 = window.setTimeout(() => setPhase(3), 3000);
    return () => {
      window.clearTimeout(t0);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [reduced, replay]);

  return (
    <div className="flex h-full flex-col bg-invert-bg text-invert-fg">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <span className="font-mono text-[11px] text-invert-fg/45">
          agent · session · create_branded_pdf
        </span>
        <button
          type="button"
          onClick={() => setReplay((n) => n + 1)}
          className="font-mono text-[10px] text-invert-fg/50 hover:text-invert-fg"
        >
          replay
        </button>
      </div>

      <div className="flex-1 overflow-auto p-5 font-mono text-[13px] leading-relaxed sm:p-6 sm:text-[14px]">
        <p className="text-invert-fg/35">you</p>
        <p className="mt-1 text-invert-fg/75">
          Render our Q3 update with the {brand.name} kit.
        </p>

        <p className="mt-6 text-invert-fg/35">tool call</p>
        <div className="mt-2 space-y-0.5 text-[clamp(0.85rem,2vw,1.15rem)] font-medium text-invert-fg">
          {TOOL_LINES.map((line, i) => (
            <TypeLine
              key={`${replay}-${line}`}
              text={
                i === 2
                  ? `  brand_kit_id: "${brand.presetId || "acme"}"`
                  : line
              }
              delay={i * 220}
              active={phase >= 1}
              reduced={reduced}
            />
          ))}
          {phase >= 1 && phase < 3 && !reduced && (
            <motion.span
              className="ml-0.5 inline-block h-[1em] w-[0.5ch] bg-invert-fg align-middle"
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              aria-hidden
            />
          )}
        </div>

        {phase >= 2 && (
          <div className="mt-6 space-y-1 text-invert-fg/70">
            <p className="text-invert-fg/35">result</p>
            {RESULT_LINES.map((l) => (
              <p key={l}>{l}</p>
            ))}
            <p className="pt-2 text-[12px]" style={{ color: "#93C5FD" }}>
              brand accent · {brand.primary_color} applied inside PDF
            </p>
          </div>
        )}
      </div>

      <div className="border-t border-white/10 px-4 py-3">
        <p className="text-[12px] leading-relaxed text-invert-fg/50">
          Point Claude, Cursor, or any MCP client at Dynamogic. One tool:{" "}
          <code className="text-invert-fg/80">create_branded_pdf</code>. Same
          render path as the web demo.
        </p>
      </div>
    </div>
  );
}

function TypeLine({
  text,
  delay,
  active,
  reduced,
}: {
  text: string;
  delay: number;
  active: boolean;
  reduced: boolean;
}) {
  const [shown, setShown] = useState("");

  useEffect(() => {
    if (!active) {
      setShown("");
      return;
    }
    if (reduced) {
      setShown(text);
      return;
    }
    setShown("");
    let i = 0;
    let intervalId: number | undefined;
    const start = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        i += 1;
        setShown(text.slice(0, i));
        if (i >= text.length && intervalId !== undefined) {
          window.clearInterval(intervalId);
        }
      }, 16);
    }, delay);
    return () => {
      window.clearTimeout(start);
      if (intervalId !== undefined) window.clearInterval(intervalId);
    };
  }, [active, delay, reduced, text]);

  return <div className="whitespace-pre">{shown || "\u00A0"}</div>;
}
