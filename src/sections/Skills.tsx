import { otherSkills, skillGroups } from '@/data/site';

const Skills = () => (
  <section id="skills" className="section">
    <div className="wrap">
      <div data-reveal>
        <p className="eyebrow">Skills</p>
        <h2 className="h2">What I work with.</h2>
        <p className="lead">Self-rated proficiency, from the tools I use most to the ones I am still growing into.</p>
      </div>

      <div className="skill-grid">
        {skillGroups.map((g) => (
          <article key={g.title} className="card skill-card" data-tone={g.tone} data-reveal>
            <h3>{g.title}</h3>
            <div className="mt-5">
              {g.items.map((s) => (
                <div key={s.name} className="skill-row">
                  <header>
                    <span>{s.name}</span>
                    <span>{s.level}%</span>
                  </header>
                  <div className="meter" role="img" aria-label={`${s.name}: ${s.level} percent`}>
                    <i style={{ ['--w' as string]: `${s.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </article>
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
