
import { useState } from 'react';
import CircuitBackground from '@/components/CircuitBackground';
import Lyra from '@/components/Lyra';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Analytics } from "@vercel/analytics/next";

const Resume = () => {
  const [activeTab, setActiveTab] = useState<'education' | 'skills' | 'certifications' | 'experience'>('education');

  const handleDownloadResume = () => {
    // Create a link to the resume PDF and trigger download
    const link = document.createElement('a');
    link.href = '/dhananjay_kumar_seth_resume.pdf'; // This is the path to your PDF in the public folder
    link.download = 'Dhananjay_Kumar_Seth_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="min-h-screen pt-20 pb-16 relative">
      <CircuitBackground />
      
      <div className="container-custom fade-in-permanent">
        <h1 className="section-heading text-center mx-auto">My Resume</h1>
        
        <div className="mt-12 flex flex-col md:flex-row gap-8">
          {/* Left sidebar with tabs */}
          <div className="md:w-1/4 slide-up-permanent">
            <div className="bg-tech-dark/80 backdrop-blur-md rounded-lg border border-tech-purple/20 overflow-hidden sticky top-24">
              <div className="p-6 border-b border-tech-purple/20">
                <h3 className="text-xl font-bold text-tech-lightBlue">Dhananjay Kumar Seth</h3>
                <p className="text-gray-300 mt-1">ECE Student</p>
              </div>
              
              {/* Tab navigation */}
              <nav className="p-4 space-y-2">
                <button
                  onClick={() => setActiveTab('education')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                    activeTab === 'education'
                      ? 'bg-tech-purple/20 text-tech-purple font-medium'
                      : 'text-gray-300 hover:bg-tech-dark/50 hover:text-white'
                  }`}
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                    </svg>
                    Education
                  </div>
                </button>
                
                <button
                  onClick={() => setActiveTab('skills')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                    activeTab === 'skills'
                      ? 'bg-tech-purple/20 text-tech-purple font-medium'
                      : 'text-gray-300 hover:bg-tech-dark/50 hover:text-white'
                  }`}
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Skills
                  </div>
                </button>
                
                <button
                  onClick={() => setActiveTab('certifications')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                    activeTab === 'certifications'
                      ? 'bg-tech-purple/20 text-tech-purple font-medium'
                      : 'text-gray-300 hover:bg-tech-dark/50 hover:text-white'
                  }`}
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Certifications
                  </div>
                </button>
                
                <button
                  onClick={() => setActiveTab('experience')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                    activeTab === 'experience'
                      ? 'bg-tech-purple/20 text-tech-purple font-medium'
                      : 'text-gray-300 hover:bg-tech-dark/50 hover:text-white'
                  }`}
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Experience
                  </div>
                </button>
              </nav>
              
              {/* Download resume button */}
              <div className="p-4 mt-2">
                <Button
                  onClick={handleDownloadResume}
                  className="w-full bg-tech-purple hover:bg-tech-purple/90"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </Button>
              </div>
            </div>
          </div>
          
          {/* Right content area */}
          <div className="md:w-3/4 slide-up-permanent" style={{animationDelay: '0.2s'}}>
            <div className="bg-tech-dark/80 backdrop-blur-md rounded-lg border border-tech-purple/20 p-6">
              {/* Education Tab */}
              <div className={`tab-transition ${
                activeTab === 'education' ? 'opacity-100 block' : 'opacity-0 hidden'
              }`}>
                {activeTab === 'education' && (
                  <div className="fade-in-permanent">
                    <h2 className="text-2xl font-bold mb-6 text-tech-lightBlue">Educational Background</h2>
                    
                    <div className="space-y-8">
                      <div className="border-l-4 border-tech-purple pl-5 pb-5">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                          <div>
                            <h3 className="text-xl font-bold text-tech-purple">B.Tech in Electronics and Communication Engineering</h3>
                            <p className="text-gray-300">GITA Autonomous College, Bhubaneswar, Odisha</p>
                          </div>
                          <div className="mt-2 md:mt-0">
                            <span className="inline-block px-3 py-1 bg-tech-purple/20 text-tech-purple text-sm rounded-full">
                              2022 - Present
                            </span>
                          </div>
                        </div>
                        <p className="mt-3 text-gray-300">
                          Currently pursuing undergraduate degree with focus on electronics design, communication systems, and programming.
                        </p>
                      </div>
                      
                      <div className="border-l-4 border-tech-pink pl-5 pb-5">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                          <div>
                            <h3 className="text-xl font-bold text-tech-pink">Higher Secondary Education (12th)</h3>
                            <p className="text-gray-300">Vikash Group of Institute, Bargarh, Odisha</p>
                          </div>
                          <div className="mt-2 md:mt-0">
                            <span className="inline-block px-3 py-1 bg-tech-pink/20 text-tech-pink text-sm rounded-full">
                              Completed 2022
                            </span>
                          </div>
                        </div>
                        <p className="mt-3 text-gray-300">
                          Completed with strong foundation in physics, mathematics, and computer science.
                        </p>
                      </div>
                      
                      <div className="border-l-4 border-tech-lightBlue pl-5">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                          <div>
                            <h3 className="text-xl font-bold text-tech-lightBlue">Secondary Education (10th)</h3>
                            <p className="text-gray-300">Kendriya Vidyalaya, Barmer, Rajasthan</p>
                          </div>
                          <div className="mt-2 md:mt-0">
                            <span className="inline-block px-3 py-1 bg-tech-lightBlue/20 text-tech-lightBlue text-sm rounded-full">
                              Completed
                            </span>
                          </div>
                        </div>
                        <p className="mt-3 text-gray-300">
                          CBSE curriculum with strong academic foundation.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
                
              {/* Skills Tab */}
              <div className={`tab-transition ${
                activeTab === 'skills' ? 'opacity-100 block' : 'opacity-0 hidden'
              }`}>
                {activeTab === 'skills' && (
                  <div className="fade-in-permanent">
                    <h2 className="text-2xl font-bold mb-6 text-tech-lightBlue">Technical Skills</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Game Development Skills */}
                      <div className="bg-tech-dark border border-tech-purple/20 rounded-lg p-5">
                        <h3 className="text-xl font-bold text-tech-purple mb-4">Game Development</h3>
                        
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-gray-300">Roblox Development</span>
                              <span className="text-tech-purple">90%</span>
                            </div>
                            <div className="h-2 bg-tech-dark/50 rounded-full overflow-hidden">
                              <div className="h-full bg-tech-purple rounded-full" style={{ width: '90%' }}></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-gray-300">Unity 3D</span>
                              <span className="text-tech-purple">85%</span>
                            </div>
                            <div className="h-2 bg-tech-dark/50 rounded-full overflow-hidden">
                              <div className="h-full bg-tech-purple rounded-full" style={{ width: '85%' }}></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-gray-300">Lua Scripting</span>
                              <span className="text-tech-purple">80%</span>
                            </div>
                            <div className="h-2 bg-tech-dark/50 rounded-full overflow-hidden">
                              <div className="h-full bg-tech-purple rounded-full" style={{ width: '80%' }}></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-gray-300">C# Programming</span>
                              <span className="text-tech-purple">75%</span>
                            </div>
                            <div className="h-2 bg-tech-dark/50 rounded-full overflow-hidden">
                              <div className="h-full bg-tech-purple rounded-full" style={{ width: '75%' }}></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-gray-300">Game UI Design</span>
                              <span className="text-tech-purple">70%</span>
                            </div>
                            <div className="h-2 bg-tech-dark/50 rounded-full overflow-hidden">
                              <div className="h-full bg-tech-purple rounded-full" style={{ width: '70%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Electronics Skills */}
                      <div className="bg-tech-dark border border-tech-pink/20 rounded-lg p-5">
                        <h3 className="text-xl font-bold text-tech-pink mb-4">Electronics Engineering</h3>
                        
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-gray-300">Circuit Design</span>
                              <span className="text-tech-pink">85%</span>
                            </div>
                            <div className="h-2 bg-tech-dark/50 rounded-full overflow-hidden">
                              <div className="h-full bg-tech-pink rounded-full" style={{ width: '85%' }}></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-gray-300">Arduino</span>
                              <span className="text-tech-pink">90%</span>
                            </div>
                            <div className="h-2 bg-tech-dark/50 rounded-full overflow-hidden">
                              <div className="h-full bg-tech-pink rounded-full" style={{ width: '90%' }}></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-gray-300">VLSI Design</span>
                              <span className="text-tech-pink">75%</span>
                            </div>
                            <div className="h-2 bg-tech-dark/50 rounded-full overflow-hidden">
                              <div className="h-full bg-tech-pink rounded-full" style={{ width: '75%' }}></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-gray-300">PCB Design</span>
                              <span className="text-tech-pink">80%</span>
                            </div>
                            <div className="h-2 bg-tech-dark/50 rounded-full overflow-hidden">
                              <div className="h-full bg-tech-pink rounded-full" style={{ width: '80%' }}></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-gray-300">Embedded Systems</span>
                              <span className="text-tech-pink">70%</span>
                            </div>
                            <div className="h-2 bg-tech-dark/50 rounded-full overflow-hidden">
                              <div className="h-full bg-tech-pink rounded-full" style={{ width: '70%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Programming Skills */}
                      <div className="bg-tech-dark border border-tech-lightBlue/20 rounded-lg p-5">
                        <h3 className="text-xl font-bold text-tech-lightBlue mb-4">Programming</h3>
                        
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-gray-300">Python</span>
                              <span className="text-tech-lightBlue">80%</span>
                            </div>
                            <div className="h-2 bg-tech-dark/50 rounded-full overflow-hidden">
                              <div className="h-full bg-tech-lightBlue rounded-full" style={{ width: '80%' }}></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-gray-300">C/C++</span>
                              <span className="text-tech-lightBlue">85%</span>
                            </div>
                            <div className="h-2 bg-tech-dark/50 rounded-full overflow-hidden">
                              <div className="h-full bg-tech-lightBlue rounded-full" style={{ width: '85%' }}></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-gray-300">MATLAB</span>
                              <span className="text-tech-lightBlue">75%</span>
                            </div>
                            <div className="h-2 bg-tech-dark/50 rounded-full overflow-hidden">
                              <div className="h-full bg-tech-lightBlue rounded-full" style={{ width: '75%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Other Technical Skills */}
                      <div className="bg-tech-dark border border-tech-purple/20 rounded-lg p-5">
                        <h3 className="text-xl font-bold text-gradient-purple mb-4">Other Technical Skills</h3>
                        
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-tech-purple mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-gray-300">3D Modeling</span>
                          </div>
                          
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-tech-purple mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-gray-300">Digital Signal Processing</span>
                          </div>
                          
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-tech-purple mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-gray-300">Robot Operating System (ROS)</span>
                          </div>
                          
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-tech-purple mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-gray-300">Version Control (Git)</span>
                          </div>
                          
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-tech-purple mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-gray-300">Microcontroller Programming</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Certifications Tab */}
              <div className={`tab-transition ${
                activeTab === 'certifications' ? 'opacity-100 block' : 'opacity-0 hidden'
              }`}>
                {activeTab === 'certifications' && (
                  <div className="fade-in-permanent">
                    <h2 className="text-2xl font-bold mb-6 text-tech-lightBlue">Certifications</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Certificate Card */}
                      <div className="bg-tech-dark border border-tech-purple/20 rounded-lg overflow-hidden card-hover">
                        <div className="p-5">
                          <h3 className="text-xl font-bold text-tech-purple">Game Development Fundamentals</h3>
                          <p className="text-gray-400 mt-1">Unity Technologies</p>
                          <p className="text-gray-300 mt-3">
                            Comprehensive certification covering Unity game engine fundamentals, C# programming, and game design principles.
                          </p>
                        </div>
                        <div className="bg-tech-dark/50 px-5 py-3 flex justify-between items-center">
                          <span className="text-gray-400 text-sm">2023</span>
                          <a href="#" className="text-tech-lightBlue hover:text-tech-lightBlue/80 text-sm font-medium">
                            View Certificate
                          </a>
                        </div>
                      </div>
                      
                      {/* Certificate Card */}
                      <div className="bg-tech-dark border border-tech-pink/20 rounded-lg overflow-hidden card-hover">
                        <div className="p-5">
                          <h3 className="text-xl font-bold text-tech-pink">Arduino Certification</h3>
                          <p className="text-gray-400 mt-1">Arduino Education</p>
                          <p className="text-gray-300 mt-3">
                            Certification in Arduino programming, circuit design, and IoT integration for embedded systems.
                          </p>
                        </div>
                        <div className="bg-tech-dark/50 px-5 py-3 flex justify-between items-center">
                          <span className="text-gray-400 text-sm">2023</span>
                          <a href="#" className="text-tech-lightBlue hover:text-tech-lightBlue/80 text-sm font-medium">
                            View Certificate
                          </a>
                        </div>
                      </div>
                      
                      {/* Certificate Card */}
                      <div className="bg-tech-dark border border-tech-lightBlue/20 rounded-lg overflow-hidden card-hover">
                        <div className="p-5">
                          <h3 className="text-xl font-bold text-tech-lightBlue">VLSI Design Essentials</h3>
                          <p className="text-gray-400 mt-1">NPTEL</p>
                          <p className="text-gray-300 mt-3">
                            Certification in VLSI circuit design, covering digital systems, CMOS technology, and Verilog HDL.
                          </p>
                        </div>
                        <div className="bg-tech-dark/50 px-5 py-3 flex justify-between items-center">
                          <span className="text-gray-400 text-sm">2022</span>
                          <a href="#" className="text-tech-lightBlue hover:text-tech-lightBlue/80 text-sm font-medium">
                            View Certificate
                          </a>
                        </div>
                      </div>
                      
                      {/* Certificate Card */}
                      <div className="bg-tech-dark border border-tech-purple/20 rounded-lg overflow-hidden card-hover">
                        <div className="p-5">
                          <h3 className="text-xl font-bold text-tech-purple">Python for Electronics</h3>
                          <p className="text-gray-400 mt-1">Coursera</p>
                          <p className="text-gray-300 mt-3">
                            Certification in Python programming applied to electronics projects, data acquisition, and analysis.
                          </p>
                        </div>
                        <div className="bg-tech-dark/50 px-5 py-3 flex justify-between items-center">
                          <span className="text-gray-400 text-sm">2022</span>
                          <a href="#" className="text-tech-lightBlue hover:text-tech-lightBlue/80 text-sm font-medium">
                            View Certificate
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Experience Tab */}
              <div className={`tab-transition ${
                activeTab === 'experience' ? 'opacity-100 block' : 'opacity-0 hidden'
              }`}>
                {activeTab === 'experience' && (
                  <div className="fade-in-permanent">
                    <h2 className="text-2xl font-bold mb-6 text-tech-lightBlue">Professional Experience</h2>
                    
                    <div className="space-y-8">
                      <div className="relative pl-8 pb-5 before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-tech-purple/30">
                        <div className="absolute left-0 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-tech-purple -translate-x-1/2 mt-1">
                          <span className="w-2 h-2 bg-white rounded-full"></span>
                        </div>
                        
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                          <div>
                            <h3 className="text-xl font-bold text-tech-purple">UGC Developer</h3>
                            <p className="text-gray-300">Gaurav Go Games</p>
                          </div>
                          <div className="mt-2 md:mt-0">
                            <span className="inline-block px-3 py-1 bg-tech-purple/20 text-tech-purple text-sm rounded-full">
                              Present
                            </span>
                          </div>
                        </div>
                        
                        <p className="mt-3 text-gray-300">
                          Working as a User Generated Content (UGC) Developer specializing in ROBLOX and Fortnite. Creating realistic maps using Unreal Engine, developing immersive game environments, and implementing engaging gameplay mechanics for diverse gaming platforms.
                        </p>
                      </div>
                      
                      <div className="relative pl-8 pb-5 before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-tech-pink/30">
                        <div className="absolute left-0 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-tech-pink -translate-x-1/2 mt-1">
                          <span className="w-2 h-2 bg-white rounded-full"></span>
                        </div>
                        
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                          <div>
                            <h3 className="text-xl font-bold text-tech-pink">Game Development Lead</h3>
                            <p className="text-gray-300">College Game Development Club</p>
                          </div>
                          <div className="mt-2 md:mt-0">
                            <span className="inline-block px-3 py-1 bg-tech-pink/20 text-tech-pink text-sm rounded-full">
                              2023 - Present
                            </span>
                          </div>
                        </div>
                        
                        <p className="mt-3 text-gray-300">
                          Led a team of student developers to create interactive games using Unity and Roblox. Managed project timelines, assigned tasks, and conducted code reviews. Successfully delivered three game projects for college events.
                        </p>
                      </div>
                      
                      <div className="relative pl-8 pb-5 before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-tech-pink/30">
                        <div className="absolute left-0 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-tech-pink -translate-x-1/2 mt-1">
                          <span className="w-2 h-2 bg-white rounded-full"></span>
                        </div>
                        
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                          <div>
                            <h3 className="text-xl font-bold text-tech-pink">Electronics Project Intern</h3>
                            <p className="text-gray-300">Summer Internship Program</p>
                          </div>
                          <div className="mt-2 md:mt-0">
                            <span className="inline-block px-3 py-1 bg-tech-pink/20 text-tech-pink text-sm rounded-full">
                              Summer 2023
                            </span>
                          </div>
                        </div>
                        
                        <p className="mt-3 text-gray-300">
                          Participated in a summer internship focused on electronics projects. Designed and implemented a Line Follower Robot with PID control algorithm. Learned industry-standard design practices and documentation.
                        </p>
                      </div>
                      
                      <div className="relative pl-8 before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-tech-lightBlue/30">
                        <div className="absolute left-0 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-tech-lightBlue -translate-x-1/2 mt-1">
                          <span className="w-2 h-2 bg-white rounded-full"></span>
                        </div>
                        
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                          <div>
                            <h3 className="text-xl font-bold text-tech-lightBlue">Workshop Coordinator</h3>
                            <p className="text-gray-300">College Technical Festival</p>
                          </div>
                          <div className="mt-2 md:mt-0">
                            <span className="inline-block px-3 py-1 bg-tech-lightBlue/20 text-tech-lightBlue text-sm rounded-full">
                              2022
                            </span>
                          </div>
                        </div>
                        
                        <p className="mt-3 text-gray-300">
                          Organized and coordinated technical workshops on Arduino programming and basic game development. Managed a team of volunteers and ensured smooth execution of workshop sessions for over 100 participants.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* LYRA with resume context */}
      <Lyra initialMessage="This is Dhananjay's resume section! You can explore his education, skills, certifications, and experience. You can also download his full PDF resume using the button on the left." />
    </main>
  );
};

export default Resume;
