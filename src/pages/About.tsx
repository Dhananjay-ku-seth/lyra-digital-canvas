
/**
 * About Component
 * 
 * This page displays comprehensive information about Dhananjay Kumar Seth, including:
 * - Profile section with avatar and personal details (left column)
 * - Detailed biography (right column, top)
 * - Education timeline (right column, bottom)
 * 
 * Component Structure:
 * ├── Container
 * │   ├── Title Section
 * │   └── Grid Layout
 * │       ├── Left Column (Profile)
 * │       │   ├── Avatar
 * │       │   └── Personal Details
 * │       └── Right Column
 * │           ├── Biography Section
 * │           └── Education Timeline
 * └── Lyra AI Assistant
 * 
 * Styling:
 * - Uses CSS Grid for responsive layout
 * - Implements smooth animations for content entry
 * - Uses custom tech-themed styling with circuit background
 * - All cards use backdrop blur and hover effects
 * 
 * To modify:
 * 1. Personal details: Update the content in the left column sections
 * 2. Biography: Modify the text content in the biography section
 * 3. Education: Update the timeline items in the education section
 * 4. Styling: Adjust the card-hover and animation classes as needed
 */

import CircuitBackground from '@/components/CircuitBackground';
import Lyra from '@/components/Lyra';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Analytics } from "@vercel/analytics/next";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow pt-20 pb-16 relative">
        {/* Circuit pattern background */}
        <CircuitBackground />
        
        <div className="container-custom">
          {/* Page title with centered styling */}
          <h1 className="section-heading text-center mx-auto">About Me</h1>
          
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left column - Profile & Personal Details */}
            <div className="col-span-1 animate-fade-in">
              <div className="bg-tech-dark/80 backdrop-blur-md p-6 rounded-lg border border-tech-purple/20 card-hover">
                {/* Profile Avatar using Shadcn UI Avatar component */}
                <div className="mx-auto w-48 h-48 mb-6">
                  <Avatar className="w-full h-full">
                    <AvatarImage 
                      src="/lovable-uploads/e5f4b321-f34c-4da6-b18c-f30dc80f0919.png" 
                      alt="Dhananjay Kumar Seth" 
                      className="object-cover rounded-full"
                    />
                    <AvatarFallback>DKS</AvatarFallback>
                  </Avatar>
                </div>
                
                {/* Detailed personal information section */}
                <div className="space-y-4 mt-6">
                  {/* Full Name */}
                  <div className="border-b border-tech-purple/20 pb-3">
                    <h3 className="text-sm uppercase text-gray-400 mb-1">Full Name</h3>
                    <p className="text-lg font-medium">Dhananjay Kumar Seth</p>
                  </div>
                  
                  {/* Branch - Updated to remove 4th year */}
                  <div className="border-b border-tech-purple/20 pb-3">
                    <h3 className="text-sm uppercase text-gray-400 mb-1">Branch</h3>
                    <p className="text-lg font-medium">Electronics and Communication Engineering</p>
                  </div>
                  
                  {/* College Details */}
                  <div className="border-b border-tech-purple/20 pb-3">
                    <h3 className="text-sm uppercase text-gray-400 mb-1">College</h3>
                    <p className="text-lg font-medium">GITA Autonomous College</p>
                    <p className="text-gray-400">Bhubaneswar, Odisha</p>
                  </div>
                  
                  {/* Main Skills with colored tags */}
                  <div>
                    <h3 className="text-sm uppercase text-gray-400 mb-1">Main Skills</h3>
                    <ul className="flex flex-wrap gap-2 mt-2">
                      <li className="px-3 py-1 bg-tech-purple/20 rounded-full text-tech-purple text-sm">Game Development</li>
                      <li className="px-3 py-1 bg-tech-pink/20 rounded-full text-tech-pink text-sm">Electronics Engineering</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right column - Biography & Education */}
            <div className="col-span-1 lg:col-span-2 space-y-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {/* Biography Section - Updated to remove 4th year */}
              <div className="bg-tech-dark/80 backdrop-blur-md p-6 rounded-lg border border-tech-purple/20 card-hover">
                <h2 className="text-2xl font-bold mb-4 text-tech-lightBlue">Biography</h2>
                <div className="space-y-4 text-gray-300">
                  <p>
                    I'm Dhananjay Kumar Seth, an Electronics and Communication Engineering student at GITA Autonomous College, Bhubaneswar.
                    Currently working as a UGC Developer at Gaurav Go Games, I specialize in creating user-generated content for ROBLOX and Fortnite, with a focus on realistic map design using Unreal Engine.
                  </p>
                  <p>
                    My professional journey merges technology with creativity, combining Game Development expertise with Electronics Engineering fundamentals.
                    I'm passionate about developing immersive gaming experiences and exploring the intersections of hardware and software to create innovative solutions.
                  </p>
                  <p>
                    Through hands-on projects and staying current with industry trends, I continuously enhance my skills in game development and electronics.
                    My goal is to leverage my technical expertise to create meaningful and engaging experiences that push the boundaries of interactive entertainment.
                  </p>
                </div>
              </div>
              
              {/* Education Timeline */}
              <div className="bg-tech-dark/80 backdrop-blur-md p-6 rounded-lg border border-tech-purple/20 card-hover">
                <h2 className="text-2xl font-bold mb-6 text-tech-lightBlue">Education Timeline</h2>
                
                {/* Timeline with vertical line and progress indicators */}
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-1/2 before:h-full before:w-0.5 before:bg-tech-purple/30">
                  {/* College Education */}
                  <div className="relative flex items-start pl-8">
                    <span className="absolute left-0 flex items-center justify-center w-10 h-10 rounded-full bg-tech-purple text-white ring-4 ring-tech-dark">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                      </svg>
                    </span>
                    
                    <div className="ml-4">
                      <h3 className="text-xl font-bold">B.Tech in Electronics and Communication Engineering</h3>
                      <p className="text-tech-purple">GITA Autonomous College, Bhubaneswar</p>
                      <p className="text-gray-400">2022 - Present</p>
                      <p className="mt-2 text-gray-300">Currently pursuing my undergraduate degree with focus on electronics and communication systems.</p>
                    </div>
                  </div>
                  
                  {/* Higher Secondary Education */}
                  <div className="relative flex items-start pl-8">
                    <span className="absolute left-0 flex items-center justify-center w-10 h-10 rounded-full bg-tech-pink text-white ring-4 ring-tech-dark">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </span>
                    
                    <div className="ml-4">
                      <h3 className="text-xl font-bold">Higher Secondary Education</h3>
                      <p className="text-tech-pink">Vikash Group of Institute, Bargarh</p>
                      <p className="text-gray-400">Completed in 2022</p>
                      <p className="mt-2 text-gray-300">Completed my +2 education with strong foundation in science and mathematics.</p>
                    </div>
                  </div>
                  
                  {/* Secondary Education */}
                  <div className="relative flex items-start pl-8">
                    <span className="absolute left-0 flex items-center justify-center w-10 h-10 rounded-full bg-tech-lightBlue text-white ring-4 ring-tech-dark">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </span>
                    
                    <div className="ml-4">
                      <h3 className="text-xl font-bold">Secondary Education</h3>
                      <p className="text-tech-lightBlue">Kendriya Vidyalaya, Barmer</p>
                      <p className="text-gray-400">Rajasthan</p>
                      <p className="mt-2 text-gray-300">Completed my 10th standard education with distinction.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* LYRA AI Assistant */}
        <Lyra initialMessage="This is Dhananjay's About section. Would you like to know more about his education or skills? Feel free to ask me anything!" />
      </main>
    </div>
  );
};

export default About;
