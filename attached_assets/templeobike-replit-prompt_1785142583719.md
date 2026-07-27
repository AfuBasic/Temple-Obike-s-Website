# Replit Build Prompt — templeobike.com

Paste everything below into Replit.

---

Build a single-page personal website for **Temple Obike** — a psychotherapist, relationship interventionist, and business strategist based in Lagos, Nigeria. This site's ONLY job is to get him booked for speaking engagements, interviews, and features. Keep it simple: one scrollable page, five sections, no blog, no course catalog, no multi-level menu.

## Brand system (must match exactly — this identity is already established elsewhere in his brand and must not be reinvented)

- Background: matte black (#0A0A0A or similar near-black)
- Primary accent: warm gold (#B8874A range — same family as his existing "TO" monogram logo)
- Secondary accent: single small green highlight only (used sparingly, e.g. leaf detail, active states) — do not spread green across the UI
- Typography: clean serif or high-contrast sans for headlines (confident, editorial feel), simple sans for body text
- Photography style: full-bleed dark/cinematic portraits with a single key light and heavy shadow — no bright, evenly-lit "corporate headshot" treatment
- No occult, mystical, or generic "self-help" visual clichés (no glowing brains, no zen circles, no stock lotus imagery)
- Mood: authority and presence, not softness — this is a speaker/strategist site, not a therapy-practice site

I will upload the actual logo file and portrait photos separately — use them as-is once uploaded; do not generate placeholder graphics for these.

## Page structure and copy

### 1. Hero
Full-bleed dark portrait as background (use the closer, higher-contrast portrait). Overlay text:

**Headline:** "The Voice Behind the Room's Hardest Conversations"
**Subheadline:** "Psychotherapist. Relationship Strategist. Speaker. Author."
**Primary CTA button:** "Book Temple to Speak" → scrolls to/opens the contact form
**Secondary link:** "Media Kit" → opens/downloads a one-page PDF (placeholder link is fine for now)

### 2. Credibility strip
A clean horizontal row (or grid on mobile) of proof points, not paragraphs:
- Featured: Nigerian Television Authority (NTA) — Television Interview
- Featured: National Radio Interview — Privacy vs. Secrecy in Marriage
- Recognized: Business Elites Africa — Top 30 Branding & PR Elites in Africa
- Published Author — available on Amazon

Each item links out to its existing source (YouTube video, article, or Amazon page) where a link is available.

### 3. About (short, third person, written for an event organizer — not a memoir bio)
**Section label:** "Who He Is"

Body copy:
"Temple Obike is a Lagos-based psychotherapist, relationship interventionist, and business strategist who has spent his career helping individuals, couples, and brands move through fracture toward repair. His work spans trauma resolution, emotional intelligence, and market entry strategy — a combination that has made him a recurring voice on Nigerian television and radio, and a recognized name in African branding and PR circles.

He speaks on the psychology of trust, the architecture of repair after betrayal, and what leaders get wrong about emotional intelligence — drawing on both clinical practice and years advising brands on positioning and market entry across Africa."

### 4. Signature talks
**Section label:** "What He Speaks On"

Three talk cards, title + one-line description each:
1. **"The Architecture of Trust"** — What actually rebuilds trust after betrayal, and why most advice gets the order wrong.
2. **"Emotional Intelligence as a Leadership Currency"** — Why EQ, not credentials, predicts who leads rooms well.
3. **"From Fracture to Repair"** — A practical framework for moving individuals, couples, and teams through breakdown toward something stronger.

### 5. Book / Contact
**Section label:** "Bring Temple to Your Stage"

A real form, not a bare mailto link. Fields:
- Name
- Organization
- Event date
- Audience size
- Topic of interest (dropdown: Trust & Relationships / Emotional Intelligence / Trauma & Repair / Custom)
- Budget range (optional, dropdown with broad bands)
- Message

Submit button: "Send Booking Request"
Below the form: direct email and (if he provides one) WhatsApp contact link as an alternative.

### Footer
Simple: name, TO monogram mark, links to Instagram/YouTube/other social if provided, and a small text link back to templescounsel.com ("For therapy & relationship coaching services →").

## Technical requirements
- Fully responsive, mobile-first (most of his traffic will come from social/WhatsApp shares on mobile)
- No database needed — this is a static single page with one working contact form (use a simple form-handling service or mailto fallback)
- Fast load — this is a credibility/conversion page, not a content site; keep it lightweight
- Deploy changes live, not just saved in preview — what gets reviewed afterward is the live published URL

## Content notes
- Do not use the word "FERRG" anywhere on this site — that framework has not launched publicly yet
- Do not carry over the percentage skill bars, the "Married to my childhood sweetheart" memoir-style bio, or the personal/friend testimonials from the current site — none of that belongs on this version
- If no logo/photo files are uploaded yet, use solid black backgrounds with gold text rather than stock imagery as a placeholder
