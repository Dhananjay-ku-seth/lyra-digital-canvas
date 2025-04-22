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
      
      // Create electronic components (Raspberry Pi, ESP32, Arduino, PC parts)
      for (let i = 0; i < Math.floor(3 * depth); i++) {
        // Create Raspberry Pi
        const rpi = document.createElement('div');
        rpi.className = 'electronic-component raspberry-pi';
        rpi.style.top = `${Math.random() * containerRect.height}px`;
        rpi.style.left = `${Math.random() * containerRect.width}px`;
        rpi.style.transform = `scale(${depth}) rotate(${Math.random() * 360}deg)`;
        rpi.style.opacity = `${depth}`;
        
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
        
        // Create ESP32
        const esp32 = document.createElement('div');
        esp32.className = 'electronic-component esp32';
        esp32.style.top = `${Math.random() * containerRect.height}px`;
        esp32.style.left = `${Math.random() * containerRect.width}px`;
        esp32.style.transform = `scale(${depth}) rotate(${Math.random() * 360}deg)`;
        esp32.style.opacity = `${depth}`;
        
        // Add WiFi antenna pattern
        const antenna = document.createElement('div');
        antenna.className = 'wifi-antenna';
        esp32.appendChild(antenna);
        
        layerDiv.appendChild(esp32);
        
        // Create Arduino
        const arduino = document.createElement('div');
        arduino.className = 'electronic-component arduino';
        arduino.style.top = `${Math.random() * containerRect.height}px`;
        arduino.style.left = `${Math.random() * containerRect.width}px`;
        arduino.style.transform = `scale(${depth}) rotate(${Math.random() * 360}deg)`;
        arduino.style.opacity = `${depth}`;
        
        // Add Arduino pins
        for (let p = 0; p < 14; p++) {
          const pin = document.createElement('div');
          pin.className = 'arduino-pin';
          arduino.appendChild(pin);
        }
        
        layerDiv.appendChild(arduino);
        
        // Create PC Components
        const pcComponent = document.createElement('div');
        pcComponent.className = 'electronic-component pc-component';
        pcComponent.style.top = `${Math.random() * containerRect.height}px`;
        pcComponent.style.left = `${Math.random() * containerRect.width}px`;
        pcComponent.style.transform = `scale(${depth}) rotate(${Math.random() * 360}deg)`;
        pcComponent.style.opacity = `${depth}`;
        
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
      
      // Create fewer circuit lines with increased thickness
      for (let i = 0; i < Math.floor(10 * depth); i++) {
        // Horizontal lines with increased thickness
        const hLine = document.createElement('div');
        hLine.className = 'circuit-line';
        
        const top = Math.random() * containerRect.height;
        const left = Math.random() * containerRect.width * 0.8;
        const width = Math.random() * containerRect.width * 0.6 + 100;
        
        hLine.style.top = `${top}px`;
        hLine.style.left = `${left}px`;
        hLine.style.width = `${width}px`;
        hLine.style.height = '6px';
        hLine.style.boxShadow = `0 0 ${30 * depth}px rgba(139,92,246,${0.5 * depth})`;
        hLine.style.opacity = `${depth}`;
        
        // Enhanced flowing current effect with faster animation
        const flow = document.createElement('div');
        flow.className = 'circuit-flow';
        flow.style.animationDuration = `${3 / depth}s`;
        hLine.appendChild(flow);
        
        layerDiv.appendChild(hLine);
        
        // Add larger connection points
        for (let j = 0; j < width / 50; j++) {
          const point = document.createElement('div');
          point.className = 'circuit-dot';
          point.style.left = `${j * 50}px`;
          point.style.boxShadow = `0 0 ${35 * depth}px rgba(139,92,246,${0.7 * depth})`;
          point.style.transform = `scale(${depth * 2})`;
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
        vLine.style.width = '6px';
        vLine.style.height = `${height}px`;
        vLine.style.boxShadow = `0 0 ${30 * depth}px rgba(139,92,246,${0.5 * depth})`;
        vLine.style.opacity = `${depth}`;
        
        // Enhanced vertical flow with faster animation
        const vFlow = document.createElement('div');
        vFlow.className = 'circuit-flow-vertical';
        vFlow.style.animationDuration = `${3 / depth}s`;
        vLine.appendChild(vFlow);
        
        layerDiv.appendChild(vLine);
        
        // Add larger connection points to vertical lines
        for (let j = 0; j < height / 50; j++) {
          const point = document.createElement('div');
          point.className = 'circuit-dot';
          point.style.top = `${j * 50}px`;
          point.style.boxShadow = `0 0 ${35 * depth}px rgba(139,92,246,${0.7 * depth})`;
          point.style.transform = `scale(${depth * 2})`;
          vLine.appendChild(point);
        }
      }
      
      container.appendChild(layerDiv);
    });

    // Automatic rotation and movement animation with increased speed
    let time = 0;
    const animate = () => {
      time += 0.004;
      const layers = container.children;
      
      Array.from(layers).forEach((layer, index) => {
        const depth = (index + 1) * 0.2;
        const moveX = Math.sin(time) * 25 * depth;
        const moveY = Math.cos(time * 1.5) * 20 * depth;
        const rotateX = Math.cos(time * 0.8) * 8 * depth;
        const rotateY = Math.sin(time * 0.6) * 8 * depth;
        
        (layer as HTMLElement).style.transform = 
          `translateX(${moveX}px) translateY(${moveY}px) 
           translateZ(${-60 * depth}px) 
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
