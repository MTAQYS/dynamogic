"use client";

import { useWindows } from "../WindowContext";

const steps = [
  {
    n: "01",
    title: "Bring content",
    body: "Paste markdown from your LLM or agent.",
  },
  {
    n: "02",
    title: "Apply brand kit",
    body: "Logo, colors, fonts, footer — saved once.",
  },
  {
    n: "03",
    title: "Get a PDF",
    body: "Download or share. Same engine for demo, app, API, and MCP.",
  },
];

export function HowApp() {
  const { openApp } = useWindows();

  return (
    <div className="h-full overflow-auto bg-bg app-pad">
      <p className="app-kicker">Pipeline</p>
      <h2 className="app-title">Three steps. One pipeline.</h2>
      <ol className="mt-6 space-y-3">
        {steps.map((s) => (
          <li
            key={s.n}
            className="flex gap-4 rounded-2xl border border-border/80 bg-bg-paper p-4 shadow-soft"
          >
            <span className="font-mono text-[11px] font-medium text-fg/35">
              {s.n}
            </span>
            <div>
              <h3 className="text-[13px] font-semibold tracking-tight text-fg">
                {s.title}
              </h3>
              <p className="mt-1 text-[12.5px] leading-relaxed text-fg-muted">
                {s.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-5 text-[12.5px] leading-relaxed text-fg-muted">
        Competitors like Canva or native chat exports are great at other jobs.
        Dynamogic focuses on repeatable brand application for text-first AI
        output.
      </p>
      <button
        type="button"
        onClick={() => openApp("demo")}
        className="btn-soft mt-5 inline-flex h-9 items-center rounded-xl px-4 text-[12px] font-semibold tracking-tight"
      >
        Try Demo.app
      </button>
    </div>
  );
}
