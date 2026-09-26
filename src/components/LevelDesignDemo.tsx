import { useEffect, useMemo, useRef, useState } from 'react';
import { animate, createMotionPath } from 'animejs';
import { reducedMotion } from '@/components/Motion';

/*
 * A greybox level layout you can study the way a level designer does:
 * layers for cover, sightlines, the intended player route and the encounter beats.
 * The sightline layer is a real visibility calculation (ray casting against the walls).
 * Drag the viewpoint around to see how much of the map one position controls.
 */

type Rect = { x: number; y: number; w: number; h: number };
const MW = 640;
const MH = 400;
const BOUND: Rect = { x: 10, y: 10, w: 620, h: 380 };
const BLOCKS: Rect[] = [
  { x: 150, y: 70, w: 90, h: 60 },
  { x: 300, y: 170, w: 60, h: 150 },
  { x: 430, y: 60, w: 110, h: 70 },
  { x: 170, y: 250, w: 100, h: 50 },
  { x: 470, y: 240, w: 90, h: 90 },
];
const ROUTE: [number, number][] = [[50, 350], [110, 350], [110, 210], [250, 210], [250, 140], [270, 60], [400, 40], [400, 150], [600, 170], [600, 50]];
const BEATS = [
  { x: 50, y: 350, n: 1, title: 'Safe start', text: 'A readable, threat-free spawn so the player can get their bearings.' },
  { x: 250, y: 210, n: 2, title: 'First contact', text: 'Cover on both sides teaches the player to fight from cover.' },
  { x: 330, y: 50, n: 3, title: 'Flank route', text: 'A quieter side path rewards players who explore.' },
  { x: 600, y: 50, n: 4, title: 'Objective', text: 'A tall, visible landmark pulls the player toward the goal.' },
];

type Seg = [number, number, number, number];
const rectSegs = (r: Rect): Seg[] => [
  [r.x, r.y, r.x + r.w, r.y],
  [r.x + r.w, r.y, r.x + r.w, r.y + r.h],
  [r.x + r.w, r.y + r.h, r.x, r.y + r.h],
  [r.x, r.y + r.h, r.x, r.y],
];
const SEGS: Seg[] = [...rectSegs(BOUND), ...BLOCKS.flatMap(rectSegs)];
const CORNERS: [number, number][] = SEGS.map((s) => [s[0], s[1]]);

const inRect = (px: number, py: number, r: Rect) => px >= r.x && px <= r.x + r.w && py >= r.y && py <= r.y + r.h;
const blocked = (px: number, py: number) => BLOCKS.some((b) => inRect(px, py, b)) || !inRect(px, py, BOUND);

/** The polygon of everything visible from (sx, sy). */
function visibility(sx: number, sy: number): [number, number][] {
  const pts: { a: number; x: number; y: number }[] = [];
  const cast = (ang: number) => {
    const dx = Math.cos(ang);
    const dy = Math.sin(ang);
    let best = Infinity;
    for (const [x1, y1, x2, y2] of SEGS) {
      const ex = x2 - x1;
      const ey = y2 - y1;
      const den = dx * ey - dy * ex;
      if (Math.abs(den) < 1e-9) continue;
      const t = ((x1 - sx) * ey - (y1 - sy) * ex) / den;
      const u = ((x1 - sx) * dy - (y1 - sy) * dx) / den;
      if (t > 0.0001 && u >= 0 && u <= 1 && t < best) best = t;
    }
    if (best < Infinity) pts.push({ a: ang, x: sx + dx * best, y: sy + dy * best });
  };
  for (const [cx, cy] of CORNERS) {
    const a = Math.atan2(cy - sy, cx - sx);
    cast(a - 0.0002);
    cast(a);
    cast(a + 0.0002);
  }
  return pts.sort((p, q) => p.a - q.a).map((p) => [p.x, p.y] as [number, number]);
}

const inPoly = (px: number, py: number, poly: [number, number][]) => {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i, i += 1) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
};

const LAYERS = [
  { id: 'cover', label: 'Cover' },
  { id: 'sight', label: 'Sightlines' },
  { id: 'flow', label: 'Player route' },
  { id: 'beats', label: 'Encounter beats' },
] as const;
type Layer = (typeof LAYERS)[number]['id'];

