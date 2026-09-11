# ATOMIC-TASKS — Dynamogic

Format: `ID | PHASE | WHO | URGENCY | TITLE | DONE-WHEN`  

WHO = FOUNDER or AI · URGENCY = P0|P1|P2|P3 · PHASE = OPS|BRAND|PHASE1|PHASE2|PHASE3|PHASE4|PHASE5|GROW|ADS  

Truly atomic = one sitting.

---

## OPS
T001 | OPS | FOUNDER | P0 | Register or confirm Dynamogic domain | Domain resolves at registrar and credentials saved
T002 | OPS | FOUNDER | P0 | Create GitHub repo for app + push handoff reference | Repo URL live; handoff linked in README
T003 | OPS | FOUNDER | P0 | Create Vercel account and import app repo | First deploy pipeline connected
T004 | OPS | FOUNDER | P0 | Create Supabase project and save keys to password manager | URL, anon, service role stored offline
T005 | OPS | FOUNDER | P0 | Sign up Brevo and create API key | BREVO_API_KEY in password manager
T006 | OPS | FOUNDER | P0 | Add Brevo domain and DNS SPF/DKIM | Domain verified in Brevo dashboard
T007 | OPS | FOUNDER | P0 | Sign up Lemon Squeezy and complete store basics | Store can create products in test mode
T008 | OPS | FOUNDER | P0 | Provision small VPS for Chromium worker | SSH access works; firewall basic rules on
T009 | OPS | FOUNDER | P1 | Point domain DNS to Vercel | Apex and www serve Vercel
T010 | OPS | FOUNDER | P1 | Configure Google Cloud OAuth consent screen for Dynamogic | Consent screen saved with app name and logo
T011 | OPS | FOUNDER | P1 | Create Google OAuth client and add redirects to Supabase | Google sign-in toggle works in Supabase
T012 | OPS | FOUNDER | P1 | Create support@ mailbox or forwarder | Founder receives test mail to support address
T013 | OPS | FOUNDER | P1 | Sign up Plausible or Umami and add site | Tracking snippet available
T014 | OPS | FOUNDER | P1 | Sign up UptimeRobot and prepare monitors | Account ready; alert email set
T015 | OPS | FOUNDER | P1 | Create npm account for MCP package publish | Login works; 2FA optional recommended
T016 | OPS | FOUNDER | P1 | Create X account for Dynamogic/MTAQYS and set bio link | Profile live with demo URL placeholder
T017 | OPS | FOUNDER | P1 | Create LinkedIn presence for launch posts | Profile/page ready to post
T018 | OPS | FOUNDER | P2 | Create monthly budget tracker sheet ≤$150/mo | Sheet exists with cost categories
T019 | OPS | FOUNDER | P2 | Document all env values in private vault matching 04-TECH | Vault checklist complete
T020 | OPS | FOUNDER | P0 | Import priority issues from issues.jsonl into GitHub | ~60 issues created with labels

## BRAND
T021 | BRAND | FOUNDER | P0 | Produce wordmark SVG per LOGO-BRIEF | SVG opens clean black-on-white
T022 | BRAND | FOUNDER | P0 | Export inverse wordmark and favicon set | Favicon shows in browser tab
T023 | BRAND | FOUNDER | P1 | Export OG image 1200x630 | OG debugger shows sharp image
T024 | BRAND | AI | P1 | Drop logo/favicon/OG into Next.js public assets | Files referenced by layout metadata
T025 | BRAND | FOUNDER | P2 | Create Product Hunt thumbnail 240x240 | File saved in brand exports

## PHASE1
T026 | PHASE1 | AI | P0 | Scaffold Next.js App Router TypeScript project | `npm run dev` serves home
T027 | PHASE1 | AI | P0 | Apply monochrome design tokens from 02-DESIGN | Tokens in CSS/Tailwind config
T028 | PHASE1 | AI | P0 | Build navbar with copy from 03-COPY | Nav links and CTAs match copy doc
T029 | PHASE1 | AI | P0 | Build hero section with final headline/CTAs | Hero matches 03-COPY
T030 | PHASE1 | AI | P0 | Build how-it-works three-step section | Section live with footnote
T031 | PHASE1 | AI | P0 | Build MCP teaser section | Tool name create_branded_pdf shown
T032 | PHASE1 | AI | P0 | Build features grid from 03-COPY | Six features rendered
T033 | PHASE1 | AI | P0 | Build pricing cards Free/Pro/Founding | Prices and caps accurate
T034 | PHASE1 | AI | P0 | Build FAQ accordion 6+ questions | All FAQ from copy doc
T035 | PHASE1 | AI | P0 | Build footer + build-in-public strip | Footer links and strip present
T036 | PHASE1 | AI | P0 | Build demo editor UI with sample markdown | Editor loads sample content
T037 | PHASE1 | AI | P0 | Build sample brand kit controls for demo | Color/font/accent adjustable
T038 | PHASE1 | AI | P0 | Implement shared HTML brand template module | Module exports renderHtml(content, brand)
T039 | PHASE1 | AI | P0 | Implement PDF render via Playwright or Puppeteer | PDF bytes returned from module
T040 | PHASE1 | AI | P0 | Wire Generate button to shared render path | Downloadable PDF produced in demo
T041 | PHASE1 | AI | P0 | Add anonymous IP rate limit ~3/day messaging | Limit message matches copy
T042 | PHASE1 | AI | P1 | Add demo success actions Download + copy share stub | Buttons work post-generate
T043 | PHASE1 | AI | P1 | Responsive + focus states QA | Mobile nav and focus rings pass
T044 | PHASE1 | AI | P1 | Deploy Phase 1 preview to Vercel | Preview URL works for founder
T045 | PHASE1 | AI | P1 | Design QA: no colored primary CTAs | Primary buttons black/white only

