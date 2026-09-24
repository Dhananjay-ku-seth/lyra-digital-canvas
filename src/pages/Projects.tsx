import { useState } from 'react';
import { Cpu, Eye, ExternalLink, Gamepad2, Github, Search, Wrench, X } from 'lucide-react';
import CircuitBackground from '@/components/CircuitBackground';
import Lyra from '@/components/Lyra';
import { ProjectPreview, useReveal } from '@/components/Interactive';
import { categoryLabels, projectsData, type Category, type Project } from '@/data/projects';
import { useSeo } from '@/hooks/useSeo';

const filters: Array<Category | 'all'> = ['all', 'game', 'electronics', 'tools'];

const ProjectIcon = ({ category }: { category: Category }) => {
  const cls = 'h-10 w-10';
  if (category === 'game') return <Gamepad2 className={`${cls} text-tech-purple`} strokeWidth={1.5} />;
  if (category === 'tools') return <Wrench className={`${cls} text-tech-neon`} strokeWidth={1.5} />;
  return <Cpu className={`${cls} text-tech-pink`} strokeWidth={1.5} />;
};

const accent: Record<Category, string> = {
  game: 'bg-tech-purple/20 text-tech-purple',
  electronics: 'bg-tech-pink/20 text-tech-pink',
  tools: 'bg-tech-neon/15 text-tech-neon',
};

const Projects = () => {
  useSeo({
    title: 'Projects — Dhananjay Kumar Seth',
    description:
      'Interactive engineering projects by Dhananjay Kumar Seth: DSP Signal Lab, PID Control Playground, Logic Circuit Simulator, Comms Simulator, Smart Energy Meter and more, plus Unreal and Roblox game development.',
  });
  const [filter, setFilter] = useState<Category | 'all'>('all');
  const [query, setQuery] = useState('');
  const [preview, setPreview] = useState<Project | null>(null);
  useReveal();

  const needle = query.trim().toLowerCase();
  const matches = (p: Project) =>
    !needle || [p.title, p.description, ...p.tags].join(' ').toLowerCase().includes(needle);
  const visible = projectsData.filter((p) => (filter === 'all' || p.category === filter) && matches(p));
  const liveCount = projectsData.filter((p) => p.demoLink).length;

  return (
    <main className="min-h-screen pt-20 pb-16 relative">
      <CircuitBackground />

      <div className="container-custom relative z-10">
        <h1 className="section-heading text-center mx-auto">My Projects</h1>
        <p className="mt-6 text-center text-gray-400">
          {projectsData.length} projects, {liveCount} of them live. Open any of them in a preview window without leaving this page.
        </p>

        <div className="mt-10 mb-6 flex flex-col items-center gap-4 lg:flex-row lg:justify-between">
          <div className="inline-flex flex-wrap justify-center p-1 bg-tech-dark/50 backdrop-blur-sm rounded-lg border border-tech-purple/20">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={`px-5 py-2 rounded-md transition-all ${
                  filter === f ? 'bg-tech-purple text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                {categoryLabels[f]}
              </button>
            ))}
          </div>

          <div className="project-search-wrap">
            <Search size={16} className="project-search-icon" aria-hidden="true" />
            <input
              className="project-search"
              type="text"
              inputMode="search"
              placeholder="Search by name or technology…"
              aria-label="Search projects"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button type="button" className="search-clear" onClick={() => setQuery('')} aria-label="Clear search">
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        <p className="mb-6 text-sm text-gray-400" aria-live="polite">
          Showing {visible.length} of {projectsData.length} projects
          {needle ? ` matching "${query.trim()}"` : ''}
          {filter !== 'all' ? ` in ${categoryLabels[filter]}` : ''}.{' '}
          {(needle || filter !== 'all') && (
            <button
              type="button"
              className="underline hover:text-white"
              onClick={() => {
                setQuery('');
                setFilter('all');
              }}
            >
              Reset
            </button>
          )}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((project) => (
            <article
              key={project.id}
              data-reveal
              data-cat={project.category}
              className="project-card spot group bg-tech-dark/80 backdrop-blur-sm rounded-lg border border-tech-purple/20 overflow-hidden flex flex-col"
            >
              <div className="p-6 flex items-center gap-4">
                <div className="p-3 rounded-lg bg-white/5">
                  <ProjectIcon category={project.category} />
                </div>
                <div>
                  <h3 className="text-xl font-bold leading-snug">{project.title}</h3>
                  {project.featured && <span className="featured-pill">Featured</span>}
                </div>
              </div>

              <div className="px-6 pb-4 flex-1">
                <p className="text-gray-300 text-sm leading-relaxed">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setQuery(tag)}
                      title={`Search for ${tag}`}
                      className={`px-2 py-1 text-xs rounded-full transition-transform hover:-translate-y-0.5 ${accent[project.category]}`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="px-6 py-4 bg-tech-dark/50 flex flex-wrap items-center gap-x-5 gap-y-2">
                {project.demoLink && (
                  <button type="button" onClick={() => setPreview(project)} className="card-link text-tech-lightBlue">
                    <Eye size={15} /> Preview
                  </button>
                )}
                {project.demoLink && (
                  <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="card-link text-tech-lightBlue">
                    <ExternalLink size={15} /> Live
                  </a>
                )}
                {project.repoLink && (
                  <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="card-link text-gray-300 hover:text-white">
                    <Github size={15} /> Source
                  </a>
                )}
                {!project.demoLink && !project.repoLink && <span className="text-gray-500 text-sm">Private project</span>}
                {project.repoLink && !project.demoLink && <span className="text-gray-500 text-xs">Source only</span>}
              </div>
            </article>
          ))}
        </div>

        {visible.length === 0 && (
          <p className="mt-12 text-center text-gray-400">
            No project matches "{query}". Try a technology such as "React", "FFT" or "Unreal".
          </p>
        )}
      </div>

      {preview?.demoLink && <ProjectPreview title={preview.title} url={preview.demoLink} onClose={() => setPreview(null)} />}

      <Lyra initialMessage="Here are Dhananjay's projects! Feel free to ask me about any specific project or technology he has worked with." />
    </main>
  );
};

export default Projects;
