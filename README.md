# Dynamogic — Brand Layer for AI Output

**Org:** MTAQYS · **Founder:** Mohamed-Taqy Salmi  
**Product:** Dynamogic — turn AI text into branded PDFs (web demo, app, MCP, API)  
**Stack:** Next.js (App Router) · TypeScript · Tailwind · Playwright (shared PDF render path)

This repository contains founder handoff docs **and** the Phase 1 marketing site + interactive demo.

---

## Phase 1 (current)

Marketing site + demo that produces a **real branded PDF** with no signup.

- Monochrome UI chrome; brand color only inside the PDF preview
- Shared module: `lib/render` (`createRenderJob`) — same interface for later API/MCP
- `POST /api/demo-render` with in-memory ~3/day/IP rate limit (Redis later)
- Free PDF footer credit: **Made with Dynamogic**
- No auth, Supabase, Lemon Squeezy, Brevo, or MCP package in this phase

### Run locally

```bash
npm install
# Chromium for Playwright (postinstall tries this; run manually if needed)
npx playwright install chromium

npm run dev
# open http://localhost:3000
```

Generate a PDF from the Demo section. PDFs are rendered on the Node server via Playwright.

**Windows notes:** Node 20+ and `npx playwright install chromium` are required. If Chromium download fails (corporate proxy), set `PLAYWRIGHT_BROWSERS_PATH` or install system Chrome and point Playwright at it.

**Vercel / production notes:** Playwright + Chromium are heavy for serverless. Phase 1 local `npm run dev` must work. For Vercel, either:

1. Move Chromium to a VPS worker (`RENDER_WORKER_URL` / `RENDER_WORKER_SECRET` per `docs/04-TECH.md`), or
2. Use a Playwright-capable host / container.

Keep calling `createRenderJob` from the API route so the module interface stays shared.

### Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local Next.js + demo PDF |
| `npm run build` | Production build |
| `npm start` | Serve production build |
| `npm run lint` | ESLint |

### Health

`GET /api/health` → `{ ok: true, version, phase }`

---

## Handoff docs (kept)

| Path | Purpose |
|------|---------|
| [AGENTS.md](AGENTS.md) | Non-negotiable rules for AI builders |
| [docs/](docs/) | Product → founder ops (01–09) |
| [brand/](brand/) | Logo / wordmark brief |
| [content/](content/) | Email, social, MCP tool description |
| [prompts/](prompts/) | PHASE-1…5 prompts |
| [tasks/](tasks/) | Atomic tasks + issues.jsonl |

**Reading order for builders:** `AGENTS.md` → `prompts/PHASE-1-LANDING-DEMO.md` → `docs/01`–`04` (especially `03-COPY.md`).

---

## Design stance

- **Monochrome minimal** UI; color only inside brand demos / user brand kits.
- Primary CTAs are solid black — never brand purple/blue on buttons.
- Copy from `docs/03-COPY.md`. No fake testimonials. No empty-category claims.

---

## Later phases

| Phase | Prompt | Outcome |
|-------|--------|---------|
| 2 | `prompts/PHASE-2-AUTH-BRAND-KIT.md` | Auth + brand kit CRUD |
| 3 | `prompts/PHASE-3-API-MCP.md` | HTTP API + `create_branded_pdf` |
| 4 | `prompts/PHASE-4-PAYMENTS.md` | Lemon Squeezy + quotas |
| 5 | `prompts/PHASE-5-LAUNCH.md` | Legal, analytics, launch |

Competitors exist (MDMagic, Format Magic, Claude native exports, Canva). Position as the **brand layer**, not a category exclusive.

---

## GitHub Pages preview (UI only)

Static marketing export for public UI review (demo uses a sample PDF — no Playwright on Pages):

```bash
npm run build:pages
# outputs ./out with basePath /dynamogic
```

Workflows:

- `.github/workflows/pages.yml` — official Actions Pages deploy
- `.github/workflows/gh-pages-branch.yml` — pushes `out/` to `gh-pages` via peaceiris

**Expected URL:** https://mtaqys.github.io/dynamogic/

**Private repo note:** GitHub Pages for private repositories requires GitHub Pro / Team / Enterprise (or a public repo). Founder: Settings → Pages → Source = GitHub Actions (or `gh-pages` branch). If Pages is blocked on private, either enable org billing or temporarily make the repo public for the preview.

Local static preview:

```bash
npm run build:pages
npx serve out
# open http://localhost:3000/dynamogic/
```
