"use client";

import { HeroStage } from "./motion/HeroStage";
import { usePrefersReducedMotion } from "./motion/usePrefersReducedMotion";

export function Hero() {
  const reduced = usePrefersReducedMotion();

  return (
    <section className="relative" aria-label="Hero">
      {reduced ? (
        <div className="site-wrap pb-4 pt-16 sm:pt-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-fg-muted">
            Brand layer for AI output
          </p>
          <h1 className="display-xl mt-5 max-w-[16ch] text-[clamp(2.5rem,8vw,5.5rem)] text-fg">
            Watch a draft become a branded PDF.
          </h1>
          <p className="mt-5 max-w-lg text-[1.05rem] leading-relaxed text-fg-muted">
            Paste content from ChatGPT, Claude, or your agent. Apply your brand
            kit. Download or share a clean PDF — one render path for web, API,
            and MCP.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href="#demo"
              className="btn-soft inline-flex h-11 items-center rounded-md px-6 text-sm font-semibold"
            >
              Try the demo
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium text-fg-muted underline decoration-border underline-offset-4 hover:text-fg hover:decoration-fg"
            >
              See pricing
            </a>
          </div>
          <p className="mt-5 text-[13px] text-fg-muted">
            Free: 3 PDFs/day. No credit card for the demo.
          </p>
        </div>
      ) : null}
      <HeroStage />
    </section>
  );
}
