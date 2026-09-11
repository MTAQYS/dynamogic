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
    <div className="h-full overflow-auto bg-bg p-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-muted">
        Pipeline
      </p>
      <h2 className="mt-1 text-xl font-bold tracking-tight text-fg">
        Three steps. One pipeline.
      </h2>
      <ol className="mt-5 space-y-4">
        {steps.map((s) => (
          <li
            key={s.n}
            className="flex gap-4 rounded-xl border border-border bg-bg-paper p-4"
          >
            <span className="font-mono text-[11px] text-fg-muted">{s.n}</span>
            <div>
              <h3 className="text-sm font-bold text-fg">{s.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-fg-muted">
                {s.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-5 text-xs leading-relaxed text-fg-muted">
        Competitors like Canva or native chat exports are great at other jobs.
        Dynamogic focuses on repeatable brand application for text-first AI
        output.
      </p>
      <button
        type="button"
        onClick={() => openApp("demo")}
        className="btn-soft mt-4 inline-flex h-9 items-center rounded-md px-4 text-xs font-bold"
      >
        Try Demo.app
      </button>
    </div>
  );
}