## PHASE2
T046 | PHASE2 | AI | P0 | Add Supabase client and server helpers | Env-wired clients compile
T047 | PHASE2 | AI | P0 | Create DB migration for profiles brand_kits renders usage_daily | Tables exist in Supabase
T048 | PHASE2 | AI | P0 | Enable RLS policies for user-owned rows | Users cannot read others’ kits
T049 | PHASE2 | AI | P0 | Build email auth sign-up/sign-in UI | User can create session
T050 | PHASE2 | AI | P1 | Wire Google OAuth button when secrets present | Google login succeeds in test
T051 | PHASE2 | AI | P0 | Build brand kit create/edit form all fields | Kit saves and reloads
T052 | PHASE2 | AI | P0 | Logo upload to Supabase Storage | Logo appears in kit and PDF
T053 | PHASE2 | AI | P0 | App generate uses selected brand kit | PDF reflects kit fields
T054 | PHASE2 | AI | P0 | Implement usage_daily increment and Free 3/day gate | 4th PDF blocked with copy
T055 | PHASE2 | AI | P1 | Share link create with 7-day expiry for Free | /s/:id serves until expiry
T056 | PHASE2 | AI | P1 | PDF history list empty state | Empty copy matches 03-COPY
T057 | PHASE2 | AI | P1 | Send Brevo welcome email on signup | Test inbox receives welcome
T058 | PHASE2 | AI | P1 | First-render tip email hook | Tip sends after first PDF or delay job noted

## PHASE3
T059 | PHASE3 | AI | P0 | Implement POST /api/v1/pdfs per 04-TECH | Valid body returns pdf_url
T060 | PHASE3 | AI | P0 | Implement API key create/revoke with hashed storage | Key shown once; hash stored
T061 | PHASE3 | AI | P0 | Authenticate API via Bearer key | Invalid key returns 401
T062 | PHASE3 | AI | P0 | Enforce char limits and quotas on API | 429/402 with clear JSON error
T063 | PHASE3 | AI | P1 | GET /api/v1/pdfs/:id ownership check | Only owner retrieves metadata
T064 | PHASE3 | AI | P0 | Scaffold TypeScript MCP server package | Package runs on stdio
T065 | PHASE3 | AI | P0 | Register only create_branded_pdf with exact description/schema | Tool matches mcp-tool-description.md
T066 | PHASE3 | AI | P0 | MCP handler calls Dynamogic API | End-to-end PDF URL from MCP client
T067 | PHASE3 | AI | P1 | Build /mcp docs page with install snippet | Page live on site
T068 | PHASE3 | AI | P1 | Markdown sanitize against unsafe HTML | Script tags stripped in template
T069 | PHASE3 | AI | P2 | Prepare npm README for publish | README complete locally

## PHASE4
T070 | PHASE4 | FOUNDER | P0 | Create LS Pro monthly $12 and yearly $99 variants | Variant IDs copied to vault
T071 | PHASE4 | FOUNDER | P0 | Create LS Founding $79/12mo and $149 lifetime variants | Variant IDs copied to vault
T072 | PHASE4 | FOUNDER | P0 | Configure LS webhook to production endpoint | Webhook delivery succeeds in test
T073 | PHASE4 | AI | P0 | Implement webhook signature verify and plan mapping | Test purchase sets plan=pro
T074 | PHASE4 | AI | P0 | Founding seat counter increment and sold-out at 50 | 51st checkout blocked/UI sold out
T075 | PHASE4 | AI | P0 | Pricing page checkout buttons wired to LS | Click opens checkout
T076 | PHASE4 | AI | P0 | Enforce Pro and Founding quota numbers | Caps match 05-PRICING
T077 | PHASE4 | AI | P0 | Gate API/MCP to Pro/Founding | Free API returns upgrade error
T078 | PHASE4 | AI | P1 | Brevo founding receipt template send | Receipt received after founding buy
T079 | PHASE4 | AI | P1 | Brevo quota warning at 80%+ | Warning email received in test
T080 | PHASE4 | AI | P1 | Billing portal link in app | User opens LS portal
T081 | PHASE4 | AI | P1 | Cancel/expiry demotion for Pro | Plan returns free at period end handling

