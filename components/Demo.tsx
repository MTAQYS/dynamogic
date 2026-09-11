"use client";

import { useMemo, useState } from "react";
import { assetPath } from "@/lib/site";

const SAMPLE_MARKDOWN = `# Q3 Product Update
## Highlights
- Shipped brand kits for AI-generated PDFs
- MCP tool for agents: create_branded_pdf
- Fair-use free tier: 3 PDFs/day

## Next
Client pilots and founding seats (limited).
`;

const PRESETS = [
  {
    id: "acme",
    label: "Acme Blue",
    name: "Acme",
    primary_color: "#1D4ED8",
    font_heading: "Inter",
    font_body: "Inter",
    accent_style: "bar" as const,
    footer_text: "Acme Inc. · Confidential",
    website: "https://acme.example",
  },
  {
    id: "north",
    label: "North Amber",
    name: "North Studio",
    primary_color: "#B45309",
    font_heading: "Georgia",
    font_body: "Georgia",
    accent_style: "left-rule" as const,
    footer_text: "North Studio",
    website: "https://north.example",
  },
  {
    id: "mono",
    label: "Mono Minimal",
    name: "Mono Co",
    primary_color: "#0A0A0A",
    font_heading: "Inter",
    font_body: "Inter",
    accent_style: "minimal" as const,
    footer_text: "Mono Co",
    website: null as string | null,
  },
];

type Status = "idle" | "busy" | "ready" | "error" | "rate_limit";

const isStatic =
  typeof process !== "undefined" &&
  process.env.NEXT_PUBLIC_STATIC_DEMO === "1";

