import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { animate } from 'animejs';
import { ChevronDown, LayoutGrid, Radar as RadarIcon, Search, X } from 'lucide-react';
import { AnimHeading, CountUp, reducedMotion } from '@/components/Motion';
import SkillRadar from '@/components/SkillRadar';
import { otherSkills, skillGroups, type SkillGroup } from '@/data/site';
import { projectsData } from '@/data/projects';

/** Projects whose tags or title mention this skill's search term. */
const relatedProjects = (q?: string) => {
  if (!q) return [];
  const needle = q.toLowerCase();
  return projectsData.filter((p) => [p.title, ...p.tags].join(' ').toLowerCase().includes(needle)).slice(0, 4);
};

const SkillRow = ({ s, dim }: { s: SkillGroup['items'][number]; dim: boolean }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const related = useMemo(() => relatedProjects(s.q), [s.q]);
  const canOpen = !!s.q && related.length > 0;

  return (
    <div className={`skill-row${s.q ? ' pickable' : ''}${dim ? ' dim' : ''}${open ? ' open' : ''}`}>
      <header>
        <button
          type="button"
          className="skill-pick"
          disabled={!canOpen}
          title={canOpen ? `Show projects that use ${s.name}` : undefined}
          onClick={() => canOpen && setOpen((o) => !o)}
        >
          {s.name}
          {canOpen && <ChevronDown size={13} className="skill-chevron" aria-hidden="true" />}
        </button>
        <span className="lvl">0%</span>
      </header>
      <div className="meter" role="img" aria-label={`${s.name}: ${s.level} percent`}>
        <i />
      </div>
      {open && (
        <div className="skill-related">
          {related.map((p) => (
            <button key={p.id} type="button" onClick={() => navigate({ search: `?p=${p.id}`, hash: '#projects' }, { state: { scroll: true } })}>
              {p.title}
            </button>
          ))}
          <button type="button" className="skill-related-all" onClick={() => navigate({ search: `?q=${encodeURIComponent(s.q!)}`, hash: '#projects' }, { state: { scroll: true } })}>
            All projects using {s.name} →
          </button>
        </div>
      )}
    </div>
  );
};

/** One skill group card. Its bars fill and count up when it scrolls into view. */
const SkillCard = ({ g, query, view }: { g: SkillGroup; query: string; view: 'bars' | 'radar' }) => {
  const ref = useRef<HTMLElement>(null);
  const needle = query.trim().toLowerCase();
  const anyMatch = !needle || g.items.some((i) => i.name.toLowerCase().includes(needle));

  useEffect(() => {
    const el = ref.current;
    if (!el || view !== 'bars') return undefined;
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
  }, [g, view]);

  if (!anyMatch) return null;

  return (
    <article ref={ref} className={`card skill-card spot${g.tone === 'green' ? ' skill-primary' : ''}`} data-tone={g.tone} data-tilt>
      {g.tone === 'green' && <span className="skill-badge">Specialty</span>}
      <h3>{g.title}</h3>
      {view === 'radar' ? (
        <div className="radar-wrap"><SkillRadar g={g} /></div>
      ) : (
        <div className="mt-5">
          {g.items.map((s) => (
            <SkillRow key={s.name} s={s} dim={!!needle && !s.name.toLowerCase().includes(needle)} />
          ))}
        </div>
      )}
    </article>
  );
};

const Skills = () => {
  const [query, setQuery] = useState('');
  const [view, setView] = useState<'bars' | 'radar'>('bars');
  const allSkills = useMemo(() => skillGroups.flatMap((g) => g.items), []);
  const avg = Math.round(allSkills.reduce((s, i) => s + i.level, 0) / allSkills.length);

  return (
    <section id="skills" className="section">
      <div className="wrap">
        <div className="skills-head" data-reveal>
          <div>
            <p className="eyebrow">Skills</p>
            <AnimHeading>What I work with.</AnimHeading>
            <p className="lead">Self-rated proficiency, from my specialty in Unreal Engine to the tools I am still growing into. Click a skill to see the projects that use it.</p>
          </div>
          <div className="skills-avg">
            <p className="stat-num"><CountUp to={avg} suffix="%" /></p>
            <p className="stat-label">Average across {allSkills.length} skills</p>
          </div>
        </div>

        <div className="skills-tools" data-reveal>
          <div className="project-search-wrap">
            <Search size={16} className="project-search-icon" aria-hidden="true" />
            <input
              className="project-search"
              type="text"
              placeholder="Search a skill…"
              aria-label="Search skills"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button type="button" className="search-clear" onClick={() => setQuery('')} aria-label="Clear search">
                <X size={14} />
              </button>
            )}
          </div>
          <div className="seg" role="group" aria-label="Skill view">
            <button type="button" aria-pressed={view === 'bars'} onClick={() => setView('bars')}><LayoutGrid size={14} /> Bars</button>
            <button type="button" aria-pressed={view === 'radar'} onClick={() => setView('radar')}><RadarIcon size={14} /> Radar</button>
          </div>
        </div>

        <div className="skill-grid" data-stagger>
          {skillGroups.map((g) => (
            <SkillCard key={g.title + view} g={g} query={view === 'bars' ? query : ''} view={view} />
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
};

export default Skills;
