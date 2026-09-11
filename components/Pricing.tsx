"use client";

import { motion } from "framer-motion";
import { Reveal, Stagger, StaggerItem } from "./motion/Reveal";
import { usePrefersReducedMotion } from "./motion/usePrefersReducedMotion";

export function Pricing() {
  const reduced = usePrefersReducedMotion();

  return (
    <section id="pricing" className="border-y border-border bg-bg-muted section-pad">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="display text-[2rem] text-fg sm:text-[2.35rem]">
            Simple pricing
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-fg-muted">
            Start free. Upgrade when the brand layer becomes part of your
            workflow. Founding seats are capped at 50.
          </p>
        </Reveal>

        <Stagger className="mt-12 grid gap-0 border border-border bg-bg lg:grid-cols-2" stagger={0.12}>
          <StaggerItem>
            <article className="flex h-full flex-col border-b border-border p-7 sm:p-8 lg:border-b-0 lg:border-r">
              <h3 className="text-sm font-medium text-fg-muted">Free</h3>
              <p className="mt-3 font-serif text-4xl text-fg">$0</p>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                3 PDFs per day
              </p>
              <ul className="mt-6 flex-1 space-y-2 text-sm text-fg">
                <li>1 brand kit</li>
                <li>Share links expire in 7 days</li>
                <li>Demo + account</li>
              </ul>
              <a
                href="#demo"
                className="mt-8 inline-flex h-10 w-fit items-center rounded-md border border-border-strong px-4 text-sm font-medium text-fg transition-colors hover:bg-bg-muted"
              >
                Start free
              </a>
            </article>
          </StaggerItem>

          <StaggerItem>
            {reduced ? (
              <article className="relative flex h-full flex-col bg-fg p-7 text-invert-fg sm:p-8">
                <ProInner />
              </article>
            ) : (
              <motion.article
                className="relative flex h-full flex-col bg-fg p-7 text-invert-fg sm:p-8"
                initial={{ y: 18, boxShadow: "0 0 0 0 rgba(17,17,17,0)" }}
                whileInView={{
                  y: 0,
                  boxShadow:
                    "0 24px 48px -12px rgba(17,17,17,0.35), 0 0 0 1px rgba(17,17,17,0.08)",
                }}
                viewport={{ once: true, margin: "-8% 0px" }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  className="pointer-events-none absolute inset-0 rounded-[inherit]"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: [0, 0.55, 0.25] }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
                  style={{
                    boxShadow: "inset 0 0 0 1px rgba(245,244,239,0.22)",
                  }}
                  aria-hidden
                />
                <ProInner />
              </motion.article>
            )}
          </StaggerItem>
        </Stagger>

        <Reveal delay={0.15} className="mt-4">
          <div className="flex flex-col gap-4 border border-border bg-bg px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-sm font-medium text-fg">Founding</h3>
                <span className="font-mono text-[11px] text-fg-muted">
                  limited · 50 seats
                </span>
              </div>
              <p className="mt-1 text-sm text-fg-muted">
                <span className="text-fg">$79</span> for 12 months or{" "}
                <span className="text-fg">$149</span> lifetime · 100 PDFs/mo ·
                everything in Pro during the founding window
              </p>
            </div>
            <a
              href="#faq"
              className="inline-flex h-9 shrink-0 items-center text-sm text-fg underline decoration-border underline-offset-4 hover:decoration-fg"
            >
              Claim founding →
            </a>
          </div>
        </Reveal>

        <p className="mt-8 text-sm text-fg-muted">
          Payments via Lemon Squeezy. Taxes/VAT shown at checkout.
        </p>
      </div>
    </section>
  );
}

function ProInner() {
  return (
    <>
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-sm font-medium text-invert-fg/70">Pro</h3>
        <span className="font-mono text-[11px] text-invert-fg/45">
          recommended
        </span>
      </div>
      <p className="mt-3 font-serif text-4xl text-invert-fg">$12/mo</p>
      <p className="mt-1 text-sm text-invert-fg/55">or $99/yr</p>
      <p className="mt-3 text-sm leading-relaxed text-invert-fg/70">
        Higher daily/monthly caps for regular shipping
      </p>
      <ul className="mt-6 flex-1 space-y-2 text-sm text-invert-fg/90">
        <li>Multiple brand kits</li>
        <li>Permanent share links</li>
        <li>API + MCP access</li>
      </ul>
      <a
        href="#faq"
        className="mt-8 inline-flex h-10 w-fit items-center rounded-md bg-invert-fg px-4 text-sm font-medium text-fg transition-opacity hover:opacity-90"
      >
        Upgrade to Pro
      </a>
    </>
  );
}
