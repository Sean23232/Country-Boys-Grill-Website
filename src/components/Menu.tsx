import { useMemo, useState } from 'react';
import { cn } from '../utils/cn';
import {
  COUNTRY_SIDES,
  FEATURED_ITEMS,
  MENU_CATEGORIES,
  MENU_ITEMS,
  SITE,
  money,
  sizeText,
  type CategoryId,
  type MenuItem,
} from '../data/site';
import { IconCompass, IconCow, IconFlame, IconPhone, IconPin, IconClock, Reveal, SectionHeading } from './ui';

/* ============================================================
   Menu showcase: “Local Farm-Raised Meats” feature cards,
   “Country Sides”, and the full browsable menu.
   Display only — the client orders by phone or in person.
   ============================================================ */

/** Classic menu-style price line: name …… dotted leader …… price */
function PriceLine({ item, className }: { item: MenuItem; className?: string }) {
  const price = item.sizes ? `from ${money(item.sizes[0].price)}` : money(item.price ?? 0);
  return (
    <div className={cn('flex items-baseline gap-3', className)}>
      <h3 className="font-display text-lg leading-snug tracking-wide text-navy-900">{item.name}</h3>
      <span aria-hidden className="mb-1 min-w-6 flex-1 border-b-2 border-dotted border-char-900/30" />
      <span className="font-display shrink-0 text-lg text-brick-600">{price}</span>
    </div>
  );
}

const SizeLine = ({ item }: { item: MenuItem }) =>
  item.sizes ? (
    <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-char-500">{sizeText(item)}</p>
  ) : null;

