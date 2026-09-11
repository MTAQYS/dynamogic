"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useCallback, useMemo, useRef, useState, type PointerEvent } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

const ACCENT = "#1D4ED8";

const GLYPHS = [
  "#",
  "##",
  "PDF",
  "{}",
  "md",
  "→",
  "kit",
  "¶",
  "·",
  "AI",
  "brand",
  "render",
];

function DraftFace() {
  return (
    <div className="absolute inset-0 flex flex-col bg-[#E4E2DC] p-7 sm:p-9">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg/35">
          untitled.md
        </p>
        <p className="font-mono text-[10px] text-fg/25">raw · no brand</p>
      </div>
      <div className="mt-8 space-y-3 font-mono text-[13px] leading-relaxed text-fg/40 sm:text-[14px]">
        <p className="text-fg/65"># Q3 Product Update</p>
        <p>## Highlights</p>
        <p>- shipped brand kits…</p>
        <p>- mcp create_branded_pdf…</p>
        <p>- fair-use free tier…</p>
        <div className="space-y-2.5 pt-8">
          <div className="h-[2px] w-[94%] bg-fg/10" />
          <div className="h-[2px] w-full bg-fg/10" />
          <div className="h-[2px] w-[82%] bg-fg/10" />
          <div className="h-[2px] w-[70%] bg-fg/10" />
          <div className="h-[2px] w-[90%] bg-fg/10" />
          <div className="h-[2px] w-[55%] bg-fg/10" />
        </div>
        <p className="pt-6 text-[11px] uppercase tracking-wider text-fg/25">
          bleak ai draft
        </p>
      </div>
    </div>
  );
}

function BrandedFace() {
  return (
    <div className="absolute inset-0 flex flex-col bg-white">
      <motion.div
        className="absolute inset-y-0 left-0 w-[5px]"
        style={{ background: ACCENT }}
        aria-hidden
      />
      {/* Color accent flare — brand color only on PDF face */}
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-40 blur-3xl"
        style={{ background: ACCENT }}
        aria-hidden
      />
      <div className="relative flex flex-1 flex-col p-7 pl-8 sm:p-9 sm:pl-10">
        <div className="flex items-center justify-between">
          <p
            className="text-[12px] font-bold tracking-[0.22em]"
            style={{ color: ACCENT }}
          >
            ACME
          </p>
          <p className="font-mono text-[10px] text-fg-muted">PDF · branded</p>
        </div>
        <h3 className="mt-10 text-[1.75rem] font-extrabold leading-[1.05] tracking-tightest text-fg sm:text-[2.15rem]">
          Q3 Product Update
        </h3>
        <div
          className="mt-3 h-[3px] w-16"
          style={{ background: ACCENT }}
          aria-hidden
        />
        <ul className="mt-8 space-y-3 text-[14px] leading-relaxed text-fg-muted">
          <li className="flex gap-3">
            <span
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: ACCENT }}
            />
            Brand kits applied across every render
          </li>
          <li className="flex gap-3">
            <span
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: ACCENT }}
            />
            MCP-ready pipeline for agents
          </li>
          <li className="flex gap-3">
            <span
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: ACCENT }}
            />
            Fair-use free tier — 3 PDFs/day
          </li>
        </ul>
        <div className="mt-auto border-t border-border pt-5">
          <p className="text-[11px] leading-relaxed text-fg-muted">
            Acme Inc. · Confidential · Accent only inside the PDF
          </p>
        </div>
      </div>
    </div>
  );
}

