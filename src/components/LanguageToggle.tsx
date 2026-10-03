import { useLang, type Lang } from '../i18n';

const OPTIONS: Lang[] = ['id', 'en'];

export default function LanguageToggle({ className = '' }: { className?: string }) {
  const { lang, setLang } = useLang();

  return (
    <div
      role="group"
      aria-label="Language"
      className={`flex shrink-0 overflow-hidden rounded-full border border-[#D7E2EA]/40 text-[0.65rem] font-medium uppercase tracking-widest sm:text-xs md:text-sm ${className}`}
    >
      {OPTIONS.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => setLang(option)}
          aria-pressed={lang === option}
          className={`px-2 py-1 uppercase transition-colors duration-200 sm:px-3 ${
            lang === option ? 'bg-[#D7E2EA] text-[#0C0C0C]' : 'text-[#D7E2EA] hover:bg-[#D7E2EA]/10'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
