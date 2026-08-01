import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoSrc from '@assets/logo-monogram.png';

/**
 * Sticky mobile-only nav bar.
 * Hidden on sm+ (640 px) — desktop visitors use the hero CTA row instead.
 * Appears immediately on mount so visitors always have an escape hatch.
 */
export function MobileNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={[
        'fixed top-0 left-0 right-0 z-50 sm:hidden',
        'transition-all duration-300',
        scrolled
          ? 'bg-background/90 backdrop-blur-md border-b border-border/40 shadow-md shadow-black/20'
          : 'bg-background/60 backdrop-blur-sm',
      ].join(' ')}
    >
      <div className="flex items-center justify-between px-5 h-16">
        {/* Logo / identity */}
        <img
          src={logoSrc}
          alt="Temple Obike"
          className="h-10 w-auto select-none"
          draggable={false}
        />

        {/* Primary actions */}
        <nav className="flex items-center gap-2" aria-label="Mobile quick links">
          <a
            href="/retreat"
            className="inline-flex items-center gap-1 text-xs font-semibold tracking-wide text-primary border border-primary/40 px-3 py-2 hover:bg-primary/10 transition-colors duration-200"
          >
            <span className="text-[10px]">✦</span> The Gold Retreat
          </a>
          <a
            href="#contact"
            className="inline-flex items-center text-xs font-semibold tracking-wide bg-primary text-primary-foreground px-4 py-2 hover:bg-[#c99a5e] transition-colors duration-200"
          >
            Book to Speak
          </a>
        </nav>
      </div>
    </header>
  );
}
