const plans = [
  {
    name: "Free",
    price: "$0",
    line: "3 PDFs per day",
    bullets: ["1 brand kit", "Share links expire in 7 days", "Demo + account"],
    cta: "Start free",
    href: "#demo",
    badge: null as string | null,
  },
  {
    name: "Pro",
    price: "$12/mo",
    sub: "or $99/yr",
    line: "Higher daily/monthly caps for regular shipping",
    bullets: [
      "Multiple brand kits",
      "Permanent share links",
      "API + MCP access",
    ],
    cta: "Upgrade to Pro",
    href: "#faq",
    badge: null as string | null,
  },
  {
    name: "Founding",
    price: "$79",
    sub: "for 12 months or $149 lifetime",
    line: "Early supporter pricing · 100 PDFs/mo · Max 50 founding seats",
    bullets: [
      "Everything in Pro during the founding window",
      "Badge in account (optional)",
    ],
    cta: "Claim founding (while available)",
    href: "#faq",
    badge: "Founding · limited",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="border-y border-border bg-bg-muted section-pad">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-[2rem]">
          Simple pricing
        </h2>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-fg-muted">
          Start free. Upgrade when the brand layer becomes part of your
          workflow. Founding seats are capped at 50.
        </p>
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {plans.map((p) => (
            <article
              key={p.name}
              className="flex flex-col rounded-2xl border border-border bg-bg p-6 shadow-soft sm:p-7"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-semibold tracking-tight">{p.name}</h3>
                {p.badge && (
                  <span className="rounded-full border border-border px-2.5 py-0.5 text-[11px] font-medium text-fg-muted">
                    {p.badge}
                  </span>
                )}
              </div>
              <p className="mt-4 text-3xl font-semibold tracking-tight">
                {p.price}
              </p>
              {"sub" in p && p.sub ? (
                <p className="mt-1 text-sm text-fg-muted">{p.sub}</p>
              ) : null}
              <p className="mt-4 text-sm leading-relaxed text-fg-muted">{p.line}</p>
              <ul className="mt-5 flex-1 space-y-2.5 text-sm text-fg">
                {p.bullets.map((b) => (
                  <li key={b} className="flex gap-2.5">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-fg" aria-hidden />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <a
                href={p.href}
                className="mt-8 inline-flex h-11 items-center justify-center rounded-lg bg-fg px-4 text-sm font-medium text-invert-fg transition-opacity hover:opacity-90"
              >
                {p.cta}
              </a>
            </article>
          ))}
        </div>
        <p className="mt-8 text-sm text-fg-muted">
          Payments via Lemon Squeezy. Taxes/VAT shown at checkout.
        </p>
      </div>
    </section>
  );
}
