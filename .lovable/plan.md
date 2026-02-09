

# Homepage & Site Revamp: "Boutique Firm" Positioning

## The Problem

The current site swung too far in the "contractor website builder" direction. It reads like a template website selling websites -- which ironically undermines your goal of looking like a legit, professional operation. The homepage flow is: Hero (contractor pitch) -> Pricing cards -> Website screenshot -> Google Maps screenshot -> Charlie bio -> CTA. It's linear and transactional, missing the warmth and visual richness the old site had.

## The Strategy

**Position as: "Small boutique firm"** -- not "Charlie Dickerson's personal site," and not "contractor lead-gen agency." HVCG is a professional consultancy that happens to build great websites for contractors. Charlie is the team lead, not the billboard.

**Single CTA everywhere:** "Book a 15-Minute Intro" -- neutral enough for networking, advisory, or contractor leads.

---

## Homepage Redesign (Section by Section)

### Section 1: Hero (Revised)
- **Headline:** "STRATEGY. DESIGN. RESULTS." (firm-first, not contractor-first)
- **Subline:** "We build professional websites and digital systems for businesses that need to get found online."
- **Single CTA:** "BOOK A 15-MINUTE INTRO"
- **Secondary text:** "Website builds starting at $1,399"
- Keep the hero image (tablet mockup) -- it works
- Remove the "SEE OUR WORK" button (one CTA only)

### Section 2: Credibility Strip (NEW)
- A horizontal bar with 3-4 plain-text credentials, no icons:
  - "Enterprise marketing operations"
  - "AI & automation systems"
  - "Website development"
  - "Hudson Valley, NY"
- Subtle, professional -- not salesy

### Section 3: What We Do (3 Cards -- Revised)
Instead of pricing-forward cards, make them capability-forward:
1. **Website Development** -- "Professional sites for contractors and small businesses. Fast, mobile-friendly, Google-ready. Starting at $1,399."
2. **Search & Visibility** -- "Google Business, Maps, and local SEO setup so customers find you first."
3. **Advisory & Automation** -- "Strategy, workflow design, and AI systems for marketing teams. Select engagements."

No prices on cards 2 and 3. Link to /services for details.

### Section 4: Website Showcase (Keep, Enhance)
Keep the WebsitePreviewSection but reframe the heading:
- **"What We Deliver"** instead of "Here's What You Get"
- Keep the deliverables grid (Complete Website, Mobile-Friendly, Maps Ready, Lead Capture) -- these are good

### Section 5: Proof / Work Preview (NEW)
- Instead of the full SearchResultsShowcase component (which feels like a sales pitch), show 2-3 portfolio thumbnails inline:
  - McNulty's Junk Removal screenshot + link
  - A1 Smart Choice screenshot
  - "More in our portfolio" link to /work
- This gives social proof without a dedicated sales section

### Section 6: Meet the Team (Revised from "Who's Building Your Site")
- **Heading:** "MEET THE TEAM" (not "Who's Building Your Site" -- too direct/personal for your comfort)
- Keep the Charlie bio card but frame it as team lead, not solo operator
- Add a line: "Independent consultancy. Not affiliated with client brands."
- Keep LinkedIn link

### Section 7: Bottom CTA (Keep, Revise Copy)
- **Heading:** "LET'S TALK"
- **Subline:** "Book a free 15-minute intro. Whether you need a website, advisory, or just want to connect -- we're here."
- CTA: "BOOK A 15-MINUTE INTRO"

---

## Other Page Updates

### Booking Page (/booking)
- Change hero from "BOOK YOUR STRATEGY SESSION" to "LET'S CONNECT"
- Update the service interest dropdown to match the advisor's suggestion:
  - "Website build"
  - "Search & visibility"
  - "Advisory / automation"
  - "Networking / speaking"
  - "Other"
- Keep Calendly embed + contact form -- they work well

### Services Page (/services)
- Keep pricing cards and FAQ -- they're solid
- Update hero subtitle: remove "No hidden fees" (sounds defensive), replace with "Clear scope. Fair pricing. 4-week delivery."

### Approach/About Page (/approach)
- Change "ABOUT" to "OUR APPROACH" in hero
- Keep the bio section -- it's well written
- Add a brief "Independent consultancy" disclaimer

### SearchResultsShowcase Component
- Remove from homepage (replaced by inline portfolio preview)
- Can be kept on /services if desired

### Footer
- Add LinkedIn icon/link
- Otherwise keep as-is -- it's clean

---

## Files to Modify

| File | What Changes |
|------|-------------|
| `src/components/ClubhouseHero.tsx` | New headline, single CTA, revised copy |
| `src/pages/ClubhouseHome.tsx` | Restructure sections: add credibility strip, revise "What You Get" to capabilities, replace SearchResultsShowcase with inline portfolio, rename bio section |
| `src/components/SearchResultsShowcase.tsx` | Remove from homepage import (keep file for potential /services use) |
| `src/pages/Booking.tsx` | Update hero copy, update service dropdown options |
| `src/pages/Services.tsx` | Minor copy tweaks to hero subtitle |
| `src/pages/Approach.tsx` | "OUR APPROACH" heading, add independent disclaimer |
| `src/components/Footer.tsx` | Add LinkedIn link |

---

## What This Achieves

- **Feels "full"**: 7 distinct homepage sections with visual variety (hero, text strip, cards, image showcase, portfolio thumbnails, bio card, CTA)
- **Professional**: firm-first language, not "I build websites on the side"
- **Single CTA**: "Book a 15-Minute Intro" everywhere -- works for networking, advisory, AND contractor leads
- **Charlie is present but not the billboard**: "Meet the Team" framing instead of "Who's Building Your Site"
- **De-AI-ified**: no "AI-powered" language on the homepage, advisory/automation is just one quiet card
- **Keeps the good stuff**: design system, WebsitePreviewSection, pricing on /services, Calendly integration

