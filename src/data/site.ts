export const profile = {
  name: 'Dhananjay Kumar Seth',
  first: 'Dhananjay',
  role: 'Lead Game Developer',
  company: 'GauravGo Games',
  specialisation: 'Computer Hardware Engineering',
  headline: 'Electronics & Communication Engineer · Lead Game Developer',
  email: 'adplayers746@gmail.com',
  location: 'Bhubaneswar, Odisha',
  college: 'GITA Autonomous College',
  branch: 'Electronics and Communication Engineering',
  resume: '/dhananjay_kumar_seth_resume.pdf',
  socials: {
    github: 'https://github.com/Dhananjay-ku-seth',
    linkedin: 'https://www.linkedin.com/in/dhananjay-kumar-seth-4a5b31283/',
    instagram: 'https://www.instagram.com/dhananjay_this_side/',
  },
};

export const roles = [
  'realistic Unreal Engine maps',
  'optimised game levels',
  'interactive DSP tools',
  'circuit and control simulators',
  'ROBLOX experiences',
];

export const bio = [
  'I am an Electronics and Communication Engineering student at GITA Autonomous College, Bhubaneswar, specialising in Computer Hardware Engineering. My main craft is Unreal Engine: map design, level design and game optimisation, where I am highly skilled. I lead game development at GauravGo Games.',
  'I also have working knowledge and experience in Unity. With the GauravGo Games team we make SENA in Unreal Engine and Unity, the ROBLOX game Sky Adventure and the FPS game ZEHER, and we are now working on a big Unity game called The Life.',
  'My work sits between hardware and software. I lead the user-generated content team, specialising in ROBLOX and Fortnite maps in Unreal Engine, and I build browser-based simulators that turn signal processing, control theory, digital logic and power systems into something you can poke at.',
];

export const facts = [
  { label: 'Studying', value: 'B.Tech, Electronics & Communication' },
  { label: 'Specialisation', value: 'Computer Hardware Engineering' },
  { label: 'College', value: 'GITA Autonomous College' },
  { label: 'Based in', value: 'Bhubaneswar, Odisha' },
  { label: 'Main engine', value: 'Unreal Engine (highly skilled)' },
  { label: 'Also works in', value: 'Unity, ROBLOX' },
  { label: 'Working at', value: 'GauravGo Games' },
];

export type SkillGroup = { title: string; tone: 'purple' | 'pink' | 'blue' | 'green'; items: { name: string; level: number; q?: string }[] };

export const skillGroups: SkillGroup[] = [
  {
    title: 'Unreal Engine (my specialty)',
    tone: 'green',
    items: [
      { name: 'Map design', level: 95 , q: 'map design' },
      { name: 'Level design', level: 95 , q: 'level design' },
      { name: 'Game optimization', level: 92 , q: 'optimi' },
    ],
  },
  {
    title: 'Game development',
    tone: 'purple',
    items: [
      { name: 'Roblox development', level: 90 , q: 'roblox' },
      { name: 'Unity 3D', level: 70 , q: 'unity' },
      { name: 'Lua scripting', level: 80 , q: 'lua' },
      { name: 'C# programming', level: 75 },
      { name: 'Game UI design', level: 70 },
    ],
  },
  {
    title: 'Electronics engineering',
    tone: 'pink',
    items: [
      { name: 'Arduino', level: 90 , q: 'arduino' },
      { name: 'Circuit design', level: 85 , q: 'circuit' },
      { name: 'PCB design', level: 80 },
      { name: 'VLSI design', level: 75 , q: 'vlsi' },
      { name: 'Embedded systems', level: 70 , q: 'embedded' },
    ],
  },
  {
    title: 'Programming',
    tone: 'blue',
    items: [
      { name: 'C / C++', level: 85 },
      { name: 'Python', level: 80 },
      { name: 'MATLAB', level: 75 },
    ],
  },
];

export const otherSkills = ['Game map design (Unreal Engine & Unity)', '3D modelling', 'Digital signal processing', 'Robot Operating System (ROS)', 'Git', 'Microcontroller programming'];

