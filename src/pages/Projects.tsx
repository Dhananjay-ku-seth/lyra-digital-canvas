import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Check, Cpu, ExternalLink, Eye, Gamepad2, Github, Info, Link2, Search, Wrench, X } from 'lucide-react';
import CircuitBackground from '@/components/CircuitBackground';
import LazyLyra from '@/components/LazyLyra';
import ProjectArt from '@/components/ProjectArt';
import { ProjectPreview, useReveal } from '@/components/Interactive';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { categoryLabels, projectsData, type Category, type Project } from '@/data/projects';
import { useSeo } from '@/hooks/useSeo';

const filters: Array<Category | 'all'> = ['all', 'game', 'electronics', 'tools'];
type Sort = 'featured' | 'live' | 'az';
const sorts: Record<Sort, string> = { featured: 'Featured first', live: 'Live demos first', az: 'A to Z' };

const CategoryIcon = ({ category }: { category: Category }) => {
  const cls = 'h-5 w-5';
  if (category === 'game') return <Gamepad2 className={`${cls} text-tech-purple`} strokeWidth={1.7} />;
  if (category === 'tools') return <Wrench className={`${cls} text-tech-neon`} strokeWidth={1.7} />;
  return <Cpu className={`${cls} text-tech-pink`} strokeWidth={1.7} />;
};

const accent: Record<Category, string> = {
  game: 'bg-tech-purple/20 text-tech-purple',
  electronics: 'bg-tech-pink/20 text-tech-pink',
  tools: 'bg-tech-neon/15 text-tech-neon',
};

const isFilter = (v: string | null): v is Category | 'all' => !!v && (filters as string[]).includes(v);
const isSort = (v: string | null): v is Sort => !!v && v in sorts;

