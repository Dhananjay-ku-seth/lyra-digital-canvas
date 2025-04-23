
/**
 * CircuitBackground Component (EDITING INSTRUCTIONS)
 * 
 * # How to Edit/Customize This Circuit Background:
 * 
 * 1. **Layers:** Depth layers are managed with the `layers` array. Increase/reduce layers or tweak their depth values for different 3D effects.
 * 2. **Components per layer:** Change the loops under each layer if you want more or fewer ICs, SMDs, etc.
 * 3. **Line/Trace Logic:** All traces are strictly horizontal or vertical, 6px thick, forming T-Junctions, Crosses, Merger/Splits and classic "circuit maze" intersections.
 *      - Adjust the `circuitTracesPerLayer` or logic in `drawCircuitTraces` if you want more/less complexity.
 * 4. **Colors:** Trace colors use the theme purple. Adjust the `traceColor` and `traceGlow` below for changes.
 * 5. **Instructional comments throughout!**
 * 
 * ## Tips
 * - All DOM structure is generated dynamically each render, delete/add more components/traces by copying snippets in the code
 * - Use Tailwind classes on generated elements to customize look
 * 
 */

import { useEffect, useRef } from 'react';

// ========== EDITABLE VARIABLES ==========
const layers = [0.3, 0.5, 0.7, 1]; // Tunable depth for 3D
const circuitTracesPerLayer = 6; // Increase for denser board
const traceColor = 'rgba(139,92,246,0.65)'; // Main purple
const traceGlow = '0 0 16px 4px rgba(139,92,246,0.23)'; // Glow on traces
const traceThickness = 6; // 6px as requested

