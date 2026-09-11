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
import { useCallback, useRef, useState, type PointerEvent } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

const ACCENT = "#1D4ED8";

function DraftFace() {
  return (
    <div className="absolute inset-0 flex flex-col bg-[#E8E7E2] p-6 sm:p-8">
      <p className="font-mono text-[10px] uppercase tracking-wider text-fg-muted/70">
        ai draft · untitled
      </p>
      <div className="mt-6 space-y-2.5 font-mono text-[12px] leading-relaxed text-fg-muted sm:text-[13px]">
        <p className="text-fg/70"># Q3 Product Update</p>
        <p className="text-fg-muted/80">## Highlights</p>
        <p>- shipped brand kits…</p>
        <p>- mcp tool create_branded_pdf…</p>
        <p>- fair-use free tier…</p>
        <div className="space-y-2 pt-5">
          <div className="h-px w-[92%] bg-fg/10" />
          <div className="h-px w-full bg-fg/10" />
          <div className="h-px w-[78%] bg-fg/10" />
          <div className="h-px w-[64%] bg-fg/10" />
          <div className="h-px w-[88%] bg-fg/10" />
        </div>
        <p className="pt-4 text-[11px] text-fg-muted/50">plaintext · no brand</p>
      </div>
    </div>
  );
}

function BrandedFace() {
  return (
    <div className="absolute inset-0 flex flex-col bg-bg-paper">
      <div
        className="absolute inset-y-0 left-0 w-[4px]"
        style={{ background: ACCENT }}
      />
      <div className="flex flex-1 flex-col p-6 pl-7 sm:p-8 sm:pl-9">
        <div className="flex items-center justify-between">
          <p
            className="text-[11px] font-semibold tracking-[0.18em]"
            style={{ color: ACCENT }}
          >
            ACME
          </p>
          <p className="font-mono text-[10px] text-fg-muted">PDF · branded</p>
        </div>
        <h3 className="mt-8 font-serif text-2xl leading-tight text-fg sm:text-[1.85rem]">
          Q3 Product Update
        </h3>
        <ul className="mt-6 space-y-2.5 text-[13px] leading-relaxed text-fg-muted">
          <li className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-fg/40" />
            Brand kits applied across every render
          </li>
          <li className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-fg/40" />
            MCP-ready pipeline for agents
          </li>
          <li className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-fg/40" />
            Fair-use free tier — 3 PDFs/day
          </li>
        </ul>
        <div className="mt-auto border-t border-border pt-4">
          <p className="text-[10px] leading-relaxed text-fg-muted">
            Acme Inc. · Confidential · Accent only inside the PDF
          </p>
        </div>
      </div>
    </div>
  );
}

function StaticFallback() {
  return (
    <div className="mx-auto grid w-full max-w-3xl gap-4 sm:grid-cols-2">
      <div className="relative aspect-[3/4] overflow-hidden border border-border shadow-paper">
        <DraftFace />
      </div>
      <div className="relative aspect-[3/4] overflow-hidden border border-border shadow-paper">
        <BrandedFace />
      </div>
    </div>
  );
}

function StageDot({
  progress,
  at,
}: {
  progress: MotionValue<number>;
  at: number;
}) {
  const opacity = useTransform(progress, (v) =>
    Math.abs(v - at) < 0.18 ? 1 : 0.25
  );
  const scale = useTransform(progress, (v) =>
    Math.abs(v - at) < 0.18 ? 1.35 : 1
  );
  return (
    <motion.span
      className="block h-1 w-1 rounded-full bg-fg"
      style={{ opacity, scale }}
    />
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
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  });

  const rotateY = useTransform(progress, [0, 0.35, 0.7, 1], [0, -28, 18, 6]);
  const rotateX = useTransform(progress, [0, 0.4, 1], [8, -6, 2]);
  const scale = useTransform(progress, [0, 0.45, 1], [0.92, 1.02, 1]);
  const z = useTransform(progress, [0, 0.5, 1], [0, 48, 20]);
  const draftOpacity = useTransform(progress, [0, 0.42, 0.62], [1, 1, 0]);
  const brandOpacity = useTransform(progress, [0.38, 0.58, 1], [0, 1, 1]);
  const shadow = useTransform(
    progress,
    [0, 0.5, 1],
    [
      "0 4px 24px rgba(17,17,17,0.06)",
      "0 32px 64px rgba(17,17,17,0.18)",
      "0 16px 40px rgba(17,17,17,0.12)",
    ]
  );
  const labelOpacity = useTransform(progress, [0, 0.12, 0.88, 1], [1, 0, 0, 1]);

  const [label, setLabel] = useState("Scroll — draft lifts");
  useMotionValueEvent(progress, "change", (v) => {
    setLabel(v < 0.5 ? "Scroll — draft lifts" : "Branded PDF");
  });

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springTiltX = useSpring(tiltX, { stiffness: 180, damping: 18 });
  const springTiltY = useSpring(tiltY, { stiffness: 180, damping: 18 });

  const onMove = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (reduced) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      tiltY.set(px * 10);
      tiltX.set(py * -8);
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
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <StaticFallback />
      </div>
    );
  }

  return (
    <div ref={ref} className="relative h-[240vh]">
      <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-center overflow-hidden">
        <motion.p
          className="pointer-events-none absolute top-[calc(4.5rem+env(safe-area-inset-top))] font-mono text-[11px] tracking-wide text-fg-muted sm:top-20"
          style={{ opacity: labelOpacity }}
        >
          {label}
        </motion.p>

        <div
          className="relative flex w-full max-w-lg items-center justify-center px-4"
          style={{ perspective: "1400px" }}
          onPointerMove={onMove}
          onPointerLeave={onLeave}
        >
          <motion.div
            className="relative aspect-[3/4] w-full max-w-[340px] will-change-transform sm:max-w-[380px]"
            style={{
              transform,
              transformStyle: "preserve-3d",
              boxShadow: shadow,
            }}
          >
            <div className="absolute inset-0 overflow-hidden border border-border bg-bg-paper">
              <motion.div
                className="absolute inset-0"
                style={{ opacity: draftOpacity }}
              >
                <DraftFace />
              </motion.div>
              <motion.div
                className="absolute inset-0"
                style={{ opacity: brandOpacity }}
              >
                <BrandedFace />
              </motion.div>
            </div>
            <div
              className="pointer-events-none absolute inset-0 border border-fg/5"
              aria-hidden
            />
          </motion.div>
        </div>

        <div
          className="pointer-events-none absolute bottom-10 flex items-center gap-2 sm:bottom-14"
          aria-hidden
        >
          {[0, 0.33, 0.66, 1].map((t) => (
            <StageDot key={t} progress={progress} at={t} />
          ))}
        </div>
      </div>
    </div>
  );
}
