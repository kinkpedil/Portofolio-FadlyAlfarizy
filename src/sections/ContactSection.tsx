import { ArrowUpRight, Instagram, Youtube, type LucideIcon } from 'lucide-react';
import type { CSSProperties, SVGProps } from 'react';
import FadeIn from '../components/FadeIn';

function DiscordIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
    </svg>
  );
}

type Contact = {
  name: string;
  handle: string;
  href: string;
  color: string;
  icon: LucideIcon | typeof DiscordIcon;
};

// TODO: ganti handle & link dengan akun asli.
const CONTACTS: Contact[] = [
  {
    name: 'Instagram',
    handle: '@username',
    href: 'https://instagram.com/username',
    color: '#E1306C',
    icon: Instagram,
  },
  {
    name: 'Discord',
    handle: 'username',
    href: 'https://discord.com/users/000000000000000000',
    color: '#5865F2',
    icon: DiscordIcon,
  },
  {
    name: 'YouTube',
    handle: '@channel',
    href: 'https://youtube.com/@channel',
    color: '#FF0000',
    icon: Youtube,
  },
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative z-20 -mt-10 flex min-h-screen flex-col rounded-t-[40px] px-5 pb-8 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pt-32"
      style={{ background: '#FFFFFF' }}
    >
      <FadeIn
        as="h2"
        y={40}
        className="text-center font-black uppercase leading-none tracking-tight text-[#0C0C0C]"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Contact me
      </FadeIn>
      <FadeIn
        as="p"
        delay={0.1}
        className="mx-auto mb-16 mt-6 max-w-[520px] text-center font-light leading-relaxed text-[#0C0C0C] sm:mb-20 md:mb-24"
        style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.25rem)', opacity: 0.6 }}
      >
        Have a project in mind or just want to say hi? Reach me on any of these platforms.
      </FadeIn>

      <ul className="mx-auto w-full max-w-5xl">
        {CONTACTS.map((contact, i) => {
          const Icon = contact.icon;
          return (
            <FadeIn
              as="li"
              key={contact.name}
              delay={i * 0.1}
              style={{
                borderTop: '1px solid rgba(12, 12, 12, 0.15)',
                borderBottom: i === CONTACTS.length - 1 ? '1px solid rgba(12, 12, 12, 0.15)' : undefined,
              }}
            >
              <a
                href={contact.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-5 py-8 text-[#0C0C0C] transition-colors duration-300 hover:text-[var(--brand)] sm:gap-8 sm:py-10 md:gap-12 md:py-12"
                style={{ '--brand': contact.color } as CSSProperties}
              >
                <span
                  className="flex shrink-0 items-center justify-center rounded-full border-2 border-current transition-transform duration-300 group-hover:scale-110"
                  style={{ width: 'clamp(3.5rem, 8vw, 6.5rem)', height: 'clamp(3.5rem, 8vw, 6.5rem)' }}
                >
                  <Icon className="h-1/2 w-1/2" />
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-1">
                  <span
                    className="font-black uppercase leading-none tracking-tight"
                    style={{ fontSize: 'clamp(1.75rem, 6vw, 5rem)' }}
                  >
                    {contact.name}
                  </span>
                  <span
                    className="truncate font-light text-[#0C0C0C]/60"
                    style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
                  >
                    {contact.handle}
                  </span>
                </span>
                <ArrowUpRight
                  className="shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                  style={{ width: 'clamp(2rem, 5vw, 4rem)', height: 'clamp(2rem, 5vw, 4rem)' }}
                  strokeWidth={1.5}
                />
              </a>
            </FadeIn>
          );
        })}
      </ul>

      <footer className="mx-auto mt-auto flex w-full max-w-5xl items-center justify-between pt-20 text-xs font-light uppercase tracking-widest text-[#0C0C0C]/60 sm:text-sm">
        <span>© {new Date().getFullYear()} Fadly Alfarizy</span>
        <a href="#" className="transition-opacity duration-200 hover:opacity-70">
          Back to top ↑
        </a>
      </footer>
    </section>
  );
}
