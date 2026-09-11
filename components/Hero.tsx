export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#F7F7F5_0%,_transparent_55%)]" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-20 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="max-w-xl">
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-fg-muted">
            Brand layer for AI output
          </p>
          <h1 className="mt-4 text-[2.35rem] font-semibold leading-[1.12] tracking-tight text-fg sm:text-5xl sm:leading-[1.08]">
            Turn AI drafts into branded PDFs — without opening a design tool.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-fg-muted">
            Paste content from ChatGPT, Claude, or your agent. Apply your brand
            kit. Download or share a clean PDF. One render path for web, API,
            and MCP.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#demo"
              className="inline-flex h-11 items-center rounded-lg bg-fg px-6 text-sm font-medium text-invert-fg transition-opacity hover:opacity-90"
            >
              Try the demo
            </a>
            <a
              href="#pricing"
              className="inline-flex h-11 items-center rounded-lg border border-border-strong bg-bg px-6 text-sm font-medium text-fg transition-colors hover:bg-bg-muted"
            >
              See pricing
            </a>
          </div>
          <p className="mt-5 text-sm text-fg-muted">
            Free: 3 PDFs/day. No credit card for the demo.
          </p>
        </div>

        <div
          className="rounded-2xl border border-border bg-bg p-5 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.35)] sm:p-6"
          aria-hidden="true"
        >
          <div className="mb-4 flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-fg-muted">
              Before → After
            </p>
            <span className="rounded-full border border-border px-2.5 py-0.5 text-[11px] text-fg-muted">
              Sample brand
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-bg-muted/60 p-4">
              <p className="text-[11px] font-medium text-fg-muted">Raw AI draft</p>
              <div className="mt-4 space-y-2.5 font-mono text-[11px] leading-relaxed text-fg-muted">
                <p># Q3 Product Update</p>
                <p>- shipped kits…</p>
                <p>- mcp tool…</p>
                <p>- fair-use tier…</p>
                <div className="pt-2 space-y-2">
                  <div className="h-2 w-[88%] rounded bg-border" />
                  <div className="h-2 w-full rounded bg-border" />
                  <div className="h-2 w-[62%] rounded bg-border" />
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-xl border border-border bg-bg p-4 shadow-soft">
              <div
                className="absolute inset-x-0 top-0 h-[3px]"
                style={{ background: "#1D4ED8" }}
              />
              <p className="text-[11px] font-medium text-fg-muted">
                Branded PDF preview
              </p>
              <p
                className="mt-3 text-[10px] font-semibold tracking-wide"
                style={{ color: "#1D4ED8" }}
              >
                ACME
              </p>
              <p className="mt-2 text-sm font-semibold tracking-tight text-fg">
                Q3 Product Update
              </p>
              <ul className="mt-3 space-y-1.5 text-[12px] text-fg-muted">
                <li className="flex gap-2">
                  <span className="text-fg">•</span> Brand kits applied
                </li>
                <li className="flex gap-2">
                  <span className="text-fg">•</span> MCP-ready pipeline
                </li>
                <li className="flex gap-2">
                  <span className="text-fg">•</span> Fair-use free tier
                </li>
              </ul>
              <p className="mt-5 border-t border-border pt-3 text-[10px] text-fg-muted">
                Accent color only inside the PDF — site chrome stays monochrome.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
