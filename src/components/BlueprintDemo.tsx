import { useRef, useState } from 'react';
import { animate, createMotionPath } from 'animejs';
import { Play, RotateCcw } from 'lucide-react';
import { reducedMotion } from '@/components/Motion';

/*
 * A small working imitation of an Unreal Engine Blueprint graph: "the door that needs a key".
 * Nodes can be dragged by their header, the wires follow, and Play runs the graph:
 * execution pulses travel along the white wires, the Branch reads the "Has Key" variable,
 * and the mini viewport shows the result.
 */

type Tone = 'event' | 'func' | 'flow' | 'var';
type Pin = { id: string; label: string; kind: 'exec' | 'bool' };
type NodeDef = { id: string; title: string; tone: Tone; x: number; y: number; w: number; ins: Pin[]; outs: Pin[] };
type Wire = { id: string; from: [string, string]; to: [string, string]; kind: 'exec' | 'bool' };

const HEAD = 30;
const ROW = 26;

const NODES: NodeDef[] = [
  { id: 'ev', title: 'Event ActorBeginOverlap', tone: 'event', x: 14, y: 40, w: 200, ins: [], outs: [{ id: 'then', label: '', kind: 'exec' }] },
  { id: 'key', title: 'Get Has Key', tone: 'var', x: 14, y: 200, w: 170, ins: [], outs: [{ id: 'val', label: 'Has Key', kind: 'bool' }] },
  { id: 'br', title: 'Branch', tone: 'flow', x: 262, y: 80, w: 170, ins: [{ id: 'in', label: '', kind: 'exec' }, { id: 'cond', label: 'Condition', kind: 'bool' }], outs: [{ id: 't', label: 'True', kind: 'exec' }, { id: 'f', label: 'False', kind: 'exec' }] },
  { id: 'tl', title: 'Play Timeline: Door Open', tone: 'func', x: 486, y: 30, w: 200, ins: [{ id: 'in', label: 'Play', kind: 'exec' }], outs: [{ id: 'out', label: 'Finished', kind: 'exec' }] },
  { id: 'rot', title: 'Set Actor Location (Door)', tone: 'func', x: 716, y: 30, w: 200, ins: [{ id: 'in', label: '', kind: 'exec' }], outs: [{ id: 'out', label: '', kind: 'exec' }] },
  { id: 'pr', title: 'Print String', tone: 'func', x: 486, y: 200, w: 200, ins: [{ id: 'in', label: '', kind: 'exec' }], outs: [{ id: 'out', label: '', kind: 'exec' }] },
  { id: 'snd', title: 'Play Sound 2D: Denied', tone: 'func', x: 716, y: 200, w: 200, ins: [{ id: 'in', label: '', kind: 'exec' }], outs: [] },
];

const WIRES: Wire[] = [
  { id: 'w1', from: ['ev', 'then'], to: ['br', 'in'], kind: 'exec' },
  { id: 'w2', from: ['key', 'val'], to: ['br', 'cond'], kind: 'bool' },
  { id: 'w3', from: ['br', 't'], to: ['tl', 'in'], kind: 'exec' },
  { id: 'w4', from: ['tl', 'out'], to: ['rot', 'in'], kind: 'exec' },
  { id: 'w5', from: ['br', 'f'], to: ['pr', 'in'], kind: 'exec' },
  { id: 'w6', from: ['pr', 'out'], to: ['snd', 'in'], kind: 'exec' },
];

