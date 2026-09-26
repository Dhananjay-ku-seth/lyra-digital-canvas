import { Gauge, Map as MapIcon, Route } from 'lucide-react';
import FrameBudget from '@/components/FrameBudget';
import { AnimHeading } from '@/components/Motion';
import { Marquee } from '@/components/Interactive';
import { unrealPillars, unrealTopics } from '@/data/site';

const icons = [MapIcon, Route, Gauge];

const UnrealSection = () => (
  <section id="unreal" className="section">
    <div className="wrap">
      <div data-reveal>
        <p className="eyebrow">Specialty</p>
        <AnimHeading>Unreal Engine is my craft.</AnimHeading>
        <p className="lead">
          Map design, level design and game optimisation in Unreal Engine are what I am most skilled at. I also work in Unity and ROBLOX, but this is where I go deep.
        </p>
      </div>

      <div className="pillars" data-stagger>
        {unrealPillars.map((p, i) => {
          const Icon = icons[i];
          return (
            <article key={p.title} className="card pillar spot" data-tilt>
              <span className="pillar-ico"><Icon size={22} /></span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </article>
          );
        })}
      </div>

      <div className="mt-10" data-reveal>
        <Marquee items={unrealTopics} />
      </div>

      <div className="mt-10">
        <FrameBudget />
      </div>
    </div>
  </section>
);

export default UnrealSection;
