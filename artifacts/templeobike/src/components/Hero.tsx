import { motion } from 'framer-motion';
import stageSrc from '@assets/Screenshot_20260727_110019_Gallery_1785147430425.jpg';

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center pt-24 pb-16 overflow-hidden bg-background">
      {/* 
        Cinematic stage photo — full-bleed background.
        Photo: Temple Obike speaking at podium with handheld mic, stage lighting.
      */}
      <div className="absolute inset-0 z-0">
        {/* Stage photo — positioned right so portrait fills the right side of the hero */}
        <img
          src={stageSrc}
          alt="Temple Obike speaking at a live event — photographers and camera crew visible in the foreground"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.68) contrast(1.06)', objectPosition: 'center 46%' }}
        />
        {/* Mobile overlay — 30% lighter so the photo reads clearly on small screens */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/40 to-transparent sm:hidden" />
        {/* Desktop overlay — full strength for headline legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/15 hidden sm:block" />
        {/* Bottom fade — lighter on mobile */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-background/70 to-transparent sm:hidden" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent hidden sm:block" />
        {/* Top fade — lighter on mobile */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-background/70 to-transparent sm:hidden" />
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent hidden sm:block" />
      </div>

      {/* Subtle gold ambient glow behind content */}
      <div className="absolute -left-[20%] top-[10%] w-[40%] h-[60%] rounded-full bg-primary/4 blur-[140px] pointer-events-none z-[1]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block text-xs sm:text-sm font-semibold tracking-[0.2em] text-primary uppercase mb-6 sm:mb-8">
              Speaker · Strategist · Author
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-serif font-semibold leading-[1.05] tracking-tight mb-8 text-foreground">
              The Voice Behind the Room's Hardest Conversations
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-light mb-12 max-w-2xl leading-relaxed">
              Psychotherapist. Relationship Strategist. Speaker. Author.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <a
                href="#contact"
                data-testid="link-book-speak"
                className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-5 bg-primary text-primary-foreground font-semibold text-sm tracking-wide transition-all hover:bg-[#c99a5e] active:scale-[0.98] duration-200"
              >
                Book Temple to Speak
              </a>
              <a
                href="/media-kit"
                data-testid="link-media-kit"
                className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-5 border border-border text-foreground font-semibold text-sm tracking-wide transition-colors hover:border-primary hover:text-primary duration-200"
              >
                Media Kit &rarr;
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
