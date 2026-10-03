import FadeIn from '../components/FadeIn';
import { useLang } from '../i18n';


export default function ServicesSection() {
  const { t } = useLang();
  const services = t.services.items;
  return (
    <section
      id="services"
      className="rounded-t-[40px] px-5 py-20 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
      style={{ background: '#FFFFFF' }}
    >
      <FadeIn
        as="h2"
        y={40}
        className="mb-16 text-center font-black uppercase leading-none tracking-tight text-[#0C0C0C] sm:mb-20 md:mb-28"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        {t.services.heading}
      </FadeIn>

      <ul className="mx-auto max-w-5xl">
        {services.map((service, i) => (
          <FadeIn
            as="li"
            key={i}
            delay={i * 0.1}
            className="flex items-center gap-6 py-8 text-[#0C0C0C] sm:gap-10 sm:py-10 md:gap-14 md:py-12"
            style={{
              borderTop: '1px solid rgba(12, 12, 12, 0.15)',
              borderBottom: i === services.length - 1 ? '1px solid rgba(12, 12, 12, 0.15)' : undefined,
            }}
          >
            <span className="shrink-0 font-black leading-none" style={{ fontSize: 'clamp(3rem, 10vw, 140px)', width: '1.3em' }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="flex flex-col gap-2 md:gap-3">
              <h3 className="font-medium uppercase" style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}>
                {service.name}
              </h3>
              <p
                className="max-w-2xl font-light leading-relaxed"
                style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)', opacity: 0.6 }}
              >
                {service.description}
              </p>
            </div>
          </FadeIn>
        ))}
      </ul>
    </section>
  );
}