const LevelDesignDemo = () => {
  const [on, setOn] = useState<Record<Layer, boolean>>({ cover: false, sight: true, flow: true, beats: true });
  const [eye, setEye] = useState<[number, number]>([330, 350]);
  const [beat, setBeat] = useState<number | null>(null);
  const svg = useRef<SVGSVGElement>(null);
  const dot = useRef<SVGCircleElement>(null);
  const routePath = useRef<SVGPathElement>(null);
  const dragging = useRef(false);

  const poly = useMemo(() => visibility(eye[0], eye[1]), [eye]);
  const exposure = useMemo(() => {
    let free = 0;
    let seen = 0;
    for (let x = 15; x < MW - 10; x += 12) {
      for (let y = 15; y < MH - 10; y += 12) {
        if (blocked(x, y)) continue;
        free += 1;
        if (inPoly(x, y, poly)) seen += 1;
      }
    }
    return free ? Math.round((seen / free) * 100) : 0;
  }, [poly]);

  // A marker runs along the intended route, like a player following the level's flow.
  useEffect(() => {
    if (!on.flow || reducedMotion() || !routePath.current || !dot.current) return undefined;
    const mp = createMotionPath(routePath.current);
    const a = animate(dot.current, { translateX: mp.translateX, translateY: mp.translateY, duration: 7000, loop: true, ease: 'linear' });
    return () => { a.pause(); };
  }, [on.flow]);

  const toSvg = (e: React.PointerEvent) => {
    const el = svg.current!;
    const pt = el.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const p = pt.matrixTransform(el.getScreenCTM()!.inverse());
    return [p.x, p.y] as [number, number];
  };
  const move = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const [x, y] = toSvg(e);
    if (!blocked(x, y)) setEye([x, y]);
  };

  const routeD = `M${ROUTE.map((p) => p.join(' ')).join(' L')}`;

  return (
    <div className="ld">
      <div className="ld-tools">
        <div className="fb-techs">
          {LAYERS.map((l) => (
            <button key={l.id} type="button" className={`fb-tech${on[l.id] ? ' on' : ''}`} aria-pressed={on[l.id]} onClick={() => setOn((s) => ({ ...s, [l.id]: !s[l.id] }))}>
              <span className="fb-dot" />{l.label}
            </button>
          ))}
        </div>
        <div className="ld-score" aria-live="polite">
          <span className="ld-num">{exposure}%</span>
          <span className="ld-cap">of the map is visible from the viewpoint</span>
        </div>
      </div>

      <svg
        ref={svg}
        viewBox={`0 0 ${MW} ${MH}`}
        className="ld-map"
        onPointerMove={move}
        onPointerUp={() => { dragging.current = false; }}
        onPointerLeave={() => { dragging.current = false; }}
        role="img"
        aria-label="Top-down greybox level layout"
      >
        <defs>
          <pattern id="ld-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0V20" fill="none" stroke="rgba(148,163,184,.1)" strokeWidth="1" />
          </pattern>
          <pattern id="ld-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <path d="M0 0V8" stroke="rgba(245,158,11,.55)" strokeWidth="2" />
          </pattern>
        </defs>
        <rect width={MW} height={MH} fill="#080d18" />
        <rect width={MW} height={MH} fill="url(#ld-grid)" />

        {on.sight && poly.length > 2 && (
          <polygon points={poly.map((p) => p.join(',')).join(' ')} className="ld-sight" />
        )}

        <rect x={BOUND.x} y={BOUND.y} width={BOUND.w} height={BOUND.h} className="ld-bound" />
        {BLOCKS.map((b, i) => (
          <g key={i}>
            <rect x={b.x} y={b.y} width={b.w} height={b.h} className="ld-block" />
            {on.cover && <rect x={b.x} y={b.y} width={b.w} height={b.h} fill="url(#ld-hatch)" />}
          </g>
        ))}

        <path ref={routePath} d={routeD} className={`ld-route${on.flow ? '' : ' off'}`} />
        {on.flow && <circle ref={dot} r={6} className="ld-runner" />}

        {on.beats && BEATS.map((b) => (
          <g key={b.n} className="ld-beat" onPointerEnter={() => setBeat(b.n)} onPointerLeave={() => setBeat(null)} onClick={() => setBeat(b.n)} tabIndex={0} onFocus={() => setBeat(b.n)} onBlur={() => setBeat(null)}>
            <circle cx={b.x} cy={b.y} r={13} />
            <text x={b.x} y={b.y + 4.5} textAnchor="middle">{b.n}</text>
          </g>
        ))}

        <g
          className="ld-eye"
          onPointerDown={(e) => { dragging.current = true; (e.target as Element).setPointerCapture(e.pointerId); }}
          style={{ cursor: 'grab' }}
        >
          <circle cx={eye[0]} cy={eye[1]} r={15} className="ld-eye-ring" />
          <circle cx={eye[0]} cy={eye[1]} r={6} className="ld-eye-dot" />
        </g>
      </svg>

      <div className="ld-note">
        {beat ? (
          <p><b>{BEATS[beat - 1].n}. {BEATS[beat - 1].title}.</b> {BEATS[beat - 1].text}</p>
        ) : (
          <p>Drag the glowing viewpoint around the map. Turn on <b>Cover</b> to see the blocks that break up sightlines, and hover the numbered beats to see why each area is there.</p>
        )}
      </div>
    </div>
  );
};

export default LevelDesignDemo;

