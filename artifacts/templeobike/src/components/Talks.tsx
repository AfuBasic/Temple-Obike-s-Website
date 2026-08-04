import { motion } from 'framer-motion';

export function Talks() {
  const talks = [
    {
      title: "The Architecture of Trust",
      desc: "What actually rebuilds trust after betrayal, and why most advice gets the order wrong.",
    },
    {
      title: "Emotional Intelligence as a Leadership Currency",
      desc: "Why EQ, not credentials, predicts who leads rooms well.",
    },
    {
      title: "From Fracture to Repair",
      desc: "A practical framework for moving individuals, couples, and teams through breakdown toward something stronger.",
    },
    {
      title: "Leading with Emotional Authority",
      desc: "How the most effective leaders regulate themselves first — and why that single discipline shapes everything else in the room.",
    },
    {
      title: "Becoming Your Best Authentic Self",
      desc: "A guided framework for self-discovery, purpose alignment, and the practical work of becoming the person you were built to be.",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-card border-y border-border">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-20"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.2em] text-primary uppercase">
            What He Speaks On
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {talks.map((talk, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="group bg-background p-10 border-t border-t-primary/40 border-x border-b border-x-border border-b-border hover:border-t-primary hover:border-x-border hover:border-b-border transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
            >
              {/* Subtle hover reveal background */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 -mr-16 -mt-16 rounded-full transition-transform group-hover:scale-[2.5] duration-700 ease-out z-0"></div>
              
              <h3 className="text-2xl font-serif font-semibold text-foreground mb-4 leading-snug relative z-10">
                "{talk.title}"
              </h3>
              <p className="text-muted-foreground font-light leading-relaxed relative z-10">
                {talk.desc}
              </p>
              
              {/* Decorative line */}
              <div className="w-8 h-[1px] bg-primary/30 mt-8 group-hover:w-16 transition-all duration-500 relative z-10"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
