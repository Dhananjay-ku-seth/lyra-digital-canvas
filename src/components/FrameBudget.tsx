import { useEffect, useMemo, useRef, useState } from 'react';
import { animate } from 'animejs';
import { reducedMotion } from '@/components/Motion';

/*
 * An interactive picture of game optimisation. Switch techniques on and off and watch where the
 * frame time goes. The numbers come from a simple illustrative model, NOT a benchmark of any real level.
 */

type Cat = 'geometry' | 'lighting' | 'shadows' | 'post' | 'foliage' | 'textures';

const CATS: { id: Cat; label: string; base: number; color: string }[] = [
  { id: 'geometry', label: 'Geometry and draw calls', base: 5.4, color: '#8b5cf6' },
  { id: 'lighting', label: 'Lighting', base: 4.6, color: '#f59e0b' },
  { id: 'shadows', label: 'Shadows', base: 3.8, color: '#64748b' },
  { id: 'post', label: 'Post-processing', base: 2.4, color: '#ec4899' },
  { id: 'foliage', label: 'Foliage and instances', base: 3.0, color: '#22c55e' },
  { id: 'textures', label: 'Textures and streaming', base: 2.0, color: '#61dafb' },
];

type Tech = { id: string; label: string; hint: string; scale: Partial<Record<Cat, number>> };

const TECHS: Tech[] = [
  { id: 'instancing', label: 'Instanced static meshes', hint: 'Many copies of one mesh drawn together.', scale: { geometry: 0.74, foliage: 0.78 } },
  { id: 'lods', label: 'Level of detail (LODs)', hint: 'Distant objects use simpler meshes.', scale: { geometry: 0.76, shadows: 0.86 } },
  { id: 'occlusion', label: 'Occlusion culling', hint: 'Skip what the camera cannot see.', scale: { geometry: 0.7, shadows: 0.9, foliage: 0.85 } },
  { id: 'hlod', label: 'Merged distant meshes (HLOD)', hint: 'Far clusters become one draw.', scale: { geometry: 0.86 } },
  { id: 'baked', label: 'Baked lighting', hint: 'Pre-computed light instead of live.', scale: { lighting: 0.45, shadows: 0.6 } },
  { id: 'streaming', label: 'Texture streaming', hint: 'Load only the detail you can see.', scale: { textures: 0.58 } },
];

const BUDGETS = [
  { fps: 60, ms: 1000 / 60 },
  { fps: 30, ms: 1000 / 30 },
];

