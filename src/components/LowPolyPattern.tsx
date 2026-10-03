// Faceted triangle mesh: a jittered grid, each cell split into two triangles of varying brightness.
// A fixed-seed generator keeps the pattern identical on every render.
const LOW_POLY_TRIANGLES = (() => {
  let seed = 7;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  const cols = 12;
  const rows = 6;
  const cell = 100;
  const points = Array.from({ length: rows + 1 }, (_, r) =>
    Array.from({ length: cols + 1 }, (_, c) => {
      const edgeX = c === 0 || c === cols;
      const edgeY = r === 0 || r === rows;
      return [
        c * cell + (edgeX ? 0 : (rand() - 0.5) * cell * 0.7),
        r * cell + (edgeY ? 0 : (rand() - 0.5) * cell * 0.7),
      ];
    }),
  );
  const triangles: { points: string; opacity: number }[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const [a, b, d, e] = [points[r][c], points[r][c + 1], points[r + 1][c], points[r + 1][c + 1]];
      for (const tri of [[a, b, e], [a, e, d]]) {
        triangles.push({ points: tri.map((p) => p.join(',')).join(' '), opacity: 0.02 + rand() * 0.14 });
      }
    }
  }
  return triangles;
})();

export default function LowPolyPattern() {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid slice"
    >
      {LOW_POLY_TRIANGLES.map((tri, i) => (
        <polygon key={i} points={tri.points} fill="#D7E2EA" fillOpacity={tri.opacity} stroke="#D7E2EA" strokeOpacity={0.08} />
      ))}
    </svg>
  );
}
