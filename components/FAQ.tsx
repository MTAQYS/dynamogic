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
    a: "Product docs should state current practice in Privacy Policy. Default intent: content is used to render your PDFs and operate the service — not to sell training data. Link Privacy Policy.",
  },
  {
    q: "Which email and payment providers?",
    a: "Transactional email: Brevo. Payments: Lemon Squeezy.",
  },
  {
    q: "Can my agent use this?",
    a: "Yes. Connect MCP with an API key and call create_branded_pdf. See the MCP section / docs.",
  },
  {
    q: "What file formats do you support?",
    a: "v1 focuses on PDF output from markdown/plain text input. Other formats are not promised in v1.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 section-pad sm:px-6">
      <h2 className="text-3xl font-semibold tracking-tight sm:text-[2rem]">FAQ</h2>
      <div className="mt-10 divide-y divide-border border-y border-border">
        {faqs.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q}>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="pr-4 text-[15px] font-medium leading-snug text-fg">
                  {item.q}
                </span>
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-sm text-fg-muted"
                  aria-hidden="true"
                >
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              {isOpen && (
                <p className="pb-5 pr-12 text-sm leading-relaxed text-fg-muted">
                  {item.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
