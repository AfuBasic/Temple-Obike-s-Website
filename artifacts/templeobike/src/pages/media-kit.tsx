import { SiteNav } from '../components/SiteNav';
import logoSrc from '@assets/logo-stacked.png';
import stageSrc from '@assets/Screenshot_20260727_110019_Gallery_1785147430425.jpg';
import searchConsoleSrc from '@assets/Screenshot_20260727-130611_1785154220443.jpg';
import businessElitesCover from '@assets/images_(9)_1785168480508.jpeg';
import ferrgCover from '@assets/f123ebc6-1cd8-4218-836b-4da5f9aaa958_1785166711807.png';
import soulBodegaCover from '@assets/51fywa6zgzL._UF1000,1000_QL80_FMwebp__1785167488103.webp';
import authenticSelfCover from '@assets/71rO8W-nZZL._UF1000,1000_QL80_FMwebp__1785167488165.webp';

const gold = '#B8874A';
const dark = '#0A0A0A';
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
const resolveLink = (link: string) => link.startsWith('/') ? `${base}${link}` : link;

// ─── Data ─────────────────────────────────────────────────────────────────────

const stats = [
  { figure: '2,380+',      label: 'Hours of live therapy sessions' },
  { figure: '2.3M+',       label: 'Online readers reached since 2021' },
  { figure: '70%',         label: 'Diaspora client base (UK, US, Canada)' },
  { figure: '9+',          label: 'Keynote & speaking engagements' },
  { figure: '2',           label: 'Published books on Amazon' },
  { figure: '15+ years',   label: 'In practice & community advocacy' },
];

const searchStats = [
  { figure: '3.4M',   label: 'Google Search impressions', sub: '16-month period' },
  { figure: '36.7K',  label: 'Organic clicks from search', sub: '16-month period' },
  { figure: '7.5',    label: 'Average Google ranking position', sub: 'Top 10 consistently' },
  { figure: '254+',   label: 'Indexed pages on Google', sub: 'templescounsel.com' },
];

const topPages = [
  { path: 'How to Handle Your Partner\'s Sexual Past (Retroactive Jealousy)', clicks: '20,911', impressions: '1,129,242' },
  { path: 'Powerful Ways to Stop the Four Horsemen That Ruins Marriages', clicks: '5,744', impressions: '709,902' },
  { path: 'Book Appointment', clicks: '1,470', impressions: '101,730' },
  { path: 'Emotional Affairs — How to Get Yourself Back', clicks: '835', impressions: '39,085' },
  { path: 'Hero Syndrome Psychology', clicks: '709', impressions: '94,892' },
];

