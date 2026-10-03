import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';
import FadeIn from '../components/FadeIn';
import LiveProjectButton from '../components/LiveProjectButton';
import LowPolyPattern from '../components/LowPolyPattern';
import { useLang } from '../i18n';

type Project = {
  /** Key into the translated project copy (category and description). */
  key: 'frl' | 'zatory' | 'polygrip';
  name: string;
  tags: string[];
  /** External live site. */
  href?: string;
  /** Page on this site with more about the project, used when there is no live site yet. */
  detailsHref?: string;
  /** Full-width screenshot. Without one the card shows a styled cover. */
  image?: string;
  /** Gradient for the styled cover shown when there is no screenshot. */
  cover: string;
  /** Overlay the cover with a faceted low-poly pattern. */
  lowPoly?: boolean;
};

const PROJECTS: Project[] = [
  {
    key: 'frl',
    name: 'FRL Broadcast',
    tags: ['Supabase', 'OBS Overlays', 'Android'],
    href: 'https://frlcast.my.id',
    image: '/projects/frl-broadcast.webp',
    cover: 'linear-gradient(135deg, #18011F 0%, #7621B0 55%, #BE4C00 100%)',
  },
  {
    key: 'zatory',
    name: 'Zatory Racing',
    tags: ['Vite', 'Sim Racing', 'Vercel'],
    href: 'https://zatory-racing-website.vercel.app',
    image: '/projects/zatory-racing.webp',
    cover: 'linear-gradient(135deg, #0C0C0C 0%, #3A0A0A 45%, #D7263D 100%)',
  },
  {
    key: 'polygrip',
    name: 'PolyGrip',
    detailsHref: '/polygrip/',
    tags: ['Android', 'Car Physics', 'Low Poly'],
    cover: 'linear-gradient(135deg, #04121F 0%, #0B3D5C 50%, #19C3B4 100%)',
    lowPoly: true,
  },
];

const RADIUS = 'rounded-[40px] sm:rounded-[50px] md:rounded-[60px]';
// Screenshots and covers share one height so the stacked cards line up.
const MEDIA_HEIGHT = 'calc(clamp(130px, 16vw, 230px) + clamp(160px, 22vw, 340px) + 1rem)';

function Cover({ project }: { project: Project }) {
  return (
    <div
      className={`relative flex w-full items-center justify-center overflow-hidden ${RADIUS}`}
      style={{
        background: project.cover,
        height: MEDIA_HEIGHT,
      }}
    >
      {project.lowPoly && <LowPolyPattern />}
      <span
        aria-hidden="true"
        className="relative select-none px-6 text-center font-black uppercase leading-[0.9] tracking-tight"
        style={{ fontSize: 'clamp(2.5rem, 10vw, 150px)', color: 'transparent', WebkitTextStroke: '2px rgba(215, 226, 234, 0.85)' }}
      >
        {project.name}
      </span>
    </div>
  );
}

type ProjectCardProps = {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
};

function ProjectCard({ project, index, total, progress }: ProjectCardProps) {
  const { t } = useLang();
  const copy = t.projects[project.key];
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);
  const reduceMotion = useReducedMotion();

  return (
    <div className="sticky top-24 flex h-[85vh] items-start justify-center md:top-32">
      <motion.article
        className={`relative flex w-full origin-top flex-col gap-6 border-2 border-[#D7E2EA] p-4 sm:gap-8 sm:p-6 md:p-8 ${RADIUS}`}
        style={{ scale: reduceMotion ? 1 : scale, top: `${index * 28}px`, background: '#0C0C0C' }}
      >
        <div className="flex flex-col gap-4 px-2 sm:px-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex items-end gap-4 sm:gap-6">
              <span className="font-black leading-none text-[#D7E2EA]" style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="flex flex-col pb-1 sm:pb-2 md:pb-3">
                <span className="text-xs font-light uppercase tracking-widest text-[#D7E2EA]/60 sm:text-sm">
                  {copy.category}
                </span>
                <h3 className="font-medium uppercase text-[#D7E2EA]" style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}>
                  {project.name}
                </h3>
              </div>
            </div>
            {project.href ? (
              <LiveProjectButton href={project.href} label={t.projects.live} />
            ) : project.detailsHref ? (
              <LiveProjectButton href={project.detailsHref} label={t.projects.details} external={false} />
            ) : (
              <LiveProjectButton label={t.projects.soon} />
            )}
          </div>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p
              className="max-w-2xl font-light leading-relaxed text-[#D7E2EA]/70"
              style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)' }}
            >
              {copy.description}
            </p>
            <ul className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="whitespace-nowrap rounded-full border border-[#D7E2EA]/30 px-3 py-1 text-[0.7rem] uppercase tracking-widest text-[#D7E2EA]/80 sm:text-xs"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {project.image ? (
          <img
            src={project.image}
            alt={`${project.name} screenshot`}
            loading="lazy"
            className={`w-full border border-[#D7E2EA]/15 object-cover object-top ${RADIUS}`}
            style={{ height: MEDIA_HEIGHT }}
          />
        ) : (
          <Cover project={project} />
        )}
      </motion.article>
    </div>
  );
}

export default function ProjectsSection() {
  const { t } = useLang();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 rounded-t-[40px] px-5 py-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:py-32"
      style={{ background: '#0C0C0C' }}
    >
      <FadeIn
        as="h2"
        y={40}
        className="hero-heading mb-16 text-center font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        {t.projects.heading}
      </FadeIn>

      <div ref={containerRef} className="relative mx-auto max-w-6xl">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.name} project={project} index={i} total={PROJECTS.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
