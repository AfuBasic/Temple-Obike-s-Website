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
                Temple Obike (LMFT, CHT) is a Licensed Marriage and Family Therapist, certified hypnotherapist, keynote speaker, and author based in Lagos. Seventy percent of his client base spans the global diaspora. The remaining thirty percent is drawn from Nigeria and the broader pan-African community.
              </p>
              <p>
                He began counselling informally in 2008, advising youth groups in underserved Lagos neighbourhoods under the Grassroots and Shoots initiative. That foundation grew into Temple's Counsel and Mind Academy, a private practice that has now logged over 2,380 hours of live therapy sessions and whose writings have reached more than 2,300,000 readers online since 2021. He holds a Psychotherapy certification from the Karen Wells Institute in the United States, a professional counselling certificate from the Institute of Counseling Nigeria, and a John Maxwell Leadership Programme certification.
              </p>
              <p>
                He is a published author twice over: <em>Soul Bodega</em> and <em>Memoirs of The Rail man's Son</em>, both available on Amazon. He is also happily married to his primary school sweetheart, and they are raising four children together. That personal foundation gives his work on marriage a credibility no qualification alone can confer.
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
