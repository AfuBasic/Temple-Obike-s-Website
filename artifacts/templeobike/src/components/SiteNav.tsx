import { useState, useEffect } from 'react';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/**
 * Sticky site-wide nav — visible on both mobile and desktop.
 * Replaces the old MobileNav (which was hidden on sm+).
 * Links: home wordmark · The Gold Retreat · Media Kit · Book to Speak (CTA)
 */
export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={[
        'fixed top-0 left-0 right-0 z-50',
        'transition-all duration-300',
        scrolled
          ? 'bg-background/90 backdrop-blur-md border-b border-border/40 shadow-md shadow-black/20'
          : 'bg-background/60 backdrop-blur-sm',
      ].join(' ')}
    >
      <div className="flex items-center justify-between px-5 h-16 max-w-[1200px] mx-auto">

        {/* Wordmark / identity */}
        <a
          href={base || '/'}
          className="flex-shrink-0 text-foreground no-underline hover:opacity-80 transition-opacity duration-200"
          aria-label="Temple Obike — home"
        >
          <span className="font-serif text-base font-semibold tracking-tight leading-none">
            Temple<br />
            <span className="text-primary text-xs font-sans font-semibold tracking-widest uppercase">
              Obike
            </span>
          </span>
        </a>

        {/* Desktop centre links */}
        <nav
          className="hidden sm:flex items-center gap-6"
          aria-label="Site navigation"
        >
          <a
            href={`${base}/retreat`}
            className="text-xs font-semibold tracking-wide text-muted-foreground hover:text-primary transition-colors duration-200 uppercase"
          >
            The Gold Retreat
          </a>
          <a
            href={`${base}/media-kit`}
            className="text-xs font-semibold tracking-wide text-muted-foreground hover:text-primary transition-colors duration-200 uppercase"
          >
            Media Kit
          </a>
        </nav>

        {/* Right side actions */}
        <nav className="flex items-center gap-2" aria-label="Quick actions">
          {/* Mobile-only: show retreat link as small button */}
          <a
            href={`${base}/retreat`}
            className="sm:hidden inline-flex items-center gap-1 text-xs font-semibold tracking-wide text-primary border border-primary/40 px-3 py-2 hover:bg-primary/10 transition-colors duration-200"
          >
            <span className="text-[10px]">✦</span> The Gold Retreat
          </a>
          <a
            href={`${base}/#contact`}
            className="inline-flex items-center text-xs font-semibold tracking-wide bg-primary text-primary-foreground px-4 py-2 hover:bg-[#c99a5e] transition-colors duration-200"
          >
            Book to Speak
          </a>
        </nav>

      </div>
    </header>
  );
}
