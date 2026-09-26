import { useEffect, useMemo, useRef } from 'react';
import { animate, createDrawable, createMotionPath, stagger } from 'animejs';
import { reducedMotion } from '@/components/Motion';

/*
 * A full-page animated printed-circuit-board background.
 *  - copper traces with 45 degree bends, pads, vias and chip footprints, laid out procedurally
 *  - traces draw themselves in on load
 *  - glowing signal pulses (anime.js motion paths) race along the traces
 *  - a brighter copy of the board is revealed around the mouse pointer
 * The layout is seeded, so it looks the same on every visit.
 */

const W = 1600;
const H = 1000;
const G = 40;

const rng = (seed: number) => {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
};

type Chip = { x: number; y: number; w: number; h: number; pins: number };
const CHIPS: Chip[] = [
  { x: 200, y: 200, w: 160, h: 100, pins: 6 },
  { x: 1160, y: 120, w: 200, h: 120, pins: 7 },
  { x: 640, y: 600, w: 180, h: 120, pins: 6 },
  { x: 1240, y: 700, w: 140, h: 100, pins: 5 },
  { x: 120, y: 740, w: 120, h: 80, pins: 4 },
  { x: 900, y: 340, w: 120, h: 80, pins: 4 },
];

type Trace = { d: string; len: number; end: [number, number]; start: [number, number] };

function buildBoard() {
  const r = rng(20260927);
  const clamp = (v: number, hi: number) => Math.max(G, Math.min(hi - G, v));

  const walk = (sx: number, sy: number, dx: number, dy: number): Trace => {
    const pts: [number, number][] = [[sx, sy]];
    let x = sx;
    let y = sy;
    let horizontal = dx !== 0;
    const steps = 3 + Math.floor(r() * 4);
    for (let i = 0; i < steps; i += 1) {
      const len = (2 + Math.floor(r() * 5)) * G;
      if (i === 0) {
        x += dx * len;
        y += dy * len;
      } else if (r() < 0.3) {
        // a 45 degree run, like a real board
        const d = (1 + Math.floor(r() * 3)) * G;
        x += (r() < 0.5 ? -1 : 1) * d;
        y += (r() < 0.5 ? -1 : 1) * d;
      } else {
        horizontal = !horizontal;
        const sgn = r() < 0.5 ? -1 : 1;
        if (horizontal) x += sgn * len;
        else y += sgn * len;
      }
      x = clamp(x, W);
      y = clamp(y, H);
      pts.push([x, y]);
    }
    let len = 0;
    for (let i = 1; i < pts.length; i += 1) len += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    return { d: `M${pts.map((p) => p.join(' ')).join(' L')}`, len, start: pts[0], end: pts[pts.length - 1] };
  };

  const traces: Trace[] = [];
  // Traces that leave the chip pins.
  for (const c of CHIPS) {
    const step = c.h / (c.pins + 1);
    for (let i = 1; i <= c.pins; i += 1) {
      if (r() < 0.55) traces.push(walk(c.x - 16, c.y + step * i, -1, 0));
      if (r() < 0.55) traces.push(walk(c.x + c.w + 16, c.y + step * i, 1, 0));
    }
  }
  // Free-running traces.
  for (let i = 0; i < 14; i += 1) {
    const horizontal = r() < 0.5;
    traces.push(walk(G * (2 + Math.floor(r() * 36)), G * (2 + Math.floor(r() * 22)), horizontal ? (r() < 0.5 ? 1 : -1) : 0, horizontal ? 0 : r() < 0.5 ? 1 : -1));
  }
  const vias: [number, number][] = Array.from({ length: 26 }, () => [G * (2 + Math.floor(r() * 36)), G * (2 + Math.floor(r() * 22))]);
  return { traces, vias };
}

/** Faint game-dev sketches drawn in the same copper style: Blueprint nodes, low-poly meshes and reticles. */
const GameDoodles = () => (
  <g className="cb-game">
    {[[620, 90], [1330, 470], [140, 520]].map(([x, y], i) => (
      <g key={`bp${i}`}>
        <rect x={x} y={y} width={78} height={46} rx={6} />
        <path d={`M${x} ${y + 14}h78`} />
        <rect x={x + 150} y={y + 30} width={78} height={46} rx={6} />
        <path d={`M${x + 150} ${y + 44}h78`} />
        <path d={`M${x + 78} ${y + 30}C${x + 116} ${y + 30} ${x + 112} ${y + 58} ${x + 150} ${y + 58}`} />
        <circle cx={x + 78} cy={y + 30} r={3.5} />
        <circle cx={x + 150} cy={y + 58} r={3.5} />
      </g>
    ))}
    {[[980, 820], [60, 300]].map(([x, y], i) => (
      <g key={`mesh${i}`}>
        <path d={`M${x} ${y + 90}L${x + 50} ${y}L${x + 100} ${y + 60}L${x + 160} ${y + 10}L${x + 220} ${y + 90}Z`} />
        <path d={`M${x + 50} ${y}L${x + 70} ${y + 90}M${x + 100} ${y + 60}L${x + 70} ${y + 90}M${x + 100} ${y + 60}L${x + 130} ${y + 90}M${x + 160} ${y + 10}L${x + 130} ${y + 90}M${x + 160} ${y + 10}L${x + 185} ${y + 90}`} />
      </g>
    ))}
    {[[420, 380], [1450, 210], [820, 900]].map(([x, y], i) => (
      <g key={`ret${i}`}>
        <circle cx={x} cy={y} r={22} />
        <circle cx={x} cy={y} r={3} />
        <path d={`M${x - 34} ${y}h20M${x + 14} ${y}h20M${x} ${y - 34}v20M${x} ${y + 14}v20`} />
      </g>
    ))}
  </g>
);

