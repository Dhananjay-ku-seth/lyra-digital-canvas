import { useEffect, useRef, type ReactNode } from 'react';
import { animate, createAnimatable, utils } from 'animejs';
import { burst, popText, reducedMotion } from '@/components/Motion';

/*
 * Floating electronic components scattered down the page.
 * Each one: parallaxes at its own depth as you scroll, drifts and turns on its own, is pushed away
 * by the pointer, and spins with a spark when clicked. Purely decorative, so hidden from assistive tech.
 */

const PART: Record<string, { label: string; w: number; h: number; art: ReactNode }> = {
  chip: {
    label: 'IC chip', w: 120, h: 84,
    art: (
      <>
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x={4} y={14 + i * 16} width={16} height={6} rx={1} fill="#9aa7bd" />
            <rect x={100} y={14 + i * 16} width={16} height={6} rx={1} fill="#9aa7bd" />
          </g>
        ))}
        <rect x={18} y={6} width={84} height={72} rx={6} fill="#0f1930" stroke="#61dafb" strokeWidth={2} />
        <path d="M52 6a8 8 0 0 0 16 0" fill="#070b14" stroke="#61dafb" strokeWidth={2} />
        <circle cx={30} cy={66} r={3} fill="#61dafb" />
        <path d="M36 34h48M36 46h34" stroke="#8b5cf6" strokeWidth={3} strokeLinecap="round" opacity={0.85} />
      </>
    ),
  },
  cpu: {
    label: 'Processor', w: 100, h: 100,
    art: (
      <>
        {Array.from({ length: 7 }, (_, i) => (
          <g key={i} stroke="#9aa7bd" strokeWidth={3} strokeLinecap="round">
            <path d={`M${24 + i * 8.6} 2v12M${24 + i * 8.6} 86v12M2 ${24 + i * 8.6}h12M86 ${24 + i * 8.6}h12`} />
          </g>
        ))}
        <rect x={14} y={14} width={72} height={72} rx={8} fill="#111a2e" stroke="#8b5cf6" strokeWidth={2} />
        <rect x={30} y={30} width={40} height={40} rx={4} fill="#1b2547" stroke="#ec4899" strokeWidth={2} />
        <path d="M14 14l12 0-12 12z" fill="#8b5cf6" />
        <path d="M40 50h20M50 40v20" stroke="#ec4899" strokeWidth={2} opacity={0.7} />
      </>
    ),
  },
  transistor: {
    label: 'Transistor', w: 80, h: 110,
    art: (
      <>
        <path d="M28 62V104M40 62V104M52 62V104" stroke="#cbd5e1" strokeWidth={3} strokeLinecap="round" />
        <path d="M14 62V40a26 26 0 0 1 52 0v22Z" fill="#161f3a" stroke="#ec4899" strokeWidth={2} />
        <path d="M22 60V42a18 18 0 0 1 12-17" fill="none" stroke="rgba(255,255,255,.28)" strokeWidth={2} strokeLinecap="round" />
        <path d="M28 46h24M28 54h16" stroke="#ec4899" strokeWidth={2} strokeLinecap="round" opacity={0.7} />
      </>
    ),
  },
  resistor: {
    label: 'Resistor', w: 140, h: 40,
    art: (
      <>
        <path d="M0 20h30M110 20h30" stroke="#cbd5e1" strokeWidth={3} strokeLinecap="round" />
        <rect x={28} y={7} width={84} height={26} rx={13} fill="#d9b98a" />
        <rect x={44} y={7} width={7} height={26} fill="#7c3a1c" />
        <rect x={58} y={7} width={7} height={26} fill="#151515" />
        <rect x={72} y={7} width={7} height={26} fill="#d94f2b" />
        <rect x={94} y={7} width={6} height={26} fill="#d4af37" />
      </>
    ),
  },
  capacitor: {
    label: 'Capacitor', w: 70, h: 110,
    art: (
      <>
        <path d="M26 78v28M44 78v28" stroke="#cbd5e1" strokeWidth={3} strokeLinecap="round" />
        <rect x={10} y={18} width={50} height={62} rx={4} fill="#1c3d6b" stroke="#61dafb" strokeWidth={2} />
        <rect x={10} y={18} width={16} height={62} fill="#cbd5e1" opacity={0.85} />
        <ellipse cx={35} cy={18} rx={25} ry={6} fill="#2a5a99" stroke="#61dafb" strokeWidth={2} />
        <path d="M18 34h0M18 46h0M18 58h0" stroke="#0b1220" strokeWidth={3} strokeLinecap="round" />
      </>
    ),
  },
  led: {
    label: 'LED', w: 60, h: 100,
    art: (
      <>
        <circle className="led-glow" cx={30} cy={40} r={26} fill="#00ff99" opacity={0.28} />
        <path d="M22 62v34M38 62v28" stroke="#cbd5e1" strokeWidth={3} strokeLinecap="round" />
        <path d="M14 62V36a16 16 0 0 1 32 0v26Z" fill="rgba(0,255,153,.32)" stroke="#00ff99" strokeWidth={2} />
        <rect x={10} y={60} width={40} height={7} rx={2} fill="#1b3a2f" stroke="#00ff99" strokeWidth={1.5} />
        <path d="M22 44a9 9 0 0 1 4-9" fill="none" stroke="rgba(255,255,255,.55)" strokeWidth={2} strokeLinecap="round" />
      </>
    ),
  },
  gamepad: {
    label: 'Game controller', w: 140, h: 90,
    art: (
      <>
        <path d="M34 14h72c14 0 22 10 26 30l6 26c2 10-4 16-13 16-7 0-11-4-15-10l-6-10H50l-6 10c-4 6-8 10-15 10-9 0-15-6-13-16l6-26c4-20 12-30 26-30z" fill="#141c34" stroke="#8b5cf6" strokeWidth={2.5} />
        <path d="M40 32v22M29 43h22" stroke="#61dafb" strokeWidth={6} strokeLinecap="round" />
        <circle cx={100} cy={32} r={5} fill="#ec4899" />
        <circle cx={112} cy={43} r={5} fill="#00ff99" />
        <circle cx={100} cy={54} r={5} fill="#f59e0b" />
        <circle cx={88} cy={43} r={5} fill="#61dafb" />
        <circle cx={60} cy={62} r={7} fill="#0b1220" stroke="#64748b" strokeWidth={2} />
        <circle cx={84} cy={62} r={7} fill="#0b1220" stroke="#64748b" strokeWidth={2} />
      </>
    ),
  },
  joystick: {
    label: 'Joystick', w: 80, h: 110,
    art: (
      <>
        <ellipse cx={40} cy={96} rx={32} ry={9} fill="#1b2547" stroke="#61dafb" strokeWidth={2} />
        <rect x={36} y={40} width={8} height={56} fill="#94a3b8" />
        <circle cx={40} cy={30} r={19} fill="#ec4899" stroke="#fff" strokeWidth={2} />
        <path d="M31 24a12 12 0 0 1 9-6" fill="none" stroke="rgba(255,255,255,.55)" strokeWidth={2.5} strokeLinecap="round" />
        <circle cx={62} cy={94} r={3.5} fill="#f87171" />
      </>
    ),
  },
  dice: {
    label: 'Dice (click to roll)', w: 70, h: 70,
    art: (
      <>
        <rect x={6} y={6} width={58} height={58} rx={11} fill="#e2e8f0" stroke="#94a3b8" strokeWidth={2} />
        {[[22, 22], [48, 22], [35, 35], [22, 48], [48, 48]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r={5} fill="#0b1220" />)}
      </>
    ),
  },
  cube: {
    label: 'Wireframe cube', w: 90, h: 90,
    art: (
      <>
        <path d="M45 6 82 26v38L45 84 8 64V26Z" fill="rgba(97,218,251,.07)" stroke="#61dafb" strokeWidth={2} strokeLinejoin="round" />
        <path d="M45 45 8 26M45 45l37-19M45 45v39" stroke="#61dafb" strokeWidth={2} opacity={0.75} />
        {[[45, 6], [82, 26], [82, 64], [45, 84], [8, 64], [8, 26], [45, 45]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r={3} fill="#00ff99" />)}
      </>
    ),
  },
  terrain: {
    label: 'Low-poly terrain', w: 140, h: 80,
    art: (
      <>
        <path d="M4 76 40 24 62 48 86 14l50 62Z" fill="#161f3a" stroke="#8b5cf6" strokeWidth={2} strokeLinejoin="round" />
        <path d="M40 24 52 76H4Z" fill="#1c2748" />
        <path d="M86 14l18 62h32Z" fill="#0f1730" />
        <path d="M62 48 74 76H52Z" fill="#232f57" />
        <path d="M40 24 52 76M62 48 52 76M62 48 74 76M86 14 74 76M86 14l18 62" fill="none" stroke="#8b5cf6" strokeWidth={1.4} opacity={0.8} />
        <path d="M78 24l8-10 8 10" fill="none" stroke="#e2e8f0" strokeWidth={2} strokeLinecap="round" />
      </>
    ),
  },
  coin: {
    label: 'Coin (click to collect)', w: 70, h: 70,
    art: (
      <g className="coin-spin">
        <circle cx={35} cy={35} r={29} fill="#f5b301" stroke="#b45309" strokeWidth={3} />
        <circle cx={35} cy={35} r={21} fill="none" stroke="#b45309" strokeWidth={2} opacity={0.7} />
        <path d="M35 21l5 10 11 1-8 8 2 11-10-6-10 6 2-11-8-8 11-1Z" fill="#fde68a" stroke="#b45309" strokeWidth={1.5} strokeLinejoin="round" />
      </g>
    ),
  },
  heart: {
    label: 'Health pickup', w: 80, h: 72,
    art: (
      <>
        <path d="M40 66C10 44 4 26 18 14 28 6 38 12 40 20 42 12 52 6 62 14 76 26 70 44 40 66Z" fill="#ec4899" stroke="#fbcfe8" strokeWidth={2} strokeLinejoin="round" />
        <path d="M22 22a10 10 0 0 1 9-5" fill="none" stroke="rgba(255,255,255,.65)" strokeWidth={3} strokeLinecap="round" />
      </>
    ),
  },
  crosshair: {
    label: 'Crosshair', w: 80, h: 80,
    art: (
      <>
        <circle cx={40} cy={40} r={26} fill="none" stroke="#00ff99" strokeWidth={2.5} />
        <circle cx={40} cy={40} r={36} fill="none" stroke="#00ff99" strokeWidth={1.5} strokeDasharray="4 7" opacity={0.6} />
        <path d="M40 6v22M40 52v22M6 40h22M52 40h22" stroke="#00ff99" strokeWidth={2.5} strokeLinecap="round" />
        <circle cx={40} cy={40} r={3} fill="#00ff99" />
      </>
    ),
  },
  bpmini: {
    label: 'Blueprint nodes', w: 150, h: 80,
    art: (
      <>
        <rect x={4} y={8} width={58} height={54} rx={5} fill="#141824" stroke="#2b3550" strokeWidth={2} />
        <path d="M4 13a5 5 0 0 1 5-5h48a5 5 0 0 1 5 5v9H4Z" fill="#b91c1c" />
        <path d="M62 44l-5-4v8Z" fill="#fff" />
        <rect x={90} y={22} width={56} height={46} rx={5} fill="#141824" stroke="#2b3550" strokeWidth={2} />
        <path d="M90 27a5 5 0 0 1 5-5h46a5 5 0 0 1 5 5v9H90Z" fill="#1d4ed8" />
        <path d="M90 52l5-4v8Z" fill="#fff" />
        <path d="M62 44C78 44 74 52 90 52" fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" />
      </>
    ),
  },
  sword: {
    label: 'Sword', w: 40, h: 110,
    art: (
      <>
        <path d="M20 4l7 10v58H13V14Z" fill="#cbd5e1" stroke="#94a3b8" strokeWidth={2} strokeLinejoin="round" />
        <path d="M20 8v62" stroke="#f1f5f9" strokeWidth={2} opacity={0.7} />
        <rect x={5} y={72} width={30} height={7} rx={3} fill="#f59e0b" />
        <rect x={16} y={79} width={8} height={19} rx={2} fill="#7c3a1c" />
        <circle cx={20} cy={102} r={5.5} fill="#f59e0b" />
      </>
    ),
  },
  inductor: {
    label: 'Inductor', w: 140, h: 50,
    art: (
      <path
        d="M0 32h20c0-24 20-24 20 0 0-24 20-24 20 0 0-24 20-24 20 0 0-24 20-24 20 0h20"
        fill="none" stroke="#f59e0b" strokeWidth={3.2} strokeLinecap="round" strokeLinejoin="round"
      />
    ),
  },
};

