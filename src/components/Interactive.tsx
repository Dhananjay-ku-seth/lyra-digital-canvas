import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from 'react';
import { ArrowUp, ExternalLink, Monitor, Smartphone, X } from 'lucide-react';

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* Thin bar at the top of the page that fills as you scroll. */
export const ScrollProgress = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const update = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      if (ref.current) ref.current.style.transform = `scaleX(${max > 0 ? Math.min(1, h.scrollTop / max) : 0})`;
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);
  return <div ref={ref} className="scroll-progress" aria-hidden="true" />;
};

/* Soft light that follows the mouse (mouse and trackpad only). */
export const CursorGlow = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!finePointer() || reducedMotion()) return undefined;
    let x = 0;
    let y = 0;
    let raf = 0;
    const draw = () => {
      raf = 0;
      if (ref.current) ref.current.style.transform = `translate(${x - 220}px, ${y - 220}px)`;
    };
    const move = (e: globalThis.PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (ref.current) ref.current.style.opacity = '1';
      if (!raf) raf = requestAnimationFrame(draw);
    };
    const leave = () => {
      if (ref.current) ref.current.style.opacity = '0';
    };
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
};

/* Elements with class "spot" get a highlight that tracks the pointer. */
export const SpotlightGlobal = () => {
  useEffect(() => {
    const move = (e: globalThis.PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>('.spot');
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    document.addEventListener('pointermove', move, { passive: true });
    return () => document.removeEventListener('pointermove', move);
  }, []);
  return null;
};

/* Floating button; a ring around it shows how far down the page you are. */
export const BackToTop = () => {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const update = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setPct(max > 0 ? h.scrollTop / max : 0);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  const c = 2 * Math.PI * 18;
  return (
    <button
      type="button"
      className={`to-top${pct > 0.08 ? ' show' : ''}`}
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <svg viewBox="0 0 44 44" aria-hidden="true">
        <circle cx="22" cy="22" r="18" className="to-top-track" />
        <circle cx="22" cy="22" r="18" className="to-top-ring" strokeDasharray={c} strokeDashoffset={c * (1 - pct)} />
      </svg>
      <ArrowUp className="to-top-arrow" size={18} />
    </button>
  );
};

/* Types one phrase, pauses, deletes it, then types the next. */
export const Typewriter = ({ words, className = '' }: { words: string[]; className?: string }) => {
  const [text, setText] = useState(reducedMotion() ? words[0] ?? '' : '');
  useEffect(() => {
    if (reducedMotion() || !words.length) return undefined;
    let word = 0;
    let index = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const full = words[word] ?? '';
      index += deleting ? -1 : 1;
      setText(full.slice(0, index));
      let delay = deleting ? 30 : 70;
      if (!deleting && index === full.length) {
        deleting = true;
        delay = 1600;
      } else if (deleting && index === 0) {
        deleting = false;
        word = (word + 1) % words.length;
        delay = 350;
      }
      timer = setTimeout(tick, delay);
    };
    timer = setTimeout(tick, 500);
    return () => clearTimeout(timer);
  }, [words]);
  return (
    <span className={className}>
      {text}
      <span className="type-caret" aria-hidden="true" />
    </span>
  );
};

/* Counts up to a number the first time it scrolls into view. */
export const CountUp = ({ to, suffix = '' }: { to: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(reducedMotion() ? to : 0);
  useEffect(() => {
    if (reducedMotion() || !ref.current) return undefined;
    let raf = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const step = (now: number) => {
          const p = Math.min(1, (now - start) / 1400);
          setValue(Math.round(to * (1 - (1 - p) ** 3)));
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [to]);
  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
};

/* Gentle 3D tilt that follows the pointer. */
export const Tilt = ({ children, max = 7, className = '' }: { children: ReactNode; max?: number; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: PointerEvent) => {
    if (!finePointer() || reducedMotion() || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(900px) rotateY(${px * max * 2}deg) rotateX(${-py * max * 2}deg) scale(1.02)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = '';
  };
  return (
    <div ref={ref} className={`tilt ${className}`} onPointerMove={move} onPointerLeave={reset}>
      {children}
    </div>
  );
};

/* Scrolling strip of technologies. */
export const Marquee = ({ items }: { items: string[] }) => {
  const row = [...items, ...items];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className="marquee-item">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

/* Runs a callback the first time an element is scrolled into view. Re-checks each render. */
export const useReveal = () => {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)');
    if (!targets.length) return undefined;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.12 },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  });
};

/* Opens a live project inside the page, with a desktop / phone toggle. */
export const ProjectPreview = ({ title, url, onClose }: { title: string; url: string; onClose: () => void }) => {
  const [mobile, setMobile] = useState(false);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);
  return (
    <div className="preview-back" onClick={onClose} role="dialog" aria-modal="true" aria-label={`${title} preview`}>
      <div className="preview-modal" onClick={(e) => e.stopPropagation()}>
        <div className="preview-bar">
          <div className="preview-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <span className="preview-url">{url.replace(/^https?:\/\//, '')}</span>
          <div className="preview-actions">
            <button type="button" className={!mobile ? 'on' : ''} onClick={() => setMobile(false)} aria-label="Desktop view">
              <Monitor size={16} />
            </button>
            <button type="button" className={mobile ? 'on' : ''} onClick={() => setMobile(true)} aria-label="Phone view">
              <Smartphone size={16} />
            </button>
            <a href={url} target="_blank" rel="noopener noreferrer" aria-label="Open in a new tab">
              <ExternalLink size={16} />
            </a>
            <button type="button" onClick={onClose} aria-label="Close preview">
              <X size={16} />
            </button>
          </div>
        </div>
        <p className="preview-hint">{title}. Some tools work best in their own tab; use the arrow icon to open it there.</p>
        <div className="preview-stage">
          {!loaded && <span className="preview-loading">Loading {title}…</span>}
          <iframe
            key={String(mobile)}
            title={title}
            src={url}
            className={mobile ? 'preview-frame-mobile' : 'preview-frame-desktop'}
            onLoad={() => setLoaded(true)}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};
