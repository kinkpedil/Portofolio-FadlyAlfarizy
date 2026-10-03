import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef, useState } from 'react';
import FadeIn from '../components/FadeIn';
import LiveProjectButton from '../components/LiveProjectButton';

type Project = {
  name: string;
  category: string;
  description: string;
  tags: string[];
  href?: string;
  /** Three screenshots: left-top, left-bottom, right. */
  images?: [string, string, string];
  /** A single full-width screenshot, for projects with one. Without any image the card shows a styled cover. */
  image?: string;
  /** Gradient used for the cover, and as the fallback if a screenshot fails to load. */
  cover: string;
};

const PROJECTS: Project[] = [
  {
    name: 'FRL Broadcast',
    category: 'Web App',
    description:
      'A broadcast toolkit for FR Legends racing leagues, with OBS overlays, live timing, drift judging, and an Android driver app.',
    tags: ['Supabase', 'OBS Overlays', 'Android'],
    href: 'https://frlcast.my.id',
    images: [
      'https://frlcast.my.id/shots/dashboard.png',
      'https://frlcast.my.id/shots/overlay.png',
      'https://frlcast.my.id/shots/driver.png',
    ],
    cover: 'linear-gradient(135deg, #18011F 0%, #7621B0 55%, #BE4C00 100%)',
  },
  {
    name: 'Zatory Racing',
    category: 'Website',
    description:
      'The official website of Zatory Racing Team, a virtual racing team competing in Assetto Corsa and MotoGP, with team news, a gallery, and driver profiles.',
    tags: ['Vite', 'Sim Racing', 'Vercel'],
    href: 'https://zatory-racing-website.vercel.app',
    image: '/projects/zatory-racing.webp',
    cover: 'linear-gradient(135deg, #0C0C0C 0%, #3A0A0A 45%, #D7263D 100%)',
  },
  {
    name: 'PolyGrip',
    category: 'Game · In Development',
    description: 'My own indie game, currently in development. More coming soon.',
    tags: ['Game Dev', 'Work in Progress'],
    cover: 'linear-gradient(135deg, #04121F 0%, #0B3D5C 50%, #19C3B4 100%)',
  },
];

const RADIUS = 'rounded-[40px] sm:rounded-[50px] md:rounded-[60px]';
const TOP_IMAGE_HEIGHT = 'clamp(130px, 16vw, 230px)';
const BOTTOM_IMAGE_HEIGHT = 'clamp(160px, 22vw, 340px)';
// Single images and covers match the height of the three-image grid so stacked cards line up.
const FULL_MEDIA_HEIGHT = `calc(${TOP_IMAGE_HEIGHT} + ${BOTTOM_IMAGE_HEIGHT} + 1rem)`;

function Shot({ src, alt, cover, height }: { src: string; alt: string; cover: string; height?: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <div className={`w-full ${RADIUS} ${height ? '' : 'h-full'}`} style={{ background: cover, height }} />;
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`w-full object-cover object-top ${RADIUS} ${height ? '' : 'h-full'}`}
      style={{ height, background: cover }}
    />
  );
}

function Cover({ project }: { project: Project }) {
  return (
    <div
      className={`relative flex w-full items-center justify-center overflow-hidden ${RADIUS}`}
      style={{
        background: project.cover,
        height: FULL_MEDIA_HEIGHT,
      }}
    >
      <span
        aria-hidden="true"
        className="select-none px-6 text-center font-black uppercase leading-[0.9] tracking-tight"
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
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);

  return (
    <div className="sticky top-24 flex h-[85vh] items-start justify-center md:top-32">
      <motion.article
        className={`relative flex w-full origin-top flex-col gap-6 border-2 border-[#D7E2EA] p-4 sm:gap-8 sm:p-6 md:p-8 ${RADIUS}`}
        style={{ scale, top: `${index * 28}px`, background: '#0C0C0C' }}
      >
        <div className="flex flex-col gap-4 px-2 sm:px-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex items-end gap-4 sm:gap-6">
              <span className="font-black leading-none text-[#D7E2EA]" style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="flex flex-col pb-1 sm:pb-2 md:pb-3">
                <span className="text-xs font-light uppercase tracking-widest text-[#D7E2EA]/60 sm:text-sm">
                  {project.category}
                </span>
                <h3 className="font-medium uppercase text-[#D7E2EA]" style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}>
                  {project.name}
                </h3>
              </div>
            </div>
            <LiveProjectButton href={project.href} />
          </div>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p
              className="max-w-2xl font-light leading-relaxed text-[#D7E2EA]/70"
              style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)' }}
            >
              {project.description}
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

        {project.images ? (
          <div className="flex gap-3 sm:gap-4">
            <div className="flex w-[40%] flex-col gap-3 sm:gap-4">
              <Shot src={project.images[0]} alt={`${project.name} screenshot 1`} cover={project.cover} height={TOP_IMAGE_HEIGHT} />
              <Shot src={project.images[1]} alt={`${project.name} screenshot 2`} cover={project.cover} height={BOTTOM_IMAGE_HEIGHT} />
            </div>
            <div className="w-[60%]">
              <Shot src={project.images[2]} alt={`${project.name} screenshot 3`} cover={project.cover} />
            </div>
          </div>
        ) : project.image ? (
          <img
            src={project.image}
            alt={`${project.name} screenshot`}
            loading="lazy"
            className={`w-full object-cover object-top ${RADIUS}`}
            style={{ height: FULL_MEDIA_HEIGHT, background: project.cover }}
          />
        ) : (
          <Cover project={project} />
        )}
      </motion.article>
    </div>
  );
}

export default function ProjectsSection() {
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
        Project
      </FadeIn>

      <div ref={containerRef} className="relative mx-auto max-w-6xl">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.name} project={project} index={i} total={PROJECTS.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
