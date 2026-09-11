"use client";

import { HairlineDraw, Reveal, Stagger, StaggerItem } from "./motion/Reveal";

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
      <Reveal>
        <h2 className="display text-[2rem] text-fg sm:text-[2.35rem]">
          Built for humans and agents
        </h2>
      </Reveal>
      <HairlineDraw className="mt-12" />
      <dl>
        <Stagger stagger={0.07}>
          {features.map((f) => (
            <StaggerItem key={f.title}>
              <div className="grid gap-2 border-b border-border py-5 sm:grid-cols-2 sm:gap-10">
                <dt className="font-serif text-lg text-fg">{f.title}</dt>
                <dd className="text-[15px] leading-relaxed text-fg-muted">
                  {f.body}
                </dd>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </dl>
    </section>
  );
}