const Projects = () => {
  useSeo({
    title: 'Projects — Dhananjay Kumar Seth',
    description:
      'Interactive engineering projects by Dhananjay Kumar Seth: DSP Signal Lab, PID Control Playground, Logic Circuit Simulator, Comms Simulator, Smart Energy Meter, EV Battery Simulator and more, plus Unreal and Roblox game development.',
  });

  // Filters, search, sort and the open project live in the URL, so any view can be shared as a link.
  const [params, setParams] = useSearchParams();
  const filter: Category | 'all' = isFilter(params.get('cat')) ? (params.get('cat') as Category | 'all') : 'all';
  const sort: Sort = isSort(params.get('sort')) ? (params.get('sort') as Sort) : 'featured';
  const query = params.get('q') ?? '';
  const openId = params.get('p');

  const update = (patch: Record<string, string | null>) => {
    const next = new URLSearchParams(params);
    for (const [k, v] of Object.entries(patch)) {
      if (v === null || v === '' || v === 'all' || (k === 'sort' && v === 'featured')) next.delete(k);
      else next.set(k, v);
    }
    setParams(next, { replace: true });
  };

  const [preview, setPreview] = useState<Project | null>(null);
  const [copied, setCopied] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  useReveal();

  // "/" jumps to the search box, like most developer tools.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (e.key === '/' && !(el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable))) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const needle = query.trim().toLowerCase();
  const visible = useMemo(() => {
    const list = projectsData.filter(
      (p) =>
        (filter === 'all' || p.category === filter) &&
        (!needle || [p.title, p.description, ...p.tags].join(' ').toLowerCase().includes(needle)),
    );
    if (sort === 'az') return [...list].sort((a, b) => a.title.localeCompare(b.title));
    if (sort === 'live') return [...list].sort((a, b) => Number(!!b.demoLink) - Number(!!a.demoLink));
    return list;
  }, [filter, needle, sort]);

  const liveCount = projectsData.filter((p) => p.demoLink).length;
  const open = projectsData.find((p) => p.id === openId) ?? null;

  // Structured data so search engines can list the projects.
  useEffect(() => {
    const el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = 'ld-projects';
    el.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Projects by Dhananjay Kumar Seth',
      itemListElement: projectsData.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': p.demoLink ? 'WebApplication' : 'CreativeWork',
          name: p.title,
          description: p.description,
          ...(p.demoLink ? { url: p.demoLink, applicationCategory: 'EducationalApplication', operatingSystem: 'Web' } : {}),
          author: { '@type': 'Person', name: 'Dhananjay Kumar Seth' },
        },
      })),
    });
    document.head.appendChild(el);
    return () => el.remove();
  }, []);

  const copyLink = async (id: string) => {
    const url = `${window.location.origin}/projects?p=${id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt('Copy this link', url);
    }
  };

  return (
    <main id="main" className="min-h-screen pt-20 pb-16 relative">
      <CircuitBackground />

      <div className="container-custom relative z-10">
        <h1 className="section-heading text-center mx-auto">My Projects</h1>
        <p className="mt-6 text-center text-gray-400">
          {projectsData.length} projects, {liveCount} of them live. Open any of them in a preview window without leaving this page.
        </p>

        <div className="mt-10 mb-6 flex flex-col items-center gap-4 lg:flex-row lg:justify-between">
          <div className="inline-flex flex-wrap justify-center p-1 bg-tech-dark/50 backdrop-blur-sm rounded-lg border border-tech-purple/20" role="group" aria-label="Filter by category">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => update({ cat: f })}
                aria-pressed={filter === f}
                className={`px-5 py-2 rounded-md transition-all ${filter === f ? 'bg-tech-purple text-white' : 'text-gray-300 hover:text-white'}`}
              >
                {categoryLabels[f]}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="project-search-wrap">
              <Search size={16} className="project-search-icon" aria-hidden="true" />
              <input
                ref={searchRef}
                className="project-search"
                type="text"
                inputMode="search"
                placeholder="Search by name or technology…  ( / )"
                aria-label="Search projects"
                value={query}
                onChange={(e) => update({ q: e.target.value })}
              />
              {query && (
                <button type="button" className="search-clear" onClick={() => update({ q: null })} aria-label="Clear search">
                  <X size={14} />
                </button>
              )}
            </div>
            <label className="sr-only" htmlFor="sort">Sort projects</label>
            <select id="sort" className="project-select" value={sort} onChange={(e) => update({ sort: e.target.value })}>
              {(Object.keys(sorts) as Sort[]).map((s) => (
                <option key={s} value={s}>{sorts[s]}</option>
              ))}
            </select>
          </div>
        </div>

        <p className="mb-6 text-sm text-gray-400" aria-live="polite">
          Showing {visible.length} of {projectsData.length} projects
          {needle ? ` matching "${query.trim()}"` : ''}
          {filter !== 'all' ? ` in ${categoryLabels[filter]}` : ''}.{' '}
          {(needle || filter !== 'all') && (
            <button type="button" className="underline hover:text-white" onClick={() => update({ q: null, cat: null })}>
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
              <ProjectArt id={project.id} category={project.category} />
              <div className="px-6 pt-5 flex items-start gap-3">
                <CategoryIcon category={project.category} />
                <div className="min-w-0">
                  <h3 className="text-xl font-bold leading-snug">{project.title}</h3>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {project.featured && <span className="featured-pill">Featured</span>}
                    {project.demoLink ? <span className="status-pill live">Live</span> : <span className="status-pill">Source only</span>}
                  </div>
                </div>
              </div>

              <div className="px-6 pb-4 pt-3 flex-1">
                <p className="text-gray-300 text-sm leading-relaxed line-clamp-4">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.slice(0, 4).map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => update({ q: tag })}
                      title={`Search for ${tag}`}
                      className={`px-2 py-1 text-xs rounded-full transition-transform hover:-translate-y-0.5 ${accent[project.category]}`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="px-6 py-4 bg-tech-dark/50 flex flex-wrap items-center gap-x-5 gap-y-2">
                <button type="button" onClick={() => update({ p: project.id })} className="card-link text-gray-200">
                  <Info size={15} /> Details
                </button>
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

      <Dialog open={!!open} onOpenChange={(o) => !o && update({ p: null })}>
        {open && (
          <DialogContent className="max-w-2xl bg-tech-dark border-tech-purple/30 text-foreground overflow-hidden p-0">
            <ProjectArt id={open.id} category={open.category} className="project-art-lg" />
            <div className="p-6 pt-2">
              <DialogHeader>
                <DialogTitle className="text-2xl">{open.title}</DialogTitle>
                <DialogDescription className="text-gray-300 leading-relaxed">{open.description}</DialogDescription>
              </DialogHeader>
              {open.tryThis && (
                <div className="try-box">
                  <p className="try-title">Try this</p>
                  <p>{open.tryThis}</p>
                </div>
              )}
              <div className="mt-4 flex flex-wrap gap-2">
                {open.tags.map((tag) => (
                  <span key={tag} className={`px-2 py-1 text-xs rounded-full ${accent[open.category]}`}>{tag}</span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                {open.demoLink && (
                  <button type="button" className="tech-button-3d px-4 py-2 text-sm" onClick={() => { update({ p: null }); setPreview(open); }}>
                    <Eye size={15} className="inline mr-1.5" /> Preview here
                  </button>
                )}
                {open.demoLink && (
                  <a className="dialog-btn" href={open.demoLink} target="_blank" rel="noopener noreferrer"><ExternalLink size={15} /> Open live</a>
                )}
                {open.repoLink && (
                  <a className="dialog-btn" href={open.repoLink} target="_blank" rel="noopener noreferrer"><Github size={15} /> Source</a>
                )}
                <button type="button" className="dialog-btn" onClick={() => copyLink(open.id)}>
                  {copied ? <Check size={15} /> : <Link2 size={15} />} {copied ? 'Link copied' : 'Copy link'}
                </button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>

      {preview?.demoLink && <ProjectPreview title={preview.title} url={preview.demoLink} onClose={() => setPreview(null)} />}

      <LazyLyra initialMessage="Here are Dhananjay's projects! Feel free to ask me about any specific project or technology he has worked with." />
    </main>
  );
};

export default Projects;
