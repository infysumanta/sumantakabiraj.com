import { useState, useEffect, useRef } from 'react';

type Project = {
  id: number;
  name: string;
  year: string;
  slug: string;
  img: string;
  blurb: string;
  techline: string;
  long: string;
  features: string[];
  tech: string[];
  github?: string;
  demo?: string;
};

const PROJECT_DATA: Project[] = [
  {
    id: 1, name: 'Hirelytics', year: '2024', slug: 'hirelytics', img: '/hirelytics.jpeg',
    blurb: 'AI hiring — voice interviews, auto eval & attention monitoring.',
    techline: 'react · webrtc · openai',
    long: 'A complete AI hiring platform covering both recruiter and candidate workflows — from job creation through automated, AI-graded voice interviews.',
    features: ['Recruiter & candidate workflows', 'Real-time voice interviews (WebRTC)', 'Automated evaluation & scoring', 'Attention monitoring during sessions'],
    tech: ['React', 'Node.js', 'WebRTC', 'OpenAI', 'PostgreSQL', 'Tailwind'],
    github: 'https://github.com/infysumanta/hirelytics', demo: 'https://hirelytics.app/',
  },
  {
    id: 2, name: 'Talkthru', year: '2024', slug: 'talkthru', img: '/talkthru.png',
    blurb: 'Mental-health chatbot — RAG, GPT-4o, emotion detection, CBT.',
    techline: 'openai · gemini · vectordb',
    long: 'A mobile mental-health companion connecting users with an AI therapist through natural chat — with memory, emotion awareness and clinical safety flows.',
    features: ['RAG + GPT-4o & Gemini responses', 'Emotion detection & semantic memory', 'CBT support and guided journaling', 'Crisis detection & escalation workflows'],
    tech: ['OpenAI', 'Gemini', 'VectorDB', 'Next.js', 'Tailwind'],
  },
  {
    id: 3, name: 'Healthvio', year: '2023', slug: 'healthvio', img: '/healthvio.jpg',
    blurb: 'Telehealth — scheduling, EHR, video calls & calendar sync.',
    techline: 'next · agora · calendar',
    long: 'A full telehealth product handling the clinical journey end to end — booking, dynamic intake, secure video consults and two-way calendar sync.',
    features: ['Appointment scheduling & EHR workflows', 'In-app video calls (Agora)', 'Dynamic patient questionnaires', 'Google Calendar & Outlook sync'],
    tech: ['Next.js', 'Node.js', 'Agora', 'Google Calendar', 'Outlook'],
  },
  {
    id: 4, name: 'Python CLI Coder', year: '2024', slug: 'py-coder', img: '/ai-coder.png',
    blurb: 'CLI for AI codegen, scaffolding & iterative full-stack dev.',
    techline: 'python · cli · openai',
    long: 'A command-line coding agent that generates code, scaffolds folder structures and iterates on full-stack projects with GenAI — built in a 2-day sprint on ~1M tokens.',
    features: ['AI-assisted code generation', 'Folder-structure scaffolding', 'Iterative full-stack development', 'GenAI-driven refactor loops'],
    tech: ['Python', 'CLI', 'OpenAI'],
    github: 'https://github.com/infysumanta/python-cli-ai-coder', demo: 'https://x.com/infysumanta/status/1911327271782150213',
  },
];

const EXPERIENCE = [
  { co: 'BuildFound (Fddigital)', role: 'Full Stack Developer · Remote', short: 'Full Stack Developer', whenShort: '2025→now', when: 'Sep 2025 — Present', note: 'Building AI MVPs and scalable AI products for startups and enterprises.' },
  { co: 'BexCode Services (Dcode Health)', role: 'Full Stack Developer · Team Lead · Remote', short: 'Full Stack · Team Lead', whenShort: '2023→2025', when: 'Feb 2023 — Sep 2025', note: 'Led team management and full-stack delivery, building Node.js services and infrastructure for Dcode Health, a healthcare platform.' },
  { co: 'Tata Consultancy Services', role: 'Assistant System Engineer Developer', short: 'Asst. System Engineer', whenShort: '2020→2022', when: 'Feb 2020 — Nov 2022', note: 'Back-end web development and MongoDB-based enterprise services.' },
  { co: 'Real Time Consultancy Services', role: 'Software Developer', short: 'Software Developer', whenShort: '2019→2020', when: 'Jul 2019 — Feb 2020', note: 'Shipped React.js and MongoDB features for client products.' },
];

const EDUCATION = [
  { school: 'SRM University Sikkim', deg: 'Master of Computer Applications (MCA) — AI, ML & Data Science', when: 'Jul 2025 — Present' },
  { school: 'Triveni Devi Bhalotia (TDB) College, Raniganj', deg: 'Bachelor of Computer Science', when: '2016 — 19' },
  { school: 'Ondal High School', deg: 'Higher Secondary (W.B.C.H.S.E)', when: '2014 — 16' },
  { school: 'Dakshinkhanda High School', deg: 'Secondary (W.B.B.S.E)', when: '2012 — 14' },
];

const PUBLICATIONS = [
  { title: 'Operating System — A Case Study', venue: 'IJTSRD, Volume-2 Issue-3', when: 'Apr 2018', href: 'https://www.ijtsrd.com/computer-science/operating-system/10780/operating-system-a-case-study/sumanta-kabiraj' },
];