const COLORS = ['#61dafb', '#00ff99', '#a78bfa', '#61dafb', '#f472b6'];

const CircuitBoard = () => {
  const root = useRef<HTMLDivElement>(null);
  const board = useMemo(buildBoard, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return undefined;
    const running: { pause: () => void }[] = [];

    if (!reducedMotion()) {
      const paths = Array.from(el.querySelectorAll<SVGPathElement>('.cb-base .cb-trace'));

      // 1. The copper draws itself in.
      running.push(animate(createDrawable(paths as unknown as string), { draw: ['0 0', '0 1'], delay: stagger(70), duration: 1800, ease: 'inOutQuad' }));

      // 2. Signal pulses race along a selection of traces, each with a short fading tail.
      const pulseEls = Array.from(el.querySelectorAll<SVGCircleElement>('.cb-pulse'));
      pulseEls.forEach((c) => {
        const i = Number(c.dataset.trace);
        const tail = Number(c.dataset.tail);
        const path = paths[i];
        if (!path) return;
        const mp = createMotionPath(path);
        const duration = Math.max(3200, (board.traces[i].len / 95) * 1000);
        running.push(
          animate(c, {
            translateX: mp.translateX,
            translateY: mp.translateY,
            duration,
            delay: 1600 + (i * 373) % 4200 + tail * 110,
            loop: true,
            ease: 'linear',
          }),
        );
      });
    }

    // 3. A brighter copy of the board follows the pointer; the whole board drifts a little as you scroll.
    let raf = 0;
    let mx = window.innerWidth * 0.5;
    let my = window.innerHeight * 0.4;
    const paint = () => {
      raf = 0;
      el.style.setProperty('--mx', `${mx}px`);
      el.style.setProperty('--my', `${my}px`);
      el.style.setProperty('--sy', `${window.scrollY}`);
    };
    const queue = () => { if (!raf) raf = requestAnimationFrame(paint); };
    const move = (e: PointerEvent) => { mx = e.clientX; my = e.clientY; queue(); };
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('scroll', queue, { passive: true });
    paint();

    return () => {
      running.forEach((a) => a.pause());
      window.removeEventListener('pointermove', move);
      window.removeEventListener('scroll', queue);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [board]);

  // Which traces carry a pulse, and with which colour.
  const pulses = board.traces
    .map((_, i) => i)
    .filter((i) => i % 2 === 0)
    .slice(0, 14);

  return (
    <div ref={root} className="circuit" aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice">
        <defs>
          {COLORS.map((c, i) => (
            <radialGradient key={c + i} id={`cb-halo-${i}`}>
              <stop offset="0" stopColor={c} stopOpacity="1" />
              <stop offset="0.35" stopColor={c} stopOpacity="0.55" />
              <stop offset="1" stopColor={c} stopOpacity="0" />
            </radialGradient>
          ))}
        </defs>

        <g id="cb-board" className="cb-base">
          <GameDoodles />
          {board.traces.map((t, i) => (
            <g key={i}>
              <path className="cb-trace" d={t.d} />
              <circle className="cb-pad" cx={t.start[0]} cy={t.start[1]} r={5} />
              <circle className="cb-pad" cx={t.end[0]} cy={t.end[1]} r={5} />
            </g>
          ))}
          {board.vias.map((v, i) => (
            <g key={`v${i}`}>
              <circle className="cb-via" cx={v[0]} cy={v[1]} r={6} />
              <circle className="cb-via-dot" cx={v[0]} cy={v[1]} r={2} />
            </g>
          ))}
          {CHIPS.map((c, i) => (
            <g key={`c${i}`} className="cb-chip">
              <rect x={c.x} y={c.y} width={c.w} height={c.h} rx={8} />
              <rect x={c.x + 14} y={c.y + 14} width={c.w - 28} height={c.h - 28} rx={4} className="cb-die" />
              <circle cx={c.x + 12} cy={c.y + c.h - 12} r={3.5} className="cb-pin1" />
              {Array.from({ length: c.pins }, (_, k) => {
                const y = c.y + ((k + 1) * c.h) / (c.pins + 1);
                return (
                  <g key={k}>
                    <line x1={c.x - 12} y1={y} x2={c.x} y2={y} />
                    <line x1={c.x + c.w} y1={y} x2={c.x + c.w + 12} y2={y} />
                  </g>
                );
              })}
            </g>
          ))}
        </g>

        <g className="cb-bright">
          <use href="#cb-board" />
        </g>

        <g>
          {pulses.map((i, n) =>
            [0, 1].map((tail) => (
              <circle
                key={`${i}-${tail}`}
                className="cb-pulse"
                data-trace={i}
                data-tail={tail}
                r={10 - tail * 3}
                fill={`url(#cb-halo-${n % COLORS.length})`}
                opacity={1 - tail * 0.35}
              />
            )),
          )}
        </g>
      </svg>
    </div>
  );
};

export default CircuitBoard;
