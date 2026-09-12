"use client";

import { Logo } from "../../Logo";
import { useWindows } from "../WindowContext";

export function AboutApp() {
  const { openApp } = useWindows();

  return (
    <div className="flex h-full flex-col overflow-auto bg-bg app-pad">
      <Logo size={20} />
      <p className="mt-5 app-kicker">Dynamogic OS · Phase 1</p>
      <h2 className="mt-2 text-[1.5rem] font-semibold tracking-tight text-fg">
        Brand layer for AI output
      </h2>
      <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-fg-muted">
        Paste content from ChatGPT, Claude, or your agent. Apply your brand kit.
        Download or share a clean PDF — one render path for web, API, and MCP.
      </p>
      <p className="mt-4 text-[12px] text-fg-muted">
        Free: 3 PDFs/day. No credit card for the demo.
      </p>
      <div className="mt-auto flex flex-wrap gap-2.5 pt-8">
        <button
          type="button"
          onClick={() => openApp("demo")}
          className="btn-soft inline-flex h-9 items-center rounded-xl px-4 text-[12px] font-semibold tracking-tight"
        >
          Open Demo
        </button>
        <button
          type="button"
          onClick={() => openApp("pricing")}
          className="inline-flex h-9 items-center rounded-xl border border-border/80 bg-bg-paper px-4 text-[12px] font-semibold tracking-tight text-fg transition-colors hover:border-border-strong"
        >
          Pricing
        </button>
      </div>
      <p className="mt-5 font-mono text-[10px] text-fg-muted">
        MTAQYS · Mohamed-Taqy Salmi
      </p>
    </div>
  );
}