function FloatingGlyphs({ progress }: { progress: MotionValue<number> }) {
  const items = useMemo(
    () =>
      GLYPHS.map((g, i) => ({
        g,
        left: `${8 + ((i * 17) % 84)}%`,
        top: `${12 + ((i * 23) % 76)}%`,
        size: 11 + (i % 4) * 3,
        drift: (i % 2 === 0 ? 1 : -1) * (40 + (i % 5) * 18),
        rot: (i % 2 === 0 ? 1 : -1) * (8 + i * 2),
        delay: i * 0.04,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {items.map((it, i) => (
        <Glyph key={i} item={it} progress={progress} />
      ))}
    </div>
  );
}

function Glyph({
  item,
  progress,
}: {
  item: {
    g: string;
    left: string;
    top: string;
    size: number;
    drift: number;
    rot: number;
    delay: number;
  };
  progress: MotionValue<number>;
}) {
  const y = useTransform(progress, [0, 1], [item.drift, -item.drift]);
  const opacity = useTransform(
    progress,
    [0, 0.15, 0.45, 0.7, 1],
    [0.15, 0.45, 0.55, 0.2, 0]
  );
  const rotate = useTransform(progress, [0, 1], [0, item.rot]);

  return (
    <motion.span
      className="absolute font-mono text-fg/40"
      style={{
        left: item.left,
        top: item.top,
        fontSize: item.size,
        y,
        opacity,
        rotate,
      }}
    >
      {item.g}
    </motion.span>
  );
}

function InkDust({ progress }: { progress: MotionValue<number> }) {
  const dots = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        left: `${5 + ((i * 37) % 90)}%`,
        top: `${8 + ((i * 53) % 84)}%`,
        size: 1 + (i % 3),
        drift: (i % 2 === 0 ? 1 : -1) * (60 + (i % 7) * 20),
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {dots.map((d, i) => (
        <DustDot key={i} d={d} progress={progress} />
      ))}
    </div>
  );
}

function DustDot({
  d,
  progress,
}: {
  d: { left: string; top: string; size: number; drift: number };
  progress: MotionValue<number>;
}) {
  const y = useTransform(progress, [0, 1], [d.drift * 0.3, -d.drift]);
  const opacity = useTransform(progress, [0, 0.3, 0.55, 0.85], [0, 0.5, 0.7, 0]);
  const scale = useTransform(progress, [0.3, 0.55, 0.85], [0.6, 1.2, 0.4]);

  return (
    <motion.span
      className="absolute rounded-full bg-fg"
      style={{
        left: d.left,
        top: d.top,
        width: d.size,
        height: d.size,
        y,
        opacity,
        scale,
      }}
    />
  );
}

function DepthSheets({ progress }: { progress: MotionValue<number> }) {
  const s1 = useTransform(progress, [0, 1], [24, -40]);
  const s2 = useTransform(progress, [0, 1], [40, -70]);
  const s3 = useTransform(progress, [0, 1], [12, -28]);
  const o1 = useTransform(progress, [0, 0.5, 1], [0.12, 0.22, 0.08]);

  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
      style={{ perspective: "1800px" }}
      aria-hidden
    >
      <motion.div
        className="absolute h-[62%] w-[42%] max-w-[420px] border border-fg/10 bg-fg/[0.03]"
        style={{ y: s1, opacity: o1, rotateY: -18, rotateX: 8, scale: 0.92 }}
      />
      <motion.div
        className="absolute h-[58%] w-[38%] max-w-[380px] border border-fg/10 bg-fg/[0.04]"
        style={{ y: s2, opacity: o1, rotateY: 22, rotateX: -6, scale: 0.88 }}
      />
      <motion.div
        className="absolute h-[70%] w-[48%] max-w-[480px] border border-fg/[0.06] bg-transparent"
        style={{ y: s3, opacity: 0.15, rotateY: 8, scale: 1.05 }}
      />
    </div>
  );
}

function StageLabel({
  progress,
  at,
  text,
}: {
  progress: MotionValue<number>;
  at: number;
  text: string;
}) {
  const opacity = useTransform(progress, (v) => {
    const d = Math.abs(v - at);
    if (d < 0.08) return 1;
    if (d < 0.18) return 1 - (d - 0.08) / 0.1;
    return 0;
  });
  return (
    <motion.span
      className="absolute left-0 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-muted"
      style={{ opacity }}
    >
      {text}
    </motion.span>
  );
}

function StaticFallback() {
  return (
    <div className="relative site-wrap max-w-5xl">
      <div className="fog-layer pointer-events-none absolute inset-0" aria-hidden />
      <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
        <div className="relative aspect-[3/4] overflow-hidden border border-border shadow-paper">
          <DraftFace />
          <p className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-wider text-fg/35">
            before · ai draft
          </p>
        </div>
        <div className="relative aspect-[3/4] overflow-hidden border border-border shadow-bay">
          <BrandedFace />
          <p className="absolute bottom-4 right-4 font-mono text-[10px] uppercase tracking-wider text-fg-muted">
            after · branded pdf
          </p>
        </div>
      </div>
    </div>
  );
}

export function HeroStage() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 52,
    damping: 30,
    restDelta: 0.001,
  });

  // Dramatic flip: draft → edge → branded face with scale punch
  const rotateY = useTransform(
    progress,
    [0, 0.22, 0.48, 0.72, 1],
    [12, -8, -92, -175, -180]
  );
  const rotateX = useTransform(progress, [0, 0.4, 0.7, 1], [14, 4, -4, 2]);
  const scale = useTransform(
    progress,
    [0, 0.2, 0.48, 0.62, 0.85, 1],
    [0.78, 0.92, 1.18, 1.08, 1.02, 1]
  );
  const z = useTransform(progress, [0, 0.48, 1], [-40, 120, 40]);
  const docOpacity = useTransform(progress, [0, 0.05, 0.95, 1], [0.85, 1, 1, 1]);

  const accentBurst = useTransform(progress, [0.45, 0.58, 0.75], [0, 1, 0.35]);
  const fogOpacity = useTransform(progress, [0, 0.5, 1], [0.2, 0.08, 0.22]);

  const headlineOpacity = useTransform(progress, [0, 0.12, 0.28], [1, 0.4, 0]);
  const headlineY = useTransform(progress, [0, 0.28], [0, -48]);
  const headlineScale = useTransform(progress, [0, 0.28], [1, 0.92]);

  const endCopyOpacity = useTransform(progress, [0.72, 0.88, 1], [0, 1, 1]);
  const endCopyY = useTransform(progress, [0.72, 0.9], [28, 0]);

  const shadow = useTransform(
    progress,
    [0, 0.48, 1],
    [
      "0 8px 28px rgba(42,42,40,0.06)",
      "0 40px 80px rgba(42,42,40,0.18), 0 0 64px rgba(29,78,216,0.1)",
      "0 24px 52px rgba(42,42,40,0.12)",
    ]
  );

  const [filmLabel, setFilmLabel] = useState("01  ·  bleak draft");
  useMotionValueEvent(progress, "change", (v) => {
    if (v < 0.28) setFilmLabel("01  ·  bleak draft");
    else if (v < 0.52) setFilmLabel("02  ·  brand layer engages");
    else if (v < 0.78) setFilmLabel("03  ·  color lands");
    else setFilmLabel("04  ·  branded pdf");
  });

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springTiltX = useSpring(tiltX, { stiffness: 110, damping: 22 });
  const springTiltY = useSpring(tiltY, { stiffness: 110, damping: 22 });

  const onMove = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (reduced) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      tiltY.set(px * 12);
      tiltX.set(py * -9);
    },
    [reduced, tiltX, tiltY]
  );

  const onLeave = useCallback(() => {
    tiltX.set(0);
    tiltY.set(0);
  }, [tiltX, tiltY]);

  const combinedRotateX = useTransform(
    [rotateX, springTiltX],
    ([rx, tx]: number[]) => rx + tx
  );
  const combinedRotateY = useTransform(
    [rotateY, springTiltY],
    ([ry, ty]: number[]) => ry + ty
  );

  const transform = useMotionTemplate`translateZ(${z}px) rotateX(${combinedRotateX}deg) rotateY(${combinedRotateY}deg) scale(${scale})`;

  if (reduced) {
    return (
      <div className="site-wrap py-12">
        <StaticFallback />
      </div>
    );
  }

  return (
    <div ref={ref} className="relative h-[320vh]">
      <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-center overflow-hidden bg-bg">
        {/* Depth fog */}
        <motion.div
          className="fog-layer pointer-events-none absolute inset-0"
          style={{ opacity: fogOpacity }}
          aria-hidden
        />
        <DepthSheets progress={progress} />
        <FloatingGlyphs progress={progress} />
        <InkDust progress={progress} />

        {/* Film label top */}
        <div className="pointer-events-none absolute left-5 top-[calc(5rem+env(safe-area-inset-top))] z-20 sm:left-8 sm:top-24">
          <p className="font-mono text-[11px] tracking-[0.2em] text-fg-muted">
            {filmLabel}
          </p>
          <div className="relative mt-3 h-4 w-40">
            <StageLabel progress={progress} at={0.08} text="scroll to flip" />
            <StageLabel progress={progress} at={0.4} text="mid-flip" />
            <StageLabel progress={progress} at={0.65} text="accent burst" />
            <StageLabel progress={progress} at={0.9} text="locked" />
          </div>
        </div>

        {/* Huge Inter headline — fades as doc takes stage */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 top-[18%] z-10 px-5 text-center sm:top-[14%] sm:px-8"
          style={{
            opacity: headlineOpacity,
            y: headlineY,
            scale: headlineScale,
          }}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-fg-muted">
            Brand layer for AI output
          </p>
          <h1 className="display-xl mx-auto mt-4 max-w-[16ch] text-[clamp(2.5rem,8vw,5.75rem)] text-fg">
            Watch a draft become a branded PDF.
          </h1>
        </motion.div>

        {/* End-state copy after flip */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-[8%] z-10 px-5 text-center sm:bottom-[10%] sm:px-8"
          style={{ opacity: endCopyOpacity, y: endCopyY }}
        >
          <p className="mx-auto max-w-md text-[15px] font-medium leading-relaxed text-fg-muted">
            One render path for web, API, and MCP. Your brand color lives in the
            PDF — never in the chrome.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href="#demo"
              className="btn-soft pointer-events-auto inline-flex h-11 items-center rounded-md px-6 text-sm font-semibold"
            >
              Try the demo
            </a>
            <a
              href="#pricing"
              className="pointer-events-auto text-sm font-medium text-fg-muted underline decoration-border underline-offset-4 hover:text-fg hover:decoration-fg"
            >
              See pricing
            </a>
          </div>
        </motion.div>

        {/* Accent burst glow — only near branded face reveal */}
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{
            opacity: accentBurst,
            background:
              "radial-gradient(circle, rgba(29,78,216,0.35) 0%, transparent 70%)",
          }}
          aria-hidden
        />

        {/* 3D document */}
        <div
          className="relative z-20 flex w-full max-w-xl items-center justify-center px-4"
          style={{ perspective: "1600px" }}
          onPointerMove={onMove}
          onPointerLeave={onLeave}
        >
          <motion.div
            className="relative aspect-[3/4] w-full max-w-[min(420px,78vw)] will-change-transform"
            style={{
              transform,
              transformStyle: "preserve-3d",
              boxShadow: shadow,
              opacity: docOpacity,
            }}
          >
            {/* Front = draft */}
            <div
              className="absolute inset-0 overflow-hidden border border-fg/12 backface-hidden"
              style={{ transform: "rotateY(0deg) translateZ(1px)" }}
            >
              <DraftFace />
            </div>
            {/* Back = branded (flipped 180 so it reads correctly after rotateY -180) */}
            <div
              className="absolute inset-0 overflow-hidden border border-fg/8 backface-hidden"
              style={{ transform: "rotateY(180deg) translateZ(1px)" }}
            >
              <BrandedFace />
            </div>
            {/* Thin edge for depth */}
            <div
              className="pointer-events-none absolute inset-y-[2%] left-1/2 w-[3px] -translate-x-1/2 bg-gradient-to-b from-fg/15 via-fg/28 to-fg/15"
              style={{
                transform: "rotateY(90deg) translateZ(0px)",
                transformStyle: "preserve-3d",
              }}
              aria-hidden
            />
          </motion.div>
        </div>

        {/* Progress ticks */}
        <div
          className="pointer-events-none absolute bottom-8 right-5 flex flex-col items-end gap-2 sm:bottom-12 sm:right-8"
          aria-hidden
        >
          {[0, 0.33, 0.66, 1].map((t) => (
            <Tick key={t} progress={progress} at={t} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Tick({
  progress,
  at,
}: {
  progress: MotionValue<number>;
  at: number;
}) {
  const w = useTransform(progress, (v) =>
    Math.abs(v - at) < 0.12 ? 28 : 10
  );
  const opacity = useTransform(progress, (v) =>
    Math.abs(v - at) < 0.12 ? 1 : 0.25
  );
  return (
    <motion.span
      className="block h-[2px] bg-fg"
      style={{ width: w, opacity }}
    />
  );
}
