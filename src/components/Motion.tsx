import { useEffect, useRef, type ElementType, type ReactNode } from 'react';
import { animate, createAnimatable, stagger, utils } from 'animejs';

/*
 * Motion layer, built on anime.js.
 *  - Scroll reveals with staggered children and split-word headings
 *  - Magnetic buttons, 3D card tilt, a cursor follower
 *  - Animated counters and a scroll-driven timeline line
 * Everything respects "reduce motion" and only uses the fancy pointer effects on mouse/trackpad devices.
 */

export const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* ------------------------------------------------------------------ reveal */

function reveal(el: HTMLElement) {
  if (el.classList.contains('is-visible')) return;

  if (reducedMotion()) {
    el.classList.add('is-visible');
    return;
  }

  if (el.hasAttribute('data-stagger')) {
    const kids = Array.from(el.children) as HTMLElement[];
    utils.set(kids, { opacity: 0 });
    el.classList.add('is-visible');
    animate(kids, {
      opacity: [0, 1],
      translateY: [42, 0],
      scale: [0.94, 1],
      delay: stagger(85),
      duration: 900,
      ease: 'outExpo',
      onComplete: () => kids.forEach((k) => { k.style.transform = ''; k.style.opacity = ''; }),
    });
    return;
  }

  if (el.hasAttribute('data-heading')) {
    const words = Array.from(el.querySelectorAll<HTMLElement>('.w-i'));
    utils.set(words, { translateY: '115%' });
    el.classList.add('is-visible');
    animate(words, { translateY: ['115%', '0%'], delay: stagger(70), duration: 1000, ease: 'outExpo' });
    return;
  }

  const from = el.dataset.from;
  utils.set(el, { opacity: 0 });
  el.classList.add('is-visible');
  animate(el, {
    opacity: [0, 1],
    translateY: from ? 0 : [34, 0],
    translateX: from === 'left' ? [-44, 0] : from === 'right' ? [44, 0] : 0,
    duration: 950,
    delay: Number(el.dataset.delay ?? 0),
    ease: 'outExpo',
    onComplete: () => { el.style.transform = ''; el.style.opacity = ''; },
  });
}

const SELECTOR = '[data-reveal], [data-stagger], [data-heading]';

/** Reveals elements as they scroll into view, including ones React adds later. */
export function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            reveal(e.target as HTMLElement);
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.14, rootMargin: '0px 0px -6% 0px' },
    );
    const seen = new WeakSet<Element>();
    const scan = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
        if (!seen.has(el) && !el.classList.contains('is-visible')) {
          seen.add(el);
          io.observe(el);
        }
      });
    };
    scan(document);
    const mo = new MutationObserver(() => scan(document));
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); };
  }, []);
}

/* -------------------------------------------------------------- split text */

/** A heading whose words slide up out of a mask when it scrolls into view. */
export const AnimHeading = ({ as: Tag = 'h2', className = 'h2', children }: { as?: ElementType; className?: string; children: string }) => (
  <Tag className={className} data-heading aria-label={children}>
    {children.split(' ').map((w, i) => (
      <span key={i} className="wg">
        <span className="w" aria-hidden="true">
          <span className="w-i">{w}</span>
        </span>{' '}
      </span>
    ))}
  </Tag>
);

/**
 * Splits text into characters that a timeline can animate. Words never break across lines.
 * With `from`/`to` colours each letter is tinted along a gradient (background-clip text cannot show
 * through separately animated letters).
 */
