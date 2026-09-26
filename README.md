# Dhananjay Kumar Seth: portfolio

Personal portfolio of an Electronics & Communication engineer and game developer. Live at
https://dhananjay-kumar-seth.vercel.app

## What is in it
A single-page site with anchored sections: About, Projects, Skills, Experience, Education and Contact. The old
addresses (`/about`, `/projects`, `/resume`, `/contact`) redirect to the matching section.

- **Projects**: 16 projects, 11 of them live interactive tools (DSP, PID control, digital logic, communications,
  power systems, EV batteries, aptitude practice). Filters, search, sort and the open project are stored in the URL,
  so any view can be shared as a link, for example `/projects?cat=electronics&q=FFT` or `/projects?p=dsp-signal-lab`.
- **Live preview**: any live tool opens in an in-page window with a desktop / phone toggle.
- **Motion**: built with anime.js: staggered scroll reveals, a hero intro timeline, magnetic buttons, 3D card tilt, a cursor follower, animated skill bars and counters, and a scroll-drawn timeline. Everything respects the reduced-motion setting.
- **Circuit-board background**: procedurally laid-out copper traces, pads and chip footprints, with light pulses racing along them (anime.js motion paths) and a brighter layer that follows the pointer. Floating electronic parts (chips, transistors, resistors, capacitors, LEDs, inductors) drift, parallax, dodge the cursor and spin with sparks when clicked.
- **Unreal Engine workbench**: an editor-styled panel with three tabs. *Blueprints*: a working node graph (drag nodes, run the "door that needs a key" logic). *Level design*: a greybox map with cover, a real ray-cast sightline calculation, the player route and encounter beats. *Optimization*: an exact LOD triangle-count demo and a frame-budget playground (an illustrative model, not a benchmark). Plus an Unreal-style console with a real `stat fps`.
- **LYRA**: an assistant that answers from the site's own data. It runs in the browser and uses no external AI service or API key.
- **Contact form**: posts to `/api/contact` on the LabBench hub project, which emails the message using its Gmail sender.

## Stack
React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, React Router, anime.js. The assistant loads in its own chunk.

## Develop
```bash
npm install
npm run dev
npm run build
```

Project data lives in `src/data/projects.ts`; add a project there and it appears on the Projects page,
in the structured data and in the search.
