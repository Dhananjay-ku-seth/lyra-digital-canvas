import { useEffect, useRef, type ElementType, type ReactNode } from 'react';
import { animate, createAnimatable, createDrawable, stagger, utils } from 'animejs';

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
    kids.filter((k) => k.classList.contains('proj-card')).forEach((k, i) => setTimeout(() => drawArt(k), 350 + i * 85));
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
      el.style.setProperty('--px', '0');
      el.style.setProperty('--py', '0');
    };
    const move = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-tilt]') ?? null;
      if (el !== active) { reset(active); active = el; }
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty('--px', String(px));
      el.style.setProperty('--py', String(py));
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


/* ------------------------------------------------------------ extra effects */

/** Confetti burst from a point on the screen. */
export function burst(x: number, y: number, count = 30) {
  if (reducedMotion()) return;
  const colors = ['#8b5cf6', '#61dafb', '#00ff99', '#ec4899', '#f59e0b'];
  const bits = Array.from({ length: count }, () => {
    const d = document.createElement('span');
    d.className = 'confetti';
    d.style.background = colors[Math.floor(Math.random() * colors.length)];
    d.style.left = `${x}px`;
    d.style.top = `${y}px`;
    document.body.appendChild(d);
    return d;
  });
  animate(bits, {
    x: () => utils.random(-190, 190),
    y: () => utils.random(-230, 70),
    rotate: () => utils.random(-540, 540),
    scale: [1, 0],
    opacity: [1, 0],
    duration: () => utils.random(900, 1500),
    ease: 'outCubic',
    onComplete: () => bits.forEach((b) => b.remove()),
  });
}

/** Redraws a project card's cover art stroke by stroke. */
export function drawArt(card: HTMLElement, delay = 0) {
  if (reducedMotion() || card.dataset.drawing === '1') return;
  const shapes = Array.from(card.querySelectorAll<SVGGeometryElement>('.project-art svg path, .project-art svg circle, .project-art svg ellipse'))
    .filter((el) => { const cs = getComputedStyle(el); return cs.fill === 'none' && cs.stroke !== 'none'; });
  if (!shapes.length) return;
  card.dataset.drawing = '1';
  const drawables = createDrawable(shapes as unknown as string);
  animate(drawables, {
    draw: ['0 0', '0 1'],
    delay: stagger(70, { start: delay }),
    duration: 900,
    ease: 'inOutQuad',
    onComplete: () => { card.dataset.drawing = '0'; },
  });
}

/** A light sweep across a project card. */
function shine(card: HTMLElement) {
  if (reducedMotion()) return;
  const bar = card.querySelector<HTMLElement>('.shine i');
  if (bar) animate(bar, { translateX: ['-140%', '280%'], duration: 950, ease: 'inOutQuad' });
}

/** The tags along the bottom of a card hop in a wave. */
function hopTags(card: HTMLElement) {
  if (reducedMotion()) return;
  const tags = card.querySelectorAll('.tag');
  if (tags.length) animate(tags, { translateY: [0, -6, 0], delay: stagger(55), duration: 480, ease: 'outQuad' });
}

function useArtDraw() {
  useEffect(() => {
    if (!finePointer() || reducedMotion()) return undefined;
    let last: HTMLElement | null = null;
    const over = (e: PointerEvent) => {
      const card = (e.target as HTMLElement | null)?.closest<HTMLElement>('.proj-card') ?? null;
      if (card && card !== last) { drawArt(card); shine(card); hopTags(card); }
      last = card;
    };
    document.addEventListener('pointerover', over, { passive: true });
    return () => document.removeEventListener('pointerover', over);
  }, []);
}

/** Hovering a letter of the big name makes it hop. */
function useCharHop() {
  useEffect(() => {
    if (!finePointer() || reducedMotion()) return undefined;
    const over = (e: PointerEvent) => {
      const c = (e.target as HTMLElement | null)?.closest<HTMLElement>('.char');
      if (!c || c.dataset.hop === '1') return;
      c.dataset.hop = '1';
      animate(c, { translateY: [0, -16, 0], rotate: [0, -6, 0], duration: 520, ease: 'outQuad', onComplete: () => { c.dataset.hop = '0'; } });
    };
    document.addEventListener('pointerover', over, { passive: true });
    return () => document.removeEventListener('pointerover', over);
  }, []);
}

