type LiveProjectButtonProps = {
  /** Without a link the pill renders as a non-interactive badge. */
  href?: string;
  label: string;
  /** Open in a new tab; off for links within this site. */
  external?: boolean;
};

const PILL_CLASS =
  'inline-block whitespace-nowrap rounded-full border-2 border-[#D7E2EA] px-8 py-3 text-sm font-medium uppercase tracking-widest text-[#D7E2EA] sm:px-10 sm:py-3.5 sm:text-base';

export default function LiveProjectButton({ href, label, external = true }: LiveProjectButtonProps) {
  if (!href) {
    return <span className={`${PILL_CLASS} border-dashed opacity-60`}>{label}</span>;
  }

  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className={`${PILL_CLASS} transition-colors duration-200 hover:bg-[#D7E2EA]/10`}
    >
      {label}
    </a>
  );
}
