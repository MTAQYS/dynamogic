"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Is Dynamogic a Canva replacement?",
    a: "No. Canva is a full design suite. Dynamogic applies a brand kit to AI text and outputs PDFs quickly — especially for agents via MCP.",
  },
  {
    q: "How is this different from Claude’s or ChatGPT’s export?",
    a: "Native exports are convenient. Dynamogic adds reusable brand kits, share links, API access, and one MCP tool so agents can produce on-brand PDFs without you babysitting layout.",
  },
  {
    q: "What’s the free limit?",
    a: "3 PDFs per day on Free. Caps are enforced server-side. Pro and Founding raise limits (see pricing).",
  },
  {
    q: "What is founding, and why only 50?",
    a: "Founding is early pricing ($79/12 months or $149 lifetime) with a 100 PDFs/mo cap. We cap at 50 seats to keep support and infra predictable at our budget.",
  },
  {
    q: "Do you train on my content?",
    a: "Default intent: content is used to render your PDFs and operate the service — not to sell training data. See Privacy Policy when published.",
  },
  {
    q: "Which email and payment providers?",
    a: "Transactional email: Brevo. Payments: Lemon Squeezy.",
  },
  {
    q: "Can my agent use this?",
    a: "Yes. Connect MCP with an API key and call create_branded_pdf.",
  },
  {
    q: "What file formats do you support?",
    a: "v1 focuses on PDF output from markdown/plain text input. Other formats are not promised in v1.",
  },
];

export function FaqApp() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="h-full overflow-auto bg-bg app-pad">
      <p className="app-kicker">Docs</p>
      <h2 className="app-title">FAQ</h2>
      <div className="mt-5 divide-y divide-border/70 rounded-2xl border border-border/80 bg-bg-paper px-4 shadow-soft">
        {faqs.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q}>
              <button
                type="button"
                className="flex w-full items-start justify-between gap-4 py-3.5 text-left"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="text-[13px] font-medium leading-snug tracking-tight text-fg">
                  {item.q}
                </span>
                <span
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-fg/[0.04] font-mono text-[11px] text-fg-muted"
                  aria-hidden
                >
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              {isOpen && (
                <p className="pb-3.5 pr-8 text-[12.5px] leading-relaxed text-fg-muted">
                  {item.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
