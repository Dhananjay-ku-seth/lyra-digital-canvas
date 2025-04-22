
/**
 * Enhanced 3D Circuit Background Component
 * 
 * Creates a realistic 3D electronic circuit pattern background with flowing lines,
 * glowing dots, and perspective effects.
 * 
 * Features:
 * - Dynamic 3D circuit line generation with depth
 * - Animated current flow effects with parallax
 * - Enhanced glowing intersection points
 * - Perspective-based movement
 * - Responsive to container size and mouse movement
 */

import { useEffect, useRef, useState } from 'react';

const CircuitBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    
    // Clear existing elements
    container.innerHTML = '';
    
    // Create multiple layers for depth effect
    const layers = [0.2, 0.4, 0.6, 0.8, 1];
    
    layers.forEach((depth) => {
      const layerDiv = document.createElement('div');
      layerDiv.className = 'absolute inset-0 transform-style-3d';
      layerDiv.style.transform = `translateZ(${depth * -50}px)`;
      
      // Create flowing circuit lines with enhanced 3D effect
      for (let i = 0; i < Math.floor(15 * depth); i++) {
        // Horizontal lines with depth
        const hLine = document.createElement('div');
        hLine.className = 'circuit-line';
        
        const top = Math.random() * containerRect.height;
        const left = Math.random() * containerRect.width * 0.8;
        const width = Math.random() * containerRect.width * 0.5 + 100;
        
        hLine.style.top = `${top}px`;
        hLine.style.left = `${left}px`;
        hLine.style.width = `${width}px`;
        hLine.style.height = '2px';
        hLine.style.boxShadow = `0 0 ${15 * depth}px rgba(139,92,246,${0.3 * depth})`;
        hLine.style.opacity = `${depth}`;
        
        // Add flowing current effect with depth
        const flow = document.createElement('div');
        flow.className = 'circuit-flow';
        flow.style.animationDuration = `${3 / depth}s`;
        hLine.appendChild(flow);
        
        layerDiv.appendChild(hLine);
        
        // Add glowing points with depth
        for (let j = 0; j < width / 40; j++) {
          const point = document.createElement('div');
          point.className = 'circuit-dot';
          point.style.left = `${j * 40}px`;
          point.style.boxShadow = `0 0 ${20 * depth}px rgba(139,92,246,${0.5 * depth})`;
          point.style.transform = `scale(${depth})`;
          hLine.appendChild(point);
        }
        
        // Vertical lines with depth
        const vLine = document.createElement('div');
        vLine.className = 'circuit-line';
        
        const vTop = Math.random() * containerRect.height * 0.8;
        const vLeft = Math.random() * containerRect.width;
        const height = Math.random() * containerRect.height * 0.5 + 100;
        
        vLine.style.top = `${vTop}px`;
        vLine.style.left = `${vLeft}px`;
        vLine.style.width = '2px';
        vLine.style.height = `${height}px`;
        vLine.style.boxShadow = `0 0 ${15 * depth}px rgba(139,92,246,${0.3 * depth})`;
        vLine.style.opacity = `${depth}`;
        
        // Add vertical flowing current with depth
        const vFlow = document.createElement('div');
        vFlow.className = 'circuit-flow-vertical';
        vFlow.style.animationDuration = `${3 / depth}s`;
        vLine.appendChild(vFlow);
        
        layerDiv.appendChild(vLine);
        
        // Add glowing points along vertical line with depth
        for (let j = 0; j < height / 40; j++) {
          const point = document.createElement('div');
          point.className = 'circuit-dot';
          point.style.top = `${j * 40}px`;
          point.style.boxShadow = `0 0 ${20 * depth}px rgba(139,92,246,${0.5 * depth})`;
          point.style.transform = `scale(${depth})`;
          vLine.appendChild(point);
        }
      }
      
      container.appendChild(layerDiv);
    });
    
    // Handle mouse movement for parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      setMousePosition({ x, y });
      
      const layers = containerRef.current.children;
      Array.from(layers).forEach((layer, index) => {
        const depth = index + 1;
        const moveX = x * 20 * depth;
        const moveY = y * 20 * depth;
        const rotateX = -y * 5 * depth;
        const rotateY = x * 5 * depth;
        
        (layer as HTMLElement).style.transform = 
          `translateX(${moveX}px) translateY(${moveY}px) 
           translateZ(${-50 * depth}px) 
           rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-30
                perspective-2000 transform-style-3d"
      style={{
        transform: `rotateX(${mousePosition.y * -5}deg) rotateY(${mousePosition.x * 5}deg)`
      }}
      aria-hidden="true"
    />
  );
};

export default CircuitBackground;
