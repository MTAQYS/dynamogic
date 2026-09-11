"use client";

import { useMemo, useState } from "react";
import { assetPath } from "@/lib/site";
import { useWindows } from "../WindowContext";

const SAMPLE_MARKDOWN = `# Q3 Product Update
## Highlights
- Shipped brand kits for AI-generated PDFs
- MCP tool for agents: create_branded_pdf
- Fair-use free tier: 3 PDFs/day

## Next
Client pilots and founding seats (limited).
`;

type Status = "idle" | "busy" | "ready" | "error" | "rate_limit";

const isStatic =
  typeof process !== "undefined" &&
  process.env.NEXT_PUBLIC_STATIC_DEMO === "1";

export function DemoApp() {
  const { brand, setBrand, openApp } = useWindows();
  const [content, setContent] = useState(SAMPLE_MARKDOWN);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [staticPreview, setStaticPreview] = useState(false);
  const [logoDataUrl, setLogoDataUrl] = useState<string | null>(null);

  const brandPayload = useMemo(
    () => ({
      name: brand.name,
      primary_color: brand.primary_color,
      font_heading: brand.font_heading,
      font_body: brand.font_body,
      accent_style: brand.accent_style,
      footer_text: brand.footer_text,
      website: brand.website,
      logo_data_url: logoDataUrl,
    }),
    [brand, logoDataUrl]
  );

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

  async function generate() {
    setStatus("busy");
    setMessage(null);
    setStaticPreview(false);
    if (pdfUrl && pdfUrl.startsWith("blob:")) {
      URL.revokeObjectURL(pdfUrl);
      setPdfUrl(null);
    }

    if (isStatic) {
      await new Promise((r) => setTimeout(r, 650));
      setPdfUrl(assetPath("/sample-demo.pdf"));
      setStaticPreview(true);
      setRemaining(2);
      setStatus("ready");
      setMessage(
        "PDF ready — (Pages preview uses a sample PDF; live render on local/Vercel.)"
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
            "Couldn’t generate that PDF. Try again in a moment."
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
      setMessage("PDF ready — Download");
    } catch {
      setStatus("error");
      setMessage(
        "You’re offline or the network failed. Check your connection and retry."
      );
    }
  }

  return (
    <div className="flex h-full min-h-0 flex-col bg-bg">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/70 bg-bg-muted/50 px-5 py-2.5">
        <div>
          <p className="text-[13px] font-semibold tracking-tight text-fg">
            Live render studio
          </p>
          <p className="font-mono text-[10px] text-fg-muted">
            bay · demo · fair-use
          </p>
        </div>
        <button
          type="button"
          onClick={() => openApp("brand")}
          className="rounded-lg border border-border/80 bg-bg-paper px-3 py-1.5 text-[11px] font-medium text-fg/70 transition-colors hover:border-border-strong hover:text-fg"
        >
          Edit Brand Kit →
        </button>
      </div>

      <div className="grid min-h-0 flex-1 gap-0 lg:grid-cols-2">
        <div className="flex min-h-0 flex-col gap-3.5 overflow-auto border-b border-border/70 p-5 lg:border-b-0 lg:border-r">
          <div>
            <label htmlFor="os-content" className="text-[11px] font-semibold tracking-tight text-fg">
              Content
            </label>
            <textarea
              id="os-content"
              className="prose-demo mt-1.5 h-36 w-full resize-y rounded-xl border border-border/80 bg-bg-paper p-3.5 text-fg shadow-soft focus:border-border-strong"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              spellCheck={false}
            />
          </div>

          <div className="rounded-xl border border-border/80 bg-bg-paper p-3.5 shadow-soft">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[11px] font-semibold tracking-tight text-fg">
                Active brand kit
              </p>
              <span
                className="h-3 w-3 rounded-full border border-border"
                style={{ background: brand.primary_color }}
                title="Brand color (PDF only)"
              />
            </div>
            <p className="mt-1 text-sm font-medium tracking-tight text-fg">
              {brand.name}
            </p>
            <p className="font-mono text-[10px] text-fg-muted">
              {brand.primary_color} · {brand.accent_style}
            </p>
            <div className="mt-2.5 grid gap-2.5 sm:grid-cols-2">
              <div>
                <label htmlFor="os-name" className="text-[10px] text-fg-muted">
                  Name
                </label>
                <input
                  id="os-name"
                  className="mt-0.5 h-8 w-full rounded-lg border border-border/80 bg-bg px-2.5 text-sm"
                  value={brand.name}
                  onChange={(e) =>
                    setBrand((b) => ({ ...b, name: e.target.value }))
                  }
                />
              </div>
              <div>
                <label htmlFor="os-color" className="text-[10px] text-fg-muted">
                  Color (PDF)
                </label>
                <div className="mt-0.5 flex gap-1">
                  <input
                    id="os-color"
                    type="color"
                    value={brand.primary_color}
                    onChange={(e) =>
                      setBrand((b) => ({
                        ...b,
                        primary_color: e.target.value,
                      }))
                    }
                    className="h-8 w-9 cursor-pointer rounded-lg border border-border/80 bg-bg p-0.5"
                  />
                  <input
                    aria-label="Primary color hex"
                    className="h-8 w-full rounded-lg border border-border/80 bg-bg px-2 font-mono text-xs"
                    value={brand.primary_color}
                    onChange={(e) =>
                      setBrand((b) => ({
                        ...b,
                        primary_color: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>
            <div className="mt-2.5">
              <label htmlFor="os-logo" className="text-[10px] text-fg-muted">
                Optional logo
              </label>
              <input
                id="os-logo"
                type="file"
                accept="image/png,image/jpeg,image/svg+xml,image/webp"
                className="mt-0.5 block w-full text-[11px] text-fg-muted file:mr-2 file:rounded-lg file:border file:border-border file:bg-bg file:px-2.5 file:py-1 file:text-[10px]"
                onChange={(e) => onLogoChange(e.target.files?.[0] || null)}
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={generate}
              disabled={status === "busy"}
              aria-busy={status === "busy"}
              className="btn-soft inline-flex h-10 items-center rounded-xl px-5 text-[13px] font-semibold tracking-tight disabled:opacity-60"
            >
              {status === "busy" ? "Generating…" : "Generate PDF"}
            </button>
            {remaining !== null && (
              <span className="font-mono text-[11px] text-fg-muted">
                {remaining} left today
              </span>
            )}
          </div>

          {message && (
            <p
              role="status"
              className={`text-xs leading-relaxed ${
                status === "error" || status === "rate_limit"
                  ? "text-danger"
                  : "text-fg-muted"
              }`}
            >
              {message}
            </p>
          )}

          {pdfUrl && status === "ready" && (
            <a
              href={pdfUrl}
              download="dynamogic-demo.pdf"
              className="inline-flex h-9 w-fit items-center rounded-xl border border-border-strong px-4 text-[13px] font-semibold tracking-tight transition-colors hover:bg-fg hover:text-invert-fg"
            >
              Download
            </a>
          )}
          {staticPreview && (
            <p className="font-mono text-[10px] text-fg-muted">
              Static Pages sample · live Playwright on npm run dev
            </p>
          )}
        </div>

        <div className="flex min-h-[280px] flex-col bg-bg-paper">
          <div className="flex items-center justify-between border-b border-border/70 px-5 py-2.5">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-muted">
              pdf preview
            </p>
            <p className="font-mono text-[10px] text-fg-muted">{brand.name}</p>
          </div>
          {pdfUrl ? (
            <object
              data={pdfUrl}
              type="application/pdf"
              className="h-full min-h-[280px] w-full flex-1"
              aria-label="Generated PDF preview"
            >
              <iframe
                title="Generated PDF preview"
                src={pdfUrl}
                className="h-full min-h-[280px] w-full"
              />
            </object>
          ) : (
            <div className="app-empty m-5">
              <div
                className="w-full max-w-[240px] rounded-xl border border-border bg-bg-paper p-5 text-left shadow-soft"
                style={{
                  borderLeftWidth: 3,
                  borderLeftColor: brand.primary_color,
                }}
              >
                <p
                  className="text-[10px] font-bold tracking-[0.2em]"
                  style={{ color: brand.primary_color }}
                >
                  {brand.name.toUpperCase()}
                </p>
                <p className="mt-2 text-[15px] font-semibold tracking-tight text-fg">
                  Ready when you are
                </p>
                <p className="mt-2 text-[11px] leading-relaxed text-fg-muted">
                  Generate a PDF to preview here. Brand color stays inside the
                  document — never on OS chrome.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
