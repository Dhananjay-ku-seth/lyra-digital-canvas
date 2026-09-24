import type { Category } from '@/data/projects';

/*
 * Small generated illustrations used as project cover art. Hand-drawn SVG (no image files),
 * coloured through `currentColor` so they follow the category accent.
 */
const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 2.2, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

const Art = ({ id, category }: { id: string; category: Category }) => {
  switch (id) {
    case 'dsp-signal-lab':
      return (
        <g>
          {Array.from({ length: 28 }).map((_, i) => {
            const h = 8 + 70 * Math.exp(-((i - 7) ** 2) / 6) + 34 * Math.exp(-((i - 14) ** 2) / 5) + 20 * Math.exp(-((i - 21) ** 2) / 5) + ((i * 37) % 9);
            return <rect key={i} x={20 + i * 10} y={104 - h} width={6} height={h} rx={2} fill="currentColor" opacity={0.35 + h / 200} />;
          })}
        </g>
      );
    case 'pid-control-playground':
      return (
        <g {...stroke}>
          <path d="M14 62 H306" strokeDasharray="6 6" opacity={0.4} />
          <path d="M14 90 C50 90 60 24 96 30 S140 96 176 84 S236 34 262 52 S290 62 306 60" />
          <circle cx={262} cy={52} r={7} fill="currentColor" />
        </g>
      );
    case 'logic-circuit-sim':
      return (
        <g {...stroke}>
          <path d="M40 40 H110 M40 80 H110 M110 24 H150 A36 36 0 0 1 150 96 H110 Z M204 60 H280" />
          <circle cx={40} cy={40} r={4} fill="currentColor" />
          <circle cx={40} cy={80} r={4} fill="currentColor" />
          <circle cx={280} cy={60} r={4} fill="currentColor" />
        </g>
      );
    case 'comms-simulator':
      return (
        <g fill="currentColor">
          {Array.from({ length: 16 }).map((_, i) => {
            const cx = 110 + (i % 4) * 34, cy = 24 + Math.floor(i / 4) * 24;
            return [0, 1, 2].map((k) => (
              <circle key={`${i}-${k}`} cx={cx + (((i * 7 + k * 13) % 11) - 5)} cy={cy + (((i * 5 + k * 17) % 9) - 4)} r={2.2} opacity={0.75} />
            ));
          })}
        </g>
      );
    case 'waveform-viewer':
      return (
        <g {...stroke}>
          <path d="M14 34 H44 V16 H74 V34 H104 V16 H134 V34 H164 V16 H194 V34 H224 V16 H254 V34 H306" />
          <path d="M14 72 H74 V54 H134 V72 H194 V54 H254 V72 H306" opacity={0.75} />
          <path d="M14 108 H104 V90 H194 V108 H306" opacity={0.55} />
        </g>
      );
    case 'state-machine-designer':
      return (
        <g {...stroke}>
          <circle cx={60} cy={60} r={22} />
          <circle cx={160} cy={32} r={22} />
          <circle cx={260} cy={72} r={22} />
          <circle cx={260} cy={72} r={16} opacity={0.6} />
          <path d="M82 52 L138 38 M182 40 L240 62 M240 88 C200 112 110 112 76 80" />
        </g>
      );
    case 'circuit-puzzle':
      return (
        <g {...stroke}>
          {[0, 1, 2, 3].map((r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={70 + c * 62} y={14 + r * 26} width={50} height={20} rx={4} opacity={(r + c) % 2 ? 0.35 : 0.8} />))}
        </g>
      );
    case 'smart-energy-meter':
      return (
        <g {...stroke}>
          <path d="M70 100 A90 90 0 0 1 250 100" opacity={0.5} />
          <path d="M70 100 A90 90 0 0 1 176 24" strokeWidth={7} />
          <path d="M160 100 L200 44" />
          <circle cx={160} cy={100} r={6} fill="currentColor" />
        </g>
      );
    case 'ev-battery-sim':
      return (
        <g {...stroke}>
          <rect x={60} y={30} width={190} height={66} rx={10} />
          <path d="M250 52 H266 V74 H250" />
          {[0, 1, 2, 3].map((i) => <rect key={i} x={72 + i * 44} y={42} width={34} height={42} rx={4} fill="currentColor" opacity={0.25 + i * 0.2} stroke="none" />)}
        </g>
      );
    case 'prepbench':
      return (
        <g {...stroke}>
          <path d="M70 40 H120 M95 15 V65" />
          <path d="M150 40 H200" />
          <path d="M150 62 H200" />
          <path d="M230 18 L270 62 M270 18 L230 62" opacity={0.7} />
          <path d="M70 96 H270" strokeDasharray="4 8" opacity={0.5} />
        </g>
      );
    case 'labbench-hub':
      return (
        <g {...stroke}>
          {[0, 1, 2].map((r) => [0, 1, 2, 3].map((c) => <rect key={`${r}${c}`} x={60 + c * 60} y={14 + r * 32} width={48} height={24} rx={6} opacity={0.35 + ((r * 4 + c) % 5) * 0.13} />))}
        </g>
      );
    case 'sena':
      return (
        <g {...stroke}>
          <circle cx={160} cy={60} r={34} />
          <circle cx={160} cy={60} r={4} fill="currentColor" />
          <path d="M160 14 V34 M160 86 V106 M114 60 H134 M186 60 H206" />
        </g>
      );
    case 'fortnite-maps':
      return (
        <g {...stroke}>
          <path d="M14 104 L80 40 L120 76 L180 18 L250 96 L306 60" />
          <path d="M14 104 H306" opacity={0.5} />
        </g>
      );
    case 'roblox':
      return (
        <g {...stroke}>
          <path d="M110 44 L150 28 L190 44 L150 60 Z M110 44 V84 L150 100 V60 M190 44 V84 L150 100" />
          <path d="M210 70 L232 60 L254 70 L232 80 Z" opacity={0.6} />
        </g>
      );
    case 'drone':
      return (
        <g {...stroke}>
          <rect x={138} y={46} width={44} height={28} rx={6} />
          <path d="M138 52 L96 30 M182 52 L224 30 M138 68 L96 90 M182 68 L224 90" />
          {[[96, 30], [224, 30], [96, 90], [224, 90]].map(([x, y]) => <ellipse key={`${x}${y}`} cx={x} cy={y} rx={22} ry={5} opacity={0.65} />)}
        </g>
      );
    case 'vlsi':
      return (
        <g {...stroke}>
          <rect x={100} y={26} width={120} height={68} rx={8} />
          {[0, 1, 2, 3].map((i) => <path key={i} d={`M${120 + i * 26} 26 V10 M${120 + i * 26} 94 V110`} />)}
          <rect x={132} y={46} width={56} height={28} rx={4} opacity={0.6} />
        </g>
      );
    default:
      return category === 'game' ? (
        <g {...stroke}><path d="M100 46 H220 A20 20 0 0 1 240 66 V72 A16 16 0 0 1 208 80 L200 70 H120 L112 80 A16 16 0 0 1 80 72 V66 A20 20 0 0 1 100 46 Z" /></g>
      ) : (
        <g {...stroke}><rect x={120} y={30} width={80} height={60} rx={8} /></g>
      );
  }
};

const tone: Record<Category, string> = {
  game: 'text-tech-purple',
  electronics: 'text-tech-pink',
  tools: 'text-tech-neon',
};

const ProjectArt = ({ id, category, className = '' }: { id: string; category: Category; className?: string }) => (
  <div className={`project-art ${tone[category]} ${className}`} aria-hidden="true">
    <svg viewBox="0 0 320 120" preserveAspectRatio="xMidYMid meet" className="h-full w-full">
      <Art id={id} category={category} />
    </svg>
  </div>
);

export default ProjectArt;
