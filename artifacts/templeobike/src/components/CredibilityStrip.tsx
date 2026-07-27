import { Tv, Radio, BookOpen } from 'lucide-react';
import businessElitesCover from '@assets/images_(9)_1785168480508.jpeg';

export function CredibilityStrip() {
  const items = [
    { 
      icon: Tv,
      image: null,
      label: "Nigerian Television Authority (NTA)", 
      sub: "Television Interview", 
      link: "#",
      testid: "link-credibility-nta"
    },
    { 
      icon: Radio,
      image: null,
      label: "National Radio Interview", 
      sub: "Privacy vs. Secrecy in Marriage", 
      link: "#",
      testid: "link-credibility-radio"
    },
    { 
      icon: null, 
      image: businessElitesCover,
      label: "Business Elites Africa", 
      sub: "Top 30 Branding & PR Elites in Africa", 
      link: "https://businesselitesafrica.com/2022/12/11/passion-is-80-of-the-success-game-temple-obike/",
      testid: "link-credibility-award"
    },
    { 
      icon: BookOpen,
      image: null,
      label: "Three-Time Published Author", 
      sub: "Soul Bodega · Discover Your Best Authentic Self · Memoirs of The Rail man's Son", 
      link: "https://www.amazon.com/s?k=temple+obike",
      testid: "link-credibility-author"
    },
  ];

  return (
    <section className="bg-card py-16 border-y border-border">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
          {items.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              target={item.link.startsWith('http') ? '_blank' : '_self'}
              rel={item.link.startsWith('http') ? 'noopener noreferrer' : ''}
              data-testid={item.testid}
              className="flex flex-col items-start group relative"
              onClick={(e) => item.link === '#' && e.preventDefault()}
            >
              {item.image ? (
                <div className="mb-5 overflow-hidden border border-border group-hover:border-primary/50 transition-colors duration-300 w-16">
                  <img src={item.image} alt={item.label} className="w-full h-20 object-cover object-top" />
                </div>
              ) : (
                <div className="mb-5 p-3 bg-background border border-border text-primary group-hover:border-primary/50 group-hover:bg-primary/5 transition-colors duration-300">
                  {item.icon && <item.icon className="w-5 h-5 stroke-[1.5]" />}
                </div>
              )}
              <span className="font-sans font-medium text-sm md:text-base text-foreground mb-1 leading-snug pr-4">
                {item.label}
              </span>
              <span className="text-xs md:text-sm text-muted-foreground font-light">
                {item.sub}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
