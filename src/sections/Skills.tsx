import { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import { AnimHeading, reducedMotion } from '@/components/Motion';
import { otherSkills, skillGroups, type SkillGroup } from '@/data/site';

/** One skill group. Its bars fill and its numbers count up when the card scrolls into view. */
const SkillCard = ({ g }: { g: SkillGroup }) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const bars = Array.from(el.querySelectorAll<HTMLElement>('.meter i'));
    const nums = Array.from(el.querySelectorAll<HTMLElement>('.lvl'));
    const finish = () => bars.forEach((b, i) => { b.style.width = `${g.items[i].level}%`; nums[i].textContent = `${g.items[i].level}%`; });
    if (reducedMotion()) { finish(); return undefined; }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        bars.forEach((b, i) => {
          const level = g.items[i].level;
          const delay = 250 + i * 150;
          animate(b, { width: ['0%', `${level}%`], duration: 1500, delay, ease: 'outExpo' });
          const o = { v: 0 };
          animate(o, { v: level, duration: 1500, delay, ease: 'outExpo', onUpdate: () => { nums[i].textContent = `${Math.round(o.v)}%`; } });
        });
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [g]);

  return (
    <article ref={ref} className={`card skill-card spot${g.tone === 'green' ? ' skill-primary' : ''}`} data-tone={g.tone} data-tilt>
      {g.tone === 'green' && <span className="skill-badge">Specialty</span>}
      <h3>{g.title}</h3>
      <div className="mt-5">
        {g.items.map((s) => (
          <div key={s.name} className="skill-row">
            <header>
              <span>{s.name}</span>
              <span className="lvl">0%</span>
            </header>
            <div className="meter" role="img" aria-label={`${s.name}: ${s.level} percent`}>
              <i />
            </div>
          </div>
        ))}
      </div>
    </article>
  );
};

const Skills = () => (
  <section id="skills" className="section">
    <div className="wrap">
      <div data-reveal>
        <p className="eyebrow">Skills</p>
        <AnimHeading>What I work with.</AnimHeading>
        <p className="lead">Self-rated proficiency, from my specialty in Unreal Engine to the tools I am still growing into.</p>
      </div>

      <div className="skill-grid" data-stagger>
        {skillGroups.map((g) => (
          <SkillCard key={g.title} g={g} />
        ))}
      </div>

      <div data-reveal className="mt-10">
        <p className="eyebrow">Also</p>
        <div className="chips">
          {otherSkills.map((s) => (
            <span key={s} className="chip">{s}</span>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Skills;
