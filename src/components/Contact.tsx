import { useEffect, useState, type FormEvent } from 'react';
import { cn } from '../utils/cn';
import { CONTACT_SUBJECTS, HOURS, SITE, getOpenStatus, hoursLabel } from '../data/site';
import { IconCheck, IconClock, IconCompass, IconMail, IconPhone, IconPin, Reveal, SectionHeading } from './ui';

/* ---------- 12. Contact, location, hours & form ----------
   FRONT-END ONLY form.
   TODO(client): point the form at Formspree (https://formspree.io),
   EmailJS, or your own backend — replace the body of `submit()`. */

const fieldCls =
  'w-full rounded-md border bg-cream-50 px-3.5 py-2.5 text-sm text-char-900 placeholder:text-char-500/60 transition focus:outline-none focus:ring-2 focus:ring-gold-400';

interface MsgState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}
type Errors = Partial<Record<keyof MsgState, string>>;

function validate(f: MsgState): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = 'Please tell us your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = 'Enter a valid email so we can reply.';
  if (f.phone.trim() && !/^\+?[\d\s().-]{7,20}$/.test(f.phone.trim())) e.phone = 'That phone number looks off.';
  if (f.message.trim().length < 10) e.message = 'Give us a little more detail (10+ characters).';
  return e;
}

