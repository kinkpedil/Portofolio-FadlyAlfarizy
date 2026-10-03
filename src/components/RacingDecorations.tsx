// Racing-themed illustrations for the About section corners. Drawn inline so they never depend on
// another server, and tinted with the site's purple-magenta-orange accent.

const BRAND_STOPS = (
  <>
    <stop offset="0%" stopColor="#7621B0" />
    <stop offset="55%" stopColor="#B600A8" />
    <stop offset="100%" stopColor="#BE4C00" />
  </>
);

export function CheckeredFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <defs>
        <pattern id="flag-checks" width="24" height="24" patternUnits="userSpaceOnUse">
          <rect width="24" height="24" fill="#0C0C0C" />
          <rect width="12" height="12" fill="#F2F5F7" />
          <rect x="12" y="12" width="12" height="12" fill="#F2F5F7" />
        </pattern>
        <linearGradient id="flag-folds" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#000" stopOpacity="0.35" />
          <stop offset="25%" stopColor="#fff" stopOpacity="0.12" />
          <stop offset="50%" stopColor="#000" stopOpacity="0.3" />
          <stop offset="75%" stopColor="#fff" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id="flag-pole" x1="0" x2="1">
          <stop offset="0%" stopColor="#BBCCD7" />
          <stop offset="100%" stopColor="#646973" />
        </linearGradient>
      </defs>
      <rect x="28" y="22" width="9" height="170" rx="4.5" fill="url(#flag-pole)" />
      <circle cx="32.5" cy="20" r="8" fill="url(#flag-pole)" />
      <path d="M37 32 C80 8 125 56 182 30 L182 122 C125 148 80 100 37 124 Z" fill="url(#flag-checks)" />
      <path d="M37 32 C80 8 125 56 182 30 L182 122 C125 148 80 100 37 124 Z" fill="url(#flag-folds)" />
      <path
        d="M37 32 C80 8 125 56 182 30 L182 122 C125 148 80 100 37 124 Z"
        fill="none"
        stroke="#D7E2EA"
        strokeOpacity="0.4"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function StartLights({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 130" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="light-on" cx="0.4" cy="0.35" r="0.7">
          <stop offset="0%" stopColor="#FFB3B3" />
          <stop offset="35%" stopColor="#FF2B2B" />
          <stop offset="100%" stopColor="#8A0000" />
        </radialGradient>
        <filter id="light-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
        <linearGradient id="gantry" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#3A3D44" />
          <stop offset="100%" stopColor="#16171A" />
        </linearGradient>
      </defs>
      <rect x="4" y="8" width="212" height="14" rx="5" fill="url(#gantry)" />
      {[0, 1, 2, 3, 4].map((i) => {
        const x = 12 + i * 41;
        return (
          <g key={i}>
            <rect x={x} y="22" width="33" height="98" rx="10" fill="#111214" stroke="#D7E2EA" strokeOpacity="0.15" />
            <circle cx={x + 16.5} cy="50" r="12" fill="#FF2B2B" opacity="0.7" filter="url(#light-glow)" />
            <circle cx={x + 16.5} cy="50" r="11" fill="url(#light-on)" />
            <circle cx={x + 16.5} cy="91" r="11" fill="#2A0B0B" stroke="#D7E2EA" strokeOpacity="0.08" />
          </g>
        );
      })}
    </svg>
  );
}

export function Speedometer({ className }: { className?: string }) {
  const cx = 100;
  const cy = 108;
  const ticks = Array.from({ length: 11 }, (_, i) => {
    const angle = Math.PI - (i / 10) * Math.PI;
    const outer = 84;
    const inner = i % 5 === 0 ? 66 : 72;
    return {
      x1: cx + Math.cos(angle) * inner,
      y1: cy - Math.sin(angle) * inner,
      x2: cx + Math.cos(angle) * outer,
      y2: cy - Math.sin(angle) * outer,
    };
  });
  // Needle at 75% of the dial.
  const needleAngle = Math.PI - 0.75 * Math.PI;

  return (
    <svg viewBox="0 0 200 135" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="gauge-arc" x1="0" x2="1">
          {BRAND_STOPS}
        </linearGradient>
        <radialGradient id="gauge-face" cx="0.5" cy="0.8" r="0.8">
          <stop offset="0%" stopColor="#24262B" />
          <stop offset="100%" stopColor="#0C0C0C" />
        </radialGradient>
      </defs>
      <path d="M8 108 A92 92 0 0 1 192 108 Z" fill="url(#gauge-face)" stroke="#D7E2EA" strokeOpacity="0.2" strokeWidth="2" />
      <path d="M22 108 A78 78 0 0 1 178 108" fill="none" stroke="#2A2C31" strokeWidth="12" strokeLinecap="round" />
      <path
        d="M22 108 A78 78 0 0 1 178 108"
        fill="none"
        stroke="url(#gauge-arc)"
        strokeWidth="12"
        strokeLinecap="round"
        pathLength={100}
        strokeDasharray="75 100"
      />
      {ticks.map((t, i) => (
        <line key={i} {...t} stroke="#D7E2EA" strokeOpacity="0.55" strokeWidth={i % 5 === 0 ? 3 : 1.5} strokeLinecap="round" />
      ))}
      <line
        x1={cx}
        y1={cy}
        x2={cx + Math.cos(needleAngle) * 70}
        y2={cy - Math.sin(needleAngle) * 70}
        stroke="#FF2B2B"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx={cx} cy={cy} r="9" fill="#D7E2EA" />
      <circle cx={cx} cy={cy} r="4" fill="#0C0C0C" />
    </svg>
  );
}

export function Tyre({ className }: { className?: string }) {
  const treads = Array.from({ length: 28 }, (_, i) => (i * 360) / 28);
  const spokes = Array.from({ length: 5 }, (_, i) => (i * 360) / 5);

  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="tyre-rubber" cx="0.4" cy="0.35" r="0.75">
          <stop offset="0%" stopColor="#2E3036" />
          <stop offset="100%" stopColor="#0A0A0B" />
        </radialGradient>
        <radialGradient id="tyre-rim" cx="0.35" cy="0.3" r="0.8">
          <stop offset="0%" stopColor="#F2F5F7" />
          <stop offset="60%" stopColor="#9AA3AD" />
          <stop offset="100%" stopColor="#4A4F57" />
        </radialGradient>
        <linearGradient id="tyre-accent" x1="0" x2="1" y1="0" y2="1">
          {BRAND_STOPS}
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="94" fill="url(#tyre-rubber)" />
      {treads.map((deg) => (
        <rect
          key={deg}
          x="96"
          y="7"
          width="8"
          height="14"
          rx="2"
          fill="#0C0C0C"
          stroke="#D7E2EA"
          strokeOpacity="0.12"
          transform={`rotate(${deg} 100 100)`}
        />
      ))}
      <circle cx="100" cy="100" r="68" fill="#17181B" stroke="#D7E2EA" strokeOpacity="0.1" />
      <circle cx="100" cy="100" r="58" fill="none" stroke="url(#tyre-accent)" strokeWidth="5" />
      <circle cx="100" cy="100" r="53" fill="url(#tyre-rim)" />
      {spokes.map((deg) => (
        <path key={deg} d="M93 100 L96 54 L104 54 L107 100 Z" fill="#2A2C31" transform={`rotate(${deg} 100 100)`} />
      ))}
      <circle cx="100" cy="100" r="16" fill="url(#tyre-rim)" stroke="#2A2C31" strokeWidth="3" />
      <circle cx="100" cy="100" r="5" fill="#2A2C31" />
    </svg>
  );
}
