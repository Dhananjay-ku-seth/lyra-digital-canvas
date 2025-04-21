
import { useEffect, useRef } from 'react';

// This component creates the animated circuit background
const CircuitBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    
    // Clear any existing elements
    container.innerHTML = '';
    
    // Create horizontal and vertical lines
    const linesCount = Math.floor(containerRect.width / 100);
    
    // Create horizontal lines
    for (let i = 0; i < 15; i++) {
      const line = document.createElement('div');
      line.className = 'circuit-line';
      
      // Randomize positions
      const top = Math.random() * containerRect.height;
      const left = Math.random() * containerRect.width * 0.8;
      const width = Math.random() * containerRect.width * 0.5 + 50;
      
      line.style.top = `${top}px`;
      line.style.left = `${left}px`;
      line.style.width = `${width}px`;
      line.style.height = '1px';
      
      container.appendChild(line);
      
      // Add pulse effect for some lines
      if (Math.random() > 0.7) {
        const pulse = document.createElement('div');
        pulse.className = 'circuit-pulse animate-flow-right';
        line.appendChild(pulse);
      }
    }
    
    // Create vertical lines
    for (let i = 0; i < 15; i++) {
      const line = document.createElement('div');
      line.className = 'circuit-line';
      
      // Randomize positions
      const top = Math.random() * containerRect.height * 0.8;
      const left = Math.random() * containerRect.width;
      const height = Math.random() * containerRect.height * 0.5 + 50;
      
      line.style.top = `${top}px`;
      line.style.left = `${left}px`;
      line.style.width = '1px';
      line.style.height = `${height}px`;
      
      container.appendChild(line);
      
      // Add pulse effect for some lines
      if (Math.random() > 0.7) {
        const pulse = document.createElement('div');
        pulse.className = 'circuit-pulse animate-flow-up';
        line.appendChild(pulse);
      }
    }
    
    // Create intersection dots
    for (let i = 0; i < 20; i++) {
      const dot = document.createElement('div');
      dot.className = 'circuit-dot';
      
      // Randomize positions
      const top = Math.random() * containerRect.height;
      const left = Math.random() * containerRect.width;
      
      dot.style.top = `${top}px`;
      dot.style.left = `${left}px`;
      
      container.appendChild(dot);
    }
    
    // Create animation interval to randomly add new pulses
    const intervalId = setInterval(() => {
      const lines = container.querySelectorAll('.circuit-line');
      if (lines.length === 0) return;
      
      // Select a random line
      const randomLine = lines[Math.floor(Math.random() * lines.length)];
      
      // Check if it already has a pulse
      const existingPulse = randomLine.querySelector('.circuit-pulse');
      if (existingPulse) return;
      
      const pulse = document.createElement('div');
      pulse.className = (randomLine as HTMLElement).style.height === '1px' 
        ? 'circuit-pulse animate-flow-right'
        : 'circuit-pulse animate-flow-up';
        
      randomLine.appendChild(pulse);
      
      // Remove pulse after animation
      setTimeout(() => {
        if (randomLine.contains(pulse)) {
          randomLine.removeChild(pulse);
        }
      }, 3000);
      
    }, 800);
    
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-30"
      aria-hidden="true"
    />
  );
};

export default CircuitBackground;
