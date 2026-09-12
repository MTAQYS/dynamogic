"use client";

import { useWindows } from "../WindowContext";

/**
 * Coming-soon BePro (CV) product window — UI only, no waitlist API.
 */
export function BeProApp() {
  const { openApp } = useWindows();

  return (
    <div className="flex h-full flex-col overflow-auto bg-bg app-pad">
      <div className="inline-flex w-fit items-center rounded-full border border-border bg-bg-muted px-2.5 py-1 font-mono text-[10px] font-medium tracking-[0.12em] text-fg-muted">
        bepro.dynamogic.com · soon
      </div>

      <p className="mt-5 app-kicker">Product · 02</p>
      <h2 className="app-title">BePro</h2>
      <p className="mt-1.5 max-w-sm text-[13px] leading-relaxed text-fg-muted">
        CVs that get you hired — free to build, AI when you need it.
      </p>

      <ul className="mt-6 space-y-2.5">
        {[
          "Build & export free",
          "AI rewrite / tailor (Pro)",
          "Same Dynamogic account",
        ].map((line) => (
          <li
            key={line}
            className="flex items-start gap-2.5 rounded-xl border border-border/80 bg-bg-paper px-3.5 py-2.5 text-[13px] font-medium tracking-tight text-fg shadow-soft"
          >
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-fg/50" aria-hidden />
            {line}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap gap-2.5 pt-8">
        <button
          type="button"
          onClick={() => openApp("signin")}
          className="btn-soft inline-flex min-h-[44px] items-center rounded-xl px-4 text-[13px] font-semibold tracking-tight"
        >
          Notify me
        </button>
        <button
          type="button"
          onClick={() => openApp("demo")}
          className="inline-flex min-h-[44px] items-center rounded-xl border border-border bg-bg-paper px-4 text-[13px] font-semibold tracking-tight text-fg transition-colors hover:border-border-strong"
        >
          Back to Demo
        </button>
      </div>
      <p className="mt-3 text-[11px] leading-relaxed text-fg-muted">
        Opens Sign in (demo) for now — real waitlist after auth is live. No
        email is collected here.
      </p>
    </div>
  );
}
