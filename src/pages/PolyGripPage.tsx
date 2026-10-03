import { Gauge, Instagram, Shapes, Smartphone, Youtube } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import LanguageToggle from '../components/LanguageToggle';
import LowPolyPattern from '../components/LowPolyPattern';
import { useLang } from '../i18n';

const COVER = 'linear-gradient(135deg, #04121F 0%, #0B3D5C 50%, #19C3B4 100%)';
const FEATURE_ICONS = [Gauge, Shapes, Smartphone];
const FOLLOW_LINKS = [
  { name: 'YouTube', handle: '@kinkpedil12', href: 'https://www.youtube.com/@kinkpedil12', icon: Youtube },
  { name: 'Instagram', handle: '@pdly25_', href: 'https://www.instagram.com/pdly25_/', icon: Instagram },
];

export default function PolyGripPage() {
  const { t } = useLang();
  const copy = t.polygrip;

  return (
    <main className="min-h-screen" style={{ background: '#0C0C0C', overflowX: 'clip' }}>
      <section className="relative flex min-h-[85vh] flex-col overflow-hidden" style={{ background: COVER }}>
        <LowPolyPattern />
        <FadeIn
          as="nav"
          y={-20}
          className="relative z-10 flex items-center justify-between gap-4 px-6 pt-6 md:px-10 md:pt-8"
        >
          <a
            href="/"
            className="text-xs font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70 sm:text-sm md:text-lg"
          >
            {copy.back}
          </a>
          <LanguageToggle />
        </FadeIn>

        <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-6 px-6 py-20 text-center md:gap-8">
          <FadeIn
            as="span"
            delay={0.1}
            className="rounded-full border border-dashed border-[#D7E2EA]/60 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-[#D7E2EA] sm:text-sm"
          >
            {copy.status}
          </FadeIn>
          <FadeIn
            as="h1"
            delay={0.2}
            y={40}
            className="font-black uppercase leading-none tracking-tight"
            style={{
              fontSize: 'clamp(3.5rem, 16vw, 240px)',
              color: 'transparent',
              WebkitTextStroke: '2px rgba(215, 226, 234, 0.9)',
            }}
          >
            PolyGrip
          </FadeIn>
          <FadeIn
            as="p"
            delay={0.35}
            className="max-w-[620px] font-light leading-relaxed text-[#D7E2EA]"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)' }}
          >
            {copy.tagline}
          </FadeIn>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-32">
        <FadeIn
          as="h2"
          y={40}
          className="hero-heading mb-14 text-center font-black uppercase leading-none tracking-tight sm:mb-20"
          style={{ fontSize: 'clamp(2.5rem, 9vw, 120px)' }}
        >
          {copy.featuresHeading}
        </FadeIn>
        <ul className="mx-auto grid max-w-6xl gap-4 sm:gap-6 md:grid-cols-3">
          {copy.features.map((feature, i) => {
            const Icon = FEATURE_ICONS[i];
            return (
              <FadeIn
                as="li"
                key={i}
                delay={i * 0.1}
                className="flex flex-col gap-4 rounded-[32px] border-2 border-[#D7E2EA]/20 p-6 sm:p-8"
              >
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-full text-[#D7E2EA]"
                  style={{ background: COVER }}
                >
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </span>
                <h3 className="font-medium uppercase text-[#D7E2EA]" style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)' }}>
                  {feature.title}
                </h3>
                <p className="font-light leading-relaxed text-[#D7E2EA]/70" style={{ fontSize: 'clamp(0.9rem, 1.3vw, 1.1rem)' }}>
                  {feature.description}
                </p>
              </FadeIn>
            );
          })}
        </ul>
      </section>

      <section className="rounded-t-[40px] bg-white px-5 py-20 text-center sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10">
        <FadeIn
          as="h2"
          y={40}
          className="font-black uppercase leading-none tracking-tight text-[#0C0C0C]"
          style={{ fontSize: 'clamp(2.25rem, 8vw, 110px)' }}
        >
          {copy.followHeading}
        </FadeIn>
        <FadeIn
          as="p"
          delay={0.1}
          className="mx-auto mb-10 mt-6 max-w-[520px] font-light leading-relaxed text-[#0C0C0C]/60"
          style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.25rem)' }}
        >
          {copy.followText}
        </FadeIn>
        <FadeIn delay={0.2} className="flex flex-wrap items-center justify-center gap-4">
          {FOLLOW_LINKS.map(({ name, handle, href, icon: Icon }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 whitespace-nowrap rounded-full px-8 py-3 text-sm font-medium uppercase tracking-widest text-[#0C0C0C] outline outline-2 -outline-offset-2 outline-[#0C0C0C] transition-colors duration-200 hover:bg-[#0C0C0C] hover:text-white sm:text-base"
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              {name} <span className="normal-case opacity-60">{handle}</span>
            </a>
          ))}
        </FadeIn>
        <footer className="mx-auto mt-20 flex max-w-5xl items-center justify-between text-xs font-light uppercase tracking-widest text-[#0C0C0C]/60 sm:text-sm">
          <span>© {new Date().getFullYear()} Fadly Alfarizy</span>
          <a href="/" className="transition-opacity duration-200 hover:opacity-70">
            {copy.back}
          </a>
        </footer>
      </section>
    </main>
  );
}
