import { useEffect, useMemo, useRef, useState } from 'react';
import { animate, stagger, utils } from 'animejs';
import { useSearchParams } from 'react-router-dom';
import { Check, ExternalLink, Eye, Github, Info, Link2, Search, Shuffle, X } from 'lucide-react';
import ProjectArt from '@/components/ProjectArt';
import { ProjectPreview } from '@/components/Interactive';
import { AnimHeading, reducedMotion } from '@/components/Motion';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { categoryLabels, projectsData, type Category, type Project } from '@/data/projects';

const filters: Array<Category | 'all'> = ['all', 'game', 'electronics', 'tools'];
type Sort = 'featured' | 'live' | 'az';
const sorts: Record<Sort, string> = { featured: 'Featured first', live: 'Live demos first', az: 'A to Z' };
const INITIAL = 9;

const isFilter = (v: string | null): v is Category | 'all' => !!v && (filters as string[]).includes(v);
const isSort = (v: string | null): v is Sort => !!v && v in sorts;

const dot: Record<Category, string> = { game: 'bg-tech-purple', electronics: 'bg-tech-pink', tools: 'bg-tech-neon' };

const ProjectsSection = () => {
  // Filters, search, sort and the open project live in the URL so any view can be shared as a link.
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
    setParams(next, { replace: true, preventScrollReset: true });
  };

  const [preview, setPreview] = useState<Project | null>(null);
  const [copied, setCopied] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const segRef = useRef<HTMLDivElement>(null);
  const indRef = useRef<HTMLSpanElement>(null);
  const countRef = useRef<HTMLElement>(null);
  const indFirst = useRef(true);
  const firstRun = useRef(true);

  // "/" jumps to the search box.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (e.key === '/' && !(el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable))) {
        e.preventDefault();
        document.getElementById('projects')?.scrollIntoView();
        searchRef.current?.focus({ preventScroll: true });
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const needle = query.trim().toLowerCase();
  const filtered = useMemo(() => {
    const list = projectsData.filter(
      (p) =>
        (filter === 'all' || p.category === filter) &&
        (!needle || [p.title, p.description, ...p.tags].join(' ').toLowerCase().includes(needle)),
    );
    if (sort === 'az') return [...list].sort((a, b) => a.title.localeCompare(b.title));
    if (sort === 'live') return [...list].sort((a, b) => Number(!!b.demoLink) - Number(!!a.demoLink));
    return list;
  }, [filter, needle, sort]);

  const narrowed = filter !== 'all' || !!needle || sort !== 'featured';
  const visible = narrowed || showAll ? filtered : filtered.slice(0, INITIAL);
  const open = projectsData.find((p) => p.id === openId) ?? null;
  const liveCount = projectsData.filter((p) => p.demoLink).length;

  // A highlight that slides between the category buttons.
  useEffect(() => {
    const seg = segRef.current;
    const ind = indRef.current;
    const btn = seg?.querySelector<HTMLElement>('button[aria-pressed="true"]');
    if (!seg || !ind || !btn) return;
    const to = { x: btn.offsetLeft, width: btn.offsetWidth };
    if (indFirst.current || reducedMotion()) { utils.set(ind, to); indFirst.current = false; return; }
    animate(ind, { ...to, duration: 550, ease: 'outElastic(1, .7)' });
  }, [filter]);

  // The visible-count number pops whenever it changes.
  const shownCount = visible.length;
  useEffect(() => {
    if (!countRef.current || reducedMotion()) return;
    animate(countRef.current, { scale: [1.7, 1], rotate: [-8, 0], duration: 600, ease: 'outBack' });
  }, [shownCount]);

  // When the filter, search or sort changes, the new set of cards flips in with a stagger.
  const shownKey = visible.map((p) => p.id).join(',');
  useEffect(() => {
    if (firstRun.current) { firstRun.current = false; return; }
    const g = gridRef.current;
    if (!g || !g.classList.contains('is-visible') || reducedMotion()) return;
    const cards = Array.from(g.children) as HTMLElement[];
    utils.set(cards, { opacity: 0 });
    animate(cards, {
      opacity: [0, 1],
      translateY: [30, 0],
      rotateX: [-14, 0],
      scale: [0.94, 1],
      delay: stagger(60),
      duration: 750,
      ease: 'outExpo',
      onComplete: () => cards.forEach((c) => { c.style.transform = ''; c.style.opacity = ''; }),
    });
  }, [shownKey]);

  // A shared link that opens a project should also scroll to this section.
  useEffect(() => {
    if (openId) document.getElementById('projects')?.scrollIntoView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    const url = `${window.location.origin}/?p=${id}#projects`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt('Copy this link', url);
    }
  };

  return (
    <section id="projects" className="section">
      <div className="wrap">
        <div data-reveal>
          <p className="eyebrow">Projects</p>
          <AnimHeading>Things I have built.</AnimHeading>
          <p className="lead">
            {projectsData.length} projects, {liveCount} of them live and interactive. Open any of them in a preview window without leaving this page.
          </p>
        </div>

        <div className="filters">
          <div className="seg" role="group" aria-label="Filter by category" ref={segRef}>
            <span className="seg-ind" ref={indRef} aria-hidden="true" />
            {filters.map((f) => (
              <button key={f} type="button" aria-pressed={filter === f} onClick={() => update({ cat: f })}>
                {categoryLabels[f]}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="project-search-wrap">
              <Search size={16} className="project-search-icon" aria-hidden="true" />
              <input
                ref={searchRef}
                className="project-search"
                type="text"
                inputMode="search"
                placeholder="Search name or technology…  ( / )"
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
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => update({ p: projectsData[Math.floor(Math.random() * projectsData.length)].id })}>
              <Shuffle size={15} /> Surprise me
            </button>
            <label className="sr-only" htmlFor="sort">Sort projects</label>
            <select id="sort" className="project-select" value={sort} onChange={(e) => update({ sort: e.target.value })}>
              {(Object.keys(sorts) as Sort[]).map((s) => (
                <option key={s} value={s}>{sorts[s]}</option>
              ))}
            </select>
          </div>
        </div>

        <p className="mt-5 text-sm" style={{ color: 'var(--muted)' }} aria-live="polite">
          Showing <b ref={countRef} className="cnt">{visible.length}</b> of {filtered.length} {narrowed ? 'matching ' : ''}projects
          {needle ? ` for "${query.trim()}"` : ''}
          {filter !== 'all' ? ` in ${categoryLabels[filter]}` : ''}.{' '}
          {(needle || filter !== 'all') && (
            <button type="button" className="underline hover:text-white" onClick={() => update({ q: null, cat: null })}>
              Reset
            </button>
          )}
        </p>

        <div className="proj-grid" ref={gridRef} data-stagger>
          {visible.map((p) => (
            <article key={p.id} className="card proj-card spot" data-cat={p.category} data-tilt>
              <span className="shine" aria-hidden="true"><i /></span>
              <ProjectArt id={p.id} category={p.category} />
              <div className="proj-body">
                <div className="flex items-start gap-2.5">
                  <span className={`mt-2 h-2 w-2 shrink-0 rounded-full ${dot[p.category]}`} aria-hidden="true" />
                  <div className="min-w-0">
                    <h3 className="proj-title">{p.title}</h3>
                    <div className="mt-1.5 flex flex-wrap gap-2">
                      {p.featured && <span className="featured-pill">Featured</span>}
                      {p.demoLink ? <span className="status-pill live">Live</span> : <span className="status-pill">{p.category === 'game' ? (p.id === 'the-life' ? 'In development' : 'Game project') : 'Source only'}</span>}
                    </div>
                  </div>
                </div>
                <p className="proj-desc line-clamp-3">{p.description}</p>
                <div className="tags">
                  {p.tags.slice(0, 3).map((t) => (
                    <button key={t} type="button" className="tag" title={`Search for ${t}`} onClick={() => update({ q: t })}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="proj-foot">
                <button type="button" className="card-link text-gray-200" onClick={() => update({ p: p.id })}>
                  <Info size={15} /> Details
                </button>
                {p.demoLink && (
                  <button type="button" className="card-link text-tech-lightBlue" onClick={() => setPreview(p)}>
                    <Eye size={15} /> Preview
                  </button>
                )}
                {p.demoLink && (
                  <a className="card-link text-tech-lightBlue" href={p.demoLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={15} /> Live
                  </a>
                )}
                {p.repoLink && (
                  <a className="card-link text-gray-300 hover:text-white" href={p.repoLink} target="_blank" rel="noopener noreferrer">
                    <Github size={15} /> Source
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        {visible.length === 0 && (
          <p className="mt-10 text-center" style={{ color: 'var(--muted)' }}>
            No project matches "{query}". Try a technology such as "React", "FFT" or "Unreal".
          </p>
        )}

        {!narrowed && !showAll && filtered.length > INITIAL && (
          <div className="mt-8 flex justify-center">
            <button type="button" className="btn btn-ghost" onClick={() => setShowAll(true)}>
              Show all {filtered.length} projects
            </button>
          </div>
        )}
      </div>

      <Dialog open={!!open} onOpenChange={(o) => !o && update({ p: null })}>
        {open && (
          <DialogContent className="max-w-2xl overflow-hidden border-tech-purple/30 bg-tech-dark p-0 text-foreground">
            <ProjectArt id={open.id} category={open.category} className="project-art-lg" />
            <div className="p-6 pt-2">
              <DialogHeader>
                <DialogTitle className="text-2xl">{open.title}</DialogTitle>
                <DialogDescription className="leading-relaxed text-gray-300">{open.description}</DialogDescription>
              </DialogHeader>
              {open.tryThis && (
                <div className="try-box">
                  <p className="try-title">Try this</p>
                  <p>{open.tryThis}</p>
                </div>
              )}
              <div className="mt-4 flex flex-wrap gap-2">
                {open.tags.map((t) => (
                  <span key={t} className="tag" style={{ cursor: 'default' }}>{t}</span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                {open.demoLink && (
                  <button type="button" className="btn btn-primary btn-sm" onClick={() => { update({ p: null }); setPreview(open); }}>
                    <Eye size={15} /> Preview here
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
    </section>
  );
};

export default ProjectsSection;
