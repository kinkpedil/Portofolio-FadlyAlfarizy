import FadeIn from '../components/FadeIn';
import AnimatedText from '../components/AnimatedText';
import ContactButton from '../components/ContactButton';
import { CheckeredFlag, Speedometer, StartLights, Tyre } from '../components/RacingDecorations';
import { Download } from 'lucide-react';
import { useLang } from '../i18n';

const DECORATIONS = [
  {
    Art: CheckeredFlag,
    className: 'top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[110px] sm:w-[150px] md:w-[200px]',
    tilt: '-rotate-6',
    delay: 0.1,
    x: -80,
  },
  {
    Art: Speedometer,
    className: 'bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[110px] sm:w-[150px] md:w-[190px]',
    tilt: '-rotate-6',
    delay: 0.25,
    x: -80,
  },
  {
    Art: StartLights,
    className: 'top-[6%] right-[1%] sm:right-[2%] md:right-[4%] w-[120px] sm:w-[170px] md:w-[220px]',
    tilt: 'rotate-6',
    delay: 0.15,
    x: 80,
  },
  {
    Art: Tyre,
    className: 'bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[100px] sm:w-[140px] md:w-[180px]',
    tilt: 'rotate-12',
    delay: 0.3,
    x: 80,
  },
];

export default function AboutSection() {
  const { t } = useLang();
  return (
    <section
      id="about"
      className="relative flex min-h-screen items-center justify-center px-5 py-20 sm:px-8 md:px-10"
    >
      {DECORATIONS.map(({ Art, tilt, ...item }, i) => (
        <FadeIn
          key={i}
          delay={item.delay}
          x={item.x}
          y={0}
          duration={0.9}
          className={`pointer-events-none absolute ${item.className}`}
        >
          <Art className={`h-auto w-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)] ${tilt}`} />
        </FadeIn>
      ))}

      <div className="relative z-10 flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
        <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
          <FadeIn
            as="h2"
            delay={0}
            y={40}
            className="hero-heading text-center font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            {t.about.heading}
          </FadeIn>
          <AnimatedText
            key={t.about.text}
            text={t.about.text}
            className="max-w-[560px] text-center font-medium leading-relaxed text-[#D7E2EA]"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
          />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <ContactButton />
          <a
            href="/cv-fadly-alfarizy.pdf"
            download
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-full px-8 outline outline-2 -outline-offset-2 outline-[#D7E2EA] py-3 text-xs font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors duration-200 hover:bg-[#D7E2EA]/10 sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base"
          >
            <Download className="h-4 w-4 md:h-5 md:w-5" aria-hidden="true" />
            {t.about.downloadCv}
          </a>
        </div>
      </div>
    </section>
  );
}
