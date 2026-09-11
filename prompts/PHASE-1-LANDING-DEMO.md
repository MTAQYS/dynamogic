# PHASE 1 — Landing + Demo

You are building **Dynamogic** for MTAQYS / Mohamed-Taqy Salmi.  
Read `/workspace/dynamogic/AGENTS.md` first. This phase only.

## Goal
Ship a marketing site + interactive demo that produces a **real PDF** via the **one shared render path**.

## Read before coding
- `docs/01-PRODUCT.md` — surfaces, brand sample fields  
- `docs/02-DESIGN.md` — monochrome UI; color only in PDF preview  
- `docs/03-COPY.md` — paste-ready copy (mandatory)  
- `docs/04-TECH.md` — render topology (VPS worker may be stubbed with local Playwright in Phase 1 if VPS not ready — but **same module interface**)

## Build
1. Next.js App Router + TypeScript site sections: nav, hero, demo, how-it-works, MCP teaser, features, pricing, FAQ, footer, build-in-public strip — **copy from 03-COPY**.  
2. Demo: markdown editor + sample brand kit controls + Generate → PDF download + share link placeholder.  
3. Implement `createRenderJob` module used only by demo for now (HTML template + Playwright/Puppeteer).  
4. Anonymous rate limit approximating Free demo (IP-based OK).  
5. Monochrome chrome; sample brand color **inside PDF only**.  
6. Basic responsive + a11y.  
7. Deploy preview (Vercel).

## Constraints
- No auth yet (beyond optional later).  
- No Lemon Squeezy.  
- No MCP server package yet (teaser copy only).  
- No fake testimonials.  
- No Resend — if any email, skip until Brevo in later phases.  
- Do not claim empty category.

## Definition of Done
- [ ] All sections with final copy  
- [ ] Real PDF from demo via shared render path  
- [ ] Rate limit message works  
- [ ] Mobile usable  
- [ ] Preview URL shared with founder  
- [ ] No color CTAs; design QA from `02-DESIGN.md`

## Out of scope
Auth, brand kit CRUD, API keys, payments, legal pages (stubs OK as `#` only if needed — prefer omit Privacy/Terms until Phase 5 text exists).
