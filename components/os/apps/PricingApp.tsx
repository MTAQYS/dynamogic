"use client";

import { useWindows } from "../WindowContext";

export function PricingApp() {
  const { openApp } = useWindows();

  return (
    <div className="h-full overflow-auto bg-bg p-5 sm:p-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-muted">
        Pricing
      </p>
      <h2 className="mt-1 text-xl font-bold tracking-tight text-fg">
        Simple pricing
      </h2>
      <p className="mt-1 max-w-md text-sm text-fg-muted">
        Start free. Upgrade when the brand layer becomes part of your workflow.
        Founding seats capped at 50.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <article className="flex flex-col rounded-xl border border-border bg-bg-paper p-4">
          <h3 className="text-xs font-semibold text-fg-muted">Free</h3>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-fg">
            $0
          </p>
          <p className="mt-1 text-xs text-fg-muted">3 PDFs per day</p>
          <ul className="mt-4 flex-1 space-y-1.5 text-xs text-fg">
            <li>1 brand kit</li>
            <li>Share links expire in 7 days</li>
            <li>Demo + account</li>
          </ul>
          <button
            type="button"
            onClick={() => openApp("demo")}
            className="mt-4 inline-flex h-9 w-fit items-center rounded-md border border-border-strong px-3 text-xs font-semibold"
          >
            Start free
          </button>
        </article>

        <article className="flex flex-col rounded-xl bg-invert-bg p-4 text-invert-fg shadow-paper">
          <div className="flex items-baseline justify-between">
            <h3 className="text-xs font-semibold text-invert-fg/60">Pro</h3>
            <span className="font-mono text-[9px] uppercase tracking-wider text-invert-fg/40">
              recommended
            </span>
          </div>
          <p className="mt-2 text-3xl font-extrabold tracking-tight">
            $12
            <span className="text-sm font-semibold text-invert-fg/50">/mo</span>
          </p>
          <p className="mt-1 text-xs text-invert-fg/50">or $99/yr</p>
          <ul className="mt-4 flex-1 space-y-1.5 text-xs text-invert-fg/90">
            <li>Multiple brand kits</li>
            <li>Permanent share links</li>
            <li>API + MCP access</li>
          </ul>
          <button
            type="button"
            onClick={() => openApp("faq")}
            className="mt-4 inline-flex h-9 w-fit items-center rounded-md bg-invert-fg px-3 text-xs font-bold text-fg"
          >
            Upgrade to Pro
          </button>
        </article>

        <article className="flex flex-col rounded-xl border border-border bg-bg-muted p-4">
          <div className="flex items-baseline gap-2">
            <h3 className="text-xs font-semibold text-fg">Founding</h3>
            <span className="font-mono text-[9px] uppercase text-fg-muted">
              50 seats
            </span>
          </div>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-fg">
            $79
          </p>
          <p className="mt-1 text-xs text-fg-muted">
            12 months · or $149 lifetime
          </p>
          <p className="mt-3 flex-1 text-xs leading-relaxed text-fg-muted">
            100 PDFs/mo · everything in Pro during the founding window
          </p>
          <button
            type="button"
            onClick={() => openApp("faq")}
            className="mt-4 text-xs font-semibold text-fg underline decoration-border underline-offset-2"
          >
            Claim founding →
          </button>
        </article>
      </div>

      <p className="mt-4 text-[11px] text-fg-muted">
        Payments via Lemon Squeezy. Taxes/VAT shown at checkout.
      </p>
    </div>
  );
}
