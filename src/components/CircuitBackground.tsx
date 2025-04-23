
import { useEffect, useRef } from "react";

/**
 * CircuitBackground - Classic circuit board style:
 * - Only horizontal and vertical straight tracks (no diagonals)
 * - All tracks are 3px thick
 * - More lines for richer look
 * - Current flows animate along randomly chosen lines (horizontal or vertical)
 * - Responsive, fullscreen, with internal gaps on all sides
 */

const lineThickness = 3;
const traceColor = "rgba(139,92,246,0.7)";
const traceGlow = "0 0 12px 1px rgba(139,92,246,0.17)";

// Increased density, but always with visible gaps (not edge-to-edge)
const desktopGrid = { numVertical: 20, numHorizontal: 18, gap: 52 };
const mobileGrid = { numVertical: 9, numHorizontal: 10, gap: 28 };

// Animation: more flows per screen for extra liveliness
const flowsPerScreen = 17;

const CircuitBackground = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    function renderLines() {
      const container = ref.current;
      if (!container) return;
      container.innerHTML = "";

      const vw = window.innerWidth;
      const vh = Math.max(window.innerHeight, document.body.scrollHeight);

      const isMobile = vw < 768;
      const grid = isMobile ? mobileGrid : desktopGrid;
      const { numVertical, numHorizontal, gap } = grid;

      // Calculate track positions (gapped, not edge-to-edge)
      const vLineXs: number[] = [];
      const hLineYs: number[] = [];
      for (let i = 0; i < numVertical; i++) {
        vLineXs.push(
          Math.round(gap + i * ((vw - 2 * gap) / Math.max(1, numVertical - 1)))
        );
      }
      for (let j = 0; j < numHorizontal; j++) {
        hLineYs.push(
          Math.round(gap + j * ((vh - 2 * gap) / Math.max(1, numHorizontal - 1)))
        );
      }

      // --- Draw vertical lines (3px) ---
      vLineXs.forEach((x) => {
        const v = document.createElement("div");
        v.className = "circuit-vline";
        v.style.position = "absolute";
        v.style.left = `${x}px`;
        v.style.top = "0";
        v.style.width = `${lineThickness}px`;
        v.style.height = `${vh}px`;
        v.style.background = traceColor;
        v.style.opacity = "0.21";
        v.style.borderRadius = "2px";
        v.style.boxShadow = traceGlow;
        v.style.zIndex = "1";
        container.appendChild(v);
      });

      // --- Draw horizontal lines (3px) ---
      hLineYs.forEach((y) => {
        const h = document.createElement("div");
        h.className = "circuit-hline";
        h.style.position = "absolute";
        h.style.left = "0";
        h.style.top = `${y}px`;
        h.style.height = `${lineThickness}px`;
        h.style.width = `${vw}px`;
        h.style.background = traceColor;
        h.style.opacity = "0.28";
        h.style.borderRadius = "2px";
        h.style.boxShadow = traceGlow;
        h.style.zIndex = "1";
        container.appendChild(h);
      });

      // Animate 'current' flow on random lines, H or V
      // First: choose unique horizontal and vertical line indexes for the flows
      let availableH = [...Array(hLineYs.length).keys()];
      let availableV = [...Array(vLineXs.length).keys()];

      // Shuffle arrays
      for (let i = availableH.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [availableH[i], availableH[j]] = [availableH[j], availableH[i]];
      }
      for (let i = availableV.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [availableV[i], availableV[j]] = [availableV[j], availableV[i]];
      }

      let usedH: number[] = [], usedV: number[] = [];
      for (let n = 0; n < flowsPerScreen; n++) {
        // Alternate H and V, or pick whichever has free slots
        let chooseH = Math.random() > 0.5;
        if ((chooseH && availableH.length) || (!availableV.length)) {
          // Horizontal current
          let idx = availableH.shift();
          if (typeof idx !== "number") continue;
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

          // Pulse
          const pulse = document.createElement("div");
          pulse.className = "current-flow";
          pulse.style.height = `${lineThickness + 2}px`;
          pulse.style.width = "38px";
          pulse.style.background =
            "linear-gradient(90deg, transparent, #b18aff 60%, #fff7ff 78%, transparent 100%)";
          pulse.style.borderRadius = "9999px";
          pulse.style.position = "absolute";
          pulse.style.left = "-40px";
          pulse.style.top = "0";
          pulse.style.boxShadow = "0 0 8px 1px #b18aff80";
          pulse.style.opacity = "0.72";
          // Animate across the track
          pulse.style.animation = `pulse-right-${idx} ${1.7 + Math.random() * 1.3}s linear infinite`;
          const keyframes = `@keyframes pulse-right-${idx} {
            0% { left: -40px; opacity: 0.9; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { left: ${vw + 40}px; opacity: 0; }
          }`;
          // Append keyframes CSS if needed
          let styleSheet = document.getElementById("circuit-anim-kf") as HTMLStyleElement;
          if (!styleSheet) {
            styleSheet = document.createElement("style");
            styleSheet.id = "circuit-anim-kf";
            document.head.appendChild(styleSheet);
          }
          if (!(styleSheet.textContent?.includes(`pulse-right-${idx}`))) {
            styleSheet.textContent += keyframes;
          }
          flow.appendChild(pulse);
          container.appendChild(flow);
        } else if (availableV.length) {
          // Vertical current (top-down)
          let idx = availableV.shift();
          if (typeof idx !== "number") continue;
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

          // Pulse vertical
          const pulse = document.createElement("div");
          pulse.className = "current-flow-vertical";
          pulse.style.width = `${lineThickness + 2}px`;
          pulse.style.height = "38px";
          pulse.style.background =
            "linear-gradient(180deg, transparent, #b18aff 60%, #fff7ff 80%, transparent 100%)";
          pulse.style.borderRadius = "9999px";
          pulse.style.position = "absolute";
          pulse.style.top = "-40px";
          pulse.style.left = "0";
          pulse.style.boxShadow = "0 0 8px 1px #b18aff90";
          pulse.style.opacity = "0.76";
          pulse.style.animation = `pulse-down-${idx} ${1.8 + Math.random() * 1.4}s linear infinite`;
          const keyframes = `@keyframes pulse-down-${idx} {
            0% { top: -40px; opacity: 0.85; }
            10% { opacity: 1; }
            93% { opacity: 1; }
            100% { top: ${vh + 40}px; opacity: 0; }
          }`;
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

      // Small dots on intersections for circuit "vias"
      for (let vi = 0; vi < vLineXs.length; vi++) {
        for (let hi = 0; hi < hLineYs.length; hi++) {
          const via = document.createElement("div");
          via.className = "circuit-dot";
          via.style.position = "absolute";
          via.style.left = `${vLineXs[vi] - 3 + lineThickness / 2}px`;
          via.style.top = `${hLineYs[hi] - 3 + lineThickness / 2}px`;
          via.style.width = "8px";
          via.style.height = "8px";
          via.style.borderRadius = "50%";
          via.style.background = "#b18aff";
          via.style.boxShadow = "0 0 5px 1px #b18aff35";
          via.style.opacity = "0.29";
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