const SOCIALS = {
  github: 'https://github.com/infysumanta',
  linkedin: 'https://www.linkedin.com/in/sumanta-kabiraj/',
  twitter: 'https://x.com/infysumanta',
  instagram: 'https://instagram.com/infysumanta',
  email: 'mailto:me@sumantakabiraj.com',
};

const STATS = [
  { n: '6+', l: 'years shipping' },
  { n: '15+', l: 'technologies' },
  { n: '4', l: 'products built' },
  { n: '4', l: 'companies' },
];

const SKILLS = ['react', 'next.js', 'typescript', 'node', 'python', 'go', 'react native', 'expo', 'tauri', 'mongodb', 'postgres', 'redis', 'docker', 'aws', 'azure'];

const SKILL_GROUPS = [
  { label: 'frontend', items: ['React', 'Next.js', 'Angular', 'TypeScript', 'Tailwind'] },
  { label: 'mobile & desktop', items: ['React Native', 'Expo', 'Tauri'] },
  { label: 'backend', items: ['Node.js', 'Python', 'Go', 'GraphQL'] },
  { label: 'data', items: ['PostgreSQL', 'MongoDB', 'Redis'] },
  { label: 'cloud & devops', items: ['Docker', 'AWS', 'Azure'] },
];

// Single page — these are in-place sections, not routes. NAV drives the nav bar, the title-bar path and the commands.
const NAV = [
  { key: 'home', label: 'home', hint: 'cd ~' },
  { key: 'about', label: 'about', hint: 'whoami' },
  { key: 'experience', label: 'experience', hint: 'cd experience/' },
  { key: 'education', label: 'education', hint: 'cd education/' },
  { key: 'skills', label: 'skills', hint: 'npm ls' },
  { key: 'projects', label: 'projects', hint: 'ls -la' },
  { key: 'github', label: 'github', hint: '--activity' },
  { key: 'contact', label: 'contact', hint: '--dm' },
];

const CMD_ALIAS: Record<string, string> = {
  home: 'home', '~': 'home', root: 'home',
  about: 'about', whoami: 'about', me: 'about', profile: 'about', bio: 'about',
  experience: 'experience', exp: 'experience', work: 'experience', jobs: 'experience',
  education: 'education', edu: 'education', school: 'education',
  skills: 'skills', stack: 'skills', npm: 'skills', tech: 'skills',
  projects: 'projects', portfolio: 'projects', repos: 'projects',
  github: 'github', gh: 'github', activity: 'github', contributions: 'github',
  contact: 'contact', dm: 'contact', hire: 'contact', email: 'contact',
};

