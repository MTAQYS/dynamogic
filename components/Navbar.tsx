"use client";

import { useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { Logo } from "./Logo";
import { ScrollProgress } from "./motion/ScrollProgress";

const links = [
  { href: "#demo", label: "Demo" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#mcp", label: "MCP" },
  { href: "#pricing", label: "Pricing" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 24);
  });

  const solid = scrolled || open;

  return (
    <>
      <ScrollProgress />
      <header
        className={`sticky top-0 z-50 transition-[background,backdrop-filter,border-color,box-shadow] duration-300 ${
          solid
            ? "border-b border-border bg-bg/92 shadow-[0_8px_28px_rgba(42,42,40,0.04)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav
          className="site-wrap flex h-14 items-center justify-between gap-4"
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

          <div className="hidden items-center gap-3 md:flex">
            <a
              href="#demo"
              className="btn-soft inline-flex h-9 items-center rounded-md px-4 text-[13px] font-semibold"
            >
              Try the demo
            </a>
          </div>

          <button
            type="button"
            className="inline-flex h-9 items-center rounded-md border border-border px-3 text-[13px] font-medium md:hidden"
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
            className="border-t border-border bg-bg/98 px-5 py-3 backdrop-blur-xl sm:px-8 md:hidden"
          >
            <ul className="flex flex-col">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="block px-1 py-2.5 text-sm font-medium text-fg"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="#demo"
                  className="btn-soft inline-flex w-full items-center justify-center rounded-md px-3 py-2.5 text-sm font-semibold"
                  onClick={() => setOpen(false)}
                >
                  Try the demo
                </a>
              </li>
            </ul>
          </div>
        )}
      </header>
    </>
  );
}
