import { useEffect, useRef, useState } from 'react';
import { Bot, Send, X } from 'lucide-react';
import { projectsData, type Project } from '@/data/projects';
import { certifications, education, experience, otherSkills, profile, skillGroups } from '@/data/site';

/*
 * LYRA: the portfolio assistant.
 * It answers from the site's own data (projects, skills, experience, education), entirely in the browser.
 * No external AI service and no API key are involved, so nothing can leak and nothing can be billed.
 */

type Link = { label: string; href: string };
type Message = { id: number; from: 'bot' | 'me'; text: string; links?: Link[] };
type Reply = { text: string; links?: Link[] };

const live = projectsData.filter((p) => p.demoLink);

const projectReply = (p: Project): Reply => ({
  text: `${p.title}: ${p.description}${p.tryThis ? `\n\nTry this: ${p.tryThis}` : ''}`,
  links: [
    ...(p.demoLink ? [{ label: 'Open live', href: p.demoLink }] : []),
    ...(p.repoLink ? [{ label: 'Source', href: p.repoLink }] : []),
    { label: 'Details on this page', href: `/?p=${p.id}#projects` },
  ],
});

const STOP = new Set(['tell', 'about', 'the', 'what', 'how', 'does', 'his', 'him', 'with', 'and', 'for', 'you', 'can', 'has', 'have', 'are', 'who', 'was', 'this', 'that', 'show', 'give', 'any', 'all', 'more', 'some', 'project', 'projects', 'built', 'make', 'made', 'work', 'live', 'demo', 'game', 'games', 'web', 'tools', 'tool', 'dhananjay', 'kumar', 'seth']);
const has = (q: string, words: string[]) => words.some((w) => q.includes(w));