export function Demo() {
  const [content, setContent] = useState(SAMPLE_MARKDOWN);
  const [presetId, setPresetId] = useState(PRESETS[0].id);
  const preset = PRESETS.find((p) => p.id === presetId) || PRESETS[0];
  const [name, setName] = useState(preset.name);
  const [primary, setPrimary] = useState(preset.primary_color);
  const [accent, setAccent] = useState(preset.accent_style);
  const [footer, setFooter] = useState(preset.footer_text);
  const [logoDataUrl, setLogoDataUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [staticPreview, setStaticPreview] = useState(false);

  function applyPreset(id: string) {
    const p = PRESETS.find((x) => x.id === id) || PRESETS[0];
    setPresetId(id);
    setName(p.name);
    setPrimary(p.primary_color);
    setAccent(p.accent_style);
    setFooter(p.footer_text);
  }

  function onLogoChange(file: File | null) {
    if (!file) {
      setLogoDataUrl(null);
      return;
    }
    if (!file.type.startsWith("image/")) {
      setMessage("Logo must be an image file.");
      return;
    }
    if (file.size > 250_000) {
      setMessage("Logo must be under 250KB for the demo.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setLogoDataUrl(String(reader.result));
    reader.readAsDataURL(file);
  }

  const brandPayload = useMemo(
    () => ({
      name,
      primary_color: primary,
      font_heading: preset.font_heading,
      font_body: preset.font_body,
      accent_style: accent,
      footer_text: footer,
      website: preset.website,
      logo_data_url: logoDataUrl,
    }),
    [name, primary, preset, accent, footer, logoDataUrl]
  );

  async function generate() {
    setStatus("busy");
    setMessage(null);
    setStaticPreview(false);
    if (pdfUrl && pdfUrl.startsWith("blob:")) {
      URL.revokeObjectURL(pdfUrl);
      setPdfUrl(null);
    }

    // GitHub Pages static export — polished mock using sample PDF asset
    if (isStatic) {
      await new Promise((r) => setTimeout(r, 650));
      setPdfUrl(assetPath("/sample-demo.pdf"));
      setStaticPreview(true);
      setRemaining(2);
      setStatus("ready");
      setMessage(
        "PDF ready — Download · (Live server render runs on local/Vercel; this Pages preview uses a sample PDF.)"
      );
      return;
    }

    try {
      const res = await fetch("/api/demo-render", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, brand: brandPayload }),
      });
      const data = await res.json();

      if (res.status === 429) {
        setStatus("rate_limit");
        setMessage(
          data.error ||
            "You’ve hit today’s free demo limit. Sign in or come back tomorrow."
        );
        setRemaining(0);
        return;
      }

      if (!res.ok || !data.pdf_base64) {
        setStatus("error");
        setMessage(
          data.error ||
            "Couldn’t generate that PDF. Try again in a moment. If it keeps failing, contact support."
        );
        return;
      }

      const binary = atob(data.pdf_base64 as string);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      const blob = new Blob([bytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      setRemaining(
        typeof data.remaining === "number" ? data.remaining : null
      );
      setStatus("ready");
      setMessage("PDF ready — Download · Copy share link");
    } catch {
      setStatus("error");
      setMessage(
        "You’re offline or the network failed. Check your connection and retry."
      );
    }
  }

  async function copySharePlaceholder() {
    const text =
      "Share links arrive in a later phase. For now, download the PDF.";
    try {
      await navigator.clipboard.writeText(text);
      setMessage("Share links come in Phase 2 — download the PDF for now.");
    } catch {
      setMessage("Share links come in Phase 2 — download the PDF for now.");
    }
  }

  return (
    <section id="demo" className="border-y border-border bg-bg-muted section-pad">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-fg sm:text-[2rem]">
            Try it on a sample (or your own paste)
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">
            Markdown supported. Color appears in the PDF preview from the sample
            brand kit — the site stays monochrome on purpose.
          </p>
          {isStatic && (
            <p className="mt-3 rounded-lg border border-border bg-bg px-3 py-2 text-xs text-fg-muted">
              GitHub Pages preview: controls are interactive; Generate loads a
              sample branded PDF (server-side Playwright runs on{" "}
              <code className="font-mono">npm run dev</code> / Vercel).
            </p>
          )}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="space-y-4">
            <div>
              <label htmlFor="content" className="text-sm font-medium text-fg">
                Content
              </label>
              <textarea
                id="content"
                className="prose-demo mt-2 h-56 w-full resize-y rounded-xl border border-border bg-bg p-4 text-fg shadow-soft focus:border-border-strong"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                spellCheck={false}
              />
            </div>

            <fieldset className="rounded-xl border border-border bg-bg p-5 shadow-soft">
              <legend className="px-1 text-sm font-medium text-fg">
                Sample brand kit
              </legend>

              <div className="mt-1 flex flex-wrap gap-2">
                {PRESETS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => applyPreset(p.id)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                      presetId === p.id
                        ? "border-border-strong bg-fg text-invert-fg"
                        : "border-border text-fg hover:bg-bg-muted"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="brand-name" className="text-xs font-medium text-fg-muted">
                    Name
                  </label>
                  <input
                    id="brand-name"
                    className="mt-1.5 h-10 w-full rounded-lg border border-border px-3 text-sm"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="brand-color" className="text-xs font-medium text-fg-muted">
                    Primary color (PDF only)
                  </label>
                  <div className="mt-1.5 flex items-center gap-2">
                    <input
                      id="brand-color"
                      type="color"
                      value={primary}
                      onChange={(e) => setPrimary(e.target.value)}
                      className="h-10 w-12 cursor-pointer rounded-lg border border-border bg-bg p-1"
                    />
                    <input
                      aria-label="Primary color hex"
                      className="h-10 w-full rounded-lg border border-border px-3 font-mono text-sm"
                      value={primary}
                      onChange={(e) => setPrimary(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="accent" className="text-xs font-medium text-fg-muted">
                    Accent style
                  </label>
                  <select
                    id="accent"
                    className="mt-1.5 h-10 w-full rounded-lg border border-border px-3 text-sm"
                    value={accent}
                    onChange={(e) =>
                      setAccent(
                        e.target.value as "minimal" | "bar" | "left-rule"
                      )
                    }
                  >
                    <option value="minimal">minimal</option>
                    <option value="bar">bar</option>
                    <option value="left-rule">left-rule</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="footer" className="text-xs font-medium text-fg-muted">
                    Footer text
                  </label>
                  <input
                    id="footer"
                    className="mt-1.5 h-10 w-full rounded-lg border border-border px-3 text-sm"
                    value={footer}
                    onChange={(e) => setFooter(e.target.value)}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="logo" className="text-xs font-medium text-fg-muted">
                    Optional logo
                  </label>
                  <input
                    id="logo"
                    type="file"
                    accept="image/png,image/jpeg,image/svg+xml,image/webp"
                    className="mt-1.5 block w-full text-sm text-fg-muted file:mr-3 file:rounded-md file:border file:border-border file:bg-bg file:px-3 file:py-1.5 file:text-xs file:font-medium"
                    onChange={(e) =>
                      onLogoChange(e.target.files?.[0] || null)
                    }
                  />
                </div>
              </div>
            </fieldset>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={generate}
                disabled={status === "busy"}
                aria-busy={status === "busy"}
                className="inline-flex h-11 items-center rounded-lg bg-fg px-6 text-sm font-medium text-invert-fg disabled:opacity-60"
              >
                {status === "busy" ? "Generating…" : "Generate PDF"}
              </button>
              {remaining !== null && (
                <span className="text-xs text-fg-muted">
                  {remaining} demo PDF{remaining === 1 ? "" : "s"} left today
                </span>
              )}
            </div>

            {message && (
              <p
                role="status"
                className={`text-sm leading-relaxed ${
                  status === "error" || status === "rate_limit"
                    ? "text-danger"
                    : "text-fg-muted"
                }`}
              >
                {message}
              </p>
            )}

            {pdfUrl && status === "ready" && (
              <div className="flex flex-wrap gap-2">
                <a
                  href={pdfUrl}
                  download="dynamogic-demo.pdf"
                  className="inline-flex h-10 items-center rounded-lg border border-border-strong px-4 text-sm font-medium"
                >
                  Download
                </a>
                {!staticPreview && (
                  <button
                    type="button"
                    onClick={copySharePlaceholder}
                    className="inline-flex h-10 items-center rounded-lg border border-border px-4 text-sm font-medium text-fg-muted"
                  >
                    Copy share link
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="overflow-hidden rounded-2xl border border-border bg-bg shadow-[0_16px_40px_-28px_rgba(0,0,0,0.45)]">
            {pdfUrl ? (
              <object
                data={pdfUrl}
                type="application/pdf"
                className="h-full min-h-[480px] w-full"
                aria-label="Generated PDF preview"
              >
                <iframe
                  title="Generated PDF preview"
                  src={pdfUrl}
                  className="h-full min-h-[480px] w-full"
                />
              </object>
            ) : (
              <div className="flex min-h-[480px] flex-col justify-center gap-4 p-8">
                <div
                  className="mx-auto w-full max-w-sm rounded-xl border border-border bg-bg-muted/40 p-5"
                  style={{ borderTopWidth: 3, borderTopColor: primary }}
                >
                  <p
                    className="text-[10px] font-semibold tracking-wide"
                    style={{ color: primary }}
                  >
                    {name.toUpperCase()}
                  </p>
                  <p className="mt-2 text-sm font-semibold">Live preview frame</p>
                  <p className="mt-2 text-xs leading-relaxed text-fg-muted">
                    Generate to load a real PDF here. Brand color appears only
                    inside this preview — never on site buttons.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
