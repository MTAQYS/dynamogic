# PHASE 3 — API + MCP

Read `AGENTS.md`. Phases 1–2 DoD true.

## Goal
HTTP API + TypeScript MCP server with **exactly one** tool: `create_branded_pdf`.

## Read
- `docs/04-TECH.md` — API contract, security  
- `content/mcp-tool-description.md` — **exact** name, description, schema  
- `docs/01-PRODUCT.md` — refusals (no extra tools)  
- `docs/05-PRICING.md` — Free has no API; Pro/Founding will later — for now allow API keys for authenticated users with feature flag OR restrict to non-free (prefer: keys creatable but Free calls return upgrade error)

## Build
1. `POST /api/v1/pdfs` (+ GET by id) per contract; session or API key.  
2. API key create/revoke UI (show once; store hash).  
3. Rate/quota same as web.  
4. MCP package (stdio): tool from `mcp-tool-description.md`; calls API with `DYNAMOGIC_API_KEY`.  
5. Docs page `/mcp` with install snippet.  
6. Sanitize markdown; enforce char limits.

## Constraints
- **No** second MCP tool.  
- Same render worker as web.  
- Brevo not required except existing.  
- Payments still Phase 4 (return clear quota/plan errors).

## Definition of Done
- [ ] API creates PDF with brand_kit_id or inline brand  
- [ ] Unauthorized / quota errors correct  
- [ ] MCP tool matches description/schema exactly  
- [ ] End-to-end: MCP → PDF URL  
- [ ] README for npm package drafted  

## Out of scope
Lemon Squeezy, founding seats, ads.
