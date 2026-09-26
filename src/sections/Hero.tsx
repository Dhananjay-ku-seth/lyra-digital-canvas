import { useEffect, useRef } from 'react';
import { animate, createTimeline, stagger, utils } from 'animejs';
import { ArrowDown, Download, Github, Instagram, Linkedin, Mail } from 'lucide-react';
import { Tilt, Typewriter } from '@/components/Interactive';
import { CountUp, SplitChars, reducedMotion } from '@/components/Motion';
import { profile, roles } from '@/data/site';
import { projectsData } from '@/data/projects';

const liveCount = projectsData.filter((p) => p.demoLink).length;

const INTRO_TARGETS =
  '.badge-live, .hello, .char, .hero-role, .hero-intro, .hero-type, .hero-cta > *, .hero-links > *, .portrait-wrap, .chip-float, .stat';

const Hero = () => {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return undefined;
    if (reducedMotion()) {
      el.classList.remove('hero-pre');
      return undefined;
    }
    const q = (s: string) => Array.from(el.querySelectorAll<HTMLElement>(s));
    utils.set(q(INTRO_TARGETS), { opacity: 0 });
    el.classList.remove('hero-pre');

    const floats: ReturnType<typeof animate>[] = [];
    const tl = createTimeline({
      defaults: { ease: 'outExpo', duration: 900 },
      onComplete: () => {
        // Clean up the intro transforms, then let the chips bob gently forever.
        q('.hero-cta > *, .hero-links > *, .stat, .hero-role, .hero-intro, .hero-type, .badge-live').forEach((n) => { n.style.transform = ''; });
        [['.chip-a', 3400, -9], ['.chip-b', 4100, 10], ['.chip-c', 3700, -8]].forEach(([sel, dur, dist]) =>
          floats.push(animate(sel as string, { y: [0, dist as number], duration: dur as number, alternate: true, loop: true, ease: 'inOutSine' })),
        );
      },
    });

    tl.add(q('.badge-live'), { opacity: [0, 1], translateY: [-20, 0] })
      .add(q('.hello'), { opacity: [0, 1], translateX: [-28, 0] }, '-=650')
      .add(q('.char'), { opacity: [0, 1], translateY: ['70%', '0%'], rotate: [12, 0], delay: stagger(34) }, '-=600')
      .add(q('.hero-role, .hero-intro, .hero-type'), { opacity: [0, 1], translateY: [22, 0], delay: stagger(130) }, '-=500')
      .add(q('.hero-cta > *, .hero-links > *'), { opacity: [0, 1], scale: [0.78, 1], delay: stagger(70), ease: 'outBack' }, '-=650')
      .add(q('.portrait-wrap'), { opacity: [0, 1], scale: [0.86, 1], rotate: [5, 0], duration: 1300 }, 350)
      .add(q('.chip-float'), { opacity: [0, 1], scale: [0, 1], delay: stagger(140), ease: 'outBack' }, '-=550')
      .add(q('.stat'), { opacity: [0, 1], translateX: [-24, 0], delay: stagger(100) }, '-=700');

    return () => {
      tl.pause();
      floats.forEach((f) => f.pause());
    };
  }, []);

  return (
    <section id="top" ref={root} className="hero relative hero-pre">
      <div className="wrap w-full">
        <div className="hero-grid">
          <div>
            <span className="badge-live">
              <i /> Now building: The Life, in Unity
            </span>
            <h1>
              <span className="hello">Hello, I&apos;m</span>
              <br />
              <SplitChars text={profile.name} from={[167, 139, 250]} to={[97, 218, 251]} />
            </h1>
            <p className="hero-role">
              Lead Game Developer at {profile.company} · Electronics &amp; Communication Engineer
            </p>
            <p className="hero-intro">
              Lead Game Developer at {profile.company}, building immersive mobile games and worlds in ROBLOX and Fortnite with Unreal Engine.
              Combining game development leadership with Electronics &amp; Communication Engineering, I&apos;m driven by a passion for technology
              and innovation. Meet my AI assistant{' '}
              <button type="button" className="lyra-link" onClick={() => window.dispatchEvent(new Event('open-lyra'))}>
                LYRA
              </button>
              , designed to help you explore my portfolio.
            </p>
            <p className="hero-type">
              {'> '}I build <Typewriter words={roles} className="text-[color:var(--green)]" />
            </p>

            <div className="hero-cta">
              <a className="btn btn-primary" href="#projects">
                See my projects <ArrowDown size={16} />
              </a>
              <a className="btn btn-ghost" href={profile.resume} download>
                <Download size={16} /> Resume
              </a>
              <a className="btn btn-ghost" href="#contact">
                <Mail size={16} /> Get in touch
              </a>
            </div>

            <div className="hero-links">
              <a className="icon-btn" href={profile.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={18} /></a>
              <a className="icon-btn" href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a>
              <a className="icon-btn" href={profile.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
            </div>
          </div>

          <div className="portrait-wrap">
            <div className="portrait">
              <Tilt max={9}>
                <div className="portrait-frame">
                  <img src="/images/dhananjay.webp" alt={`Portrait of ${profile.name}`} width={480} height={480} {...({ fetchpriority: "high" } as Record<string, string>)} />
                </div>
              </Tilt>
              <span className="chip-float chip-a"><b>UE</b> map design</span>
              <span className="chip-float chip-b"><b>LOD</b> optimised</span>
              <span className="chip-float chip-c"><b>FFT</b> 2048-pt</span>
            </div>
          </div>
        </div>

        <div className="stat-row">
          <div className="stat"><p className="stat-num"><CountUp to={projectsData.length} /></p><p className="stat-label">Projects</p></div>
          <div className="stat"><p className="stat-num"><CountUp to={liveCount} /></p><p className="stat-label">Live in the browser</p></div>
          <div className="stat"><p className="stat-num"><CountUp to={4} /></p><p className="stat-label">Engineering domains</p></div>
          <div className="stat"><p className="stat-num"><CountUp to={3} /></p><p className="stat-label">Game engines &amp; platforms</p></div>
        </div>
      </div>

      <svg className="wave" viewBox="0 0 1200 80" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="wavegrad" x1="0" x2="1">
            <stop offset="0" stopColor="#8b5cf6" />
            <stop offset="1" stopColor="#61dafb" />
          </linearGradient>
        </defs>
        <path d="M0 40 C100 5 200 75 300 40 S500 5 600 40 S800 75 900 40 S1100 5 1200 40" />
      </svg>
    </section>
  );
};

export default Hero;
