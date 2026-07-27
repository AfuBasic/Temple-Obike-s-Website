import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import bookCoverSrc from '@assets/f123ebc6-1cd8-4218-836b-4da5f9aaa958_1785166711807.png';
import logoSrc from '@assets/IMG-20260727-WA0003_1785149135010.jpg';

const schema = z.object({
  name:     z.string().min(2, 'Please enter your name'),
  email:    z.string().email('Please enter a valid email address'),
  phone:    z.string().optional(),
  note:     z.string().optional(),
  botcheck: z.string().optional(), // honeypot — must stay empty for real users
});
type FormData = z.infer<typeof schema>;

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string;

export default function FerrgBook() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    // Honeypot: if a bot filled the hidden field, silently discard
    if (data.botcheck) {
      setStatus('sent');
      reset();
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          to: 'templescounsel@gmail.com',
          subject: 'Pre-Order: The FERRG Relationship Model',
          from_name: data.name,
          email: data.email,
          replyto: data.email,
          phone: data.phone || 'Not provided',
          note: data.note || 'Not provided',
          botcheck: data.botcheck ?? '',
        }),
      });
      const json = await res.json();
      if (json.success) {
        setStatus('sent');
        reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[#06080F] text-foreground font-sans">

      {/* Nav bar */}
      <nav className="border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3 group">
          <img src={logoSrc} alt="Temple Obike" className="w-9 opacity-90 group-hover:opacity-100 transition" />
          <span className="text-xs tracking-[0.18em] text-muted-foreground uppercase font-medium group-hover:text-primary transition">
            Temple Obike
          </span>
        </a>
        <a
          href="#reserve"
          className="hidden sm:inline-flex items-center px-6 py-2.5 bg-primary text-primary-foreground text-xs font-semibold tracking-wide hover:bg-[#c99a5e] transition"
        >
          Reserve My Copy
        </a>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[700px] h-[500px] bg-primary/8 blur-[160px] rounded-full" />
        </div>

        <div className="container mx-auto px-6 py-20 md:py-28 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Book cover */}
            <div className="flex justify-center lg:justify-start order-2 lg:order-1">
              <div className="relative">
                {/* Glow behind cover */}
                <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-lg scale-90" />
                <img
                  src={bookCoverSrc}
                  alt="New book coming soon — Temple Obike"
                  className="relative w-72 md:w-80 shadow-2xl shadow-black/60"
                  style={{ filter: 'blur(4px)' }}
                />
                {/* Coming soon ribbon */}
                <div className="absolute -top-3 -right-3 bg-primary text-primary-foreground text-[10px] font-bold tracking-[0.15em] uppercase px-4 py-1.5 shadow-lg">
                  Coming Soon
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="order-1 lg:order-2">
              <span className="inline-block text-[10px] font-bold tracking-[0.25em] text-primary uppercase mb-6">
                New Book · Temple Obike
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-[3.2rem] font-serif font-semibold leading-[1.1] text-foreground mb-6">
                Understanding Why Love Isn't Enough.<br className="hidden md:block" /> And What Comes After.
              </h1>
              <p className="text-[10px] text-muted-foreground/40 tracking-[0.15em] uppercase mb-4">
                © {new Date().getFullYear()} Temple Obike · All rights reserved
              </p>
              <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8 max-w-lg">
                Most couples don't fail because they stopped loving each other. They fail because no one ever gave them a map for what love alone cannot fix. This book is that map.
              </p>
              <p className="text-base text-muted-foreground font-light leading-relaxed mb-10 max-w-lg">
                Written by Temple Obike, therapist, marriage counsellor, and the person couples call when everything else has failed. This is a book about the real journey: the parts nobody talks about, the moments that either break a relationship permanently or quietly make it something stronger than it was before.
              </p>
              <a
                href="#reserve"
                className="inline-flex items-center px-10 py-5 bg-primary text-primary-foreground font-semibold text-sm tracking-wide hover:bg-[#c99a5e] transition active:scale-[0.98]"
              >
                Reserve My Copy. Free to Pre-Order.
              </a>
              <p className="mt-4 text-xs text-muted-foreground/60">
                No payment required now. We'll notify you when it's ready.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* What this book does — outcomes, no methodology */}
      <section className="border-t border-white/5 bg-card py-20 md:py-28">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <span className="inline-block text-[10px] font-bold tracking-[0.25em] text-primary uppercase mb-4">
              What This Book Gives You
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground">
              Built for couples who are serious about their marriage
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                heading: "Language for what you're actually going through",
                body: "Most couples know something is wrong but can't name it. This book gives you the precise vocabulary to identify where your relationship is, why it got there, and what that stage actually requires of you.",
              },
              {
                heading: "A way through conflict that doesn't destroy you",
                body: "Not a formula. Not a set of rules. A framework grounded in real clinical work with real couples, one that acknowledges that conflict, handled correctly, can become the foundation of something more resilient than what you had before.",
              },
              {
                heading: "Practical tools, not just principles",
                body: "Every insight in this book is followed by something you can do. Because a marriage is not improved by understanding alone. It is improved by two people choosing to act on what they now understand.",
              },
            ].map(({ heading, body }) => (
              <div
                key={heading}
                className="bg-background border-t-2 border-t-primary/50 border-x border-b border-border p-8 hover:-translate-y-1 transition-transform duration-300"
              >
                <h3 className="text-lg font-serif font-semibold text-foreground mb-4 leading-snug">
                  {heading}
                </h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block text-[10px] font-bold tracking-[0.25em] text-primary uppercase mb-6">
                Is This Book For You?
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-8 leading-tight">
                This isn't a book about saving a dying marriage. It's a book about building a great one.
              </h2>
              <p className="text-muted-foreground font-light leading-relaxed mb-6">
                Whether you're in crisis or simply aware that something between you and your partner could be deeper, more honest, more resilient, this book was written for you.
              </p>
              <p className="text-muted-foreground font-light leading-relaxed">
                It speaks to the couple that tried counselling and felt like something was still missing. To the couple that loves each other but keeps having the same argument. To the couple that made it through something hard and isn't sure how to move forward from here.
              </p>
            </div>
            <div className="space-y-4">
              {[
                'You love each other but struggle to feel like a team',
                "You've been through something that changed how you see each other",
                'You want a marriage that goes deeper than getting along',
                "You've read the generic advice and found it doesn't hold up in real life",
                "You're willing to do the work if someone can show you what the work actually is",
              ].map((item) => (
                <div key={item} className="flex items-start gap-4 p-5 bg-card border border-border">
                  <span className="text-primary mt-0.5 text-lg leading-none flex-shrink-0">·</span>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Author credibility */}
      <section className="border-y border-white/5 bg-card py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="flex flex-col md:flex-row items-center gap-10 text-center md:text-left">
            <img src={logoSrc} alt="Temple Obike" className="w-24 flex-shrink-0" />
            <div>
              <p className="text-lg font-serif text-foreground mb-3 leading-relaxed">
                "I have sat with over 2,380 hours of live therapy sessions. I have heard every version of the same story. This book is not theory. It is what I have seen actually work, distilled into something every couple can use."
              </p>
              <p className="text-sm text-primary font-semibold tracking-wide">
                Temple Obike, LMFT
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Licensed Marriage & Family Therapist · Marriage Coach & Interventionist · Founder, TCMA · Author
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses coming */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <span className="inline-block text-[10px] font-bold tracking-[0.25em] text-primary uppercase mb-6">
            What's Coming With the Book
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-6">
            The book is the beginning, not the end
          </h2>
          <p className="text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto mb-14">
            Pre-order readers will be the first to hear about companion resources being built alongside the book, designed for couples who want to go further than reading.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                label: 'Online Course',
                desc: "A structured video programme that walks couples through the book's principles at their own pace, with exercises, reflections, and guided sessions.",
                badge: 'Coming Soon',
              },
              {
                label: 'Couples Workshop',
                desc: 'Live, intimate group workshops with Temple in Lagos, Abuja, and virtually, for couples who want to do this work in community.',
                badge: 'Coming Soon',
              },
              {
                label: 'Private Cohorts',
                desc: 'Small-group coaching cohorts for couples ready for deeper, more personalised engagement. Limited spaces. Pre-order readers get first access.',
                badge: 'Limited Access',
              },
            ].map(({ label, desc, badge }) => (
              <div key={label} className="bg-card border border-border p-8 text-left relative overflow-hidden">
                <div className="absolute top-4 right-4 text-[9px] font-bold tracking-[0.15em] uppercase text-primary border border-primary/40 px-2 py-1">
                  {badge}
                </div>
                <h3 className="text-base font-semibold text-foreground mb-3 mt-2">{label}</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pre-order form */}
      <section id="reserve" className="border-t border-white/5 bg-card py-20 md:py-28 scroll-mt-8">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="text-center mb-12">
            <span className="inline-block text-[10px] font-bold tracking-[0.25em] text-primary uppercase mb-4">
              Reserve Your Copy
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-4">
              Be first in line when it drops
            </h2>
            <p className="text-muted-foreground font-light leading-relaxed">
              No payment now. Just your details, and we'll reach out the moment it's ready, plus give you early access to companion courses and events.
            </p>
          </div>

          {status === 'sent' ? (
            <div className="border border-primary/30 bg-primary/5 p-10 text-center">
              <div className="text-3xl mb-4">✦</div>
              <h3 className="text-xl font-serif font-semibold text-foreground mb-3">You're on the list.</h3>
              <p className="text-muted-foreground font-light leading-relaxed">
                We'll be in touch the moment the book is ready. Thank you for your trust. Temple looks forward to putting this in your hands.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Honeypot — hidden from real users; bots fill it in, causing the submission to be discarded */}
              <input {...register('botcheck')} type="text" name="botcheck" tabIndex={-1} autoComplete="off" style={{ display: 'none' }} aria-hidden="true" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold tracking-[0.12em] uppercase text-muted-foreground mb-2">
                    Full Name *
                  </label>
                  <input
                    {...register('name')}
                    placeholder="Your name"
                    className="w-full bg-background border border-border px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition"
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-red-400">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold tracking-[0.12em] uppercase text-muted-foreground mb-2">
                    Email Address *
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="your@email.com"
                    className="w-full bg-background border border-border px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition"
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-[0.12em] uppercase text-muted-foreground mb-2">
                  WhatsApp / Phone <span className="text-muted-foreground/40 font-normal normal-case tracking-normal">(optional, for early event invites)</span>
                </label>
                <input
                  {...register('phone')}
                  placeholder="+234 800 000 0000"
                  className="w-full bg-background border border-border px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-[0.12em] uppercase text-muted-foreground mb-2">
                  Anything you'd like Temple to know? <span className="text-muted-foreground/40 font-normal normal-case tracking-normal">(optional)</span>
                </label>
                <textarea
                  {...register('note')}
                  rows={3}
                  placeholder="A question, a situation you're navigating, why this book matters to you…"
                  className="w-full bg-background border border-border px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition resize-none"
                />
              </div>

              {status === 'error' && (
                <p className="text-sm text-red-400 text-center">Something went wrong. Please try again or reach out via WhatsApp.</p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-5 bg-primary text-primary-foreground font-semibold text-sm tracking-wide hover:bg-[#c99a5e] transition active:scale-[0.99] disabled:opacity-60"
              >
                {status === 'sending' ? 'Reserving…' : 'Reserve My Copy. Free Pre-Order.'}
              </button>
              <p className="text-center text-xs text-muted-foreground/50">
                Your details are kept private. No spam, ever.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10">
        <div className="container mx-auto px-6 max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground/50">
          <div className="flex flex-col gap-1">
            <span>© {new Date().getFullYear()} Temple Obike · Temple's Counsel &amp; Mind Academy Ltd. All rights reserved.</span>
            <span className="text-muted-foreground/35">This work and its methodology are protected intellectual property of Temple Obike. Unauthorised reproduction or use is prohibited.</span>
          </div>
          <a href="/" className="hover:text-primary transition whitespace-nowrap">← Back to templeobike.com</a>
        </div>
      </footer>

    </div>
  );
}
