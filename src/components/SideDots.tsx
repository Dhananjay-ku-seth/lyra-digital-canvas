import { useScrollSpy } from '@/hooks/useScrollSpy';

const DOTS = [
  { id: 'top', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'unreal', label: 'Unreal Engine' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

/** A dot rail on the right edge: shows where you are and jumps to any section. */
const SideDots = () => {
  const active = useScrollSpy(DOTS.map((d) => d.id)) || 'top';
  return (
    <nav className="side-dots" aria-label="Page sections">
      {DOTS.map((d) => (
        <a key={d.id} href={`#${d.id}`} className={active === d.id ? 'on' : ''} aria-label={d.label} aria-current={active === d.id ? 'true' : undefined}>
          <span>{d.label}</span>
          <i />
        </a>
      ))}
    </nav>
  );
};

export default SideDots;
