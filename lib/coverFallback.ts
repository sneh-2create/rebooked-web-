export type CoverQueryInput = {
  title: string;
  author?: string;
  genre?: string;
};

export function makeBookCoverUrl(
  input: CoverQueryInput,
  opts?: { width?: number; height?: number; seq?: string; orientation?: string }
) {
  const title = (input.title ?? '').trim();
  const author = (input.author ?? '').trim();

  const width = opts?.width ?? 300;
  const height = opts?.height ?? 400;
  const seq = opts?.seq ?? 'book';

  const safe = (s: string) =>
    s
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');

  // Deterministic colors (based on seq) for consistent placeholders.
  let hash = 0;
  for (let i = 0; i < seq.length; i += 1) hash = (hash * 31 + seq.charCodeAt(i)) % 360;
  const hue1 = hash;
  const hue2 = (hash + 50) % 360;

  const titleLine = title || 'Untitled';
  const authorLine = author ? `by ${author}` : '';

  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="hsl(${hue1} 85% 55%)"/>
        <stop offset="1" stop-color="hsl(${hue2} 85% 50%)"/>
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="10" stdDeviation="10" flood-opacity="0.25"/>
      </filter>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#g)"/>
    <rect x="${Math.round(width * 0.08)}" y="${Math.round(height * 0.08)}" width="${Math.round(
    width * 0.84
  )}" height="${Math.round(height * 0.84)}" rx="${Math.round(width * 0.06)}" fill="rgba(255,255,255,0.14)" stroke="rgba(255,255,255,0.22)" filter="url(#shadow)"/>
    <text x="${Math.round(width * 0.5)}" y="${Math.round(height * 0.52)}" text-anchor="middle"
      font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
      font-size="${Math.round(width * 0.08)}" fill="white" font-weight="800">
      ${safe(titleLine).slice(0, 28)}
    </text>
    ${
      authorLine
        ? `<text x="${Math.round(width * 0.5)}" y="${Math.round(height * 0.63)}" text-anchor="middle"
        font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
        font-size="${Math.round(width * 0.045)}" fill="rgba(255,255,255,0.9)" font-weight="600">
        ${safe(authorLine).slice(0, 36)}
      </text>`
        : ''
    }
  </svg>
  `.trim();

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

