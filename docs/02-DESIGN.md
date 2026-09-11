# 02 — Design

**Stance:** Monochrome minimal product chrome. **Color only** in brand demos and user brand kits applied to PDF previews.

---

## Palette (product UI)

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg` | `#FFFFFF` | Page background |
| `--bg-muted` | `#F7F7F5` | Sections, cards subtle |
| `--fg` | `#0A0A0A` | Primary text |
| `--fg-muted` | `#525252` | Secondary text |
| `--border` | `#E5E5E5` | Dividers, inputs |
| `--border-strong` | `#0A0A0A` | Emphasis borders, buttons outline |
| `--invert-bg` | `#0A0A0A` | Dark bands, footer optional |
| `--invert-fg` | `#FAFAFA` | Text on invert |
| `--focus` | `#0A0A0A` | Focus ring (2px) |
| `--danger` | `#B91C1C` | Errors only (sparingly) |
| `--success` | `#166534` | Success toasts only |

**Do not** introduce brand purple/blue for marketing chrome. Sample brand kits in the demo may use e.g. `#1D4ED8` or `#B45309` **inside the PDF preview only**.

---

## Typography

| Role | Stack | Notes |
|------|-------|-------|
| UI / body | `"Inter", ui-sans-serif, system-ui, sans-serif` | 16px base, 1.5 line-height |
| Display / hero | Same family, tighter tracking | Weight 600–700 |
| Mono (code, MCP) | `"JetBrains Mono", ui-monospace, monospace` | 14px |

Scale (approx): `text-sm` 14 · `text-base` 16 · `text-lg` 18 · `text-xl` 20 · `text-2xl` 24 · `text-4xl` 36 · `text-5xl` 48 (hero).

PDF fonts = curated kit enums (may include Georgia for serif kits) — separate from site UI.

---

## Motion rules

- Prefer **opacity + 4–8px translate** over bouncy spring.
- Duration: 150–250ms UI; PDF generation uses **progress state**, not fake skeleton forever.
- Respect `prefers-reduced-motion: reduce` → no decorative motion.
- No autoplay video; no parallax required for v1.

---

## Hero signature

- Large calm headline (from `03-COPY.md`)
- Subhead one sentence
- Primary CTA: **Try the demo** (scroll or `/demo`)
- Secondary CTA: **View pricing**
- Right or below: **static or lightly animated** monochrome frame showing a PDF page silhouette with a thin accent bar — accent bar may use sample brand color **only inside the mock PDF**, not site buttons.

---

## Components (notes)

| Component | Spec |
|-----------|------|
| Buttons | Primary = solid black bg / white text; Secondary = outline black; no colored CTAs |
| Inputs | 1px `--border`, focus 2px `--fg`; height ~40px |
| Cards | `--bg` + border; radius 8–12px; soft shadow optional (`0 1px 2px rgb(0 0 0 / 6%)`) |
| Nav | Sticky; logo wordmark; links muted; **Sign in** outline; keep sparse |
| Pricing cards | Equal visual weight; Founding badge = text label “Founding · limited”, not neon |
| FAQ | Accordion; chevron; one open at a time optional |
| Demo pane | Split: editor (mono) + preview; Generate button primary |
| Toasts | Bottom; monochrome; danger/success text color only |

---

## PDF template design

- Generous margins (≥ 48px)
- Logo top-left or top-center (max height ~48px)
- H1 / H2 hierarchy clear; body 11–12pt equivalent
- Accent via `accent_style` only (bar under title, left rule, or none)
- Footer: `footer_text` + page numbers
- Tables: simple grid, no zebra required
- Code blocks: light gray bg inside PDF OK

---

## Accessibility

- Contrast: body text ≥ 4.5:1 on white; muted ≥ 4.5:1 where used for essential info
- Focus visible on all interactive elements
- Form labels (not placeholder-only)
- Demo Generate button disabled state announced
- Share/download links have accessible names
- Prefer semantic headings in marketing pages
- Dark band sections: ensure invert contrast

---

## Imagery

- Prefer CSS/illustration line art over stock photos.
- OG image: wordmark + short tagline on white or black; export per `brand/LOGO-BRIEF.md`.
- No fake customer headshots.

---

## Design QA checklist

- [ ] No accent color on primary CTA  
- [ ] Demo PDF shows brand color; chrome does not  
- [ ] Mobile nav usable  
- [ ] Reduced motion respected  
- [ ] Empty/error states use copy from `03-COPY.md`  
