"use client";

import { motion } from "framer-motion";
import { Reveal } from "./motion/Reveal";
import { usePrefersReducedMotion } from "./motion/usePrefersReducedMotion";

const ease = [0.22, 1, 0.36, 1] as const;

export function Pricing() {
  const reduced = usePrefersReducedMotion();

  return (
    <section id="pricing" className="border-y border-border bg-bg section-pad">
      <div className="site-wrap">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-fg-muted">
            Pricing
          </p>
          <h2 className="display-xl mt-4 text-[clamp(2.25rem,5vw,3.75rem)] text-fg">
            Simple pricing
          </h2>
          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-fg-muted">
            Start free. Upgrade when the brand layer becomes part of your
            workflow. Founding seats are capped at 50.
          </p>
        </Reveal>

        <div className="mt-14 grid items-start gap-6 lg:grid-cols-12">
          {/* Free — secondary */}
          <Reveal className="lg:col-span-3" delay={0.05}>
            <article className="flex h-full flex-col border border-border bg-bg-paper p-6 sm:p-7">
              <h3 className="text-sm font-semibold text-fg-muted">Free</h3>
              <p className="mt-4 text-4xl font-extrabold tracking-tightest text-fg">
                $0
              </p>
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
                className="mt-8 inline-flex h-10 w-fit items-center rounded-md border border-border-strong px-4 text-sm font-semibold text-fg transition-colors hover:bg-bg-muted"
              >
                Start free
              </a>
            </article>
          </Reveal>

          {/* Pro — billboard dominant */}
          <div className="lg:col-span-6">
            {reduced ? (
              <article className="relative flex h-full flex-col bg-invert-bg p-7 text-invert-fg shadow-billboard sm:p-8 lg:p-9">
                <ProBillboard />
              </article>
            ) : (
              <motion.article
                className="relative flex h-full flex-col overflow-hidden bg-invert-bg p-7 text-invert-fg sm:p-8 lg:p-9"
                initial={{ y: 48, scale: 0.96, opacity: 0 }}
                whileInView={{ y: 0, scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.95, ease }}
                style={{
                  boxShadow:
                    "0 32px 72px -20px rgba(42,42,40,0.28), 0 0 0 1px rgba(42,42,40,0.12)",
                }}
              >
                <motion.div
                  className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.2 }}
                  aria-hidden
                />
                <motion.div
                  className="pointer-events-none absolute inset-0"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.15 }}
                  style={{
                    boxShadow: "inset 0 0 0 1px rgba(250,250,250,0.12)",
                  }}
                  aria-hidden
                />
                <ProBillboard />
              </motion.article>
            )}
          </div>

          {/* Founding — secondary */}
          <Reveal className="lg:col-span-3" delay={0.12}>
            <article className="flex h-full flex-col border border-border bg-bg-muted p-6 sm:p-7">
              <div className="flex flex-wrap items-baseline gap-2">
                <h3 className="text-sm font-semibold text-fg">Founding</h3>
                <span className="font-mono text-[10px] uppercase tracking-wider text-fg-muted">
                  50 seats
                </span>
              </div>
              <p className="mt-4 text-3xl font-extrabold tracking-tightest text-fg">
                $79
              </p>
              <p className="mt-1 text-sm text-fg-muted">
                12 months · or $149 lifetime
              </p>
              <p className="mt-4 text-sm leading-relaxed text-fg-muted">
                100 PDFs/mo · everything in Pro during the founding window
              </p>
              <a
                href="#faq"
                className="mt-auto pt-8 inline-flex h-10 w-fit items-center text-sm font-semibold text-fg underline decoration-border underline-offset-4 hover:decoration-fg"
              >
                Claim founding →
              </a>
            </article>
          </Reveal>
        </div>

        <p className="mt-12 text-sm text-fg-muted">
          Payments via Lemon Squeezy. Taxes/VAT shown at checkout.
        </p>
      </div>
    </section>
  );
}

function ProBillboard() {
  return (
    <>
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-sm font-semibold tracking-wide text-invert-fg/60">
          Pro
        </h3>
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-invert-fg/40">
          recommended
        </span>
      </div>
      <p className="mt-5 text-[clamp(3rem,7vw,4.75rem)] font-extrabold leading-none tracking-tightest text-invert-fg">
        $12
        <span className="text-[1.25rem] font-semibold tracking-normal text-invert-fg/50">
          /mo
        </span>
      </p>
      <p className="mt-3 text-base text-invert-fg/50">or $99/yr</p>
      <p className="mt-5 max-w-sm text-[16px] leading-relaxed text-invert-fg/70">
        Higher daily/monthly caps for regular shipping — the plan when the brand
        layer becomes your default.
      </p>
      <ul className="mt-7 flex-1 space-y-3 text-[15px] text-invert-fg/90">
        <li className="flex gap-3">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-invert-fg" />
          Multiple brand kits
        </li>
        <li className="flex gap-3">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-invert-fg" />
          Permanent share links
        </li>
        <li className="flex gap-3">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-invert-fg" />
          API + MCP access
        </li>
      </ul>
      <a
        href="#faq"
        className="mt-8 inline-flex h-11 w-fit items-center rounded-md bg-invert-fg px-6 text-sm font-bold text-fg transition-opacity hover:opacity-85"
      >
        Upgrade to Pro
      </a>
    </>
  );
}
