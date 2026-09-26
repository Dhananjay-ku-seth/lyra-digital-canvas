import { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';
import { reducedMotion } from '@/components/Motion';

/*
 * Level of detail (LOD): the further an object is from the camera, the simpler the mesh that gets drawn.
 * The triangle counts are computed from the wireframe shown (a UV sphere), so the numbers are exact
 * for this model rather than invented.
 */

const LODS = [
  { name: 'LOD 0', seg: 24, rings: 12 },
  { name: 'LOD 1', seg: 12, rings: 6 },
  { name: 'LOD 2', seg: 6, rings: 3 },
  { name: 'LOD 3', seg: 4, rings: 2 },
];
const tris = (l: (typeof LODS)[number]) => 2 * l.seg * (l.rings - 1);
const PROPS = 500;

const Wire = ({ seg, rings, size = 150 }: { seg: number; rings: number; size?: number }) => {
  const R = size * 0.42;
  const c = size / 2;
  const lines: JSX.Element[] = [];
  for (let k = 1; k < rings; k += 1) {
    const phi = (k / rings) * Math.PI;
    const rx = R * Math.sin(phi);
    lines.push(<ellipse key={`p${k}`} cx={c} cy={c - R * Math.cos(phi)} rx={rx} ry={rx * 0.26} />);
  }
  for (let i = 0; i < seg / 2; i += 1) {
    const th = (i / (seg / 2)) * Math.PI;
    lines.push(<ellipse key={`m${i}`} cx={c} cy={c} rx={Math.max(0.5, Math.abs(R * Math.cos(th)))} ry={R} />);
  }
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width="100%" role="presentation">
      <circle cx={c} cy={c} r={R} className="lod-outline" />
      <g className="lod-lines">{lines}</g>
    </svg>
  );
};

const LodDemo = () => {
  const [dist, setDist] = useState(10);
  const mesh = useRef<HTMLDivElement>(null);
  const lod = dist < 25 ? 0 : dist < 50 ? 1 : dist < 75 ? 2 : 3;
  const prev = useRef(lod);
  const cur = LODS[lod];
  const scale = 1 - (dist / 100) * 0.55;

  useEffect(() => {
    if (prev.current === lod || !mesh.current || reducedMotion()) { prev.current = lod; return; }
    prev.current = lod;
    animate(mesh.current, { opacity: [0.2, 1], rotate: [-10, 0], duration: 500, ease: 'outBack' });
  }, [lod]);

  const now = tris(cur) * PROPS;
  const worst = tris(LODS[0]) * PROPS;

  return (
    <div className="card lod" data-reveal>
      <div className="fb-head">
        <div>
          <p className="fb-title">Level of detail (LOD)</p>
          <p className="fb-sub">Move the camera away and watch the mesh simplify.</p>
        </div>
        <div className="lod-badge">{cur.name}</div>
      </div>

      <div className="lod-grid">
        <div className="lod-stage">
          <div ref={mesh} className="lod-mesh" style={{ transform: `scale(${scale})` }}>
            <Wire seg={cur.seg} rings={cur.rings} />
          </div>
        </div>

        <div className="lod-info">
          <div className="lod-stat"><span>{tris(cur).toLocaleString()}</span> triangles per object</div>
          <div className="lod-stat"><span>{now.toLocaleString()}</span> triangles for {PROPS} of them</div>
          <p className={`lod-save ${lod > 0 ? 'good' : ''}`}>
            {lod > 0 ? `${Math.round((1 - now / worst) * 100)}% fewer than drawing them all at LOD 0 (${worst.toLocaleString()}).` : `At LOD 0 the same ${PROPS} objects cost ${worst.toLocaleString()} triangles.`}
          </p>
          <label className="lod-range">
            <span>Camera distance <b>{dist}</b></span>
            <input type="range" min={0} max={100} value={dist} style={{ ['--fill' as string]: `${dist}%` }} onChange={(e) => setDist(+e.target.value)} />
          </label>
          <div className="lod-steps">
            {LODS.map((l, i) => (
              <button key={l.name} type="button" className={`lod-step${i === lod ? ' on' : ''}`} onClick={() => setDist([10, 35, 60, 90][i])}>
                <span>{l.name}</span><b>{tris(l)}</b>
              </button>
            ))}
          </div>
        </div>
      </div>
      <p className="fb-note">Triangle counts are exact for the sphere shown. Real projects choose LOD models and switch distances per asset.</p>
    </div>
  );
};

export default LodDemo;
