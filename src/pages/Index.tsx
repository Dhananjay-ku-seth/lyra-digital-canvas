import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import { MotionEffects } from '@/components/Motion';
import { useSeo } from '@/hooks/useSeo';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import ProjectsSection from '@/sections/ProjectsSection';
import UnrealSection from '@/sections/UnrealSection';
import Skills from '@/sections/Skills';
import Experience from '@/sections/Experience';
import EducationSection from '@/sections/EducationSection';
import ContactSection from '@/sections/ContactSection';

const Index = () => {
  useSeo({
    title: 'Dhananjay Kumar Seth — ECE Engineer & Game Developer',
    description:
      'Portfolio of Dhananjay Kumar Seth: an Electronics & Communication Engineering student specialising in Computer Hardware Engineering, and Lead Game Developer at GauravGo Games, highly skilled in Unreal Engine map design, level design and game optimisation. Try interactive DSP, PID control, digital logic, communication-systems, power and EV-battery simulators, and see his game development work.',
  });

  // A link such as /#contact should land on that section even though the sections load after the route.
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    const t = setTimeout(() => document.getElementById(id)?.scrollIntoView(), 60);
    return () => clearTimeout(t);
  }, [hash]);

  return (
    <MotionEffects>
    <div className="relative">
      <div className="site-bg" aria-hidden="true">
        <div className="orb orb-a" />
        <div className="orb orb-b" />
        <div className="orb orb-c" />
      </div>
      <SiteNav />
      <main id="main">
        <Hero />
        <About />
        <UnrealSection />
        <ProjectsSection />
        <Skills />
        <Experience />
        <EducationSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
    </MotionEffects>
  );
};

export default Index;
