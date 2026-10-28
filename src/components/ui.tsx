import { createElement, useEffect, useRef, useState, type ReactNode, type SVGProps } from 'react';
import { cn } from '../utils/cn';

/* ============================================================
   Shared UI kit: icons, logo badge, scroll-reveal, headings.
   ============================================================ */

type IconProps = SVGProps<SVGSVGElement> & { className?: string };
const base = (props: IconProps) => ({
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.9,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  ...props,
});

export const IconPin = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 21s-6.5-5.4-6.5-10A6.5 6.5 0 0 1 12 4.5 6.5 6.5 0 0 1 18.5 11c0 4.6-6.5 10-6.5 10Z" />
    <circle cx="12" cy="10.8" r="2.3" />
  </svg>
);
export const IconPhone = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 4.5h3.2l1.5 3.9-2 1.6a12.5 12.5 0 0 0 5.3 5.3l1.6-2 3.9 1.5V18a2 2 0 0 1-2.2 2A14.8 14.8 0 0 1 3 6.7 2 2 0 0 1 5 4.5Z" />
  </svg>
);
export const IconClock = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="8.2" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);
export const IconStar = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M12 2.6 14.9 8.6l6.5.9-4.7 4.5 1.1 6.4L12 17.4l-5.8 3 1.1-6.4L2.6 9.5l6.5-.9L12 2.6Z" />
  </svg>
);
export const IconLeaf = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 19C5 9.5 11.5 5 19.5 4.5c.5 8-4 14.5-13 14.5" />
    <path d="M5 19c2.5-5.5 6.5-9.5 10.5-11" />
  </svg>
);
export const IconFlame = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3c1 2.8-.6 4.4-2 6-1.5 1.8-3 3.6-3 6.2A5.6 5.6 0 0 0 12.6 21c3.3 0 5.4-2.4 5.4-5.4 0-3.5-2.2-5.2-3.2-7.3C14 7 13.4 5 12 3Z" />
    <path d="M12.5 17.8c-1.6 0-2.6-1-2.6-2.4 0-1.5 1.4-2.4 2.4-4 1.3 1.6 2.8 2.6 2.8 4.2 0 1.4-1 2.2-2.6 2.2Z" />
  </svg>
);
export const IconCow = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M8 6.5C6 5.5 4.5 6 4 7.5c-.5 1.5.5 2.6 2 3.2l.6-1.2M16 6.5c2-1 3.5-.5 4 1 .5 1.5-.5 2.6-2 3.2l-.6-1.2" />
    <path d="M8 6.5h8l1.5 4.5c.6 2 .4 4-1 5.5-1.1 1.2-2.4 1.6-4.5 1.6s-3.4-.4-4.5-1.6c-1.4-1.5-1.6-3.5-1-5.5L8 6.5Z" />
    <path d="M9.8 12.2h.01M14.2 12.2h.01M10.5 15.8c.9.7 2.1.7 3 0" />
  </svg>
);
export const IconBasket = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 10h16l-1.4 8.2a2 2 0 0 1-2 1.8H7.4a2 2 0 0 1-2-1.8L4 10Z" />
    <path d="M8.5 10 12 3.8 15.5 10M9.5 13.5v3M14.5 13.5v3" />
  </svg>
);
export const IconBag = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5.5 8h13l-1 11.2a1.8 1.8 0 0 1-1.8 1.8H8.3a1.8 1.8 0 0 1-1.8-1.8L5.5 8Z" />
    <path d="M8.8 10.5V6.8a3.2 3.2 0 0 1 6.4 0v3.7" />
  </svg>
);
export const IconPlus = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);
export const IconMinus = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 12h14" />
  </svg>
);
export const IconX = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);
export const IconChevronLeft = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m14.5 5.5-6.5 6.5 6.5 6.5" />
  </svg>
);
export const IconChevronRight = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m9.5 5.5 6.5 6.5-6.5 6.5" />
  </svg>
);
export const IconChevronDown = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m5.5 9.5 6.5 6.5 6.5-6.5" />
  </svg>
);
export const IconArrowRight = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 12h15M13.5 6.5 19 12l-5.5 5.5" />
  </svg>
);
export const IconArrowUp = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 20V5M6.5 10.5 12 5l5.5 5.5" />
  </svg>
);
export const IconCheck = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m4.5 12.5 5 5L19.5 7" />
  </svg>
);
export const IconCompass = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="8.2" />
    <path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8 4.8-2.2Z" />
  </svg>
);
export const IconMail = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
    <path d="m4.5 7.5 7.5 5.5 7.5-5.5" />
  </svg>
);
export const IconTruck = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M2.5 6.5h11v10h-11zM13.5 10h4l3 3.2v3.3h-7" />
    <circle cx="6.5" cy="17.5" r="1.8" />
    <circle cx="17" cy="17.5" r="1.8" />
  </svg>
);
export const IconQuote = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M9.6 6C6.4 7.4 4.5 9.9 4.5 13.4c0 2.6 1.6 4.4 3.8 4.4 2 0 3.4-1.4 3.4-3.3 0-1.8-1.3-3.1-3-3.1h-.5c.3-1.7 1.4-3 3.2-4L9.6 6Zm8.4 0c-3.2 1.4-5.1 3.9-5.1 7.4 0 2.6 1.6 4.4 3.8 4.4 2 0 3.4-1.4 3.4-3.3 0-1.8-1.3-3.1-3-3.1h-.5c.3-1.7 1.4-3 3.2-4L18 6Z" />
  </svg>
);
export const IconFacebook = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M13.5 21v-7h2.6l.5-3h-3.1V9.1c0-.9.3-1.6 1.7-1.6h1.5V4.8c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4V11H8v3h2.5v7h3Z" />
  </svg>
);
export const IconInstagram = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="4" y="4" width="16" height="16" rx="4.5" />
    <circle cx="12" cy="12" r="3.6" />
    <path d="M16.8 7.2h.01" strokeWidth="2.4" />
  </svg>
);
export const IconTikTok = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M16.8 4c.4 2 1.7 3.4 3.7 3.7v3c-1.5 0-2.8-.5-3.8-1.2v5.6a5.9 5.9 0 1 1-5.9-5.9c.3 0 .7 0 1 .1v3.1a2.9 2.9 0 1 0 1.9 2.7V4h3.1Z" />
  </svg>
);
export const IconMenuBars = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