type Place = { part: keyof typeof PART; left: number; top: number; size: number; depth: number; rot: number; extra?: boolean };

// left/top are percentages of the page. Depth is the parallax rate (negative moves against the scroll).
const PLACES: Place[] = [
  { part: 'chip', left: 3, top: 4, size: 104, depth: 0.09, rot: -14 },
  { part: 'gamepad', left: 88, top: 7, size: 124, depth: -0.07, rot: 14 },
  { part: 'led', left: 2, top: 13, size: 50, depth: 0.1, rot: 12, extra: true },
  { part: 'dice', left: 91, top: 17, size: 62, depth: 0.06, rot: -18 },
  { part: 'resistor', left: 3, top: 21, size: 122, depth: 0.05, rot: -28 },
  { part: 'cube', left: 90, top: 26, size: 84, depth: -0.09, rot: 10 },
  { part: 'transistor', left: 2, top: 30, size: 68, depth: -0.1, rot: 10, extra: true },
  { part: 'crosshair', left: 91, top: 34, size: 72, depth: 0.08, rot: 0 },
  { part: 'terrain', left: 2, top: 38, size: 128, depth: 0.07, rot: -6 },
  { part: 'cpu', left: 90, top: 43, size: 92, depth: 0.08, rot: 8, extra: true },
  { part: 'coin', left: 3, top: 47, size: 56, depth: -0.06, rot: 0 },
  { part: 'bpmini', left: 86, top: 51, size: 142, depth: 0.05, rot: -6 },
  { part: 'capacitor', left: 2, top: 55, size: 60, depth: 0.12, rot: -8, extra: true },
  { part: 'heart', left: 91, top: 60, size: 62, depth: -0.08, rot: 8 },
  { part: 'joystick', left: 3, top: 63, size: 64, depth: 0.09, rot: -10 },
  { part: 'inductor', left: 87, top: 68, size: 126, depth: -0.06, rot: 18, extra: true },
  { part: 'sword', left: 2, top: 72, size: 34, depth: 0.1, rot: 28 },
  { part: 'chip', left: 90, top: 76, size: 92, depth: -0.08, rot: 20, extra: true },
  { part: 'gamepad', left: 2, top: 81, size: 108, depth: 0.06, rot: -12, extra: true },
  { part: 'led', left: 93, top: 84, size: 48, depth: 0.1, rot: -10 },
  { part: 'cube', left: 3, top: 89, size: 74, depth: -0.07, rot: 16, extra: true },
  { part: 'dice', left: 90, top: 91, size: 56, depth: 0.07, rot: 22 },
  { part: 'resistor', left: 3, top: 96, size: 112, depth: 0.05, rot: 24 },
  { part: 'crosshair', left: 92, top: 97, size: 66, depth: -0.05, rot: 0, extra: true },
];