/** A soft ripple from the click point on every button. */
function useRipple() {
  useEffect(() => {
    if (reducedMotion()) return undefined;
    const down = (e: PointerEvent) => {
      const b = (e.target as HTMLElement | null)?.closest<HTMLElement>('.btn');
      if (!b) return;
      const r = b.getBoundingClientRect();
      const d = Math.max(r.width, r.height) * 2;
      const ring = document.createElement('span');
      ring.className = 'ripple';
      ring.style.width = ring.style.height = `${d}px`;
      ring.style.left = `${e.clientX - r.left - d / 2}px`;
      ring.style.top = `${e.clientY - r.top - d / 2}px`;
      b.appendChild(ring);
      animate(ring, { scale: [0, 1], opacity: [0.35, 0], duration: 700, ease: 'outQuad', onComplete: () => ring.remove() });
    };
    document.addEventListener('pointerdown', down, { passive: true });
    return () => document.removeEventListener('pointerdown', down);
  }, []);
}

/** The marquee strips lean in the direction you scroll, then settle. */
function useMarqueeSkew() {
  useEffect(() => {
    if (reducedMotion()) return undefined;
    const els = Array.from(document.querySelectorAll<HTMLElement>('.marquee'));
    if (!els.length) return undefined;
    const a = createAnimatable(els, { skewX: 450, ease: 'out(3)' });
    let lastY = window.scrollY;
    let timer: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      const v = window.scrollY - lastY;
      lastY = window.scrollY;
      a.skewX(Math.max(-9, Math.min(9, -v * 0.35)));
      clearTimeout(timer);
      timer = setTimeout(() => a.skewX(0), 110);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); clearTimeout(timer); a.revert(); };
  }, []);
}

/** The Konami code: up up down down left right left right B A. */
function useKonami() {
  useEffect(() => {
    const code = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let i = 0;
    const key = (e: KeyboardEvent) => {
      i = e.key === code[i] || e.key.toLowerCase() === code[i] ? i + 1 : e.key === code[0] ? 1 : 0;
      if (i === code.length) {
        i = 0;
        [0.2, 0.5, 0.8].forEach((f, n) => setTimeout(() => burst(window.innerWidth * f, window.innerHeight * 0.35, 40), n * 220));
      }
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, []);
}

/** Hero: the portrait block drifts a little toward the pointer. */
export function useHeroParallax(rootSelector = '.hero') {
  useEffect(() => {
    if (!finePointer() || reducedMotion()) return undefined;
    const hero = document.querySelector<HTMLElement>(rootSelector);
    const target = hero?.querySelector<HTMLElement>('.portrait');
    if (!hero || !target) return undefined;
    const a = createAnimatable(target, { x: 700, y: 700, ease: 'out(3)' });
    const move = (e: PointerEvent) => {
      const r = hero.getBoundingClientRect();
      a.x(((e.clientX - r.left) / r.width - 0.5) * -26).y(((e.clientY - r.top) / r.height - 0.5) * -18);
    };
    const leave = () => a.x(0).y(0);
    hero.addEventListener('pointermove', move, { passive: true });
    hero.addEventListener('pointerleave', leave);
    return () => { hero.removeEventListener('pointermove', move); hero.removeEventListener('pointerleave', leave); a.revert(); };
  }, [rootSelector]);
}

/** Mount once: switches on every global motion effect. */
export const MotionEffects = ({ children }: { children?: ReactNode }) => {
  useReveal();
  useMagnetic();
  useTilt();
  useTimelineProgress();
  useOrbDrift();
  useArtDraw();
  useCharHop();
  useRipple();
  useMarqueeSkew();
  useKonami();
  useHeroParallax();
  return <>{children}<CursorFollower /></>;
};
