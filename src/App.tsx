import { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero, { TrustMarquee } from './components/Hero';
import { CountrySides, FeaturedMeats, FullMenu } from './components/Menu';
import About, { CateringStrip } from './components/About';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import { BackToTop, Footer, MobileActionBar } from './components/Footer';

/* ============================================================
   Country Boys Grill — premium single-page showcase site.
   The food is the star: browse the menu, see the details,
   then call, get directions, or send the contact form.
   ============================================================ */

/** Track which section is in view to highlight the nav link. */
function useActiveSection() {
  const [active, setActive] = useState('home');
  useEffect(() => {
    const ids = ['home', 'menu', 'about', 'gallery', 'reviews', 'contact'];
    let ticking = false;
    const compute = () => {
      ticking = false;
      let current = 'home';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 170) current = id;
      }
      // Pin to the last link when at the very bottom.
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 40) current = 'contact';
      setActive(current);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(compute);
      }
    };
    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  return active;
}

export default function App() {
  const activeId = useActiveSection();
  const [cateringTick, setCateringTick] = useState(0);

  /** Catering CTA: preselect the subject, then scroll to the form. */
  const handleCatering = () => {
    setCateringTick((t) => t + 1);
    document.getElementById('contact')?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  };

  return (
    <>
      {/* skip link for keyboard users */}
      <a
        href="#menu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-brick-600 focus:px-5 focus:py-3 focus:font-bold focus:text-cream-50"
      >
        Skip to menu
      </a>

      <Header activeId={activeId} />

      <main>
        <Hero />
        <TrustMarquee />
        <FeaturedMeats />
        <CountrySides />
        <FullMenu />
        <About />
        <Gallery />
        <Reviews />
        <CateringStrip onCatering={handleCatering} />
        <Contact cateringTick={cateringTick} />
      </main>

      <Footer />
      <MobileActionBar />
      <BackToTop />
    </>
  );
}
