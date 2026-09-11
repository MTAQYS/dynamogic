# Brevo email sequences (transactional)

Sender: `Dynamogic <noreply@YOURDOMAIN>`  
Tone: calm, short, no fake social proof.  
Replace `{{vars}}` with Brevo params.

---

## 1) Welcome

**Template name:** `welcome`  
**Trigger:** User signs up  

**Subject:** Welcome to Dynamogic — your brand layer for AI output  

**Body:**

Hi {{first_name|there}},

Thanks for joining Dynamogic.

You’re set up on the Free plan: **3 PDFs per day**. Create a brand kit (logo, colors, fonts, footer), then generate a PDF from your AI draft.

Quick start:
1. Add a brand kit in the app  
2. Paste markdown from ChatGPT/Claude  
3. Generate → download or share  

Agents later: one MCP tool, `create_branded_pdf`.

— Mohamed-Taqy / Dynamogic (MTAQYS)

Privacy: {{privacy_url}}  
Support: {{support_email}}

---

## 2) First-render tip

**Template name:** `first_render_tip`  
**Trigger:** First successful PDF for account (or 24h after signup if none)  

**Subject:** Tip: lock your brand kit once, reuse forever  

**Body:**

Hi {{first_name|there}},

{{#if pdf_url}}Nice — your first PDF is ready.{{else}}When you’re ready, generate your first branded PDF.{{/if}}

Tip: set **footer text** and **accent style** in your brand kit before the next render. That alone makes client-facing docs feel consistent.

Free plan refreshes daily (3 PDFs/day). Need more? Pro is $12/mo or $99/yr. Founding seats (max 50) are limited if still open: {{pricing_url}}

— Dynamogic

---

## 3) Quota warning

**Template name:** `quota_warning`  
**Trigger:** User hits ≥80% of daily/monthly cap, or hard limit  

**Subject:** You’ve nearly reached your Dynamogic PDF limit  

**Body:**

Hi {{first_name|there}},

You’ve used **{{used}}** of **{{limit}}** PDFs on your **{{plan}}** plan ({{window}}).

Options:
- Wait until your quota resets ({{reset_at}})  
- Upgrade to Pro for higher caps: {{upgrade_url}}  
{{#if founding_open}}- Or claim a Founding seat while available: {{founding_url}}{{/if}}

Questions? {{support_email}}

— Dynamogic

---

## 4) Founding receipt

**Template name:** `founding_receipt`  
**Trigger:** Successful Founding purchase (year or lifetime)  

**Subject:** Founding seat confirmed — thank you  

**Body:**

Hi {{first_name|there}},

You’re in as a **Dynamogic Founding** member ({{founding_variant}}).

Order: {{order_id}}  
Amount: {{amount}}  
PDF cap: **100 / month**  
Seats are capped at **50** total — thank you for supporting early.

Manage billing via Lemon Squeezy customer portal: {{portal_url}}  
App: {{app_url}}

We’ll email if anything material changes about founding access.

— Mohamed-Taqy Salmi · MTAQYS · Dynamogic

---

## Notes for Brevo setup

- Use transactional templates (not raw spammy marketing).  
- Test spam score after DKIM.  
- Include physical/company identity if required by law in footer.  
