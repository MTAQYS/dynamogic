# PHASE 2 — Auth + Brand Kit

Read `AGENTS.md`. Phase 1 DoD must already be true.

## Goal
Users can sign up/in, save **brand kits**, and generate PDFs with their kit; Free **3 PDFs/day** enforced.

## Read
- `docs/01-PRODUCT.md` — brand kit fields, share links  
- `docs/04-TECH.md` — `profiles`, `brand_kits`, `renders`, `usage_daily`  
- `docs/03-COPY.md` — empty/error states  
- `docs/09-FOUNDER-OPS.md` — Supabase + Google OAuth (founder may still be configuring; support email magic link first)

## Build
1. Supabase Auth (email; Google if credentials present).  
2. App shell: `/app` kits list, editor, generate, history.  
3. CRUD brand kits (fields per product doc); logo upload to Storage.  
4. Wire demo/app generate to user’s default kit when logged in.  
5. Share links with 7-day expiry for Free.  
6. `usage_daily` enforcement + quota copy.  
7. Brevo **welcome** email on signup if `BREVO_API_KEY` present (template from `content/email-sequences.md`).

## Constraints
- Still **one** render path.  
- No payments.  
- No MCP yet.  
- No fake data seed testimonials.

## Definition of Done
- [ ] Sign up / sign in / sign out  
- [ ] Create/edit/delete brand kit  
- [ ] Authenticated PDF uses kit  
- [ ] Free daily quota enforced server-side  
- [ ] Share link create + expiry behavior  
- [ ] Empty states match copy doc  

## Blocked?
If Google OAuth not ready: ship email auth; leave `BLOCKED: Google OAuth` note.
