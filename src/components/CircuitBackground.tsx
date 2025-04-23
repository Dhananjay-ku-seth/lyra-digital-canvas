
/**
 * CircuitBackground Component (EDITING INSTRUCTIONS)
 * 
 * ## How to Edit/Customize This Circuit Background:
 * 1. Adjust `numVertical`, `numHorizontal`, and `gap` for density and gaps.
 * 2. Use only horizontal and vertical tracks, 6px thick, with intersecting, merging, and splitting logic for "circuit" feel.
 * 3. Tune color/glow below for custom looks.
 * 4. Most logic is in renderLines(), easy to tweak for more/less elements or randomness.
 * 5. Fully responsive: auto-scales for all devices, covers entire screen, including above/below scroll.
 * 6. Mobile friendly: Board fills any mobile device, but less dense for visibility.
 */

import { useEffect, useRef } from "react";

// ========== EDITABLE VARIABLES ==========
const lineThickness = 6; // All tracks are strictly 6px
const desktopGrid = { numVertical: 10, numHorizontal: 14, gap: 80 }; // Fewer = larger gaps, more = denser
const mobileGrid = { numVertical: 6, numHorizontal: 8, gap: 60 }; // Less dense for mobile
const traceColor = "rgba(139,92,246,0.65)";
const traceGlow = "0 0 18px 2px rgba(139,92,246,0.20)";
const viaStyle = {
  size: 17,
  border: "2px solid #8b5cf6",
  background: "radial-gradient(circle at center, #b8a3ff 80%, rgba(139,92,246,0.09) 100%)"
};

const CircuitBackground = () => {
  // --- COMPONENT LOGIC (Responsive board) ---
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    function renderLines() {
      const container = ref.current;
      if (!container) return;
      container.innerHTML = "";

      const vw = window.innerWidth;
      const vh = Math.max(window.innerHeight, document.body.scrollHeight);

      // Responsiveness: mobile vs desktop grid
      const isMobile = vw < 768;
      const { numVertical, numHorizontal, gap } = isMobile ? mobileGrid : desktopGrid;

      // Store vertical/horizontal line X/Ys for intersections later
      const vLineXs: number[] = [];
      const hLineYs: number[] = [];
      // Calculate grid positions
      for (let i = 0; i < numVertical; i++) {
        vLineXs.push(Math.round(gap/2 + i * ((vw-gap) / Math.max(1, numVertical-1))));
      }
      for (let j = 0; j < numHorizontal; j++) {
        hLineYs.push(Math.round(gap/2 + j * ((vh-gap) / Math.max(1, numHorizontal-1))));
      }

      // Draw vertical lines/tracks
      vLineXs.forEach((x, vi) => {
        const vLine = document.createElement("div");
        vLine.className = "circuit-vline";
        vLine.style.position = "absolute";
        vLine.style.left = `${x}px`;
        vLine.style.top = "0";
        vLine.style.width = `${lineThickness}px`;
        vLine.style.height = `100%`;
        vLine.style.background = traceColor;
        vLine.style.opacity = "0.22";
        vLine.style.borderRadius = "4px";
        vLine.style.boxShadow = traceGlow;
        container.appendChild(vLine);
      });

      // Draw horizontal lines/tracks
      hLineYs.forEach((y, hi) => {
        const hLine = document.createElement("div");
        hLine.className = "circuit-hline";
        hLine.style.position = "absolute";
        hLine.style.top = `${y}px`;
        hLine.style.left = "0";
        hLine.style.height = `${lineThickness}px`;
        hLine.style.width = `100%`;
        hLine.style.background = traceColor;
        hLine.style.opacity = "0.30";
        hLine.style.borderRadius = "4px";
        hLine.style.boxShadow = traceGlow;
        container.appendChild(hLine);
      });

      // Add intersection "vias" and some bus splits
      vLineXs.forEach((x, vi) => {
        hLineYs.forEach((y, hi) => {
          // Main intersection: add circuit via/dot
          const via = document.createElement("div");
          via.className = "circuit-via";
          via.style.position = "absolute";
          via.style.left = `${x - viaStyle.size/2 + lineThickness/2}px`;
          via.style.top = `${y - viaStyle.size/2 + lineThickness/2}px`;
          via.style.width = `${viaStyle.size}px`;
          via.style.height = `${viaStyle.size}px`;
          via.style.borderRadius = "50%";
          via.style.border = viaStyle.border;
          via.style.background = viaStyle.background;
          via.style.boxShadow = "0 0 14px 2px rgba(139,92,246,0.08)";
          via.style.zIndex = "3";
          container.appendChild(via);
        });
      });

      // Add T-junctions/merges and split taps: randomly along lines for circuit-messy look
      for (let i = 0; i < vLineXs.length; i++) {
        for (let j = 0; j < 2 + Math.floor(Math.random()*3); j++) {
          const y = hLineYs[Math.floor(Math.random() * hLineYs.length)];
          const tap = document.createElement("div");
          tap.className = "circuit-tap";
          tap.style.position = "absolute";
          tap.style.left = `${vLineXs[i] - (isMobile ? 40 : 58)}px`;
          tap.style.top = `${y + (Math.random() - 0.5)*18}px`;
          tap.style.width = `${isMobile ? 34 : 50}px`;
          tap.style.height = `${lineThickness}px`;
          tap.style.background = traceColor;
          tap.style.opacity = "0.11";
          tap.style.borderRadius = "4px";
          tap.style.boxShadow = traceGlow;
          tap.style.zIndex = "2";
          container.appendChild(tap);
        }
      }

      // (Bonus) Simple glow/animate: pulse opacity for the entire circuit
      container.animate?.(
        [{ opacity: 0.35 }, { opacity: 0.55 }, { opacity: 0.35 }], 
        { duration: 3800, iterations: Infinity }
      );
    }

    renderLines(); // draw initially
    window.addEventListener("resize", renderLines);
    cleanup = () => window.removeEventListener("resize", renderLines);

    return () => {
      cleanup?.();
      if (ref.current) ref.current.innerHTML = "";
    };
  }, []);

  // ===== FULLSCREEN BG (fully covers page, pointer-events: none) =====
  return (
    <div
      ref={ref}
      className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-0"
      style={{ background: "var(--background, #0f172a)", transition: 'background 0.8s' }}
      aria-hidden="true"
    />
  );
};

export default CircuitBackground;

// ========== END CIRCUIT BACKGROUND CODE ==========
