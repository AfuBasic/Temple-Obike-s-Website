import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center pt-24 pb-16 overflow-hidden bg-background">
      {/* 
        Background Visuals
        Placeholder for portrait image: The image should be a dark, cinematic portrait 
        with a single key light. Once uploaded, it can be added to the div below.
      */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Subtle geometric gold accent for texture while waiting for photo */}
        <div className="absolute top-0 right-0 w-3/4 h-full bg-gradient-to-bl from-primary/5 via-transparent to-transparent opacity-60 mix-blend-overlay"></div>
        <div className="absolute -left-[20%] -top-[20%] w-[60%] h-[60%] rounded-full bg-primary/5 blur-[120px]"></div>
        
        {/* Drop portrait here: 
        <img src="/path-to-portrait.jpg" alt="Temple Obike" className="absolute right-0 bottom-0 max-h-[90vh] object-contain object-right-bottom mix-blend-lighten opacity-80" /> 
        */}
      </div>

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
                href="#"
                data-testid="link-media-kit"
                className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-5 border border-border text-foreground font-semibold text-sm tracking-wide transition-colors hover:border-primary hover:text-primary duration-200"
                onClick={(e) => e.preventDefault()}
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
