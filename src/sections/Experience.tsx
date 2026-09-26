import { AnimHeading } from '@/components/Motion';
import { experience } from '@/data/site';

const Experience = () => (
  <section id="experience" className="section">
    <div className="wrap">
      <div data-reveal>
        <p className="eyebrow">Experience</p>
        <AnimHeading>Leading, building, teaching.</AnimHeading>
      </div>
      <div className="timeline">
        {experience.map((e) => (
          <article key={e.title + e.org} className={`t-item${e.current ? ' current' : ''}`} data-reveal data-from="left">
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
