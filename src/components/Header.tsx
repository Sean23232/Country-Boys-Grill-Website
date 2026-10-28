import { useEffect, useRef, useState } from 'react';
import { cn } from '../utils/cn';
import { NAV_LINKS, SITE, getOpenStatus } from '../data/site';
import { IconCompass, IconMenuBars, IconPhone, IconX, Logo } from './ui';

/* Sticky header: top info strip + main bar. Shadow appears on
   scroll, active link tracks the section in view, mobile drawer
   closes on link click / Esc / backdrop tap. */
export default function Header({ activeId }: { activeId: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [status, setStatus] = useState(() => getOpenStatus());
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Refresh the open/closed badge every 30s.
  useEffect(() => {
    const t = window.setInterval(() => setStatus(getOpenStatus()), 30_000);
    return () => window.clearInterval(t);
  }, []);

  // Mobile drawer: lock body scroll, focus close button, Esc to close.
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* top info strip */}
      <div className="hidden bg-navy-950 text-cream-100 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-1.5 text-xs">
          <p className="flex items-center gap-2">
            <span className={cn('inline-block h-2 w-2 rounded-full', status.open ? 'bg-emerald-400' : 'bg-brick-400')} aria-hidden />
            <span className="font-medium tracking-wide">{status.label}</span>
            <span className="text-cream-100/40" aria-hidden>
              ·
            </span>
            <span className="tracking-wide text-cream-100/80">{SITE.address}</span>
          </p>
          <a href={SITE.phoneHref} className="flex items-center gap-1.5 font-semibold text-gold-400 transition hover:text-gold-300">
            <IconPhone className="h-3.5 w-3.5" />
            {SITE.phoneDisplay}
          </a>
        </div>
      </div>

      {/* main bar */}
      <div className={cn('border-b border-white/10 bg-navy-900/95 backdrop-blur transition-shadow duration-300', scrolled && 'shadow-lg shadow-navy-950/50')}>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
          <a href="#home" className="flex items-center gap-3" aria-label="Country Boys Grill — back to top">
            <Logo className="h-12 w-12 sm:h-14 sm:w-14" />
            <span className="leading-none">
              <span className="font-display block text-base tracking-wider text-cream-100 sm:text-lg">COUNTRY BOYS</span>
              <span className="font-display block text-xl tracking-wider text-gold-400 sm:text-2xl">GRILL</span>
            </span>
          </a>

          {/* desktop nav */}
          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                aria-current={activeId === l.id ? 'page' : undefined}
                className={cn(
                  'relative rounded px-3 py-2 text-[13px] font-semibold uppercase tracking-widest transition-colors',
                  'after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-gold-400 after:transition-transform after:duration-300',
                  activeId === l.id ? 'text-gold-400 after:scale-x-100' : 'text-cream-100 hover:text-gold-300 hover:after:scale-x-100',
                )}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={SITE.phoneHref}
              className="flex items-center gap-2.5 rounded-md bg-brick-600 px-4 py-2.5 text-sm font-bold uppercase tracking-wider text-cream-50 shadow-md shadow-brick-800/40 transition hover:-translate-y-0.5 hover:bg-brick-700"
              aria-label={`Call ${SITE.name} at ${SITE.phoneDisplay}`}
            >
              <IconPhone className="h-4.5 w-4.5" />
              <span className="hidden sm:inline">Call to Order</span>
              <span className="sm:hidden">Call</span>
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-md text-cream-100 transition hover:bg-white/10 lg:hidden"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
            >
              <IconMenuBars className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* mobile drawer */}
      <div className={cn('fixed inset-0 z-50 lg:hidden', menuOpen ? '' : 'pointer-events-none')} aria-hidden={!menuOpen} inert={!menuOpen}>
        <div
          className={cn('absolute inset-0 bg-navy-950/70 transition-opacity duration-300', menuOpen ? 'opacity-100' : 'opacity-0')}
          onClick={() => setMenuOpen(false)}
        />
        <div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className={cn(
            'absolute right-0 top-0 flex h-full w-[min(21rem,88vw)] flex-col bg-navy-900 shadow-2xl transition-transform duration-300 ease-out',
            menuOpen ? 'translate-x-0' : 'translate-x-full',
          )}
        >
          <div className="flex items-center justify-between border-b border-white/10 p-4">
            <Logo className="h-12 w-12" />
            <button
              ref={closeBtnRef}
              type="button"
              onClick={() => setMenuOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-md text-cream-100 transition hover:bg-white/10"
              aria-label="Close menu"
            >
              <IconX className="h-5 w-5" />
            </button>
          </div>
          <nav aria-label="Mobile" className="flex flex-col gap-1 overflow-y-auto p-4">
            {NAV_LINKS.map((l, i) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  'font-display flex items-center justify-between rounded-md px-4 py-3 text-lg tracking-wide transition',
                  activeId === l.id ? 'bg-white/10 text-gold-400' : 'text-cream-100 hover:bg-white/5 hover:text-gold-300',
                )}
              >
                {l.label}
                <span className="text-xs text-cream-100/40" aria-hidden>
                  0{i + 1}
                </span>
              </a>
            ))}
          </nav>
          <div className="mt-auto grid grid-cols-2 gap-3 border-t border-white/10 p-4">
            <a
              href={SITE.phoneHref}
              className="flex items-center justify-center gap-2 rounded-md bg-brick-600 py-3 text-sm font-bold text-cream-50"
            >
              <IconPhone className="h-4 w-4" /> Call Us
            </a>
            <a
              href={SITE.mapsDirections}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-md border-2 border-gold-400 py-3 text-sm font-bold text-gold-400"
            >
              <IconCompass className="h-4 w-4" /> Directions
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
