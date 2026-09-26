import { useRef, useState } from 'react';
import { animate } from 'animejs';
import { Award, RotateCw } from 'lucide-react';
import { AnimHeading, reducedMotion } from '@/components/Motion';
import { certifications, education } from '@/data/site';

type Cert = (typeof certifications)[number];

/** A certification card that flips over to show what it covers. */
const CertCard = ({ c }: { c: Cert }) => {
  const [flipped, setFlipped] = useState(false);
  const inner = useRef<HTMLDivElement>(null);
  const toggle = () => {
    const next = !flipped;
    setFlipped(next);
    if (!inner.current) return;
    if (reducedMotion()) { inner.current.style.transform = next ? 'rotateY(180deg)' : ''; return; }
    animate(inner.current, { rotateY: next ? 180 : 0, duration: 800, ease: 'outBack' });
  };
  return (
    <button type="button" className="cert-flip spot" data-tilt onClick={toggle} aria-pressed={flipped} aria-label={`${c.title}, ${c.issuer}. Press to ${flipped ? 'hide' : 'show'} details`}>
      <div ref={inner} className="cert-inner">
        <div className="cert-face">
          <Award size={22} className="text-[color:var(--violet)]" />
          <h4>{c.title}</h4>
          <p className="meta">{c.issuer} · {c.year}</p>
          <span className="flip-hint"><RotateCw size={12} /> Flip</span>
        </div>
        <div className="cert-face cert-back">
          <p className="meta">What it covers</p>
          <p className="cert-text">{c.text}</p>
        </div>
      </div>
    </button>
  );
};

const EducationSection = () => (
  <section id="education" className="section">
    <div className="wrap">
      <div data-reveal>
        <p className="eyebrow">Education</p>
        <AnimHeading>Foundations and certifications.</AnimHeading>
      </div>

      <div className="two-col">
        <div>
          <div className="timeline">
            {education.map((e, i) => (
              <article key={e.title} className={`t-item${i === 0 ? ' current' : ''}`} data-reveal data-from="left">
                <p className="t-period">{e.period}</p>
                <h3 className="t-title">{e.title}</h3>
                <p className="t-org">{e.org}</p>
                <p className="t-text">{e.text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="cert-grid" style={{ marginTop: '2.5rem' }} data-stagger>
          {certifications.map((c) => (
            <CertCard key={c.title} c={c} />
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default EducationSection;
