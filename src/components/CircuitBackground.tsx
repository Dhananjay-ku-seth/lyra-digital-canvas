
import { useEffect, useRef } from "react";

/**
 * CircuitBackground - Classic circuit board design: only horizontal and vertical tracks, 6px thick, with
 * visible animated current flows. Fully responsive, fullscreen, with gaps.
 */

const lineThickness = 6; // All lines are 6px
const traceColor = "rgba(139,92,246,0.7)";
const traceGlow = "0 0 18px 2px rgba(139,92,246,0.21)";

// Control density for desktop/mobile
const desktopGrid = { numVertical: 12, numHorizontal: 10, gap: 88 };
const mobileGrid = { numVertical: 5, numHorizontal: 6, gap: 56 };

// Animation for "current" flow -- show on some lines, pulse left/right
const flowsPerScreen = 10;

const CircuitBackground = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    function renderLines() {
      const container = ref.current;
      if (!container) return;
      container.innerHTML = "";

      const vw = window.innerWidth;
      // Use body.scrollHeight so BG covers full page even if content is very tall
      const vh = Math.max(window.innerHeight, document.body.scrollHeight);

      // Responsive grid setup
      const isMobile = vw < 768;
      const grid = isMobile ? mobileGrid : desktopGrid;
      const { numVertical, numHorizontal, gap } = grid;

      // Calculate track positions
      const vLineXs: number[] = [], hLineYs: number[] = [];
      for (let i = 0; i < numVertical; i++) {
        // leave a margin, so not to the very edge
        vLineXs.push(Math.round(gap + i * ((vw - 2 * gap) / Math.max(1, numVertical - 1))));
      }
      for (let j = 0; j < numHorizontal; j++) {
        hLineYs.push(Math.round(gap + j * ((vh - 2 * gap) / Math.max(1, numHorizontal - 1))));
      }

      // Vertical 6px tracks
      for (let i = 0; i < vLineXs.length; i++) {
        const v = document.createElement("div");
        v.className = "circuit-vline";
        v.style.position = "absolute";
        v.style.left = `${vLineXs[i]}px`;
        v.style.top = "0";
        v.style.width = `${lineThickness}px`;
        v.style.height = `${vh}px`;
        v.style.background = traceColor;
        v.style.opacity = "0.20";
        v.style.borderRadius = "4px";
        v.style.boxShadow = traceGlow;
        v.style.zIndex = "1";
        container.appendChild(v);
      }

      // Horizontal 6px tracks
      for (let j = 0; j < hLineYs.length; j++) {
        const h = document.createElement("div");
        h.className = "circuit-hline";
        h.style.position = "absolute";
        h.style.left = "0";
        h.style.top = `${hLineYs[j]}px`;
        h.style.height = `${lineThickness}px`;
        h.style.width = `${vw}px`;
        h.style.background = traceColor;
        h.style.opacity = "0.30";
        h.style.borderRadius = "4px";
        h.style.boxShadow = traceGlow;
        h.style.zIndex = "1";
        container.appendChild(h);
      }

      // Add animated "current flow" to some (not all) lines:
      // Pick a random set of H and V lines for pulsing
      let usedH: number[] = [], usedV: number[] = [];
      for (let n = 0; n < flowsPerScreen; n++) {
        // Alternate H and V
        if (Math.random() > 0.5 && usedH.length < hLineYs.length) {
          // Horizontal flow (current moving left-right)
          let idx = Math.floor(Math.random() * hLineYs.length);
          while (usedH.includes(idx)) idx = (idx + 1) % hLineYs.length;
          usedH.push(idx);

          const y = hLineYs[idx];
          const flow = document.createElement("div");
          flow.className = "circuit-flow";
          flow.style.position = "absolute";
          flow.style.left = "0";
          flow.style.top = `${y - 1}px`;
          flow.style.height = `${lineThickness + 2}px`;
          flow.style.width = `${vw}px`;
          flow.style.overflow = "hidden";
          flow.style.pointerEvents = "none";
          flow.style.zIndex = "2";

          // The actual pulse strip
          const pulse = document.createElement("div");
          pulse.className = "current-flow";
          pulse.style.height = `${lineThickness + 2}px`;
          pulse.style.width = "48px";
          pulse.style.background = "linear-gradient(90deg, transparent, #b18aff 60%, #fff7ff 80%, transparent 100%)";
          pulse.style.borderRadius = "9999px";
          pulse.style.position = "absolute";
          pulse.style.left = "-60px";
          pulse.style.top = "0";
          pulse.style.boxShadow = "0 0 12px 2px #b18aff70";
          pulse.style.opacity = "0.66";
          // Animate across the track
          pulse.style.animation = `pulse-right-${idx} 2.3s linear infinite`;
          const keyframes = `@keyframes pulse-right-${idx} {
            0% { left: -60px; opacity: 0.85; }
            20% { opacity: 1; }
            80% { opacity: 1; }
            100% { left: ${vw+60}px; opacity: 0; }
          }`;
          // Insert keyframes into a single style element only once
          let styleSheet = document.getElementById("circuit-anim-kf") as HTMLStyleElement;
          if (!styleSheet) {
            styleSheet = document.createElement("style");
            styleSheet.id = "circuit-anim-kf";
            document.head.appendChild(styleSheet);
          }
          // Only add keyframes if not already present
          if (!(styleSheet.textContent?.includes(`pulse-right-${idx}`))) {
            styleSheet.textContent += keyframes;
          }
          flow.appendChild(pulse);
          container.appendChild(flow);
        } else if (usedV.length < vLineXs.length) {
          // Vertical flow (current moving top-down)
          let idx = Math.floor(Math.random() * vLineXs.length);
          while (usedV.includes(idx)) idx = (idx + 1) % vLineXs.length;
          usedV.push(idx);

          const x = vLineXs[idx];
          const flow = document.createElement("div");
          flow.className = "circuit-flow-vertical";
          flow.style.position = "absolute";
          flow.style.left = `${x - 1}px`;
          flow.style.top = "0";
          flow.style.width = `${lineThickness + 2}px`;
          flow.style.height = `${vh}px`;
          flow.style.overflow = "hidden";
          flow.style.pointerEvents = "none";
          flow.style.zIndex = "2";

          // The actual pulse/cursor glow moving down
          const pulse = document.createElement("div");
          pulse.className = "current-flow-vertical";
          pulse.style.width = `${lineThickness + 2}px`;
          pulse.style.height = "48px";
          pulse.style.background = "linear-gradient(180deg, transparent, #b18aff 60%, #fff7ff 80%, transparent 100%)";
          pulse.style.borderRadius = "9999px";
          pulse.style.position = "absolute";
          pulse.style.top = "-60px";
          pulse.style.left = "0";
          pulse.style.boxShadow = "0 0 12px 2px #b18aff90";
          pulse.style.opacity = "0.72";
          pulse.style.animation = `pulse-down-${idx} 2.6s linear infinite`;
          const keyframes = `@keyframes pulse-down-${idx} {
            0% { top: -60px; opacity: 0.8; }
            20% { opacity: 1; }
            85% { opacity: 1; }
            100% { top: ${vh+60}px; opacity: 0; }
          }`;
          // Insert keyframes into style element
          let styleSheet = document.getElementById("circuit-anim-kf") as HTMLStyleElement;
          if (!styleSheet) {
            styleSheet = document.createElement("style");
            styleSheet.id = "circuit-anim-kf";
            document.head.appendChild(styleSheet);
          }
          if (!(styleSheet.textContent?.includes(`pulse-down-${idx}`))) {
            styleSheet.textContent += keyframes;
          }
          flow.appendChild(pulse);
          container.appendChild(flow);
        }
      }

      // (Optionally add dots at intersections for circuit "vias" look)
      for (let vi = 0; vi < vLineXs.length; vi++) {
        for (let hi = 0; hi < hLineYs.length; hi++) {
          const via = document.createElement("div");
          via.className = "circuit-dot";
          via.style.position = "absolute";
          via.style.left = `${vLineXs[vi] - 4 + lineThickness / 2}px`;
          via.style.top = `${hLineYs[hi] - 4 + lineThickness / 2}px`;
          via.style.width = "12px";
          via.style.height = "12px";
          via.style.borderRadius = "50%";
          via.style.background = "#b18aff";
          via.style.boxShadow = "0 0 8px 2px #b18aff45";
          via.style.opacity = "0.33";
          via.style.zIndex = "3";
          container.appendChild(via);
        }
      }
    }

    renderLines();
    window.addEventListener("resize", renderLines);
    cleanup = () => window.removeEventListener("resize", renderLines);

    return () => {
      cleanup?.();
      if (ref.current) ref.current.innerHTML = "";
    };
  }, []);

  // Fullscreen BG (covers everything, pointer-events: none)
  return (
    <div
      ref={ref}
      className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-0"
      style={{
        background: "var(--background, #0f172a)",
        transition: "background 0.8s"
      }}
      aria-hidden="true"
    />
  );
};

export default CircuitBackground;
