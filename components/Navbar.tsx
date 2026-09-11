"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";
import { Logo } from "./Logo";
import { ScrollProgress } from "./motion/ScrollProgress";
import { usePrefersReducedMotion } from "./motion/usePrefersReducedMotion";

const links = [
  { href: "#demo", label: "Demo" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#mcp", label: "MCP" },
  { href: "#pricing", label: "Pricing" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const reduced = usePrefersReducedMotion();
  const { scrollY } = useScroll();

  const height = useTransform(scrollY, [0, 80], [48, 40]);
  const blurPx = useTransform(scrollY, [0, 80], [6, 14]);
  const bg = useTransform(
    scrollY,
    [0, 80],
    ["rgba(250,250,247,0.82)", "rgba(250,250,247,0.94)"]
  );
  const border = useTransform(
    scrollY,
    [0, 80],
    ["rgba(230,228,220,0.45)", "rgba(230,228,220,1)"]
  );
  const backdrop = useTransform(blurPx, (b) => `blur(${b}px)`);

  return (
    <>
      <ScrollProgress />
      {reduced ? (
        <header className="sticky top-0 z-50 border-b border-border bg-bg/90 backdrop-blur-sm">
          <NavInner open={open} setOpen={setOpen} />
        </header>
      ) : (
        <motion.header
          className="sticky top-0 z-50 border-b backdrop-blur-md"
          style={{
            height,
            backgroundColor: bg,
            borderColor: border,
            backdropFilter: backdrop,
            WebkitBackdropFilter: backdrop,
          }}
        >
          <NavInner open={open} setOpen={setOpen} fullHeight />
        </motion.header>
      )}
    </>
  );
}

function NavInner({
  open,
  setOpen,
  fullHeight,
}: {
  open: boolean;
  setOpen: (v: boolean | ((p: boolean) => boolean)) => void;
  fullHeight?: boolean;
}) {
  return (
    <>
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 ${
          fullHeight ? "h-full" : "h-12"
        }`}
        aria-label="Primary"
      >
        <a href="#top" className="shrink-0" aria-label="Dynamogic home">
          <Logo />
        </a>

        <ul className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-[13px] text-fg-muted transition-colors hover:text-fg"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center md:flex">
          <a
            href="#demo"
            className="inline-flex h-8 items-center rounded-md bg-fg px-3.5 text-[13px] font-medium text-invert-fg transition-opacity hover:opacity-90"
          >
            Try the demo
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-8 items-center rounded-md border border-border px-3 text-[13px] md:hidden"
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
          className="border-t border-border bg-bg px-4 py-3 md:hidden"
        >
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="block px-1 py-2.5 text-sm text-fg"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="#demo"
                className="inline-flex w-full items-center justify-center rounded-md bg-fg px-3 py-2.5 text-sm font-medium text-invert-fg"
                onClick={() => setOpen(false)}
              >
                Try the demo
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
