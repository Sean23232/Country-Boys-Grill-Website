import { useEffect, useRef, useState } from 'react';
import { cn } from '../utils/cn';
import { REVIEWS } from '../data/site';
import { IconChevronLeft, IconChevronRight, IconQuote, Reveal, SectionHeading, StarRating } from './ui';

/* ---------- 10. Reviews carousel ----------
   PLACEHOLDER testimonials — swap in the client’s real
   Google / Yelp reviews from src/data/site.ts (REVIEWS).
   Autoplay pauses on hover and for reduced-motion users. */
export default function Reviews() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Autoplay every 6s unless hovered / reduced motion.
  useEffect(() => {
    if (paused || reduced.current) return;
    const t = window.setInterval(() => setIndex((i) => (i + 1) % REVIEWS.length), 6000);
    return () => window.clearInterval(t);
  }, [paused]);

  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + REVIEWS.length) % REVIEWS.length);
  const review = REVIEWS[index];

  return (
    <section id="reviews" aria-labelledby="reviews-heading" className="grain bg-cream-50 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="Word on the Street" title="What Durham Is Saying" />
        </Reveal>

        <Reveal delay={120}>
          <div
            className="relative mt-12"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <div className="overflow-hidden rounded-lg">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${index * 100}%)` }}
                aria-live="polite"
              >
                {REVIEWS.map((r, i) => (
                  <figure key={r.name} className="w-full shrink-0 px-1" aria-hidden={i !== index}>
                    <div className="relative mx-auto max-w-3xl rounded-lg border border-char-900/10 bg-cream-100 px-6 py-10 text-center shadow-sm sm:px-12">
                      <IconQuote className="mx-auto mb-5 h-10 w-10 text-brick-600/30" />
                      <StarRating value={r.stars} className="mb-4 justify-center [&>svg]:h-5 [&>svg]:w-5" />
                      <blockquote className="text-base leading-relaxed text-char-600 sm:text-lg">
                        <span aria-hidden>“</span>
                        {r.text}
                        <span aria-hidden>”</span>
                      </blockquote>
                      <figcaption className="mt-6">
                        <p className="font-display text-lg tracking-wide text-navy-900">{r.name}</p>
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-char-500">{r.area}</p>
                      </figcaption>
                    </div>
                  </figure>
                ))}
              </div>
            </div>

            {/* arrows */}
            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute -left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-char-900/15 bg-cream-50 text-navy-900 shadow-md transition hover:bg-brick-600 hover:text-cream-50 sm:-left-5"
              aria-label="Previous review"
            >
              <IconChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="absolute -right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-char-900/15 bg-cream-50 text-navy-900 shadow-md transition hover:bg-brick-600 hover:text-cream-50 sm:-right-5"
              aria-label="Next review"
            >
              <IconChevronRight className="h-5 w-5" />
            </button>

            {/* dots */}
            <div className="mt-6 flex justify-center gap-2.5" role="tablist" aria-label="Choose review">
              {REVIEWS.map((r, i) => (
                <button
                  key={r.name}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Review ${i + 1} of ${REVIEWS.length}`}
                  onClick={() => setIndex(i)}
                  className={cn(
                    'h-2.5 rounded-full transition-all duration-300',
                    i === index ? 'w-8 bg-brick-600' : 'w-2.5 bg-char-900/25 hover:bg-char-900/40',
                  )}
                />
              ))}
            </div>
            <p className="sr-only" aria-live="polite">
              Showing review {index + 1} of {REVIEWS.length}: {review.name}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