/* ---------- Logo: red/cream badge placeholder (swap for real logo file) ---------- */
export function Logo({ className = 'h-14 w-14', withText = false }: { className?: string; withText?: boolean }) {
  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <svg viewBox="0 0 120 120" className="h-full w-auto shrink-0 drop-shadow-md" role="img" aria-label="Country Boys Grill badge — cowboy riding a bull">
        <circle cx="60" cy="60" r="58" fill="#C8102E" />
        <circle cx="60" cy="60" r="49.5" fill="#FFF4DC" />
        <circle cx="60" cy="60" r="43" fill="none" stroke="#C8102E" strokeWidth="1.6" />
        <defs>
          <path id="cbg-arc-top" d="M 21 60 A 39 39 0 0 1 99 60" fill="none" />
          <path id="cbg-arc-bottom" d="M 26 64 A 34.5 34.5 0 0 0 94 64" fill="none" />
        </defs>
        <text fontFamily="'Alfa Slab One', serif" fontSize="10.5" fill="#C8102E" letterSpacing="1.2">
          <textPath href="#cbg-arc-top" startOffset="50%" textAnchor="middle">
            COUNTRY BOYS GRILL
          </textPath>
        </text>
        <text fontFamily="'Alfa Slab One', serif" fontSize="8.5" fill="#1E1E1E" letterSpacing="1.5">
          <textPath href="#cbg-arc-bottom" startOffset="50%" textAnchor="middle">
            EST • 2021
          </textPath>
        </text>
        {/* side stars */}
        <path d="M18 57.2 19.4 60 22.2 60 19.9 61.9 20.8 64.7 18 63 15.2 64.7 16.1 61.9 13.8 60 16.6 60 Z" fill="#F5A623" />
        <path d="M102 57.2 103.4 60 106.2 60 103.9 61.9 104.8 64.7 102 63 99.2 64.7 100.1 61.9 97.8 60 100.6 60 Z" fill="#F5A623" />
        {/* cowboy-on-bull silhouette (placeholder artwork) */}
        <g fill="#1E1E1E" transform="translate(27 36) scale(0.62)">
          <path d="M8 22 C10 14 20 11 30 12 C38 13 44 11 48 8 L58 3 C60 2 62 3 61 5 L55 11 C57 16 53 21 46 22 C36 25 18 26 10 24 C8 23 7 23 8 22 Z" />
          <path d="M40 22 L38 34 L41 34 L45 23 Z" />
          <path d="M48 21 L50 33 L53 33 L53 20 Z" />
          <path d="M14 25 L8 34 L11 35 L19 27 Z" />
          <path d="M22 26 L21 34 L24 34 L26 26 Z" />
          <path d="M9 21 C4 19 2 24 6 27" fill="none" stroke="#1E1E1E" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M58 2 C60 0 63 0 64 1" fill="none" stroke="#1E1E1E" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="20" cy="5.5" r="3.4" />
          <path d="M15.5 2.5 h7 v3 h-7 Z" />
          <path d="M11 5.5 C11 4 29 4 29 5.5 L31 6.5 L9 6.5 Z" />
          <path d="M22 8 C24 6.5 27 7.5 28 10 L33 18 C31 22 26 23 23 20 Z" />
          <path d="M24 9 L56 5" fill="none" stroke="#1E1E1E" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M22 9.5 L14 15" fill="none" stroke="#1E1E1E" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M30 19 L33 28 L29 29" fill="none" stroke="#1E1E1E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
      {withText && (
        <span className="hidden leading-tight md:block">
          <span className="font-display block text-lg tracking-wide text-cream-100">COUNTRY BOYS</span>
          <span className="font-display block text-2xl tracking-wide text-gold-400">GRILL</span>
        </span>
      )}
    </span>
  );
}

