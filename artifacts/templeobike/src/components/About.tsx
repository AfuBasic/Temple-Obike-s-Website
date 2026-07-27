import { motion } from 'framer-motion';

export function About() {
  return (
    <section className="py-24 md:py-32 relative bg-background">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
          
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-8">
              Who He Is
            </span>
            <div className="space-y-6 text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
              <p className="text-foreground font-normal">
                Temple Obike is a Lagos psychotherapist, relationship interventionist, and business strategist who has spent his career helping individuals, couples, and brands move through fracture toward repair.
              </p>
              <p>
                His work spans trauma resolution, emotional intelligence, and market entry strategy. That combination has made him a recurring voice on Nigerian television and radio, and a recognised name in African branding and PR circles.
              </p>
              <p>
                He speaks on the psychology of trust, the architecture of repair after betrayal, and what leaders get wrong about emotional intelligence. His material draws on both clinical practice and years advising brands on positioning and market entry across Africa.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-5 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            {/* 
              Decorative Monogram / Structural Element 
              Replaces the missing secondary photo while maintaining presence.
            */}
            <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center">
              <div className="absolute inset-0 border border-primary/20 rounded-full animate-[spin_60s_linear_infinite]"></div>
              <div className="absolute inset-4 border border-border rounded-full animate-[spin_40s_linear_infinite_reverse]"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-full mix-blend-overlay"></div>
              <span className="text-[120px] md:text-[160px] font-serif text-primary/30 select-none tracking-tighter">
                TO
              </span>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
