import { ArrowDown, Download, Github, Instagram, Linkedin, Mail } from 'lucide-react';
import { CountUp, Typewriter } from '@/components/Interactive';
import { profile, roles } from '@/data/site';
import { projectsData } from '@/data/projects';

const liveCount = projectsData.filter((p) => p.demoLink).length;

const Hero = () => (
  <section id="top" className="hero relative">
    <div className="wrap w-full">
      <div className="hero-grid">
        <div>
          <span className="badge-live">
            <i /> Building at {profile.company}
          </span>
          <h1>
            {profile.first}
            <br />
            <span className="grad">Kumar Seth</span>
          </h1>
          <p className="hero-role">{profile.headline}</p>
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

        <div className="portrait">
          <div className="portrait-frame">
            <img src="/images/dhananjay.webp" alt={`Portrait of ${profile.name}`} width={480} height={480} fetchPriority="high" />
          </div>
          <span className="chip-float chip-a"><b>FFT</b> 2048-pt</span>
          <span className="chip-float chip-b"><b>PID</b> Kp Ki Kd</span>
          <span className="chip-float chip-c"><b>UE5</b> level design</span>
        </div>
      </div>

      <div className="stat-row">
        <div className="stat"><p className="stat-num"><CountUp to={projectsData.length} /></p><p className="stat-label">Projects</p></div>
        <div className="stat"><p className="stat-num"><CountUp to={liveCount} /></p><p className="stat-label">Live in the browser</p></div>
        <div className="stat"><p className="stat-num"><CountUp to={4} /></p><p className="stat-label">Engineering domains</p></div>
        <div className="stat"><p className="stat-num"><CountUp to={2} /></p><p className="stat-label">Game platforms</p></div>
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

export default Hero;
