"use client";

import {
  motion,
  useInView,
  type Variants,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./motion/usePrefersReducedMotion";

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

const ease = [0.22, 1, 0.36, 1] as const;

function TypeLine({
  text,
  delay,
  active,
}: {
  text: string;
  delay: number;
  active: boolean;
}) {
  const [shown, setShown] = useState("");
  const reduced = usePrefersReducedMotion();

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
      }, 18);
    }, delay);
    return () => {
      window.clearTimeout(start);
      if (intervalId !== undefined) window.clearInterval(intervalId);
    };
  }, [active, delay, reduced, text]);

  return <div className="whitespace-pre">{shown || "\u00A0"}</div>;
}

export function McpTeaser() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setPhase(3);
      return;
    }
    setPhase(1);
    const t1 = window.setTimeout(() => setPhase(2), 1200);
    const t2 = window.setTimeout(() => setPhase(3), 2800);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [inView, reduced]);

  const lineVariants: Variants = {
    hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.65, ease },
    },
  };

  return (
    <section
      ref={ref}
      id="mcp"
      className="relative overflow-hidden bg-bg section-pad text-fg"
    >
      <div className="theater-vignette-light pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #2A2A28 1px, transparent 1px), linear-gradient(to bottom, #2A2A28 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
        aria-hidden
      />

      <div className="relative site-wrap">
        <div className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-fg-muted">
            Live agent demo · MCP
          </p>
          <h2 className="display-xl mt-5 text-[clamp(2.25rem,5.5vw,4rem)] text-fg">
            One MCP tool for agents
          </h2>
          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-fg-muted">
            Point Claude, Cursor, or any MCP client at Dynamogic. Call{" "}
            <code className="font-mono text-[14px] text-fg">
              create_branded_pdf
            </code>{" "}
            with your content and brand kit. Get a PDF URL back. No second tool
            surface in v1.
          </p>
        </div>

        {/* Soft-charcoal terminal theater — premium, not void black */}
        <div className="mt-12 overflow-hidden border border-border-strong/40 bg-invert-bg shadow-[0_0_0_1px_rgba(42,42,40,0.06),0_32px_80px_rgba(42,42,40,0.18)]">
          <div className="flex items-center gap-3 border-b border-white/10 px-5 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="ml-3 font-mono text-[12px] tracking-wide text-invert-fg/40">
              agent · session · create_branded_pdf
            </span>
          </div>

          <div className="relative min-h-[320px] p-6 sm:p-10 md:p-12">
            <p className="font-mono text-[12px] text-invert-fg/35">you</p>
            <p className="mt-2 font-mono text-[15px] text-invert-fg/70 sm:text-[17px]">
              Render our Q3 update with the Acme kit.
            </p>

            <p className="mt-10 font-mono text-[12px] text-invert-fg/35">
              tool call
            </p>
            <div className="mt-3 font-mono text-[clamp(1rem,2.8vw,1.65rem)] font-medium leading-relaxed tracking-tight text-invert-fg">
              {TOOL_LINES.map((line, i) => (
                <TypeLine
                  key={line}
                  text={line}
                  delay={i * 220}
                  active={phase >= 1}
                />
              ))}
              {phase >= 1 && phase < 3 && !reduced && (
                <motion.span
                  className="ml-0.5 inline-block h-[1.1em] w-[0.55ch] bg-invert-fg align-middle"
                  animate={{ opacity: [1, 0.25, 1] }}
                  transition={{ duration: 1.05, repeat: Infinity, ease: "linear" }}
                  aria-hidden
                />
              )}
            </div>

            {phase >= 2 && (
              <motion.div
                className="mt-10 space-y-2 font-mono text-[14px] leading-relaxed text-invert-fg/75 sm:text-[16px]"
                initial={reduced ? false : "hidden"}
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.18 } },
                }}
              >
                <p className="font-mono text-[12px] text-invert-fg/35">result</p>
                {RESULT_LINES.map((l) => (
                  <motion.p key={l} variants={lineVariants}>
                    {l}
                  </motion.p>
                ))}
                {/* Sample brand output hint — blue only as sample brand output */}
                <motion.p
                  className="pt-2 text-[13px]"
                  style={{ color: "#93C5FD" }}
                  variants={lineVariants}
                >
                  brand accent · #1D4ED8 applied inside PDF
                </motion.p>
              </motion.div>
            )}
          </div>
        </div>

        <a
          href="#faq"
          className="mt-12 inline-flex text-sm font-medium text-fg-muted underline decoration-border underline-offset-4 hover:text-fg hover:decoration-fg"
        >
          Read the MCP spec →
        </a>
      </div>
    </section>
  );
}
