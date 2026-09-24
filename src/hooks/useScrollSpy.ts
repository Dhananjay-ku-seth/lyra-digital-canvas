import { useEffect, useState } from 'react';

/** Returns the id of the section currently under the top of the viewport. */
export function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState('');
  const key = ids.join('|');
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((e): e is HTMLElement => Boolean(e));
    if (!els.length) return undefined;
    const onScroll = () => {
      const line = window.innerHeight * 0.35;
      let current = '';
      for (const el of els) if (el.getBoundingClientRect().top <= line) current = el.id;
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return active;
}
