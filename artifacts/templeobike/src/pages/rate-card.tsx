import logoSrc from '@assets/logo-stacked.png';

// ─── Data ────────────────────────────────────────────────────────────────────

const speaking = [
  { service: 'Full-Day Conference Speaking',  local: '₦1,200,000', intl: '$7,000'  },
  { service: 'Keynote Speech (45–60 mins)',    local: '₦1,000,000', intl: '$5,000'  },
  { service: 'Panel Participation (per hour)', local: '₦1,000,000', intl: '$4,000'  },
];

const corporate = [
  { service: '3-Day Intensive Workshop',              local: '₦2,850,000', intl: '$12,000' },
  { service: 'Full-Day Workshop (6–8 hours)',         local: '₦1,400,000', intl: '$7,000'  },
  { service: 'Half-Day Workshop (3–4 hours)',         local: '₦1,000,000', intl: '$4,000'  },
  { service: 'Virtual Corporate Workshop (per hour)', local: '₦350,000',   intl: '$300'    },
];

const community = [
  {
    service: 'Community Development & Advocacy Speech (45–60 mins)',
    local: '₦500,000',
    intl: '$3,500',
    note: 'Tailored for grassroots initiatives, faith-based organisations, and non-profits.',
  },
  {
    service: 'Social Impact & Mental Health Awareness Workshop (Half-Day)',
    local: '₦700,000',
    intl: '$3,500',
    note: 'Focuses on mental health, social change, and capacity building.',
  },
  {
    service: 'Full-Day Leadership & Capacity-Building Training (6–8 hours)',
    local: '₦1,000,000',
    intl: '$5,500',
    note: 'Equips leaders and volunteers with skills for sustainable impact.',
  },
  {
    service: 'Panel Discussion (per hour)',
    local: '₦400,000',
    intl: '$3,500',
    note: 'Participation in forums, symposiums, or faith-based conferences.',
  },
  {
    service: 'Faith & Personal Development Seminar (45–60 mins)',
    local: '₦500,000',
    intl: '$2,000',
    note: 'Addresses resilience, purpose, and faith-led marital transformation.',
  },
  {
    service: 'Pro Bono Engagements',
    local: 'Logistics Covered',
    intl: '$1,500 + Logistics',
    note: 'Subject to availability and alignment with mission. International engagements carry a nominal honorarium to cover preparation costs.',
  },
  {
    service: 'Virtual Coaching / Training (per hour)',
    local: '₦150,000',
    intl: '$150',
    note: 'Flexible online engagements for global accessibility.',
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeader({ color, title }: { color: string; title: string }) {
  return (
    <tr>
      <td colSpan={3} style={{ padding: '20px 16px 8px', background: '#fafafa', borderTop: '2px solid #e5e5e5' }}>
        <span style={{ color, fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
          {title}
        </span>
      </td>
    </tr>
  );
}

function TableHead() {
  return (
    <tr style={{ background: '#f5f5f5' }}>
      <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#555', borderBottom: '1px solid #e0e0e0', width: '55%' }}>Service</th>
      <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#555', borderBottom: '1px solid #e0e0e0', width: '22%' }}>Local (Nigeria)</th>
      <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#555', borderBottom: '1px solid #e0e0e0', width: '23%' }}>International</th>
    </tr>
  );
}

function Row({ service, local, intl, note, shade }: { service: string; local: string; intl: string; note?: string; shade: boolean }) {
  return (
    <tr style={{ background: shade ? '#fafafa' : '#fff' }}>
      <td style={{ padding: '12px 16px', fontSize: 13, color: '#1a1a1a', borderBottom: '1px solid #f0f0f0', verticalAlign: 'top' }}>
        {service}
        {note && <div style={{ fontSize: 11, color: '#888', marginTop: 3, fontStyle: 'italic' }}>{note}</div>}
      </td>
      <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 600, color: '#1a1a1a', borderBottom: '1px solid #f0f0f0', verticalAlign: 'top' }}>{local}</td>
      <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 600, color: '#1a1a1a', borderBottom: '1px solid #f0f0f0', verticalAlign: 'top' }}>{intl}</td>
    </tr>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RateCard() {
  const gold = '#B8874A';

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: '#fff', minHeight: '100vh', padding: '0 0 60px' }}>

      {/* Print button — hidden in print */}
      <div className="print:hidden" style={{ background: '#0A0A0A', padding: '12px 32px', display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
        <button
          onClick={() => window.print()}
          style={{ background: gold, color: '#fff', border: 'none', padding: '8px 24px', fontWeight: 600, fontSize: 13, cursor: 'pointer', letterSpacing: '0.05em' }}
        >
          Download / Print PDF
        </button>
        <a
          href="/"
          style={{ background: 'transparent', color: '#aaa', border: '1px solid #333', padding: '8px 24px', fontWeight: 500, fontSize: 13, textDecoration: 'none', letterSpacing: '0.05em' }}
        >
          ← Back to Site
        </a>
      </div>

      {/* Document */}
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '40px 32px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <img src={logoSrc} alt="Temple Obike" style={{ width: 110 }} />
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 11, color: '#888', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 4 }}>Confidential — For Enquirers Only</div>
            <div style={{ fontSize: 11, color: '#aaa' }}>templescounsel@gmail.com · +234 810 905 5475</div>
          </div>
        </div>

        {/* Gold rule */}
        <div style={{ height: 3, background: `linear-gradient(to right, ${gold}, transparent)`, marginBottom: 32 }} />

        {/* Title */}
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1a1a1a', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 4 }}>
          Workshop & Speaking Fees
        </h1>
        <p style={{ fontSize: 13, color: '#666', marginBottom: 8 }}>
          <strong>Temple Obike</strong> LMFT · Marriage Coach & Interventionist · Founder, TCMA · Keynote Speaker · Author
        </p>
        <p style={{ fontSize: 12, color: '#888', marginBottom: 32 }}>
          Serving Nigeria (Lagos & Abuja) · Ghana · UK · South Africa · USA · Canada — In-person and Virtual
        </p>

        {/* Intro */}
        <p style={{ fontSize: 13, color: '#444', lineHeight: 1.75, marginBottom: 8 }}>
          At Temple's Counsel & Mind Academy, services are designed to address the unique needs of clients across corporate, community, faith, and clinical settings — from personalised counselling to large-scale keynote addresses and comprehensive Employee Assistance Programmes.
        </p>
        <p style={{ fontSize: 13, color: '#444', lineHeight: 1.75, marginBottom: 32 }}>
          Fees below reflect current rates effective 2025. All local fees are quoted in Nigerian Naira (₦). International fees are quoted in USD. Travel, accommodation, and logistics are additional unless otherwise stated. VAT applicable where required.
        </p>

        {/* Main table */}
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #e5e5e5', marginBottom: 40 }}>
          <tbody>
            {/* Speaking Engagements */}
            <SectionHeader color={gold} title="Speaking Engagements" />
            <TableHead />
            {speaking.map((r, i) => <Row key={r.service} {...r} shade={i % 2 === 1} />)}

            {/* Corporate Workshops */}
            <SectionHeader color={gold} title="Corporate Workshops" />
            <TableHead />
            {corporate.map((r, i) => <Row key={r.service} {...r} shade={i % 2 === 1} />)}

            {/* Community & Humanitarian */}
            <SectionHeader color="#4A7C59" title="Community & Humanitarian Engagements — NGOs, Churches, Social Impact" />
            <TableHead />
            {community.map((r, i) => <Row key={r.service} {...r} shade={i % 2 === 1} />)}
          </tbody>
        </table>

        {/* Notes */}
        <div style={{ background: '#fafafa', border: '1px solid #e5e5e5', padding: '20px 24px', marginBottom: 32, fontSize: 12, color: '#555', lineHeight: 1.8 }}>
          <p style={{ fontWeight: 700, marginBottom: 8, color: '#1a1a1a', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: 11 }}>Terms & Notes</p>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            <li>A <strong>50% deposit</strong> is required to confirm all bookings. Balance is due 7 days before the engagement date.</li>
            <li>For international engagements, economy or business class travel and accommodation are covered by the client unless otherwise agreed in writing.</li>
            <li>Pro bono engagements are accepted at Temple's discretion based on mission alignment and calendar availability.</li>
            <li>Virtual sessions require a stable high-speed internet connection and a professional backdrop on the client's end.</li>
            <li>Cancellations within 14 days of the event forfeit the deposit. Rescheduling is accommodated with 21 days' notice.</li>
            <li>All rates are subject to review. Quoted rates are valid for 30 days from the date this document was shared.</li>
          </ul>
        </div>

        {/* Payment */}
        <div style={{ marginBottom: 32 }}>
          <p style={{ fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', color: gold, marginBottom: 8 }}>Payment</p>
          <p style={{ fontSize: 13, color: '#444', lineHeight: 1.75 }}>
            Make payments to the account below or as stated on the attached invoice.
          </p>
          <div style={{ marginTop: 12, fontSize: 13, color: '#1a1a1a', lineHeight: 2 }}>
            <strong>Account Name:</strong> Temples Counsel & Mind Academy Ltd.<br />
            <strong>Bank:</strong> Zenith Bank Plc.<br />
            <strong>Account No.:</strong> 1221040154
          </div>
        </div>

        {/* Closing */}
        <p style={{ fontSize: 13, color: '#666', lineHeight: 1.75, marginBottom: 4 }}>
          We look forward to a productive partnership and are committed to adding measurable value to your event and audience.
        </p>
        <p style={{ fontSize: 13, color: '#444', fontWeight: 600 }}>Warm regards,<br /><span style={{ color: gold }}>Temple Obike & The TCMA Team</span></p>

        {/* Footer rule */}
        <div style={{ height: 2, background: `linear-gradient(to right, ${gold}, transparent)`, marginTop: 40, marginBottom: 16 }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#aaa' }}>
          <span>23 Water Corporation Drive, Oniru, Victoria Island, Lagos · 22 Kumasi Crescent, Wuse 2, Abuja</span>
          <span>value@templescounsel.com</span>
        </div>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          body { margin: 0; }
          .print\\:hidden { display: none !important; }
          @page { margin: 20mm; size: A4; }
        }
      `}</style>
    </div>
  );
}
