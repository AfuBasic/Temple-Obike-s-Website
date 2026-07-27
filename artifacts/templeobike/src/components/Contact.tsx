import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  organization: z.string().min(2, "Organization is required"),
  date: z.string().min(1, "Date is required"),
  audience: z.string().min(1, "Audience size is required"),
  topic: z.string().min(1, "Topic is required"),
  budget: z.string().optional(),
  message: z.string().min(10, "Please provide a few details about the engagement"),
});

type FormValues = z.infer<typeof formSchema>;

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormValues) => {
    const subject = `Speaking Inquiry: ${data.organization} - ${data.date}`;
    const body = `Name: ${data.name}\nOrganization: ${data.organization}\nEvent Date: ${data.date}\nAudience Size: ${data.audience}\nTopic: ${data.topic}\nBudget: ${data.budget || 'Not specified'}\n\nMessage:\n${data.message}`;

    window.location.href = `mailto:hello@templeobike.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 8000);
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative bg-background">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center md:text-left"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-4">
            Bring Temple to Your Stage
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-foreground">
            Request Booking
          </h2>
        </motion.div>

        <div className="bg-card border border-border p-8 md:p-12 relative overflow-hidden">
          {/* Subtle accent corner */}
          <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-primary/20"></div>

          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              {/* THE ONLY GREEN HIGHLIGHT ON THE SITE */}
              <div className="w-16 h-16 bg-accent/10 border border-accent/20 text-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif text-foreground mb-3">Request Drafted</h3>
              <p className="text-muted-foreground font-light max-w-md mx-auto">
                Your default email client has been opened to finalize and send this request to Temple's team.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" data-testid="form-contact">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Name</label>
                  <input
                    {...register('name')}
                    data-testid="input-name"
                    className="w-full bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none px-4 py-3.5 text-foreground transition-all rounded-none placeholder:text-muted-foreground/30 font-light"
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Organization</label>
                  <input
                    {...register('organization')}
                    data-testid="input-organization"
                    className="w-full bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none px-4 py-3.5 text-foreground transition-all rounded-none placeholder:text-muted-foreground/30 font-light"
                    placeholder="Acme Corp"
                  />
                  {errors.organization && <p className="text-red-500 text-xs">{errors.organization.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Event Date</label>
                  <input
                    type="date"
                    {...register('date')}
                    data-testid="input-date"
                    className="w-full bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none px-4 py-3.5 text-foreground transition-all rounded-none [color-scheme:dark] font-light"
                  />
                  {errors.date && <p className="text-red-500 text-xs">{errors.date.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Audience Size</label>
                  <input
                    {...register('audience')}
                    data-testid="input-audience"
                    className="w-full bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none px-4 py-3.5 text-foreground transition-all rounded-none placeholder:text-muted-foreground/30 font-light"
                    placeholder="e.g. 500-1000 attendees"
                  />
                  {errors.audience && <p className="text-red-500 text-xs">{errors.audience.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Topic of Interest</label>
                  <div className="relative">
                    <select
                      {...register('topic')}
                      data-testid="select-topic"
                      className="w-full bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none px-4 py-3.5 text-foreground transition-all appearance-none rounded-none font-light"
                    >
                      <option value="">Select a topic...</option>
                      <option value="Trust & Relationships">Trust & Relationships</option>
                      <option value="Emotional Intelligence">Emotional Intelligence</option>
                      <option value="Trauma & Repair">Trauma & Repair</option>
                      <option value="Custom">Custom</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  {errors.topic && <p className="text-red-500 text-xs">{errors.topic.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Budget Range (Optional)</label>
                  <div className="relative">
                    <select
                      {...register('budget')}
                      data-testid="select-budget"
                      className="w-full bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none px-4 py-3.5 text-foreground transition-all appearance-none rounded-none font-light"
                    >
                      <option value="">Select a range...</option>
                      <option value="Under $2,000">Under $2,000</option>
                      <option value="$2,000–$5,000">$2,000–$5,000</option>
                      <option value="$5,000–$10,000">$5,000–$10,000</option>
                      <option value="$10,000+">$10,000+</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Message</label>
                <textarea
                  {...register('message')}
                  data-testid="textarea-message"
                  rows={4}
                  className="w-full bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none px-4 py-3.5 text-foreground transition-all resize-none rounded-none placeholder:text-muted-foreground/30 font-light"
                  placeholder="Tell us about the event context and audience..."
                />
                {errors.message && <p className="text-red-500 text-xs">{errors.message.message}</p>}
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  data-testid="button-submit-booking"
                  className="w-full bg-primary hover:bg-[#c99a5e] text-primary-foreground font-semibold py-4.5 transition-all tracking-wide text-sm"
                >
                  Send Booking Request
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
          <a href="mailto:hello@templeobike.com" data-testid="link-contact-email" className="hover:text-primary transition-colors flex items-center gap-2 pb-1 border-b border-transparent hover:border-primary">
            hello@templeobike.com
          </a>
          <span className="hidden md:inline text-border">—</span>
          <a href="https://wa.me/234000000000" target="_blank" rel="noopener noreferrer" data-testid="link-contact-whatsapp" className="hover:text-primary transition-colors flex items-center gap-2 pb-1 border-b border-transparent hover:border-primary">
            WhatsApp Inquiry
          </a>
        </div>
      </div>
    </section>
  );
}
