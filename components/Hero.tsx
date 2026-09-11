"use client";

import { motion } from "framer-motion";
import { HeroStage } from "./motion/HeroStage";
import { Reveal } from "./motion/Reveal";
import { usePrefersReducedMotion } from "./motion/usePrefersReducedMotion";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduced = usePrefersReducedMotion();

  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-4 pb-6 pt-14 sm:px-6 sm:pt-20">
        <Reveal y={20}>
          <p className="text-[13px] text-fg-muted">Brand layer for AI output</p>
        </Reveal>
        {reduced ? (
          <h1 className="display mt-5 max-w-[16ch] text-[2.6rem] text-fg sm:text-[3.55rem] sm:leading-[1.06]">
            Watch a draft become a branded PDF.
          </h1>
        ) : (
          <motion.h1
            className="display mt-5 max-w-[16ch] text-[2.6rem] text-fg sm:text-[3.55rem] sm:leading-[1.06]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease }}
          >
            Watch a draft become a branded PDF.
          </motion.h1>
        )}
        <Reveal delay={0.12} y={18}>
          <p className="mt-6 max-w-lg text-[1.05rem] leading-relaxed text-fg-muted">
            Paste content from ChatGPT, Claude, or your agent. Apply your brand
            kit. Download or share a clean PDF — one render path for web, API,
            and MCP.
          </p>
        </Reveal>
        <Reveal delay={0.2} y={14}>
          <div className="mt-9 flex flex-wrap items-baseline gap-x-6 gap-y-3">
            <a
              href="#demo"
              className="inline-flex h-10 items-center rounded-md bg-fg px-5 text-sm font-medium text-invert-fg transition-opacity hover:opacity-90"
            >
              Try the demo
            </a>
            <a
              href="#pricing"
              className="text-sm text-fg-muted underline decoration-border underline-offset-4 transition-colors hover:text-fg hover:decoration-fg"
            >
              See pricing
            </a>
          </div>
          <p className="mt-5 text-[13px] text-fg-muted">
            Free: 3 PDFs/day. No credit card for the demo.
          </p>
        </Reveal>
      </div>

      <HeroStage />
    </section>
  );
}
