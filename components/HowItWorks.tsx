"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { HairlineDraw, Reveal, Stagger, StaggerItem } from "./motion/Reveal";
import { usePrefersReducedMotion } from "./motion/usePrefersReducedMotion";

const steps = [
  {
    title: "Bring content",
    body: "Paste markdown from your LLM or agent.",
  },
  {
    title: "Apply brand kit",
    body: "Logo, colors, fonts, footer — saved once.",
  },
  {
    title: "Get a PDF",
    body: "Download or share. Same engine for demo, app, API, and MCP.",
  },
];

function StepNumber({ n }: { n: number }) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (reduced) {
      setShown(n);
      return;
    }
    if (!inView) return;
    let frame = 0;
    const start = performance.now();
    const dur = 520;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setShown(Math.round(p * n));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, n, reduced]);

  return (
    <span ref={ref} className="font-mono text-[12px] text-fg-muted sm:col-span-1">
      {String(shown).padStart(2, "0")}
    </span>
  );
}

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-4 section-pad sm:px-6">
      <Reveal>
        <h2 className="display text-[2rem] text-fg sm:text-[2.35rem]">
          Three steps. One pipeline.
        </h2>
      </Reveal>
      <HairlineDraw className="mt-12" />
      <Stagger
        className="border-b border-border"
        stagger={0.12}
        role="list"
      >
        {steps.map((s, i) => (
          <StaggerItem key={s.title} role="listitem">
            <div className="grid gap-3 border-b border-border py-6 last:border-b-0 sm:grid-cols-12 sm:items-baseline sm:gap-8">
              <StepNumber n={i + 1} />
              <h3 className="font-serif text-xl text-fg sm:col-span-4">
                {s.title}
              </h3>
              <p className="text-[15px] leading-relaxed text-fg-muted sm:col-span-7">
                {s.body}
              </p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
      <Reveal delay={0.1}>
        <p className="mt-10 max-w-2xl text-sm leading-relaxed text-fg-muted">
          Competitors like Canva or native chat exports are great at other jobs.
          Dynamogic focuses on repeatable brand application for text-first AI
          output.
        </p>
      </Reveal>
    </section>
  );
}