// ========== MAIN COMPONENT ==========
const CircuitBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // --- MAIN RENDERING EFFECT ---
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const { width, height } = container.getBoundingClientRect();
    container.innerHTML = '';

    // Helper: random integer in range [min, max)
    function rand(min: number, max: number) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    // --------- TRACE ROUTING LOGIC (ONLY HORIZ/VERT, 6px) ---------
    /**
     * Draws a set of circuit board traces (with T-junctions/crosses) on a given layer element.
     * All traces are straight horizontal or vertical, and may be connected at right angles to form intersections and merges.
     * @param layerDiv - the HTMLDivElement to append traces into.
     * @param density - controls how many main lines.
     */
    function drawCircuitTraces(layerDiv: HTMLDivElement, density: number, depth: number) {
      // Route: start by generating N vertical "main rails" evenly, and for each, create horizontal connecting lines (to mimic PCB layout)
      const rails = [];
      for (let i = 0; i < density; i++) {
        const x = Math.floor(width * ((i + 1) / (density + 1)));
        rails.push(x);
        // Draw vertical main rail
        const vLine = document.createElement('div');
        vLine.className = 'absolute';
        vLine.style.left = `${x}px`;
        vLine.style.top = `0px`;
        vLine.style.width = `${traceThickness}px`;
        vLine.style.height = `${height}px`;
        vLine.style.background = traceColor;
        vLine.style.opacity = String(0.25 + 0.5 * depth);
        vLine.style.borderRadius = '4px';
        vLine.style.boxShadow = traceGlow;
        layerDiv.appendChild(vLine);
      }

      // Now, add "bus" horizontal lines that connect 2+ rails at a Y position, forming T-junctions and intersections
      for (let j = 0; j < density + 2; j++) {
        const y = rand(height * 0.15, height * 0.93); // random Y
        const count = rand(2, rails.length + 1); // connect 2-rails up to all rails
        const indices = rails.slice(0);
        indices.sort(() => Math.random() - 0.5); // shuffled
        indices.length = count;
        indices.sort((a, b) => a - b);

        // Draw horizontal bus
        const hLine = document.createElement('div');
        hLine.className = 'absolute';
        hLine.style.top = `${y}px`;
        hLine.style.left = `${indices[0]}px`;
        hLine.style.height = `${traceThickness}px`;
        hLine.style.width = `${indices[indices.length-1] - indices[0] + traceThickness}px`;
        hLine.style.background = traceColor;
        hLine.style.opacity = String(0.29 + 0.5 * depth);
        hLine.style.borderRadius = '4px';
        hLine.style.boxShadow = traceGlow;
        layerDiv.appendChild(hLine);

        // At each intersection, place a round "via" for circuit effect
        indices.forEach((x) => {
          const via = document.createElement('div');
          via.className = 'absolute z-10';
          via.style.left = `${x - 5}px`;
          via.style.top = `${y - 5}px`;
          via.style.width = '16px';
          via.style.height = '16px';
          via.style.background =
            'radial-gradient(circle at center, #b8a3ff 80%, rgba(139,92,246,0.09) 100%)';
          via.style.border = '2px solid #8b5cf6';
          via.style.borderRadius = '50%';
          via.style.boxShadow = '0 0 10px 2px rgba(139,92,246,0.1)';
          layerDiv.appendChild(via);
        });

        // Add a glowing current animation running along the wire
        const anim = document.createElement('div');
        anim.className = 'absolute pointer-events-none';
        anim.style.left = `${indices[0]}px`;
        anim.style.top = `${y + 1}px`;
        anim.style.height = `${traceThickness - 2}px`;
        anim.style.width = `${indices[indices.length-1] - indices[0]}px`;
        anim.style.borderRadius = '4px';
        anim.style.background = 'linear-gradient(90deg, rgba(255,255,255,0.5), rgba(139,92,246,0.05))';
        anim.style.opacity = '0.23';
        anim.style.animation = `circuit-flow-x ${2.0 / depth}s linear infinite`;
        layerDiv.appendChild(anim);
      }

      // For each main vertical rail, put a few vertical "branches" merging or splitting off
      rails.forEach((x) => {
        // Pick a y segment to branch from
        for (let k = 0; k < rand(1, 3); k++) {
          const y1 = rand(30, height - 120);
          const y2 = y1 + rand(50, 150);
          // Left or right offset
          const offset = rand(-110, +110);

          const hBranch = document.createElement('div');
          hBranch.className = 'absolute';
          hBranch.style.left = `${x + offset}px`;
          hBranch.style.top = `${y1}px`;
          hBranch.style.width = `${traceThickness}px`;
          hBranch.style.height = `${y2 - y1}px`;
          hBranch.style.background = traceColor;
          hBranch.style.opacity = String(0.16 + 0.45 * depth);
          hBranch.style.borderRadius = '4px';
          hBranch.style.boxShadow = traceGlow;
          layerDiv.appendChild(hBranch);

          // Small horizontal "tap"
          const tap = document.createElement('div');
          tap.className = 'absolute';
          tap.style.top = `${y2 - 3}px`;
          tap.style.left = `${x + offset - 18}px`;
          tap.style.height = `${traceThickness}px`;
          tap.style.width = '36px';
          tap.style.background = traceColor;
          tap.style.opacity = String(0.12 + 0.45 * depth);
          tap.style.borderRadius = '4px';
          tap.style.boxShadow = traceGlow;
          layerDiv.appendChild(tap);
        }
      });
    }
    // ------------------------------------------------

    // ----------- ADD COMPONENTS (ICs, LEDs etc) -----------
    function addElectronicComponents(layerDiv: HTMLDivElement, depth: number) {
      // ICs
      for (let i = 0; i < Math.round(1.5 * depth); i++) {
        const ic = document.createElement('div');
        ic.className = 'electronic-component ic-chip absolute';
        ic.style.top = `${rand(20, height - 80)}px`;
        ic.style.left = `${rand(20, width - 120)}px`;
        ic.style.transform = `scale(${depth}) rotate(${rand(0, 360)}deg)`;
        ic.style.opacity = `${depth}`;
        ic.style.boxShadow = `0 0 ${20 * depth}px #8b5cf6`;

        // IC pins (left/right)
        for (let side = 0; side < 2; side++) {
          const pinsGroup = document.createElement('div');
          pinsGroup.className = 'absolute flex flex-col gap-1';
          pinsGroup.style[side === 0 ? 'left' : 'right'] = '-14px';
          pinsGroup.style.top = '7px';
          for (let p = 0; p < 6; p++) {
            const pin = document.createElement('div');
            pin.style.width = '6px';
            pin.style.height = '7px';
            pin.style.background = '#b5b3d6';
            pin.style.borderRadius = '1px';
            pin.style.margin = '1px 2px';
            pinsGroup.appendChild(pin);
          }
          ic.appendChild(pinsGroup);
        }
        // IC body
        ic.style.width = '60px';
        ic.style.height = '36px';
        ic.style.background = '#18122b';
        ic.style.border = '2px solid #8b5cf6';
        ic.style.borderRadius = '8px';
        ic.style.position = 'absolute';

        // LED/indicator
        const led = document.createElement('div');
        led.className = 'absolute w-3 h-3 rounded-full';
        led.style.top = '9px';
        led.style.right = '11px';
        led.style.background = '#8b5cf6';
        led.style.boxShadow = '0 0 14px #8b5cf6, 0 0 2px #fff';
        led.style.opacity = '0.55';
        led.style.animation = 'pulse-glow 2.5s infinite';
        ic.appendChild(led);

        layerDiv.appendChild(ic);
      }
    } // END addElectronicComponents

    // ----------- MAIN LAYER/DEPTH LOOP -----------
    layers.forEach((depth) => {
      const layerDiv = document.createElement('div');
      layerDiv.className = 'absolute inset-0 pointer-events-none';
      // Z offset for 3D depth
      layerDiv.style.zIndex = String(Math.round(depth * 10));
      drawCircuitTraces(layerDiv, circuitTracesPerLayer + Math.round(depth * 4), depth);
      addElectronicComponents(layerDiv, depth);
      container.appendChild(layerDiv);
    });

    // ----------- ANIMATE DEPTH MOVEMENT -----------
    let time = 0;
    const animate = () => {
      time += 0.005;
      Array.from(container.children).forEach((layer, index) => {
        const depth = layers[index] ?? 1;
        const moveX = Math.sin(time) * 18 * depth;
        const moveY = Math.cos(time * 1.2) * 15 * depth;
        (layer as HTMLElement).style.transform = 
          `translateX(${moveX}px) translateY(${moveY}px) 
           translateZ(${-40 * depth}px)`;
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

  // ===== MAIN BG CONTAINER =====
  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-40
        perspective-2000 transform-style-3d bg-tech-dark"
      style={{ filter: 'contrast(1.11)' }}
      aria-hidden="true"
    />
  );
};

export default CircuitBackground;

// ========== KEYFRAMES FOR ANIMATION ==========
// CircuitFlow animation (add this global CSS if needed):
// @keyframes circuit-flow-x {
//   0% { transform: translateX(-25%); opacity: 0.18; }
//   15% { opacity: 1; }
//   100% { transform: translateX(80%); opacity: 0.0; }
// }
// For pulse-glow keyframes, see tailwind.config.ts

/* ----- END OF COMPONENT ----- */
