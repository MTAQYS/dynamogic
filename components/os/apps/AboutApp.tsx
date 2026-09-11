"use client";

import { Logo } from "../../Logo";
import { useWindows } from "../WindowContext";

export function AboutApp() {
  const { openApp } = useWindows();

  return (
    <div className="flex h-full flex-col overflow-auto bg-bg p-6">
      <Logo className="scale-110 origin-left" />
      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-fg-muted">
        Dynamogic OS · Phase 1
      </p>
      <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-fg">
        Brand layer for AI output
      </h2>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-fg-muted">
        Paste content from ChatGPT, Claude, or your agent. Apply your brand kit.
        Download or share a clean PDF — one render path for web, API, and MCP.
      </p>
      <p className="mt-4 text-xs text-fg-muted">
        Free: 3 PDFs/day. No credit card for the demo.
      </p>
      <div className="mt-auto flex flex-wrap gap-2 pt-6">
        <button
          type="button"
          onClick={() => openApp("demo")}
          className="btn-soft inline-flex h-9 items-center rounded-md px-4 text-xs font-bold"
        >
          Open Demo
        </button>
        <button
          type="button"
          onClick={() => openApp("pricing")}
          className="inline-flex h-9 items-center rounded-md border border-border px-4 text-xs font-semibold text-fg"
        >
          Pricing
        </button>
      </div>
      <p className="mt-4 font-mono text-[10px] text-fg-muted">
        MTAQYS · Mohamed-Taqy Salmi
      </p>
    </div>
  );
}
