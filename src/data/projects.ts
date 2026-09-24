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
};

const gh = (name: string) => `https://github.com/Dhananjay-ku-seth/${name}`;

export const projectsData: Project[] = [
  {
    id: 'labbench-hub',
    title: 'LabBench Hub',
    description:
      'LabBench is a suite of interactive engineering tools that run in the browser: DSP, PID control, digital logic and communications. This hub links every tool together in one place.',
    tags: ['LabBench', 'DSP', 'PID', 'Digital Logic', 'Communications', 'React'],
    category: 'tools',
    demoLink: 'https://labbench-hub.vercel.app',
    repoLink: gh('labbench-hub'),
    featured: true,
  },
  {
    id: 'dsp-signal-lab',
    title: 'DSP Signal Lab',
    description:
      'A real-time digital signal processing tool running entirely in the browser: a 2048-point FFT spectrum analyzer with a waveform generator, injectable AWGN noise, live digital filters (lowpass / highpass / bandpass / notch), and a microphone mode with pitch tracking.',
    tags: ['DSP', 'FFT', 'Web Audio API', 'Signal Processing', 'React'],
    category: 'electronics',
    demoLink: 'https://dsp-signal-lab.vercel.app/',
    repoLink: gh('dsp-signal-lab'),
    featured: true,
  },
  {
    id: 'pid-control-playground',
    title: 'Line Follower Robot: PID Playground',
    description:
      'An autonomous robot that follows a line using infrared sensors and a PID control algorithm for smooth, accurate navigation. Includes an interactive browser simulator to tune the Kp/Ki/Kd gains live and watch the robot track the line, or oscillate when detuned.',
    tags: ['Robotics', 'Arduino', 'PID Control', 'Sensors', 'Embedded Systems'],
    category: 'electronics',
    demoLink: 'https://pid-control-playground.vercel.app/',
    repoLink: gh('pid-control-playground'),
    featured: true,
  },
  {
    id: 'logic-circuit-sim',
    title: 'Logic Circuit Simulator',
    description:
      'A drag-and-wire digital logic sandbox with live signal propagation and an auto-generated truth table. An iterative relaxation solver evaluates combinational logic instantly and converges feedback loops, so sequential circuits like the SR latch work. Includes half/full adder, SR latch and 2:1 MUX examples.',
    tags: ['Digital Design', 'Logic Gates', 'Boolean Algebra', 'SVG', 'React'],
    category: 'electronics',
    demoLink: 'https://logic-circuit-sim.vercel.app/',
    repoLink: gh('logic-circuit-sim'),
    featured: true,
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
  },
  {
    id: 'waveform-viewer',
    title: 'Waveform Viewer',
    description:
      'Interactive Verilog-style timing diagrams. Click to drive a D flip-flop, counter or shift register and watch the waveforms respond. Part of the LabBench suite.',
    tags: ['Verilog', 'Timing Diagrams', 'Flip-Flops', 'Digital Design', 'LabBench'],
    category: 'electronics',
    demoLink: 'https://waveform-viewer-theta.vercel.app',
    repoLink: gh('waveform-viewer'),
  },
  {
    id: 'state-machine-designer',
    title: 'State Machine Designer',
    description:
      'Build and simulate finite-state automata in the browser. A LabBench tool for designing states and transitions and stepping through them.',
    tags: ['FSM', 'Automata', 'Digital Design', 'LabBench', 'React'],
    category: 'electronics',
    demoLink: 'https://state-machine-designer.vercel.app',
    repoLink: gh('state-machine-designer'),
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
  },
  {
    id: 'smart-energy-meter',
    title: 'Smart Energy Meter',
    description:
      'A smart energy meter dashboard showing real and apparent power, power factor, voltage sag/swell detection, breaker-trip logic and live kWh usage.',
    tags: ['Power Systems', 'Power Factor', 'Energy Metering', 'IoT', 'React'],
    category: 'electronics',
    demoLink: 'https://smart-energy-meter-pink.vercel.app',
    repoLink: gh('smart-energy-meter'),
  },
  {
    id: 'ev-battery-sim',
    title: 'EV Battery Pack Simulator',
    description:
      'An electric-vehicle battery pack simulator with coulomb-counted state of charge, OCV and IR-drop cell voltage, a thermal model and passive cell balancing.',
    tags: ['EV', 'Battery Management', 'SoC', 'Thermal Model', 'Simulation'],
    category: 'electronics',
    repoLink: gh('ev-battery-sim'),
  },
  {
    id: 'prepbench',
    title: 'PrepBench',
    description:
      'Free interactive aptitude shortcuts and practice drills across 9 topics, plus a paid cheat-sheet pack.',
    tags: ['Aptitude', 'Practice Drills', 'Education', 'React'],
    category: 'tools',
    demoLink: 'https://prepbench.vercel.app',
    repoLink: gh('prepbench'),
  },
  {
    id: 'sena',
    title: 'Sena: Battle Royale Game',
    description:
      'Currently developing a battle royale game at Gaurav Go Games. Leading the UGC development for this competitive multiplayer experience featuring realistic environments, custom weapons systems, and strategic gameplay mechanics.',
    tags: ['Battle Royale', 'Unreal Engine', 'Multiplayer', 'Game Design', 'UGC'],
    category: 'game',
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
