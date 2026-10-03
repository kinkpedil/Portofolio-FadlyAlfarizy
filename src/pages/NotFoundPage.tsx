import ContactButton from '../components/ContactButton';
import FadeIn from '../components/FadeIn';
import LanguageToggle from '../components/LanguageToggle';
import { StartLights } from '../components/RacingDecorations';
import { useLang } from '../i18n';

export default function NotFoundPage() {
  const { t } = useLang();

  return (
    <main className="flex min-h-screen flex-col" style={{ background: '#0C0C0C', overflowX: 'clip' }}>
      <FadeIn as="nav" y={-20} className="flex items-center justify-between gap-4 px-6 pt-6 md:px-10 md:pt-8">
        <a
          href="/"
          className="text-xs font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70 sm:text-sm md:text-lg"
        >
          Fadly Alfarizy
        </a>
        <LanguageToggle />
      </FadeIn>

      <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 py-12 text-center sm:gap-6">
        <FadeIn delay={0.1} y={-30}>
          <StartLights className="h-auto w-[160px] sm:w-[200px]" />
        </FadeIn>
        <FadeIn
          as="h1"
          delay={0.2}
          y={40}
          className="hero-heading font-black leading-none tracking-tight"
          style={{ fontSize: 'clamp(6rem, 22vw, 260px)' }}
        >
          404
        </FadeIn>
        <FadeIn
          as="h2"
          delay={0.3}
          className="font-black uppercase leading-none tracking-tight text-[#D7E2EA]"
          style={{ fontSize: 'clamp(1.75rem, 5vw, 4rem)' }}
        >
          {t.notFound.heading}
        </FadeIn>
        <FadeIn
          as="p"
          delay={0.4}
          className="max-w-[480px] font-light leading-relaxed text-[#D7E2EA]/70"
          style={{ fontSize: 'clamp(1rem, 1.6vw, 1.25rem)' }}
        >
          {t.notFound.text}
        </FadeIn>
        <FadeIn delay={0.5} className="mt-2">
          <ContactButton href="/" label={t.notFound.home} />
        </FadeIn>
      </div>
    </main>
  );
}
