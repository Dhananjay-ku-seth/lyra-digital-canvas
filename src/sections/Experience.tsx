import { experience } from '@/data/site';

const Experience = () => (
  <section id="experience" className="section">
    <div className="wrap">
      <div data-reveal>
        <p className="eyebrow">Experience</p>
        <h2 className="h2">Leading, building, teaching.</h2>
      </div>
      <div className="timeline">
        {experience.map((e) => (
          <article key={e.title + e.org} className={`t-item${e.current ? ' current' : ''}`} data-reveal>
            <p className="t-period">{e.period}</p>
            <h3 className="t-title">{e.title}</h3>
            <p className="t-org">{e.org}</p>
            <p className="t-text">{e.text}</p>
            <div className="tags" style={{ marginTop: '0.8rem', paddingTop: 0 }}>
              {e.tags.map((t) => (
                <span key={t} className="tag" style={{ cursor: 'default' }}>{t}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Experience;
