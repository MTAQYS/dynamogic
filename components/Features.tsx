const features = [
  {
    title: "Brand kits",
    body: "Logo, colors, fonts, footer — reused on every render.",
  },
  {
    title: "Shared render path",
    body: "Demo, app, API, and MCP hit the same PDF pipeline.",
  },
  {
    title: "Share links",
    body: "Send a link; Free links expire in 7 days; paid can keep permanent.",
  },
  {
    title: "Fair-use free tier",
    body: "3 PDFs/day to try for real — not a fake unlimited trial.",
  },
  {
    title: "Agent-ready",
    body: "TypeScript MCP with a single, clear tool.",
  },
  {
    title: "Calm UI",
    body: "Monochrome product chrome; your brand color lives in the PDF.",
  },
];

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 section-pad sm:px-6">
      <h2 className="text-3xl font-semibold tracking-tight sm:text-[2rem]">
        Built for humans and agents
      </h2>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <article
            key={f.title}
            className="rounded-2xl border border-border bg-bg p-6 shadow-soft transition-colors hover:bg-bg-muted/40"
          >
            <h3 className="text-[15px] font-semibold tracking-tight text-fg">
              {f.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">{f.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