export function answer(input: string): Reply {
  const q = input.toLowerCase();

  // A project mentioned by name, or by one of its tags.
  const byName = projectsData.find((p) => q.includes(p.title.toLowerCase()) || q.includes(p.id.replace(/-/g, ' ')));
  if (byName) return projectReply(byName);
  // Otherwise score every project by how many distinctive words of the question appear in it.
  const intent = has(q, ['skill', 'experience', 'contact', 'email', 'education', 'resume', 'certif', 'college', 'hire', 'reach']);
  if (!intent) {
    const words = (q.match(/[a-z0-9+#]{3,}/g) ?? []).filter((w) => !STOP.has(w));
    let best: Project | null = null;
    let bestScore = 0;
    for (const p of projectsData) {
      const hay = [p.title, p.description, ...p.tags].join(' ').toLowerCase();
      const title = p.title.toLowerCase();
      // A word in the title counts triple: it is the strongest sign the question is about that project.
      const score = words.reduce((n, w) => n + (title.includes(w) ? 3 : hay.includes(w) ? 1 : 0), 0);
      if (score > bestScore) { best = p; bestScore = score; }
    }
    if (best && bestScore >= 1) return projectReply(best);
  }

  if (has(q, ['hello', 'hey']) || /^hi\b/.test(q))
    return { text: `Hi! I am LYRA, the assistant for ${profile.first}'s portfolio. Ask me about his projects, skills, experience or how to reach him.` };

  if (has(q, ['live', 'demo', 'try', 'play', 'interactive']))
    return {
      text: `${live.length} of the projects run live in the browser and need no sign-up:\n${live.map((p) => `• ${p.title}`).join('\n')}`,
      links: [{ label: 'Browse the projects', href: '#projects' }],
    };

  if (has(q, ['project', 'build', 'built', 'made', 'portfolio', 'work on', 'created']))
    return {
      text: `${projectsData.length} projects across electronics, web tools and game development. The interactive ones include ${live.slice(0, 5).map((p) => p.title).join(', ')} and more. Ask about any of them by name.`,
      links: [{ label: 'Browse the projects', href: '#projects' }],
    };

  if (has(q, ['skill', 'know', 'tech', 'language', 'stack', 'tools']))
    return {
      text: skillGroups.map((g) => `${g.title}: ${g.items.map((i) => i.name).join(', ')}`).join('\n') + `\nAlso: ${otherSkills.join(', ')}.`,
      links: [{ label: 'See the skills', href: '#skills' }],
    };

  if (has(q, ['experience', 'job', 'career', 'lead', 'gaurav', 'intern', 'role', 'company']))
    return {
      text: experience.map((e) => `• ${e.title}, ${e.org} (${e.period})`).join('\n'),
      links: [{ label: 'See the experience', href: '#experience' }],
    };

  if (has(q, ['education', 'college', 'degree', 'study', 'school', 'gita', 'btech', 'b.tech']))
    return {
      text: education.map((e) => `• ${e.title}, ${e.org} (${e.period})`).join('\n'),
      links: [{ label: 'See education', href: '#education' }],
    };

  if (has(q, ['certif', 'course', 'nptel', 'coursera']))
    return { text: certifications.map((c) => `• ${c.title}, ${c.issuer} (${c.year})`).join('\n'), links: [{ label: 'See certifications', href: '#education' }] };

  if (has(q, ['game', 'unreal', 'roblox', 'fortnite', 'unity']))
    return {
      text: `${profile.first} leads game development at ${profile.company}, specialising in ROBLOX and Fortnite with realistic map design in Unreal Engine. He also has Unity and Lua experience.`,
      links: [{ label: 'Game projects', href: '/?cat=game#projects' }],
    };

  if (has(q, ['resume', 'cv']))
    return { text: 'You can download his resume as a PDF.', links: [{ label: 'Download resume', href: profile.resume }] };

  if (has(q, ['contact', 'email', 'reach', 'hire', 'message', 'linkedin', 'github', 'instagram', 'social']))
    return {
      text: `The quickest way is email: ${profile.email}. You can also use the contact form on this page.`,
      links: [
        { label: 'Contact form', href: '#contact' },
        { label: 'GitHub', href: profile.socials.github },
        { label: 'LinkedIn', href: profile.socials.linkedin },
      ],
    };

  if (has(q, ['who', 'about', 'yourself', 'dhananjay']))
    return {
      text: `${profile.name} is an Electronics & Communication Engineering student at ${profile.college}, ${profile.location}, and the Lead Game Developer at ${profile.company}. He builds interactive engineering simulators and game worlds.`,
      links: [{ label: 'About', href: '#about' }],
    };

  return {
    text: 'I can help with his projects, skills, experience, education, certifications, resume and contact details. Try one of the buttons below, or ask about a project such as "DSP" or "SR latch".',
  };
}

const chips = ['What has he built?', 'Live demos', 'Skills', 'Experience', 'Contact'];

const Lyra = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [msgs, setMsgs] = useState<Message[]>([
    { id: 0, from: 'bot', text: `Hi, I am LYRA. Ask me anything about ${profile.first}'s work.` },
  ]);
  const endRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(1);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [msgs, open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const ask = (text: string) => {
    const t = text.trim();
    if (!t) return;
    const r = answer(t);
    setMsgs((m) => [...m, { id: idRef.current++, from: 'me', text: t }, { id: idRef.current++, from: 'bot', text: r.text, links: r.links }]);
    setInput('');
  };

  return (
    <>
      {open && (
        <div className="lyra-panel" role="dialog" aria-label="LYRA assistant">
          <div className="lyra-head">
            <div className="flex items-center gap-2 font-bold"><Bot size={18} /> LYRA <span className="text-xs font-normal opacity-70">portfolio assistant</span></div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close assistant"><X size={18} /></button>
          </div>
          <div className="lyra-log" aria-live="polite">
            {msgs.map((m) => (
              <div key={m.id} className={`msg ${m.from === 'me' ? 'me' : 'bot'}`}>
                {m.text}
                {m.links && (
                  <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                    {m.links.map((l) => {
                      const external = /^https?:/.test(l.href);
                      return (
                        <a key={l.label} href={l.href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : { onClick: () => setOpen(false) })}>
                          {l.label}
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <div className="lyra-chips">
            {chips.map((c) => (
              <button key={c} type="button" className="tag" onClick={() => ask(c)}>{c}</button>
            ))}
          </div>
          <form className="lyra-form" onSubmit={(e) => { e.preventDefault(); ask(input); }}>
            <input className="input" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about a project, skill…" aria-label="Message LYRA" maxLength={200} />
            <button type="submit" className="btn btn-primary btn-sm" aria-label="Send"><Send size={15} /></button>
          </form>
        </div>
      )}
      <button type="button" className="lyra-fab" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label={open ? 'Close assistant' : 'Ask LYRA'}>
        <Bot size={20} /> {open ? 'Close' : 'Ask LYRA'}
      </button>
    </>
  );
};

export default Lyra;