export const experience = [
  {
    title: 'Lead Game Developer',
    org: 'GauravGo Games',
    period: 'Present',
    current: true,
    text: 'Lead game development, with map and level design and optimisation in Unreal Engine as my main craft, plus Unity work, on SENA, ZEHER, the ROBLOX game Sky Adventure and the big Unity game The Life. Also lead the User Generated Content (UGC) domain, specialising in ROBLOX and Fortnite, with responsibility for project direction, quality assurance and gameplay mechanics across platforms.',
    tags: ['Unreal Engine', 'Unity', 'ROBLOX', 'Team lead'],
  },
  {
    title: 'Game Development Lead',
    org: 'College Game Development Club',
    period: '2023 – Present',
    text: 'Led a team of student developers building interactive games in Unity and Roblox. Managed timelines, assigned tasks and ran code reviews. Delivered three game projects for college events.',
    tags: ['Unity', 'Roblox', 'Code review'],
  },
  {
    title: 'Electronics Project Intern',
    org: 'Summer Internship Program',
    period: 'Summer 2023',
    text: 'Designed and built a Line Follower Robot with a PID control algorithm, and learned industry-standard design practice and documentation.',
    tags: ['PID control', 'Arduino', 'Robotics'],
  },
  {
    title: 'Workshop Coordinator',
    org: 'College Technical Festival',
    period: '2022',
    text: 'Organised technical workshops on Arduino programming and basic game development, leading a team of volunteers for more than 100 participants.',
    tags: ['Arduino', 'Teaching', 'Events'],
  },
];

export const education = [
  {
    title: 'B.Tech, Electronics and Communication Engineering',
    org: 'GITA Autonomous College, Bhubaneswar, Odisha',
    period: '2022 – Present',
    text: 'Focus on electronics design, communication systems and programming.',
  },
  {
    title: 'Higher Secondary (12th)',
    org: 'Vikash Group of Institute, Bargarh, Odisha',
    period: 'Completed 2022',
    text: 'Strong foundation in physics, mathematics and computer science.',
  },
  {
    title: 'Secondary (10th)',
    org: 'Kendriya Vidyalaya, Barmer, Rajasthan',
    period: 'Completed',
    text: 'CBSE curriculum.',
  },
];

export const certifications = [
  { title: 'Game Development Fundamentals', issuer: 'Unity Technologies', year: '2023', text: 'Unity engine fundamentals, C# programming and game design principles.' },
  { title: 'Arduino Certification', issuer: 'Arduino Education', year: '2023', text: 'Arduino programming, circuit design and IoT integration for embedded systems.' },
  { title: 'VLSI Design Essentials', issuer: 'NPTEL', year: '2022', text: 'VLSI circuit design covering digital systems, CMOS technology and Verilog HDL.' },
  { title: 'Python for Electronics', issuer: 'Coursera', year: '2022', text: 'Python for electronics projects, data acquisition and analysis.' },
];

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'unreal', label: 'Unreal' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

export const unrealPillars = [
  {
    title: 'Map design',
    icon: 'map' as const,
    tab: 'ld',
    text: 'Realistic, readable maps: composition, scale, landmarks and flow that make a space feel believable and easy to navigate.',
  },
  {
    title: 'Level design',
    icon: 'level' as const,
    tab: 'ld',
    text: 'Gameplay spaces built around pacing, sight lines and player routes, so a level plays well as well as looks good.',
  },
  {
    title: 'Blueprint logic',
    icon: 'bp' as const,
    tab: 'bp',
    text: 'Gameplay scripted visually with Blueprints: events, branches and timelines wired into behaviour you can read at a glance.',
  },
  {
    title: 'Game optimization',
    icon: 'opt' as const,
    tab: 'opt',
    text: 'Keeping levels smooth on real hardware: draw calls, LODs, culling, lighting and texture budgets, checked with profiling.',
  },
];

export const unrealTopics = [
  'Map design', 'Level design', 'Blueprints', 'Game optimization', 'Realistic environments', 'Lighting', 'LODs',
  'Occlusion culling', 'Performance profiling', 'Multiplayer maps', 'Fortnite UGC maps', 'Battle royale maps',
];
