import { Gauge, Map as MapIcon, Route, Workflow } from 'lucide-react';
import UEWorkbench from '@/components/UEWorkbench';
import { AnimHeading } from '@/components/Motion';
import { Marquee } from '@/components/Interactive';
import { unrealPillars, unrealTopics } from '@/data/site';

const icons = { map: MapIcon, level: Route, bp: Workflow, opt: Gauge };

const UnrealSection = () => (
  <section id="unreal" className="section">
    <div className="wrap">
      <div data-reveal>
        <p className="eyebrow">Specialty</p>
        <AnimHeading>Unreal Engine is my craft.</AnimHeading>
        <p className="lead">
          Map design, level design and game optimisation in Unreal Engine are what I am most skilled at. I also work in Unity and ROBLOX, but this is where I go deep. Open a card to try it in the workbench below.
        </p>
      </div>

      <div className="pillars" data-stagger>
        {unrealPillars.map((p) => {
          const Icon = icons[p.icon];
          return (
            <button
              key={p.title}
              type="button"
              className="card pillar spot"
              data-tilt
              onClick={() => window.dispatchEvent(new CustomEvent('ue-tab', { detail: p.tab }))}
            >
              <span className="pillar-ico"><Icon size={22} /></span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
              <span className="pillar-go">Try it below ↓</span>
            </button>
          );
        })}
      </div>

      <div className="mt-10" data-reveal>
        <Marquee items={unrealTopics} />
      </div>

      <div className="mt-10">
        <UEWorkbench />
      </div>
    </div>
  </section>
);

export default UnrealSection;
