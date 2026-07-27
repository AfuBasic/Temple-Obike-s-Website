import logoSrc from '@assets/IMG-20260727-WA0003_1785149135010.jpg';
import stageSrc from '@assets/Screenshot_20260727_110019_Gallery_1785147430425.jpg';

const gold = '#B8874A';
const dark = '#0A0A0A';

// ─── Data ─────────────────────────────────────────────────────────────────────

const stats = [
  { figure: '2,380+',      label: 'Hours of live therapy sessions' },
  { figure: '2.3M+',       label: 'Online readers reached since 2021' },
  { figure: '70%',         label: 'Diaspora client base (UK, US, Canada)' },
  { figure: '9+',          label: 'Keynote & speaking engagements' },
  { figure: '2',           label: 'Published books on Amazon' },
  { figure: '15+ years',   label: 'In practice & community advocacy' },
];

const credentials = [
  'Licensed Marriage and Family Therapist (LMFT)',
  'Certified Hypnotherapist (CHT) — Karen Wells Institute, USA',
  'Professional Counselling Certificate — Institute of Counseling Nigeria',
  'John Maxwell Leadership Programme Certification',
  'Founder, Temple\'s Counsel & Mind Academy (TCMA)',
];

const talks = [
  {
    title: 'The Architecture of Trust',
    desc: 'What actually rebuilds trust after betrayal — and why most advice gets the order wrong. Draws on clinical case work and evidence-based methodology to give audiences a replicable roadmap.',
    audience: 'Corporate · Faith · Community',
  },
  {
    title: 'Emotional Intelligence as a Leadership Currency',
    desc: 'Why EQ, not credentials, predicts who leads rooms well. A data-anchored keynote on the measurable ROI of emotional fluency in teams, marriages, and organisations.',
    audience: 'Corporate · Executive · HR',
  },
  {
    title: 'From Fracture to Repair',
    desc: 'A practical framework for moving individuals, couples, and teams through breakdown toward something stronger. Combines psychotherapy principles with actionable leadership language.',
    audience: 'Corporate · Wellness · Community',
  },
];

const engagements = [
  { event: 'Lights On Global Webinar', role: 'Lead Speaker', year: 'June 2026', detail: '242+ couples from 14+ countries' },
  { event: 'National Summit — Abuja & Nasarawa', role: 'Keynote Speaker', year: 'Nov 2025', detail: 'Presidential representative, Cabinet Minister & Governor in attendance' },
  { event: 'Rotary District 9127 Conference', role: 'Featured Speaker', year: 'Oct 2024', detail: '' },
  { event: 'Young Catholic Professionals Summit', role: 'Keynote Speaker', year: 'Feb 2024', detail: '' },
  { event: 'RelationSHIP Talk', role: 'Lead Speaker', year: 'Nov 2023', detail: '' },
  { event: 'Sunset & Soulmate', role: 'Lead Speaker', year: 'Jun 2023', detail: '' },
  { event: '#RECOVER Webinar', role: 'Featured Speaker', year: 'Dec 2022', detail: '' },
  { event: 'Hot FM Lagos', role: 'Radio Feature', year: 'Nov 2022', detail: '' },
  { event: 'Boss FM 95.5 Abuja', role: 'Radio Feature', year: 'Aug 2022', detail: '' },
];

