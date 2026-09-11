# 03 — Copy (FINAL ready-to-paste)

Use these strings in the UI unless fixing a factual error. Tone: calm, specific, honest. Monochrome product; no hype adjectives.

---

## Saturated claims — NEVER use

- “The first / only brand layer for AI”
- “Category-defining” / “nothing else like it”
- “Replace Canva” / “Canva killer”
- “Better than Claude’s native export” (as a blanket claim)
- Fake metrics (“10,000 teams”, “loved by Fortune 500”)
- Fake testimonials or invented customer names
- “Unlimited PDFs” (caps exist)
- Guarantees of legal/compliance outcomes
- “AI-powered design genius” / “magical”

OK: “Brand kits for AI-generated docs”, “PDF via demo, API, or MCP”, “Built for agents and humans”, naming competitors fairly.

---

## Navbar

- Logo / wordmark: **Dynamogic**
- Links: `Demo` · `How it works` · `MCP` · `Pricing` · `FAQ`
- CTA: `Sign in` (secondary) · `Try demo` (primary on mobile menu)

---

## Hero

**Eyebrow:** Brand layer for AI output  

**Headline:** Turn AI drafts into branded PDFs — without opening a design tool.  

**Subhead:** Paste content from ChatGPT, Claude, or your agent. Apply your brand kit. Download or share a clean PDF. One render path for web, API, and MCP.  

**Primary CTA:** Try the demo  
**Secondary CTA:** See pricing  

**Micro-trust line:** Free: 3 PDFs/day. No credit card for the demo.  

---

## Demo section

**Title:** Try it on a sample (or your own paste)  

**Helper:** Markdown supported. Color appears in the PDF preview from the sample brand kit — the site stays monochrome on purpose.  

**Editor label:** Content  
**Brand label:** Sample brand kit  
**Button:** Generate PDF  
**Busy:** Generating…  
**Success:** PDF ready — Download · Copy share link  
**Rate limit:** You’ve hit today’s free demo limit. Sign in or come back tomorrow.  

**Sample content snippet (seed):**

```markdown
# Q3 Product Update
## Highlights
- Shipped brand kits for AI-generated PDFs
- MCP tool for agents: create_branded_pdf
- Fair-use free tier: 3 PDFs/day

## Next
Client pilots and founding seats (limited).
```

---

## How it works

**Title:** Three steps. One pipeline.  

1. **Bring content** — Paste markdown from your LLM or agent.  
2. **Apply brand kit** — Logo, colors, fonts, footer — saved once.  
3. **Get a PDF** — Download or share. Same engine for demo, app, API, and MCP.  

**Footnote:** Competitors like Canva or native chat exports are great at other jobs. Dynamogic focuses on repeatable brand application for text-first AI output.

---

## MCP section

**Title:** One MCP tool for agents  

**Body:** Point Claude, Cursor, or any MCP client at Dynamogic. Call `create_branded_pdf` with your content and brand kit. Get a PDF URL back. No second tool surface in v1 — keep agent UX simple.  

**Code label:** Tool name  
**Code:** `create_branded_pdf`  

**CTA:** Read the MCP spec → (links to docs / `/mcp`)  

---

## Features

| Title | Body |
|-------|------|
| Brand kits | Logo, colors, fonts, footer — reused on every render. |
| Shared render path | Demo, app, API, and MCP hit the same PDF pipeline. |
| Share links | Send a link; Free links expire in 7 days; paid can keep permanent. |
| Fair-use free tier | 3 PDFs/day to try for real — not a fake unlimited trial. |
| Agent-ready | TypeScript MCP with a single, clear tool. |
| Calm UI | Monochrome product chrome; your brand color lives in the PDF. |

---

## Pricing

**Title:** Simple pricing  

**Intro:** Start free. Upgrade when the brand layer becomes part of your workflow. Founding seats are capped at 50.

### Free
- **Price:** $0  
- **Line:** 3 PDFs per day  
- 1 brand kit · Share links expire in 7 days · Demo + account  

### Pro
- **Price:** $12/mo or $99/yr  
- **Line:** Higher daily/monthly caps for regular shipping  
- Multiple brand kits · Permanent share links · API + MCP access  

### Founding
- **Price:** $79 for 12 months **or** $149 lifetime  
- **Line:** Early supporter pricing · **100 PDFs/mo** · Max **50** founding seats  
- Everything in Pro during the founding window · Badge in account (optional, not fake social proof on marketing)  

**CTA Free:** Start free  
**CTA Pro:** Upgrade to Pro  
**CTA Founding:** Claim founding (while available)  

**Note under cards:** Payments via Lemon Squeezy. Taxes/VAT shown at checkout.

---

## FAQ (6+)

**Q1. Is Dynamogic a Canva replacement?**  
No. Canva is a full design suite. Dynamogic applies a brand kit to AI text and outputs PDFs quickly — especially for agents via MCP.

**Q2. How is this different from Claude’s or ChatGPT’s export?**  
Native exports are convenient. Dynamogic adds reusable brand kits, share links, API access, and one MCP tool so agents can produce on-brand PDFs without you babysitting layout.

**Q3. What’s the free limit?**  
3 PDFs per day on Free. Caps are enforced server-side. Pro and Founding raise limits (see pricing).

**Q4. What is founding, and why only 50?**  
Founding is early pricing ($79/12 months or $149 lifetime) with a 100 PDFs/mo cap. We cap at 50 seats to keep support and infra predictable at our budget.

**Q5. Do you train on my content?**  
Product docs should state current practice in Privacy Policy. Default intent: content is used to render your PDFs and operate the service — not to sell training data. Link Privacy Policy.

**Q6. Which email and payment providers?**  
Transactional email: Brevo. Payments: Lemon Squeezy.

**Q7. Can my agent use this?**  
Yes. Connect MCP with an API key and call `create_branded_pdf`. See the MCP section / docs.

**Q8. What file formats do you support?**  
v1 focuses on PDF output from markdown/plain text input. Other formats are not promised in v1.

---

## Footer

- **Product:** Demo · Pricing · MCP · FAQ  
- **Company:** Privacy · Terms · Contact (`support@` domain TBD)  
- **Social:** X · LinkedIn (handles TBD in founder ops)  
- **Line:** © {year} MTAQYS · Dynamogic  

---

## Build-in-public strip

**Text:** Building Dynamogic in public — brand kits, one MCP tool, fair-use free tier. Follow along on X/LinkedIn. Founding seats limited to 50.  

**CTA:** Follow updates  

---

## Error / empty states

| State | Copy |
|-------|------|
| Empty brand kits | No brand kits yet. Create one to apply logo and colors to your PDFs. |
| Empty PDF history | No PDFs yet. Generate your first from the editor. |
| Generate failed | Couldn’t generate that PDF. Try again in a moment. If it keeps failing, contact support. |
| Quota exceeded | You’ve reached your plan’s PDF limit. Upgrade or wait until the quota resets. |
| Unauthorized API | Invalid or missing API key. |
| Founding sold out | Founding seats are full (50/50). Pro is still available. |
| Share expired | This share link has expired. Generate a new PDF or upgrade for permanent links. |
| Not found | We couldn’t find that page. |
| Network | You’re offline or the network failed. Check your connection and retry. |

---

## Meta / SEO

**Title tag:** Dynamogic — Brand layer for AI output  
**Description:** Apply your brand kit to AI-generated content and get shareable PDFs via demo, API, or MCP. Free 3 PDFs/day.  
**OG:** Same description; monochrome OG image with wordmark.