const FloatingParts = () => {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return undefined;
    const items = Array.from(el.querySelectorAll<HTMLElement>('.fp'));
    const cleanups: (() => void)[] = [];

    // Slow drifting and turning. Each part has its own pace so they never move in step.
    if (!reducedMotion()) {
      items.forEach((item, i) => {
        const inner = item.querySelector<HTMLElement>('.fp-in');
        if (!inner) return;
        const rot = Number(item.dataset.rot);
        const a = animate(inner, {
          y: [-utils.random(10, 20), utils.random(10, 20)],
          x: [-utils.random(4, 12), utils.random(4, 12)],
          rotate: [rot - 7, rot + 7],
          duration: utils.random(4200, 8200),
          delay: i * 140,
          alternate: true,
          loop: true,
          ease: 'inOutSine',
        });
        cleanups.push(() => a.pause());
      });
    } else {
      items.forEach((item) => { const inner = item.querySelector<HTMLElement>('.fp-in'); if (inner) inner.style.transform = `rotate(${item.dataset.rot}deg)`; });
    }

    // Idle motion that belongs to the object itself: the cube turns, the coin flips.
    if (!reducedMotion()) {
      const cube = el.querySelectorAll<HTMLElement>('.fp[data-part="cube"] svg');
      cube.forEach((c) => { const a = animate(c, { rotateY: [0, 360], duration: 9000, loop: true, ease: 'linear' }); cleanups.push(() => a.pause()); });
      const coins = el.querySelectorAll<SVGElement>('.coin-spin');
      coins.forEach((c) => { const a = animate(c, { scaleX: [1, 0.08, 1], duration: 1800, loop: true, ease: 'inOutSine' }); cleanups.push(() => a.pause()); });
    }

    // Scroll parallax (each part moves at its own rate) and pointer repel.
    const mids = items.map((item) => item.querySelector<HTMLElement>('.fp-mid'));
    const pushers = reducedMotion() ? [] : mids.map((m) => (m ? createAnimatable(m, { x: 500, y: 500, ease: 'out(3)' }) : null));
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const sy = window.scrollY;
        items.forEach((item) => { item.style.setProperty('--py', `${sy * Number(item.dataset.depth)}px`); });
      });
    };
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const onMove = (e: PointerEvent) => {
      items.forEach((item, i) => {
        const p = pushers[i];
        if (!p) return;
        const r = item.getBoundingClientRect();
        const dx = r.left + r.width / 2 - e.clientX;
        const dy = r.top + r.height / 2 - e.clientY;
        const d = Math.hypot(dx, dy);
        const reach = 190;
        if (d < reach) {
          const f = ((reach - d) / reach) * 70;
          p.x((dx / (d || 1)) * f).y((dy / (d || 1)) * f);
        } else {
          p.x(0).y(0);
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    if (fine) window.addEventListener('pointermove', onMove, { passive: true });
    onScroll();

    return () => {
      cleanups.forEach((c) => c());
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onMove);
      if (raf) cancelAnimationFrame(raf);
      pushers.forEach((p) => p?.revert());
    };
  }, []);

  const spin = (e: React.MouseEvent<HTMLElement>) => {
    const mid = e.currentTarget.querySelector<HTMLElement>('.fp-mid');
    const r = e.currentTarget.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const kind = e.currentTarget.dataset.part;
    if (mid && !reducedMotion()) animate(mid, { rotate: [0, 360], scale: [1, 1.25, 1], duration: 900, ease: 'outBack' });
    // Game objects behave like their in-game counterparts.
    if (kind === 'dice') {
      popText(cx, cy - 20, String(1 + Math.floor(Math.random() * 6)), '#e2e8f0');
      burst(cx, cy, 10, ['#e2e8f0', '#94a3b8']);
    } else if (kind === 'coin') {
      popText(cx, cy - 20, '+1', '#fde68a');
      burst(cx, cy, 18, ['#f5b301', '#fde68a', '#b45309']);
    } else if (kind === 'heart') {
      popText(cx, cy - 20, '+HP', '#f9a8d4');
      burst(cx, cy, 16, ['#ec4899', '#f9a8d4', '#fff']);
    } else if (kind === 'crosshair') {
      popText(cx, cy - 20, 'HIT', '#00ff99');
      burst(cx, cy, 14, ['#00ff99', '#fff']);
    } else if (kind === 'sword') {
      popText(cx, cy - 20, 'SLASH', '#cbd5e1');
      burst(cx, cy, 14, ['#cbd5e1', '#f1f5f9', '#f59e0b']);
    } else if (kind === 'gamepad' || kind === 'joystick') {
      popText(cx, cy - 20, 'PRESS START', '#a78bfa');
      burst(cx, cy, 16, ['#ec4899', '#00ff99', '#f59e0b', '#61dafb']);
    } else {
      burst(cx, cy, 16);
    }
  };

  return (
    <div ref={root} className="fparts" aria-hidden="true">
      {PLACES.map((p, i) => {
        const def = PART[p.part];
        return (
          <div
            key={i}
            className={`fp${p.extra ? ' fp-extra' : ''}`}
            data-part={p.part}
            data-depth={p.depth}
            data-rot={p.rot}
            style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size }}
            onClick={spin}
            title={def.label}
          >
            <div className="fp-mid">
              <div className="fp-in">
                <svg viewBox={`0 0 ${def.w} ${def.h}`} width="100%" role="presentation" focusable="false">
                  {def.art}
                </svg>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FloatingParts;
