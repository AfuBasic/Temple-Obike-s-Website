import { motion } from 'framer-motion';

export function RetreatTeaser() {
  return (
    <section className="py-24 md:py-32 bg-background border-y border-border relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85 }}
        >
          {/* Left — text */}
          <div>
            <span className="inline-block text-[10px] font-bold tracking-[0.25em] text-primary uppercase mb-6">
              New · October 2026
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground leading-tight mb-6">
              The Gold Retreat
            </h2>
            <p className="text-lg text-muted-foreground font-light leading-relaxed mb-4 max-w-lg">
              A private, therapist-led couples experience launching in Accra and Mauritius this October. Three nights designed to help you reach the Gold stage — together.
            </p>
            <p className="text-base text-muted-foreground font-light leading-relaxed mb-8 max-w-lg">
              Fully managed, start to finish. Book once and we handle flights, visas, and logistics. You just arrive at the airport with your bags.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href="/retreat"
                className="inline-flex items-center justify-center px-10 py-5 bg-primary text-primary-foreground font-semibold text-sm tracking-wide hover:bg-[#c99a5e] transition active:scale-[0.98] duration-200"
              >
                Explore The Retreat
              </a>
              <a
                href="/retreat#book"
                className="text-sm text-muted-foreground hover:text-primary transition font-light"
              >
                Reserve our spot →
              </a>
            </div>
          </div>

          {/* Right — detail cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { city: 'Accra', dates: '8 – 10 Oct 2026', price: '$1,990', note: 'per couple · 3 nights' },
              { city: 'Mauritius', dates: '22 – 24 Oct 2026', price: '$3,200', note: 'per couple · 3 nights · ★ Book launch' },
              { city: 'Virtual', dates: 'Both weekends', price: '$1,500', note: 'per couple · live sessions' },
            ].map((loc) => (
              <a
                key={loc.city}
                href="/retreat"
                className="group block p-6 border border-border hover:border-primary/50 transition-colors duration-200 bg-card"
              >
                <div className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase mb-2 group-hover:text-primary transition-colors">
                  {loc.city}
                </div>
                <div className="font-serif text-xl text-foreground mb-1">{loc.price}</div>
                <div className="text-xs text-muted-foreground font-light leading-relaxed">{loc.note}</div>
                <div className="text-xs text-muted-foreground/60 mt-2">{loc.dates}</div>
              </a>
            ))}
            <div className="p-6 border border-dashed border-border bg-card/50 flex items-center">
              <p className="text-xs text-muted-foreground font-light leading-relaxed">
                Flights, visas & logistics included in all in-person packages.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
