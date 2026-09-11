# 01 — Product

**Product:** Dynamogic — Brand Layer for AI Output  
**Org:** MTAQYS · **Founder:** Mohamed-Taqy Salmi  

---

## One-liner

Dynamogic applies a reusable **brand kit** to AI-generated content and returns a clean, shareable **PDF** — from a web demo, logged-in app, HTTP API, or a single MCP tool (`create_branded_pdf`).

---

## Problem

AI tools produce great text; they rarely produce **on-brand** deliverables. Founders, consultants, and indie hackers paste into Google Docs or Canva, fight fonts/margins, and lose consistency. Agents that can write cannot reliably ship a PDF that matches the user’s brand without custom glue.

---

## Users & JTBD

### Primary personas

| Persona | Context | Job to be done |
|---------|---------|----------------|
| **Indie founder / consultant** | Ships proposals, one-pagers, client briefs from ChatGPT/Claude | “When I have AI draft ready, help me turn it into a PDF that looks like *my* brand in under a minute.” |
| **Content / ops person** | Recurring reports, summaries, SOPs | “When I generate recurring docs, apply the same logo, colors, and footer every time without redesigning.” |
| **Agent builder** | Claude/Cursor agents that need artifacts | “When my agent finishes research/writing, call one tool and get a branded PDF URL/bytes.” |

### JTBD statement

> When I (or my agent) have structured or markdown content, I want to apply my brand kit and get a PDF I can send or archive, so I look consistent without opening a design tool.

---

## Surfaces (v1)

| Surface | Who | Auth | Notes |
|---------|-----|------|-------|
| **Marketing + Demo** | Anyone | Anonymous + rate limit | Paste/sample content → preview → download PDF; sample brand kit |
| **App** | Signed-in users | Supabase Auth | Brand kit CRUD; history; quotas; upgrade |
| **MCP** | Agents | API key | One tool: `create_branded_pdf` |
| **HTTP API** | Integrations | API key | Same contract as MCP body |

All surfaces share **one render path** (see `04-TECH.md`).

---

## Brand kit fields (v1)

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `name` | string | yes | Display name of kit |
| `logo_url` | url / storage ref | no | PNG/SVG; height-constrained in template |
| `primary_color` | hex | yes | Used in accents (headers, rules); demo may show color |
| `secondary_color` | hex | no | Optional accent |
| `font_heading` | enum | yes | Curated list (e.g. Inter, Georgia, system stacks) |
| `font_body` | enum | yes | Same curated list |
| `footer_text` | string | no | Company line, confidentiality |
| `website` | string | no | Shown in header/footer |
| `accent_style` | enum | yes | `minimal` \| `bar` \| `left-rule` |

**Out of scope v1:** full custom CSS, multi-template marketplace, brand voice LLM rewriting.

---

## Core user flows

1. **Demo:** Land → paste markdown or pick sample → optional tweak sample brand → Generate → download / open share link.  
2. **App:** Sign in → create/edit brand kit → paste or upload content → Generate → library of past PDFs.  
3. **Agent:** Configure MCP with API key → call `create_branded_pdf` with `content` + `brand_kit_id` or inline brand → receive `pdf_url` / base64.  
4. **Upgrade:** Hit Free cap → soft wall → Lemon Squeezy checkout → webhook unlocks Pro/Founding.

---

## Share links

- Each successful render can create a **time-limited or permanent** share URL (`/s/{id}`) serving the PDF or a simple viewer page.
- Free: share links expire in **7 days**; Pro/Founding: permanent until delete.
- Share pages are noindex; do not expose private brand kit secrets beyond what’s in the PDF.

---

## Content input (v1)

- Markdown (headings, lists, bold/italic, code blocks, simple tables)
- Plain text
- Max length: Free **8k chars**; Pro/Founding **40k chars** (enforce server-side)

---

## Refusals for v1 (do not build)

- Multi-page visual page builder / drag-drop canvas  
- Collaborative editing / comments  
- Canva import/export, Figma plugins  
- Team workspaces, SSO, SCIM  
- White-label domains  
- Native “AI rewrite / improve copy” as a product pillar (users bring content from their LLM)  
- Email campaigns, CRM, invoicing  
- Video/PPT export  
- Claiming category exclusivity vs MDMagic / Format Magic / Claude native / Canva  

---

## Success metrics

| Metric | Early target | Notes |
|--------|--------------|-------|
| Demo → PDF success rate | ≥ 95% | Exclude user cancels |
| Time-to-first-PDF (demo) | < 60s median | From first paste |
| Free → Pro/Founding conversion | Track weekly | Soft wall + founding scarcity |
| Founding seats sold | Cap **50** | Stop sales at 50 |
| MCP calls / week | Leading indicator | Agent adoption |
| Support tickets / active user | Low | Template clarity |
| Paid churn (30d) | Monitor | After Pro live |

**North-star (qualitative):** “I sent a client a PDF that looked like us without opening Canva.”

---

## Positioning (fair)

- **Vs Canva:** Faster for text-first AI output; not a design suite.  
- **Vs Claude native export:** Brand kits + API/MCP + consistent templates.  
- **Vs MDMagic / Format Magic:** Respect them; differentiate on brand kits, MCP, share links, fair-use clarity — not “first ever PDF from AI.”

---

## Pricing pointer

See `05-PRICING.md`: Free 3 PDFs/day; Pro $12/mo or $99/yr; Founding $79/12mo or $149 lifetime (100 PDFs/mo, max 50 seats).
