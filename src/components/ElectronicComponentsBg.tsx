
import React, { useMemo } from "react";

/**
 * ElectronicComponentsBg
 * 
 * This component visually enhances the site background by placing 
 * SVG-based icons/shapes of popular electronics components (Raspberry Pi, Arduino, ESP, etc.)
 * at fixed or randomized locations. You can modify, add, or reposition components below.
 * 
 * HOW TO EDIT:
 * - To add a new electronic component shape, define a new child in the return's array with:
 *   - `style`: Position/top/left/rotate attributes for random or manual placement.
 *   - `children`: SVG or JSX snippet for the component.
 * - To adjust number or style of displayed components, edit the array in `componentsToShow`.
 * - Use Tailwind/CSS filters for glow/effects, e.g. "drop-shadow", "opacity", "blur", "rotate", etc.
 * - All icons/components are decorative and aria-hidden.
 */

// Example: Raspberry Pi - PCB Board Icon (simple representation)
const RaspberryPiIcon = () => (
  <svg width="52" height="36" viewBox="0 0 52 36" fill="none" xmlns="http://www.w3.org/2000/svg"
    className="drop-shadow-glow" aria-hidden="true">
    <rect x="2" y="2" width="48" height="32" rx="6" fill="#1a4730" stroke="#34D399" strokeWidth="3"/>
    <circle cx="13" cy="14" r="2" fill="#65C7B2"/>
    <circle cx="37" cy="11" r="2.2" fill="#A3E635"/>
    <rect x="20" y="15" width="12" height="6" rx="2" fill="#27272a"/>
    <rect x="6" y="21" width="6" height="2.7" rx="1" fill="#059669"/>
    <rect x="40" y="24" width="4" height="5" rx="1.2" fill="#EC4899"/>
    <rect x="20" y="24" width="3" height="3" rx="1" fill="#65A30D"/>
  </svg>
);

// Example: Arduino Uno silhouette
const ArduinoIcon = () => (
  <svg width="54" height="30" viewBox="0 0 54 30" fill="none" xmlns="http://www.w3.org/2000/svg"
    className="drop-shadow-glow" aria-hidden="true">
    <rect x="1" y="7" width="45" height="16" rx="6" fill="#2563EB" stroke="#60A5FA" strokeWidth="2"/>
    <circle cx="40" cy="15.5" r="7.5" fill="#3B82F6" opacity="0.14" />
    <rect x="41" y="12" width="12" height="6" rx="3" fill="#A21CAF" />
    <rect x="6" y="10" width="4" height="10" rx="1.8" fill="#93C5FD" />
    <rect x="23" y="14" width="5" height="3" rx="1" fill="#FFF" />
    {/* 2 pins */}
    <rect x="3" y="8.5" width="1.5" height="5" rx="0.6" fill="#6366F1" />
    <rect x="3" y="17" width="1.5" height="5" rx="0.6" fill="#6366F1" />
  </svg>
);

// Example: ESP8266 chip (simplified)
const ESPIcon = () => (
  <svg width="30" height="38" viewBox="0 0 30 38" fill="none" xmlns="http://www.w3.org/2000/svg"
    className="drop-shadow-glow" aria-hidden="true">
    <rect x="4" y="4" width="22" height="30" rx="4" fill="#3C3C43" stroke="#a8a29e" strokeWidth="2" />
    <rect x="8" y="10" width="14" height="16" rx="3" fill="#D1D5DB" />
    {[...Array(6)].map((_, i) => (
      <rect key={i} x={2} y={7 + i * 4} width={2} height="2" rx="0.6" fill="#F59E42" />
    ))}
    {[...Array(6)].map((_, i) => (
      <rect key={i} x={26} y={7 + i * 4} width={2} height="2" rx="0.6" fill="#F59E42" />
    ))}
  </svg>
);

// Example: Generic DIP IC (integrated circuit, black rectangle with pins)
const ICChip = () => (
  <svg width="38" height="22" viewBox="0 0 38 22" fill="none" xmlns="http://www.w3.org/2000/svg"
    className="drop-shadow-glow" aria-hidden="true">
    <rect x="6" y="5" width="26" height="12" rx="2.5" fill="#333" stroke="#6D28D9" strokeWidth="2"/>
    {/* Pins */}
    {[...Array(4)].map((_, i) => (
      <rect key={i} x={6 + i * 8} y={2} width="2" height="5" rx="0.7" fill="#F3F4F6"/>
    ))}
    {[...Array(4)].map((_, i) => (
      <rect key={i} x={6 + i * 8} y={15} width="2" height="5" rx="0.7" fill="#F3F4F6"/>
    ))}
  </svg>
);

/**
 * You may add or edit more component icons above.
 * To reposition them, modify the `style` property below.
 */

const componentsToShow = [
  // Slightly randomized/fixed placements - add as many as you like!
  {
    children: <RaspberryPiIcon />,
    style: { position: "absolute", left: "8vw", top: "14vh", zIndex: 3, opacity: 0.16, transform: "rotate(-5deg) scale(1.18)" }
  },
  {
    children: <ArduinoIcon />,
    style: { position: "absolute", left: "77vw", top: "22vh", zIndex: 3, opacity: 0.13, transform: "rotate(12deg) scale(.95)" }
  },
  {
    children: <ESPIcon />,
    style: { position: "absolute", left: "23vw", top: "73vh", zIndex: 3, opacity: 0.18, transform: "rotate(7deg) scale(1.2)" }
  },
  {
    children: <ICChip />,
    style: { position: "absolute", left: "60vw", top: "73vh", zIndex: 3, opacity: 0.15, transform: "rotate(-20deg) scale(1.18)" }
  },
  {
    children: <ICChip />,
    style: { position: "absolute", left: "70vw", top: "8vh", zIndex: 3, opacity: 0.10, transform: "rotate(34deg)" }
  },
  {
    children: <ArduinoIcon />,
    style: { position: "absolute", left: "4vw", top: "62vh", zIndex: 3, opacity: 0.10, transform: "rotate(16deg) scale(.85)" }
  }
  // You can add more here
];

const ElectronicComponentsBg = () => {
  /**
   * Edit `componentsToShow` above to add/remove/move components.
   * 
   * This file is safe to modify or expand in the future.
   */
  // Responsive: Hide icons on mobile (or reduce density)
  const isMobile = useMemo(() => window.innerWidth < 768, []);
  const styledComponents = isMobile ? componentsToShow.slice(0, 2) : componentsToShow;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none w-full h-full z-0"
      style={{}}
    >
      {styledComponents.map((item, idx) =>
        <div key={idx} style={item.style}>{item.children}</div>
      )}
    </div>
  );
};

export default ElectronicComponentsBg;
