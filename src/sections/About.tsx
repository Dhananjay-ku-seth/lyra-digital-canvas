import UEConsole from '@/components/UEConsole';
import { AnimHeading } from '@/components/Motion';
import { bio, facts } from '@/data/site';

const About = () => (
  <section id="about" className="section">
    <div className="wrap">
      <div data-reveal>
        <p className="eyebrow">About</p>
        <AnimHeading>Where hardware meets game worlds.</AnimHeading>
      </div>
      <div className="about-grid">
        <div className="about-text" data-stagger>
          {bio.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        <dl className="card facts spot" data-reveal data-from="right">
          {facts.map((f) => (
            <div key={f.label} className="fact">
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-14" data-reveal>
        <p className="eyebrow">Try it</p>
        <h3 className="mt-2 text-2xl font-bold">Explore this portfolio from a console.</h3>
        <p className="lead" style={{ marginTop: '0.5rem' }}>
          Type a command like <code>games</code>, <code>optimize</code> or <code>open zeher</code>. Arrow keys recall history and Tab completes.
        </p>
      </div>
      <div className="mt-6">
        <UEConsole />
      </div>
    </div>
  </section>
);

export default About;
