# Logo / Wordmark Brief — Dynamogic

**For:** DIY founder or freelance designer  
**Brand:** Dynamogic · **Org:** MTAQYS  
**Locked mark:** **M2h** — horizontal peregrine falcon silhouette + Dynamogic wordmark  
**Product UI:** Soft charcoal only (`#1C1C1C`) — logo must work **charcoal on light** and **light on charcoal**.

---

## Locked assets (repo)

| File | Role |
|------|------|
| `public/logo-mark.svg` | Falcon head/body silhouette only |
| `public/logo-lockup.svg` | Horizontal mark + “Dynamogic” wordmark |
| `public/brand/logo-m2h.png` | Source M2h reference PNG |
| `public/favicon.svg` / `icon-*.png` | App / favicon crops of the mark |

React usage: `components/Logo.tsx` (`variant="lockup" | "mark"`, `size`, `invert`).

---

## Concept

- **M2h lockup.** Streamlined peregrine falcon in flight (facing right) + geometric sans wordmark.
- Feel: precision, speed, calm — print-adjacent brand layer, not playful sticker or neon SaaS gradient.
- Neck gap + swept wing notches are part of the mark; keep them.
- Avoid: robot mascots, sparkles, purple AI gradients, Canva-like rainbow.

---

## Constraints

| Must | Must not |
|------|----------|
| Legible at 16px height | Hairline script fonts |
| Works in single color (charcoal or inverse) | Require gradients or multicolor to read |
| Clear in favicon crop | Tiny nested details beyond the neck gap |
| Matches Inter-like geometric sans personality | Comic / rounded bubble letters |
| Enough padding in lockups | Stretching or fake small-caps |

**Primary lockup:** mark + `Dynamogic` wordmark horizontal (M2h)  
**Secondary:** wordmark alone (rare)  
**Tertiary:** mark alone (app icon / favicon)

---

## Typography

- Geometric sans close to **Inter** (site UI font).
- Weight: bold / 700 for wordmark; tracking slightly tight (−2% to −4%).
- Capital **D** + lowercase rest — stay consistent with site.

---

## Color

- Default exports: **#1C1C1C** on transparent / light; **#F7F6F3** on charcoal.
- No forced brand purple. User brand colors appear in **PDFs**, not in the Dynamogic logo.

---

## Do

- Test logo on boot splash, menu bar, about app, dock About icon, favicon tab.
- Keep clearance ≈ cap-height around mark.
- Soft charcoal only in product chrome.

## Don’t

- Don’t place color bars behind the wordmark on the marketing site.
- Don’t animate the logo endlessly.
- Don’t replace M2h with alternate concepts without an explicit brand change.
