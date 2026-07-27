import { motion } from 'framer-motion';
import logoSrc from '@assets/IMG-20260727-WA0003_1785149135010.jpg';

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
                Temple Obike (LMFT) is a Licensed Marriage and Family Therapist, marriage coach and interventionist, keynote speaker, entrepreneur, and author based in Lagos. Seventy percent of his client base spans the global diaspora. The remaining thirty percent is drawn from Nigeria and the broader pan-African community.
              </p>
              <p>
                He began counselling informally in 2008, advising youth groups in underserved Lagos neighbourhoods under the Grassroots and Shoots initiative. That work evolved into Temple's Counsel and Mind Academy, a private practice and commercial enterprise he founded and built into one of Nigeria's most recognised relationship brands, with offices in Victoria Island, Lagos and Wuse 2, Abuja. The practice has logged over 2,380 hours of live therapy sessions, and his writing has reached more than 2,300,000 readers online since 2021.
              </p>
              <p>
                Beyond the consulting room, Temple has built a growing content and education business: three published books on Amazon, a forthcoming couples course, live workshop programmes, and a corporate Employee Assistance Programme (EAP) arm serving organisations across Nigeria and Africa. He holds a John Maxwell Leadership Programme certification and a professional counselling certificate from the Institute of Counseling Nigeria.
              </p>
              <p>
                He is married to his primary school sweetheart, and they are raising four children together. That personal foundation gives his work on marriage a credibility no qualification alone can confer.
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
            <div className="relative flex items-center justify-center">
              <img
                src={logoSrc}
                alt="Temple Obike — TO monogram"
                className="w-64 md:w-80 select-none"
                draggable={false}
              />
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
