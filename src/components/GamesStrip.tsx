import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { animate } from 'animejs';
import { ArrowRight, MoveHorizontal } from 'lucide-react';
import ProjectArt from '@/components/ProjectArt';
import { reducedMotion } from '@/components/Motion';
import { projectsData } from '@/data/projects';

/*
 * A strip of the games, scrolled by dragging (with momentum) or with the scroll wheel / trackpad.
 * Clicking a card opens its details in the Projects section.
 */

const games = projectsData.filter((p) => p.category === 'game');

const GamesStrip = () => {
  const navigate = useNavigate();
  const rail = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const drag = useRef({ down: false, x: 0, left: 0, moved: 0, lastX: 0, lastT: 0, v: 0 });

  useEffect(() => {
    const el = rail.current;
    if (!el) return undefined;
    const update = () => setProgress(el.scrollWidth > el.clientWidth ? el.scrollLeft / (el.scrollWidth - el.clientWidth) : 1);
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { el.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, []);

  const down = (e: React.PointerEvent) => {
    if (e.pointerType === 'touch') return; // touch already scrolls natively
    const el = rail.current!;
    drag.current = { down: true, x: e.clientX, left: el.scrollLeft, moved: 0, lastX: e.clientX, lastT: performance.now(), v: 0 };
    el.classList.add('dragging');
  };
  const move = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d.down) return;
    const el = rail.current!;
    const dx = e.clientX - d.x;
    d.moved = Math.max(d.moved, Math.abs(dx));
    el.scrollLeft = d.left - dx;
    const now = performance.now();
    d.v = (e.clientX - d.lastX) / Math.max(1, now - d.lastT);
    d.lastX = e.clientX;
    d.lastT = now;
  };
  const up = () => {
    const d = drag.current;
    if (!d.down) return;
    d.down = false;
    const el = rail.current!;
    el.classList.remove('dragging');
    // Throw: keep gliding in the direction of the release, easing to a stop.
    if (!reducedMotion() && Math.abs(d.v) > 0.2) {
      animate(el, { scrollLeft: el.scrollLeft - Math.max(-700, Math.min(700, d.v * 320)), duration: 900, ease: 'outExpo' });
    }
  };

  const open = (id: string) => {
    if (drag.current.moved > 6) return; // it was a drag, not a click
    navigate({ search: `?p=${id}`, hash: '#projects' }, { state: { scroll: true } });
  };

  return (
    <div className="games" data-reveal>
      <div className="games-head">
        <p className="eyebrow">My games</p>
        <span className="games-hint"><MoveHorizontal size={14} /> Drag to explore</span>
      </div>
      <div
        ref={rail}
        className="games-rail"
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerLeave={up}
        role="list"
      >
        {games.map((g) => (
          <button key={g.id} type="button" className="game-card" role="listitem" onClick={() => open(g.id)} draggable={false}>
            <ProjectArt id={g.id} category={g.category} />
            <div className="game-body">
              <h4>{g.title.replace(/:.*/, '')}</h4>
              <p>{g.title.includes(':') ? g.title.split(': ')[1] : ''}</p>
              <span className="game-more">Details <ArrowRight size={14} /></span>
            </div>
          </button>
        ))}
      </div>
      <div className="games-track" aria-hidden="true"><i style={{ width: `${Math.max(12, progress * 100)}%` }} /></div>
    </div>
  );
};

export default GamesStrip;
