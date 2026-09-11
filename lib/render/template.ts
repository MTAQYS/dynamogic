import type { BrandKitInput } from "./types";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildBrandedHtml(opts: {
  bodyHtml: string;
  brand: BrandKitInput;
  showCredit?: boolean;
}): string {
  const { bodyHtml, brand, showCredit = true } = opts;
  const primary = brand.primary_color || "#0A0A0A";
  const headingFont = brand.font_heading || "Inter";
  const bodyFont = brand.font_body || "Inter";
  const accent = brand.accent_style || "bar";

  let accentCss = "";
  if (accent === "bar") {
    accentCss = `.doc-header { border-bottom: 3px solid ${primary}; padding-bottom: 16px; margin-bottom: 28px; }`;
  } else if (accent === "left-rule") {
    accentCss = `.doc-body { border-left: 4px solid ${primary}; padding-left: 20px; }`;
  }

  const logo = brand.logo_data_url
    ? `<img class="logo" src="${brand.logo_data_url}" alt="${escapeHtml(brand.name)} logo" />`
    : "";

  const website = brand.website
    ? `<div class="meta">${escapeHtml(brand.website)}</div>`
    : "";

  const footerBits = [
    brand.footer_text ? escapeHtml(brand.footer_text) : "",
    showCredit ? "Made with Dynamogic" : "",
  ].filter(Boolean);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${escapeHtml(brand.name)}</title>
<style>
  @page { margin: 48px; size: A4; }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    color: #0A0A0A;
    font-family: "${escapeHtml(bodyFont)}", ui-sans-serif, system-ui, sans-serif;
    font-size: 12pt;
    line-height: 1.55;
  }
  h1, h2, h3, h4 {
    font-family: "${escapeHtml(headingFont)}", ui-sans-serif, system-ui, sans-serif;
    line-height: 1.25;
    margin: 0 0 0.6em;
  }
  h1 { font-size: 22pt; font-weight: 700; }
  h2 { font-size: 16pt; font-weight: 600; margin-top: 1.4em; }
  h3 { font-size: 13pt; font-weight: 600; margin-top: 1.2em; }
  p { margin: 0 0 0.85em; }
  ul, ol { margin: 0 0 1em; padding-left: 1.4em; }
  li { margin: 0.25em 0; }
  a { color: ${primary}; }
  code {
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 0.9em;
    background: #F3F3F3;
    padding: 0.1em 0.35em;
    border-radius: 4px;
  }
  pre {
    background: #F3F3F3;
    padding: 12px 14px;
    border-radius: 6px;
    overflow-x: auto;
    font-size: 10.5pt;
  }
  pre code { background: transparent; padding: 0; }
  table { width: 100%; border-collapse: collapse; margin: 0 0 1em; }
  th, td { border: 1px solid #E5E5E5; padding: 8px 10px; text-align: left; }
  th { background: #F7F7F5; }
  blockquote {
    margin: 0 0 1em;
    padding-left: 14px;
    border-left: 3px solid #E5E5E5;
    color: #525252;
  }
  .doc-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; }
  .brand-name { font-size: 11pt; font-weight: 600; letter-spacing: 0.02em; color: ${primary}; }
  .logo { max-height: 48px; max-width: 180px; object-fit: contain; }
  .meta { font-size: 9.5pt; color: #525252; margin-top: 4px; }
  .doc-body { margin-top: 8px; }
  .doc-footer {
    margin-top: 48px;
    padding-top: 14px;
    border-top: 1px solid #E5E5E5;
    font-size: 9pt;
    color: #737373;
    display: flex;
    justify-content: space-between;
    gap: 12px;
  }
  ${accentCss}
</style>
</head>
<body>
  <header class="doc-header">
    <div>
      ${logo}
      <div class="brand-name">${escapeHtml(brand.name)}</div>
      ${website}
    </div>
  </header>
  <main class="doc-body">
    ${bodyHtml}
  </main>
  <footer class="doc-footer">
    <div>${footerBits.join(" · ")}</div>
  </footer>
</body>
</html>`;
}
