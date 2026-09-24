export const profile = {
  name: 'Dhananjay Kumar Seth',
  first: 'Dhananjay',
  role: 'Lead Game Developer',
  company: 'Gaurav Go Games',
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
  'interactive DSP tools',
  'circuit and control simulators',
  'game worlds in Unreal Engine',
  'ROBLOX experiences',
  'things that make theory visible',
];

export const bio = [
  'I am an Electronics and Communication Engineering student at GITA Autonomous College, Bhubaneswar. I am the UGC Dev Domain Lead at Gaurav Go Games, where I lead the user-generated content team, specialising in ROBLOX and Fortnite, with a focus on realistic map design in Unreal Engine.',
  'My work sits between hardware and software. I build browser-based simulators that turn signal processing, control theory, digital logic and power systems into something you can poke at, and I lead teams that build immersive game worlds.',
  'I keep growing through hands-on leadership, team management and staying current with the industry. My goal is to use my technical skills and leadership to create meaningful, engaging experiences.',
];

export const facts = [
  { label: 'Studying', value: 'B.Tech, Electronics & Communication' },
  { label: 'College', value: 'GITA Autonomous College' },
  { label: 'Based in', value: 'Bhubaneswar, Odisha' },
  { label: 'Working at', value: 'Gaurav Go Games' },
];

export type SkillGroup = { title: string; tone: 'purple' | 'pink' | 'blue'; items: { name: string; level: number }[] };

export const skillGroups: SkillGroup[] = [
  {
    title: 'Game development',
    tone: 'purple',
    items: [
      { name: 'Roblox development', level: 90 },
      { name: 'Unity 3D', level: 85 },
      { name: 'Lua scripting', level: 80 },
      { name: 'C# programming', level: 75 },
      { name: 'Game UI design', level: 70 },
    ],
  },
  {
    title: 'Electronics engineering',
    tone: 'pink',
    items: [
      { name: 'Arduino', level: 90 },
      { name: 'Circuit design', level: 85 },
      { name: 'PCB design', level: 80 },
      { name: 'VLSI design', level: 75 },
      { name: 'Embedded systems', level: 70 },
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

export const otherSkills = ['3D modelling', 'Digital signal processing', 'Robot Operating System (ROS)', 'Git', 'Microcontroller programming'];

export const experience = [
  {
    title: 'Lead Game Developer',
    org: 'Gaurav Go Games',
    period: 'Present',
    current: true,
    text: 'Lead the User Generated Content (UGC) development domain, specialising in ROBLOX and Fortnite. Manage team workflows, build realistic maps in Unreal Engine and oversee immersive game environments, with responsibility for project direction, quality assurance and gameplay mechanics across platforms.',
    tags: ['Unreal Engine', 'Fortnite', 'ROBLOX', 'Team lead'],
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
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];
