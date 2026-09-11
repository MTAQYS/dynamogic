# AGENTS.md — Rules for AI builders (Dynamogic)

You are building **Dynamogic** for org **MTAQYS** / founder **Mohamed-Taqy Salmi**.  
This file overrides convenience. If a phase prompt conflicts with this file, **this file wins**.

---

## North star

Dynamogic is a **brand layer for AI output**: consistent branded PDFs from demos, app, MCP, and API.  
Competitors exist (MDMagic, Format Magic, Claude native, Canva). **Never claim an empty category.**

---

## Phase order (mandatory)

Build **only** the current phase. Do not implement payments before Phase 4, MCP before Phase 3, etc.

| Phase | Prompt | Outcome |
|-------|--------|---------|
| 1 | `prompts/PHASE-1-LANDING-DEMO.md` | Marketing site + working demo render |
| 2 | `prompts/PHASE-2-AUTH-BRAND-KIT.md` | Auth + brand kit CRUD + apply to renders |
| 3 | `prompts/PHASE-3-API-MCP.md` | HTTP API + one MCP tool |
| 4 | `prompts/PHASE-4-PAYMENTS.md` | Lemon Squeezy + quotas + founding |
| 5 | `prompts/PHASE-5-LAUNCH.md` | Legal, analytics, launch checklist |

**Definition of Done** for each phase is in that phase’s prompt **and** summarized below. Do not mark a phase done until every DoD item is true.

---

## Non-negotiables

### One render path
- All surfaces (demo, app, API, MCP) call the **same** PDF pipeline (HTML → Playwright/Puppeteer on VPS → PDF bytes/URL).
- No second “quick” HTML-to-PDF library for demo only.
- Template/CSS for brand application lives in one module.

### One MCP tool
- Tool name: **`create_branded_pdf`** only (see `content/mcp-tool-description.md`).
- Do not add list/delete/search tools in v1.
- MCP is a thin wrapper over the same API as the HTTP route.

### Stack & vendors
- **Next.js** (App Router) + **TypeScript**
- **Supabase** (Auth + Postgres + Storage as needed)
- **VPS** for headless Chromium (Playwright or Puppeteer — pick one and stick)
- **Brevo** for transactional email — **not Resend**
- **Lemon Squeezy** for payments (preferred)
- Analytics: Plausible or Umami (privacy-friendly)

### Product honesty
- **No fake testimonials**, invented logos, or fabricated metrics.
- **No “first/only/category-defining”** claims. See banned list in `docs/03-COPY.md`.
- Fair-use caps are real and enforced server-side (Free: 3 PDFs/day; Founding: 100 PDFs/mo, max 50 seats).

### Design
- UI is **monochrome minimal**. Color appears only in brand demos / user brand kits.
- Use copy from `docs/03-COPY.md` unless fixing a bug; do not invent hype.

### Security & secrets
- Never commit `.env` or API keys.
- Quotas and plan gates are server-side.
- MCP/API auth via keys or session — no open anonymous unlimited render.

---

## Definition of Done (per phase)

### Phase 1 — Landing + Demo
- [ ] Pages match structure in `docs/03-COPY.md` (nav, hero, demo, how-it-works, MCP teaser, features, pricing, FAQ, footer)
- [ ] Interactive demo produces a real branded PDF via the shared render path
- [ ] Monochrome site chrome; color only in demo brand sample
- [ ] Mobile-usable; basic a11y (contrast, focus, labels)
- [ ] No auth required for demo within free-style rate limit (IP or anonymous token)
- [ ] Deployed preview URL works

### Phase 2 — Auth + Brand Kit
- [ ] Sign up / sign in (Supabase Auth; Google OAuth if configured)
- [ ] Brand kit fields per `docs/01-PRODUCT.md` persisted and editable
- [ ] Authenticated renders use user’s brand kit
- [ ] Share-link behavior for demo PDFs as specified
- [ ] Free tier daily quota enforced

### Phase 3 — API + MCP
- [ ] Documented HTTP API for create PDF (contract in `docs/04-TECH.md`)
- [ ] TypeScript MCP server exposing **only** `create_branded_pdf`
- [ ] Tool description matches `content/mcp-tool-description.md`
- [ ] API keys / auth wired; rate limits enforced
- [ ] Same render path as web

### Phase 4 — Payments
- [ ] Lemon Squeezy products for Pro monthly/yearly + Founding variants
- [ ] Webhooks update plan + founding seat counter (max 50)
- [ ] Quota rules match `docs/05-PRICING.md`
- [ ] Receipt / founding emails via Brevo templates
- [ ] Upgrade CTAs on pricing + soft paywall at quota

### Phase 5 — Launch
- [ ] Privacy + ToS pages covering checklist in `docs/08-LEGAL.md`
- [ ] Analytics + uptime monitoring live
- [ ] Launch assets from `content/social-launch.md` ready
- [ ] Error/empty states from copy doc
- [ ] Founder ops remaining P0/P1 items closed or explicitly deferred

---

## Working style for agents

1. Read the phase prompt + linked docs **before** coding.
2. Prefer small, reviewable commits / PRs.
3. Prefer extending the shared render module over forking paths.
4. If blocked on founder ops (DNS, OAuth consent, Lemon Squeezy), leave a clear `BLOCKED:` note and continue with mocks only where the phase allows.
5. Do not invent legal text beyond outlines; founder ships lawyer-reviewed Privacy/ToS.
6. Do not spend budget or create ad accounts — that’s founder + `docs/07-ADS.md`.

---

## Fair-use & refusals (v1)

Refuse / defer (do not build in v1): multi-page design studio, collaborative whiteboards, native Canva importer, team SSO, white-label portals, email marketing blasts, “AI rewrite” as core product. See `docs/01-PRODUCT.md` refusals.

---

## Done means done

A phase is done only when its DoD checklist is complete and demoable on a preview or production URL. “Works on my machine” without deploy does not count for Phase 1+.
