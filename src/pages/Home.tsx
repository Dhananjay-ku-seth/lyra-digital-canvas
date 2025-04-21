
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import CircuitBackground from '@/components/CircuitBackground';
import Lyra from '@/components/Lyra';

const Home = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add animation class after component mounts for entrance effect
    const timer = setTimeout(() => {
      if (sectionRef.current) {
        sectionRef.current.classList.add('opacity-100');
        sectionRef.current.classList.remove('opacity-0');
      }
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Circuit background */}
      <CircuitBackground />

      {/* Hero Section */}
      <section 
        ref={sectionRef}
        className="min-h-screen flex flex-col justify-center container-custom pt-16 opacity-0 transition-opacity duration-1000"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6 animate-slide-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Hello, I'm <span className="text-tech-purple">Dhananjay Kumar Seth</span>
            </h1>
            
            <p className="text-xl md:text-2xl font-light text-gray-300">
              An Electronics and Communication Engineering student
            </p>
            
            <div className="space-y-4 text-gray-300 max-w-2xl">
              <p>
                I specialize in Game Development and Electronics Engineering. My journey is driven 
                by a passion for technology and innovation. Meet my AI assistant LYRA, designed to assist 
                you in navigating my portfolio.
              </p>
            </div>
            
            <div className="pt-4 flex flex-wrap gap-4">
              <Link to="/about" className="btn-primary">
                About Me
              </Link>
              <Link to="/projects" className="btn-outline">
                View Projects
              </Link>
            </div>
          </div>
          
          <div className="relative animate-slide-down hidden lg:block">
            {/* Animated tech illustration */}
            <div className="relative w-full h-[400px] flex items-center justify-center">
              {/* Circular tech-themed background */}
              <div className="absolute inset-0 rounded-full bg-tech-dark border border-tech-purple/30 opacity-80 overflow-hidden">
                {/* Animated circles */}
                <div className="absolute inset-8 rounded-full border border-tech-purple/20 animate-pulse-glow"></div>
                <div className="absolute inset-16 rounded-full border border-tech-purple/30 animate-pulse-glow" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute inset-24 rounded-full border border-tech-purple/40 animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
                
                {/* Pulse dot in the middle */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-tech-purple animate-pulse-glow"></div>
                </div>
                
                {/* Radial lines */}
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
              
              {/* Avatar/Image in the center */}
              <div className="relative z-10 w-48 h-48 rounded-full bg-gradient-to-br from-tech-purple to-tech-pink p-1">
                <div className="w-full h-full rounded-full bg-tech-dark flex items-center justify-center text-4xl font-bold text-white">
                  DKS
                </div>
              </div>
            </div>
            
            {/* Jumping text label */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-tech-dark px-4 py-2 rounded-full border border-tech-purple/50">
              <p className="text-tech-lightBlue font-medium">Electronics & Game Dev</p>
            </div>
          </div>
        </div>
        
        {/* Animated arrow */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle">
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
      
      {/* LYRA AI Assistant */}
      <Lyra />
    </main>
  );
};

export default Home;
