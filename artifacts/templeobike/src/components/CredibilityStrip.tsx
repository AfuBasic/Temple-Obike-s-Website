import businessElitesCover from '@assets/images_(9)_1785168480508.jpeg';
import soulBodegaCover    from '@assets/soul-bodega-cover.jpg';
import radioSrc           from '@assets/Radio-Nigeria_1785170842313.jpg';
import bossFmSrc          from '@assets/Screenshot_20260729-095646_1785315620492.jpg';
import stageSrc           from '@assets/Screenshot_20260727_101338_Gallery_1785143683280.jpg';
import ferrgCover         from '@assets/The_FERRG_1785240723673.png';
import ycpSrc             from '@assets/Screenshot_20260729-095508_1785315620673.jpg';
import logoSrc            from '@assets/logo-monogram.png';

const ntaThumbnail = 'https://img.youtube.com/vi/z3Ofsd6z9z8/hqdefault.jpg';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');
const resolveLink = (link: string) => link.startsWith('/') ? `${base}${link}` : link;

interface StripItem {
  image: string | null;
  label: string;
  sub: string;
  link: string;
  objectPosition?: string;
}

const items: StripItem[] = [
  {
    image: ntaThumbnail,
    label: 'Nigerian Television Authority',
    sub: 'Television Interview',
    link: 'https://youtu.be/z3Ofsd6z9z8?feature=shared',
    objectPosition: 'center top',
  },
  {
    image: radioSrc,
    label: 'National Radio Interview',
    sub: 'Privacy vs. Secrecy in Marriage',
    link: 'https://open.spreaker.com/A4NZ/0p3au0re',
    objectPosition: 'center top',
  },
  {
    image: businessElitesCover,
    label: 'Business Elites Africa',
    sub: 'Top 30 Branding & PR Elites in Africa',
    link: 'https://businesselitesafrica.com/2022/12/11/passion-is-80-of-the-success-game-temple-obike/',
    objectPosition: 'center top',
  },
  {
    image: soulBodegaCover,
    label: 'Soul Bodega',
    sub: 'Three-Time Published Author · Amazon',
    link: resolveLink('/ferrg-book'),
    objectPosition: 'center center',
  },
  {
    image: bossFmSrc,
    label: 'Boss FM 95.5 Abuja',
    sub: 'Signs of a Trauma-Based Relationship',
    link: '#',
    objectPosition: 'center top',
  },
  {
    image: stageSrc,
    label: 'National Summit — Abuja',
    sub: 'Presidential Representative in Attendance',
    link: '#',
    objectPosition: 'center top',
  },
  {
    image: null,
    label: 'Lights On — Global Webinar',
    sub: '242+ Couples · Nigeria & Worldwide',
    link: '#',
  },
  {
    image: ferrgCover,
    label: 'FERRG · Forthcoming Book',
    sub: 'Relationships, Repair & Growth',
    link: resolveLink('/ferrg-book'),
    objectPosition: 'center center',
  },
  {
    image: ycpSrc,
    label: 'Young Catholic Professionals',
    sub: 'Keynote Speaker · Idado Lekki',
    link: '#',
    objectPosition: 'center top',
  },
];

// Double the list so the second copy picks up seamlessly when the first scrolls off
const doubled = [...items, ...items];

function StripCard({ item }: { item: StripItem }) {
  const isExternal = item.link.startsWith('http');
  const isDisabled = item.link === '#';

  return (
    <a
      href={isDisabled ? undefined : item.link}
      target={isExternal ? '_blank' : '_self'}
      rel={isExternal ? 'noopener noreferrer' : ''}
      className={`flex-shrink-0 w-52 flex flex-col group ${isDisabled ? 'cursor-default' : 'cursor-pointer'}`}
      onClick={(e) => isDisabled && e.preventDefault()}
      draggable={false}
    >
      {/* Thumbnail */}
      <div className="w-full h-32 overflow-hidden border border-border group-hover:border-primary/40 transition-colors duration-300 bg-card">
        {item.image ? (
          <img
            src={item.image}
            alt={item.label}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ objectPosition: item.objectPosition ?? 'center center' }}
            draggable={false}
          />
        ) : (
          /* Placeholder for items without a photo */
          <div className="w-full h-full flex items-center justify-center bg-card">
            <img
              src={logoSrc}
              alt="Temple Obike"
              className="w-10 opacity-30"
              draggable={false}
            />
          </div>
        )}
      </div>

      {/* Text */}
      <div className="mt-3 pr-2">
        <p className="font-sans font-medium text-sm text-foreground leading-snug group-hover:text-primary transition-colors duration-200">
          {item.label}
        </p>
        <p className="text-xs text-muted-foreground font-light mt-0.5 leading-snug">
          {item.sub}
        </p>
      </div>
    </a>
  );
}

export function CredibilityStrip() {
  return (
    <section className="bg-card py-14 border-y border-border overflow-hidden">
      <div className="marquee-container">
        {/* Track — doubled list for seamless infinite loop */}
        <div className="marquee-track flex gap-10 w-max px-10">
          {doubled.map((item, idx) => (
            <StripCard key={idx} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
