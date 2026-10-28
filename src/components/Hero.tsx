import { useEffect, useState } from 'react';
import { cn } from '../utils/cn';
import { IMAGES, SITE, getOpenStatus } from '../data/site';
import { IconArrowRight, IconCow, IconFlame, IconLeaf, IconPhone, IconPin, IconStar, IconClock, SkylineDivider } from './ui';

/* Full-width smoky hero with Ken Burns breathing, navy overlay,
   exact client headline, dual CTAs, and a live info strip. */
export default function Hero() {
  const [status, setStatus] = useState(() => getOpenStatus());
  useEffect(() => {
    const t = window.setInterval(() => setStatus(getOpenStatus()), 30_000);
    return () => window.clearInterval(t);
  }, []);

  return (
    <section id="home" aria-label="Welcome to Country Boys Grill" className="relative flex min-h-[100svh] flex-col overflow-hidden bg-navy-950">
      {/* background: swap IMAGES.hero for the client’s own photo */}
      <div className="absolute inset-0" aria-hidden>
        <img src={IMAGES.hero} alt="" loading="eager" className="kenburns h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/85 via-navy-950/70 to-navy-950/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(7,30,56,0.75)_100%)]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-4 pb-16 pt-36 text-center sm:px-6">
        <p className="mb-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.35em] text-gold-400 sm:text-xs">
          <span className="hidden h-px w-10 bg-gold-400/60 sm:block" aria-hidden />
          Est. 2021 · Durham, North Carolina
          <span className="hidden h-px w-10 bg-gold-400/60 sm:block" aria-hidden />
        </p>

        <h1 className="font-display max-w-5xl text-4xl leading-[1.12] text-cream-50 drop-shadow-lg sm:text-6xl lg:text-7xl">
          Good Food. <span className="text-gold-400">Real Flavor.</span>
          <span className="mt-2 block">Southern Roots.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream-100/90 sm:text-lg">
          Southern-style BBQ, chicken, ribs &amp; soul food made with <strong className="font-semibold text-cream-50">local, farm-raised meats</strong> in
          Durham, NC.
        </p>

        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <a
            href="#menu"
            className="group flex w-full items-center justify-center gap-2.5 rounded-md bg-brick-600 px-8 py-4 font-display text-lg tracking-wide text-cream-50 shadow-xl shadow-brick-800/40 transition hover:-translate-y-0.5 hover:bg-brick-700 sm:w-auto"
          >
            View Our Menu
            <IconArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href={SITE.phoneHref}
            className="flex w-full items-center justify-center gap-2.5 rounded-md border-2 border-gold-400 px-8 py-4 font-display text-lg tracking-wide text-gold-400 transition hover:-translate-y-0.5 hover:bg-gold-400 hover:text-navy-950 sm:w-auto"
          >
            <IconPhone className="h-5 w-5" />
            Call to Order
          </a>
        </div>

        {/* stamped est. badge */}
        <div
          className="stamp-in mt-10 hidden select-none items-center gap-2 rounded border-2 border-gold-400/70 px-4 py-1.5 text-gold-400 sm:flex"
          aria-hidden
        >
          <IconStar className="h-3.5 w-3.5" />
          <span className="font-display text-sm tracking-[0.25em]">FRESH · LOCAL · DELICIOUS</span>
          <IconStar className="h-3.5 w-3.5" />
        </div>
      </div>

      {/* info strip */}
      <div className="relative border-t border-white/15 bg-navy-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-x-8 gap-y-2 px-4 py-4 text-sm text-cream-100 sm:flex-row sm:px-6">
          <a href={SITE.mapsDirections} target="_blank" rel="noreferrer" className="flex items-center gap-2 transition hover:text-gold-300">
            <IconPin className="h-4.5 w-4.5 shrink-0 text-gold-400" />
            <span className="font-medium">2900 Holloway Street, Durham, NC</span>
          </a>
          <a href={SITE.phoneHref} className="flex items-center gap-2 transition hover:text-gold-300">
            <IconPhone className="h-4.5 w-4.5 shrink-0 text-gold-400" />
            <span className="font-semibold">{SITE.phoneDisplay}</span>
          </a>
          <p className="flex items-center gap-2">
            <IconClock className="h-4.5 w-4.5 shrink-0 text-gold-400" />
            <span className={cn('rounded-full border px-3 py-0.5 text-xs font-bold uppercase tracking-wider', status.open ? 'border-emerald-400/60 bg-emerald-400/10 text-emerald-300' : 'border-brick-400/60 bg-brick-400/10 text-brick-400')}>
              {status.open ? `Open Today · until ${status.label.split('closes ')[1] ?? ''}` : status.label}
            </span>
          </p>
        </div>
      </div>

      {/* skyline silhouette into the trust banner */}
      <div className="relative text-brick-600" aria-hidden>
        <SkylineDivider className="h-10 text-cream-100 sm:h-14" />
      </div>
    </section>
  );
}

/* Red flyer-style trust banner: marquee of Fresh • Local • Delicious */
const MARQUEE_ITEMS = [
  { label: 'Fresh', Icon: IconLeaf },
  { label: 'Local', Icon: IconPin },
  { label: 'Delicious', Icon: IconFlame },
  { label: 'Est. 2021', Icon: IconStar },
  { label: 'Farm-Raised Meats', Icon: IconCow },
];

export function TrustMarquee() {
  const sequence = (
    <>
      {MARQUEE_ITEMS.map(({ label, Icon }) => (
        <span key={label} className="flex items-center gap-3 px-6">
          <Icon className="h-5 w-5" />
          <span className="font-display text-lg tracking-wider">{label}</span>
          <IconStar className="ml-5 h-3 w-3 opacity-70" />
        </span>
      ))}
    </>
  );
  return (
    <div className="marquee grain border-y-4 border-navy-950/20 bg-brick-600 py-3 text-cream-100" role="presentation">
      <div className="marquee-track" aria-hidden>
        {sequence}
        {sequence}
      </div>
      <span className="sr-only">Fresh. Local. Delicious. Est. 2021. Farm-raised meats.</span>
    </div>
  );
}
