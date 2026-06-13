# Site Reframe: Enterprise AI Transformation Consultancy

## Goal

Reposition HVCG from "we build contractor websites" to "we help mid-market and enterprise organizations turn AI into operating reality — building the prioritization frameworks, custom tools, and transformation roadmaps that move work, cost, and capacity." Keep the existing Clubhouse visual system. Web/SEO becomes one small secondary offering. No public pricing. CTA becomes "Start an Intake."

Positioning line that the whole site hangs on:
> HVCG doesn't just advise on AI — it builds the systems that make AI adoption measurable and repeatable. Builder-strategist, not a slide-deck consultancy.

All copy stays at "HVCG builds…" / "HVCG has…" level. No personal-brand framing, no Omnicom, no named clients (sectors only).

---

## Voice & Content Rules (apply everywhere)

- Confident, plainspoken, anti-hype. Operator language, outcome-and-number-led.
- No "Charlie does…" framing. No client names — sectors only.
- No dollar amounts anywhere. No "4-week delivery", "$1,399", "$2,000 complete package".
- Single CTA everywhere: **"START AN INTAKE"** linking to `/booking` (still the Calendly/booking flow — no new backend).

---

## Page-by-Page Changes

### 1. Home (`src/pages/ClubhouseHome.tsx` + `src/components/ClubhouseHero.tsx`)
New flow:
1. **Hero** — Headline reframed to transformation (e.g. "TURN AI INTO OPERATING REALITY"), subhead about reshaping how work gets done, CTA "START AN INTAKE". Replace the "$1,399" subline with a credibility line (e.g. "Frameworks, tools, and agents — shipped to production."). Keep existing layout/visual treatment.
2. **Credibility strip** — sector words: Pharma · Telecom · CPG · Entertainment · Retail · Financial Services.
3. **Three differentiators** — Builds (doesn't just advise) · Methodology-first · Rooted in media & marketing operations.
4. **Outcome stat tiles** (the new hero proof): days/weeks → 20-min reporting; 25–35% efficiency potential; ~60% of effort recoverable from low-value work; 880+ tasks mapped; 700+ use cases scored; 3,700 users / 193K prompts.
5. **What We Do** — 5 condensed capability cards (see Services below).
6. **How We Work teaser** — three-stage roadmap visual teaser → links to `/approach`.
7. **Proof by sector** — anonymized outcome tiles (replaces the named McNulty/Reroll "Recent Work" block).
8. **Small "Also: websites & digital builds" band** — one quiet card noting HVCG also builds websites/SEO for local businesses, linking to the web offering.
9. **Bottom CTA** — "START AN INTAKE".

Remove the "Meet the Team / Charlie Dickerson / Omnicom" section. Update SEO title/description and JSON-LD (switch from `LocalBusiness` to `Organization`/`ProfessionalService` with AI-transformation description).

### 2. Services / "What We Do" (`src/pages/Services.tsx`)
Replace pricing-card page with the 9 pillars condensed into 5 benefit-led service cards (per brief section 7):
- **AI & Operating-Model Transformation** (3-stage roadmap; efficiencies/outcomes/output; 25–35% prize)
- **Use-Case Prioritization & Intake** (Reach × Multiplier ÷ Complexity; mine/make/manage; 700+ use cases)
- **Workflow Automation & Capacity Optimization** (current-vs-optimized dashboard; ~60% "manage" stat; staffing model)
- **Custom AI Tooling, Rapid Prototyping & Agentic Systems** (prototype→production: React/Node/PostgreSQL, CI/CD, SSO; 7-agent reporting system days→20 min; governance)
- **Dashboards, Measurement & Data Governance** (exec health scoring; causal lift / synthetic control; clean-room/privacy fluency; adoption: 3,700 users / 193K prompts)
- A final small card: **Websites & Digital Builds** (the retained local offering — no pricing, links to a brief web section/`/booking`).

Replace the "Simple Pricing" hero with a capability hero. Remove the pricing grid, "Complete Package ~$2,000", "4-week delivery". Keep a "How We Work" 4-step strip but reframe to intake → prioritize → build → measure. Replace contractor FAQ with enterprise-appropriate FAQ (engagement model, governance, data security, timelines stated as "90/180-day" ranges not prices). CTA → "START AN INTAKE".

### 3. How We Work / Approach (`src/pages/Approach.tsx`)
Rebuild as the methodology page (brief section 7 "How We Work"):
- Three-beat narrative: the pressure → the hidden problem (effort mapping, 880+ tasks, 60% manage) → the answer (HVCG builds the systems).
- **Three-stage transformation framework** visualized (Stage 1 quick wins → Stage 2 intelligent automation → Stage 3 agent orchestration).
- **Prioritization methodology** visualized: the scoring formula and mine/make/manage model.
- Builder-strategist philosophy at org level. Remove Charlie bio, Omnicom, LinkedIn, "evenings and weekends" copy.
- CTA → "START AN INTAKE".

### 4. Outcomes / Work (`src/pages/Work.tsx`)
Convert from named website portfolio to **anonymized outcome tiles by sector**:
- Sector experience grid (pharma, telecom, CPG, entertainment, QSR, sportswear/retail, mobility, spirits, financial services).
- Quantified outcome tiles (days→minutes, 25–35%, 60% recovered, 880+, 700+, 3,700/193K).
- Keep a small "Selected web builds" subsection that may still link McNulty/Reroll as examples of the web offering (these are public, consented links) — clearly separated from the enterprise sector work.
- Update SEO title/description. CTA → "START AN INTAKE".

### 5. Navbar & Footer (`src/components/ClubhouseNavbar.tsx`, `src/components/Footer.tsx`)
- Nav labels: WORK → "OUTCOMES", SERVICES → "WHAT WE DO", ABOUT → "HOW WE WORK", CONTACT stays. (Routes unchanged: `/work`, `/services`, `/approach`, `/booking`.)
- Nav + mobile CTA buttons: "BOOK A CALL" → "START AN INTAKE".
- Footer: remove pricing references, contractor language, and the $1,399 framing; update tagline to transformation positioning; update CTA copy.

### 6. Booking (`src/pages/Booking.tsx`)
Reframe page copy as "Start an intake" (mirror HVCG's intake-form ethos in the heading/intro). Keep the existing Calendly/booking link mechanism — no new backend, no DB submissions.

### 7. SEO / metadata (`index.html`, `public/sitemap.xml`, per-page SEO heads)
Update title, meta description, OG/Twitter text from contractor-website language to AI-transformation positioning. Keep canonical on `https://hudsonvalleycg.com` (non-www).

---

## Visual Direction (within Clubhouse system)
Keep club-green / varsity-maroon / warm-cream / action-yellow and Archivo Black / DM Sans. Lean into **diagram-style framework visuals** (three-stage roadmap, scoring formula, mine/make/manage, multi-agent flow) built with existing tokens — these become the hero visual assets. Bold number tiles for the outcome stats. No new design system, no neon.

---

## Memory Updates
- Update `mem://product/pricing` and Core line: pricing is no longer public-facing (keep internal note that figures exist but aren't shown).
- Update Core CTA from "BOOK A 15-MINUTE INTRO" → "START AN INTAKE".
- Update `mem://brand/identity`, `mem://product/homepage`, `mem://product/portfolio`, `mem://product/conversion`, `mem://product/routing` to reflect enterprise AI positioning, anonymized sectors, and web/SEO as a secondary offering.
- Add a constraint memory: no client names (sectors only), no personal-brand/Omnicom framing on the public site.

---

## Technical Notes
- Pure frontend/content work — React/TSX page + component edits, copy, and Tailwind using existing semantic tokens. No schema, no edge functions, no backend changes.
- Framework diagrams implemented as styled markup (divs/SVG) with existing tokens — no new heavy libraries.
- Routes and redirects in `App.tsx` stay as-is.
