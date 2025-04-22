import { useEffect, useRef } from 'react';

/**
 * CircuitBackground Component
 * 
 * Creates an animated tech-themed background with electronic components and circuit lines.
 * 
 * Features:
 * - Multiple depth layers (0.2, 0.4, 0.6, 0.8, 1.0) for 3D effect
 * - Electronic components with animations:
 *   - Raspberry Pi with GPIO pins and LED
 *   - ESP32 with WiFi antenna
 *   - Arduino with status LED
 *   - PC components with heatsink
 * - Complex circuit patterns with:
 *   - Intersecting lines
 *   - Junction points
 *   - Flow animations
 *   - Gradient effects
 * 
 * Animation configuration:
 * - Components per layer: 2 * depth (reduced for performance)
 * - Circuit lines per layer: 6 * depth (optimized)
 * - Movement speed: 0.006 (increased for more dynamic feel)
 * 
 * @component
 */
const CircuitBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    
    container.innerHTML = '';
    
    const layers = [0.2, 0.4, 0.6, 0.8, 1];
    
    layers.forEach((depth) => {
      const layerDiv = document.createElement('div');
      layerDiv.className = 'absolute inset-0 transform-style-3d';
      
      // Create electronic components (reduced quantity)
      for (let i = 0; i < Math.floor(2 * depth); i++) {
        // Create Raspberry Pi with pulsing LED indicator
        const rpi = document.createElement('div');
        rpi.className = 'electronic-component raspberry-pi';
        rpi.style.top = `${Math.random() * containerRect.height}px`;
        rpi.style.left = `${Math.random() * containerRect.width}px`;
        rpi.style.transform = `scale(${depth}) rotate(${Math.random() * 360}deg)`;
        rpi.style.opacity = `${depth}`;
        rpi.style.boxShadow = `0 0 ${20 * depth}px rgba(139,92,246,${0.3 * depth})`; // Enhanced glow
        
        // Add pulsing power LED
        const powerLED = document.createElement('div');
        powerLED.className = 'absolute w-1 h-1 rounded-full bg-green-500 animate-pulse';
        powerLED.style.top = '5px';
        powerLED.style.right = '5px';
        rpi.appendChild(powerLED);
        
        // Add USB ports and GPIO pins to Raspberry Pi
        for (let p = 0; p < 4; p++) {
          const usb = document.createElement('div');
          usb.className = 'usb-port';
          rpi.appendChild(usb);
        }
        
        // Add GPIO pins
        const gpio = document.createElement('div');
        gpio.className = 'gpio-pins';
        for (let p = 0; p < 40; p++) {
          const pin = document.createElement('div');
          pin.className = 'gpio-pin';
          gpio.appendChild(pin);
        }
        rpi.appendChild(gpio);
        
        layerDiv.appendChild(rpi);
        
        // Create ESP32 with WiFi animation
        const esp32 = document.createElement('div');
        esp32.className = 'electronic-component esp32';
        esp32.style.top = `${Math.random() * containerRect.height}px`;
        esp32.style.left = `${Math.random() * containerRect.width}px`;
        esp32.style.transform = `scale(${depth}) rotate(${Math.random() * 360}deg)`;
        esp32.style.opacity = `${depth}`;
        esp32.style.boxShadow = `0 0 ${20 * depth}px rgba(139,92,246,${0.3 * depth})`; // Enhanced glow
        
        // Add ripple effect for WiFi
        const ripple = document.createElement('div');
        ripple.className = 'absolute inset-0 border-2 border-tech-purple/30 rounded-lg animate-ping';
        esp32.appendChild(ripple);
        
        // Add WiFi antenna pattern
        const antenna = document.createElement('div');
        antenna.className = 'wifi-antenna';
        esp32.appendChild(antenna);
        
        layerDiv.appendChild(esp32);
        
        // Create Arduino with blinking status LED
        const arduino = document.createElement('div');
        arduino.className = 'electronic-component arduino';
        arduino.style.top = `${Math.random() * containerRect.height}px`;
        arduino.style.left = `${Math.random() * containerRect.width}px`;
        arduino.style.transform = `scale(${depth}) rotate(${Math.random() * 360}deg)`;
        arduino.style.opacity = `${depth}`;
        arduino.style.boxShadow = `0 0 ${20 * depth}px rgba(139,92,246,${0.3 * depth})`; // Enhanced glow
        
        // Add blinking LED
        const statusLED = document.createElement('div');
        statusLED.className = 'absolute w-1 h-1 rounded-full bg-orange-500';
        statusLED.style.animation = 'blink 1s ease-in-out infinite';
        statusLED.style.top = '3px';
        statusLED.style.left = '3px';
        arduino.appendChild(statusLED);
        
        // Add Arduino pins
        for (let p = 0; p < 14; p++) {
          const pin = document.createElement('div');
          pin.className = 'arduino-pin';
          arduino.appendChild(pin);
        }
        
        layerDiv.appendChild(arduino);
        
        // Create PC Components with gradient effect
        const pcComponent = document.createElement('div');
        pcComponent.className = 'electronic-component pc-component';
        pcComponent.style.top = `${Math.random() * containerRect.height}px`;
        pcComponent.style.left = `${Math.random() * containerRect.width}px`;
        pcComponent.style.transform = `scale(${depth}) rotate(${Math.random() * 360}deg)`;
        pcComponent.style.opacity = `${depth}`;
        pcComponent.style.boxShadow = `0 0 ${20 * depth}px rgba(139,92,246,${0.3 * depth})`; // Enhanced glow
        pcComponent.style.background = `linear-gradient(45deg, rgba(139,92,246,${0.2 * depth}), rgba(139,92,246,${0.1 * depth}))`;
        
        // Add heatsink pattern
        const heatsink = document.createElement('div');
        heatsink.className = 'heatsink-pattern';
        for (let h = 0; h < 6; h++) {
          const fin = document.createElement('div');
          fin.className = 'heatsink-fin';
          heatsink.appendChild(fin);
        }
        pcComponent.appendChild(heatsink);
        
        layerDiv.appendChild(pcComponent);
      }
      
      // Create enhanced circuit patterns
      for (let i = 0; i < Math.floor(6 * depth); i++) {
        // Create circuit junctions
        const junction = document.createElement('div');
        junction.className = 'absolute w-3 h-3 rounded-full';
        junction.style.top = `${Math.random() * containerRect.height}px`;
        junction.style.left = `${Math.random() * containerRect.width}px`;
        junction.style.background = `radial-gradient(circle at center, rgba(139,92,246,${0.6 * depth}), rgba(139,92,246,0))`;
        junction.style.boxShadow = `0 0 ${15 * depth}px rgba(139,92,246,${0.4 * depth})`;
        layerDiv.appendChild(junction);
        
        // Create branching circuit lines from junctions
        const branches = Math.floor(Math.random() * 3) + 2; // 2-4 branches per junction
        for (let b = 0; b < branches; b++) {
          const line = document.createElement('div');
          line.className = 'circuit-line absolute';
          
          const angle = (b * 360 / branches) + (Math.random() * 30 - 15);
          const length = Math.random() * 150 + 50;
          
          line.style.width = `${length}px`;
          line.style.height = '2px';
          line.style.top = `${parseFloat(junction.style.top) + 1.5}px`;
          line.style.left = `${parseFloat(junction.style.left) + 1.5}px`;
          line.style.transformOrigin = 'left center';
          line.style.transform = `rotate(${angle}deg)`;
          line.style.background = `linear-gradient(90deg, rgba(139,92,246,${0.5 * depth}), rgba(139,92,246,${0.3 * depth}))`;
          line.style.boxShadow = `0 0 ${10 * depth}px rgba(139,92,246,${0.3 * depth})`;
          
          // Add flowing current effect
          const flow = document.createElement('div');
          flow.className = 'circuit-flow';
          flow.style.animationDuration = `${2 / depth}s`;
          line.appendChild(flow);
          
          layerDiv.appendChild(line);
        }
      }
      
      container.appendChild(layerDiv);
    });

    // Enhanced movement animation with faster speed
    let time = 0;
    const animate = () => {
      time += 0.006; // Increased speed
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
    
    // Handle window resize
    const handleResize = () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
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
