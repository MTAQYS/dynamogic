export function McpTeaser() {
  return (
    <section id="mcp" className="border-y border-border bg-invert-bg section-pad text-invert-fg">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-[2rem]">
          One MCP tool for agents
        </h2>
        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-invert-fg/75">
          Point Claude, Cursor, or any MCP client at Dynamogic. Call{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[13px]">
            create_branded_pdf
          </code>{" "}
          with your content and brand kit. Get a PDF URL back. No second tool
          surface in v1 — keep agent UX simple.
        </p>
        <div className="mt-10 max-w-md rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-invert-fg/50">
            Tool name
          </p>
          <pre className="mt-3 overflow-x-auto font-mono text-sm text-invert-fg">
            create_branded_pdf
          </pre>
        </div>
        <a
          href="#faq"
          className="mt-8 inline-flex text-sm font-medium text-invert-fg underline decoration-white/30 underline-offset-4 hover:decoration-white"
        >
          Read the MCP spec →
        </a>
      </div>
    </section>
  );
}