const FrameBudget = () => {
  const [on, setOn] = useState<Record<string, boolean>>({});
  const [dist, setDist] = useState(100);
  const [res, setRes] = useState(100);
  const [budget, setBudget] = useState(0);
  const segRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const first = useRef(true);

  const costs = useMemo(() => {
    const out = {} as Record<Cat, number>;
    for (const c of CATS) {
      let v = c.base;
      for (const t of TECHS) if (on[t.id] && t.scale[c.id]) v *= t.scale[c.id]!;
      // Draw distance drives what has to be rendered; render resolution drives per-pixel work.
      if (c.id === 'geometry' || c.id === 'foliage' || c.id === 'shadows') v *= (dist / 100) ** 1.2;
      if (c.id === 'lighting' || c.id === 'post' || c.id === 'shadows') v *= (res / 100) ** 2;
      out[c.id] = v;
    }
    return out;
  }, [on, dist, res]);

  const total = CATS.reduce((s, c) => s + costs[c.id], 0);
  const fps = 1000 / total;
  const target = BUDGETS[budget];
  const over = total > target.ms;
  const scaleMax = Math.max(total, target.ms * 1.25, 30);

  useEffect(() => {
    const els = CATS.map((c) => segRefs.current[c.id]).filter(Boolean) as HTMLElement[];
    const widths = CATS.map((c) => `${(costs[c.id] / scaleMax) * 100}%`);
    if (first.current || reducedMotion()) {
      els.forEach((el, i) => { el.style.width = widths[i]; });
      first.current = false;
      return;
    }
    els.forEach((el, i) => animate(el, { width: widths[i], duration: 600, ease: 'outExpo' }));
  }, [costs, scaleMax]);

  const activeCount = Object.values(on).filter(Boolean).length;
  const saved = CATS.reduce((s, c) => s + c.base, 0) - total;

  return (
    <div className="card fb" data-reveal>
      <div className="fb-head">
        <div>
          <p className="fb-title">Frame budget playground</p>
          <p className="fb-sub">Switch optimisation techniques on and watch where the frame time goes.</p>
        </div>
        <div className="seg" role="group" aria-label="Target frame rate">
          {BUDGETS.map((b, i) => (
            <button key={b.fps} type="button" aria-pressed={budget === i} onClick={() => setBudget(i)}>{b.fps} FPS</button>
          ))}
        </div>
      </div>

      <div className="fb-readout" aria-live="polite">
        <div>
          <span className={`fb-fps${over ? ' bad' : ' good'}`}>{fps.toFixed(0)}</span>
          <span className="fb-unit"> FPS</span>
        </div>
        <div>
          <span className="fb-ms">{total.toFixed(1)} ms</span>
          <span className="fb-unit"> per frame, budget {target.ms.toFixed(1)} ms</span>
        </div>
        <p className={`fb-status${over ? ' bad' : ' good'}`}>
          {over ? `Over budget by ${(total - target.ms).toFixed(1)} ms` : `Within budget, ${(target.ms - total).toFixed(1)} ms to spare`}
        </p>
      </div>

      <div className="fb-bar" role="img" aria-label={`Frame time ${total.toFixed(1)} milliseconds`}>
        {CATS.map((c) => (
          <div key={c.id} ref={(el) => { segRefs.current[c.id] = el; }} className="fb-seg" style={{ background: c.color }} title={`${c.label}: ${costs[c.id].toFixed(1)} ms`} />
        ))}
        <span className="fb-line" style={{ left: `${(target.ms / scaleMax) * 100}%` }} aria-hidden="true"><i>{target.fps} FPS</i></span>
      </div>

      <ul className="fb-legend">
        {CATS.map((c) => (
          <li key={c.id}><i style={{ background: c.color }} />{c.label}<b>{costs[c.id].toFixed(1)} ms</b></li>
        ))}
      </ul>

      <div className="fb-controls">
        <div className="fb-techs">
          {TECHS.map((t) => (
            <button key={t.id} type="button" className={`fb-tech${on[t.id] ? ' on' : ''}`} aria-pressed={!!on[t.id]} title={t.hint} onClick={() => setOn((s) => ({ ...s, [t.id]: !s[t.id] }))}>
              <span className="fb-dot" />{t.label}
            </button>
          ))}
        </div>
        <div className="fb-sliders">
          <label>
            <span>Draw distance <b>{dist}%</b></span>
            <input type="range" min={50} max={150} value={dist} style={{ ['--fill' as string]: `${((dist - 50) / 100) * 100}%` }} onChange={(e) => setDist(+e.target.value)} />
          </label>
          <label>
            <span>Render resolution <b>{res}%</b></span>
            <input type="range" min={60} max={100} value={res} style={{ ['--fill' as string]: `${((res - 60) / 40) * 100}%` }} onChange={(e) => setRes(+e.target.value)} />
          </label>
        </div>
      </div>

      <div className="fb-foot">
        <span>{activeCount} of {TECHS.length} techniques on{saved > 0.05 ? `, saving ${saved.toFixed(1)} ms` : ''}</span>
        <button type="button" className="tag" onClick={() => { setOn({}); setDist(100); setRes(100); }}>Reset</button>
      </div>
      <p className="fb-note">An illustrative model to show how each technique shifts the budget. It is not a benchmark of any real level.</p>
    </div>
  );
};

export default FrameBudget;
