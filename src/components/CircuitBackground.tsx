
import { useEffect, useRef } from 'react';

const CircuitBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    
    // Clear existing elements
    container.innerHTML = '';
    
    // Create multiple layers for depth effect with more pronounced differences
    const layers = [0.2, 0.4, 0.6, 0.8, 1];
    
    layers.forEach((depth) => {
      const layerDiv = document.createElement('div');
      layerDiv.className = 'absolute inset-0 transform-style-3d';
      
      // Create electronic components (ICs, capacitors, etc)
      for (let i = 0; i < Math.floor(5 * depth); i++) {
        const ic = document.createElement('div');
        ic.className = 'electronic-component';
        ic.style.top = `${Math.random() * containerRect.height}px`;
        ic.style.left = `${Math.random() * containerRect.width}px`;
        ic.style.transform = `scale(${depth}) rotate(${Math.random() * 360}deg)`;
        ic.style.opacity = `${depth}`;
        
        // Add pins to ICs
        for (let p = 0; p < 8; p++) {
          const pin = document.createElement('div');
          pin.className = 'component-pin';
          ic.appendChild(pin);
        }
        
        layerDiv.appendChild(ic);
      }
      
      // Create thicker circuit lines with enhanced glow
      for (let i = 0; i < Math.floor(12 * depth); i++) {
        // Horizontal lines with increased thickness
        const hLine = document.createElement('div');
        hLine.className = 'circuit-line';
        
        const top = Math.random() * containerRect.height;
        const left = Math.random() * containerRect.width * 0.8;
        const width = Math.random() * containerRect.width * 0.6 + 100;
        
        hLine.style.top = `${top}px`;
        hLine.style.left = `${left}px`;
        hLine.style.width = `${width}px`;
        hLine.style.height = '4px'; // Increased thickness
        hLine.style.boxShadow = `0 0 ${20 * depth}px rgba(139,92,246,${0.4 * depth})`;
        hLine.style.opacity = `${depth}`;
        
        // Enhanced flowing current effect
        const flow = document.createElement('div');
        flow.className = 'circuit-flow';
        flow.style.animationDuration = `${4 / depth}s`;
        hLine.appendChild(flow);
        
        layerDiv.appendChild(hLine);
        
        // Add larger connection points
        for (let j = 0; j < width / 50; j++) {
          const point = document.createElement('div');
          point.className = 'circuit-dot';
          point.style.left = `${j * 50}px`;
          point.style.boxShadow = `0 0 ${25 * depth}px rgba(139,92,246,${0.6 * depth})`;
          point.style.transform = `scale(${depth * 1.5})`; // Larger dots
          hLine.appendChild(point);
        }
        
        // Vertical lines with increased thickness
        const vLine = document.createElement('div');
        vLine.className = 'circuit-line';
        
        const vTop = Math.random() * containerRect.height * 0.8;
        const vLeft = Math.random() * containerRect.width;
        const height = Math.random() * containerRect.height * 0.6 + 100;
        
        vLine.style.top = `${vTop}px`;
        vLine.style.left = `${vLeft}px`;
        vLine.style.width = '4px'; // Increased thickness
        vLine.style.height = `${height}px`;
        vLine.style.boxShadow = `0 0 ${20 * depth}px rgba(139,92,246,${0.4 * depth})`;
        vLine.style.opacity = `${depth}`;
        
        // Enhanced vertical flow
        const vFlow = document.createElement('div');
        vFlow.className = 'circuit-flow-vertical';
        vFlow.style.animationDuration = `${4 / depth}s`;
        vLine.appendChild(vFlow);
        
        layerDiv.appendChild(vLine);
        
        // Add larger connection points to vertical lines
        for (let j = 0; j < height / 50; j++) {
          const point = document.createElement('div');
          point.className = 'circuit-dot';
          point.style.top = `${j * 50}px`;
          point.style.boxShadow = `0 0 ${25 * depth}px rgba(139,92,246,${0.6 * depth})`;
          point.style.transform = `scale(${depth * 1.5})`; // Larger dots
          vLine.appendChild(point);
        }
      }
      
      container.appendChild(layerDiv);
    });

    // Automatic rotation and movement animation
    let time = 0;
    const animate = () => {
      time += 0.002;
      const layers = container.children;
      
      Array.from(layers).forEach((layer, index) => {
        const depth = (index + 1) * 0.2;
        const moveX = Math.sin(time) * 20 * depth;
        const moveY = Math.cos(time * 1.3) * 15 * depth;
        const rotateX = Math.cos(time * 0.7) * 5 * depth;
        const rotateY = Math.sin(time * 0.5) * 5 * depth;
        
        (layer as HTMLElement).style.transform = 
          `translateX(${moveX}px) translateY(${moveY}px) 
           translateZ(${-50 * depth}px) 
           rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
        // Reinitialize the background
        containerRef.current.dispatchEvent(new Event('mount'));
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-30
                perspective-2000 transform-style-3d"
      aria-hidden="true"
    />
  );
};

export default CircuitBackground;
