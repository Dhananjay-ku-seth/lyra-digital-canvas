export type Category = 'game' | 'electronics' | 'tools';

export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category: Category;
  demoLink?: string;
  repoLink?: string;
  featured?: boolean;
  /** A concrete thing to try in the live demo. */
  tryThis?: string;
};

const gh = (name: string) => `https://github.com/Dhananjay-ku-seth/${name}`;

export const projectsData: Project[] = [
  {
    id: 'labbench-hub',
    title: 'LabBench Hub',
    description:
      'LabBench is a suite of nine interactive engineering tools that run in the browser: DSP, PID control, digital logic, communications, automata theory, power electronics and power systems. This hub links every tool together with a live search and category filter.',
    tags: ['LabBench', 'DSP', 'PID', 'Digital Logic', 'Communications', 'React'],
    category: 'tools',
    demoLink: 'https://labbench-hub.vercel.app',
    repoLink: gh('labbench-hub'),
    featured: true,
    tryThis: 'Search or filter by category to jump straight to a tool. Every tool runs in its own tab, needs no sign-up and is free to use.',
  },
  {
    id: 'dsp-signal-lab',
    title: 'DSP Signal Lab',
    description:
      'A real-time digital signal processing tool running entirely in the browser: a 2048-point FFT spectrum analyzer with a waveform generator, injectable AWGN noise, live digital filters (lowpass / highpass / bandpass / notch), a microphone mode with pitch tracking, and real THD/note detection with RMS/peak level meters. Freeze the spectrum, click to measure any point, and export as PNG or CSV.',
    tags: ['DSP', 'FFT', 'Web Audio API', 'Signal Processing', 'React'],
    category: 'electronics',
    demoLink: 'https://dsp-signal-lab.vercel.app/',
    repoLink: gh('dsp-signal-lab'),
    featured: true,
    tryThis: 'Pick a square wave and look for the odd harmonics in the spectrum — then freeze it and click a harmonic to measure its exact frequency and THD.',
  },
  {
    id: 'pid-control-playground',
    title: 'Line Follower Robot: PID Playground',
    description:
      'An autonomous robot that follows a line using infrared sensors and a PID control algorithm for smooth, accurate navigation. Includes an interactive browser simulator to tune the Kp/Ki/Kd gains live, or use the analytical pole-placement tuner to derive gains directly from a target damping ratio and settling time, with a ghost overlay comparing your last two step responses.',
    tags: ['Robotics', 'Arduino', 'PID Control', 'Sensors', 'Embedded Systems'],
    category: 'electronics',
    demoLink: 'https://pid-control-playground.vercel.app/',
    repoLink: gh('pid-control-playground'),
    featured: true,
    tryThis: 'Load the P-only preset and watch it oscillate, then use the pole-placement tuner to pick a damping ratio and settling time and see the gains it computes.',
  },
  {
    id: 'logic-circuit-sim',
    title: 'Logic Circuit Simulator',
    description:
      'A drag-and-wire digital logic sandbox with live signal propagation and an auto-generated truth table. An iterative relaxation solver evaluates combinational logic instantly and converges feedback loops, so sequential circuits like the SR latch work. Active wires animate a signal-flow pulse, gates flash when their output flips, and the whole board exports as PNG. Includes half/full adder, SR latch and 2:1 MUX examples.',
    tags: ['Digital Design', 'Logic Gates', 'Boolean Algebra', 'SVG', 'React'],
    category: 'electronics',
    demoLink: 'https://logic-circuit-sim.vercel.app/',
    repoLink: gh('logic-circuit-sim'),
    featured: true,
    tryThis: 'Load SR Latch, click S then R, and watch Q flash and hold its value after each input is released.',
  },
  {
    id: 'comms-simulator',
    title: 'Communication Systems Simulator',
    description:
      'An interactive communications playground: analog AM/FM modulation with envelope and over-modulation, digital constellation diagrams (BPSK / QPSK / 16-QAM) over an AWGN channel, and Monte-Carlo BER-vs-SNR curves benchmarked against the theoretical Q-function.',
    tags: ['Communication Systems', 'Modulation', 'Constellation', 'BER', 'AWGN'],
    category: 'electronics',
    demoLink: 'https://comms-simulator-pi.vercel.app/',
    repoLink: gh('comms-simulator'),
    tryThis: 'Open the BER Curve tab and hover it to read the exact simulated vs. theoretical BER at any Eb/N0.',
  },
  {
    id: 'waveform-viewer',
    title: 'Waveform Viewer',
    description:
      'Interactive Verilog-style timing diagrams. Click to drive a D flip-flop, counter or shift register and watch the waveforms respond, with a synchronized cursor that highlights every signal at the exact cycle you hover. Export as PNG, SVG, or a standard VCD file. Part of the LabBench suite.',
    tags: ['Verilog', 'Timing Diagrams', 'Flip-Flops', 'Digital Design', 'LabBench'],
    category: 'electronics',
    demoLink: 'https://waveform-viewer-theta.vercel.app',
    repoLink: gh('waveform-viewer'),
    tryThis: 'Choose Clock Divider, then hover a cycle: the cursor lines up CLK, RESET and Q at that exact moment across every lane.',
  },
  {
    id: 'state-machine-designer',
    title: 'State Machine Designer',
    description:
      'Build and simulate finite-state automata in the browser. A LabBench tool for designing states and transitions and stepping through them, with the active state pulsing and the just-taken transition flashing as you step, plus PNG export of the diagram.',
    tags: ['FSM', 'Automata', 'Digital Design', 'LabBench', 'React'],
    category: 'electronics',
    demoLink: 'https://state-machine-designer.vercel.app',
    repoLink: gh('state-machine-designer'),
    tryThis: 'Load Divisible by 3, type 110 (binary for 6) and press Run All to watch the accepting state pulse.',
  },
  {
    id: 'circuit-puzzle',
    title: 'Circuit Puzzle',
    description:
      'A logic-design puzzle game: match the truth table using as few gates as you can. Fewest gates wins. A LabBench tool.',
    tags: ['Logic Design', 'Truth Tables', 'Puzzle', 'LabBench', 'React'],
    category: 'electronics',
    demoLink: 'https://circuit-puzzle-sand.vercel.app',
    repoLink: gh('circuit-puzzle'),
    tryThis: 'Try puzzle 3: build XOR using only AND, OR and NOT. Four gates is par, and solving it earns a confetti burst.',
  },
  {
    id: 'smart-energy-meter',
    title: 'Smart Energy Meter',
    description:
      'A smart energy meter dashboard showing real and apparent power (combined correctly via the reactive-power vector sum, not just added per appliance), power factor, voltage sag/swell detection, breaker-trip logic with a visible outage flash, and live kWh usage. Charts support hover read-outs and PNG export.',
    tags: ['Power Systems', 'Power Factor', 'Energy Metering', 'IoT', 'React'],
    category: 'electronics',
    demoLink: 'https://smart-energy-meter-pink.vercel.app',
    repoLink: gh('smart-energy-meter'),
    tryThis: 'Switch on the AC, water heater and washing machine together. Current passes 20 A, the dashboard flickers, and the breaker trips after 2 seconds.',
  },
  {
    id: 'ev-battery-sim',
    title: 'EV Battery Pack Simulator',
    description:
      'An electric-vehicle battery pack simulator with coulomb-counted state of charge, OCV and IR-drop cell voltage (correctly current-limited at both ends of charge, so terminal voltage never reads past the physical OCV floor or ceiling), a thermal model with a pulsing thermal-cutoff warning, and passive cell balancing.',
    tags: ['EV', 'Battery Management', 'SoC', 'Thermal Model', 'Simulation'],
    category: 'electronics',
    demoLink: 'https://ev-battery-sim-six.vercel.app/',
    repoLink: gh('ev-battery-sim'),
    tryThis: 'Pick Fast DC Charging, switch to Discharge at a high C-rate, and watch the panel pulse red once the BMS thermal cutoff trips.',
  },
  {
    id: 'prepbench',
    title: 'PrepBench',
    description:
      'Free interactive aptitude shortcuts and practice drills across 9 topics with instant, precisely-graded feedback and a running streak, plus a paid cheat-sheet pack.',
    tags: ['Aptitude', 'Practice Drills', 'Education', 'React'],
    category: 'tools',
    demoLink: 'https://prepbench.vercel.app',
    repoLink: gh('prepbench'),
    tryThis: 'Choose a topic, read its shortcuts, then press Practice and try to build a streak.',
  },
  {
    id: 'sena',
    title: 'SENA: Battle Royale Game',
    description:
      'A competitive multiplayer battle royale developed at GauravGo Games in both Unreal Engine and Unity. Leading the game development and the map design: realistic environments, custom weapon systems and strategic gameplay mechanics.',
    tags: ['Battle Royale', 'Unreal Engine', 'Unity', 'Multiplayer', 'Map Design'],
    category: 'game',
    featured: true,
  },
  {
    id: 'zeher',
    title: 'ZEHER: FPS Game',
    description:
      'A first-person shooter made by the GauravGo Games team. Map development and game design lead.',
    tags: ['FPS', 'Game Design', 'Map Design', 'Multiplayer'],
    category: 'game',
  },
  {
    id: 'sky-adventure',
    title: 'Sky Adventure: ROBLOX Game',
    description:
      'A ROBLOX adventure game from the GauravGo Games team, built with Lua scripting, custom gameplay mechanics and interactive environments.',
    tags: ['ROBLOX', 'Lua Scripting', 'Game Development', 'Adventure'],
    category: 'game',
  },
  {
    id: 'the-life',
    title: 'The Life: Unity Game (in development)',
    description:
      'A big game currently in development in Unity at GauravGo Games. Leading the team and the map design.',
    tags: ['Unity', 'In Development', 'Game Design', 'Map Design', 'Team Lead'],
    category: 'game',
    featured: true,
  },
  {
    id: 'fortnite-maps',
    title: 'Realistic Map Development: Fortnite',
    description:
      'Creating highly detailed and realistic maps for Fortnite using Unreal Engine. Focus on environmental storytelling, optimized performance, and engaging gameplay spaces for the UGC community.',
    tags: ['Fortnite', 'Unreal Engine', 'Level Design', 'UGC', '3D Modeling'],
    category: 'game',
  },
  {
    id: 'roblox',
    title: 'ROBLOX Game Experiences',
    description:
      'Developing immersive game experiences on the ROBLOX platform. Creating engaging gameplay mechanics, custom scripts in Lua, and interactive environments for diverse player audiences.',
    tags: ['ROBLOX', 'Lua Scripting', 'Game Development', 'UI/UX', 'Multiplayer'],
    category: 'game',
  },
  {
    id: 'drone',
    title: 'Surveillance Drone System',
    description:
      'Designed and developed an autonomous surveillance drone at Corizo. Implemented real-time video streaming, GPS navigation, obstacle detection, and automated flight control systems for security and monitoring applications.',
    tags: ['Drone Technology', 'Arduino', 'Computer Vision', 'IoT', 'Autonomous Systems'],
    category: 'electronics',
  },
  {
    id: 'vlsi',
    title: 'VLSI Circuit Design',
    description:
      'Design and simulation of VLSI circuits for digital signal processing applications, optimized for low power consumption and high-performance computing.',
    tags: ['VLSI', 'Circuit Design', 'Verilog', 'Signal Processing', 'Digital Design'],
    category: 'electronics',
  },
];

export const categoryLabels: Record<Category | 'all', string> = {
  all: 'All Projects',
  game: 'Game Dev',
  electronics: 'Electronics',
  tools: 'Web Tools',
};
