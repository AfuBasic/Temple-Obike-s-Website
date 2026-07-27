import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Radio, Tv, Video, Users, MessageSquare, Mic, Building2, Star, Globe } from 'lucide-react';
import stageSrc from '@assets/Screenshot_20260727_101338_Gallery_1785143683280.jpg';
import logoSrc from '@assets/IMG-20260727-WA0003_1785149135010.jpg';

type FormatIcon = 'radio' | 'tv' | 'webinar' | 'webinar2' | 'event' | 'panel' | 'keynote' | 'symposium' | 'stage';

interface Engagement {
  id: number;
  venue: string;
  topic: string;
  date: string;
  format: string;
  formatIcon: FormatIcon;
  hasPhoto: boolean;
  description: string;
  highlight?: string; // optional badge label
}

// Sorted most-recent first
const engagements: Engagement[] = [
  {
    id: 1,
    venue: "Lights On — Global Couples Webinar",
    topic: "How Difficult Marriages Are Navigated & Trust Rebuilt",
    date: "June 2026",
    format: "Live Virtual Webinar · 242+ Couples · Nigeria & Worldwide",
    formatIcon: "webinar2",
    hasPhoto: false,
    highlight: "242+ Couples Worldwide",
    description:
      "On 20 June 2026, Temple hosted Lights On — a landmark virtual event that drew over 242 couples from Nigeria and across the world into one of the most candid, guided conversations ever held about surviving the hardest seasons of marriage. The webinar walked couples through how difficult marriages are navigated without fracture, how trust is rebuilt methodically after it has been broken, how curiosity and desire are reclaimed, and how forgiveness becomes a sustained daily practice rather than a single emotional moment. For the erring partner, the session provided a clear, actionable framework: how to remain consistent in verification, how to become genuinely affair-proof through radical transparency, and how to build the shared mutual values that close the doors that once stood open. Lights On was not a lecture — it was a room where real couples were given a roadmap.",
  },
  {
    id: 2,
    venue: "National Summit — Abuja & Nasarawa State",
    topic: "Lead Keynote Address",
    date: "November 2025",
    format: "Two-Day National Summit · Abuja & Nasarawa State",
    formatIcon: "stage",
    hasPhoto: true,
    highlight: "Presidential Representative in Attendance",
    description:
      "Temple was invited to deliver the keynote address at a landmark two-day national summit spanning Abuja and Nasarawa State, two events held a day apart, culminating on November 19th, 2025. The principal gathering drew the highest levels of Nigerian government and community leadership: the President of the Federal Republic of Nigeria was represented at the summit, the Minister of Mines sent a formal delegation, and the Governor of Nasarawa State attended alongside Honourable Commissioners, Local Government Area Chairmen, and the founding fathers of multiple communities across the state. To stand before political, civic, and traditional leadership in the same room and hold their attention is a testament to the national weight of Temple's voice and the reach of his work beyond the therapeutic and corporate spaces where he is already well known.",
  },
  {
    id: 3,
    venue: "Rotary District 9127 — Mental Health Awareness Day",
    topic: "Prioritizing Mental Health in Workplaces",
    date: "October 2024",
    format: "In-Person Symposium · Rotary Center, Jabi, Abuja",
    formatIcon: "symposium",
    hasPhoto: false,
    description:
      "As a facilitator at Rotary District 9127's Mental Health Awareness Day in Abuja, Temple contributed to a symposium of mental health and addiction specialists focused on normalising these conversations in Nigerian workplaces. He addressed burnout, emotional suppression, and the organisational cost of unaddressed psychological strain. He made the case for Employee Assistance Programmes as a core business investment, not a soft benefit.",
  },
  {
    id: 4,
    venue: "Young Catholic Professionals",
    topic: "Sustaining Relationship Health Amidst Demanding Careers",
    date: "February 2024",
    format: "In-Person Keynote · YCP Resource Center, SS Philip & James Parish, Lekki",
    formatIcon: "keynote",
    hasPhoto: false,
    description:
      "Invited as keynote speaker for the Young Catholic Professionals at the YCP Resource Center in Lekki, Temple addressed the compounding pressure at the intersection of professional ambition and relationship health. He delivered practical strategies for couples navigating demanding careers without losing emotional intimacy. The content was clinically grounded, practically structured, and calibrated precisely to who was sitting in the room.",
  },
  {
    id: 5,
    venue: "RelationSHIP Talk — The Marriage Haven",
    topic: "Common Challenges with Knowledge Dispensers",
    date: "November 2023",
    format: "Live Instagram Panel · Hosted by Nike Adekunle",
    formatIcon: "panel",
    hasPhoto: false,
    description:
      "Temple joined host Nike Adekunle on The Marriage Haven's Instagram Live for an honest conversation about one of the most underexplored tensions in relationship support: the challenge of receiving guidance from knowledge dispensers — coaches, therapists, and mentors. He examined why the messenger shapes whether the message lands, and how couples can discern which counsel to trust when every voice online claims authority.",
  },
  {
    id: 6,
    venue: "Sunset & Soulmate: A Date Night",
    topic: "Rebuilding Intimacy Through Experience",
    date: "June 2023",
    format: "In-Person Hosted Event · Lekki Leisure, Oniru, Lekki",
    formatIcon: "event",
    hasPhoto: false,
    description:
      "Hosted by Temple himself at Lekki Leisure in Oniru, Sunset & Soulmate was an evening designed to rebuild intimacy through shared experience rather than instruction — karaoke, a candlelit dinner, and a guided couples Q&A that opened conversations most couples never have in ordinary life. The event drew couples from across Lagos and was received for the rare combination of warmth, laughter, and clinical depth that it held in the same room.",
  },
  {
    id: 7,
    venue: "#RECOVER — 2-Day Couples Webinar",
    topic: "A Journey Through Relational Repair",
    date: "December 2022",
    format: "Ticketed Virtual Webinar · Temple's Counsel & Mind Academy",
    formatIcon: "webinar",
    hasPhoto: false,
    description:
      "A landmark two-day virtual experience presented by Temple's Counsel and Mind Academy, #RECOVER brought couples at different stages of relational strain through a structured journey of conflict resolution, emotional reconnection, and deliberate repair. Temple led every session as primary facilitator, combining clinical rigour with practical tools couples could apply immediately after each session, without waiting for a next appointment.",
  },
  {
    id: 8,
    venue: "Hot FM Lagos — Parent Connect Helpline",
    topic: "The Present But Absent Father",
    date: "November 2022",
    format: "Live TV/Radio Panel · Lagos",
    formatIcon: "tv",
    hasPhoto: false,
    description:
      "Joining Hot FM Lagos's Parent Connect Helpline alongside guidance counsellor Olutunde Edem, Temple addressed one of the most pressing blind spots in Nigerian family life: the father who is physically present but emotionally unavailable. The live panel, hosted by Sharon, explored the lasting psychological effects of emotional absence on children and what meaningful paternal repair actually looks like in practice.",
  },
  {
    id: 9,
    venue: "Boss FM 95.5, Abuja",
    topic: "Signs of a Trauma-Based Relationship",
    date: "August 2022",
    format: "Live Radio Interview · Abuja",
    formatIcon: "radio",
    hasPhoto: false,
    description:
      "Temple joined Boss FM 95.5 Abuja for a candid radio conversation exploring one of the most misunderstood patterns in modern relationships: the trauma bond. He walked listeners through the psychological markers of relationships built on trauma, why they form, what compels people to remain in them, and the first concrete steps toward breaking the cycle. The interview reached a wide national audience and generated significant listener response.",
  },
];

