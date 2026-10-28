import { useCallback, useEffect, useRef, useState } from 'react';
import { GALLERY } from '../data/site';
import { IconChevronLeft, IconChevronRight, IconX, Reveal, SectionHeading } from './ui';

/* ---------- 9. Gallery with accessible lightbox ----------
   Click to enlarge; ←/→ to navigate; Esc or X to close. */
export default function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const show = useCallback((i: number) => setIndex((i + GALLERY.length) % GALLERY.length), []);
  const close = useCallback(() => setIndex(null), []);

  // Keyboard support while the lightbox is open.
  useEffect(() => {
    if (index === null) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') show(index + 1);
      if (e.key === 'ArrowLeft') show(index - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, show, close]);

  const current = index !== null ? GALLERY[index] : null;

  return (
    <section id="gallery" aria-labelledby="gallery-heading" className="wood grain py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="From the Pit to Your Plate" title="A Look Around" tone="dark" />
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {GALLERY.map((g, i) => (
            <Reveal key={g.src} delay={(i % 3) * 80}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="group relative block h-full w-full overflow-hidden rounded-md focus-visible:outline-gold-400"
                aria-label={`Enlarge photo: ${g.caption}`}
              >
                <img
                  src={g.thumb}
                  alt={g.alt}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-107 group-hover:brightness-90"
                />
                <span className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-navy-950/90 to-transparent px-3 pb-2.5 pt-8 text-left text-xs font-semibold text-cream-100 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {g.caption}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* lightbox */}
      {current && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={`Photo: ${current.caption}`}>
          <div className="absolute inset-0 bg-navy-950/95 backdrop-blur-sm" onClick={close} />
          <figure className="relative w-full max-w-4xl">
            <img
              src={current.src}
              alt={current.alt}
              className="mx-auto max-h-[78vh] w-auto rounded-md border-4 border-cream-100/10 object-contain shadow-2xl"
            />
            <figcaption className="mt-4 flex items-center justify-between gap-4 text-cream-100">
              <span className="font-display text-lg tracking-wide">{current.caption}</span>
              <span className="text-sm text-cream-100/60" aria-live="polite">
                {index! + 1} / {GALLERY.length}
              </span>
            </figcaption>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              className="absolute -top-3 -right-3 flex h-11 w-11 items-center justify-center rounded-full bg-brick-600 text-cream-50 shadow-lg transition hover:bg-brick-700"
              aria-label="Close photo"
            >
              <IconX className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => show(index! - 1)}
              className="absolute left-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream-50/10 text-cream-50 backdrop-blur transition hover:bg-gold-400 hover:text-navy-950 sm:-left-5"
              aria-label="Previous photo"
            >
              <IconChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={() => show(index! + 1)}
              className="absolute right-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream-50/10 text-cream-50 backdrop-blur transition hover:bg-gold-400 hover:text-navy-950 sm:-right-5"
              aria-label="Next photo"
            >
              <IconChevronRight className="h-6 w-6" />
            </button>
          </figure>
        </div>
      )}
    </section>
  );
}
