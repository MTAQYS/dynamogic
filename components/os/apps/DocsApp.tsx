"use client";

import { useWindows } from "../WindowContext";

/**
 * Coming-soon Docs (MD→PDF) product window — UI only, no waitlist API.
 */
export function DocsApp() {
  const { openApp } = useWindows();

  return (
    <div className="flex h-full flex-col overflow-auto bg-bg app-pad">
      <div className="inline-flex w-fit items-center rounded-full border border-border bg-bg-muted px-2.5 py-1 font-mono text-[10px] font-medium tracking-[0.12em] text-fg-muted">
        docs.dynamogic.com · soon
      </div>

      <p className="mt-5 app-kicker">Product · 03</p>
      <h2 className="app-title">Docs</h2>
      <p className="mt-1.5 max-w-sm text-[13px] leading-relaxed text-fg-muted">
        Markdown in. Clean PDF out — same Dynamogic account.
      </p>

      <ul className="mt-6 space-y-2.5">
        {[
          "Paste MD or sync a folder",
          "Brand kit on export",
          "Agents via MCP later",
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
          Open Brand Layer
        </button>
        <a
          href="https://mtaqys.github.io/docs/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center rounded-xl border border-border bg-bg-paper px-4 text-[13px] font-semibold tracking-tight text-fg transition-colors hover:border-border-strong"
        >
          Marketing site
        </a>
      </div>
      <p className="mt-3 text-[11px] leading-relaxed text-fg-muted">
        Opens Sign in (demo) for now — real waitlist after auth is live. No
        email is collected here.
      </p>
    </div>
  );
}