const formatIcons: Record<FormatIcon, React.ComponentType<{ className?: string }>> = {
  radio: Radio,
  tv: Tv,
  webinar: Video,
  webinar2: Globe,
  event: Star,
  panel: MessageSquare,
  keynote: Mic,
  symposium: Users,
  stage: Building2,
};

const formatLabels: Record<FormatIcon, string> = {
  radio: "Radio",
  tv: "Television",
  webinar: "Webinar",
  webinar2: "Global Webinar",
  event: "Live Event",
  panel: "Panel",
  keynote: "Keynote",
  symposium: "Symposium",
  stage: "Keynote",
};

// ── Modal poster ──────────────────────────────────────────────────────────────

function EventPoster({ engagement }: { engagement: Engagement }) {
  const Icon = formatIcons[engagement.formatIcon];
  const label = formatLabels[engagement.formatIcon];

  return (
    <div className="relative bg-[#0A0A0A] border border-primary/30 overflow-hidden select-none">
      {engagement.hasPhoto ? (
        <div className="relative">
          <img
            src={stageSrc}
            alt="Temple Obike delivering a keynote address at the national summit"
            className="w-full object-cover"
            style={{ maxHeight: 340, objectPosition: 'top', filter: 'brightness(0.75) contrast(1.1)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
          <div className="absolute top-4 left-4 w-12 h-12 border-t border-l border-primary/60" />
          <div className="absolute top-4 right-4 w-12 h-12 border-t border-r border-primary/60" />
        </div>
      ) : (
        <div className="relative flex items-center justify-center" style={{ minHeight: 220 }}>
          <span className="absolute text-[140px] font-serif font-bold text-primary/8 select-none leading-none tracking-tighter pointer-events-none">
            TO
          </span>
          <div className="absolute top-4 left-4 w-10 h-10 border-t border-l border-primary/50" />
          <div className="absolute top-4 right-4 w-10 h-10 border-t border-r border-primary/50" />
          <div className="absolute bottom-4 left-4 w-10 h-10 border-b border-l border-primary/50" />
          <div className="absolute bottom-4 right-4 w-10 h-10 border-b border-r border-primary/50" />
          <div className="relative z-10 flex flex-col items-center gap-3">
            <div className="w-12 h-12 border border-primary/40 flex items-center justify-center">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <span className="text-[10px] tracking-[0.25em] text-primary uppercase font-semibold">{label}</span>
          </div>
        </div>
      )}

      <div className="px-6 py-5 border-t border-primary/20">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            {engagement.highlight && (
              <span className="inline-block text-[9px] text-primary uppercase tracking-[0.2em] font-semibold bg-primary/10 border border-primary/20 px-2 py-0.5 mb-2">
                {engagement.highlight}
              </span>
            )}
            <p className="text-[10px] text-primary uppercase tracking-[0.2em] font-semibold mb-1">{engagement.date}</p>
            <h3 className="font-serif text-xl text-white leading-snug">{engagement.venue}</h3>
            <p className="text-sm text-white/60 font-light mt-1 leading-snug">{engagement.topic}</p>
          </div>
          <div className="shrink-0">
            <img src={logoSrc} alt="Temple Obike logo" className="w-16 opacity-60 select-none" draggable={false} />
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-[11px] text-white/40 font-light uppercase tracking-widest">{engagement.format}</p>
        </div>
      </div>
    </div>
  );
}

// ── Modal ─────────────────────────────────────────────────────────────────────

function EventModal({
  engagement,
  onClose,
}: {
  engagement: Engagement;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
        aria-modal="true"
        role="dialog"
        aria-label={`Event details: ${engagement.venue}`}
      >
        <motion.div
          key="panel"
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.97 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xl bg-card border border-border overflow-y-auto"
          style={{ maxHeight: '90vh' }}
          onClick={(e) => e.stopPropagation()}
          data-testid={`modal-engagement-${engagement.id}`}
        >
          <button
            onClick={onClose}
            data-testid="button-modal-close"
            className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center border border-border text-muted-foreground hover:text-foreground hover:border-primary transition-colors duration-200 bg-card/80 backdrop-blur-sm"
            aria-label="Close event details"
          >
            <X className="w-4 h-4" />
          </button>

          <EventPoster engagement={engagement} />

          <div className="px-8 py-8">
            <p className="text-base text-muted-foreground font-light leading-[1.85]">
              {engagement.description}
            </p>
          </div>

          <div className="h-[2px] bg-gradient-to-r from-primary/60 via-primary/20 to-transparent" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Card (default state — TO monogram only) ────────────────────────────────────

function EngagementCard({
  engagement,
  onClick,
  index,
}: {
  engagement: Engagement;
  onClick: () => void;
  index: number;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      data-testid={`card-engagement-${engagement.id}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.08, 0.48) }}
      className="group w-full text-left bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden focus:outline-none focus-visible:ring-1 focus-visible:ring-primary cursor-pointer"
      aria-label={`View details: ${engagement.venue}, ${engagement.date}`}
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/60 via-primary/20 to-transparent" />

      {/* Highlight badge */}
      {engagement.highlight && (
        <div className="absolute top-3 left-3 z-10">
          <span className="text-[8px] text-primary uppercase tracking-[0.18em] font-semibold bg-primary/10 border border-primary/20 px-1.5 py-0.5 leading-none">
            {engagement.highlight}
          </span>
        </div>
      )}

      <div className="flex flex-col items-center justify-center px-4 pt-8 pb-4 min-h-[220px]">
        <img
          src={logoSrc}
          alt="Temple Obike logo"
          className="w-28 select-none group-hover:opacity-90 transition-opacity duration-300 z-10 relative"
          draggable={false}
        />
        <div className="w-6 h-[1px] bg-primary/40 mt-4 mb-3 group-hover:w-12 transition-all duration-500" />
        <p className="text-[10px] text-muted-foreground uppercase tracking-[0.18em] font-semibold text-center leading-snug z-10 relative">
          {engagement.date}
        </p>
      </div>

      <div className="px-6 pb-6 border-t border-border pt-4">
        <h3 className="font-serif text-sm text-foreground leading-snug mb-1 group-hover:text-primary transition-colors duration-200">
          {engagement.venue}
        </h3>
        <p className="text-[11px] text-muted-foreground/60 font-light">
          {formatLabels[engagement.formatIcon]}
        </p>
      </div>

      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-[9px] text-primary uppercase tracking-widest font-semibold">View →</span>
      </div>
    </motion.button>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export function SpeakingHistory() {
  const [active, setActive] = useState<Engagement | null>(null);

  return (
    <section
      className="py-24 md:py-32 bg-background border-y border-border"
      aria-label="Speaking history — Temple Obike"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-20"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-4">
            Where He's Been
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-foreground">
            Speaking History
          </h2>
          <p className="mt-4 text-muted-foreground font-light max-w-xl leading-relaxed">
            From national government summits to intimate couples evenings — most recent engagements first.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-6">
          {engagements.map((engagement, idx) => (
            <EngagementCard
              key={engagement.id}
              engagement={engagement}
              onClick={() => setActive(engagement)}
              index={idx}
            />
          ))}
        </div>
      </div>

      {active && (
        <EventModal engagement={active} onClose={() => setActive(null)} />
      )}
    </section>
  );
}
