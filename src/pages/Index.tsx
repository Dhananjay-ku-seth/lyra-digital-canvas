import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import SideDots from '@/components/SideDots';
import CircuitBoard from '@/components/CircuitBoard';
import FloatingParts from '@/components/FloatingParts';
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

  // Scroll to a section when the address gets a new #hash, or when a component asks for it with state.scroll.
  // (Changing filters rewrites the address too, and must not make the page jump.)
  const { hash, key, state } = useLocation();
  const lastHash = useRef('');
  useEffect(() => {
    const wants = hash && (hash !== lastHash.current || (state as { scroll?: boolean } | null)?.scroll);
    lastHash.current = hash;
    if (!wants) return undefined;
    const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView(), 60);
    return () => clearTimeout(t);
  }, [hash, key, state]);

  return (
    <MotionEffects>
    <div className="relative">
      <div className="site-bg" aria-hidden="true">
        <div className="orb orb-a" />
        <div className="orb orb-b" />
        <div className="orb orb-c" />
      </div>
      <CircuitBoard />
      <FloatingParts />
      <SiteNav />
      <SideDots />
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
