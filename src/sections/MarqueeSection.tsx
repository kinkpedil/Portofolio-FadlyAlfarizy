import { useEffect, useRef, useState } from 'react';

const ROW_1_WORDS = ['Web Developer', 'Indie Game Dev', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'];
const ROW_2_WORDS = ['Next.js', 'Vite', 'Supabase', 'Vercel', 'Built with AI', 'Always Learning'];

const tripled = (words: string[]) => [...words, ...words, ...words];

const WORD_STYLE = { fontSize: 'clamp(2.75rem, 8vw, 7rem)' };

function Row({ words, offset, outlined }: { words: string[]; offset: number; outlined?: boolean }) {
  return (
    <div
      className="flex w-max items-center gap-6 sm:gap-10"
      // Start one full set to the left so neither edge ever shows a gap while scrolling.
      style={{ transform: `translateX(calc(-33.333% + ${offset}px))`, willChange: 'transform' }}
    >
      {tripled(words).map((word, i) => (
        <span key={i} className="flex items-center gap-6 sm:gap-10">
          <span
            className={`whitespace-nowrap font-black uppercase leading-none tracking-tight ${outlined ? '' : 'hero-heading'}`}
            style={
              outlined
                ? { ...WORD_STYLE, color: 'transparent', WebkitTextStroke: '1.5px #D7E2EA' }
                : WORD_STYLE
            }
          >
            {word}
          </span>
          <span aria-hidden="true" className="text-[#B600A8]" style={{ fontSize: 'clamp(1.5rem, 4vw, 3.5rem)' }}>
            ✦
          </span>
        </span>
      ))}
    </div>
  );
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      setOffset((window.scrollY - sectionTop + window.innerHeight) * 0.3);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Skills and tools"
      className="flex flex-col gap-4 overflow-hidden pb-10 pt-24 sm:gap-6 sm:pt-32 md:pt-40"
      style={{ background: '#0C0C0C' }}
    >
      <Row words={ROW_1_WORDS} offset={offset - 200} />
      <Row words={ROW_2_WORDS} offset={-(offset - 200)} outlined />
    </section>
  );
}