const credentials = [
  'Licensed Marriage and Family Therapist (LMFT)',
  'Marriage Coach and Interventionist',
  'Professional Counselling Certificate — Institute of Counseling Nigeria',
  'John Maxwell Leadership Programme Certification',
  'Founder & CEO, Temple\'s Counsel & Mind Academy Ltd. (TCMA)',
  'Employee Assistance Practitioner (EAP)',
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

const media = [
  {
    title: 'NTA Interview',
    description: 'Temple Obike featured on NTA — Nigeria\'s national television network — discussing mental health, relationships, and societal wellbeing.',
    outlet: 'NTA (Nigerian Television Authority)',
    type: 'Television Feature',
    url: 'https://youtu.be/z3Ofsd6z9z8?feature=shared',
    videoId: 'z3Ofsd6z9z8',
    kind: 'video' as const,
  },
  {
    title: '"Passion is 80% of the Success Game"',
    description: 'Business Elites Africa profiles Temple Obike on the psychology of passion, purpose, and professional success — and what separates those who thrive from those who stall. Featured in their Top 30 Branding & PR Elites in Africa edition.',
    outlet: 'Business Elites Africa',
    type: 'Press Feature',
    url: 'https://businesselitesafrica.com/2022/12/11/passion-is-80-of-the-success-game-temple-obike/',
    videoId: '',
    kind: 'article' as const,
    image: businessElitesCover,
  },
  {
    title: 'Video Feature',
    description: 'Temple Obike on the psychological and relational dimensions of personal growth, purpose, and thriving in life and marriage.',
    outlet: 'YouTube',
    type: 'Video Feature',
    url: 'https://www.youtube.com/watch?v=Q545Qw5GSGc',
    videoId: 'Q545Qw5GSGc',
    kind: 'video' as const,
  },
  {
    title: 'Video Feature',
    description: 'Temple Obike speaks on navigating emotional health, relationships, and the mental wellness journey across cultures and generations.',
    outlet: 'YouTube',
    type: 'Video Feature',
    url: 'https://www.youtube.com/watch?v=8qDDxZBEQ2g',
    videoId: '8qDDxZBEQ2g',
    kind: 'video' as const,
  },
  {
    title: 'Video Feature',
    description: 'Temple Obike in conversation on relationships, emotional health, and personal development.',
    outlet: 'YouTube',
    type: 'Video Feature',
    url: 'https://youtu.be/dN7-0VUieao',
    videoId: 'dN7-0VUieao',
    kind: 'video' as const,
  },
  {
    title: 'Video Feature',
    description: 'Temple Obike speaks on identity, purpose, and the psychology of thriving in life and marriage.',
    outlet: 'YouTube',
    type: 'Video Feature',
    url: 'https://youtu.be/vRm06sPjJEU',
    videoId: 'vRm06sPjJEU',
    kind: 'video' as const,
  },
  {
    title: 'Video Feature',
    description: 'A candid session with Temple Obike covering mental wellness, relational repair, and emotional intelligence.',
    outlet: 'YouTube',
    type: 'Video Feature',
    url: 'https://youtu.be/PEpdwbLtSfA',
    videoId: 'PEpdwbLtSfA',
    kind: 'video' as const,
  },
  {
    title: 'Video Feature',
    description: 'Temple Obike on the intersection of faith, leadership, and the modern African family.',
    outlet: 'YouTube',
    type: 'Video Feature',
    url: 'https://youtu.be/DD36lE3XpCk',
    videoId: 'DD36lE3XpCk',
    kind: 'video' as const,
  },
  {
    title: 'Video Feature',
    description: 'Temple Obike shares insight on rebuilding trust, navigating grief, and the architecture of lasting relationships.',
    outlet: 'YouTube',
    type: 'Video Feature',
    url: 'https://youtu.be/MSh8ewDzbtQ',
    videoId: 'MSh8ewDzbtQ',
    kind: 'video' as const,
  },
  {
    title: 'Live Webinar — Prioritising Mental Health',
    description: 'Temple Obike leads a live audience webinar on relationship dynamics, emotional health, and practical frameworks for personal transformation.',
    outlet: 'YouTube Live Webinar',
    type: 'Webinar Recording',
    url: 'https://www.youtube.com/watch?v=GM5k6DRz6DU',
    videoId: 'GM5k6DRz6DU',
    kind: 'video' as const,
  },
];

const books = [
  {
    title: 'Soul Bodega',
    subtitle: 'Your Straightforward Guide to Cleaning Up Negative Emotions & Habits',
    desc: 'A practical guide to identifying and releasing the emotional patterns and habits that quietly hold people back from the life and relationships they want.',
    link: 'https://www.amazon.com/Soul-Bodega-Straightforward-Cleaning-Negative-ebook/dp/B09C42J7HM',
    cover: soulBodegaCover,
  },
  {
    title: 'Discover Your Best Authentic Self',
    subtitle: 'A Waste No Time Series Workbook',
    desc: 'A workbook dedicated to helping readers start the quick journey toward their truest, most purposeful self — practical, direct, and designed for action.',
    link: 'https://www.amazon.com/Discover-Your-Best-Authentic-Self-ebook/dp/B0BRHJ4B8T',
    cover: authenticSelfCover,
  },
  {
    title: 'New Book — Coming Soon',
    subtitle: '© 2026 Temple Obike · All Rights Reserved',
    desc: 'Coming Soon. A groundbreaking framework for couples who love each other but need more than love to build something lasting. Pre-order is open — free to reserve.',
    link: '/ferrg-book',
    cover: ferrgCover,
    badge: 'Coming Soon',
    blurCover: true,
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

      <SiteNav />

      {/* Top bar — print action, shown below the fixed nav */}
      <div className="print:hidden" style={{ marginTop: 64, background: '#111', borderBottom: '1px solid #1e1e1e', padding: '12px 32px', display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
        <button
          onClick={() => window.print()}
          style={{ background: gold, color: '#fff', border: 'none', padding: '8px 22px', fontWeight: 600, fontSize: 12, cursor: 'pointer', letterSpacing: '0.06em' }}
        >
          Download / Print PDF
        </button>
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
              Official Media Kit · {new Date().getFullYear()}
            </div>
            <h1 style={{ fontSize: 42, fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600, color: '#fff', lineHeight: 1.1, margin: 0 }}>
              Temple Obike
            </h1>
            <p style={{ fontSize: 14, color: '#aaa', marginTop: 8, letterSpacing: '0.04em' }}>
              LMFT · Marriage Coach & Interventionist · Founder, TCMA · Keynote Speaker · Author
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '56px 40px 80px' }}>

        {/* Short bio */}
        <SectionLabel>Short Bio (for event programmes)</SectionLabel>
        <p style={{ fontSize: 15, lineHeight: 1.85, color: '#ccc', background: '#111', border: '1px solid #1e1e1e', padding: '24px 28px', borderLeft: `3px solid ${gold}` }}>
          Temple Obike (LMFT) is a Lagos-based Licensed Marriage and Family Therapist, marriage coach and interventionist, keynote speaker, entrepreneur, and three-time published author. He is the Founder and CEO of Temple's Counsel & Mind Academy, one of Nigeria's most recognised relationship and mental wellness brands, with offices in Victoria Island, Lagos and Wuse 2, Abuja. He has logged over 2,380 hours of live therapy sessions and reached more than 2,300,000 readers online since 2021. Seventy percent of his clients are drawn from the global diaspora across the UK, US, Canada, and South Africa. He is the author of <em>Soul Bodega</em> and <em>Discover Your Best Authentic Self</em>, both available on Amazon, with a new book coming soon in 2026.
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
            He is the author of <em>Soul Bodega</em> and <em>Discover Your Best Authentic Self</em>, both available on Amazon, with a new book forthcoming in 2026. He is married to his primary school sweetheart; they are raising four children together. That personal foundation gives his work on marriage a credibility no qualification alone can confer.
          </p>
        </div>

        <Divider />

        {/* Published Works — after full bio */}
        <SectionLabel>Published Works</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20, marginBottom: 28 }}>
          {books.map(b => {
            const isInternal = b.link.startsWith('/');
            const isComing = !!(b as any).badge;
            return (
              <div key={b.title} style={{ position: 'relative', display: 'flex', flexDirection: 'column', background: '#111', border: '1px solid #1e1e1e' }}>
                {/* Cover area */}
                {b.cover && (
                  <div style={{ background: '#0a0a0a', display: 'flex', justifyContent: 'center', padding: '20px 20px 16px', position: 'relative', overflow: 'hidden' }}>
                    <img
                      src={b.cover}
                      alt={b.title}
                      style={{ width: 120, height: 'auto', display: 'block', boxShadow: '0 8px 24px rgba(0,0,0,0.6)', filter: isComing ? 'blur(4px)' : 'none', transition: 'filter 0.3s' }}
                    />
                    {isComing && (
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                        <div style={{ background: gold, color: '#0a0a0a', fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '4px 12px' }}>
                          Coming Soon
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {/* Text */}
                <div style={{ padding: '18px 20px 20px', borderTop: `2px solid ${gold}`, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: 15, fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', color: '#e5e5e5', marginBottom: 6, lineHeight: 1.3 }}>{b.title}</div>
                  {b.subtitle && <div style={{ fontSize: 10, color: gold, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>{b.subtitle}</div>}
                  <div style={{ fontSize: 12, color: '#888', lineHeight: 1.7, marginBottom: 14, flex: 1 }}>{b.desc}</div>
                  <a
                    href={resolveLink(b.link)}
                    target={isInternal ? '_self' : '_blank'}
                    rel={isInternal ? '' : 'noopener noreferrer'}
                    style={{ fontSize: 11, color: gold, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none' }}
                  >
                    {isInternal ? 'Reserve Your Copy →' : 'Available on Amazon →'}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
        {/* Pre-order CTA for FERRG */}
        <a
          href={resolveLink('/ferrg-book')}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#111', border: `1px solid ${gold}`, padding: '18px 24px', textDecoration: 'none', marginBottom: 0 }}
        >
          <div>
            <div style={{ fontSize: 10, color: gold, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 4 }}>New Book — Free Pre-Order Open</div>
            <div style={{ fontSize: 14, color: '#e5e5e5', fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic' }}>New Book — Reserve your copy before it drops</div>
          </div>
          <div style={{ color: gold, fontSize: 20, marginLeft: 24, flexShrink: 0 }}>→</div>
        </a>

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

        {/* Digital reach */}
        <SectionLabel>Digital Reach — Google Search (16 months, templescounsel.com)</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
          {searchStats.map(s => (
            <div key={s.label} style={{ background: '#111', border: '1px solid #1e1e1e', padding: '22px 24px' }}>
              <div style={{ fontSize: 30, fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600, color: gold, lineHeight: 1 }}>{s.figure}</div>
              <div style={{ fontSize: 12, color: '#888', marginTop: 8, lineHeight: 1.5 }}>{s.label}</div>
              <div style={{ fontSize: 10, color: '#555', marginTop: 4, letterSpacing: '0.05em' }}>{s.sub}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#111', border: '1px solid #1e1e1e', padding: '20px 24px' }}>
          <div style={{ fontSize: 10, color: gold, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 14 }}>Top Performing Content</div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1e1e1e' }}>
                <th style={{ textAlign: 'left', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555', padding: '6px 0', width: '60%' }}>Article</th>
                <th style={{ textAlign: 'right', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555', padding: '6px 8px' }}>Clicks</th>
                <th style={{ textAlign: 'right', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555', padding: '6px 0' }}>Impressions</th>
              </tr>
            </thead>
            <tbody>
              {topPages.map((p, i) => (
                <tr key={p.path} style={{ borderBottom: i < topPages.length - 1 ? '1px solid #161616' : 'none' }}>
                  <td style={{ padding: '11px 0', fontSize: 12, color: '#aaa', lineHeight: 1.4 }}>{p.path}</td>
                  <td style={{ padding: '11px 8px', fontSize: 12, fontWeight: 600, color: gold, textAlign: 'right' }}>{p.clicks}</td>
                  <td style={{ padding: '11px 0', fontSize: 12, color: '#666', textAlign: 'right' }}>{p.impressions}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: 14, fontSize: 11, color: '#444', fontStyle: 'italic' }}>
            Source: Google Search Console · Data period: March 2025 – July 2026 · 254+ pages indexed
          </div>
          <details style={{ marginTop: 16 }}>
            <summary style={{
              cursor: 'pointer',
              fontSize: 12,
              color: gold,
              letterSpacing: '0.08em',
              userSelect: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              listStyle: 'none',
              outline: 'none',
            }}>
              <span style={{ fontSize: 10 }}>▶</span> View source screenshot
            </summary>
            <div style={{ marginTop: 16, borderTop: '1px solid #1e1e1e', paddingTop: 16 }}>
              <img
                src={searchConsoleSrc}
                alt="Google Search Console screenshot — templescounsel.com performance data"
                style={{ maxWidth: '100%', width: 420, display: 'block', border: '1px solid #2a2a2a' }}
              />
              <div style={{ marginTop: 8, fontSize: 10, color: '#444', fontStyle: 'italic' }}>
                Google Search Console · templescounsel.com · Screenshot taken 27 July 2026
              </div>
            </div>
          </details>
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

        {/* Press & Media */}
        <SectionLabel>Press & Media Appearances</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 20 }}>
          {media.map(m => (
            <a
              key={m.url}
              href={m.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'block', textDecoration: 'none', background: '#111', border: '1px solid #1e1e1e', overflow: 'hidden' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = gold)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = '#1e1e1e')}
            >
              {m.kind === 'video' ? (
                /* ── Video card: YouTube thumbnail + play button ── */
                <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', background: '#0d0d0d', overflow: 'hidden' }}>
                  <img
                    src={`https://img.youtube.com/vi/${m.videoId}/hqdefault.jpg`}
                    alt={m.title}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.85)' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(0,0,0,0.65)', border: `2px solid ${gold}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: 0, height: 0, borderTop: '10px solid transparent', borderBottom: '10px solid transparent', borderLeft: `16px solid ${gold}`, marginLeft: 4 }} />
                    </div>
                  </div>
                  <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(0,0,0,0.75)', border: `1px solid ${gold}`, padding: '3px 10px', fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: gold }}>
                    {m.type}
                  </div>
                </div>
              ) : (m as any).image ? (
                /* ── Article card: real cover image ── */
                <div style={{ position: 'relative', width: '100%', overflow: 'hidden', background: '#0d0d0d' }}>
                  <img
                    src={(m as any).image}
                    alt={m.title}
                    style={{ width: '100%', height: 200, objectFit: 'cover', objectPosition: 'top', display: 'block', filter: 'brightness(0.9)' }}
                  />
                  <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(0,0,0,0.75)', border: `1px solid ${gold}`, padding: '3px 10px', fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: gold }}>
                    {m.type}
                  </div>
                </div>
              ) : (
                /* ── Article card: typographic header band ── */
                <div style={{ background: '#0d0d0d', borderBottom: '1px solid #1e1e1e', padding: '24px 22px', display: 'flex', alignItems: 'center', gap: 16, minHeight: 100 }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', border: `1.5px solid ${gold}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: 18, color: gold, lineHeight: 1 }}>✦</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 9, color: gold, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 4 }}>{m.type}</div>
                    <div style={{ fontSize: 12, color: '#aaa' }}>{m.outlet}</div>
                  </div>
                </div>
              )}

              {/* Text body — shared */}
              <div style={{ padding: '20px 22px 22px' }}>
                <div style={{ fontSize: 10, color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>{m.outlet}</div>
                <div style={{ fontSize: 15, fontFamily: "'Playfair Display', Georgia, serif", color: '#e5e5e5', marginBottom: 10, lineHeight: 1.35 }}>{m.title}</div>
                <p style={{ fontSize: 12, color: '#777', lineHeight: 1.7, margin: 0 }}>{m.description}</p>
                <div style={{ marginTop: 14, fontSize: 11, color: gold, letterSpacing: '0.06em' }}>
                  {m.kind === 'video' ? 'Watch on YouTube →' : 'Read the feature →'}
                </div>
              </div>
            </a>
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
