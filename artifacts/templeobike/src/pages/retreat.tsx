import { useState } from 'react';
import logoSrc from '@assets/IMG-20260727-WA0003_1785149135010.jpg';
import bookCoverSrc from '@assets/f123ebc6-1cd8-4218-836b-4da5f9aaa958_1785166711807.png';

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string;
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
const BASE_URL = import.meta.env.BASE_URL?.replace(/\/$/, '') ?? '';

// ─── Types ────────────────────────────────────────────────────────────────────

type Location = 'Accra' | 'Mauritius' | 'Virtual';
type VirtualTier = 'day3' | '2days' | 'all3';
type Status = 'idle' | 'sending' | 'sent' | 'error';

const virtualTiers: { id: VirtualTier; label: string; sub: string; price: string }[] = [
  { id: 'day3',  label: 'Day 3 only',  sub: '1 session',   price: '$200' },
  { id: '2days', label: '2 days',      sub: '2 sessions',  price: '$350' },
  { id: 'all3',  label: 'All 3 days',  sub: 'Full retreat', price: '$500' },
];

interface FormFields {
  name: string;
  partner: string;
  email: string;
  phone: string;
  location: Location | '';
  virtualTier: VirtualTier | '';
  note: string;
  botcheck: string; // honeypot — must stay empty for real users
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const locations = [
  {
    id: 'accra' as const,
    city: 'Accra',
    dates: '8 – 10 Oct 2026',
    rest: 'Rest 10–11 Oct · Fly back to Nigeria',
    price: '$1,990',
    priceNote: 'per couple · 3 nights',
    highlights: [
      'Sunrise session on Labadi Beach',
      'Jamestown lighthouse & harbour walk',
      'Reflection walk at the Kwame Nkrumah Memorial',
      'Osu food & culture night',
    ],
    gradient: 'linear-gradient(135deg, #2b2110, #4a3116)',
    accent: 'rgba(201,162,39,0.35)',
    badge: null,
  },
  {
    id: 'mauritius' as const,
    city: 'Mauritius',
    dates: '22 – 24 Oct 2026',
    rest: 'Rest 24–25 Oct · Fly back to Nigeria',
    price: '$3,200',
    priceNote: 'per couple · 3 nights',
    highlights: [
      'Private catamaran sail along the lagoon',
      'Couple\'s spa evening overlooking the Indian Ocean',
      'Chamarel seven-coloured earth & waterfall walk',
      'Beachfront dinner under the stars',
    ],
    gradient: 'linear-gradient(135deg, #231421, #3a1f34)',
    accent: 'rgba(201,162,39,0.3)',
    badge: '★ Book Launch',
  },
];

// ─── Styles ───────────────────────────────────────────────────────────────────

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,450;9..144,600;9..144,700&family=IBM+Plex+Mono:wght@500&display=swap');
  .retreat-root {
    --ink: #0b0b0a;
    --panel: #16140f;
    --panel-2: #1d1a13;
    --gold: #c9a227;
    --gold-soft: #e2c15c;
    --ember: #8c4a2f;
    --cream: #f3ecdd;
    --stone: #a79c87;
    --line: rgba(243,236,221,0.12);
    font-family: 'Inter', 'DM Sans', sans-serif;
    background: var(--ink);
    color: var(--cream);
    min-height: 100vh;
  }
  .retreat-root h1, .retreat-root h2, .retreat-root h3 {
    font-family: 'Fraunces', Georgia, serif;
    font-weight: 600;
    letter-spacing: -0.01em;
    margin: 0;
  }
  .retreat-eyebrow {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.7rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--gold-soft);
  }
  .retreat-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: var(--gold);
    color: #151107;
    font-weight: 600;
    font-size: 0.9rem;
    padding: 14px 26px;
    text-decoration: none;
    border: none;
    cursor: pointer;
    transition: transform .2s, box-shadow .2s, background .2s;
    font-family: inherit;
    border-radius: 2px;
  }
  .retreat-btn:hover { background: var(--gold-soft); transform: translateY(-1px); box-shadow: 0 8px 24px rgba(201,162,39,0.25); }
  .retreat-btn-ghost {
    background: transparent;
    color: var(--cream);
    border: 1px solid var(--line);
  }
  .retreat-btn-ghost:hover { border-color: var(--gold); color: var(--gold-soft); box-shadow: none; transform: none; }

  .retreat-input {
    width: 100%;
    background: var(--ink);
    border: 1px solid var(--line);
    color: var(--cream);
    padding: 12px 14px;
    font-family: inherit;
    font-size: 0.92rem;
    border-radius: 1px;
    outline: none;
    transition: border-color .2s;
    box-sizing: border-box;
  }
  .retreat-input:focus { border-color: var(--gold); }
  .retreat-label {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.65rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--stone);
    margin-bottom: 7px;
    display: block;
  }
  .retreat-loc-opt input { display: none; }
  .retreat-loc-opt .card {
    border: 1px solid var(--line);
    padding: 12px 10px;
    text-align: center;
    font-size: 0.82rem;
    cursor: pointer;
    transition: border-color .2s, background .2s;
  }
  .retreat-loc-opt input:checked + .card { border-color: var(--gold); background: rgba(201,162,39,0.08); color: var(--gold-soft); }
  .loc-card-hover { transition: border-color .25s, transform .25s; }
  .loc-card-hover:hover { border-color: rgba(201,162,39,0.4) !important; transform: translateY(-4px); }

  /* ── Responsive grids ── */
  .retreat-hero-grid {
    display: grid;
    grid-template-columns: 1.15fr 0.85fr;
    gap: 56px;
    align-items: center;
  }
  .retreat-book-grid {
    display: grid;
    grid-template-columns: 0.9fr 1.1fr;
    gap: 56px;
    align-items: start;
  }
  .retreat-form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  .retreat-loc-grid {
    display: grid;
    grid-template-columns: repeat(3,1fr);
    gap: 10px;
  }
  .retreat-nav-inner {
    max-width: 1120px;
    margin: 0 auto;
    padding: 16px 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .retreat-nav-inner .retreat-btn {
    white-space: nowrap;
    flex-shrink: 0;
  }
  @media (max-width: 768px) {
    .retreat-hero-grid {
      grid-template-columns: 1fr;
      gap: 32px;
    }
    .retreat-book-grid {
      grid-template-columns: 1fr;
      gap: 32px;
    }
    .retreat-form-row {
      grid-template-columns: 1fr;
    }
    .retreat-loc-grid {
      grid-template-columns: 1fr;
    }
    .retreat-nav-inner {
      padding: 14px 18px;
      gap: 12px;
    }
    .retreat-nav-inner span {
      font-size: 0.85rem !important;
    }
  }
`;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Retreat() {
  const [form, setForm] = useState<FormFields>({ name: '', partner: '', email: '', phone: '', location: '', virtualTier: '', note: '', botcheck: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof FormFields, string>>>({});

  const gold = '#c9a227';
  const line = 'rgba(243,236,221,0.12)';
  const stone = '#a79c87';
  const panel = '#16140f';
  const panel2 = '#1d1a13';
  const cream = '#f3ecdd';

  const set = (k: keyof FormFields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.partner.trim()) e.partner = 'Required';
    if (!form.email.match(/^[^@]+@[^@]+\.[^@]+$/)) e.email = 'Valid email required';
    if (!form.phone.trim()) e.phone = 'Required';
    if (!form.location) e.location = 'Please pick a location';
    if (form.location === 'Virtual' && !form.virtualTier) e.virtualTier = 'Please pick a session package';
    return e;
  };

  const virtualTierLabel = (tier: VirtualTier | '') => {
    if (!tier) return '';
    const t = virtualTiers.find(t => t.id === tier);
    return t ? `${t.label} (${t.price}/couple)` : '';
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Honeypot: if a bot filled the hidden field, silently discard
    if (form.botcheck) {
      setStatus('sent');
      setForm({ name: '', partner: '', email: '', phone: '', location: '', virtualTier: '', note: '', botcheck: '' });
      return;
    }
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus('sending');
    try {
      // Save to database (required) and send email (best-effort) in parallel.
      // Success requires DB write to succeed so the enquiry appears in admin.
      const [dbRes, emailRes] = await Promise.allSettled([
        fetch(`${BASE_URL}/api/submissions/retreat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: form.name,
            partner: form.partner,
            email: form.email,
            phone: form.phone,
            location: form.location,
            virtualTier: form.virtualTier || undefined,
            note: form.note || undefined,
          }),
        }).then(r => ({ ok: r.ok })),
        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            to: 'templescounsel@gmail.com',
            subject: `Gold Retreat Booking — ${form.location}${form.location === 'Virtual' ? ` · ${virtualTierLabel(form.virtualTier)}` : ''}`,
            from_name: form.name,
            email: form.email,
            replyto: form.email,
            phone: form.phone,
            partner: form.partner,
            location: form.location,
            ...(form.location === 'Virtual' && { virtual_package: virtualTierLabel(form.virtualTier) }),
            note: form.note || 'Not provided',
            botcheck: '',
          }),
        }).then(r => r.json()),
      ]);
      const dbOk = dbRes.status === 'fulfilled' && (dbRes.value as { ok: boolean }).ok;
      // Success requires the DB write to succeed so the enquiry is always
      // visible in the admin dashboard. Email is best-effort notification only.
      setStatus(dbOk ? 'sent' : 'error');
      if (dbOk) setForm({ name: '', partner: '', email: '', phone: '', location: '', virtualTier: '', note: '', botcheck: '' });
    } catch { setStatus('error'); }
  };

  return (
    <div className="retreat-root">
      <style>{css}</style>

      {/* ── NAV ── */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(11,11,10,0.88)', backdropFilter: 'blur(10px)', borderBottom: `1px solid ${line}` }}>
        <div className="retreat-nav-inner">
          <a href={base || '/'} style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
            <img src={logoSrc} alt="Temple Obike" style={{ width: 34, opacity: 0.9 }} />
            <span style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: '1.05rem', color: cream }}>
              Temple's Counsel <span style={{ color: gold }}>· Mind Academy</span>
            </span>
          </a>
          <a href="#book" className="retreat-btn" style={{ padding: '10px 20px', fontSize: '0.82rem' }}>Reserve Our Spot</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <header style={{
        padding: '90px 0 64px',
        background: `radial-gradient(ellipse 900px 500px at 15% -10%, rgba(201,162,39,0.14), transparent 60%), radial-gradient(ellipse 700px 500px at 100% 10%, rgba(140,74,47,0.16), transparent 55%), #0b0b0a`,
        borderBottom: `1px solid ${line}`,
        overflow: 'hidden',
        position: 'relative',
      }}>
        <div className="retreat-hero-grid" style={{ maxWidth: 1120, margin: '0 auto', padding: '0 28px' }}>

          {/* Left */}
          <div>
            <div className="retreat-eyebrow">Limited Cohorts · October 2026</div>

            <h1 style={{ marginTop: 24, fontSize: '3rem', lineHeight: 1.06, color: cream }}>
              Three nights to reach<br />
              <span style={{ color: '#e2c15c', fontStyle: 'italic', fontWeight: 450 }}>the Gold stage,</span> together.
            </h1>
            <p style={{ color: stone, fontSize: '1rem', maxWidth: '46ch', marginTop: 18, lineHeight: 1.65 }}>
              The Gold Retreat is a private, therapist-led couples experience — launching in Accra and Mauritius, with a virtual seat for couples who can't travel. Mauritius is the book launch weekend.
            </p>
            <p style={{ color: stone, fontSize: '0.9rem', maxWidth: '46ch', marginTop: 10, lineHeight: 1.65 }}>
              Fully managed, start to finish. Book once, send us your passport, and we handle flights, visas, and logistics — you just arrive at the airport with your bags. Everyone flies out together and comes home to Nigeria together.
            </p>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginTop: 20, padding: '10px 16px', border: `1px solid ${line}`, fontSize: '0.78rem', color: stone }}>
              <span style={{ color: '#e2c15c' }}>◆</span> The same season, our friend DJ Irons plays the first-ever DJ set at the summit of Kilimanjaro. Different trip, same milestone season.
            </div>

            <div style={{ display: 'flex', gap: 14, marginTop: 28, flexWrap: 'wrap' as const }}>
              <a href="#book" className="retreat-btn">Pre-Book Your Retreat</a>
              <a href="#locations" className="retreat-btn retreat-btn-ghost">See the Locations</a>
            </div>
          </div>

          {/* Right — book card */}
          <div style={{ background: panel, border: `1px solid ${line}`, padding: 28, position: 'relative' }}>
            <div style={{ position: 'absolute', inset: -1, border: '1px solid rgba(201,162,39,0.25)', pointerEvents: 'none' }} />
            <div className="retreat-eyebrow" style={{ marginBottom: 12 }}>Launching With The Book</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14 }}>
              <img src={bookCoverSrc} alt="New book — coming soon" style={{ width: 70, flexShrink: 0, boxShadow: '0 8px 24px rgba(0,0,0,0.6)', filter: 'blur(4px)' }} draggable={false} />
              <div>
                <h3 style={{ fontSize: '1.2rem', color: cream, marginBottom: 6 }}>New Book<br /><span style={{ color: '#e2c15c', fontSize: '0.85rem', fontStyle: 'italic' }}>Coming Soon</span></h3>
                <div style={{ fontSize: '0.7rem', color: stone, letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>© 2026 Temple Obike · All rights reserved</div>
              </div>
            </div>
            <p style={{ color: stone, fontSize: '0.88rem', marginBottom: 14, lineHeight: 1.65 }}>
              Every couple who books The Gold Retreat receives the book on day one — signed in person at the Mauritius launch, or shipped ahead for Accra and virtual attendees.
            </p>
            <ul style={{ margin: '0 0 20px', padding: 0, listStyle: 'none' }}>
              {[
                'Written by Temple Obike — psychotherapist & relationship interventionist',
                'The five-stage framework the retreat is built around, taught live',
                'A guided companion workbook you\'ll actually use during your sessions',
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', gap: 10, fontSize: '0.86rem', color: cream, padding: '7px 0', borderTop: i > 0 ? `1px solid ${line}` : 'none' }}>
                  <span style={{ color: gold, flexShrink: 0 }}>—</span> {item}
                </li>
              ))}
            </ul>
            <a href="#book" className="retreat-btn" style={{ width: '100%', justifyContent: 'center' }}>Reserve Our Spot</a>
          </div>

        </div>
      </header>

      {/* ── LOCATIONS ── */}
      <section id="locations" style={{ padding: '78px 0', borderBottom: `1px solid ${line}` }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 28px' }}>
          <div style={{ maxWidth: 640, marginBottom: 44 }}>
            <div className="retreat-eyebrow">Choose Your Setting</div>
            <h2 style={{ fontSize: '2rem', color: cream, marginTop: 12 }}>One retreat. Two settings. Your choice.</h2>
            <p style={{ color: stone, marginTop: 14, lineHeight: 1.7 }}>
              Each location runs the same 3-night private curriculum — guided sessions each morning, free time to enjoy each other in the afternoon, and an evening ritual built around the day's stage of the model.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 22, maxWidth: 820, margin: '0 auto' }}>
            {locations.map(loc => (
              <div key={loc.id} className="loc-card-hover" style={{ background: panel, border: `1px solid ${line}`, display: 'flex', flexDirection: 'column' as const, position: 'relative' }}>
                {loc.badge && (
                  <div style={{ position: 'absolute', top: 12, right: 12, background: gold, color: '#151107', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' as const, padding: '4px 10px', zIndex: 2 }}>
                    {loc.badge}
                  </div>
                )}
                {/* Photo */}
                <div style={{
                  height: 160, position: 'relative' as const,
                  background: `${loc.gradient}, radial-gradient(circle at 70% 30%, ${loc.accent}, transparent 55%)`,
                  display: 'flex', alignItems: 'flex-end', padding: 16,
                }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0) 20%, rgba(0,0,0,0.75) 100%)' }} />
                  <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: '1.5rem', color: '#fff', position: 'relative', zIndex: 2 }}>{loc.city}</div>
                </div>
                {/* Body */}
                <div style={{ padding: '18px 20px 22px', display: 'flex', flexDirection: 'column' as const, gap: 12, flex: 1 }}>
                  {/* Dates */}
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.68rem', color: '#e2c15c', letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>
                    {loc.dates}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: stone, marginTop: -6 }}>{loc.rest}</div>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
                    {loc.highlights.map((h, i) => (
                      <li key={i} style={{ fontSize: '0.85rem', color: stone, display: 'flex', gap: 9 }}>
                        <span style={{ color: gold, flexShrink: 0 }}>✧</span> {h}
                      </li>
                    ))}
                  </ul>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.68rem', letterSpacing: '0.06em', color: '#e2c15c', textTransform: 'uppercase' as const }}>
                    + more, revealed on booking
                  </div>
                  <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 14, borderTop: `1px solid ${line}` }}>
                    <div>
                      <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: '1.15rem', color: cream }}>{loc.price}</div>
                      <div style={{ fontSize: '0.7rem', color: stone }}>{loc.priceNote}</div>
                    </div>
                    <a href="#book" onClick={() => setForm(f => ({ ...f, location: loc.city as Location }))}
                      style={{ fontSize: '0.78rem', color: stone, textDecoration: 'none', borderBottom: `1px solid ${line}`, paddingBottom: 2 }}>
                      Pick {loc.city} →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Virtual strip */}
          <div style={{ marginTop: 22, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' as const, background: panel2, border: `1px dashed ${line}`, padding: '22px 26px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', border: `1px solid ${gold}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e2c15c', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.85rem', flexShrink: 0 }}>V</div>
              <div>
                <h4 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: '1.1rem', color: cream, margin: '0 0 4px' }}>Can't travel? Join virtually.</h4>
                <p style={{ margin: 0, color: stone, fontSize: '0.87rem', maxWidth: '52ch' }}>The same 3-night curriculum, delivered live over private video sessions, with your workbook shipped ahead of time. Built for couples anywhere in the world.</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' as const }}>
              {virtualTiers.map(t => (
                <div key={t.id} style={{ textAlign: 'center' as const, padding: '10px 14px', border: `1px solid ${line}`, minWidth: 80 }}>
                  <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: '1.1rem', color: '#e2c15c' }}>{t.price}</div>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.62rem', letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: stone, marginTop: 3 }}>{t.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" style={{ padding: '78px 0', borderBottom: `1px solid ${line}` }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 28px' }}>
          <div style={{ maxWidth: 640, marginBottom: 44 }}>
            <div className="retreat-eyebrow">How It Works</div>
            <h2 style={{ fontSize: '2rem', color: cream, marginTop: 12 }}>You just have to show up.</h2>
            <p style={{ color: stone, marginTop: 14, lineHeight: 1.7 }}>This isn't a DIY trip. Book once, and we take care of everything else — you won't touch a booking site or a visa portal again.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 22 }}>
            {[
              { step: 'Step 1', title: 'Pay & book', body: 'One payment secures your couple\'s seat and your chosen destination. No instalments, no second payment later.' },
              { step: 'Step 2', title: 'Send your passport', body: 'We handle flights, visas, and every travel detail on your behalf — you don\'t lift a finger.' },
              { step: 'Step 3', title: 'Show up with your bags', body: 'We fly out together as a group and fly home to Nigeria together — with real time to relax, connect, and be with each other along the way.' },
            ].map(s => (
              <div key={s.step} style={{ background: panel, border: `1px solid ${line}`, padding: 26 }}>
                <div className="retreat-eyebrow" style={{ marginBottom: 12 }}>{s.step}</div>
                <h3 style={{ fontSize: '1.2rem', color: cream, marginBottom: 10 }}>{s.title}</h3>
                <p style={{ color: stone, fontSize: '0.88rem', margin: 0, lineHeight: 1.65 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOKING FORM ── */}
      <section id="book" style={{ padding: '78px 0', background: panel }}>
        <div className="retreat-book-grid" style={{ maxWidth: 1120, margin: '0 auto', padding: '0 28px' }}>

          {/* Left */}
          <div>
            <div className="retreat-eyebrow">Limited Cohorts Per City</div>
            <h2 style={{ fontSize: '2rem', color: cream, marginTop: 12, marginBottom: 16 }}>Pre-book your spot</h2>
            <p style={{ color: stone, lineHeight: 1.7 }}>Seats are held in the order deposits come in. Fill this in to lock your preferred city — our team will follow up by email and WhatsApp with dates and payment details.</p>
            <div style={{ marginTop: 26, paddingTop: 22, borderTop: `1px solid ${line}`, fontSize: '0.85rem', color: stone, lineHeight: 1.8 }}>
              <div><strong style={{ color: cream }}>Accra</strong> — $1,990 per couple · 8–10 Oct 2026</div>
              <div><strong style={{ color: cream }}>Mauritius</strong> — $3,200 per couple · 22–24 Oct 2026 <span style={{ color: '#e2c15c' }}>★ Book launch</span></div>
              <div><strong style={{ color: cream }}>Virtual</strong> — $200 · $350 · $500 per couple</div>
              <div style={{ fontSize: '0.76rem', paddingLeft: 8 }}>Day 3 only · 2 days · All 3 days</div>
              <div style={{ marginTop: 10, fontSize: '0.78rem' }}>Flights, visas & logistics included in all in-person packages.</div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column' as const, gap: 16 }}>
            {/* Honeypot — hidden from real users; bots fill it in, causing the submission to be discarded */}
            <input type="text" name="botcheck" value={form.botcheck} onChange={set('botcheck')} tabIndex={-1} autoComplete="off" style={{ display: 'none' }} aria-hidden="true" />
            <div className="retreat-form-row">
              <div>
                <label className="retreat-label" htmlFor="name">Your Name</label>
                <input id="name" className="retreat-input" value={form.name} onChange={set('name')} placeholder="First & last name" />
                {errors.name && <div style={{ color: '#e2c15c', fontSize: '0.72rem', marginTop: 4 }}>{errors.name}</div>}
              </div>
              <div>
                <label className="retreat-label" htmlFor="partner">Partner's Name</label>
                <input id="partner" className="retreat-input" value={form.partner} onChange={set('partner')} placeholder="First & last name" />
                {errors.partner && <div style={{ color: '#e2c15c', fontSize: '0.72rem', marginTop: 4 }}>{errors.partner}</div>}
              </div>
            </div>

            <div className="retreat-form-row">
              <div>
                <label className="retreat-label" htmlFor="email">Email</label>
                <input id="email" type="email" className="retreat-input" value={form.email} onChange={set('email')} placeholder="you@email.com" />
                {errors.email && <div style={{ color: '#e2c15c', fontSize: '0.72rem', marginTop: 4 }}>{errors.email}</div>}
              </div>
              <div>
                <label className="retreat-label" htmlFor="phone">Phone / WhatsApp</label>
                <input id="phone" type="tel" className="retreat-input" value={form.phone} onChange={set('phone')} placeholder="+234 ..." />
                {errors.phone && <div style={{ color: '#e2c15c', fontSize: '0.72rem', marginTop: 4 }}>{errors.phone}</div>}
              </div>
            </div>

            <div>
              <label className="retreat-label">Preferred Location</label>
              <div className="retreat-loc-grid">
                {(['Accra', 'Mauritius', 'Virtual'] as Location[]).map(loc => (
                  <label key={loc} className="retreat-loc-opt" style={{ cursor: 'pointer' }}>
                    <input type="radio" name="location" value={loc} checked={form.location === loc} onChange={() => setForm(f => ({ ...f, location: loc }))} />
                    <div className="card">
                      {loc}
                      <small style={{ display: 'block', color: stone, fontSize: '0.68rem', marginTop: 3 }}>
                        {loc === 'Accra' ? '$1,990' : loc === 'Mauritius' ? '$3,200' : 'from $200'}
                      </small>
                    </div>
                  </label>
                ))}
              </div>
              {errors.location && <div style={{ color: '#e2c15c', fontSize: '0.72rem', marginTop: 4 }}>{errors.location}</div>}
            </div>

            {form.location === 'Virtual' && (
              <div>
                <label className="retreat-label">Virtual Session Package</label>
                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
                  {virtualTiers.map(t => (
                    <label key={t.id} className="retreat-loc-opt" style={{ cursor: 'pointer' }}>
                      <input type="radio" name="virtualTier" value={t.id} checked={form.virtualTier === t.id} onChange={() => setForm(f => ({ ...f, virtualTier: t.id }))} />
                      <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left' as const, padding: '11px 14px' }}>
                        <div>
                          <span style={{ fontWeight: 600 }}>{t.label}</span>
                          <small style={{ display: 'block', color: stone, fontSize: '0.68rem', marginTop: 2 }}>{t.sub}</small>
                        </div>
                        <span style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: '1rem' }}>{t.price}</span>
                      </div>
                    </label>
                  ))}
                </div>
                {errors.virtualTier && <div style={{ color: '#e2c15c', fontSize: '0.72rem', marginTop: 4 }}>{errors.virtualTier}</div>}
              </div>
            )}

            <div>
              <label className="retreat-label" htmlFor="note">Anything we should know? (optional)</label>
              <textarea id="note" rows={3} className="retreat-input" value={form.note} onChange={set('note')} placeholder="Anniversary trip, first retreat, dietary needs, etc." style={{ resize: 'vertical' as const }} />
            </div>

            {status === 'sent' ? (
              <div style={{ padding: '16px 18px', border: '1px solid rgba(201,162,39,0.4)', background: 'rgba(201,162,39,0.06)', color: '#e2c15c', fontSize: '0.9rem' }}>
                Thank you — your spot request for {form.location || 'the retreat'} has been noted. We'll follow up by email and WhatsApp shortly.
              </div>
            ) : (
              <>
                <button type="submit" className="retreat-btn" style={{ alignSelf: 'flex-start', opacity: status === 'sending' ? 0.6 : 1 }} disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Reserve Our Spot'}
                </button>
                {status === 'error' && <div style={{ color: '#e2c15c', fontSize: '0.8rem' }}>Something went wrong — please email us directly at templescounsel@gmail.com</div>}
                <div style={{ fontSize: '0.76rem', color: stone, lineHeight: 1.6 }}>No payment is taken now — this reserves your seat. Once confirmed, we'll send payment details and request a copy of each partner's passport so we can arrange your flights and visa.</div>
              </>
            )}
          </form>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding: '40px 28px', textAlign: 'center' as const, borderTop: `1px solid ${line}` }}>
        <p style={{ color: stone, fontSize: '0.82rem' }}>
          The Gold Retreat is hosted by Temple's Counsel & Mind Academy.
          Questions? <a href="mailto:templescounsel@gmail.com" style={{ color: '#e2c15c', textDecoration: 'none' }}>templescounsel@gmail.com</a>
          &nbsp;·&nbsp;
          <a href={base || '/'} style={{ color: stone, textDecoration: 'none' }}>← Back to templeobike.com</a>
        </p>
        <p style={{ color: stone, fontSize: '0.72rem', marginTop: 8, opacity: 0.5 }}>
          © {new Date().getFullYear()} Temple Obike · Temple's Counsel & Mind Academy Ltd. This event and its associated intellectual property are protected works. All rights reserved.
        </p>
      </footer>

    </div>
  );
}
