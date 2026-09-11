"use client";

import { useState } from "react";
import { Logo } from "./Logo";

const links = [
  { href: "#demo", label: "Demo" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#mcp", label: "MCP" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-bg/80 backdrop-blur-md">
      <nav
        className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6"
        aria-label="Primary"
      >
        <a href="#top" className="shrink-0" aria-label="Dynamogic home">
          <Logo />
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-[13px] font-medium text-fg-muted transition-colors hover:text-fg"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2.5 md:flex">
          <a
            href="#faq"
            className="rounded-lg border border-border-strong px-3.5 py-2 text-[13px] font-medium text-fg transition-opacity hover:opacity-80"
          >
            Sign in
          </a>
          <a
            href="#demo"
            className="rounded-lg bg-fg px-3.5 py-2 text-[13px] font-medium text-invert-fg transition-opacity hover:opacity-90"
          >
            Try demo
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-9 items-center rounded-lg border border-border px-3 text-[13px] font-medium md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-border bg-bg px-4 py-4 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="block rounded-md px-2 py-2.5 text-sm font-medium text-fg"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="#demo"
                className="inline-flex w-full items-center justify-center rounded-lg bg-fg px-3 py-2.5 text-sm font-medium text-invert-fg"
                onClick={() => setOpen(false)}
              >
                Try demo
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
