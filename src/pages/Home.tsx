
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import CircuitBackground from '@/components/CircuitBackground';
import Lyra from '@/components/Lyra';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const Home = () => {
  // Reference for the main section to handle entrance animation
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add opacity transition effect when component mounts
    // This creates a smooth fade-in entrance animation
    const timer = setTimeout(() => {
      if (sectionRef.current) {
        sectionRef.current.classList.add('opacity-100');
        sectionRef.current.classList.remove('opacity-0');
      }
    }, 200);

    // Clean up the timer to prevent memory leaks
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Circuit background component for futuristic tech theme */}
      <CircuitBackground />

      {/* Hero Section with fade-in animation */}
      <section 
        ref={sectionRef}
        className="min-h-screen flex flex-col justify-center container-custom pt-16 opacity-0 transition-opacity duration-1000"
      >
        {/* Grid layout for responsive design */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left column - Text content */}
          <div className="space-y-6 animate-slide-up">
            {/* Personal introduction with highlighted name */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Hello, I'm <span className="text-tech-purple">Dhananjay Kumar Seth</span>
            </h1>
            
            {/* Subheading with field of study */}
            <p className="text-xl md:text-2xl font-light text-gray-300">
              An Electronics and Communication Engineering student
            </p>
            
            {/* Brief description with passion and AI assistant */}
            <div className="space-y-4 text-gray-300 max-w-2xl">
              <p>
                I specialize in Game Development and Electronics Engineering. My journey is driven 
                by a passion for technology and innovation. Meet my AI assistant LYRA, designed to assist 
                you in navigating my portfolio.
              </p>
            </div>
            
            {/* Navigation buttons with smooth hover effects */}
            <div className="pt-4 flex flex-wrap gap-4">
              <Link to="/about" className="btn-primary">
                About Me
              </Link>
              <Link to="/projects" className="btn-outline">
                View Projects
              </Link>
            </div>
          </div>
          
          {/* Right column - Tech-themed avatar section (hidden on small screens) */}
          <div className="relative animate-slide-down hidden lg:block">
            {/* Circular tech-themed background with animated elements */}
            <div className="relative w-full h-[400px] flex items-center justify-center">
              {/* Futuristic circular background with pulsing effects */}
              <div className="absolute inset-0 rounded-full bg-tech-dark border border-tech-purple/30 opacity-80 overflow-hidden">
                {/* Animated pulsing circles */}
                <div className="absolute inset-8 rounded-full border border-tech-purple/20 animate-pulse-glow"></div>
                <div className="absolute inset-16 rounded-full border border-tech-purple/30 animate-pulse-glow" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute inset-24 rounded-full border border-tech-purple/40 animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
                
                {/* Central pulse dot */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-tech-purple animate-pulse-glow"></div>
                </div>
                
                {/* Radial lines around the center */}
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
              
              {/* Profile Avatar using Shadcn UI Avatar component */}
              <div className="relative z-10 w-48 h-48">
                <Avatar className="w-full h-full">
                  <AvatarImage 
                    src="/lovable-uploads/e5f4b321-f34c-4da6-b18c-f30dc80f0919.png" 
                    alt="Dhananjay Kumar Seth" 
                    className="object-cover rounded-full"
                  />
                  <AvatarFallback>DKS</AvatarFallback>
                </Avatar>
              </div>
              
              {/* Tech specialization label */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-tech-dark px-4 py-2 rounded-full border border-tech-purple/50">
                <p className="text-tech-lightBlue font-medium">Electronics & Game Dev</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Animated scroll down arrow */}
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
      
      {/* LYRA AI Assistant component */}
      <Lyra />
    </main>
  );
};

export default Home;
