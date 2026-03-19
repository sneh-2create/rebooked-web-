export type DecorVariant = 'hero' | 'cta' | 'explore' | 'nearby' | 'upload';

function svgDataUri(svg: string) {
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export function bookDecorBackground(variant: DecorVariant) {
  // Modern abstract background:
  // - layered gradient "mesh"
  // - soft conic highlight
  // - subtle film-noise texture
  const noiseSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160">
    <filter id="n">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
    </filter>
    <rect width="160" height="160" filter="url(#n)" opacity="0.35"/>
  </svg>
  `.trim();

  const noise = `url("${svgDataUri(noiseSvg)}")`;

  const palettes: Record<DecorVariant, { a: string; b: string; c: string }> = {
    hero: { a: '#1d4ed8', b: '#7c3aed', c: '#22c55e' },
    cta: { a: '#2563eb', b: '#7c3aed', c: '#22c55e' },
    explore: { a: '#3b82f6', b: '#6d28d9', c: '#22c55e' },
    nearby: { a: '#2563eb', b: '#7c3aed', c: '#f97316' },
    upload: { a: '#60a5fa', b: '#a78bfa', c: '#34d399' },
  };

  const { a, b, c } = palettes[variant];

  const overlay = (() => {
    switch (variant) {
      case 'upload':
        return { top: 'rgba(0,0,0,0.55)', bottom: 'rgba(0,0,0,0.44)' };
      case 'nearby':
        return { top: 'rgba(0,0,0,0.34)', bottom: 'rgba(0,0,0,0.26)' };
      case 'explore':
        return { top: 'rgba(0,0,0,0.36)', bottom: 'rgba(0,0,0,0.28)' };
      case 'cta':
        // CTA card background is usually on a white surface, so keep this lighter.
        return { top: 'rgba(0,0,0,0.16)', bottom: 'rgba(0,0,0,0.10)' };
      case 'hero':
      default:
        return { top: 'rgba(0,0,0,0.40)', bottom: 'rgba(0,0,0,0.30)' };
    }
  })();

  return {
    backgroundImage: [
      // Overlay: improves readability for white text areas.
      `linear-gradient(180deg, ${overlay.top} 0%, ${overlay.bottom} 100%)`,
      // Mesh-ish blobs
      `radial-gradient(900px circle at 10% 0%, ${a}40 0%, transparent 55%)`,
      `radial-gradient(720px circle at 95% 10%, ${b}35 0%, transparent 52%)`,
      `radial-gradient(680px circle at 40% 120%, ${c}2f 0%, transparent 45%)`,
      // A soft conic highlight gives the “premium” 2026 feel.
      `conic-gradient(from 210deg at 50% 45%, ${a}1a, ${b}10, ${c}1a, ${a}1a)`,
      // Texture
      noise,
    ].join(', '),
    backgroundSize: 'cover, cover, cover, cover, cover, 260px 260px',
    backgroundRepeat: 'no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, repeat',
    backgroundPosition: 'center, center, center, center, center, 0 0',
  } as const;
}

