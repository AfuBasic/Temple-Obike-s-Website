import { motion } from 'framer-motion';

export function PracticeBanner() {
  return (
    <section className="bg-card border-y border-border py-16 md:py-20 relative overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.03] via-transparent to-primary/[0.03] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <motion.div
          className="flex flex-col lg:flex-row items-start lg:items-center gap-10 lg:gap-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
        >
          {/* Left — identity */}
          <div className="flex-1 min-w-0">
            <span className="inline-block text-[10px] font-bold tracking-[0.22em] text-primary uppercase mb-5">
              The Practice
            </span>
            <h2 className="font-serif text-2xl md:text-3xl text-foreground font-semibold leading-tight mb-4">
              Temple's Counsel &<br className="hidden sm:block" /> Mind Academy
            </h2>
            <p className="text-base text-muted-foreground font-light leading-relaxed max-w-xl">
              One of Nigeria's most recognised relationship brands — a private therapy practice and commercial enterprise 
              offering individual counselling, couples intervention, corporate EAP programmes, and live workshops. 
              Offices in Victoria Island, Lagos and Wuse 2, Abuja. Virtual sessions available worldwide.
            </p>
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px self-stretch bg-border flex-shrink-0" />

          {/* Right — details + CTA */}
          <div className="flex flex-col gap-6 lg:min-w-[280px]">
            <div className="space-y-3">
              {[
                { label: 'Lagos', value: 'Victoria Island' },
                { label: 'Abuja', value: 'Wuse 2' },
                { label: 'Phone', value: '+234 810 905 5475' },
                { label: 'Hours', value: '9 AM – 5 PM · Virtual 24/7' },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-baseline gap-3">
                  <span className="text-[10px] font-bold tracking-[0.16em] text-primary uppercase w-12 flex-shrink-0">
                    {label}
                  </span>
                  <span className="text-sm text-muted-foreground font-light">{value}</span>
                </div>
              ))}
            </div>

            <a
              href="https://templescounsel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold text-sm tracking-wide hover:bg-[#c99a5e] transition active:scale-[0.98] duration-200 self-start"
            >
              Book an Appointment
              <span className="text-primary-foreground/70">↗</span>
            </a>

            <p className="text-xs text-muted-foreground/50 font-light -mt-2">
              templescounsel.com
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
