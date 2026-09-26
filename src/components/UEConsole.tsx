import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectsData } from '@/data/projects';
import { profile, skillGroups } from '@/data/site';

/* An Unreal-editor-style console: type a command, use the arrow keys for history and Tab to complete. */

type Line = { id: number; kind: 'in' | 'out' | 'err'; text: string };

const COMMANDS = ['help', 'about', 'unreal', 'games', 'projects', 'open', 'skills', 'optimize', 'blueprint', 'level', 'stat', 'contact', 'resume', 'clear', 'sudo'];

/** Measures this page's real frame rate for one second. */
const measureFps = () =>
  new Promise<number>((resolve) => {
    let frames = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      frames += 1;
      if (now - t0 < 1000) requestAnimationFrame(tick);
      else resolve(Math.round((frames * 1000) / (now - t0)));
    };
    requestAnimationFrame(tick);
  });

const games = projectsData.filter((p) => p.category === 'game');

const UEConsole = () => {
  const navigate = useNavigate();
  const [lines, setLines] = useState<Line[]>([
    { id: 0, kind: 'out', text: `LogPortfolio: Welcome. Type "help" to list commands.` },
  ]);
  const [value, setValue] = useState('');
  const [hist, setHist] = useState<string[]>([]);
  const [hi, setHi] = useState(-1);
  const box = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const idRef = useRef(1);

  useEffect(() => {
    const el = box.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const push = (kind: Line['kind'], text: string) =>
    setLines((l) => [...l, { id: idRef.current++, kind, text }].slice(-60));

  const run = async (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;
    push('in', cmd);
    setHist((h) => [cmd, ...h].slice(0, 30));
    setHi(-1);
    const [name, ...rest] = cmd.toLowerCase().split(/\s+/);
    const arg = rest.join(' ');
    switch (name) {
      case 'help':
        push('out', 'help        list commands\nabout       who I am\nunreal      what I do in Unreal Engine\ngames       the games I work on\nprojects    all projects (or: projects electronics)\nopen <name> open a project, e.g. open zeher\nskills      my skills\nblueprint   open the Blueprint demo\nlevel       open the level design demo\noptimize    how I keep levels fast (opens the demo)\nstat fps    measure this page\'s real frame rate\ncontact     how to reach me\nresume      download my resume\nclear       clear the console');
        break;
      case 'about':
      case 'whoami':
        push('out', `${profile.name}\nECE student (${profile.specialisation}), Lead Game Developer at ${profile.company}.\nMain craft: Unreal Engine map and level design and game optimisation.`);
        break;
      case 'unreal':
        push('out', 'Unreal Engine is my main craft: realistic map design, level design and game optimisation.\nI also have working experience in Unity and ROBLOX.');
        break;
      case 'games':
        push('out', games.map((g) => `• ${g.title}`).join('\n'));
        break;
      case 'projects': {
        const list = arg ? projectsData.filter((p) => p.category === arg || p.title.toLowerCase().includes(arg)) : projectsData;
        push('out', list.length ? list.map((p) => `• ${p.title}${p.demoLink ? '  [live]' : ''}`).join('\n') : `No projects match "${arg}".`);
        break;
      }
      case 'open': {
        const p = projectsData.find((x) => x.id.includes(arg.replace(/\s+/g, '-')) || x.title.toLowerCase().includes(arg));
        if (!arg) push('err', 'Usage: open <project name>');
        else if (!p) push('err', `No project called "${arg}". Try "projects".`);
        else {
          push('out', `Opening ${p.title}…`);
          navigate({ search: `?p=${p.id}`, hash: '#projects' }, { state: { scroll: true } });
        }
        break;
      }
      case 'skills':
        push('out', skillGroups.map((g) => `${g.title}: ${g.items.map((i) => i.name).join(', ')}`).join('\n'));
        break;
      case 'blueprint':
      case 'blueprints':
        push('out', 'Opening the Blueprint workbench: a working "door that needs a key" graph.');
        window.dispatchEvent(new CustomEvent('ue-tab', { detail: 'bp' }));
        break;
      case 'level':
        push('out', 'Opening the level design workbench: cover, sightlines, flow and beats.');
        window.dispatchEvent(new CustomEvent('ue-tab', { detail: 'ld' }));
        break;
      case 'stat':
        if (arg === 'fps') {
          push('out', 'Measuring for one second…');
          const fps = await measureFps();
          push('out', `StatFPS: this page is running at ${fps} FPS right now.`);
        } else push('err', 'Usage: stat fps');
        break;
      case 'optimize':
      case 'optimise':
        window.dispatchEvent(new CustomEvent('ue-tab', { detail: 'opt' }));
        push('out', 'Levels stay fast by working on the frame budget:\n• instanced meshes and LODs to cut draw calls\n• occlusion culling and merged distant meshes\n• baked lighting where live light is not needed\n• texture streaming and sensible draw distances\nTry the Optimization tab in the workbench.');
        break;
      case 'contact':
        push('out', `Email: ${profile.email}\nGitHub: ${profile.socials.github}\nLinkedIn: ${profile.socials.linkedin}`);
        break;
      case 'resume':
        push('out', 'Downloading resume…');
        window.location.href = profile.resume;
        break;
      case 'clear':
        setLines([]);
        break;
      case 'sudo':
        push('out', arg.includes('hire') ? 'Permission granted. Opening the contact form…' : 'Nice try. This console has no root.');
        if (arg.includes('hire')) navigate({ hash: '#contact' }, { state: { scroll: true } });
        break;
      default:
        push('err', `Unknown command "${name}". Type "help".`);
    }
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') { run(value); setValue(''); }
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const n = Math.min(hist.length - 1, hi + 1);
      if (n >= 0) { setHi(n); setValue(hist[n]); }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const n = hi - 1;
      setHi(n);
      setValue(n >= 0 ? hist[n] : '');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const m = COMMANDS.filter((c) => c.startsWith(value.toLowerCase()));
      if (m.length === 1) setValue(m[0]);
    }
  };

  return (
    <div className="ue-console card" data-reveal onClick={() => inputRef.current?.focus()}>
      <div className="ue-bar">
        <i /><i /><i />
        <span>Output Log</span>
      </div>
      <div className="ue-body" ref={box} aria-live="polite">
        {lines.map((l) => (
          <div key={l.id} className={`ue-line ${l.kind}`}>
            {l.kind === 'in' ? <span className="ue-prompt">Cmd:</span> : null}
            {l.text}
          </div>
        ))}
        <div className="ue-row">
          <span className="ue-prompt">Cmd:</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKey}
            spellCheck={false}
            autoComplete="off"
            aria-label="Console command"
            placeholder="type help"
          />
        </div>
      </div>
      <div className="ue-chips">
        {['help', 'games', 'unreal', 'optimize', 'skills', 'contact'].map((c) => (
          <button key={c} type="button" className="tag" onClick={() => run(c)}>{c}</button>
        ))}
      </div>
    </div>
  );
};

export default UEConsole;