// shell verbs to ignore so "cd experience", "ls projects", "cat about", "./skills" all resolve
const VERBS = new Set(['cd', 'ls', 'open', 'cat', 'goto', 'go', 'show', 'run', 'view', 'nav', 'less', 'more', 'head', 'sudo']);
function resolveCmd(v: string): string | null {
  const cleaned = v.replace(/[`'"]/g, '').trim();
  if (CMD_ALIAS[cleaned]) return CMD_ALIAS[cleaned];
  const tokens = cleaned.split(/[\s/.]+/).filter(Boolean);
  for (const t of tokens) if (CMD_ALIAS[t] && !VERBS.has(t)) return CMD_ALIAS[t];
  if (tokens.length === 1 && CMD_ALIAS[tokens[0]]) return CMD_ALIAS[tokens[0]];
  return null;
}

// commands offered as you type (Tab / → to accept)
const SUGGESTABLE = [...NAV.map((n) => n.key).filter((k) => k !== 'home'), 'theme', 'help'];

const green = 'var(--green,#4ade80)';
const dim = 'var(--dim,#6f766c)';
const dim2 = 'var(--dim2,#9aa397)';
const fg = 'var(--fg,#d6ddd4)';
const fg2 = 'var(--fg2,#e8efe6)';
const blue = 'var(--blue,#7dd3fc)';
const amber = 'var(--amber,#fbbf77)';
const bd = 'var(--bd,#232823)';
const panel = 'var(--panel,#161a15)';
const panel2 = 'var(--panel2,#131713)';

const chipStyle = { fontSize: 11, padding: '4px 9px', background: 'var(--chip,#18201a)', border: `1px solid var(--chipbd,#2a352a)`, borderRadius: 5, color: 'var(--chipfg,#a7f3a0)' } as const;

function ProfileJson() {
  return (
    <div style={{ marginTop: 10, fontSize: 13, lineHeight: 1.55 }}>
      <span style={{ color: dim }}>{'{'}</span><br />
      &nbsp;&nbsp;<span style={{ color: blue }}>&quot;name&quot;</span>: <span style={{ color: amber }}>&quot;Sumanta Kabiraj&quot;</span>,<br />
      &nbsp;&nbsp;<span style={{ color: blue }}>&quot;role&quot;</span>: <span style={{ color: amber }}>&quot;Full-Stack Developer&quot;</span>,<br />
      &nbsp;&nbsp;<span style={{ color: blue }}>&quot;focus&quot;</span>: <span style={{ color: amber }}>&quot;AI · real-time · healthcare&quot;</span>,<br />
      &nbsp;&nbsp;<span style={{ color: blue }}>&quot;stack&quot;</span>: <span style={{ color: amber }}>&quot;React · Next · Node · GenAI&quot;</span>,<br />
      &nbsp;&nbsp;<span style={{ color: blue }}>&quot;status&quot;</span>: <span style={{ color: green }}>&quot;available&quot;</span> <span className="cursor" style={{ color: green }}>▍</span><br />
      <span style={{ color: dim }}>{'}'}</span>
    </div>
  );
}

function Stats() {
  return (
    <div className="tstats" style={{ marginTop: 14, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
      {STATS.map((st, i) => (
        <div key={i} style={{ border: `1px solid ${bd}`, borderRadius: 8, padding: '8px 8px', background: panel2 }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: fg2, lineHeight: 1 }}>{st.n}</div>
          <div style={{ fontSize: 9, color: dim, marginTop: 3 }}>{st.l}</div>
        </div>
      ))}
    </div>
  );
}

function Socials() {
  return (
    <div style={{ marginTop: 14, display: 'flex', flexWrap: 'wrap', gap: 16, fontSize: 13 }}>
      <a className="lnk" href={SOCIALS.github} target="_blank" rel="noreferrer" style={{ color: blue, textDecoration: 'none' }}>[github]</a>
      <a className="lnk" href={SOCIALS.linkedin} target="_blank" rel="noreferrer" style={{ color: blue, textDecoration: 'none' }}>[linkedin]</a>
      <a className="lnk" href={SOCIALS.twitter} target="_blank" rel="noreferrer" style={{ color: blue, textDecoration: 'none' }}>[twitter]</a>
      <a className="lnk" href={SOCIALS.instagram} target="_blank" rel="noreferrer" style={{ color: blue, textDecoration: 'none' }}>[instagram]</a>
      <a className="lnk" href={SOCIALS.email} style={{ color: blue, textDecoration: 'none' }}>[email]</a>
    </div>
  );
}

// Section header on the home dashboard — text + an in-page "view all →" jump to the section.
function SecHead({ cmd, onGo }: { cmd: string; onGo: () => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, marginTop: 12 }}>
      <span onClick={onGo} className="lnk" style={{ cursor: 'pointer', fontSize: 12, color: green }}>{cmd}</span>
      <span onClick={onGo} className="lnk" style={{ cursor: 'pointer', fontSize: 10.5, color: dim, whiteSpace: 'nowrap' }}>view all →</span>
    </div>
  );
}

export default function Portfolio() {
  const [page, setPage] = useState('home');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [openProj, setOpenProj] = useState<number | null>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [helpOpen, setHelpOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const kbd = isMac ? '⌘K' : 'Ctrl+K';

  const go = (key: string) => { setPage(key); setInput(''); setError(''); setHelpOpen(false); inputRef.current?.focus(); };

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') setTheme(saved);
    setIsMac(/mac/i.test(navigator.platform));
    inputRef.current?.focus();
  }, []);
  function toggleTheme() {
    setTheme((t) => { const n = t === 'dark' ? 'light' : 'dark'; try { localStorage.setItem('theme', n); } catch { /* ignore */ } return n; });
  }

  // ⌘K / Ctrl+K toggles the help terminal; Esc closes overlays
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setHelpOpen((v) => !v); }
      else if (e.key === 'Escape') { setHelpOpen(false); setOpenProj(null); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // type anywhere → focus the terminal and capture the keystroke
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (helpOpen || openProj != null) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key.length === 1) { e.preventDefault(); inputRef.current?.focus(); setInput((s) => s + e.key); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [helpOpen, openProj]);

  // short error tone for an unknown command — WebAudio, no asset
  function beep() {
    try {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AC();
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'square'; o.frequency.value = 165; g.gain.value = 0.05;
      o.connect(g); g.connect(ctx.destination);
      o.start(); o.stop(ctx.currentTime + 0.16);
      o.onended = () => ctx.close();
    } catch { /* ignore — audio may be blocked */ }
  }

  // close the project modal on Esc handled above; drag by hand
  function startDrag(e: { clientX: number; clientY: number }) {
    if (typeof window === 'undefined' || window.innerWidth <= 860) return; // mobile = full-screen sheet, no drag
    const startX = e.clientX, startY = e.clientY;
    const r = (e as { currentTarget?: { closest?: (s: string) => Element | null } }).currentTarget?.closest?.('.pmwin')?.getBoundingClientRect();
    const base = pos ?? (r ? { x: r.left, y: r.top } : { x: window.innerWidth / 2 - 230, y: 90 });
    const move = (ev: PointerEvent) => {
      setPos({
        x: Math.max(8, Math.min(base.x + (ev.clientX - startX), window.innerWidth - 120)),
        y: Math.max(8, Math.min(base.y + (ev.clientY - startY), window.innerHeight - 56)),
      });
    };
    const up = () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  }

  function run(raw: string) {
    const v = raw.trim().toLowerCase();
    if (!v) return;
    if (v === 'theme' || v === 'dark' || v === 'light') { toggleTheme(); setInput(''); setError(''); return; }
    if (v === 'help' || v === '?' || v === 'man') { setHelpOpen(true); setInput(''); setError(''); return; }
    if (v === 'clear') { setInput(''); setError(''); return; }
    const key = resolveCmd(v);
    if (key) { go(key); return; }
    beep();
    setError('command not found: ' + v);
    setInput('');
  }

  const projects = PROJECT_DATA;
  const modalProj = openProj != null ? projects.find((p) => p.id === openProj) : null;
  const seg = page === 'home' ? '' : '/' + page;

  const q = input.replace(/^\s+/, '').toLowerCase();
  const suggestion = q ? (SUGGESTABLE.find((c) => c.startsWith(q) && c !== q) || '') : '';
  const ghost = suggestion ? suggestion.slice(q.length) : '';

  function onInputKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') { run((e.target as HTMLInputElement).value); return; }
    if (suggestion && (e.key === 'Tab' || (e.key === 'ArrowRight' && (e.target as HTMLInputElement).selectionStart === input.length))) {
      e.preventDefault();
      run(suggestion);
    }
  }

  const back = <span onClick={() => go('home')} className="lnk" style={{ cursor: 'pointer', fontSize: 12, color: dim2 }}>← cd ~</span>;

  function ExpList({ compact }: { compact?: boolean }) {
    return (
      <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: compact ? 9 : 12 }}>
        {EXPERIENCE.map((e, i) => compact ? (
          <div key={i} style={{ display: 'flex', gap: 12 }}>
            <span style={{ color: green, flex: 'none' }}>▸</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: fg2 }}>{e.co}</div>
              <div style={{ fontSize: 11.5, color: dim, marginTop: 1 }}>{e.short} <span style={{ color: blue }}>· {e.whenShort}</span></div>
            </div>
          </div>
        ) : (
          <div key={i} style={{ border: `1px solid ${bd}`, borderRadius: 10, padding: '13px 15px', background: panel2 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'baseline', flexWrap: 'wrap' }}>
              <span style={{ fontSize: 14.5, fontWeight: 700, color: fg2 }}>{e.co}</span>
              <span style={{ fontSize: 11.5, color: blue }}>{e.when}</span>
            </div>
            <div style={{ fontSize: 12, color: dim, marginTop: 2 }}>{e.role}</div>
            <p style={{ margin: '8px 0 0', fontSize: 12.5, lineHeight: 1.6, color: dim2 }}>{e.note}</p>
          </div>
        ))}
      </div>
    );
  }

  function EduList({ compact }: { compact?: boolean }) {
    return (
      <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: compact ? 7 : 10 }}>
        {EDUCATION.map((ed, i) => compact ? (
          <div key={i} style={{ display: 'flex', gap: 12 }}>
            <span style={{ color: amber, flex: 'none' }}>▸</span>
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: fg2 }}>{ed.school}</div>
              <div style={{ fontSize: 11, color: dim, marginTop: 1 }}>{ed.deg} <span style={{ color: blue }}>· {ed.when}</span></div>
            </div>
          </div>
        ) : (
          <div key={i} style={{ border: `1px solid ${bd}`, borderRadius: 10, padding: '12px 15px', background: panel2 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'baseline', flexWrap: 'wrap' }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: fg2 }}>{ed.school}</span>
              <span style={{ fontSize: 11.5, color: blue }}>{ed.when}</span>
            </div>
            <div style={{ fontSize: 12.5, color: dim2, marginTop: 3 }}>{ed.deg}</div>
          </div>
        ))}
      </div>
    );
  }

  function PubList() {
    return (
      <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 7 }}>
        {PUBLICATIONS.map((p, i) => (
          <div key={i} style={{ display: 'flex', gap: 12 }}>
            <span style={{ color: amber, flex: 'none' }}>▸</span>
            <div>
              <a href={p.href} target="_blank" rel="noreferrer" style={{ fontSize: 12.5, fontWeight: 700, color: fg2, textDecoration: 'none' }}>{p.title}</a>
              <div style={{ fontSize: 11, color: dim, marginTop: 1 }}>{p.venue} <span style={{ color: blue }}>· {p.when}</span></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  function ProjectCards() {
    return (
      <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {projects.map((p) => (
          <div key={p.id} className="prow" onClick={() => setOpenProj(p.id)} style={{ cursor: 'pointer', display: 'flex', gap: 13, alignItems: 'center', padding: '11px 13px', border: `1px solid ${bd}`, borderRadius: 10, background: panel2 }}>
            <img src={p.img} alt={p.name} style={{ flex: 'none', width: 58, height: 58, borderRadius: 8, objectFit: 'cover', border: `1px solid ${bd}` }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'baseline' }}>
                <span style={{ fontSize: 14.5, fontWeight: 700, color: fg2 }}>{p.name}</span>
                <span style={{ fontSize: 11, color: amber, flex: 'none' }}>{p.year}</span>
              </div>
              <div style={{ fontSize: 12, color: dim2, lineHeight: 1.45, marginTop: 3 }}>{p.blurb}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10, marginTop: 7 }}>
                <span style={{ fontSize: 10.5, color: green }}>{p.techline} <span style={{ color: dim }}>· open ▸</span></span>
                {(p.github || p.demo) && (
                  <span style={{ display: 'flex', gap: 7 }} onClick={(ev) => ev.stopPropagation()}>
                    {p.github && <a className="lnk" href={p.github} target="_blank" rel="noreferrer" style={{ fontSize: 10.5, fontWeight: 500, padding: '4px 9px', background: green, color: '#0b0e0b', borderRadius: 5, textDecoration: 'none' }}>[ github ]</a>}
                    {p.demo && <a className="lnk" href={p.demo} target="_blank" rel="noreferrer" style={{ fontSize: 10.5, fontWeight: 500, padding: '4px 9px', border: `1px solid ${bd}`, color: fg, borderRadius: 5, textDecoration: 'none' }}>[ live ]</a>}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  function ContactBlock() {
    return (
      <>
        <h2 style={{ margin: '14px 0 0', fontSize: 30, fontWeight: 700, color: fg2, letterSpacing: '-.02em' }}>Let&apos;s build something.</h2>
        <p style={{ margin: '12px 0 0', fontSize: 14, lineHeight: 1.7, color: dim2, maxWidth: 560 }}>Want to chat? Shoot me a direct question on Twitter and I&apos;ll respond whenever I can. I ignore all soliciting.</p>
        <div style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <a className="lnk" href={SOCIALS.twitter} target="_blank" rel="noreferrer" style={{ fontSize: 13, fontWeight: 500, padding: '11px 18px', background: green, color: '#0b0e0b', borderRadius: 8, textDecoration: 'none' }}>→ dm on twitter</a>
          <a className="lnk" href={SOCIALS.github} target="_blank" rel="noreferrer" style={{ fontSize: 13, fontWeight: 500, padding: '11px 18px', border: `1px solid ${bd}`, color: fg, borderRadius: 8, textDecoration: 'none' }}>github</a>
          <a className="lnk" href={SOCIALS.linkedin} target="_blank" rel="noreferrer" style={{ fontSize: 13, fontWeight: 500, padding: '11px 18px', border: `1px solid ${bd}`, color: fg, borderRadius: 8, textDecoration: 'none' }}>linkedin</a>
          <a className="lnk" href={SOCIALS.instagram} target="_blank" rel="noreferrer" style={{ fontSize: 13, fontWeight: 500, padding: '11px 18px', border: `1px solid ${bd}`, color: fg, borderRadius: 8, textDecoration: 'none' }}>instagram</a>
          <a className="lnk" href={SOCIALS.email} style={{ fontSize: 13, fontWeight: 500, padding: '11px 18px', border: `1px solid ${bd}`, color: fg, borderRadius: 8, textDecoration: 'none' }}>email</a>
        </div>
        <div style={{ marginTop: 22, fontSize: 12, color: dim, lineHeight: 1.7 }}>&gt; based in Kolkata, IN · available for full-time &amp; freelance<br />&gt; typical reply time: within a day</div>
      </>
    );
  }

  function SectionPage() {
    if (page === 'about') return (
      <>
        {back}
        <div style={{ marginTop: 14, display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <img src="/me.jpeg" alt="Sumanta Kabiraj" style={{ flex: 'none', width: 84, height: 84, borderRadius: 12, objectFit: 'cover', border: `1px solid ${bd}` }} />
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: fg2 }}>Sumanta Kabiraj</div>
            <div style={{ fontSize: 13, color: dim2, marginTop: 2 }}>Full-Stack Developer · AI · real-time · healthcare</div>
          </div>
        </div>
        <div style={{ marginTop: 16, fontSize: 13, color: green }}>$ cat profile.json</div>
        <ProfileJson />
        <Stats />
        <div style={{ marginTop: 20, fontSize: 13, color: green }}>$ whoami</div>
        <p style={{ margin: '10px 0 0', fontSize: 14, lineHeight: 1.75, color: dim2 }}>I&apos;m Sumanta Kabiraj — a Full-Stack Developer with 6+ years shipping production software across AI, real-time systems and healthcare. I build end to end: React / Next.js on the front, Node.js / Python / Go on the back, and GenAI woven throughout.</p>
        <p style={{ margin: '12px 0 0', fontSize: 14, lineHeight: 1.75, color: dim2 }}>Currently building AI MVPs and scalable products at BuildFound. Based in Kolkata, India — available for full-time &amp; freelance.</p>
        <Socials />
      </>
    );
    if (page === 'experience') return (<>{back}<div style={{ marginTop: 14, fontSize: 13, color: green }}>$ ./experience --list</div><ExpList /></>);
    if (page === 'education') return (
      <>
        {back}
        <div style={{ marginTop: 14, fontSize: 13, color: green }}>$ ./education --list</div>
        <EduList />
        <div style={{ marginTop: 20, fontSize: 13, color: green }}>$ ./publications --list</div>
        <PubList />
      </>
    );
    if (page === 'skills') return (
      <>
        {back}
        <div style={{ marginTop: 14, fontSize: 13, color: green }}>$ npm ls --stack</div>
        <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {SKILL_GROUPS.map((g) => (
            <div key={g.label}>
              <div style={{ fontSize: 12, color: amber }}>{g.label}</div>
              <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {g.items.map((s) => <span key={s} className="chip" style={chipStyle}>{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </>
    );
    if (page === 'projects') return (
      <>
        {back}
        <div style={{ marginTop: 14, display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <div style={{ fontSize: 13, color: green }}>$ ls -la projects/</div>
          <div style={{ fontSize: 11, color: dim }}># click a card for details</div>
        </div>
        <ProjectCards />
      </>
    );
    if (page === 'github') return (
      <>
        {back}
        <div style={{ marginTop: 14, fontSize: 13, color: green }}>$ ./github --contributions</div>
        <div style={{ marginTop: 10, overflowX: 'auto', border: `1px solid ${bd}`, borderRadius: 10, padding: 14, background: panel2 }}>
          <img src="https://ghchart.rshah.org/4ade80/infysumanta" alt="Sumanta Kabiraj's GitHub contribution graph" style={{ display: 'block', width: '100%', minWidth: 460, maxHeight: 160, objectFit: 'contain' }} />
        </div>
        <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <a className="lnk" href={SOCIALS.github} target="_blank" rel="noreferrer" style={{ fontSize: 13, fontWeight: 500, padding: '10px 16px', background: green, color: '#0b0e0b', borderRadius: 8, textDecoration: 'none' }}>→ view full profile on github</a>
          <a className="lnk" href={SOCIALS.github + '?tab=repositories'} target="_blank" rel="noreferrer" style={{ fontSize: 13, fontWeight: 500, padding: '10px 16px', border: `1px solid ${bd}`, color: fg, borderRadius: 8, textDecoration: 'none' }}>browse repositories</a>
        </div>
      </>
    );
    if (page === 'contact') return (<>{back}<div style={{ marginTop: 14, fontSize: 13, color: green }}>$ ./contact --dm</div><ContactBlock /></>);
    return null;
  }

  return (
    <div data-theme={theme} className="cwrap" style={{ height: '100vh', background: 'var(--desk,#080a08)', padding: '22px 20px', display: 'flex', justifyContent: 'center' }}>
      <div className="win" style={{ width: '100%', maxWidth: 1180, height: '100%', maxHeight: 960, background: 'var(--bg,#0e100e)', border: `1px solid ${bd}`, borderRadius: 14, overflow: 'hidden', boxShadow: 'var(--shadow)', display: 'flex', flexDirection: 'column' }}>

        <div style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 9, padding: '13px 18px', background: panel, borderBottom: `1px solid ${bd}` }}>
          <span onClick={() => go('home')} className="lnk" style={{ cursor: 'pointer', width: 12, height: 12, borderRadius: '50%', background: '#ff5f56' }} />
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f' }} />
          <span className="winlabel" style={{ marginLeft: 12, fontSize: 12, color: dim }}>sumanta@portfolio: ~{seg} — zsh — 148×40</span>
          <span style={{ marginLeft: 'auto', display: 'flex', gap: 12, alignItems: 'center', fontSize: 12, color: dim }}>
            <span onClick={toggleTheme} className="lnk" style={{ cursor: 'pointer', color: amber, fontSize: 14 }}>{theme === 'dark' ? '☾' : '☀'}</span>
          </span>
        </div>

        <div className="navbar scroll" style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 4, padding: '8px 12px', borderBottom: `1px solid ${bd}`, background: 'var(--bg,#0e100e)', overflowX: 'auto' }}>
          {NAV.map((n) => {
            const active = n.key === page;
            return (
              <span key={n.key} onClick={() => go(n.key)} className="navlink" style={{ cursor: 'pointer', fontSize: 11.5, padding: '5px 10px', borderRadius: 6, whiteSpace: 'nowrap', flex: 'none', background: active ? 'var(--sel,#1c2a1c)' : 'transparent', color: active ? green : dim2, border: `1px solid ${active ? 'var(--chipbd,#2a352a)' : 'transparent'}` }}>{n.label}</span>
            );
          })}
          <span onClick={() => setHelpOpen(true)} className="navlink lnk" style={{ cursor: 'pointer', marginLeft: 'auto', flex: 'none', display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, padding: '4px 8px', color: dim2, whiteSpace: 'nowrap' }}>
            help <kbd style={{ fontSize: 10, padding: '2px 6px', border: `1px solid ${bd}`, borderRadius: 5, background: panel2, color: dim }}>{kbd}</kbd>
          </span>
        </div>

        {page === 'home' ? (
          <div className="tbody" style={{ flex: 1, minHeight: 0, overflow: 'hidden', display: 'grid', gridTemplateColumns: '1fr 1.06fr' }}>
            <div className="tcol tleft scroll" style={{ padding: '14px 22px', borderRight: `1px solid ${bd}`, minHeight: 0, overflowY: 'auto' }}>
              <span onClick={() => go('about')} className="lnk" style={{ cursor: 'pointer', fontSize: 13, color: green }}>$ cat profile.json</span>
              <ProfileJson />
              <Stats />
              <SecHead cmd="$ ./experience --list" onGo={() => go('experience')} />
              <ExpList compact />
              <SecHead cmd="$ ./education --list" onGo={() => go('education')} />
              <EduList compact />
              <SecHead cmd="$ ./publications --list" onGo={() => go('education')} />
              <PubList />
            </div>

            <div className="tcol tright scroll" style={{ padding: '14px 24px', minHeight: 0, overflowY: 'auto' }}>
              <SecHead cmd="$ ./github --contributions" onGo={() => go('github')} />
              <div style={{ marginTop: 8, overflowX: 'auto', border: `1px solid ${bd}`, borderRadius: 8, padding: 6, background: panel2 }}>
                <img src="https://ghchart.rshah.org/4ade80/infysumanta" alt="Sumanta Kabiraj's GitHub contribution graph" style={{ display: 'block', width: '100%', minWidth: 420, maxHeight: 68, objectFit: 'contain' }} />
              </div>

              <SecHead cmd="$ npm ls --stack" onGo={() => go('skills')} />
              <div style={{ marginTop: 9, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {SKILLS.map((s) => (
                  <span key={s} className="chip" style={{ fontSize: 10.5, padding: '3px 8px', background: 'var(--chip,#18201a)', border: `1px solid var(--chipbd,#2a352a)`, borderRadius: 6, color: 'var(--chipfg,#a7f3a0)' }}>{s}</span>
                ))}
              </div>

              <SecHead cmd="$ ls -la projects/" onGo={() => go('projects')} />
              <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {projects.map((p) => (
                  <div key={p.id} className="prow" onClick={() => setOpenProj(p.id)} style={{ cursor: 'pointer', display: 'flex', gap: 11, alignItems: 'center', padding: '9px 11px', border: `1px solid ${bd}`, borderRadius: 8, background: panel2 }}>
                    <img src={p.img} alt={p.name} style={{ flex: 'none', width: 44, height: 44, borderRadius: 7, objectFit: 'cover', border: `1px solid ${bd}` }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'baseline' }}>
                        <span style={{ fontSize: 13.5, fontWeight: 700, color: fg2 }}>{p.name}</span>
                        <span style={{ fontSize: 10.5, color: amber, flex: 'none' }}>{p.year}</span>
                      </div>
                      <div style={{ fontSize: 11, color: dim2, marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.blurb}</div>
                      <div style={{ fontSize: 10, color: green, marginTop: 3 }}>{p.techline}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 12, border: `1px dashed var(--chipbd,#2a352a)`, borderRadius: 10, padding: '13px 18px', background: panel2 }}>
                <span onClick={() => go('contact')} className="lnk" style={{ cursor: 'pointer', fontSize: 13, color: green }}>$ ./contact --dm <span className="cursor" style={{ color: green }}>▍</span></span>
                <div style={{ fontSize: 18, fontWeight: 700, color: fg2, marginTop: 9 }}>Let&apos;s build something.</div>
                <p style={{ margin: '7px 0 0', fontSize: 12.5, lineHeight: 1.55, color: dim2, maxWidth: 520 }}>Shoot me a direct question on Twitter — I respond whenever I can. I ignore all soliciting.</p>
                <Socials />
              </div>
            </div>
          </div>
        ) : (
          <div className="tbody tpage scroll" style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '18px 26px' }}>
            <SectionPage />
          </div>
        )}

        <div className="cmdbar" style={{ flex: 'none', borderTop: `1px solid ${bd}`, padding: '12px 16px', background: panel }}>
          {!!error && <div style={{ fontSize: 12, color: '#ff7a6e', marginBottom: 8 }}>zsh: {error}{error.startsWith('command not found') ? <> — type <span style={{ color: amber }}>help</span></> : null}</div>}
          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <span style={{ fontSize: 13, color: green, whiteSpace: 'nowrap' }}>sumanta@portfolio <span style={{ color: blue }}>~{seg}</span> $</span>
            <span style={{ position: 'relative', flex: 1, display: 'flex' }}>
              <span aria-hidden style={{ position: 'absolute', left: 0, top: 0, fontSize: 13, whiteSpace: 'pre', pointerEvents: 'none', color: 'transparent', lineHeight: 'inherit' }}>{input}<span style={{ color: dim }}>{ghost}</span></span>
              <input ref={inputRef} className="pin" value={input} onChange={(e) => { setInput(e.target.value); setError(''); }} onKeyDown={onInputKey} placeholder="type a command… (about, projects, skills, github, contact · Tab to autocomplete)" style={{ fontSize: 13 }} />
            </span>
            {ghost
              ? <span onClick={() => run(suggestion)} className="hidem lnk" style={{ cursor: 'pointer', fontSize: 11, color: dim, whiteSpace: 'nowrap' }}>↹ {suggestion}</span>
              : <span className="hidem" style={{ fontSize: 11, color: dim }}>↵ run</span>}
          </div>
        </div>
      </div>

      {helpOpen && (
        <>
          <div onClick={() => setHelpOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 75, background: 'rgba(0,0,0,.45)' }} />
          <div className="pmwin" style={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', zIndex: 80, width: 'min(94vw, 520px)', maxHeight: '84vh', background: 'var(--bg,#0e100e)', border: `1px solid ${bd}`, borderRadius: 12, boxShadow: 'var(--shadow)', display: 'flex', flexDirection: 'column', overflow: 'hidden', animation: 'fadein .18s ease' }}>
            <div style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 8, padding: '11px 14px', background: panel, borderBottom: `1px solid ${bd}` }}>
              <span onClick={() => setHelpOpen(false)} className="lnk" style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56', cursor: 'pointer', flex: 'none' }} />
              <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e', flex: 'none' }} />
              <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f', flex: 'none' }} />
              <span style={{ marginLeft: 10, fontSize: 11.5, color: dim }}>sumanta@portfolio: ~/help — zsh</span>
            </div>
            <div className="scroll" style={{ overflowY: 'auto', padding: '18px 20px 22px' }}>
              <div style={{ fontSize: 12.5, color: green }}>$ man portfolio</div>

              <div style={{ marginTop: 14, fontSize: 12, color: amber }}>keyboard shortcuts</div>
              <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 7 }}>
                {[
                  [kbd, 'open / close this help'],
                  ['Esc', 'close any dialog'],
                  ['↵', 'run the typed command'],
                  ['Tab  or  →', 'autocomplete the suggestion'],
                  ['just type', 'anywhere focuses the terminal'],
                ].map(([k, d]) => (
                  <div key={k} style={{ display: 'flex', gap: 12, alignItems: 'center', fontSize: 12.5 }}>
                    <kbd style={{ flex: 'none', minWidth: 92, textAlign: 'center', fontSize: 11, padding: '3px 8px', border: `1px solid ${bd}`, borderRadius: 5, background: panel2, color: fg }}>{k}</kbd>
                    <span style={{ color: dim2 }}>{d}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 16, fontSize: 12, color: amber }}>commands</div>
              <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {NAV.map((n) => (
                  <div key={n.key} style={{ fontSize: 12.5 }}>
                    <span onClick={() => go(n.key)} className="lnk" style={{ cursor: 'pointer', color: green }}>{n.key}</span>
                    <span style={{ color: dim }}> — jump to {n.label}</span>
                  </div>
                ))}
                <div style={{ fontSize: 12.5 }}><span style={{ color: green }}>theme</span><span style={{ color: dim }}> — toggle dark / light</span></div>
                <div style={{ fontSize: 12.5 }}><span style={{ color: green }}>help</span><span style={{ color: dim }}> — show this dialog</span></div>
              </div>

              <div style={{ marginTop: 14, fontSize: 11.5, color: dim, lineHeight: 1.6 }}>aliases work too — <span style={{ color: dim2 }}>cd experience</span>, <span style={{ color: dim2 }}>ls projects</span>, <span style={{ color: dim2 }}>cat about</span>, <span style={{ color: dim2 }}>gh</span>.</div>
            </div>
          </div>
        </>
      )}

      {modalProj && (
        <>
          <div onClick={() => setOpenProj(null)} className="pmback" style={{ position: 'fixed', inset: 0, zIndex: 65, background: 'rgba(0,0,0,.35)' }} />
          <div className="pmwin" style={{ position: 'fixed', ...(pos ? { left: pos.x, top: pos.y } : { left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }), zIndex: 70, width: 'min(92vw, 460px)', maxHeight: '82vh', background: 'var(--bg,#0e100e)', border: `1px solid ${bd}`, borderRadius: 12, boxShadow: 'var(--shadow)', display: 'flex', flexDirection: 'column', overflow: 'hidden', animation: 'fadein .18s ease' }}>
            <div className="pmbar" onPointerDown={startDrag} style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 8, padding: '11px 14px', background: panel, borderBottom: `1px solid ${bd}`, cursor: 'grab', touchAction: 'none', userSelect: 'none' }}>
              <span onClick={() => setOpenProj(null)} className="lnk" style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56', cursor: 'pointer', flex: 'none' }} />
              <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e', flex: 'none' }} />
              <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f', flex: 'none' }} />
              <span style={{ marginLeft: 10, fontSize: 11.5, color: dim, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>sumanta@portfolio: ~/projects/{modalProj.slug} — zsh</span>
            </div>
            <div style={{ flex: 'none', height: 150, background: panel2, borderBottom: `1px solid ${bd}` }}>
              <img src={modalProj.img} alt={modalProj.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div className="scroll" style={{ overflowY: 'auto', padding: '18px 20px 22px' }}>
              <div style={{ fontSize: 12.5, color: green }}>$ cat {modalProj.slug}/README.md</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginTop: 12 }}>
                <span style={{ fontSize: 19, fontWeight: 700, color: fg2 }}>{modalProj.name}</span>
                <span style={{ fontSize: 11.5, color: amber }}>{modalProj.year}</span>
              </div>
              <p style={{ margin: '9px 0 0', fontSize: 13, lineHeight: 1.65, color: dim2 }}>{modalProj.long}</p>
              <div style={{ marginTop: 13, display: 'flex', flexDirection: 'column', gap: 7 }}>
                {modalProj.features.map((f) => (
                  <div key={f} style={{ display: 'flex', gap: 9, fontSize: 12.5, color: fg }}>
                    <span style={{ color: green }}>✓</span><span>{f}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 14, display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {modalProj.tech.map((t) => <span key={t} style={chipStyle}>{t}</span>)}
              </div>
              {(modalProj.github || modalProj.demo) && (
                <div style={{ marginTop: 16, display: 'flex', gap: 9 }}>
                  {modalProj.github && <a className="lnk" href={modalProj.github} target="_blank" rel="noreferrer" style={{ cursor: 'pointer', fontSize: 11.5, fontWeight: 500, padding: '8px 14px', background: green, color: '#0b0e0b', borderRadius: 6, textDecoration: 'none' }}>[ github ]</a>}
                  {modalProj.demo && <a className="lnk" href={modalProj.demo} target="_blank" rel="noreferrer" style={{ cursor: 'pointer', fontSize: 11.5, fontWeight: 500, padding: '8px 14px', border: `1px solid ${bd}`, color: fg, borderRadius: 6, textDecoration: 'none' }}>[ live ]</a>}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