/* ---------- Scroll reveal (IntersectionObserver, reduced-motion aware) ---------- */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = 'div',
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'section' | 'li' | 'article' | 'figure';
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return createElement(Tag, { ref, style: { '--reveal-delay': `${delay}ms` }, className: cn('reveal', visible && 'is-visible', className) }, children);
}

/* ---------- Ribbon section heading ---------- */
export function SectionHeading({
  eyebrow,
  title,
  tone = 'light',
  className,
}: {
  eyebrow: string;
  title: string;
  tone?: 'light' | 'dark';
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col items-center text-center', className)}>
      <p className={cn('mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em]', tone === 'light' ? 'text-brick-600' : 'text-gold-400')}>
        <IconStar className="h-3 w-3" />
        {eyebrow}
        <IconStar className="h-3 w-3" />
      </p>
      <h2 className="ribbon font-display text-2xl tracking-wide sm:text-3xl lg:text-4xl">{title}</h2>
    </div>
  );
}

/* ---------- Star rating ---------- */
export function StarRating({ value, className }: { value: number; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-0.5', className)} role="img" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <IconStar key={i} className={cn('h-4 w-4', i <= value ? 'text-gold-400' : 'text-char-900/20')} />
      ))}
    </span>
  );
}

/* ---------- Durham skyline silhouette divider ---------- */
export function SkylineDivider({ className, flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1200 90"
      preserveAspectRatio="none"
      aria-hidden
      className={cn('block h-12 w-full sm:h-16', flip && 'rotate-180', className)}
    >
      <path
        fill="currentColor"
        d="M0 90 L0 62 H55 V44 H85 V62 H130 V32 H142 L152 10 L162 32 H174 V62 H235 V48 H295 V62 H350 V26 H370 V18 H392 V26 H412 V62 H475 V52 H535 V62 H598 V38 H640 V62 H700 V20 H714 L724 2 L734 20 H748 V62 H815 V46 H875 V62 H935 V34 H985 V62 H1045 V50 H1105 V62 H1155 V30 H1175 V14 H1200 V90 Z"
      />
    </svg>
  );
}
