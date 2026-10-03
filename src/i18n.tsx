import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Lang = 'en' | 'id';

type ProjectCopy = { category: string; description: string };

type Dictionary = {
  nav: { about: string; services: string; projects: string; contact: string };
  hero: {
    heading: string;
    /** Tailwind font-size classes; longer headings need smaller sizes to stay on one line. */
    headingSize: string;
    tagline: string;
  };
  contactButton: string;
  about: { heading: string; text: string; downloadCv: string };
  services: { heading: string; items: { name: string; description: string }[] };
  projects: {
    heading: string;
    live: string;
    soon: string;
    details: string;
    frl: ProjectCopy;
    zatory: ProjectCopy;
    polygrip: ProjectCopy;
  };
  contact: {
    heading: string;
    intro: string;
    copied: string;
    copyLabel: (name: string, handle: string) => string;
    backToTop: string;
    form: {
      heading: string;
      name: string;
      email: string;
      message: string;
      send: string;
      sending: string;
      success: string;
      error: string;
    };
  };
  polygrip: {
    back: string;
    status: string;
    tagline: string;
    featuresHeading: string;
    features: { title: string; description: string }[];
    followHeading: string;
    followText: string;
  };
  notFound: { heading: string; text: string; home: string };
};

const en: Dictionary = {
  nav: { about: 'About', services: 'Services', projects: 'Projects', contact: 'Contact' },
  hero: {
    heading: "Hi, i'm fadly",
    headingSize: 'text-[12.6vw] sm:text-[13.5vw] md:text-[14.5vw] lg:text-[15.8vw]',
    tagline: 'a web developer & aspiring indie game dev building with ai',
  },
  contactButton: 'Contact Me',
  about: {
    heading: 'About me',
    text: "I'm a web developer chasing a dream of becoming an indie game developer. I build everything hand in hand with AI, and I spend my free time learning to make both games and websites. Fun fact: I was in 9th grade when I built this site. Let's build something incredible together!",
    downloadCv: 'Download CV',
  },
  services: {
    heading: 'Services',
    items: [
      {
        name: 'Web Development',
        description:
          'Building fast, responsive websites with React, TypeScript, and Tailwind CSS, from landing pages to personal portfolios like this one.',
      },
      {
        name: 'Game Development',
        description:
          'Learning to craft indie games one project at a time, turning small ideas into playable prototypes on the way to bigger worlds.',
      },
      {
        name: 'UI & Animation',
        description:
          'Designing clean, modern interfaces with careful layout, bold typography, and smooth animations that make a page feel alive.',
      },
      {
        name: 'AI-Assisted Building',
        description:
          'Working hand in hand with AI to explore ideas, write code, and ship projects faster while learning something new every day.',
      },
    ],
  },
  projects: {
    heading: 'Projects',
    live: 'Live Project',
    soon: 'Coming Soon',
    details: 'View Details',
    frl: {
      category: 'Web App',
      description:
        'Race control, live timing, and OBS overlays for FR Legends leagues, all from one console, plus an Android driver app.',
    },
    zatory: {
      category: 'Website',
      description:
        'The official website of Zatory Racing Team, a virtual racing team competing in Assetto Corsa and MotoGP, with team news, a gallery, and driver profiles.',
    },
    polygrip: {
      category: 'Game · In Development',
      description:
        'An Android racing game with simulation-style car physics and clean low-poly graphics. Currently in development.',
    },
  },
  contact: {
    heading: 'Contact me',
    intro: 'Have a project in mind or just want to say hi? Reach me on any of these platforms.',
    copied: 'Copied!',
    copyLabel: (name, handle) => `Copy ${name} username ${handle}`,
    backToTop: 'Back to top ↑',
    form: {
      heading: 'Or send me a message',
      name: 'Your name',
      email: 'Your email (so I can reply)',
      message: 'Your message',
      send: 'Send Message',
      sending: 'Sending…',
      success: "Thanks! Your message is on its way. I'll get back to you soon.",
      error: 'Something went wrong and the message was not sent. Please try again, or reach me on Instagram or Discord.',
    },
  },
  polygrip: {
    back: '← Back to portfolio',
    status: 'In Development · Android',
    tagline: 'A racing game with simulation-style car physics and clean low-poly graphics, built for Android.',
    featuresHeading: 'What it is',
    features: [
      {
        title: 'Simulation-style physics',
        description: 'Cars with weight and grip that aim for a simulation feel rather than pure arcade handling.',
      },
      {
        title: 'Low-poly graphics',
        description: 'A clean, faceted art style that keeps the focus on the driving.',
      },
      {
        title: 'Built for Android',
        description: 'Made to be played on Android phones.',
      },
    ],
    followHeading: 'Follow the progress',
    followText: 'PolyGrip is still being built. Follow along for updates as it takes shape.',
  },
  notFound: {
    heading: 'Wrong turn',
    text: "This page went off track. Let's head back to the pits and start again from the home page.",
    home: 'Back to home',
  },
};