/* ---------- 4. Local Farm-Raised Meats ---------- */
export function FeaturedMeats() {
  return (
    <section id="menu" aria-labelledby="featured-heading" className="grain bg-cream-100 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="Raised Close, Smoked Better" title="Local Farm-Raised Meats" />
        </Reveal>
        <Reveal delay={120}>
          <p className="mx-auto mt-6 max-w-2xl text-center leading-relaxed text-char-600">
            Our beef, chicken and pork come from farms an hour or two from the grill — never a warehouse. This is the
            plate our regulars drive across Durham for.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED_ITEMS.map((item, i) => (
            <Reveal key={item.id} delay={i * 90} as="article" className="group">
              <div className="flex h-full flex-col overflow-hidden rounded-lg border border-char-900/10 bg-cream-50 shadow-sm transition duration-300 group-hover:-translate-y-1.5 group-hover:shadow-xl group-hover:shadow-navy-900/15">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-navy-950/75 to-transparent" aria-hidden />
                  {item.tag && (
                    <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-sm bg-gold-400 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-navy-950">
                      <IconFlame className="h-3 w-3" /> {item.tag}
                    </span>
                  )}
                  <span className="font-display absolute bottom-2.5 right-3.5 text-2xl text-cream-50 drop-shadow">
                    {item.sizes ? `from ${money(item.sizes[0].price)}` : money(item.price ?? 0)}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-2.5 p-5">
                  <h3 className="font-display text-xl tracking-wide text-navy-900">{item.name}</h3>
                  <SizeLine item={item} />
                  <p className="text-sm leading-relaxed text-char-600">{item.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <div className="mx-auto mt-14 max-w-3xl border-l-4 border-gold-400 bg-cream-50 p-6 shadow-sm sm:p-8">
            <h3 className="font-display text-xl tracking-wide text-brick-600">Why “local” matters here</h3>
            <p className="mt-3 leading-relaxed text-char-600">
              Every Tuesday, before the first fire is lit, our meat shows up from Central Piedmont farms — cows raised
              on open pasture, chickens fed the old way, and shrimp and flounder landed fresh on the coast. We buy whole
              animals when we can, smoke what we can smoke, and pass the difference straight through to the flavor. When
              a farm raises it well, you can taste the fence line.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- 5. Country Sides ---------- */
export function CountrySides() {
  return (
    <section id="sides" aria-labelledby="sides-heading" className="wood grain py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="The Part You Can’t Skip" title="Country Sides" tone="dark" />
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {COUNTRY_SIDES.map((item, i) => (
            <Reveal key={item.id} delay={i * 90} as="article" className="group">
              <div className="flex h-full flex-col overflow-hidden rounded-lg bg-cream-50 shadow-lg shadow-navy-950/40 transition duration-300 group-hover:-translate-y-1.5 group-hover:shadow-2xl">
                <div className="relative h-44 overflow-hidden">
                  <img src={item.image} alt={item.alt} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-108" />
                  <span className="font-display absolute bottom-2.5 right-3.5 text-2xl text-cream-50 drop-shadow">{money(item.price ?? 0)}</span>
                </div>
                <div className="flex flex-1 flex-col gap-2.5 p-5">
                  <h3 className="font-display text-lg tracking-wide text-navy-900">{item.name}</h3>
                  <p className="text-sm leading-relaxed text-char-600">{item.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 6. Full browsable menu with category tabs ---------- */
function MenuCard({ item }: { item: MenuItem }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-char-900/10 bg-cream-50 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:flex-row">
      <div className="relative h-44 shrink-0 overflow-hidden sm:h-auto sm:w-44 md:w-48">
        <img
          src={item.image}
          alt={item.alt}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-107"
        />
        {item.tag && (
          <span className="absolute left-2.5 top-2.5 rounded-sm bg-gold-400 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-navy-950">
            {item.tag}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
        <PriceLine item={item} />
        <SizeLine item={item} />
        <p className="text-sm leading-relaxed text-char-600">{item.desc}</p>
      </div>
    </article>
  );
}

export function FullMenu() {
  const [active, setActive] = useState<CategoryId | 'all'>('all');

  const groups = useMemo(() => {
    if (active === 'all') {
      return MENU_CATEGORIES.filter((c) => c.id !== 'all').map((c) => ({
        id: c.id,
        label: c.label,
        items: MENU_ITEMS.filter((m) => m.category === c.id),
      }));
    }
    return [{ id: active, label: MENU_CATEGORIES.find((c) => c.id === active)?.label ?? '', items: MENU_ITEMS.filter((m) => m.category === active) }];
  }, [active]);

  return (
    <section id="fullmenu" aria-labelledby="fullmenu-heading" className="grain bg-cream-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* showcase banner */}
        <Reveal>
          <div className="grain relative overflow-hidden rounded-lg bg-brick-600 text-cream-50 shadow-xl shadow-brick-800/30">
            <div className="flex flex-col items-center gap-8 px-6 py-10 sm:px-10 lg:flex-row lg:justify-between">
              <div className="text-center lg:text-left">
                <p className="mb-2 flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-gold-300 lg:justify-start">
                  <IconFlame className="h-4 w-4" /> Made to Order, Every Day
                </p>
                <h2 className="font-display text-3xl tracking-wide sm:text-4xl">From the Grill to Your Table</h2>
                <p className="mt-3 max-w-xl text-cream-100/90">
                  Every plate is fired when you call or walk in — nothing sits, nothing reheats. Give us a ring, and
                  we’ll have it waiting at the pickup window out front.
                </p>
                <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
                  <a
                    href={SITE.phoneHref}
                    className="flex w-full items-center justify-center gap-2.5 rounded-md bg-navy-950 px-7 py-3.5 font-display tracking-wide text-gold-400 shadow-lg transition hover:-translate-y-0.5 hover:bg-navy-900 sm:w-auto"
                  >
                    <IconPhone className="h-4.5 w-4.5" /> Call to Order · {SITE.phoneDisplay}
                  </a>
                  <a
                    href={SITE.mapsDirections}
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-full items-center justify-center gap-2.5 rounded-md border-2 border-gold-400 px-7 py-3.5 font-display tracking-wide text-gold-300 transition hover:-translate-y-0.5 hover:bg-gold-400 hover:text-navy-950 sm:w-auto"
                  >
                    <IconCompass className="h-4.5 w-4.5" /> Get Directions
                  </a>
                </div>
              </div>
              <ul className="flex flex-col gap-4 text-center text-xs font-bold uppercase tracking-wider sm:flex-row sm:gap-8 lg:text-left">
                <li className="flex items-center gap-3">
                  <IconClock className="h-5 w-5 shrink-0 text-gold-300" /> Open 7 Days a Week
                </li>
                <li className="flex items-center gap-3">
                  <IconCow className="h-5 w-5 shrink-0 text-gold-300" /> Local Farm-Raised Meats
                </li>
                <li className="flex items-center gap-3">
                  <IconPin className="h-5 w-5 shrink-0 text-gold-300" /> 2900 Holloway St, Durham
                </li>
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <SectionHeading eyebrow="Est. 2021 · Smoke Every Day" title="The Full Menu" className="mt-16" />
        </Reveal>
        <Reveal delay={140}>
          <p className="mx-auto mt-5 max-w-xl text-center text-sm text-char-500">
            Sauce always on the side. Ask about our daily specials and catering when you call — they’re worth the line.
          </p>
        </Reveal>

        {/* category tabs */}
        <div role="tablist" aria-label="Menu categories" className="no-scrollbar mt-8 flex gap-2 overflow-x-auto pb-1 sm:justify-center">
          {MENU_CATEGORIES.map((c) => (
            <button
              key={c.id}
              role="tab"
              id={`tab-${c.id}`}
              aria-selected={active === c.id}
              aria-controls={`panel-${c.id}`}
              onClick={() => setActive(c.id)}
              className={cn(
                'shrink-0 rounded-md border px-4 py-2.5 text-sm font-bold uppercase tracking-wider transition',
                active === c.id
                  ? 'tab-active border-brick-600'
                  : 'border-char-900/20 bg-cream-100 text-char-600 hover:border-brick-600/50 hover:text-brick-600',
              )}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* panels */}
        {groups.map((g) => (
          <div key={g.id} role="tabpanel" id={`panel-${g.id}`} aria-labelledby={`tab-${g.id}`} className="mt-10">
            {active === 'all' && (
              <h3 className="font-display mb-6 flex items-center gap-4 text-2xl tracking-wide text-navy-900">
                {g.label}
                <span className="h-px flex-1 bg-char-900/15" aria-hidden />
                <span className="text-sm font-body font-semibold uppercase tracking-[0.25em] text-char-500">
                  {g.items.length} {g.items.length === 1 ? 'item' : 'items'}
                </span>
              </h3>
            )}
            <div className={cn('grid gap-5', active === 'all' ? 'md:grid-cols-2' : 'md:grid-cols-2 xl:grid-cols-3')}>
              {g.items.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