export default function Contact({ cateringTick }: { cateringTick: number }) {
  const [form, setForm] = useState<MsgState>({ name: '', email: '', phone: '', subject: CONTACT_SUBJECTS[0], message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [todayIdx] = useState(() => (new Date().getDay() + 6) % 7);
  const [status, setStatus] = useState(() => getOpenStatus());

  // Catering CTA preselects the subject (App increments the tick).
  useEffect(() => {
    if (cateringTick > 0) {
      setSent(false);
      setForm((f) => ({ ...f, subject: 'Catering' }));
    }
  }, [cateringTick]);

  useEffect(() => {
    const t = window.setInterval(() => setStatus(getOpenStatus()), 30_000);
    return () => window.clearInterval(t);
  }, []);

  const set = <K extends keyof MsgState>(key: K, value: MsgState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  function submit(e: FormEvent) {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    /* ---- FORM HANDOFF GOES HERE (Formspree / EmailJS / API) ---- */
    setSent(true);
  }

  const err = (k: keyof MsgState) =>
    errors[k] ? (
      <p className="mt-1 text-xs font-semibold text-brick-600" role="alert">
        {errors[k]}
      </p>
    ) : null;

  return (
    <section id="contact" aria-labelledby="contact-heading" className="grain bg-cream-100 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="Find Us, Call Us, Tell Us" title="Come Hungry... Leave Happy!" />
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          {/* left: info + hours */}
          <Reveal className="lg:col-span-2">
            <div className="flex h-full flex-col gap-6">
              <div className="rounded-lg border border-char-900/10 bg-cream-50 p-6 shadow-sm">
                <h3 className="font-display text-xl tracking-wide text-navy-900">Visit the Grill</h3>
                <ul className="mt-4 space-y-3.5 text-sm">
                  <li>
                    <a href={SITE.mapsDirections} target="_blank" rel="noreferrer" className="group flex items-start gap-3 text-char-600 transition hover:text-brick-600">
                      <IconPin className="mt-0.5 h-5 w-5 shrink-0 text-brick-600" />
                      <span>
                        <span className="block font-bold text-navy-900 group-hover:text-brick-600">{SITE.address}</span>
                        <span className="mt-0.5 inline-flex items-center gap-1 font-semibold text-brick-600">
                          <IconCompass className="h-3.5 w-3.5" /> Get directions
                        </span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href={SITE.phoneHref} className="group flex items-center gap-3 text-char-600 transition hover:text-brick-600">
                      <IconPhone className="h-5 w-5 shrink-0 text-brick-600" />
                      <span>
                        <span className="block font-bold text-navy-900 group-hover:text-brick-600">{SITE.phoneDisplay}</span>
                        <span className="text-xs font-semibold uppercase tracking-wider">Tap to call</span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${SITE.email}`} className="group flex items-center gap-3 text-char-600 transition hover:text-brick-600">
                      <IconMail className="h-5 w-5 shrink-0 text-brick-600" />
                      <span className="font-bold text-navy-900 group-hover:text-brick-600">{SITE.email}</span>
                    </a>
                  </li>
                </ul>
              </div>

              {/* hours — today's row highlights automatically */}
              <div className="flex-1 rounded-lg border border-char-900/10 bg-cream-50 p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xl tracking-wide text-navy-900">Hours</h3>
                  <span
                    className={cn(
                      'rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider',
                      status.open ? 'border-emerald-600/40 bg-emerald-50 text-emerald-700' : 'border-brick-600/40 bg-brick-600/5 text-brick-600',
                    )}
                  >
                    {status.open ? 'Open Now' : 'Closed'}
                  </span>
                </div>
                <table className="mt-4 w-full text-sm">
                  <caption className="sr-only">Weekly hours; today’s row is highlighted</caption>
                  <tbody>
                    {HOURS.map((h, i) => (
                      <tr key={h.day} className={cn('border-b border-char-900/8 last:border-0', i === todayIdx && 'bg-gold-400/15')}>
                        <th scope="row" className={cn('py-2 pl-2 text-left font-bold', i === todayIdx ? 'text-brick-600' : 'text-navy-900')}>
                          {h.day}
                          {i === todayIdx && <span className="ml-2 rounded-sm bg-brick-600 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-cream-50">Today</span>}
                        </th>
                        <td className={cn('py-2 pr-2 text-right', i === todayIdx ? 'font-bold text-navy-900' : 'text-char-600')}>{hoursLabel(h)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="mt-3 flex items-center gap-2 text-xs text-char-500">
                  <IconClock className="h-4 w-4 shrink-0" /> Kitchen closes 30 minutes before close.
                </p>
              </div>
            </div>
          </Reveal>

          {/* right: map + form */}
          <div className="flex flex-col gap-6 lg:col-span-3">
            <Reveal delay={100}>
              <div className="overflow-hidden rounded-lg border-4 border-navy-900 shadow-lg">
                <iframe
                  title="Map to Country Boys Grill, 2900 Holloway Street, Durham, NC"
                  src={SITE.mapsEmbed}
                  className="h-64 w-full sm:h-72"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="rounded-lg border border-char-900/10 bg-cream-50 p-6 shadow-sm sm:p-8">
                {sent ? (
                  <div className="flex flex-col items-center gap-4 py-8 text-center" role="status">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                      <IconCheck className="h-8 w-8" strokeWidth={2.4} />
                    </span>
                    <h3 className="font-display text-2xl tracking-wide text-navy-900">Message Received!</h3>
                    <p className="max-w-sm text-sm leading-relaxed text-char-600">
                      Thanks, {form.name.split(' ')[0] || 'friend'} — we read every note ourselves. We’ll get back to you
                      within one business day.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSent(false);
                        setForm({ name: '', email: '', phone: '', subject: CONTACT_SUBJECTS[0], message: '' });
                      }}
                      className="mt-2 rounded-md bg-navy-900 px-6 py-3 text-sm font-bold uppercase tracking-wider text-cream-50 transition hover:bg-navy-800"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={submit} noValidate>
                    <h3 className="font-display text-xl tracking-wide text-navy-900">Send Us a Note</h3>
                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="ct-name" className="mb-1 block text-xs font-bold uppercase tracking-wider text-char-600">Name *</label>
                        <input id="ct-name" value={form.name} onChange={(e) => set('name', e.target.value)} className={cn(fieldCls, errors.name ? 'border-brick-600' : 'border-char-900/20')} placeholder="Your name" autoComplete="name" />
                        {err('name')}
                      </div>
                      <div>
                        <label htmlFor="ct-email" className="mb-1 block text-xs font-bold uppercase tracking-wider text-char-600">Email *</label>
                        <input id="ct-email" type="email" value={form.email} onChange={(e) => set('email', e.target.value)} className={cn(fieldCls, errors.email ? 'border-brick-600' : 'border-char-900/20')} placeholder="you@example.com" autoComplete="email" />
                        {err('email')}
                      </div>
                      <div>
                        <label htmlFor="ct-phone" className="mb-1 block text-xs font-bold uppercase tracking-wider text-char-600">Phone (optional)</label>
                        <input id="ct-phone" type="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} className={cn(fieldCls, errors.phone ? 'border-brick-600' : 'border-char-900/20')} placeholder="919-555-0123" autoComplete="tel" />
                        {err('phone')}
                      </div>
                      <div>
                        <label htmlFor="ct-subject" className="mb-1 block text-xs font-bold uppercase tracking-wider text-char-600">Subject</label>
                        <select id="ct-subject" value={form.subject} onChange={(e) => set('subject', e.target.value)} className={cn(fieldCls, 'border-char-900/20')}>
                          {CONTACT_SUBJECTS.map((s) => (
                            <option key={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="ct-message" className="mb-1 block text-xs font-bold uppercase tracking-wider text-char-600">Message *</label>
                        <textarea id="ct-message" rows={4} value={form.message} onChange={(e) => set('message', e.target.value)} className={cn(fieldCls, 'resize-none', errors.message ? 'border-brick-600' : 'border-char-900/20')} placeholder="Tell us what’s up — catering headcounts, feedback, or just which sauce you prefer." />
                        {err('message')}
                      </div>
                    </div>
                    <button type="submit" className="mt-5 w-full rounded-md bg-brick-600 py-3.5 font-display tracking-wide text-cream-50 shadow-md transition hover:-translate-y-0.5 hover:bg-brick-700 sm:w-auto sm:px-10">
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
