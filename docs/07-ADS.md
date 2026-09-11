# 07 — Ads

**Budget:** **$250 one-time** learning/setup, then **≤ $150/mo**. Organic first; ads amplify a working demo→signup funnel.

---

## Split

### One-time $250
| Use | Amount | Notes |
|-----|--------|-------|
| Creative production (DIY tools / freelance micro) | $50–80 | Screen recordings, stills |
| Test media (Meta or X) | $120–150 | 7–10 day learning |
| Contingency / pixel misconfig buffer | $20–50 | |

### Monthly ≤ $150
| Channel | Suggested | Role |
|---------|-----------|------|
| Meta (FB/IG) or X Ads | $100–120 | Prospecting + retarget |
| Retargeting pool | $30–50 | Site visitors → demo → signup |
| Holdback | remainder | Kill tests without overspend |

Start with **one** primary paid channel. Do not split $150 across four networks.

---

## Channels (priority)

1. **X Ads** — good for builder audience / MCP angle  
2. **Meta Ads** — broader consultant/founder interest; strong retarget  
3. Skip Google Ads initially unless search intent validated (often burns small budgets)

---

## Creative formula

**Hook (first 3s / first line):** “AI wrote it. Your brand’s missing.”  
**Body:** Show paste → branded PDF (color only in PDF frame).  
**Proof:** Free 3/day · MCP for agents · founding limited (real).  
**CTA:** Try the demo  

Variants to test (3–5):
- A: Founder face cam + screen  
- B: Silent UI capture + captions  
- C: Agent/MCP code snippet → PDF  
- D: Fair comparison line (“Not a Canva replacement — a brand layer”)  
- E: Founding scarcity (only if seats remain)

Monochrome ad frames; brand color inside PDF mock.

---

## Test protocol

1. Confirm analytics + conversion events live.  
2. Launch **2–3 creatives** × **1–2 audiences**; equal budget.  
3. Run **≥ 3–4 days** or **$20–30** per ad set before judging (whichever first with ≥15 clicks).  
4. Primary optimization: **demo generate** or **sign up** — not vanity likes.  
5. Winner = lowest cost per signup with ≥1 PDF generated in session when possible.  
6. Iterate copy weekly; don’t relaunch identical losers.

---

## Kill rules

Kill an ad set if **any**:
- CTR < 0.5% after $25 spend (feed) with weak relevance  
- CPC > $2.50 (X/Meta — adjust to niche reality) **and** no signups after $40  
- Bounce to exit without demo interaction > 80% after 50 landing sessions  
- Frequency > 4 with rising CPC  
- Creative uses banned claims (`03-COPY.md`) — kill immediately  

Pause all paid if landing demo is broken (uptime or generate errors).

---

## Conversion events to track

| Event | Where | Why |
|-------|-------|-----|
| `landing_view` | Plausible/Umami | Baseline |
| `demo_start` | Custom event | Intent |
| `pdf_generated` | Custom event | Core value |
| `signup` | Custom event | Account |
| `checkout_started` | LS / app | Funnel |
| `purchase_pro` | Webhook + analytics | Revenue |
| `purchase_founding` | Webhook + analytics | Scarcity SKU |
| `mcp_connected` | API key created | Agent motion |

UTM discipline: `utm_source` · `utm_medium=paid` · `utm_campaign` · `utm_content` (creative id).

---

## Landing hygiene for ads

- Ad → landing with **same promise** (demo, not long essay)  
- Fast LCP; Generate above the fold on mobile  
- No fake testimonials on LP  

---

## Monthly review questions

1. Cost per `pdf_generated`?  
2. Cost per `signup`?  
3. Paid users attributed?  
4. Which creative angle won?  
5. Reallocate or pause to stay ≤ $150?
