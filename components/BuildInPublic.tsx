"use client";

import { Reveal } from "./motion/Reveal";

export function BuildInPublic() {
  return (
    <section className="border-y border-border py-10">
      <Reveal className="mx-auto flex max-w-6xl flex-col gap-4 px-4 sm:flex-row sm:items-baseline sm:justify-between sm:px-6">
        <p className="max-w-2xl text-sm leading-relaxed text-fg-muted">
          Building Dynamogic in public — brand kits, one MCP tool, fair-use free
          tier. Founding seats limited to 50.
        </p>
        <a
          href="#footer"
          className="shrink-0 text-sm text-fg underline decoration-border underline-offset-4 hover:decoration-fg"
        >
          Follow updates →
        </a>
      </Reveal>
    </section>
  );
}
