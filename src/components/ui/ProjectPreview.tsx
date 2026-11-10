/**
 * Vista previa generada cuando un proyecto aún no tiene captura.
 * Dibuja una "ventana" con un grafo determinista a partir del título,
 * así cada proyecto tiene una imagen distinta y estable.
 */
export function ProjectPreview({ semilla }: { semilla: string }) {
  let h = 2166136261;
  for (let i = 0; i < semilla.length; i++) h = Math.imul(h ^ semilla.charCodeAt(i), 16777619);
  const rnd = () => ((h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0) % 1000) / 1000;

  const nodos = Array.from({ length: 9 }, () => ({ x: 60 + rnd() * 480, y: 80 + rnd() * 230 }));
  const enlaces: [number, number][] = [];
  nodos.forEach((_, i) => {
    if (i > 0) enlaces.push([i, Math.floor(rnd() * i)]);
  });

  return (
    <svg viewBox="0 0 600 360" preserveAspectRatio="xMidYMid slice" className="h-full w-full" role="img" aria-label="Vista previa provisional del proyecto">
      <defs>
        <linearGradient id={`g-${semilla.length}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3BE3F5" stopOpacity="0.9" />
          <stop offset="1" stopColor="#8D7BFF" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <rect width="600" height="360" fill="#0D1326" />
      <rect x="0" y="0" width="600" height="36" fill="#111A33" />
      {[22, 42, 62].map((x) => <circle key={x} cx={x} cy="18" r="5" fill="#1C2647" />)}
      <rect x="230" y="11" width="140" height="14" rx="7" fill="#1C2647" />
      {enlaces.map(([a, b], i) => (
        <line key={i} x1={nodos[a].x} y1={nodos[a].y} x2={nodos[b].x} y2={nodos[b].y} stroke={`url(#g-${semilla.length})`} strokeOpacity="0.45" strokeWidth="1.5" />
      ))}
      {nodos.map((n, i) => (
        <g key={i}>
          <rect x={n.x - 26} y={n.y - 11} width="52" height="22" rx="6" fill="#060914" stroke={i === 0 ? "#3BE3F5" : "#1C2647"} />
          <rect x={n.x - 16} y={n.y - 2} width={14 + (i % 3) * 6} height="4" rx="2" fill={i === 0 ? "#3BE3F5" : "#2A3763"} />
        </g>
      ))}
    </svg>
  );
}