const id: Dictionary = {
  nav: { about: 'Tentang', services: 'Layanan', projects: 'Proyek', contact: 'Kontak' },
  hero: {
    heading: 'Hai, aku fadly',
    headingSize: 'text-[9.9vw] sm:text-[10.6vw] md:text-[11.4vw] lg:text-[12.4vw]',
    tagline: 'web developer & calon indie game dev yang berkarya bersama ai',
  },
  contactButton: 'Hubungi Aku',
  about: {
    heading: 'Tentang aku',
    text: 'Aku seorang web developer yang sedang mengejar mimpi menjadi indie game developer. Aku membangun semuanya bersama AI, dan menghabiskan waktu luangku untuk belajar membuat game dan website. Fun fact: aku masih kelas 9 SMP saat membuat situs ini. Yuk, bangun sesuatu yang luar biasa bersama!',
    downloadCv: 'Unduh CV',
  },
  services: {
    heading: 'Layanan',
    items: [
      {
        name: 'Pengembangan Web',
        description:
          'Membangun website yang cepat dan responsif dengan React, TypeScript, dan Tailwind CSS, dari landing page sampai portofolio pribadi seperti ini.',
      },
      {
        name: 'Pengembangan Game',
        description:
          'Belajar membuat indie game satu proyek demi satu, mengubah ide kecil menjadi prototipe yang bisa dimainkan menuju dunia yang lebih besar.',
      },
      {
        name: 'UI & Animasi',
        description:
          'Merancang tampilan yang bersih dan modern dengan tata letak rapi, tipografi tegas, dan animasi halus yang membuat halaman terasa hidup.',
      },
      {
        name: 'Berkarya dengan AI',
        description:
          'Bekerja bersama AI untuk menjelajahi ide, menulis kode, dan merilis proyek lebih cepat sambil belajar hal baru setiap hari.',
      },
    ],
  },
  projects: {
    heading: 'Proyek',
    live: 'Lihat Proyek',
    soon: 'Segera Hadir',
    details: 'Lihat Detail',
    frl: {
      category: 'Aplikasi Web',
      description:
        'Race control, live timing, dan overlay OBS untuk liga FR Legends dalam satu konsol, ditambah aplikasi Android untuk driver.',
    },
    zatory: {
      category: 'Website',
      description:
        'Website resmi Zatory Racing Team, tim balap virtual yang bertanding di Assetto Corsa dan MotoGP, berisi berita tim, galeri, dan profil driver.',
    },
    polygrip: {
      category: 'Game · Dalam Pengembangan',
      description:
        'Game balap mobil untuk Android dengan fisika ala simulasi dan grafis low poly yang bersih. Masih dalam pengembangan.',
    },
  },
  contact: {
    heading: 'Hubungi aku',
    intro: 'Punya ide proyek atau sekadar ingin menyapa? Hubungi aku lewat salah satu platform ini.',
    copied: 'Tersalin!',
    copyLabel: (name, handle) => `Salin username ${name} ${handle}`,
    backToTop: 'Kembali ke atas ↑',
    form: {
      heading: 'Atau kirim pesan langsung',
      name: 'Nama kamu',
      email: 'Email kamu (untuk aku balas)',
      message: 'Pesan kamu',
      send: 'Kirim Pesan',
      sending: 'Mengirim…',
      success: 'Terima kasih! Pesanmu sudah terkirim. Aku akan segera membalas.',
      error: 'Ada masalah dan pesan belum terkirim. Coba lagi, atau hubungi aku lewat Instagram atau Discord.',
    },
  },
  polygrip: {
    back: '← Kembali ke portofolio',
    status: 'Dalam Pengembangan · Android',
    tagline: 'Game balap mobil dengan fisika ala simulasi dan grafis low poly yang bersih, dibuat untuk Android.',
    featuresHeading: 'Tentang game ini',
    features: [
      {
        title: 'Fisika ala simulasi',
        description: 'Mobil dengan bobot dan cengkeraman yang mengejar rasa simulasi, bukan sekadar kendali arcade.',
      },
      {
        title: 'Grafis low poly',
        description: 'Gaya visual bersudut yang bersih, supaya fokus tetap pada berkendara.',
      },
      {
        title: 'Dibuat untuk Android',
        description: 'Dibuat untuk dimainkan di HP Android.',
      },
    ],
    followHeading: 'Ikuti perkembangannya',
    followText: 'PolyGrip masih dalam tahap pembuatan. Ikuti terus untuk kabar terbaru seiring game ini terbentuk.',
  },
  notFound: {
    heading: 'Salah belok',
    text: 'Halaman ini keluar lintasan. Yuk, balik ke pit dan lanjutkan dari halaman utama.',
    home: 'Kembali ke beranda',
  },
};

const DICTIONARIES: Record<Lang, Dictionary> = { en, id };
const STORAGE_KEY = 'lang';

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'id') return saved;
  } catch {
    // Storage can be unavailable (private mode, blocked site data); fall through to the browser language.
  }
  return navigator.language?.toLowerCase().startsWith('id') ? 'id' : 'en';
}

type LanguageContextValue = { lang: Lang; setLang: (lang: Lang) => void; t: Dictionary };

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Not persisting is fine; the choice still applies for this visit.
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: DICTIONARIES[lang] }}>{children}</LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider');
  return ctx;
}
