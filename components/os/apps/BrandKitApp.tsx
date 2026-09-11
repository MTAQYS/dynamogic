"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../../motion/usePrefersReducedMotion";
import { useWindows } from "../WindowContext";
import { BRAND_PRESETS } from "../types";

export function BrandKitApp() {
  const { brand, setBrand, openApp } = useWindows();
  const reduced = usePrefersReducedMotion();

  function applyPreset(id: string) {
    const p = BRAND_PRESETS.find((x) => x.id === id);
    if (!p) return;
    setBrand({
      name: p.name,
      primary_color: p.primary_color,
      accent_style: p.accent_style,
      footer_text: p.footer_text,
      font_heading: p.font_heading,
      font_body: p.font_body,
      website: p.website,
      presetId: p.id,
    });
  }

  return (
    <div className="flex h-full flex-col gap-5 overflow-auto bg-bg app-pad">
      <div>
        <p className="app-kicker">Brand Layer</p>
        <h2 className="app-title">Kit editor</h2>
        <p className="mt-1.5 text-[13px] leading-relaxed text-fg-muted">
          Play with presets. Color stays inside the PDF preview.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {BRAND_PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => applyPreset(p.id)}
            className={`rounded-full border px-3.5 py-1.5 text-[12px] font-semibold tracking-tight transition-colors ${
              brand.presetId === p.id
                ? "border-transparent bg-[#2A2A28] text-invert-fg"
                : "border-border/80 bg-bg-paper text-fg hover:bg-bg-muted"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="grid gap-3.5 sm:grid-cols-2">
        <Field label="Brand name">
          <input
            className="h-10 w-full rounded-xl border border-border/80 bg-bg-paper px-3 text-sm shadow-soft"
            value={brand.name}
            onChange={(e) =>
              setBrand((b) => ({ ...b, name: e.target.value, presetId: "custom" }))
            }
          />
        </Field>
        <Field label="Primary (PDF only)">
          <div className="flex gap-2">
            <input
              type="color"
              value={brand.primary_color}
              onChange={(e) =>
                setBrand((b) => ({
                  ...b,
                  primary_color: e.target.value,
                  presetId: "custom",
                }))
              }
              className="h-10 w-12 cursor-pointer rounded-xl border border-border/80 bg-bg-paper p-1"
            />
            <input
              className="h-10 w-full rounded-xl border border-border/80 bg-bg-paper px-3 font-mono text-sm shadow-soft"
              value={brand.primary_color}
              onChange={(e) =>
                setBrand((b) => ({
                  ...b,
                  primary_color: e.target.value,
                  presetId: "custom",
                }))
              }
            />
          </div>
        </Field>
        <Field label="Accent style">
          <select
            className="h-10 w-full rounded-xl border border-border/80 bg-bg-paper px-3 text-sm shadow-soft"
            value={brand.accent_style}
            onChange={(e) =>
              setBrand((b) => ({
                ...b,
                accent_style: e.target.value as BrandKitAppAccent,
                presetId: "custom",
              }))
            }
          >
            <option value="minimal">minimal</option>
            <option value="bar">bar</option>
            <option value="left-rule">left-rule</option>
          </select>
        </Field>
        <Field label="Footer text">
          <input
            className="h-10 w-full rounded-xl border border-border/80 bg-bg-paper px-3 text-sm shadow-soft"
            value={brand.footer_text}
            onChange={(e) =>
              setBrand((b) => ({
                ...b,
                footer_text: e.target.value,
                presetId: "custom",
              }))
            }
          />
        </Field>
      </div>

      <motion.div
        className="rounded-2xl border border-border/80 bg-bg-paper p-5 shadow-soft"
        layout={!reduced}
        style={{ borderTopWidth: 3, borderTopColor: brand.primary_color }}
      >
        <p
          className="text-[11px] font-bold tracking-[0.22em]"
          style={{ color: brand.primary_color }}
        >
          {brand.name.toUpperCase()}
        </p>
        <p className="mt-3 text-lg font-semibold tracking-tight text-fg">
          Q3 Product Update
        </p>
        <p className="mt-2 text-[13px] leading-relaxed text-fg-muted">
          Sample page chrome. Your kit layers onto AI drafts — logo, color,
          footer — same engine for demo, API, and MCP.
        </p>
        {brand.accent_style === "bar" && (
          <div
            className="mt-4 h-1 w-16 rounded-full"
            style={{ background: brand.primary_color }}
          />
        )}
        {brand.accent_style === "left-rule" && (
          <div className="mt-4 flex gap-3">
            <div
              className="w-1 shrink-0 rounded-full"
              style={{ background: brand.primary_color }}
            />
            <p className="text-xs text-fg-muted">Left-rule accent active</p>
          </div>
        )}
        <p className="mt-5 border-t border-border/70 pt-3 font-mono text-[10px] text-fg-muted">
          {brand.footer_text}
        </p>
      </motion.div>

      <button
        type="button"
        onClick={() => openApp("demo")}
        className="btn-soft inline-flex h-10 w-fit items-center rounded-xl px-5 text-[13px] font-semibold tracking-tight"
      >
        Apply in Demo.app
      </button>
    </div>
  );
}

type BrandKitAppAccent = "minimal" | "bar" | "left-rule";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-[11px] font-medium tracking-tight text-fg-muted">
      {label}
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
