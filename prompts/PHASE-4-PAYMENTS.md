# PHASE 4 — Payments (Lemon Squeezy)

Read `AGENTS.md`. Phases 1–3 DoD true.

## Goal
Pro + Founding purchases via **Lemon Squeezy**, webhooks update plans, quotas match `docs/05-PRICING.md`, founding **max 50**.

## Read
- `docs/05-PRICING.md` — tiers, LS checklist, seat cap  
- `docs/04-TECH.md` — webhook env  
- `docs/03-COPY.md` — pricing + sold out  
- `content/email-sequences.md` — founding receipt, quota warning  

## Build
1. Checkout buttons for Pro monthly/yearly + Founding year/lifetime (test mode first).  
2. Webhook verification + plan mapping.  
3. Global founding `seats_sold` / sold-out UI.  
4. Enforce Pro vs Founding caps (30/day + 500/mo Pro; 100/mo Founding).  
5. Unlock API/MCP for Pro/Founding.  
6. Brevo emails: founding receipt; quota warning at threshold.  
7. Billing portal link.

## Constraints
- Lemon Squeezy **preferred** — do not switch to Stripe “for speed.”  
- No “unlimited” copy.  
- Fair-use real.

## Definition of Done
- [ ] Test purchase upgrades plan  
- [ ] Cancel/expiry demotes correctly (Pro)  
- [ ] Founding increments seats; blocks at 50  
- [ ] Quotas match pricing doc  
- [ ] Receipt email sends in test  

## Out of scope
Ad pixels, PH assets (Phase 5).
