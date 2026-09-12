"use client";

import { useWindows } from "../WindowContext";

export function PricingApp() {
  const { openApp } = useWindows();

  return (
    <div className="h-full overflow-auto bg-bg app-pad">
      <p className="app-kicker">Pricing</p>
      <h2 className="app-title">Simple pricing</h2>
      <p className="mt-1.5 max-w-md text-[13px] leading-relaxed text-fg-muted">
        Start free. Upgrade when the brand layer becomes part of your workflow.
        Founding seats capped at 50.
      </p>

      <div className="mt-6 grid gap-3.5 sm:grid-cols-3">
        <article className="flex flex-col rounded-2xl border border-border/80 bg-bg-paper p-5 shadow-soft">
          <h3 className="text-[11px] font-semibold tracking-tight text-fg-muted">
            Free
          </h3>
          <p className="mt-2.5 text-[2rem] font-semibold tracking-tight text-fg">
            $0
          </p>
          <p className="mt-1 text-[12px] text-fg-muted">3 PDFs per day</p>
          <ul className="mt-5 flex-1 space-y-2 text-[12px] text-fg/90">
            <li>1 brand kit</li>
            <li>Share links expire in 7 days</li>
            <li>Demo + account</li>
          </ul>
          <button
            type="button"
            onClick={() => openApp("demo")}
            className="mt-5 inline-flex h-9 w-fit items-center rounded-xl border border-border-strong px-3.5 text-[12px] font-semibold tracking-tight transition-colors hover:bg-fg hover:text-invert-fg"
          >
            Start free
          </button>
        </article>

        <article className="flex flex-col rounded-2xl bg-[#2A2A28] p-5 text-invert-fg shadow-[0_12px_40px_rgba(42,42,40,0.18)]">
          <div className="flex items-baseline justify-between">
            <h3 className="text-[11px] font-semibold tracking-tight text-invert-fg/55">
              Pro
            </h3>
            <span className="font-mono text-[9px] uppercase tracking-wider text-invert-fg/35">
              recommended
            </span>
          </div>
          <p className="mt-2.5 text-[2rem] font-semibold tracking-tight">
            $12
            <span className="text-sm font-medium text-invert-fg/45">/mo</span>
          </p>
          <p className="mt-1 text-[12px] text-invert-fg/45">or $99/yr</p>
          <ul className="mt-5 flex-1 space-y-2 text-[12px] text-invert-fg/85">
            <li>Multiple brand kits</li>
            <li>Permanent share links</li>
            <li>API + MCP access</li>
          </ul>
          <button
            type="button"
            onClick={() => openApp("faq")}
            className="mt-5 inline-flex h-9 w-fit items-center rounded-xl bg-invert-fg px-3.5 text-[12px] font-semibold tracking-tight text-fg transition-opacity hover:opacity-90"
          >
            Upgrade to Pro
          </button>
        </article>

        <article className="flex flex-col rounded-2xl border border-border/80 bg-bg-muted/60 p-5">
          <div className="flex items-baseline gap-2">
            <h3 className="text-[11px] font-semibold tracking-tight text-fg">
              Founding
            </h3>
            <span className="font-mono text-[9px] uppercase text-fg-muted">
              50 seats
            </span>
          </div>
          <p className="mt-2.5 text-[2rem] font-semibold tracking-tight text-fg">
            $79
          </p>
          <p className="mt-1 text-[12px] text-fg-muted">
            12 months · or $149 lifetime
          </p>
          <p className="mt-4 flex-1 text-[12px] leading-relaxed text-fg-muted">
            100 PDFs/mo · everything in Pro during the founding window
          </p>
          <button
            type="button"
            onClick={() => openApp("faq")}
            className="mt-5 text-[12px] font-semibold tracking-tight text-fg underline decoration-border underline-offset-[3px] hover:decoration-fg"
          >
            Claim founding →
          </button>
        </article>
      </div>

      <p className="mt-5 text-[11px] text-fg-muted">
        Payments via Lemon Squeezy. Taxes/VAT shown at checkout.
      </p>
    </div>
  );
}
