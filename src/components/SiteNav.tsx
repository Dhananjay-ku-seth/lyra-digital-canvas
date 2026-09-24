import { useEffect, useState } from 'react';
import { Download, Menu, X } from 'lucide-react';
import { navItems, profile } from '@/data/site';
import { useScrollSpy } from '@/hooks/useScrollSpy';

const SiteNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useScrollSpy(navItems.map((n) => n.id));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock page scroll behind the mobile menu and close it on Escape.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <header className={`nav${scrolled || open ? ' scrolled' : ''}`}>
      <div className="wrap nav-inner">
        <a href="#top" className="logo" aria-label={`${profile.name}, back to top`}>
          DKS<span>.</span>
        </a>
        <nav className="nav-links" aria-label="Sections">
          {navItems.map((n) => (
            <a key={n.id} href={`#${n.id}`} className={`nav-link${active === n.id ? ' active' : ''}`} aria-current={active === n.id ? 'true' : undefined}>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a className="btn btn-ghost btn-sm nav-cta" href={profile.resume} download>
            <Download size={15} /> Resume
          </a>
          <button type="button" className="menu-btn" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="mobile-menu fade-swap" aria-label="Sections">
          {navItems.map((n) => (
            <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)}>
              {n.label}
            </a>
          ))}
          <a href={profile.resume} download onClick={() => setOpen(false)}>
            Download resume
          </a>
        </nav>
      )}
    </header>
  );
};

export default SiteNav;
