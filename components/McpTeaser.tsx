"use client";

import {
  motion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { useRef } from "react";
import { Reveal } from "./motion/Reveal";
import { usePrefersReducedMotion } from "./motion/usePrefersReducedMotion";

const lines = [
  { role: "you", body: "Render our Q3 update with the Acme kit." },
  {
    role: "tool call",
    body: 'create_branded_pdf({\n  content: "# Q3 Product Update…",\n  brand_kit_id: "acme"\n})',
  },
  {
    role: "result",
    body: "pdf_url: https://dynamogic.app/s/q3-acme\nexpires: null · plan: pro",
  },
];

const lineVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export function McpTeaser() {
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const gridY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const depthY = useTransform(scrollYProgress, [0, 1], [24, -24]);

  return (
    <section
      ref={sectionRef}
      id="mcp"
      className="relative overflow-hidden border-y border-border bg-invert-bg section-pad text-invert-fg"
    >
      {/* depth layers */}
      {!reduced && (
        <>
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              y: gridY,
              backgroundImage:
                "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
            aria-hidden
          />
          <motion.div
            className="pointer-events-none absolute -right-24 top-1/4 h-72 w-72 rounded-full bg-white/[0.04] blur-3xl"
            style={{ y: depthY }}
            aria-hidden
          />
        </>
      )}

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="font-mono text-[11px] tracking-wide text-invert-fg/45">
              technical note · mcp
            </p>
            <h2 className="display mt-4 text-[2rem] text-invert-fg sm:text-[2.35rem]">
              One MCP tool for agents
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-invert-fg/70">
              Point Claude, Cursor, or any MCP client at Dynamogic. Call{" "}
              <code className="font-mono text-[13px] text-invert-fg">
                create_branded_pdf
              </code>{" "}
              with your content and brand kit. Get a PDF URL back. No second tool
              surface in v1 — keep agent UX simple.
            </p>
            <a
              href="#faq"
              className="mt-8 inline-flex text-sm text-invert-fg/70 underline decoration-white/25 underline-offset-4 hover:text-invert-fg hover:decoration-white/60"
            >
              Read the MCP spec →
            </a>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <div className="border border-white/12 bg-black/30 font-mono text-[12.5px] leading-relaxed backdrop-blur-sm">
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5 text-invert-fg/40">
              <span>agent · session</span>
              <span className="ml-auto">create_branded_pdf</span>
            </div>
            {reduced ? (
              <div className="space-y-3 p-4 text-invert-fg/80 sm:p-5">
                {lines.map((l) => (
                  <p key={l.role} className="whitespace-pre-wrap">
                    <span className="text-invert-fg/40">{l.role}</span>
                    <br />
                    {l.role === "tool call" ? (
                      <>
                        <span className="text-invert-fg">create_branded_pdf</span>
                        {" ({"}
                        <br />
                        &nbsp;&nbsp;content: &quot;# Q3 Product Update…&quot;,
                        <br />
                        &nbsp;&nbsp;brand_kit_id: &quot;acme&quot;
                        <br />
                        {"})"}
                      </>
                    ) : (
                      l.body
                    )}
                  </p>
                ))}
              </div>
            ) : (
              <motion.div
                className="space-y-3 p-4 text-invert-fg/80 sm:p-5"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-10% 0px" }}
                variants={{
                  hidden: {},
                  show: {
                    transition: { staggerChildren: 0.28, delayChildren: 0.15 },
                  },
                }}
              >
                {lines.map((l) => (
                  <motion.p
                    key={l.role}
                    className="whitespace-pre-wrap"
                    variants={lineVariants}
                  >
                    <span className="text-invert-fg/40">{l.role}</span>
                    <br />
                    {l.role === "tool call" ? (
                      <>
                        <span className="text-invert-fg">create_branded_pdf</span>
                        {" ({"}
                        <br />
                        &nbsp;&nbsp;content: &quot;# Q3 Product Update…&quot;,
                        <br />
                        &nbsp;&nbsp;brand_kit_id: &quot;acme&quot;
                        <br />
                        {"})"}
                      </>
                    ) : (
                      l.body
                    )}
                  </motion.p>
                ))}
                <motion.span
                  className="mt-1 inline-block h-3.5 w-[7px] bg-invert-fg/70"
                  aria-hidden
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
