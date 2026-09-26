import { useEffect, useRef, type ReactNode } from 'react';
import { animate, createAnimatable, utils } from 'animejs';
import { burst, reducedMotion } from '@/components/Motion';

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
  { part: 'chip', left: 3, top: 5, size: 104, depth: 0.09, rot: -14 },
  { part: 'led', left: 91, top: 9, size: 54, depth: -0.07, rot: 12 },
  { part: 'resistor', left: 88, top: 19, size: 128, depth: 0.05, rot: -28 },
  { part: 'transistor', left: 2, top: 27, size: 70, depth: -0.1, rot: 10 },
  { part: 'cpu', left: 90, top: 34, size: 96, depth: 0.08, rot: 8, extra: true },
  { part: 'capacitor', left: 4, top: 43, size: 62, depth: 0.12, rot: -8 },
  { part: 'inductor', left: 86, top: 50, size: 132, depth: -0.06, rot: 18, extra: true },
  { part: 'chip', left: 1, top: 58, size: 92, depth: -0.08, rot: 20 },
  { part: 'led', left: 93, top: 63, size: 50, depth: 0.1, rot: -10 },
  { part: 'resistor', left: 3, top: 71, size: 118, depth: 0.06, rot: 24, extra: true },
  { part: 'transistor', left: 91, top: 77, size: 66, depth: -0.09, rot: -12 },
  { part: 'cpu', left: 2, top: 84, size: 88, depth: 0.07, rot: -16, extra: true },
  { part: 'capacitor', left: 90, top: 89, size: 58, depth: -0.05, rot: 14 },
  { part: 'chip', left: 88, top: 96, size: 96, depth: 0.1, rot: -6, extra: true },
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
    if (mid && !reducedMotion()) animate(mid, { rotate: [0, 360], scale: [1, 1.25, 1], duration: 900, ease: 'outBack' });
    burst(r.left + r.width / 2, r.top + r.height / 2, 16);
  };

  return (
    <div ref={root} className="fparts" aria-hidden="true">
      {PLACES.map((p, i) => {
        const def = PART[p.part];
        return (
          <div
            key={i}
            className={`fp${p.extra ? ' fp-extra' : ''}`}
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
