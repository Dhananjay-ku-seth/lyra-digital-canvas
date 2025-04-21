
/**
 * CircuitBackground Component
 * 
 * Creates an animated tech-themed background with:
 * - Circuit-like lines
 * - Flowing current effects
 * - Pulsing intersection points
 * - Multiple layers of animation
 */
import { useEffect, useRef } from 'react';

const CircuitBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    
    // Clear existing elements
    container.innerHTML = '';
    
    // Create flowing circuit lines
    for (let i = 0; i < 20; i++) {
      // Create horizontal lines with flow
      const hLine = document.createElement('div');
      hLine.className = 'circuit-line';
      
      const top = Math.random() * containerRect.height;
      const left = Math.random() * containerRect.width * 0.8;
      const width = Math.random() * containerRect.width * 0.5 + 50;
      
      hLine.style.top = `${top}px`;
      hLine.style.left = `${left}px`;
      hLine.style.width = `${width}px`;
      hLine.style.height = '2px';
      
      // Add flowing current effect
      const flow = document.createElement('div');
      flow.className = 'circuit-flow';
      hLine.appendChild(flow);
      
      container.appendChild(hLine);
      
      // Create vertical lines with flow
      const vLine = document.createElement('div');
      vLine.className = 'circuit-line';
      
      const vTop = Math.random() * containerRect.height * 0.8;
      const vLeft = Math.random() * containerRect.width;
      const height = Math.random() * containerRect.height * 0.5 + 50;
      
      vLine.style.top = `${vTop}px`;
      vLine.style.left = `${vLeft}px`;
      vLine.style.width = '2px';
      vLine.style.height = `${height}px`;
      
      // Add vertical flowing current
      const vFlow = document.createElement('div');
      vFlow.className = 'circuit-flow-vertical';
      vLine.appendChild(vFlow);
      
      container.appendChild(vLine);
    }
    
    // Create intersection points
    for (let i = 0; i < 30; i++) {
      const point = document.createElement('div');
      point.className = 'circuit-point';
      
      const top = Math.random() * containerRect.height;
      const left = Math.random() * containerRect.width;
      
      point.style.top = `${top}px`;
      point.style.left = `${left}px`;
      
      container.appendChild(point);
    }
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