## PHASE5
T082 | PHASE5 | AI | P0 | Write Privacy page covering 08-LEGAL checklist | /privacy published with sections
T083 | PHASE5 | AI | P0 | Write Terms page covering 08-LEGAL checklist | /terms published with sections
T084 | PHASE5 | AI | P0 | Footer links to Privacy and Terms | Links work sitewide
T085 | PHASE5 | AI | P0 | Install analytics and fire core events | demo_start pdf_generated signup visible
T086 | PHASE5 | AI | P0 | Implement GET /api/health | Returns ok JSON
T087 | PHASE5 | FOUNDER | P0 | Add UptimeRobot monitors for app and worker | Alerts configured
T088 | PHASE5 | AI | P1 | Audit all error/empty states vs 03-COPY | Wording matches
T089 | PHASE5 | AI | P1 | Metadata titles OG twitter cards | Share preview correct
T090 | PHASE5 | AI | P1 | Live founding seats remaining on pricing | Number from DB not hardcoded
T091 | PHASE5 | FOUNDER | P1 | Lawyer or careful self-review of legal pages | Notes resolved or accepted risk
T092 | PHASE5 | AI | P1 | Production smoke test Phase1–4 flows | Checklist doc signed off
T093 | PHASE5 | FOUNDER | P1 | Confirm Brevo not landing in spam | Gmail/Outlook test pass

## GROW
T094 | GROW | FOUNDER | P1 | Record 15–30s demo GIF/WebM | File saved for social
T095 | GROW | FOUNDER | P1 | Post social launch #1 X + LinkedIn | Posts live with demo URL
T096 | GROW | FOUNDER | P1 | Schedule remaining 9 social drafts over 2 weeks | Calendar entries set
T097 | GROW | FOUNDER | P2 | Write Show HN first comment draft | Doc ready day-of
T098 | GROW | FOUNDER | P2 | Prepare Product Hunt gallery assets | Images uploaded to PH draft
T099 | GROW | FOUNDER | P2 | Reddit value post (rules-compliant) | Post live; disclosed founder
T100 | GROW | FOUNDER | P2 | Publish MCP npm package when stable | npm install works
T101 | GROW | AI | P2 | SEO landing section or blog: brand kit for ChatGPT output | Indexed page live
T102 | GROW | FOUNDER | P3 | Month-1 recap build-in-public thread | Thread posted with honest metrics
T103 | GROW | FOUNDER | P3 | Collect only genuine user quotes if any | Quotes stored; none invented

## ADS
T104 | ADS | FOUNDER | P2 | Decide primary ad channel X or Meta | Choice noted in budget sheet
T105 | ADS | FOUNDER | P2 | Install ad pixel only after consent stance decided | Pixel behind consent if needed
T106 | ADS | FOUNDER | P2 | Produce 3 creative variants per 07-ADS formula | Creatives saved
T107 | ADS | FOUNDER | P2 | Run $250 test with kill rules documented | Spend log + winners noted
T108 | ADS | FOUNDER | P3 | Set monthly paid cap ≤$150 with weekly review | Calendar reminder set
T109 | ADS | AI | P2 | Document UTM + event mapping for ads | Short doc in repo or Notion

## EXTRA SLICES (atomic build/ops)
T110 | PHASE1 | AI | P1 | Add loading and failed generate states in demo | Copy matches error table
T111 | PHASE2 | AI | P2 | Allow multiple kits list with default kit flag | Default used on generate
T112 | PHASE3 | AI | P2 | Worker health proxy or status on /api/health | Degraded status if worker down
T113 | PHASE4 | FOUNDER | P1 | LS test-mode full checkout + refund drill | Notes on refund policy confirmed
T114 | OPS | FOUNDER | P1 | Dockerize worker and deploy with HTTPS | Worker URL + secret in Vercel env
T115 | OPS | FOUNDER | P2 | Set DMARC policy for sending domain | DMARC record live
T116 | PHASE5 | AI | P2 | Add robots/sitemap basics | /sitemap.xml available
T117 | GROW | FOUNDER | P1 | Update all {{url}} placeholders in social/email with prod | No placeholder links remain
T118 | PHASE2 | AI | P2 | Soft paywall component reusing pricing CTAs | Shown on quota exceed
T119 | BRAND | AI | P2 | Optional “Made with Dynamogic” footer toggle off by default | Setting exists; default off
T120 | OPS | FOUNDER | P0 | Read AGENTS.md and pin phase order in project board | Board columns Phase1–5 exist

---

**Counts:** 120 tasks · FOUNDER-heavy OPS/GROW/ADS · AI-heavy PHASE1–5  
Import subset: see `issues.jsonl` (~60).
