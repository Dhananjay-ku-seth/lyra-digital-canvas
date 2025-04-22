
/**
 * CircuitBackground Component
 * 
 * Creates an animated circuit board background with electronic components and PCB-like traces.
 * 
 * Features:
 * - Multiple depth layers for 3D effect
 * - Electronic components with indicators:
 *   - ICs with pin connections
 *   - SMD components
 *   - Through-hole components
 *   - LED indicators
 * - PCB trace patterns:
 *   - Perpendicular intersections
 *   - T-junctions
 *   - Vias (circuit board holes)
 *   - Curved traces
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
    
    container.innerHTML = '';
    
    // Create layers with different depths for 3D effect
    const layers = [0.2, 0.4, 0.6, 0.8, 1];
    
    layers.forEach((depth) => {
      const layerDiv = document.createElement('div');
      layerDiv.className = 'absolute inset-0 transform-style-3d';
      
      // Create PCB components (ICs, resistors, capacitors)
      for (let i = 0; i < Math.floor(2 * depth); i++) {
        // Create IC chip
        const ic = document.createElement('div');
        ic.className = 'electronic-component ic-chip';
        ic.style.top = `${Math.random() * containerRect.height}px`;
        ic.style.left = `${Math.random() * containerRect.width}px`;
        ic.style.transform = `scale(${depth}) rotate(${Math.random() * 360}deg)`;
        ic.style.opacity = `${depth}`;
        ic.style.boxShadow = `0 0 ${20 * depth}px rgba(139,92,246,${0.3 * depth})`;
        
        // Add IC pins
        const pinsContainer = document.createElement('div');
        pinsContainer.className = 'pins-container';
        for (let p = 0; p < 8; p++) {
          const pin = document.createElement('div');
          pin.className = 'ic-pin';
          pinsContainer.appendChild(pin);
        }
        ic.appendChild(pinsContainer);
        
        // Add status LED
        const led = document.createElement('div');
        led.className = 'absolute w-1 h-1 rounded-full bg-tech-purple animate-pulse';
        led.style.top = '2px';
        led.style.right = '2px';
        ic.appendChild(led);
        
        layerDiv.appendChild(ic);
        
        // Create SMD component
        const smd = document.createElement('div');
        smd.className = 'electronic-component smd';
        smd.style.top = `${Math.random() * containerRect.height}px`;
        smd.style.left = `${Math.random() * containerRect.width}px`;
        smd.style.transform = `scale(${depth}) rotate(${Math.random() * 360}deg)`;
        smd.style.opacity = `${depth}`;
        layerDiv.appendChild(smd);
      }
      
      // Create circuit traces with realistic patterns
      for (let i = 0; i < Math.floor(8 * depth); i++) {
        // Create trace junction
        const junction = document.createElement('div');
        junction.className = 'circuit-junction';
        junction.style.top = `${Math.random() * containerRect.height}px`;
        junction.style.left = `${Math.random() * containerRect.width}px`;
        
        // Create via (circuit board hole)
        const via = document.createElement('div');
        via.className = 'via-hole';
        via.style.background = `radial-gradient(circle at center, 
          rgba(139,92,246,${0.6 * depth}), 
          rgba(139,92,246,0))`;
        junction.appendChild(via);
        
        // Create branching traces
        const branches = Math.floor(Math.random() * 3) + 2;
        for (let b = 0; b < branches; b++) {
          const trace = document.createElement('div');
          trace.className = 'circuit-trace';
          
          // Create perpendicular or angled traces
          const angle = Math.round(b * 90 / branches);
          const length = Math.random() * 100 + 50;
          
          trace.style.width = `${length}px`;
          trace.style.height = '2px';
          trace.style.top = '50%';
          trace.style.left = '50%';
          trace.style.transformOrigin = 'left center';
          trace.style.transform = `rotate(${angle}deg)`;
          
          // Add gradient and glow effects
          trace.style.background = `linear-gradient(90deg, 
            rgba(139,92,246,${0.5 * depth}), 
            rgba(139,92,246,${0.3 * depth}))`;
          trace.style.boxShadow = `0 0 ${10 * depth}px rgba(139,92,246,${0.3 * depth})`;
          
          // Add current flow animation
          const current = document.createElement('div');
          current.className = 'current-flow';
          current.style.animationDuration = `${2 / depth}s`;
          trace.appendChild(current);
          
          junction.appendChild(trace);
        }
        
        layerDiv.appendChild(junction);
      }
      
      container.appendChild(layerDiv);
    });

    // Enhanced 3D movement animation
    let time = 0;
    const animate = () => {
      time += 0.006;
      const layers = container.children;
      
      Array.from(layers).forEach((layer, index) => {
        const depth = (index + 1) * 0.2;
        const moveX = Math.sin(time) * 25 * depth;
        const moveY = Math.cos(time * 1.5) * 20 * depth;
        const rotateX = Math.cos(time * 0.8) * 8 * depth;
        const rotateY = Math.sin(time * 0.6) * 8 * depth;
        
        (layer as HTMLElement).style.transform = 
          `translateX(${moveX}px) translateY(${moveY}px) 
           translateZ(${-50 * depth}px) 
           rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup on unmount
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-30
                perspective-2000 transform-style-3d bg-tech-dark"
      aria-hidden="true"
    />
  );
};

export default CircuitBackground;
