# Dynamogic — Brand Layer for AI Output

**Org:** MTAQYS · **Founder:** Mohamed-Taqy Salmi  
**Product:** Dynamogic — turn AI text into branded PDFs (web demo, app, MCP, API)  
**Budget:** $250 one-time setup, then ≤ $150/mo  
**Stack:** Next.js · Supabase · VPS (Playwright/Puppeteer) · TypeScript MCP (`create_branded_pdf`) · Brevo · Lemon Squeezy  

This repository is a **founder handoff pack**: product, design, copy, tech, pricing, marketing, ads, legal checklists, ops setup, brand brief, email/social drafts, phase prompts, and atomic tasks. It is not the application source code. Hand it to Cursor or Claude Code and build phase-by-phase.

---

## What this repo is

| Path | Purpose |
|------|---------|
| `AGENTS.md` | Non-negotiable rules for AI builders |
| `docs/` | Product through founder ops (01–09) |
| `brand/` | Logo / wordmark brief |
| `content/` | Email sequences, social launch drafts, MCP tool description |
| `prompts/` | Self-contained PHASE-1…5 prompts for Cursor/Claude |
| `tasks/` | Atomic task master list + `issues.jsonl` for GitHub |

**Competitors exist** (MDMagic, Format Magic, Claude native exports, Canva). Do **not** claim an empty category. Position as the **brand layer**: consistent kits, share links, MCP for agents, fair-use caps.

---

## How the founder uses this

1. Read `AGENTS.md` once; keep it open while building.
2. Complete **OPS** checkboxes in `docs/09-FOUNDER-OPS.md` (accounts, DNS, Brevo, Lemon Squeezy, etc.).
3. Run phases in order using `prompts/PHASE-N-*.md` — never skip ahead of DoD.
4. Track work in `tasks/ATOMIC-TASKS.md`; import priority issues from `tasks/issues.jsonl`.
5. Ship landing + demo first (Phase 1), then auth/brand kit, API/MCP, payments, launch.

---

## How to hand to Cursor / Claude

```text
You are building Dynamogic. Read AGENTS.md and the phase prompt I paste.
Only implement what that phase allows. One render path. One MCP tool: create_branded_pdf.
Email = Brevo. Payments = Lemon Squeezy. No fake testimonials. No empty-category claims.
Definition of Done is in the phase prompt and AGENTS.md.
```

Then paste **one** of:

- `prompts/PHASE-1-LANDING-DEMO.md`
- `prompts/PHASE-2-AUTH-BRAND-KIT.md`
- `prompts/PHASE-3-API-MCP.md`
- `prompts/PHASE-4-PAYMENTS.md`
- `prompts/PHASE-5-LAUNCH.md`

Point the agent at `docs/01`–`04` and `docs/03-COPY.md` for paste-ready UI strings.

---

## Link map (docs)

| Doc | Contents |
|-----|----------|
| [01-PRODUCT](docs/01-PRODUCT.md) | Users, JTBD, surfaces, brand kit, metrics, v1 refusals |
| [02-DESIGN](docs/02-DESIGN.md) | Palette, type, motion, hero, a11y |
| [03-COPY](docs/03-COPY.md) | Final UI/marketing copy + banned claims |
| [04-TECH](docs/04-TECH.md) | Architecture, data model, API, MCP, env, deploy |
| [05-PRICING](docs/05-PRICING.md) | Tiers, fair-use, Lemon Squeezy checklist |
| [06-MARKETING](docs/06-MARKETING.md) | Channels, launch playbooks, 30-day calendar |
| [07-ADS](docs/07-ADS.md) | $250 / $150 budget, creatives, kill rules |
| [08-LEGAL](docs/08-LEGAL.md) | Privacy/ToS checklist (not lawyer text) |
| [09-FOUNDER-OPS](docs/09-FOUNDER-OPS.md) | Every human setup checkbox + signup URLs |

Supporting: [LOGO-BRIEF](brand/LOGO-BRIEF.md) · [email-sequences](content/email-sequences.md) · [social-launch](content/social-launch.md) · [mcp-tool-description](content/mcp-tool-description.md)

---

## Design & brand stance

- **Monochrome minimal** UI; color only inside brand demos / user brand kits.
- Wordmark must work black-on-white and white-on-black.
- Site copy is calm, specific, and honest about competitors.

---

## Pricing snapshot

| Tier | Price | Notes |
|------|-------|-------|
| Free | $0 | 3 PDFs/day |
| Pro | $12/mo or $99/yr | Higher caps (see 05-PRICING) |
| Founding | $79 / 12 months **or** $149 lifetime | Cap 100 PDFs/mo; **max 50** founding seats |

Payments: **Lemon Squeezy** preferred. Email: **Brevo** (not Resend).

---

## Phases (order is mandatory)

1. Landing + interactive demo (one render path)  
2. Auth + Brand Kit  
3. API + MCP (`create_branded_pdf` only)  
4. Payments (Lemon Squeezy) + quotas  
5. Launch polish, legal pages, analytics, launch assets  

Rules, DoD, and constraints: **`AGENTS.md`**.

---

## Repo hygiene

- No secrets in git. Env templates only in `docs/04-TECH.md`.
- Application code lives in a separate app repo (or sibling folder); this pack stays documentation + prompts + tasks.
- When creating GitHub issues: use `tasks/issues.jsonl` as seed.

---

*MTAQYS · Dynamogic handoff · Keep phases ordered · One tool · One render path.*
