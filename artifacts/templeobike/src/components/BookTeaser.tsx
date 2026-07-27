import { motion } from 'framer-motion';
import bookCoverSrc from '@assets/f123ebc6-1cd8-4218-836b-4da5f9aaa958_1785166711807.png';

export function BookTeaser() {
  return (
    <section className="py-24 md:py-32 bg-card border-y border-border relative overflow-hidden">
      {/* Ambient gold glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/6 blur-[140px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Cover — blurred/mysterious */}
          <motion.div
            className="lg:col-span-4 flex justify-center"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <div className="relative group">
              {/* Soft glow behind */}
              <div className="absolute inset-0 bg-primary/15 blur-[50px] rounded scale-90" />
              {/* Cover — slightly blurred to tease */}
              <img
                src={bookCoverSrc}
                alt="New book coming soon — Temple Obike"
                className="relative w-56 md:w-64 shadow-2xl shadow-black/50 filter blur-[2px] group-hover:blur-0 transition-all duration-700 select-none"
                draggable={false}
              />
              {/* Overlay label */}
              <div className="absolute inset-0 flex items-end justify-center pb-4 pointer-events-none">
                <span className="bg-background/80 backdrop-blur-sm text-primary text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-2 border border-primary/30 group-hover:opacity-0 transition-opacity duration-500">
                  Hover to Reveal
                </span>
              </div>
              {/* Coming soon badge */}
              <div className="absolute -top-3 -right-3 bg-primary text-primary-foreground text-[9px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 shadow-lg">
                Coming Soon
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            className="lg:col-span-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <span className="inline-block text-[10px] font-bold tracking-[0.25em] text-primary uppercase mb-6">
              New Book · In Progress
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground leading-tight mb-6">
              Understanding Why Love Isn't Enough —<br className="hidden md:block" /> And What Comes After
            </h2>
            <p className="text-lg text-muted-foreground font-light leading-relaxed mb-5 max-w-xl">
              Temple's third book is a guide for couples who love each other but can't seem to break through — to a deeper, more honest, more resilient version of their marriage.
            </p>
            <p className="text-base text-muted-foreground font-light leading-relaxed mb-8 max-w-xl">
              Drawn from over 2,380 hours of live clinical work, it gives couples language for what they're actually going through, and a clear path through conflict toward something stronger. A companion course and live workshop series are being built alongside it.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href="/ferrg-book"
                className="inline-flex items-center justify-center px-10 py-5 bg-primary text-primary-foreground font-semibold text-sm tracking-wide hover:bg-[#c99a5e] transition active:scale-[0.98] duration-200"
              >
                Reserve My Copy — Free Pre-Order
              </a>
              <a
                href="/ferrg-book"
                className="text-sm text-muted-foreground hover:text-primary transition font-light"
              >
                Learn more about the book →
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
