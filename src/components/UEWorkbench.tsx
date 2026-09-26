import { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';
import { Gauge, Map as MapIcon, Workflow } from 'lucide-react';
import BlueprintDemo from '@/components/BlueprintDemo';
import FrameBudget from '@/components/FrameBudget';
import LevelDesignDemo from '@/components/LevelDesignDemo';
import LodDemo from '@/components/LodDemo';
import { reducedMotion } from '@/components/Motion';

/* An editor-styled workbench with three tabs: Blueprints, Level design and Optimization. */

const TABS = [
  { id: 'bp', label: 'Blueprints', file: 'BP_KeyDoor', icon: Workflow, blurb: 'Gameplay logic built visually: events, branches and timelines wired together.' },
  { id: 'ld', label: 'Level design', file: 'L_Greybox', icon: MapIcon, blurb: 'Blockout, cover, sightlines, flow and pacing: the structure under a map.' },
  { id: 'opt', label: 'Optimization', file: 'Frame budget', icon: Gauge, blurb: 'Where the frame time goes, and the techniques that win it back.' },
] as const;
export type WorkbenchTab = (typeof TABS)[number]['id'];

const UEWorkbench = () => {
  const [tab, setTab] = useState<WorkbenchTab>('bp');
  const panel = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  // Other parts of the page (the pillar cards) can ask for a tab.
  useEffect(() => {
    const open = (e: Event) => {
      const id = (e as CustomEvent<WorkbenchTab>).detail;
      if (TABS.some((t) => t.id === id)) {
        setTab(id);
        root.current?.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' });
      }
    };
    window.addEventListener('ue-tab', open);
    return () => window.removeEventListener('ue-tab', open);
  }, []);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (panel.current && !reducedMotion()) animate(panel.current, { opacity: [0, 1], translateY: [18, 0], duration: 600, ease: 'outExpo' });
  }, [tab]);

  const onKey = (e: React.KeyboardEvent) => {
    const i = TABS.findIndex((t) => t.id === tab);
    if (e.key === 'ArrowRight') setTab(TABS[(i + 1) % TABS.length].id);
    if (e.key === 'ArrowLeft') setTab(TABS[(i + TABS.length - 1) % TABS.length].id);
  };

  const active = TABS.find((t) => t.id === tab)!;

  return (
    <div ref={root} className="uew" data-reveal>
      <div className="uew-chrome">
        <span className="uew-dots"><i /><i /><i /></span>
        <span className="uew-title">Workbench · {active.file}</span>
      </div>
      <div className="uew-tabs" role="tablist" aria-label="Unreal Engine workbench" onKeyDown={onKey}>
        {TABS.map((t) => (
          <button key={t.id} type="button" role="tab" id={`uew-tab-${t.id}`} aria-selected={tab === t.id} aria-controls="uew-panel" tabIndex={tab === t.id ? 0 : -1} className={`uew-tab${tab === t.id ? ' on' : ''}`} onClick={() => setTab(t.id)}>
            <t.icon size={15} /> {t.label}
          </button>
        ))}
      </div>
      <p className="uew-blurb">{active.blurb}</p>
      <div ref={panel} id="uew-panel" role="tabpanel" aria-labelledby={`uew-tab-${tab}`} className="uew-panel">
        {tab === 'bp' && <BlueprintDemo />}
        {tab === 'ld' && <LevelDesignDemo />}
        {tab === 'opt' && (
          <div className="uew-stack">
            <LodDemo />
            <FrameBudget />
          </div>
        )}
      </div>
    </div>
  );
};

export default UEWorkbench;
