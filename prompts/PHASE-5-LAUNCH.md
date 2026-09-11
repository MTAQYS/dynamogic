# PHASE 5 — Launch

Read `AGENTS.md`. Phases 1–4 DoD true.

## Goal
Production-ready launch: legal pages, analytics events, error polish, health checks, launch assets wired, founder checklist residual.

## Read
- `docs/08-LEGAL.md` — Privacy/ToS requirements (implement pages covering checklist; not inventing fake law firm claims)  
- `docs/06-MARKETING.md` — launch playbooks  
- `docs/07-ADS.md` — events only (do not spend)  
- `content/social-launch.md` — ensure URLs live  
- `docs/09-FOUNDER-OPS.md` — remaining boxes  

## Build
1. `/privacy` and `/terms` pages covering checklist sections.  
2. Plausible/Umami + events: `demo_start`, `pdf_generated`, `signup`, `checkout_started`.  
3. `/api/health`; document worker health.  
4. Error/empty states audit vs `03-COPY.md`.  
5. OG image + favicon from brand exports.  
6. MCP public docs final; npm publish prep.  
7. Soft launch banner / founding scarcity from live seat count.  
8. Cookie/analytics note in Privacy if pixels later.

## Constraints
- No fake testimonials.  
- No saturated claims.  
- Do not create ad campaigns (founder + 07-ADS).  
- Do not bypass fair-use for launch week.

## Definition of Done
- [ ] Privacy + Terms linked in footer  
- [ ] Analytics events firing in production  
- [ ] Uptime monitors documented for founder  
- [ ] Social drafts have production URLs  
- [ ] Phase 1–4 still green on prod  
- [ ] Launch readme blurb for founder  

## After this phase
Founder executes marketing calendar + optional ads; AI may help copy tweaks only on request.