export const SplitChars = ({ text, className = '', from, to }: { text: string; className?: string; from?: [number, number, number]; to?: [number, number, number] }) => {
  const total = text.replace(/ /g, '').length;
  let n = 0;
  return (
    <span className={className} aria-label={text}>
      {text.split(' ').map((word, wi, all) => (
        <span key={wi} className="wg" aria-hidden="true">
          <span className="cw">
          {word.split('').map((c, i) => {
            const t = total > 1 ? n++ / (total - 1) : 0;
            const style = from && to
              ? { color: `rgb(${from.map((v, k) => Math.round(v + (to[k] - v) * t)).join(',')})` }
              : undefined;
            return <span key={i} className="char" style={style}>{c}</span>;
          })}
          </span>
          {wi < all.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  );
};

/* ---------------------------------------------------------------- counters */

export const CountUp = ({ to, suffix = '' }: { to: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (reducedMotion()) { el.textContent = `${to}${suffix}`; return undefined; }
    let anim: ReturnType<typeof animate> | null = null;
    const io = new IntersectionObserver((entries) => {
      if (!entries[0]?.isIntersecting) return;
      io.disconnect();
      const o = { v: 0 };
      anim = animate(o, {
        v: to,
        duration: 1800,
        ease: 'outExpo',
        onUpdate: () => { el.textContent = `${Math.round(o.v)}${suffix}`; },
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); anim?.pause(); };
  }, [to, suffix]);
  return <span ref={ref}>0{suffix}</span>;
};

/* ----------------------------------------------------- pointer interactions */

/** Buttons lean toward the pointer, then spring back. */
function useMagnetic() {
  useEffect(() => {
    if (!finePointer() || reducedMotion()) return undefined;
    let current: HTMLElement | null = null;
    const release = (el: HTMLElement | null) => {
      if (!el) return;
      animate(el, { x: 0, y: 0, duration: 800, ease: 'outElastic(1, .55)' });
    };
    const move = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>('.btn, .icon-btn, [data-magnetic]') ?? null;
      if (el !== current) { release(current); current = el; }
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) * 0.28;
      const dy = (e.clientY - (r.top + r.height / 2)) * 0.34;
      animate(el, { x: dx, y: dy, duration: 220, ease: 'outQuad' });
    };
    const leave = () => { release(current); current = null; };
    document.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', leave);
    return () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
    };
  }, []);
}

/** Cards marked data-tilt rotate in 3D toward the pointer. */
function useTilt() {
  useEffect(() => {
    if (!finePointer() || reducedMotion()) return undefined;
    let active: HTMLElement | null = null;
    const reset = (el: HTMLElement | null) => {
      if (!el) return;
      el.style.transition = 'transform 500ms cubic-bezier(.2,.8,.2,1)';
      el.style.transform = '';
    };
    const move = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-tilt]') ?? null;
      if (el !== active) { reset(active); active = el; }
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transition = 'transform 80ms linear';
      el.style.transform = `perspective(1000px) rotateY(${px * 7}deg) rotateX(${-py * 6}deg) translateY(-5px)`;
    };
    document.addEventListener('pointermove', move, { passive: true });
    return () => document.removeEventListener('pointermove', move);
  }, []);
}

/** A small dot plus a trailing ring that swells over links and buttons. */
export const CursorFollower = () => {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!finePointer() || reducedMotion() || !dot.current || !ring.current) return undefined;
    const d = createAnimatable(dot.current, { x: 60, y: 60, ease: 'out(3)' });
    const r = createAnimatable(ring.current, { x: 380, y: 380, ease: 'out(3)' });
    const move = (e: PointerEvent) => {
      d.x(e.clientX).y(e.clientY);
      r.x(e.clientX).y(e.clientY);
      dot.current!.style.opacity = '1';
      ring.current!.style.opacity = '1';
      const hot = (e.target as HTMLElement | null)?.closest('a, button, input, textarea, select, [data-tilt]');
      ring.current!.classList.toggle('hot', !!hot);
    };
    const leave = () => { dot.current!.style.opacity = '0'; ring.current!.style.opacity = '0'; };
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
      d.revert();
      r.revert();
    };
  }, []);
  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
};

/** Draws each timeline's coloured line as the section scrolls past. */
function useTimelineProgress() {
  useEffect(() => {
    const update = () => {
      document.querySelectorAll<HTMLElement>('.timeline').forEach((t) => {
        const r = t.getBoundingClientRect();
        const mid = window.innerHeight * 0.6;
        const p = Math.max(0, Math.min(1, (mid - r.top) / r.height));
        t.style.setProperty('--p', String(p));
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);
}

/** Slow ambient drift for the background orbs. */
function useOrbDrift() {
  useEffect(() => {
    if (reducedMotion()) return undefined;
    const anims = [
      animate('.orb-a', { x: [0, -70], y: [0, 60], scale: [1, 1.18], duration: 9000, alternate: true, loop: true, ease: 'inOutSine' }),
      animate('.orb-b', { x: [0, 80], y: [0, -50], scale: [1, 1.25], duration: 11000, alternate: true, loop: true, ease: 'inOutSine' }),
      animate('.orb-c', { x: [0, -50], y: [0, -70], duration: 13000, alternate: true, loop: true, ease: 'inOutSine' }),
    ];
    return () => anims.forEach((a) => a.pause());
  }, []);
}

/** Mount once: switches on every global motion effect. */
export const MotionEffects = ({ children }: { children?: ReactNode }) => {
  useReveal();
  useMagnetic();
  useTilt();
  useTimelineProgress();
  useOrbDrift();
  return <>{children}<CursorFollower /></>;
};
