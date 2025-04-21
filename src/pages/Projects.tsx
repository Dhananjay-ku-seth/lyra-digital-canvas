import { useState } from 'react';
import CircuitBackground from '@/components/CircuitBackground';
import Lyra from '@/components/Lyra';

// TypeScript type definition for Project structure
type Project = {
  id: string;           // Unique identifier for each project
  title: string;        // Project title
  description: string;  // Brief project description
  tags: string[];       // Technology tags
  image: string;        // Image representation
  demoLink?: string;    // Optional demo link
  repoLink?: string;    // Optional repository link
  category: 'game' | 'electronics' | 'other'; // Project category
};

// Sample projects data with detailed information
const projectsData: Project[] = [
  {
    id: 'project1',
    title: 'Roblox Adventure Game',
    description: 'An immersive Roblox adventure game with unique mechanics and interactive environments. Features custom scripts for character movement and environmental interactions.',
    tags: ['Roblox', 'Game Development', 'Lua', 'Level Design'],
    image: 'game',
    demoLink: '#',
    category: 'game'
  },
  {
    id: 'project2',
    title: 'Unity 3D Platformer',
    description: 'A 3D platformer game built with Unity featuring advanced physics, custom character controllers, and procedurally generated levels.',
    tags: ['Unity', 'C#', 'Game Development', '3D Modeling'],
    image: 'game',
    demoLink: '#',
    repoLink: '#',
    category: 'game'
  },
  {
    id: 'project3',
    title: 'Line Follower Robot',
    description: 'An autonomous robot designed to follow a line using infrared sensors and PID control algorithm for smooth navigation.',
    tags: ['Robotics', 'Arduino', 'Sensors', 'PID Control'],
    image: 'electronics',
    demoLink: '#',
    category: 'electronics'
  },
  {
    id: 'project4',
    title: 'VLSI Circuit Design',
    description: 'Design and simulation of VLSI circuits for digital signal processing applications, optimized for low power consumption.',
    tags: ['VLSI', 'Circuit Design', 'Verilog', 'Signal Processing'],
    image: 'electronics',
    category: 'electronics'
  },
  {
    id: 'project5',
    title: 'Wireless Health Monitor',
    description: 'A wireless health monitoring system using ESP32 and various health sensors to track vital signs and transmit data to a mobile application.',
    tags: ['IoT', 'ESP32', 'Health Tech', 'Mobile App'],
    image: 'electronics',
    demoLink: '#',
    category: 'electronics'
  },
  {
    id: 'project6',
    title: 'Arcade Game Collection',
    description: 'A collection of classic arcade games reimagined with modern graphics and gameplay mechanics, built using modern game development frameworks.',
    tags: ['Game Development', 'JavaScript', 'HTML5 Canvas', 'WebGL'],
    image: 'game',
    demoLink: '#',
    repoLink: '#',
    category: 'game'
  }
];

const Projects = () => {
  // State management for project filtering and interaction
  const [activeFilter, setActiveFilter] = useState<'all' | 'game' | 'electronics'>('all');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  
  // Filter projects based on selected category
  const filteredProjects = activeFilter === 'all' 
    ? projectsData 
    : projectsData.filter(project => project.category === activeFilter);

  // Dynamic project icon component based on category
  const ProjectIcon = ({ category }: { category: string }) => {
    // Icon selection logic with different styles for each category
    if (category === 'game') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-tech-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
        </svg>
      );
    } else if (category === 'electronics') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-tech-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      );
    } else {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-tech-lightBlue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      );
    }
  };

  return (
    <main className="min-h-screen pt-20 pb-16 relative">
      {/* Circuit background for tech-themed design */}
      <CircuitBackground />
      
      <div className="container-custom">
        {/* Page title with centered styling */}
        <h1 className="section-heading text-center mx-auto">My Projects</h1>
        
        {/* Category filter buttons */}
        <div className="flex justify-center mt-10 mb-12">
          <div className="inline-flex p-1 bg-tech-dark/50 backdrop-blur-sm rounded-lg border border-tech-purple/20">
            {/* Filter buttons with dynamic active state */}
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-5 py-2 rounded-md transition-all ${
                activeFilter === 'all'
                  ? 'bg-tech-purple text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              All Projects
            </button>
            <button
              onClick={() => setActiveFilter('game')}
              className={`px-5 py-2 rounded-md transition-all ${
                activeFilter === 'game'
                  ? 'bg-tech-purple text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Game Dev
            </button>
            <button
              onClick={() => setActiveFilter('electronics')}
              className={`px-5 py-2 rounded-md transition-all ${
                activeFilter === 'electronics'
                  ? 'bg-tech-purple text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Electronics
            </button>
          </div>
        </div>
        
        {/* Responsive grid of project cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            // Individual project card with hover and animation effects
            <div 
              key={project.id}
              className="group bg-tech-dark/80 backdrop-blur-sm rounded-lg border border-tech-purple/20 overflow-hidden card-hover"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              style={{ 
                animationDelay: `${index * 0.1}s`
              }}
            >
              {/* Project header with category icon and title */}
              <div className="p-6 flex items-center space-x-4">
                <div className={`p-3 rounded-lg ${
                  project.category === 'game' 
                    ? 'bg-tech-purple/10' 
                    : 'bg-tech-pink/10'
                }`}>
                  <ProjectIcon category={project.category} />
                </div>
                <h3 className="text-xl font-bold">{project.title}</h3>
              </div>
              
              {/* Detailed project description and tags */}
              <div className="px-6 pb-4">
                <p className="text-gray-300">{project.description}</p>
                
                {/* Colored tags for technologies used */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span 
                      key={tag} 
                      className={`px-2 py-1 text-xs rounded-full ${
                        project.category === 'game'
                          ? 'bg-tech-purple/20 text-tech-purple'
                          : 'bg-tech-pink/20 text-tech-pink'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Project links and category information */}
              <div className="px-6 py-4 bg-tech-dark/50 flex justify-between items-center">
                {/* Demo and source code links */}
                {project.demoLink && (
                  <a 
                    href={project.demoLink} 
                    className="text-tech-lightBlue hover:text-tech-lightBlue/80 text-sm font-medium inline-flex items-center"
                  >
                    <span>View Demo</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
                
                {project.repoLink && (
                  <a 
                    href={project.repoLink} 
                    className="text-gray-300 hover:text-white text-sm font-medium inline-flex items-center"
                  >
                    <span>Source Code</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </a>
                )}
                
                {!project.demoLink && !project.repoLink && (
                  <span className="text-gray-500 text-sm">Private Project</span>
                )}
                
                {/* Hide the date/status when links are shown to avoid cluttering */}
                <span className="text-gray-500 text-sm">
                  {project.category === 'game' ? 'Game Project' : 'Electronics Project'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* LYRA AI Assistant with project context */}
      <Lyra initialMessage="Here are Dhananjay's projects! Feel free to ask me about any specific project or technology he has worked with." />
    </main>
  );
};

export default Projects;
