import { motion } from 'framer-motion';
import { Radio, Tv, Video, Users, MessageSquare, Mic, Building2, Star } from 'lucide-react';

type FormatIcon = 'radio' | 'tv' | 'webinar' | 'event' | 'panel' | 'keynote' | 'symposium' | 'stage';

interface Engagement {
  id: number;
  venue: string;
  topic: string;
  date: string;
  format: string;
  formatIcon: FormatIcon;
  hasPhoto: boolean;
  photoComment?: string;
}

const engagements: Engagement[] = [
  {
    id: 1,
    venue: "Boss FM 95.5, Abuja",
    topic: "Signs of a Trauma-Based Relationship",
    date: "August 2022",
    format: "Live Radio Interview",
    formatIcon: "radio",
    hasPhoto: false,
  },
  {
    id: 2,
    venue: "Hot FM, Lagos — Parent Connect Helpline",
    topic: "The Present But Absent Father",
    date: "November 2022",
    format: "Live TV/Radio Panel",
    formatIcon: "tv",
    hasPhoto: false,
  },
  {
    id: 3,
    venue: "#RECOVER — 2-Day Couples Webinar",
    topic: "Temple's Counsel & Mind Academy",
    date: "December 2022",
    format: "Ticketed Virtual Webinar",
    formatIcon: "webinar",
    hasPhoto: false,
  },
  {
    id: 4,
    venue: "Sunset & Soulmate: A Date Night",
    topic: "Guided Q&A — Karaoke & Dinner",
    date: "June 2023",
    format: "In-Person Hosted Event · Lekki Leisure, Oniru",
    formatIcon: "event",
    hasPhoto: false,
  },
  {
    id: 5,
    venue: "RelationSHIP Talk — The Marriage Haven",
    topic: "Common Challenges with Knowledge Dispensers",
    date: "November 2023",
    format: "Live Instagram Panel",
    formatIcon: "panel",
    hasPhoto: false,
  },
  {
    id: 6,
    venue: "Young Catholic Professionals, SS Philip & James Parish",
    topic: "Strategies for Sustaining Relationship Health Amidst Demanding Careers",
    date: "February 2024",
    format: "In-Person Keynote · YCP Resource Center, Lekki",
    formatIcon: "keynote",
    hasPhoto: false,
  },
  {
    id: 7,
    venue: "Rotary District 9127 — Mental Health Awareness Day",
    topic: "Prioritizing Mental Health in Workplaces",
    date: "October 2024",
    format: "In-Person Symposium · Rotary Center, Jabi, Abuja",
    formatIcon: "symposium",
    hasPhoto: false,
  },
  {
    id: 8,
    venue: "Summit Keynote — Addo-Ekiti",
    topic: "Lead Speaker",
    date: "[Date TBC]", // PLACEHOLDER — update when confirmed
    format: "In-Person Keynote · Addo-Ekiti", // PLACEHOLDER — update summit name when confirmed
    formatIcon: "stage",
    hasPhoto: true,
    photoComment: "Replace the placeholder below with the stage photo once uploaded: import stageSrc from '@assets/stage-photo.jpg' and set src={stageSrc}",
  },
];

const formatIcons: Record<FormatIcon, React.ComponentType<{ className?: string }>> = {
  radio: Radio,
  tv: Tv,
  webinar: Video,
  event: Star,
  panel: MessageSquare,
  keynote: Mic,
  symposium: Users,
  stage: Building2,
};

function GraphicCard({ engagement }: { engagement: Engagement }) {
  const Icon = formatIcons[engagement.formatIcon];
  return (
    <div className="flex flex-col h-full">
      {/* 
        PLACEHOLDER IMAGE SLOT for Card #{engagement.id}
        Replace this div with an <img> tag when a real event photo is available.
        Suggested size: 16:9 aspect ratio, e.g. 400×225px minimum.
      */}
      <div className="aspect-video bg-background border border-dashed border-border/50 flex items-center justify-center mb-5 group-hover:border-primary/30 transition-colors duration-300">
        <Icon className="w-6 h-6 text-primary/30 group-hover:text-primary/50 transition-colors duration-300" />
      </div>
      <CardContent engagement={engagement} />
    </div>
  );
}

function StagePhotoCard({ engagement }: { engagement: Engagement }) {
  return (
    <div className="flex flex-col h-full">
      {/*
        STAGE PHOTO — Card 8
        Temple speaking on stage with a handheld mic at a podium, purple-carpeted stage.
        Once the photo is uploaded to attached_assets/, import it and replace the placeholder:
        
        import stageSrc from '@assets/your-stage-photo-filename.jpg';
        Then replace the placeholder div below with:
        <img src={stageSrc} alt="Temple Obike speaking on stage" className="w-full aspect-video object-cover object-top mb-5" />
      */}
      <div className="aspect-video bg-background border border-dashed border-primary/30 flex items-center justify-center mb-5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
        <div className="text-center z-10">
          <Building2 className="w-6 h-6 text-primary/40 mx-auto mb-2" />
          <span className="text-[10px] text-primary/50 uppercase tracking-widest font-semibold">Stage Photo</span>
        </div>
      </div>
      <CardContent engagement={engagement} />
    </div>
  );
}

function CardContent({ engagement }: { engagement: Engagement }) {
  const Icon = formatIcons[engagement.formatIcon];
  return (
    <div className="flex flex-col flex-1">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-3.5 h-3.5 text-primary/60 shrink-0" />
        <span className="text-[10px] text-primary uppercase tracking-[0.18em] font-semibold">{engagement.date}</span>
      </div>
      <h3 className="font-serif text-lg text-foreground leading-snug mb-2">
        {engagement.venue}
      </h3>
      <p className="text-sm text-muted-foreground font-light leading-relaxed mb-3 flex-1">
        {engagement.topic}
      </p>
      <p className="text-xs text-muted-foreground/60 font-light mt-auto pt-3 border-t border-border">
        {engagement.format}
      </p>
    </div>
  );
}

export function SpeakingHistory() {
  return (
    <section className="py-24 md:py-32 bg-background border-y border-border">
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
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {engagements.map((engagement, idx) => (
            <motion.div
              key={engagement.id}
              data-testid={`card-engagement-${engagement.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: Math.min(idx * 0.08, 0.48) }}
              className="group bg-card border border-border hover:border-primary/30 p-6 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Gold top border accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/60 via-primary/20 to-transparent" />

              {engagement.hasPhoto ? (
                <StagePhotoCard engagement={engagement} />
              ) : (
                <GraphicCard engagement={engagement} />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