const nodeH = (n: NodeDef) => HEAD + Math.max(n.ins.length, n.outs.length, n.id === 'key' ? 2 : 1) * ROW + 10;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const BlueprintDemo = () => {
  const [pos, setPos] = useState<Record<string, { x: number; y: number }>>(() => Object.fromEntries(NODES.map((n) => [n.id, { x: n.x, y: n.y }])));
  const [hasKey, setHasKey] = useState(true);
  const [active, setActive] = useState<string[]>([]);
  const [lit, setLit] = useState<string[]>([]);
  const [log, setLog] = useState<string[]>(['Press Play to run the graph.']);
  const [running, setRunning] = useState(false);
  const [door, setDoor] = useState<'closed' | 'open' | 'locked'>('closed');
  const board = useRef<HTMLDivElement>(null);
  const pulse = useRef<SVGCircleElement>(null);
  const player = useRef<SVGGElement>(null);
  const doorEl = useRef<SVGGElement>(null);
  const drag = useRef<{ id: string; ox: number; oy: number } | null>(null);

  const nodeOf = (id: string) => NODES.find((n) => n.id === id)!;
  const pinPoint = (nodeId: string, pinId: string, side: 'in' | 'out') => {
    const n = nodeOf(nodeId);
    const list = side === 'in' ? n.ins : n.outs;
    const idx = Math.max(0, list.findIndex((p) => p.id === pinId));
    const p = pos[nodeId];
    return { x: p.x + (side === 'out' ? n.w : 0), y: p.y + HEAD + 15 + idx * ROW };
  };
  const wirePath = (w: Wire) => {
    const a = pinPoint(w.from[0], w.from[1], 'out');
    const b = pinPoint(w.to[0], w.to[1], 'in');
    const d = Math.max(60, Math.abs(b.x - a.x) * 0.5);
    return `M${a.x} ${a.y} C${a.x + d} ${a.y}, ${b.x - d} ${b.y}, ${b.x} ${b.y}`;
  };

  const onDown = (e: React.PointerEvent, id: string) => {
    const rect = board.current!.getBoundingClientRect();
    drag.current = { id, ox: e.clientX - rect.left - pos[id].x, oy: e.clientY - rect.top - pos[id].y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const rect = board.current!.getBoundingClientRect();
    const n = nodeOf(d.id);
    const x = Math.max(0, Math.min(rect.width - n.w, e.clientX - rect.left - d.ox));
    const y = Math.max(0, Math.min(rect.height - nodeH(n), e.clientY - rect.top - d.oy));
    setPos((p) => ({ ...p, [d.id]: { x, y } }));
  };
  const onUp = () => { drag.current = null; };

  const say = (t: string) => setLog((l) => [...l.slice(-6), t]);
  const fast = reducedMotion();

  const sendPulse = (wireId: string) =>
    new Promise<void>((resolve) => {
      const path = board.current?.querySelector<SVGPathElement>(`#bpw-${wireId}`);
      const dot = pulse.current;
      setLit((l) => [...l, wireId]);
      if (!path || !dot || fast) { resolve(); return; }
      const mp = createMotionPath(path);
      dot.style.opacity = '1';
      animate(dot, { translateX: mp.translateX, translateY: mp.translateY, duration: 650, ease: 'inOutQuad', onComplete: () => { dot.style.opacity = '0'; resolve(); } });
    });
  const hit = async (id: string) => {
    setActive((a) => [...a, id]);
    await sleep(fast ? 0 : 320);
  };

  const reset = () => {
    setActive([]); setLit([]); setDoor('closed'); setLog(['Press Play to run the graph.']);
    if (player.current) animate(player.current, { translateX: 0, duration: 400, ease: 'outQuad' });
    if (doorEl.current) animate(doorEl.current, { translateY: 0, translateX: 0, duration: 400, ease: 'outQuad' });
  };

  const run = async () => {
    if (running) return;
    reset();
    setRunning(true);
    await sleep(60);
    // The player walks into the trigger volume.
    if (player.current && !fast) await new Promise<void>((r) => animate(player.current!, { translateX: 96, duration: 900, ease: 'inOutQuad', onComplete: () => r() }));
    say('Player overlaps the trigger volume.');
    await hit('ev');
    await sendPulse('w1');
    await hit('br');
    await sendPulse('w2');
    await hit('key');
    say(`Branch: Has Key = ${hasKey ? 'true' : 'false'}`);
    if (hasKey) {
      await sendPulse('w3');
      await hit('tl');
      say('Timeline "Door Open" is playing…');
      await sendPulse('w4');
      await hit('rot');
      say('Door moved to the open position.');
      setDoor('open');
      if (doorEl.current && !fast) animate(doorEl.current, { translateY: -64, duration: 800, ease: 'outExpo' });
    } else {
      await sendPulse('w5');
      await hit('pr');
      say('Print String: "The door is locked."');
      await sendPulse('w6');
      await hit('snd');
      say('Played the "Denied" sound.');
      setDoor('locked');
      if (doorEl.current && !fast) animate(doorEl.current, { translateX: [0, -5, 5, -4, 4, 0], duration: 420, ease: 'inOutQuad' });
    }
    setRunning(false);
  };

  const litWire = (id: string) => lit.includes(id);

  return (
    <div className="bp">
      <div className="bp-tools">
        <button type="button" className="btn btn-primary btn-sm" onClick={run} disabled={running}><Play size={14} /> Play</button>
        <button type="button" className="btn btn-ghost btn-sm" onClick={reset} disabled={running}><RotateCcw size={14} /> Reset</button>
        <label className="bp-check">
          <input type="checkbox" checked={hasKey} onChange={(e) => { setHasKey(e.target.checked); reset(); }} disabled={running} />
          <span>Player has the key</span>
        </label>
        <span className="bp-hint">Drag a node by its header. Change the variable, then press Play.</span>
      </div>

      <div className="bp-scroll">
        <div ref={board} className="bp-board" onPointerMove={onMove} onPointerUp={onUp} onPointerLeave={onUp}>
          <svg className="bp-wires" width="100%" height="100%" aria-hidden="true">
            {WIRES.map((w) => (
              <path key={w.id} id={`bpw-${w.id}`} d={wirePath(w)} className={`bp-wire ${w.kind}${litWire(w.id) ? ' lit' : ''}`} />
            ))}
            <circle ref={pulse} className="bp-pulse" r={6} cx={0} cy={0} />
          </svg>

          {NODES.map((n) => (
            <div key={n.id} className={`bp-node ${n.tone}${active.includes(n.id) ? ' on' : ''}`} style={{ left: pos[n.id].x, top: pos[n.id].y, width: n.w }}>
              <div className="bp-head" onPointerDown={(e) => onDown(e, n.id)}>{n.title}</div>
              <div className="bp-body" style={{ minHeight: Math.max(n.ins.length, n.outs.length, n.id === 'key' ? 2 : 1) * ROW }}>
                <div className="bp-col">
                  {n.ins.map((p) => (
                    <div key={p.id} className="bp-pin"><i className={`pin ${p.kind}`} />{p.label}</div>
                  ))}
                </div>
                {n.id === 'key' && (
                  <div className="bp-var">
                    <span className={`bp-bool ${hasKey ? 'yes' : 'no'}`}>{hasKey ? 'true' : 'false'}</span>
                  </div>
                )}
                <div className="bp-col out">
                  {n.outs.map((p) => (
                    <div key={p.id} className="bp-pin out">{p.label}<i className={`pin ${p.kind}`} /></div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bp-bottom">
        <div className="bp-view" aria-label="Viewport preview">
          <svg viewBox="0 0 300 120" width="100%" role="img" aria-label={`Door ${door}`}>
            <rect width="300" height="120" fill="#0a1020" />
            <path d="M0 100H300" stroke="#334155" strokeWidth={2} />
            <rect x={120} y={40} width={56} height={60} rx={3} fill="rgba(97,218,251,.06)" stroke="#61dafb" strokeDasharray="4 4" />
            <g ref={doorEl}>
              <rect x={214} y={34} width={14} height={66} rx={2} fill={door === 'locked' ? '#7f1d1d' : '#334155'} stroke={door === 'locked' ? '#f87171' : '#94a3b8'} strokeWidth={2} />
              <circle cx={221} cy={70} r={2.5} fill={door === 'locked' ? '#f87171' : door === 'open' ? '#00ff99' : '#94a3b8'} />
            </g>
            <g ref={player}>
              <rect x={40} y={58} width={16} height={42} rx={8} fill="#8b5cf6" />
              <circle cx={48} cy={52} r={9} fill="#a78bfa" />
              {hasKey && <path d="M60 74h10M66 74v5" stroke="#f59e0b" strokeWidth={2.4} strokeLinecap="round" />}
            </g>
          </svg>
          <p className="bp-cap">Viewport: {door === 'closed' ? 'door closed' : door === 'open' ? 'door open' : 'door locked'}</p>
        </div>
        <div className="bp-log" aria-live="polite">
          {log.map((l, i) => (<div key={i}>{l}</div>))}
        </div>
      </div>
    </div>
  );
};

export default BlueprintDemo;
