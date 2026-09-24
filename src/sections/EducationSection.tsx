import { Award } from 'lucide-react';
import { certifications, education } from '@/data/site';

const EducationSection = () => (
  <section id="education" className="section">
    <div className="wrap">
      <div data-reveal>
        <p className="eyebrow">Education</p>
        <h2 className="h2">Foundations and certifications.</h2>
      </div>

      <div className="two-col">
        <div>
          <div className="timeline">
            {education.map((e, i) => (
              <article key={e.title} className={`t-item${i === 0 ? ' current' : ''}`} data-reveal>
                <p className="t-period">{e.period}</p>
                <h3 className="t-title">{e.title}</h3>
                <p className="t-org">{e.org}</p>
                <p className="t-text">{e.text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="cert-grid" style={{ marginTop: '2.5rem' }}>
          {certifications.map((c) => (
            <article key={c.title} className="card cert" data-reveal>
              <div className="flex items-start gap-3">
                <Award size={20} className="mt-0.5 shrink-0 text-[color:var(--violet)]" />
                <div>
                  <h4>{c.title}</h4>
                  <p className="meta">{c.issuer} · {c.year}</p>
                  <p>{c.text}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default EducationSection;
