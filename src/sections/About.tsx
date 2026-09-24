import { bio, facts } from '@/data/site';

const About = () => (
  <section id="about" className="section">
    <div className="wrap">
      <div data-reveal>
        <p className="eyebrow">About</p>
        <h2 className="h2">Where hardware meets game worlds.</h2>
      </div>
      <div className="about-grid">
        <div className="about-text" data-reveal>
          {bio.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        <dl className="card facts" data-reveal>
          {facts.map((f) => (
            <div key={f.label} className="fact">
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  </section>
);

export default About;