const books = [
  {
    title: 'Soul Bodega',
    desc: 'A candid exploration of the inner life — identity, pain, healing, and spiritual self-reconstruction.',
    link: 'https://www.amazon.com',
  },
  {
    title: "Memoirs of The Rail man's Son",
    desc: 'A memoir tracing the formative experiences that shaped a therapist, a father, and a marriage advocate.',
    link: 'https://www.amazon.com',
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function Divider() {
  return (
    <div style={{ height: 1, background: '#1e1e1e', margin: '48px 0' }} />
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: gold, marginBottom: 20 }}>
      {children}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MediaKit() {
  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: dark, color: '#e5e5e5', minHeight: '100vh' }}>

      {/* Top bar */}
      <div className="print:hidden" style={{ background: '#111', borderBottom: '1px solid #1e1e1e', padding: '12px 32px', display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
        <button
          onClick={() => window.print()}
          style={{ background: gold, color: '#fff', border: 'none', padding: '8px 22px', fontWeight: 600, fontSize: 12, cursor: 'pointer', letterSpacing: '0.06em' }}
        >
          Download / Print PDF
        </button>
        <a
          href="/"
          style={{ background: 'transparent', color: '#888', border: '1px solid #2a2a2a', padding: '8px 22px', fontWeight: 500, fontSize: 12, textDecoration: 'none', letterSpacing: '0.05em' }}
        >
          ← Back to Site
        </a>
      </div>

      {/* Hero band */}
      <div style={{ position: 'relative', height: 320, overflow: 'hidden' }}>
        <img
          src={stageSrc}
          alt="Temple Obike speaking at a live event"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', filter: 'brightness(0.35) contrast(1.1)' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, ${dark} 0%, ${dark}99 40%, transparent 100%)` }} />
        <div style={{ position: 'absolute', inset: 0, padding: '0 48px', display: 'flex', alignItems: 'center', gap: 32 }}>
          <img src={logoSrc} alt="Temple Obike logo" style={{ width: 88, flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: gold, marginBottom: 8 }}>
              Official Media Kit · 2025
            </div>
            <h1 style={{ fontSize: 42, fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600, color: '#fff', lineHeight: 1.1, margin: 0 }}>
              Temple Obike
            </h1>
            <p style={{ fontSize: 14, color: '#aaa', marginTop: 8, letterSpacing: '0.04em' }}>
              LMFT, CHT · Psychotherapist · Marriage Counsellor · Keynote Speaker · Author
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '56px 40px 80px' }}>

        {/* Short bio */}
        <SectionLabel>Short Bio (for event programmes)</SectionLabel>
        <p style={{ fontSize: 15, lineHeight: 1.85, color: '#ccc', background: '#111', border: '1px solid #1e1e1e', padding: '24px 28px', borderLeft: `3px solid ${gold}` }}>
          Temple Obike (LMFT, CHT) is a Lagos-based Licensed Marriage and Family Therapist, certified hypnotherapist, keynote speaker, and twice-published author. Founder of Temple's Counsel & Mind Academy, he has logged over 2,380 hours of live therapy sessions and reached more than 2,300,000 readers online since 2021. Seventy percent of his clients are drawn from the global diaspora across the UK, US, Canada, and South Africa. He speaks on emotional intelligence, trust architecture, and relational repair — to corporate audiences, faith communities, and government institutions. He is the author of <em>Soul Bodega</em> and <em>Memoirs of The Rail man's Son</em>, both available on Amazon.
        </p>

        <Divider />

        {/* Long bio */}
        <SectionLabel>Full Bio</SectionLabel>
        <div style={{ fontSize: 14, lineHeight: 1.9, color: '#bbb', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <p>
            Temple Obike began counselling informally in 2008, advising youth groups in underserved Lagos neighbourhoods under the Grassroots and Shoots initiative. That foundation grew into Temple's Counsel and Mind Academy — a private psychotherapy and counselling practice with offices in Victoria Island, Lagos and Wuse 2, Abuja.
          </p>
          <p>
            He holds a Licensed Marriage and Family Therapist (LMFT) designation, a Certified Hypnotherapist (CHT) credential from the Karen Wells Institute in the United States, a professional counselling certificate from the Institute of Counseling Nigeria, and a John Maxwell Leadership Programme Certification. Over the course of his career he has logged more than 2,380 hours of direct client therapy and reached over 2,300,000 readers through online writing since 2021.
          </p>
          <p>
            Temple's keynote work spans corporate wellness, marriage and family resilience, emotional intelligence for leaders, and faith-based personal development. He has addressed national summits attended by presidential representatives, Cabinet ministers, and state governors; international webinars drawing couples from over 14 countries; and community forums across Lagos, Abuja, and the diaspora.
          </p>
          <p>
            He is the author of two books — <em>Soul Bodega</em> and <em>Memoirs of The Rail man's Son</em> — both available on Amazon. He is married to his primary school sweetheart; they are raising four children together. That personal foundation gives his work on marriage a credibility no qualification alone can confer.
          </p>
        </div>

        <Divider />

        {/* Stats grid */}
        <SectionLabel>By the Numbers</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
          {stats.map(s => (
            <div key={s.label} style={{ background: '#111', border: '1px solid #1e1e1e', padding: '22px 24px' }}>
              <div style={{ fontSize: 30, fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600, color: gold, lineHeight: 1 }}>{s.figure}</div>
              <div style={{ fontSize: 12, color: '#888', marginTop: 8, lineHeight: 1.5 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <Divider />

        {/* Credentials */}
        <SectionLabel>Credentials & Certifications</SectionLabel>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {credentials.map(c => (
            <li key={c} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 13, color: '#bbb', lineHeight: 1.6 }}>
              <span style={{ color: gold, flexShrink: 0, marginTop: 2 }}>—</span>
              {c}
            </li>
          ))}
        </ul>

        <Divider />

        {/* Signature talks */}
        <SectionLabel>Signature Talks</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {talks.map(t => (
            <div key={t.title} style={{ background: '#111', border: '1px solid #1e1e1e', padding: '24px 28px', display: 'grid', gridTemplateColumns: '1fr auto', gap: '8px 24px', alignItems: 'start' }}>
              <div>
                <div style={{ fontSize: 16, fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600, color: '#e5e5e5', marginBottom: 8 }}>
                  "{t.title}"
                </div>
                <div style={{ fontSize: 13, color: '#888', lineHeight: 1.7 }}>{t.desc}</div>
              </div>
              <div style={{ fontSize: 10, color: gold, letterSpacing: '0.12em', textTransform: 'uppercase', whiteSpace: 'nowrap', textAlign: 'right', marginTop: 4 }}>
                {t.audience.split(' · ').map((a, i) => (
                  <div key={i}>{a}</div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Divider />

        {/* Speaking history */}
        <SectionLabel>Selected Speaking Engagements</SectionLabel>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #1e1e1e' }}>
              <th style={{ textAlign: 'left', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#555', padding: '8px 0', width: '44%' }}>Event</th>
              <th style={{ textAlign: 'left', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#555', padding: '8px 0', width: '22%' }}>Role</th>
              <th style={{ textAlign: 'left', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#555', padding: '8px 0', width: '12%' }}>Year</th>
              <th style={{ textAlign: 'left', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#555', padding: '8px 0', width: '22%' }}>Note</th>
            </tr>
          </thead>
          <tbody>
            {engagements.map((e, i) => (
              <tr key={e.event} style={{ borderBottom: '1px solid #161616', background: i % 2 === 0 ? 'transparent' : '#0d0d0d' }}>
                <td style={{ padding: '13px 0 13px 0', fontSize: 13, color: '#ccc' }}>{e.event}</td>
                <td style={{ padding: '13px 0', fontSize: 12, color: '#888' }}>{e.role}</td>
                <td style={{ padding: '13px 0', fontSize: 12, color: '#888' }}>{e.year}</td>
                <td style={{ padding: '13px 0', fontSize: 11, color: '#555', fontStyle: 'italic' }}>{e.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <Divider />

        {/* Books */}
        <SectionLabel>Published Works</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
          {books.map(b => (
            <div key={b.title} style={{ background: '#111', border: '1px solid #1e1e1e', borderTop: `2px solid ${gold}`, padding: '24px 24px' }}>
              <div style={{ fontSize: 16, fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', color: '#e5e5e5', marginBottom: 10 }}>{b.title}</div>
              <div style={{ fontSize: 12, color: '#888', lineHeight: 1.7, marginBottom: 14 }}>{b.desc}</div>
              <a href={b.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: gold, textDecoration: 'none', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Available on Amazon →
              </a>
            </div>
          ))}
        </div>

        <Divider />

        {/* Topics / Audience */}
        <SectionLabel>Audience Fit</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
          {[
            'Corporate wellness teams',
            'HR & People leaders',
            'Executive leadership forums',
            'Faith-based organisations',
            'NGOs & social impact bodies',
            'Government & policy summits',
            'Marriage & family conferences',
            'Diaspora community events',
            'University & youth conferences',
          ].map(a => (
            <div key={a} style={{ background: '#111', border: '1px solid #1e1e1e', padding: '14px 18px', fontSize: 12, color: '#aaa', display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ color: gold, fontSize: 16, lineHeight: 1 }}>·</span>
              {a}
            </div>
          ))}
        </div>

        <Divider />

        {/* Contact / booking */}
        <SectionLabel>Booking & Press Enquiries</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div style={{ background: '#111', border: '1px solid #1e1e1e', padding: '24px 28px' }}>
            <div style={{ fontSize: 11, color: gold, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>Speaking & Bookings</div>
            <div style={{ fontSize: 13, color: '#bbb', lineHeight: 2 }}>
              <div>templescounsel@gmail.com</div>
              <div>+234 810 905 5475 (WhatsApp)</div>
              <div style={{ marginTop: 8 }}><a href="/" style={{ color: gold, fontSize: 12, textDecoration: 'none' }}>templeobike.com/contact</a></div>
            </div>
          </div>
          <div style={{ background: '#111', border: '1px solid #1e1e1e', padding: '24px 28px' }}>
            <div style={{ fontSize: 11, color: gold, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>Practice & Media</div>
            <div style={{ fontSize: 13, color: '#bbb', lineHeight: 2 }}>
              <div>value@templescounsel.com</div>
              <div><a href="https://templescounsel.com" target="_blank" rel="noopener noreferrer" style={{ color: '#888', textDecoration: 'none' }}>templescounsel.com</a></div>
              <div style={{ fontSize: 12, color: '#555', marginTop: 8 }}>23 Water Corporation Drive, VI, Lagos</div>
            </div>
          </div>
        </div>

        {/* Footer rule */}
        <div style={{ height: 2, background: `linear-gradient(to right, ${gold}, transparent)`, marginTop: 56, marginBottom: 20 }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, color: '#444' }}>
          <span>© 2025 Temple Obike · Temple's Counsel & Mind Academy Ltd.</span>
          <span style={{ color: gold }}>templeobike.com</span>
        </div>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          body { margin: 0; background: #fff !important; color: #111 !important; }
          .print\\:hidden { display: none !important; }
          @page { margin: 18mm; size: A4; }
        }
      `}</style>
    </div>
  );
}
