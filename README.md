# Dhananjay Kumar Seth: portfolio

Personal portfolio of an Electronics & Communication engineer and game developer. Live at
https://dhananjay-kumar-seth.vercel.app

## What is in it
- **Projects**: 16 projects, 11 of them live interactive tools (DSP, PID control, digital logic, communications,
  power systems, EV batteries, aptitude practice). Filters, search, sort and the open project are stored in the URL,
  so any view can be shared as a link, for example `/projects?cat=electronics&q=FFT` or `/projects?p=dsp-signal-lab`.
- **Live preview**: any live tool opens in an in-page window with a desktop / phone toggle.
- **LYRA**: an assistant that helps visitors explore the portfolio.

## Stack
React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, React Router. Routes and the assistant are code-split.

## Develop
```bash
npm install
npm run dev
npm run build
```

Project data lives in `src/data/projects.ts`; add a project there and it appears on the Projects page,
in the structured data and in the search.
