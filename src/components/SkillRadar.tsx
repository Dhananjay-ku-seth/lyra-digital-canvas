import { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import { reducedMotion } from '@/components/Motion';
import type { SkillGroup } from '@/data/site';

/* A radar (spider) chart alternative view of one skill group, drawn and animated in. */

const SIZE = 220;
const C = SIZE / 2;
const R = SIZE * 0.38;

const TONE_COLOR: Record<SkillGroup['tone'], string> = {
  green: '#00ff99',
  purple: '#a78bfa',
  pink: '#f472b6',
  blue: '#61dafb',
};

const point = (i: number, n: number, r: number) => {
  const a = -Math.PI / 2 + (i / n) * Math.PI * 2;
  return [C + r * Math.cos(a), C + r * Math.sin(a)] as const;
};

const SkillRadar = ({ g }: { g: SkillGroup }) => {
  const n = g.items.length;
  const shapeRef = useRef<SVGPolygonElement>(null);
  const dotsRef = useRef<SVGGElement>(null);
  const color = TONE_COLOR[g.tone];

  const valuePoints = g.items.map((s, i) => point(i, n, (s.level / 100) * R));
  const shapePoints = valuePoints.map((p) => p.join(',')).join(' ');

  useEffect(() => {
    if (reducedMotion() || !shapeRef.current) return undefined;
    const zero = g.items.map((_, i) => point(i, n, 0).join(',')).join(' ');
    shapeRef.current.setAttribute('points', zero);
    const dots = Array.from(dotsRef.current?.children ?? []) as SVGCircleElement[];
    dots.forEach((d) => { d.style.opacity = '0'; });
    const t = setTimeout(() => {
      animate({ p: 0 }, {
        p: 1,
        duration: 1100,
        ease: 'outExpo',
        onUpdate: (a) => {
          const t2 = (a.targets[0] as { p: number }).p;
          const pts = g.items.map((s, i) => point(i, n, (s.level / 100) * R * t2).join(',')).join(' ');
          shapeRef.current?.setAttribute('points', pts);
        },
      });
      animate(dots, { opacity: [0, 1], scale: [0, 1], delay: (i) => 700 + i * 90, duration: 400, ease: 'outBack' });
    }, 120);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [g]);

  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="radar" role="img" aria-label={`${g.title} skill radar`}>
      {[0.25, 0.5, 0.75, 1].map((f) => (
        <polygon key={f} points={g.items.map((_, i) => point(i, n, R * f).join(',')).join(' ')} className="radar-ring" />
      ))}
      {g.items.map((_, i) => {
        const [x, y] = point(i, n, R);
        return <line key={i} x1={C} y1={C} x2={x} y2={y} className="radar-ring" />;
      })}
      <polygon ref={shapeRef} points={shapePoints} className="radar-shape" style={{ fill: `${color}26`, stroke: color }} />
      <g ref={dotsRef}>
        {valuePoints.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={4} style={{ fill: color }} />
        ))}
      </g>
      {g.items.map((s, i) => {
        const [x, y] = point(i, n, R + 26);
        return (
          <text key={s.name} x={x} y={y} textAnchor="middle" dominantBaseline="middle" className="radar-label">
            {s.name.length > 14 ? `${s.name.slice(0, 13)}…` : s.name}
          </text>
        );
      })}
    </svg>
  );
};

export default SkillRadar;
