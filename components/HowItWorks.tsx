const steps = [
  {
    title: "Bring content",
    body: "Paste markdown from your LLM or agent.",
  },
  {
    title: "Apply brand kit",
    body: "Logo, colors, fonts, footer — saved once.",
  },
  {
    title: "Get a PDF",
    body: "Download or share. Same engine for demo, app, API, and MCP.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-4 section-pad sm:px-6">
      <h2 className="text-3xl font-semibold tracking-tight sm:text-[2rem]">
        Three steps. One pipeline.
      </h2>
      <ol className="mt-12 grid gap-5 md:grid-cols-3">
        {steps.map((s, i) => (
          <li
            key={s.title}
            className="rounded-2xl border border-border bg-bg p-6 shadow-soft"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-xs font-semibold">
              {i + 1}
            </div>
            <h3 className="mt-5 text-lg font-semibold tracking-tight">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">{s.body}</p>
          </li>
        ))}
      </ol>
      <p className="mt-10 max-w-3xl text-sm leading-relaxed text-fg-muted">
        Competitors like Canva or native chat exports are great at other jobs.
        Dynamogic focuses on repeatable brand application for text-first AI
        output.
      </p>
    </section>
  );
}
