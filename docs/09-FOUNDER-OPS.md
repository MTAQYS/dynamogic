# 09 — Founder ops (atomic checkboxes)

Every item is a **human** setup step. Check off when done. URLs are signup/docs entry points.

**Org:** MTAQYS · **Product:** Dynamogic · **Budget:** $250 setup / ≤$150/mo  

---

## Domain & DNS

- [ ] **Buy/use domain** — Registrar of choice (e.g. https://www.namecheap.com/ or https://domains.google/) — configure `dynamogic.com` (or chosen TLD)  
- [ ] **Point DNS to Vercel** — https://vercel.com/docs/projects/domains — Apex + `www`  
- [ ] **Add Brevo DNS records** (SPF/DKIM/DMARC) after Brevo domain setup  
- [ ] **Optional `api.` subdomain** — same Vercel project or reverse proxy later  

---

## GitHub

- [ ] **Create GitHub org/user repo** — https://github.com/new — e.g. `MTAQYS/dynamogic` (app) + keep this handoff pack  
- [ ] **Protect `main`** — branch rules: PR required optional early  
- [ ] **Add secrets later** via host dashboards (not in git)  
- [ ] **Import issues** from `tasks/issues.jsonl`  

---

## Vercel

- [ ] **Sign up / login** — https://vercel.com/signup  
- [ ] **Import GitHub repo** — Framework Preset Next.js  
- [ ] **Env vars** — paste from `docs/04-TECH.md` list (values when ready)  
- [ ] **Preview deployments** enabled  
- [ ] **Production domain** attached  

---

## Supabase

- [ ] **Create project** — https://supabase.com/dashboard  
- [ ] **Save URL + anon + service role** to password manager  
- [ ] **Auth:** Email magic link and/or password; enable **Google** provider  
- [ ] **Storage bucket** for PDFs + logos (private + signed URLs)  
- [ ] **Run migrations** for tables in `04-TECH.md`  
- [ ] **RLS policies** on  

---

## Google OAuth consent screen

- [ ] **Google Cloud console** — https://console.cloud.google.com/apis/credentials  
- [ ] **Configure OAuth consent screen** — app name Dynamogic; support email; logo  
- [ ] **Create OAuth Client ID** — Web; authorized redirect URIs from Supabase Google docs: https://supabase.com/docs/guides/auth/social-login/auth-google  
- [ ] **Add Client ID/Secret to Supabase Auth Google**  
- [ ] **Publish / test users** while in testing mode  

---

## VPS (Playwright/Puppeteer)

- [ ] **Create VPS** — https://www.hetzner.com/cloud or https://www.digitalocean.com/ — small shared CPU OK  
- [ ] **SSH harden** — keys only, firewall (80/443/22 restricted)  
- [ ] **Docker + worker image** with Chromium deps  
- [ ] **HTTPS** via Caddy/Nginx + Let’s Encrypt  
- [ ] **Shared secret** with Next.js `RENDER_WORKER_SECRET`  
- [ ] **Health endpoint** monitored  

---

## Brevo (email) — not Resend

- [ ] **Sign up** — https://www.brevo.com/  
- [ ] **Verify sender domain** — DNS DKIM/SPF  
- [ ] **Create API key** — store in env `BREVO_API_KEY`  
- [ ] **Templates:** Welcome · First-render tip · Quota warning · Founding receipt — copy from `content/email-sequences.md`  
- [ ] **Transactional settings** — default sender `Dynamogic <noreply@domain>`  
- [ ] **Suppressions / unsubscribe** for any marketing lists  

---

## Lemon Squeezy

- [ ] **Sign up** — https://lemonsqueezy.com/  
- [ ] **Complete store + payout details**  
- [ ] **Products/variants** per `docs/05-PRICING.md` checklist  
- [ ] **Webhook** to production URL + secret  
- [ ] **Test mode** purchase of Pro + Founding  
- [ ] **Customer portal** enabled  

---

## Analytics

- [ ] **Plausible** — https://plausible.io/ OR **Umami** — https://umami.is/  
- [ ] **Add site domain**; install script in Next.js layout  
- [ ] **Custom events:** `demo_start`, `pdf_generated`, `signup`, `checkout_started`  
- [ ] **No extra ad pixels** until ads + consent ready  

---

## UptimeRobot

- [ ] **Sign up** — https://uptimerobot.com/  
- [ ] **Monitor** `https://<domain>/api/health`  
- [ ] **Monitor** worker `/health`  
- [ ] **Alert email/SMS** to founder inbox  

---

## npm (MCP package)

- [ ] **npm account** — https://www.npmjs.com/signup  
- [ ] **Org scope** optional `@mtaqys`  
- [ ] **Publish** MCP package when Phase 3 DoD met  
- [ ] **README** with tool description pointing to Dynamogic  

---

## Social

- [ ] **X account** — https://x.com/i/flow/signup — bio + link to demo  
- [ ] **LinkedIn** Page or personal — https://www.linkedin.com/ — company MTAQYS / Dynamogic  
- [ ] **Pin** launch post; use drafts in `content/social-launch.md`  

---

## Support inbox

- [ ] **Mailbox** `support@domain` (Google Workspace / improvMX / registrar email)  
- [ ] **Forward** to founder  
- [ ] **Signatures** with Privacy/Terms links  
- [ ] **Canned replies** for quota + founding sold out  

---

## Legal pages

- [ ] **Draft Privacy + ToS** using `docs/08-LEGAL.md` outlines  
- [ ] **Lawyer review** if budget allows  
- [ ] **Publish** `/privacy` `/terms` before PH/ads  

---

## Brand assets

- [ ] **Wordmark** per `brand/LOGO-BRIEF.md`  
- [ ] **Favicon + OG exports**  
- [ ] **Upload** to repo `/public`  

---

## Budget tracker

- [ ] **Sheet** tracking Vercel/Supabase/VPS/Brevo/LS fees/domain/ads ≤ $150/mo  
- [ ] **Cap ads** per `07-ADS.md`  

---

## Pre-launch final

- [ ] All Phase 1–4 DoD true (`AGENTS.md`)  
- [ ] Founding seat counter works  
- [ ] Test emails received (not spam)  
- [ ] OAuth consent branding correct  
- [ ] Uptime green for 48h  
