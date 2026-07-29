# Replit Build Prompt — templeobike.com (Master / Consolidated)

Paste everything below into Replit as one instruction. This is the full, up-to-date spec — it replaces and includes every instruction given in earlier prompts, so build from this document alone.

---

Build a single-page personal website for **Temple Obike** — a psychotherapist, relationship interventionist, and business strategist based in Lagos, Nigeria. This site's ONLY job is to get him booked for speaking engagements, interviews, and features. Keep it simple: one scrollable page, six sections, no blog, no course catalog, no multi-level menu.

## Brand system (must match exactly)

- Background: matte black (#0A0A0A or similar near-black)
- Primary accent: warm gold (#B8874A range — same family as his existing "TO" monogram logo)
- Secondary accent: single small green highlight only (used sparingly, e.g. leaf detail, active states) — do not spread green across the UI
- Typography: clean serif or high-contrast sans for headlines (confident, editorial feel), simple sans for body text
- Photography style: full-bleed dark/cinematic portraits with a single key light and heavy shadow — no bright, evenly-lit "corporate headshot" treatment
- No occult, mystical, or generic "self-help" visual clichés (no glowing brains, no zen circles, no stock lotus imagery)
- Mood: authority and presence, not softness — this is a speaker/strategist site, not a therapy-practice site

I will upload the actual logo file, portrait photos, event photos, and one on-stage speaking photo separately — use them as-is once uploaded; do not generate placeholder graphics for these.

**LOGO FIX — priority item:** The current homepage header shows Temple's name as plain text instead of his actual logo. Replace this everywhere the site currently renders his name as a text wordmark (header/nav and footer) with the real uploaded "TO" monogram logo file (gold serif T/O mark, black background, white wordmark bar, small green leaf accent). Do not recreate the logo in code — use the uploaded image file directly, sized appropriately for header (small, cropped tight) and footer (small) placements.

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

### 5. Events & Speaking History
**Section label:** "Where He's Been"

Build this as a horizontal-scroll or grid timeline of past engagements — same dark/gold card treatment as the credibility strip, one card per engagement. Use the real details below; do not invent additional events.

**CLICK-TO-EXPAND BEHAVIOR — applies to every card in this section, no exceptions:**
When a visitor clicks/taps any card, it opens an expanded view (modal or inline expand, your choice technically) in this exact order:
1. **The event photo appears first**, large and prominent, before any text is visible.
2. **The write-up (topic, date, venue, description) appears below/after the image.**
This ordering exists specifically so visitors see visual proof the event happened before reading about it — do not swap this order on any card, including the ones that currently only have placeholder images.

1. **Boss FM 95.5, Abuja — Radio Interview**
   Topic: "Signs of a Trauma-Based Relationship"
   Date: August 2022
   Format: Live radio interview

2. **Hot FM, Lagos — Parent Connect Helpline (Panel)**
   Topic: "The Present But Absent Father"
   Date: November 2022
   Format: Live TV/radio panel, alongside guidance counselor Olutunde Edem, hosted by Sharon

3. **#RECOVER — 2-Day Couples Webinar**
   Role: Lead coach/facilitator
   Date: December 2022
   Format: Ticketed 2-day virtual webinar for couples, presented by Temple's Counsel & Mind Academy

4. **Sunset & Soulmate: A Date Night** — SPECIAL CARD, see expanded copy below
   Role: Host
   Venue: Lekki Leisure, Oniru, Lekki
   Date: June 2023
   Format: In-person hosted couples' date-night event (karaoke, dinner, guided Q&A)
   Attendance: ~80 couples

   **Expanded write-up for this card specifically (after the event photo):**
   "This was Temple's first attempt at gathering people for an event he personally led as the speaker and host — a couples' date night bringing together roughly 80 couples for an evening of connection, karaoke, dinner, and guided conversation. It planted the seed for what has since grown into **The Gold Retreat** — Temple's fully-managed international couples retreat. If Sunset & Soulmate showed what a room full of intentional couples could feel like for one evening, The Gold Retreat is that same idea taken further: a multi-day, fully managed experience for couples ready to go deeper."
   Include a text link/button from this card to the Gold Retreat section or page once it exists: "See The Gold Retreat →"

5. **RelationSHIP Talk — The Marriage Haven**
   Topic: "Common Challenges with Knowledge Dispensers"
   Date: November 2023
   Format: Live Instagram panel conversation with host Nike Adekunle

6. **Young Catholic Professionals, SS Philip & James Parish — Keynote**
   Topic: "Strategies for Sustaining Relationship Health Amidst Demanding Careers: Stress Reduction and Mental Well-Being Techniques"
   Venue: YCP Resource Center, Lekki
   Date: February 2024
   Format: In-person keynote talk

7. **Rotary District 9127 — Mental Health Awareness Day**
   Topic: "Prioritizing Mental Health in Workplaces"
   Venue: Rotary Center, Jabi, Abuja
   Date: October 2024
   Format: In-person symposium, facilitator alongside a panel of mental health and addiction specialists

8. **Summit Keynote — Addo-Ekiti**
   Role: Lead speaker (travelled to attend)
   Venue: Addo-Ekiti
   Format: In-person keynote at a summit
   Use the uploaded photo of Temple speaking on stage with a handheld mic at a podium for this card. Exact summit name and date still to be confirmed — leave those two fields as an easily editable placeholder for now.

**Image handling instructions for this section:**
- Card 8 uses the real uploaded stage photo (Temple speaking, handheld mic, seated at a podium, purple-carpeted stage) — this is also the image that opens first when Card 8 is expanded.
- Card 4 (Sunset & Soulmate) should use a real event photo if/when Temple uploads one; until then, use the same clean card treatment as the others as a placeholder, but keep the expand-order rule (image slot first, then the special write-up above) ready for when the photo is added.
- Cards 1, 2, 3, 5, 6, 7 currently have no standalone clean photo of Temple at the event itself (the source material is Instagram flyer graphics, not clean photos). Do NOT scrape or reuse the Instagram flyer graphics as-is. Build each as a clean text/graphic card in the site's own black-and-gold style (icon or simple monochrome graphic representing radio/TV/webinar/panel/keynote as appropriate) — no stock photography, no imported flyer artwork. Leave a clearly marked placeholder image slot sized for a future real photo so Temple can drop one in later, while preserving the "image first, then write-up" expand order on all of them.

### 6. Book / Contact
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

**Email delivery:** Every submission must be emailed directly to **templescounsel@gmail.com** as soon as the form is submitted — not just logged or stored. Use a form-handling service that supports direct email delivery without needing Temple to manage a mail server (e.g. Formspree, Web3Forms, or EmailJS all work for a static site like this — pick whichever integrates most simply in Replit). Set the destination address to templescounsel@gmail.com in the service's configuration. Include all submitted fields in the email body, plus the submission date/time, so it reads like a ready-to-action booking request.

After a successful submission, show the person an on-page confirmation message (e.g. "Thanks — your request has been sent, Temple will follow up shortly.") rather than redirecting away from the page.

Below the form: direct email (templescounsel@gmail.com) and (if he provides one) WhatsApp contact link as an alternative.

### Footer
Simple: real "TO" monogram logo (not text), links to Instagram/YouTube/other social if provided, and a small text link back to templescounsel.com ("For therapy & relationship coaching services →").

## Technical requirements
- Fully responsive, mobile-first (most of his traffic will come from social/WhatsApp shares on mobile)
- No database needed — this is a static single page with one working contact form that emails submissions directly to templescounsel@gmail.com (see email delivery instructions in Section 6)
- Card expand/modal behavior in Section 5 must work smoothly on mobile (tap to open, tap outside or an X to close), image loading first every time
- Fast load — this is a credibility/conversion page, not a content site; keep it lightweight
- Deploy changes live, not just saved in preview — what gets reviewed afterward is the live published URL

## Content notes
- Do not use the word "FERRG" anywhere on this site — that framework has not launched publicly yet
- Do not carry over the percentage skill bars, the "Married to my childhood sweetheart" memoir-style bio, or the personal/friend testimonials from the current site — none of that belongs on this version
- If no logo/photo files are uploaded yet, use solid black backgrounds with gold text rather than stock imagery as a placeholder — EXCEPT the header/footer logo itself, which must be the real uploaded logo file, not a text placeholder

## Final step — audit and publish
Before finishing, go back through this entire document section by section and confirm every instruction has actually been implemented — the real logo (not text) in header and footer, all six page sections present in order, the click-to-expand image-first behavior working on all 8 event cards, the special Sunset & Soulmate → Gold Retreat write-up in place, and the booking form actually emailing to templescounsel@gmail.com and showing a confirmation message. Fix anything that was missed or only partially done. Once everything on this list is verified working, **publish/deploy the site live** — the review afterward will be of the live published URL, not the preview.
