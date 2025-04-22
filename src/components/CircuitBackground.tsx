
/**
 * Circuit Background Component
 * 
 * Creates an animated electronic circuit pattern background with flowing lines and glowing dots.
 * 
 * Features:
 * - Dynamic circuit line generation
 * - Animated current flow effects
 * - Glowing intersection points
 * - Responsive to container size
 * 
 * Props:
 * - None
 * 
 * Implementation:
 * - Uses refs to track container dimensions
 * - Dynamically creates SVG-like elements
 * - Applies CSS animations for current flow
 * 
 * Usage:
 * ```tsx
 * <CircuitBackground />
 * ```
 * 
 * Styling:
 * - Uses utility classes defined in index.css
 * - CSS animations for flowing effects
 * 
 * @component
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
    
    // Create flowing circuit lines with multiple points and intersections
    for (let i = 0; i < 25; i++) {
      // Create horizontal lines with enhanced glow
      const hLine = document.createElement('div');
      hLine.className = 'circuit-line';
      
      const top = Math.random() * containerRect.height;
      const left = Math.random() * containerRect.width * 0.8;
      const width = Math.random() * containerRect.width * 0.5 + 100;
      
      hLine.style.top = `${top}px`;
      hLine.style.left = `${left}px`;
      hLine.style.width = `${width}px`;
      hLine.style.height = '2px';
      hLine.style.boxShadow = '0 0 10px rgba(139,92,246,0.3)';
      
      // Add flowing current effect
      const flow = document.createElement('div');
      flow.className = 'circuit-flow';
      hLine.appendChild(flow);
      
      container.appendChild(hLine);
      
      // Add glowing points along the horizontal line
      for (let j = 0; j < width / 40; j++) {
        const point = document.createElement('div');
        point.className = 'circuit-dot';
        point.style.left = `${j * 40}px`;
        point.style.boxShadow = '0 0 15px rgba(139,92,246,0.5)';
        hLine.appendChild(point);
      }
      
      // Create vertical lines with enhanced glow
      const vLine = document.createElement('div');
      vLine.className = 'circuit-line';
      
      const vTop = Math.random() * containerRect.height * 0.8;
      const vLeft = Math.random() * containerRect.width;
      const height = Math.random() * containerRect.height * 0.5 + 100;
      
      vLine.style.top = `${vTop}px`;
      vLine.style.left = `${vLeft}px`;
      vLine.style.width = '2px';
      vLine.style.height = `${height}px`;
      vLine.style.boxShadow = '0 0 10px rgba(139,92,246,0.3)';
      
      // Add vertical flowing current
      const vFlow = document.createElement('div');
      vFlow.className = 'circuit-flow-vertical';
      vLine.appendChild(vFlow);
      
      container.appendChild(vLine);
      
      // Add glowing points along the vertical line
      for (let j = 0; j < height / 40; j++) {
        const point = document.createElement('div');
        point.className = 'circuit-dot';
        point.style.top = `${j * 40}px`;
        point.style.boxShadow = '0 0 15px rgba(139,92,246,0.5)';
        vLine.appendChild(point);
      }
    }
    
    // Create additional glowing intersection points
    for (let i = 0; i < 50; i++) {
      const point = document.createElement('div');
      point.className = 'circuit-dot';
      
      const top = Math.random() * containerRect.height;
      const left = Math.random() * containerRect.width;
      
      point.style.top = `${top}px`;
      point.style.left = `${left}px`;
      point.style.boxShadow = '0 0 20px rgba(139,92,246,0.6)';
      
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
