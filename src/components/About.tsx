import { useEffect, useRef, useState } from 'react';
import { COUNTERS, IMAGES } from '../data/site';
import { IconArrowRight, IconCow, IconFlame, IconLeaf, IconStar, Reveal, SectionHeading } from './ui';

/* ---------- 8. About — story, values, animated counters ---------- */

const VALUES = [
  {
    Icon: IconCow,
    title: 'Local & Farm-Raised',
    copy: 'Whole animals and fresh cuts from Central Piedmont farms, delivered most weeks. If it came from a feedlot in another state, it isn’t on our board.',
  },
  {
    Icon: IconFlame,
    title: 'Made Fresh',
    copy: 'Batters mixed by hand every morning, slaw cut at six, sauces stirred on the stove, and the smoker lit before you can smell it. Nothing sits.',
  },
  {
    Icon: IconStar,
    title: 'Southern Hospitality',
    copy: 'You’re not a number here — you’re the family we cook for. Expect a pour of sweet tea, a second opinion on your sauce, and a dog biscuit for your boy.',
  },
];

function Counter({ value, suffix, label, delay = 0 }: { value: number; suffix: string; label: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        io.disconnect();
        if (reduced) {
          setDisplay(value);
          return;
        }
        const t0 = performance.now() + delay;
        const dur = 1400;
        const tick = (now: number) => {
          const p = Math.min(1, Math.max(0, (now - t0) / dur));
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(Math.round(value * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, delay]);

  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-4xl tracking-wide text-gold-400 sm:text-5xl">
        {display}
        {suffix}
      </p>
      <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-cream-100/80">{label}</p>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="grain bg-cream-100 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="Who’s Cooking" title="Southern Roots, Served Fresh Since 2021" />
        </Reveal>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal className="relative">
            <div className="overflow-hidden rounded-lg border-8 border-navy-900 shadow-2xl shadow-navy-900/30">
              <img src={IMAGES.interior} alt="The warm, candlelit dining room at Country Boys Grill" loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div
              className="font-display absolute -bottom-5 -right-3 rotate-[-6deg] rounded border-4 border-brick-600 bg-cream-50 px-5 py-3 text-center text-brick-600 shadow-lg sm:-right-5"
              aria-label="Established 2021"
            >
              <span className="block text-xs tracking-[0.3em]">EST.</span>
              <span className="block text-3xl leading-none">2021</span>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h3 className="font-display text-2xl leading-snug tracking-wide text-navy-900 sm:text-3xl">
              Two cousins, one smoker, and a corner of Holloway Street.
            </h3>
            <div className="mt-5 space-y-4 leading-relaxed text-char-600">
              <p>
                Country Boys Grill started in 2021 with a single offset smoker, a borrowed table, and a stubborn belief:
                that Durham deserved barbecue the way our grandmothers made it — smoke you can see from the sidewalk,
                meat from farmers we know by name, and sides made the morning you eat them.
              </p>
              <p>
                We kept it a family business on purpose. The sauce is still stirred the same way, the buttermilk brine
                still runs for a full day, and the farmers still get a call every Tuesday morning. When we feed you, we’re
                feeding neighbors — because around here, everyone at the table is family eventually.
              </p>
              <p className="font-semibold text-navy-900">
                So pull up a chair. Take a bite. And don’t be shy about the second rack.
              </p>
            </div>
          </Reveal>
        </div>

        {/* value cards */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {VALUES.map(({ Icon, title, copy }, i) => (
            <Reveal key={title} delay={i * 100} as="article">
              <div className="group h-full rounded-lg border-t-4 border-brick-600 bg-cream-50 p-6 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-navy-900 text-gold-400 transition group-hover:bg-brick-600 group-hover:text-cream-50">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="font-display text-xl tracking-wide text-navy-900">{title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-char-600">{copy}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* counters band */}
        <Reveal delay={100}>
          <div className="wood grain mt-16 grid grid-cols-2 gap-8 rounded-lg px-6 py-10 shadow-xl sm:grid-cols-4">
            <div className="text-center">
              <p className="font-display text-4xl tracking-wide text-cream-50 sm:text-5xl">2021</p>
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-cream-100/80">Est. — and Still Smoking</p>
            </div>
            {COUNTERS.map((c, i) => (
              <Counter key={c.label} value={c.value} suffix={c.suffix} label={c.label} delay={i * 150} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- 11. Catering & events strip ---------- */
export function CateringStrip({ onCatering }: { onCatering: () => void }) {
  return (
    <section aria-labelledby="catering-heading" className="grain relative overflow-hidden bg-brick-600 py-14 text-cream-50">
      <IconLeaf className="absolute -left-8 -top-8 h-40 w-40 rotate-12 text-cream-50/10" aria-hidden />
      <IconFlame className="absolute -bottom-10 -right-6 h-44 w-44 -rotate-12 text-cream-50/10" aria-hidden />
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 text-center sm:px-6 lg:flex-row lg:justify-between lg:text-left">
        <div>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.3em] text-gold-300">Catering &amp; Events</p>
          <h2 id="catering-heading" className="font-display text-3xl tracking-wide sm:text-4xl">
            Feeding a Crowd? Ask About Catering.
          </h2>
          <p className="mt-3 max-w-2xl text-cream-100/90">
            Weddings in the park, office Fridays, game-day spreads — full racks, fried shrimp towers, and sweet tea by the
            bucket. Tell us the date and the headcount, and we’ll bring the South to you.
          </p>
        </div>
        <button
          type="button"
          onClick={onCatering}
          className="group flex shrink-0 items-center gap-2.5 rounded-md bg-gold-400 px-8 py-4 font-display text-lg tracking-wide text-navy-950 shadow-xl transition hover:-translate-y-0.5 hover:bg-gold-300"
        >
          Ask About Catering
          <IconArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
}
