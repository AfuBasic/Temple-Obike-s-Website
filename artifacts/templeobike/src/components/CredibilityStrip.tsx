import businessElitesCover from '@assets/images_(9)_1785168480508.jpeg';
import soulBodegaCover from '@assets/soul-bodega-cover.jpg';
import radioSrc from '@assets/Radio-Nigeria_1785170842313.jpg';

const ntaThumbnail = 'https://img.youtube.com/vi/z3Ofsd6z9z8/hqdefault.jpg';

export function CredibilityStrip() {
  const items = [
    {
      image: ntaThumbnail,
      label: 'Nigerian Television Authority (NTA)',
      sub: 'Television Interview',
      link: 'https://youtu.be/z3Ofsd6z9z8?feature=shared',
      testid: 'link-credibility-nta',
      objectPosition: 'center top',
    },
    {
      image: radioSrc,
      label: 'National Radio Interview',
      sub: 'Privacy vs. Secrecy in Marriage',
      link: 'https://open.spreaker.com/A4NZ/0p3au0re',
      testid: 'link-credibility-radio',
      objectPosition: 'center top',
    },
    {
      image: businessElitesCover,
      label: 'Business Elites Africa',
      sub: 'Top 30 Branding & PR Elites in Africa',
      link: 'https://businesselitesafrica.com/2022/12/11/passion-is-80-of-the-success-game-temple-obike/',
      testid: 'link-credibility-award',
      objectPosition: 'center top',
    },
    {
      image: soulBodegaCover,
      label: 'Soul Bodega',
      sub: 'Three-Time Published Author — New Book Coming',
      link: '/ferrg-book',
      testid: 'link-credibility-author',
      objectPosition: 'center center',
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
              <div className="mb-5 overflow-hidden border border-border group-hover:border-primary/50 transition-colors duration-300 w-16">
                <img
                  src={item.image}
                  alt={item.label}
                  className="w-full h-20 object-cover"
                  style={{ objectPosition: item.objectPosition }}
                />
              </div>
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
