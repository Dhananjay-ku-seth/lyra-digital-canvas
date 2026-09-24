import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import CircuitBackground from '@/components/CircuitBackground';
import Lyra from '@/components/LazyLyra';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import ElectronicComponentsBg from '@/components/ElectronicComponentsBg';
import { useSeo } from '@/hooks/useSeo';
import { CountUp, Marquee, ProjectPreview, Tilt, Typewriter, useReveal } from '@/components/Interactive';
import { projectsData, type Project } from '@/data/projects';
import { ArrowRight, Eye, ExternalLink } from 'lucide-react';
import ProjectArt from '@/components/ProjectArt';

const SKILL_GROUPS = [
  { title: 'Electronics & signals', tone: 'pink', blurb: 'Simulators I built to make the theory visible.', items: ['DSP', 'FFT', 'PID', 'Digital Design', 'Verilog', 'Modulation', 'Power Systems', 'Battery'] },
  { title: 'Game development', tone: 'purple', blurb: 'Worlds and gameplay for large multiplayer platforms.', items: ['Unreal Engine', 'Fortnite', 'ROBLOX', 'Level Design', 'UGC', 'Multiplayer'] },
  { title: 'Web & tooling', tone: 'neon', blurb: 'How the interactive tools are made.', items: ['React', 'Web Audio API', 'SVG', 'Education', 'LabBench'] },
];

