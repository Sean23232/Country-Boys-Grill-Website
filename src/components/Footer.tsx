import { useEffect, useState } from 'react';
import { cn } from '../utils/cn';
import { HOURS, NAV_LINKS, SITE, hoursLabel } from '../data/site';
import { IconArrowUp, IconCompass, IconFacebook, IconFlame, IconInstagram, IconPhone, IconTikTok, Logo, SkylineDivider } from './ui';

const SOCIAL_ICONS = { facebook: IconFacebook, instagram: IconInstagram, tiktok: IconTikTok } as const;

/* ---------- 13. Footer ---------- */
export function Footer() {
  return (
    <footer className="relative bg-navy-950 text-cream-100">
      <div className="text-cream-100/12" aria-hidden>
        <SkylineDivider className="h-10 text-cream-100/12 sm:h-14" />
      </div>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <a href="#home" className="inline-flex" aria-label="Country Boys Grill — back to top">
            <Logo className="h-20 w-20" />
          </a>
          <p className="font-display mt-4 text-lg leading-snug tracking-wide text-gold-400">“{SITE.taglineAlt}”</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream-100/70">{SITE.strap}. {SITE.addressShort}. Est. {SITE.established}.</p>
          <div className="mt-5 flex gap-2.5">
            {SITE.socials.map((s) => {
              const Icon = SOCIAL_ICONS[s.icon];
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Country Boys Grill on ${s.label} (placeholder link)`}
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-white/15 text-cream-100/80 transition hover:border-gold-400 hover:bg-gold-400 hover:text-navy-950"
                >
                  <Icon className="h-4.5 w-4.5" />
                </a>
              );
            })}
          </div>
        </div>

        <nav aria-label="Footer">
          <h3 className="font-display text-sm tracking-[0.25em] text-gold-400">QUICK LINKS</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="text-cream-100/75 transition hover:text-gold-300">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="font-display text-sm tracking-[0.25em] text-gold-400">HOURS</h3>
          <ul className="mt-4 space-y-2 text-sm text-cream-100/75">
            {HOURS.map((h) => (
              <li key={h.day} className="flex justify-between gap-4">
                <span>{h.day}</span>
                <span className="tabular-nums">{hoursLabel(h)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm tracking-[0.25em] text-gold-400">FIND US</h3>
          <address className="mt-4 space-y-3 text-sm not-italic text-cream-100/75">
            <p>{SITE.address}</p>
            <p>
              <a href={SITE.phoneHref} className="flex items-center gap-2 font-semibold text-cream-100 transition hover:text-gold-300">
                <IconPhone className="h-4 w-4 text-gold-400" /> {SITE.phoneDisplay}
              </a>
            </p>
            <p>
              <a href={SITE.mapsDirections} target="_blank" rel="noreferrer" className="flex items-center gap-2 font-semibold text-cream-100 transition hover:text-gold-300">
                <IconCompass className="h-4 w-4 text-gold-400" /> Get Directions
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-cream-100/55 sm:flex-row sm:px-6">
          <p>© 2026 {SITE.name}. All rights reserved.</p>
          <p className="font-medium tracking-wide text-cream-100/70">{SITE.credit}</p>
        </div>
      </div>
      {/* space so the mobile action bar never covers the footer */}
      <div className="h-20 md:hidden" aria-hidden />
    </footer>
  );
}

/* ---------- 14. Sticky mobile action bar (Call / Directions / Menu) ---------- */
export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-60 border-t border-white/10 bg-navy-950/95 backdrop-blur md:hidden" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="grid grid-cols-3">
        <a href={SITE.phoneHref} className="flex items-center justify-center gap-2 py-3.5 text-sm font-bold uppercase tracking-wider text-cream-100 transition active:bg-white/10">
          <IconPhone className="h-4.5 w-4.5 text-gold-400" /> Call
        </a>
        <a
          href={SITE.mapsDirections}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 border-x border-white/10 py-3.5 text-sm font-bold uppercase tracking-wider text-gold-400 transition active:bg-white/10"
        >
          <IconCompass className="h-4.5 w-4.5" /> Directions
        </a>
        <a
          href="#menu"
          className="flex items-center justify-center gap-2 bg-brick-600 py-3.5 text-sm font-bold uppercase tracking-wider text-cream-50 transition active:bg-brick-700"
        >
          <IconFlame className="h-4.5 w-4.5" /> Menu
        </a>
      </div>
    </div>
  );
}

/* ---------- Back-to-top button ---------- */
export function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 650);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      className={cn(
        'fixed bottom-24 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-navy-900 text-gold-400 shadow-xl ring-2 ring-gold-400/40 transition-all duration-300 hover:bg-brick-600 hover:text-cream-50 md:bottom-6 md:right-6',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
      )}
    >
      <IconArrowUp className="h-5 w-5" />
    </button>
  );
}
