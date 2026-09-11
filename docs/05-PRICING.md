# 05 — Pricing

Budget context: **$250** one-time setup, then **≤ $150/mo**. Pricing must stay simple to explain and enforce.

---

## Tiers

| Tier | Price | PDF caps | Brand kits | Share links | API / MCP | Notes |
|------|-------|----------|------------|-------------|-----------|-------|
| **Free** | $0 | **3 PDFs/day** | 1 | Expire **7 days** | No (or read-only docs only) | Demo + account |
| **Pro** | **$12/mo** or **$99/yr** | **30 PDFs/day** · soft monthly fair-use **500/mo** | 10 | Permanent until delete | Yes | Cancel anytime |
| **Founding** | **$79 / 12 months** OR **$149 lifetime** | **100 PDFs/mo** | 10 (same as Pro) | Permanent | Yes | **Max 50 seats**; then sold out |

Char limits: Free 8k · Pro/Founding 40k per render (`01-PRODUCT.md`).

---

## Rules

1. Quotas enforced **server-side** (daily and monthly counters).  
2. Founding seat counter global; when `seats_sold >= 50`, hide checkout / return sold-out.  
3. Founding **year**: access for 12 months from purchase; then convert offer to Pro (email via Brevo).  
4. Founding **lifetime**: plan `founding` until product EOL; still subject to **100 PDFs/mo** fair-use.  
5. No “unlimited” wording anywhere.  
6. Soft paywall copy from `03-COPY.md`.  
7. Taxes/VAT: Lemon Squeezy handles at checkout.  
8. Refunds: follow Lemon Squeezy + clear ToS policy (founder decides; state in Terms).  

---

## Fair-use caps (summary)

| Plan | Daily | Monthly |
|------|-------|---------|
| Free | 3 | n/a (daily only) |
| Pro | 30 | 500 fair-use |
| Founding | derived from monthly | **100** hard |

Abuse (scripts hammering Free): IP + account limits; temporary blocks OK.

---

## Lemon Squeezy product setup checklist

- [ ] Create store (https://lemonsqueezy.com/)  
- [ ] Store currency default (USD recommended)  
- [ ] Product: **Dynamogic Pro**  
  - [ ] Variant: Monthly subscription **$12**  
  - [ ] Variant: Yearly subscription **$99**  
- [ ] Product: **Dynamogic Founding**  
  - [ ] Variant: Founding 12 months **$79** (subscription or one-time with manual expiry — prefer LS subscription 12-month or single payment + webhook flag `founding_variant=year`)  
  - [ ] Variant: Founding lifetime **$149** (one-time)  
- [ ] Enable **Customer portal**  
- [ ] Webhook endpoint → `https://<app>/api/webhooks/lemon-squeezy`  
  - Events: `subscription_created`, `subscription_updated`, `subscription_cancelled`, `subscription_expired`, `order_created`, `order_refunded`  
- [ ] Copy variant IDs into env (`LEMONSQUEEZY_VARIANT_*`)  
- [ ] Test mode checkout end-to-end before live  
- [ ] Thank-you URL → `/app/billing?success=1`  
- [ ] Confirm founding webhook increments `seats_sold` only on paid success  

---

## Mapping LS → app plan

| Event | Action |
|-------|--------|
| Pro monthly/yearly active | `plan=pro` |
| Pro cancelled/expired | `plan=free` at period end |
| Founding year paid | `plan=founding`, `founding_variant=year`, `seats_sold++` |
| Founding lifetime paid | `plan=founding`, `founding_variant=lifetime`, `seats_sold++` |
| Refund founding | decrement seats if policy says so; demote plan |

---

## Display rules

- Show founding scarcity: “X of 50 founding seats claimed” (real number from DB).  
- If sold out: show Pro only + sold-out message.  
- Prefer annual Pro savings callout: “$99/yr (save vs monthly)” without fake urgency timers.