const Home = () => {
  useSeo({
    title: 'Dhananjay Kumar Seth — ECE Engineer & Game Developer',
    description: 'Portfolio of Dhananjay Kumar Seth — an Electronics & Communication Engineer and game developer. Explore interactive DSP, PID control, digital logic and communication-systems demos, plus game development.',
  });
  const sectionRef = useRef<HTMLDivElement>(null);
  const [preview, setPreview] = useState<Project | null>(null);
  useReveal();
  const featured = projectsData.filter((p) => p.featured);
  const liveCount = projectsData.filter((p) => p.demoLink).length;
  const scrollDownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (sectionRef.current) {
        sectionRef.current.classList.add('opacity-100');
        sectionRef.current.classList.remove('opacity-0');
      }
    }, 200);

    const handleScrollDown = () => {
      window.scrollBy({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    };

    const scrollDownElement = scrollDownRef.current;
    if (scrollDownElement) {
      scrollDownElement.addEventListener('click', handleScrollDown);
    }

    return () => {
      clearTimeout(timer);
      if (scrollDownElement) {
        scrollDownElement.removeEventListener('click', handleScrollDown);
      }
    };
  }, []);

  return (
    <main id="main" className="min-h-screen relative overflow-hidden">
      <ElectronicComponentsBg />
      <CircuitBackground />

      <section 
        ref={sectionRef}
        className="min-h-screen flex flex-col justify-center container-custom pt-16 opacity-0 transition-opacity duration-1000"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6 animate-slide-up tech-panel-3d p-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tech-text-3d">
              Hello, I'm <span className="text-tech-purple">Dhananjay Kumar Seth</span>
            </h1>
            
            <p className="text-xl md:text-2xl font-light text-gray-300">
              Lead Game Developer at GauravGo Games · Electronics & Communication Engineer
            </p>

            <p className="font-mono text-sm sm:text-base text-gray-400">
              I build <Typewriter className="text-tech-neon font-semibold" words={['interactive DSP tools', 'circuit simulators', 'game worlds in Unreal', 'ROBLOX experiences', 'engineering study tools']} />
            </p>
            
            <div className="space-y-4 text-gray-300 max-w-2xl">
              <p className="tech-text-3d">
                Lead Game Developer at GauravGo Games, building immersive mobile games and worlds in ROBLOX and Fortnite with Unreal Engine.
                Combining game development leadership with Electronics & Communication Engineering, I'm driven by a passion for technology and innovation.
                Meet my AI assistant LYRA, designed to help you explore my portfolio.
              </p>
            </div>
            
            <div className="pt-4 flex flex-wrap gap-4">
              <Link to="/about" className="tech-button-3d px-6 py-3">
                About Me
              </Link>
              <Link to="/projects" className="tech-button-3d px-6 py-3 bg-secondary/90">
                View Projects
              </Link>
            </div>
          </div>
          
          <div className="relative animate-slide-down hidden lg:block">
            <div className="relative w-full h-[400px] flex items-center justify-center tech-card-3d">
              <div className="absolute inset-0 rounded-full bg-tech-dark border border-tech-purple/30 opacity-80 overflow-hidden">
                <div className="absolute inset-8 rounded-full border border-tech-purple/20 animate-pulse-glow"></div>
                <div className="absolute inset-16 rounded-full border border-tech-purple/30 animate-pulse-glow" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute inset-24 rounded-full border border-tech-purple/40 animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-tech-purple animate-pulse-glow"></div>
                </div>
                
                {Array.from({ length: 12 }).map((_, i) => (
                  <div 
                    key={i}
                    className="absolute top-1/2 left-1/2 w-1/2 h-[1px] bg-tech-purple/20 origin-left"
                    style={{ transform: `translate(-50%, -50%) rotate(${i * 30}deg)` }}
                  >
                    <div className="absolute right-0 w-2 h-2 rounded-full bg-tech-purple/60"></div>
                  </div>
                ))}
              </div>
              
              <Tilt className="relative z-10 w-48 h-48">
                <Avatar className="w-full h-full">
                  <AvatarImage 
                    src="/images/dhananjay.webp" 
                    alt="Dhananjay Kumar Seth" 
                    className="object-cover rounded-full"
                  />
                  <AvatarFallback>DKS</AvatarFallback>
                </Avatar>
              </Tilt>
              
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-tech-dark px-4 py-2 rounded-full border border-tech-purple/50">
                <p className="text-tech-lightBlue font-medium">Lead Game Developer</p>
              </div>
            </div>
          </div>
        </div>
        
        <div 
          ref={scrollDownRef}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle cursor-pointer 
          tech-button-3d p-4 backdrop-blur-sm"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-8 w-8 text-tech-purple/80" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </div>
      </section>
      
      <section className="relative z-10 container-custom pb-10" data-reveal>
        <div className="stat-strip">
          <div><p className="stat-num"><CountUp to={projectsData.length} /></p><p className="stat-label">Projects</p></div>
          <div><p className="stat-num"><CountUp to={liveCount} /></p><p className="stat-label">Live in the browser</p></div>
          <div><p className="stat-num"><CountUp to={4} /></p><p className="stat-label">LabBench domains</p></div>
          <div><p className="stat-num"><CountUp to={2} /></p><p className="stat-label">Game platforms</p></div>
        </div>
      </section>

      <section className="relative z-10 py-6" data-reveal>
        <Marquee items={['DSP', 'FFT', 'PID Control', 'Digital Logic', 'Verilog', 'Communication Systems', 'Power Systems', 'EV Batteries', 'Arduino', 'Unreal Engine', 'ROBLOX', 'Fortnite UGC', 'React', 'TypeScript']} />
      </section>

      <section className="relative z-10 container-custom py-10" data-reveal>
        <h2 className="section-heading">What I work with</h2>
        <p className="text-gray-400 max-w-2xl">Click a topic to see the projects that use it.</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {SKILL_GROUPS.map((g) => (
            <div key={g.title} className="skill-group spot" data-tone={g.tone}>
              <h3 className="text-lg font-bold">{g.title}</h3>
              <p className="mt-1 text-sm text-gray-400">{g.blurb}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <Link key={item} to={`/projects?q=${encodeURIComponent(item)}`} className="skill-chip">{item}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 container-custom py-16">
        <div className="flex flex-wrap items-end justify-between gap-4" data-reveal>
          <h2 className="section-heading">Featured work</h2>
          <Link to="/projects" className="card-link text-tech-lightBlue mb-8">All {projectsData.length} projects <ArrowRight size={16} /></Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((p) => (
            <article key={p.id} data-reveal data-cat={p.category} className="project-card spot bg-tech-dark/80 backdrop-blur-sm rounded-lg border border-tech-purple/20 overflow-hidden flex flex-col">
              <ProjectArt id={p.id} category={p.category} />
              <div className="p-6 flex-1">
                <h3 className="text-lg font-bold leading-snug">{p.title}</h3>
                <p className="mt-3 text-sm text-gray-300 leading-relaxed line-clamp-4">{p.description}</p>
              </div>
              <div className="px-6 py-4 bg-tech-dark/50 flex items-center gap-5">
                {p.demoLink && <button type="button" className="card-link text-tech-lightBlue" onClick={() => setPreview(p)}><Eye size={15} /> Preview</button>}
                {p.demoLink && <a className="card-link text-tech-lightBlue" href={p.demoLink} target="_blank" rel="noopener noreferrer"><ExternalLink size={15} /> Live</a>}
              </div>
            </article>
          ))}
        </div>
      </section>

      {preview?.demoLink && <ProjectPreview title={preview.title} url={preview.demoLink} onClose={() => setPreview(null)} />}

      <Lyra />
    </main>
  );
};

export default Home;
