import { useState, useEffect } from 'react';

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
};

const PROJECT_DATA: Project[] = [
  {
    id: 1, name: 'Hirelytics', year: '2024', slug: 'hirelytics', img: '/hirelytics.jpeg',
    blurb: 'AI hiring — voice interviews, auto eval & attention monitoring.',
    techline: 'react · webrtc · openai',
    long: 'A complete AI hiring platform covering both recruiter and candidate workflows — from job creation through automated, AI-graded voice interviews.',
    features: ['Recruiter & candidate workflows', 'Real-time voice interviews (WebRTC)', 'Automated evaluation & scoring', 'Attention monitoring during sessions'],
    tech: ['React', 'Node.js', 'WebRTC', 'OpenAI', 'PostgreSQL', 'Tailwind'],
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

const MENU_DEF = [
  { key: 'about', label: 'about', hint: 'whoami' },
  { key: 'experience', label: 'experience', hint: './work' },
  { key: 'education', label: 'education', hint: './edu' },
  { key: 'skills', label: 'skills', hint: 'npm ls' },
  { key: 'github', label: 'github', hint: '--activity' },
  { key: 'projects', label: 'projects', hint: 'ls -la' },
  { key: 'contact', label: 'contact', hint: '--dm' },
];

const HELP_LIST = [
  { cmd: 'about', desc: 'who I am' },
  { cmd: 'experience', desc: 'where I have worked' },
  { cmd: 'education', desc: 'my background' },
  { cmd: 'skills', desc: 'the tech I use' },
  { cmd: 'github', desc: 'live contribution activity' },
  { cmd: 'projects', desc: 'things I have built' },
  { cmd: 'contact', desc: 'get in touch' },
  { cmd: 'terminal / simple', desc: 'switch layout' },
  { cmd: 'theme', desc: 'toggle dark / light' },
];

const COMMAND_MAP: Record<string, string> = {
  about: 'about', whoami: 'about', me: 'about',
  experience: 'experience', work: 'experience', exp: 'experience', jobs: 'experience',
  education: 'education', edu: 'education', school: 'education',
  skills: 'skills', stack: 'skills', npm: 'skills', tech: 'skills',
  github: 'github', gh: 'github', activity: 'github', contributions: 'github',
  projects: 'projects', ls: 'projects', portfolio: 'projects',
  contact: 'contact', dm: 'contact', hire: 'contact', email: 'contact',
  help: 'help', '?': 'help', clear: 'about',
};

const stripe = 'repeating-linear-gradient(45deg,var(--stripe1,#131713),var(--stripe1,#131713) 9px,var(--stripe2,#171c17) 9px,var(--stripe2,#171c17) 18px)';

const GH_USER = 'infysumanta';
const GH_LEVEL_COLOR = ['var(--panel2,#131713)', '#0e4429', '#006d32', '#26a641', '#39d353'];

type ContribDay = { date: string; count: number; level: number };
type GhStats = { public_repos: number; followers: number; following: number; html_url: string };

function GithubPanel() {
  const [days, setDays] = useState<ContribDay[] | null>(null);
  const [stats, setStats] = useState<GhStats | null>(null);
  const [err, setErr] = useState('');

  useEffect(() => {
    fetch(`https://github-contributions-api.jogruber.de/v4/${GH_USER}?y=last`)
      .then((r) => r.json())
      .then((d) => setDays(d.contributions || []))
      .catch(() => setErr('could not load contribution data right now'));
    fetch(`https://api.github.com/users/${GH_USER}`)
      .then((r) => r.json())
      .then((d) => setStats(d))
      .catch(() => {});
  }, []);

  if (err) return <div style={{ fontSize: 13, color: 'var(--dim,#6f766c)' }}>{err}</div>;
  if (!days) return <div style={{ fontSize: 13, color: 'var(--dim,#6f766c)' }}>loading github activity…</div>;

  const weeks: ContribDay[][] = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));
  const total = days.reduce((sum, d) => sum + d.count, 0);

  return (
    <div>
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--fg2,#e8efe6)' }}>{total}</div>
          <div style={{ fontSize: 11, color: 'var(--dim,#6f766c)' }}>contributions (past year)</div>
        </div>
        {stats && (
          <>
            <div>
              <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--fg2,#e8efe6)' }}>{stats.public_repos}</div>
              <div style={{ fontSize: 11, color: 'var(--dim,#6f766c)' }}>public repos</div>
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--fg2,#e8efe6)' }}>{stats.followers}</div>
              <div style={{ fontSize: 11, color: 'var(--dim,#6f766c)' }}>followers</div>
            </div>
          </>
        )}
      </div>

      <div style={{ overflowX: 'auto', border: '1px solid var(--bd,#232823)', borderRadius: 10, padding: 14, background: 'var(--panel2,#131713)' }}>
        <div style={{ display: 'flex', gap: 3 }}>
          {weeks.map((week, wi) => (
            <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {week.map((day) => (
                <div
                  key={day.date}
                  title={`${day.date}: ${day.count} contribution${day.count === 1 ? '' : 's'}`}
                  style={{ width: 11, height: 11, borderRadius: 2, background: GH_LEVEL_COLOR[day.level] || GH_LEVEL_COLOR[0] }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 10, fontSize: 11, color: 'var(--dim,#6f766c)' }}>hover a square for the exact day and contribution count</div>
      {stats?.html_url && (
        <a href={stats.html_url} target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginTop: 16, fontSize: 13, color: 'var(--blue,#7dd3fc)', textDecoration: 'none' }}>→ view full profile on github</a>
      )}
    </div>
  );
}

export default function Portfolio() {
  const [view, setView] = useState<'simple' | 'terminal'>('simple');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [cmd, setCmd] = useState('about');
  const [proj, setProj] = useState<number | null>(null);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [openN, setOpenN] = useState<number | null>(null);
  const [hint, setHint] = useState(true);

  function setCmdView(c: string) {
    setCmd(c); setProj(null); setInput(''); setError('');
  }

  function run(raw: string) {
    const v = raw.trim().toLowerCase();
    if (!v) return;
    if (v === 'theme' || v === 'dark' || v === 'light') {
      setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
      setInput(''); setError('');
      return;
    }
    if (v === 'terminal') { setView('terminal'); setInput(''); setError(''); return; }
    if (v === 'simple') { setView('simple'); setInput(''); setError(''); return; }
    const mapped = COMMAND_MAP[v];
    if (mapped) {
      setView((vw) => (vw === 'terminal' ? 'simple' : vw));
      setCmd(mapped); setProj(null); setInput(''); setError('');
      return;
    }
    setError('command not found: ' + v);
    setInput('');
  }

  const projects = PROJECT_DATA.map((p) => ({
    ...p,
    open: () => { setCmd('projects'); setProj(p.id); setError(''); },
    toggleN: () => setOpenN((n) => (n === p.id ? null : p.id)),
    expandedN: openN === p.id,
    borderN: openN === p.id ? 'var(--green)' : 'var(--bd,#232823)',
  }));
  const sel = projects.find((p) => p.id === proj) || projects[0];

  const menu = MENU_DEF.map((m) => {
    const active = cmd === m.key;
    return {
      ...m,
      go: () => setCmdView(m.key),
      mark: active ? '▸' : '·',
      bg: active ? 'var(--sel,#1c2a1c)' : 'transparent',
      bd: active ? 'var(--chipbd,#2a352a)' : 'transparent',
      fg: active ? 'var(--fg2,#e8efe6)' : 'var(--fg,#d6ddd4)',
    };
  });

  const isTerminal = view === 'terminal';
  const isSimple = !isTerminal;

  return (
    <div data-theme={theme} className="cwrap" style={{ height: '100vh', background: 'var(--desk,#080a08)', padding: '22px 20px', display: 'flex', justifyContent: 'center' }}>
      <div className="win" style={{ width: '100%', maxWidth: 1180, height: '100%', maxHeight: 960, background: 'var(--bg,#0e100e)', border: '1px solid var(--bd,#232823)', borderRadius: 14, overflow: 'hidden', boxShadow: 'var(--shadow)', display: 'flex', flexDirection: 'column' }}>

        <div style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 9, padding: '13px 18px', background: 'var(--panel,#161a15)', borderBottom: '1px solid var(--bd,#232823)' }}>
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56' }} />
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f' }} />
          <span style={{ marginLeft: 12, fontSize: 12, color: 'var(--dim,#6f766c)' }}>sumanta@portfolio: ~ — zsh {isTerminal ? '— 148×40' : ''}</span>
          <span style={{ marginLeft: 'auto', display: 'flex', gap: 12, alignItems: 'center', fontSize: 12, color: 'var(--dim,#6f766c)' }}>
            <span style={{ display: 'flex', border: '1px solid var(--bd,#232823)', borderRadius: 7, overflow: 'hidden' }}>
              <span onClick={() => { setView('terminal'); setHint(false); }} className="tg" style={{ cursor: 'pointer', padding: '5px 11px', background: isTerminal ? 'var(--sel,#1c2a1c)' : 'transparent', color: isTerminal ? 'var(--green,#4ade80)' : 'var(--dim,#6f766c)' }}>▦ terminal</span>
              <span onClick={() => setView('simple')} className="tg" style={{ cursor: 'pointer', padding: '5px 11px', background: isSimple ? 'var(--sel,#1c2a1c)' : 'transparent', color: isSimple ? 'var(--green,#4ade80)' : 'var(--dim,#6f766c)' }}>◫ simple</span>
            </span>
            <span className="hidem" style={{ color: 'var(--dim,#6f766c)' }}>GH · IN · X</span>
            <span onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))} className="lnk" style={{ cursor: 'pointer', color: 'var(--amber,#fbbf77)', fontSize: 14 }}>{theme === 'dark' ? '☾' : '☀'}</span>
          </span>
        </div>

        {isTerminal && (
          <>
            <div className="tbody scroll" style={{ flex: 1, minHeight: 0, overflowY: 'auto', display: 'grid', gridTemplateColumns: '1fr 1.06fr' }}>
              <div className="tleft" style={{ padding: '20px 24px', borderRight: '1px solid var(--bd,#232823)' }}>
                <div style={{ fontSize: 13, color: 'var(--green,#4ade80)' }}>$ cat profile.json</div>
                <div style={{ marginTop: 10, fontSize: 13, lineHeight: 1.55 }}>
                  <span style={{ color: 'var(--dim,#6f766c)' }}>{'{'}</span><br />
                  &nbsp;&nbsp;<span style={{ color: 'var(--blue,#7dd3fc)' }}>&quot;name&quot;</span>: <span style={{ color: 'var(--amber,#fbbf77)' }}>&quot;Sumanta Kabiraj&quot;</span>,<br />
                  &nbsp;&nbsp;<span style={{ color: 'var(--blue,#7dd3fc)' }}>&quot;role&quot;</span>: <span style={{ color: 'var(--amber,#fbbf77)' }}>&quot;Full-Stack Developer&quot;</span>,<br />
                  &nbsp;&nbsp;<span style={{ color: 'var(--blue,#7dd3fc)' }}>&quot;focus&quot;</span>: <span style={{ color: 'var(--amber,#fbbf77)' }}>&quot;AI · real-time · healthcare&quot;</span>,<br />
                  &nbsp;&nbsp;<span style={{ color: 'var(--blue,#7dd3fc)' }}>&quot;stack&quot;</span>: <span style={{ color: 'var(--amber,#fbbf77)' }}>&quot;React · Next · Node · GenAI&quot;</span>,<br />
                  &nbsp;&nbsp;<span style={{ color: 'var(--blue,#7dd3fc)' }}>&quot;status&quot;</span>: <span style={{ color: 'var(--green,#4ade80)' }}>&quot;available&quot;</span> <span className="cursor" style={{ color: 'var(--green,#4ade80)' }}>▍</span><br />
                  <span style={{ color: 'var(--dim,#6f766c)' }}>{'}'}</span>
                </div>

                <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
                  {STATS.map((st, i) => (
                    <div key={i} style={{ border: '1px solid var(--bd,#232823)', borderRadius: 8, padding: '8px 8px', background: 'var(--panel2,#131713)' }}>
                      <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--fg2,#e8efe6)', lineHeight: 1 }}>{st.n}</div>
                      <div style={{ fontSize: 9, color: 'var(--dim,#6f766c)', marginTop: 3 }}>{st.l}</div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 14 }}>
                  <div style={{ fontSize: 12, color: 'var(--green,#4ade80)' }}>$ ./github --contributions</div>
                  <div style={{ marginTop: 8, overflowX: 'auto', border: '1px solid var(--bd,#232823)', borderRadius: 8, padding: 6, background: 'var(--panel2,#131713)' }}>
                    <img src="https://ghchart.rshah.org/4ade80/infysumanta" alt="Sumanta Kabiraj's GitHub contribution graph" style={{ display: 'block', width: '100%', minWidth: 420, maxHeight: 90, objectFit: 'contain' }} />
                  </div>
                </div>

                <div style={{ marginTop: 18, fontSize: 12, color: 'var(--green,#4ade80)' }}>$ ./experience --list</div>
                <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 9 }}>
                  {EXPERIENCE.map((e, i) => (
                    <div key={i} style={{ display: 'flex', gap: 12 }}>
                      <span style={{ color: 'var(--green,#4ade80)', flex: 'none' }}>▸</span>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--fg2,#e8efe6)' }}>{e.co}</div>
                        <div style={{ fontSize: 11.5, color: 'var(--dim,#6f766c)', marginTop: 1 }}>{e.short} <span style={{ color: 'var(--blue,#7dd3fc)' }}>· {e.whenShort}</span></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 18, fontSize: 12, color: 'var(--green,#4ade80)' }}>$ ./education --list</div>
                <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {EDUCATION.map((ed, i) => (
                    <div key={i} style={{ display: 'flex', gap: 12 }}>
                      <span style={{ color: 'var(--amber,#fbbf77)', flex: 'none' }}>▸</span>
                      <div>
                        <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--fg2,#e8efe6)' }}>{ed.school}</div>
                        <div style={{ fontSize: 11, color: 'var(--dim,#6f766c)', marginTop: 1 }}>{ed.deg} <span style={{ color: 'var(--blue,#7dd3fc)' }}>· {ed.when}</span></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 18, fontSize: 12, color: 'var(--green,#4ade80)' }}>$ ./publications --list</div>
                <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {PUBLICATIONS.map((p, i) => (
                    <div key={i} style={{ display: 'flex', gap: 12 }}>
                      <span style={{ color: 'var(--amber,#fbbf77)', flex: 'none' }}>▸</span>
                      <div>
                        <a href={p.href} target="_blank" rel="noreferrer" style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--fg2,#e8efe6)', textDecoration: 'none' }}>{p.title}</a>
                        <div style={{ fontSize: 11, color: 'var(--dim,#6f766c)', marginTop: 1 }}>{p.venue} <span style={{ color: 'var(--blue,#7dd3fc)' }}>· {p.when}</span></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 18, fontSize: 12, color: 'var(--green,#4ade80)' }}>$ npm ls --stack</div>
                <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {SKILLS.map((s) => (
                    <span key={s} className="chip" style={{ fontSize: 11, padding: '4px 9px', background: 'var(--chip,#18201a)', border: '1px solid var(--chipbd,#2a352a)', borderRadius: 6, color: 'var(--chipfg,#a7f3a0)' }}>{s}</span>
                  ))}
                </div>
              </div>

              <div style={{ padding: '32px 30px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                  <div style={{ fontSize: 13, color: 'var(--green,#4ade80)' }}>$ ls -la projects/</div>
                  <div style={{ fontSize: 11, color: 'var(--dim,#6f766c)' }}># click a card to expand</div>
                </div>
                <div className="tgrid" style={{ marginTop: 18, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, alignItems: 'start' }}>
                  {projects.map((p) => (
                    <div key={p.id} className="pcard" onClick={p.toggleN} style={{ cursor: 'pointer', border: `1px solid ${p.borderN}`, borderRadius: 10, overflow: 'hidden', background: 'var(--bg,#0e100e)' }}>
                      <div style={{ height: 118, background: stripe }}>
                        <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      </div>
                      <div style={{ padding: '16px 16px 18px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                          <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--fg2,#e8efe6)' }}>{p.name}</span>
                          <span style={{ fontSize: 11, color: 'var(--amber,#fbbf77)' }}>{p.year}</span>
                        </div>
                        <div style={{ fontSize: 12.5, color: 'var(--dim2,#9aa397)', lineHeight: 1.55, marginTop: 7 }}>{p.blurb}</div>
                        <div style={{ fontSize: 11, color: 'var(--green,#4ade80)', marginTop: 11 }}>{p.techline}</div>
                        {p.expandedN && (
                          <div style={{ animation: 'fadein .28s ease', marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--bd,#232823)' }}>
                            <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.6, color: 'var(--dim2,#9aa397)' }}>{p.long}</p>
                            <div style={{ marginTop: 11, display: 'flex', flexDirection: 'column', gap: 6 }}>
                              {p.features.map((f) => (
                                <div key={f} style={{ display: 'flex', gap: 8, fontSize: 12, color: 'var(--fg,#d6ddd4)' }}>
                                  <span style={{ color: 'var(--green,#4ade80)' }}>✓</span><span>{f}</span>
                                </div>
                              ))}
                            </div>
                            <div style={{ marginTop: 13, display: 'flex', gap: 8 }}>
                              <span className="lnk" style={{ cursor: 'pointer', fontSize: 11, fontWeight: 500, padding: '7px 12px', background: 'var(--green,#4ade80)', color: '#0b0e0b', borderRadius: 6 }}>[ github ]</span>
                              <span className="lnk" style={{ cursor: 'pointer', fontSize: 11, fontWeight: 500, padding: '7px 12px', border: '1px solid var(--bd,#232823)', color: 'var(--fg,#d6ddd4)', borderRadius: 6 }}>[ live ]</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 20, border: '1px dashed var(--chipbd,#2a352a)', borderRadius: 10, padding: '22px 24px', background: 'var(--panel2,#131713)' }}>
                  <div style={{ fontSize: 13, color: 'var(--green,#4ade80)' }}>$ ./contact --dm <span className="cursor" style={{ color: 'var(--green,#4ade80)' }}>▍</span></div>
                  <div style={{ fontSize: 19, fontWeight: 700, color: 'var(--fg2,#e8efe6)', marginTop: 11 }}>Let&apos;s build something.</div>
                  <p style={{ margin: '8px 0 0', fontSize: 13, lineHeight: 1.6, color: 'var(--dim2,#9aa397)', maxWidth: 520 }}>Shoot me a direct question on Twitter — I respond whenever I can. I ignore all soliciting.</p>
                  <div style={{ marginTop: 15, display: 'flex', flexWrap: 'wrap', gap: 16, fontSize: 13 }}>
                    <a className="lnk" href={SOCIALS.github} target="_blank" rel="noreferrer" style={{ cursor: 'pointer', color: 'var(--blue,#7dd3fc)', textDecoration: 'none' }}>[github]</a>
                    <a className="lnk" href={SOCIALS.linkedin} target="_blank" rel="noreferrer" style={{ cursor: 'pointer', color: 'var(--blue,#7dd3fc)', textDecoration: 'none' }}>[linkedin]</a>
                    <a className="lnk" href={SOCIALS.twitter} target="_blank" rel="noreferrer" style={{ cursor: 'pointer', color: 'var(--blue,#7dd3fc)', textDecoration: 'none' }}>[twitter]</a>
                    <a className="lnk" href={SOCIALS.instagram} target="_blank" rel="noreferrer" style={{ cursor: 'pointer', color: 'var(--blue,#7dd3fc)', textDecoration: 'none' }}>[instagram]</a>
                    <a className="lnk" href={SOCIALS.email} style={{ cursor: 'pointer', color: 'var(--blue,#7dd3fc)', textDecoration: 'none' }}>[email]</a>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ flex: 'none', borderTop: '1px solid var(--bd,#232823)', padding: '12px 16px', background: 'var(--panel,#161a15)' }}>
              {!!error && <div style={{ fontSize: 12, color: '#ff7a6e', marginBottom: 8 }}>zsh: {error} — type <span style={{ color: 'var(--amber,#fbbf77)' }}>help</span></div>}
              <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <span style={{ fontSize: 13, color: 'var(--green,#4ade80)', whiteSpace: 'nowrap' }}>sumanta@portfolio <span style={{ color: 'var(--blue,#7dd3fc)' }}>~</span> $</span>
                <input className="pin" value={input} onChange={(e) => { setInput(e.target.value); setError(''); }} onKeyDown={(e) => { if (e.key === 'Enter') run((e.target as HTMLInputElement).value); }} placeholder="type a command… (about, projects, skills, contact, simple, help)" style={{ fontSize: 13 }} />
                <span className="hidem" style={{ fontSize: 11, color: 'var(--dim,#6f766c)' }}>↵ run</span>
              </div>
            </div>
          </>
        )}

        {isSimple && (
          <div className="cbody" style={{ flex: 1, minHeight: 0, display: 'grid', gridTemplateColumns: '270px 1fr' }}>
            <div className="side" style={{ padding: '22px 20px', borderRight: '1px solid var(--bd,#232823)', display: 'flex', flexDirection: 'column', gap: 20, minHeight: 0 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                  <img src="/me.jpeg" alt="Sumanta Kabiraj" style={{ width: 44, height: 44, flex: 'none', borderRadius: 10, objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--fg2,#e8efe6)' }}>Sumanta Kabiraj</div>
                    <div style={{ fontSize: 12, color: 'var(--dim,#6f766c)' }}>Full-Stack Developer</div>
                  </div>
                </div>
              </div>

              <div className="hidem" style={{ fontSize: 11, color: 'var(--dim,#6f766c)', lineHeight: 1.5 }}>Click a command, or type one below. Try <span style={{ color: 'var(--amber,#fbbf77)' }}>help</span> to see them all.</div>

              <div className="menu" style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {menu.map((m) => (
                  <div key={m.key} className="mi" onClick={m.go} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, padding: '9px 11px', borderRadius: 7, border: `1px solid ${m.bd}`, background: m.bg }}>
                    <span style={{ color: 'var(--green,#4ade80)', fontSize: 12 }}>{m.mark}</span>
                    <span style={{ fontSize: 13.5, fontWeight: 500, color: m.fg }}>{m.label}</span>
                    <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--dim,#6f766c)' }}>{m.hint}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', flexWrap: 'wrap', gap: 16, fontSize: 12, color: 'var(--blue,#7dd3fc)' }}>
                <a className="lnk" href={SOCIALS.github} target="_blank" rel="noreferrer" style={{ cursor: 'pointer', color: 'inherit', textDecoration: 'none' }}>github</a>
                <a className="lnk" href={SOCIALS.linkedin} target="_blank" rel="noreferrer" style={{ cursor: 'pointer', color: 'inherit', textDecoration: 'none' }}>linkedin</a>
                <a className="lnk" href={SOCIALS.twitter} target="_blank" rel="noreferrer" style={{ cursor: 'pointer', color: 'inherit', textDecoration: 'none' }}>twitter</a>
                <a className="lnk" href={SOCIALS.instagram} target="_blank" rel="noreferrer" style={{ cursor: 'pointer', color: 'inherit', textDecoration: 'none' }}>instagram</a>
                <a className="lnk" href={SOCIALS.email} style={{ cursor: 'pointer', color: 'inherit', textDecoration: 'none' }}>email</a>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <div className="main scroll" style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '26px 30px' }}>
                <div key={cmd + (proj || '')} style={{ animation: 'fadein .28s ease' }}>

                  {cmd === 'about' && (
                    <>
                      <div style={{ fontSize: 13, color: 'var(--green,#4ade80)' }}>$ whoami</div>
                      <h1 style={{ margin: '14px 0 0', fontSize: 38, fontWeight: 700, lineHeight: 1.05, letterSpacing: '-.02em', color: 'var(--fg2,#e8efe6)' }}>I build intelligent<br />software systems.</h1>
                      <p style={{ margin: '16px 0 0', fontSize: 14.5, lineHeight: 1.7, color: 'var(--dim2,#9aa397)', maxWidth: 620 }}>Experienced Full-Stack Developer building intelligent, scalable systems across web, cloud, and AI — from healthcare platforms with EHR integrations and AI conversational systems, to secure authentication and cloud-native architectures across React, Node.js, Go, Python, Azure &amp; AWS.</p>
                      <div style={{ marginTop: 26, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
                        {STATS.map((st, i) => (
                          <div key={i} style={{ border: '1px solid var(--bd,#232823)', borderRadius: 10, padding: '16px 14px', background: 'var(--panel2,#131713)' }}>
                            <div style={{ fontSize: 30, fontWeight: 700, color: 'var(--fg2,#e8efe6)', lineHeight: 1 }}>{st.n}</div>
                            <div style={{ fontSize: 11.5, color: 'var(--dim,#6f766c)', marginTop: 5 }}>{st.l}</div>
                          </div>
                        ))}
                      </div>

                      <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                        <span className="lnk" onClick={() => setCmdView('projects')} style={{ cursor: 'pointer', fontSize: 13, fontWeight: 500, padding: '11px 18px', background: 'var(--green,#4ade80)', color: '#0b0e0b', borderRadius: 8 }}>→ see my work</span>
                        <span className="lnk" onClick={() => setCmdView('github')} style={{ cursor: 'pointer', fontSize: 13, fontWeight: 500, padding: '11px 18px', border: '1px solid var(--bd,#232823)', color: 'var(--fg,#d6ddd4)', borderRadius: 8 }}>→ github activity</span>
                        <span className="lnk" onClick={() => setCmdView('contact')} style={{ cursor: 'pointer', fontSize: 13, fontWeight: 500, padding: '11px 18px', border: '1px solid var(--bd,#232823)', color: 'var(--fg,#d6ddd4)', borderRadius: 8 }}>get in touch</span>
                      </div>
                    </>
                  )}

                  {cmd === 'experience' && (
                    <>
                      <div style={{ fontSize: 13, color: 'var(--green,#4ade80)' }}>$ ./experience --list</div>
                      <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column' }}>
                        {EXPERIENCE.map((e, i) => (
                          <div key={i} style={{ display: 'grid', gridTemplateColumns: '22px 1fr auto', gap: 14, alignItems: 'start', padding: '16px 0', borderTop: '1px solid var(--bd,#232823)' }}>
                            <span style={{ color: 'var(--green,#4ade80)', fontSize: 15 }}>▸</span>
                            <div>
                              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--fg2,#e8efe6)' }}>{e.co}</div>
                              <div style={{ fontSize: 13, color: 'var(--dim2,#9aa397)', marginTop: 3 }}>{e.role}</div>
                              <div style={{ fontSize: 12.5, color: 'var(--dim,#6f766c)', marginTop: 6, lineHeight: 1.55, maxWidth: 520 }}>{e.note}</div>
                            </div>
                            <span style={{ fontSize: 12, color: 'var(--blue,#7dd3fc)', whiteSpace: 'nowrap' }}>{e.when}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {cmd === 'education' && (
                    <>
                      <div style={{ fontSize: 13, color: 'var(--green,#4ade80)' }}>$ ./education --list</div>
                      <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column' }}>
                        {EDUCATION.map((ed, i) => (
                          <div key={i} style={{ display: 'grid', gridTemplateColumns: '22px 1fr auto', gap: 14, alignItems: 'baseline', padding: '16px 0', borderTop: '1px solid var(--bd,#232823)' }}>
                            <span style={{ color: 'var(--amber,#fbbf77)', fontSize: 15 }}>▸</span>
                            <div>
                              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--fg2,#e8efe6)' }}>{ed.school}</div>
                              <div style={{ fontSize: 13, color: 'var(--dim2,#9aa397)', marginTop: 3 }}>{ed.deg}</div>
                            </div>
                            <span style={{ fontSize: 12, color: 'var(--blue,#7dd3fc)', whiteSpace: 'nowrap' }}>{ed.when}</span>
                          </div>
                        ))}
                      </div>

                      <div style={{ marginTop: 26, fontSize: 12, color: 'var(--dim,#6f766c)' }}>publications</div>
                      <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column' }}>
                        {PUBLICATIONS.map((p, i) => (
                          <div key={i} style={{ display: 'grid', gridTemplateColumns: '22px 1fr auto', gap: 14, alignItems: 'baseline', padding: '16px 0', borderTop: '1px solid var(--bd,#232823)' }}>
                            <span style={{ color: 'var(--amber,#fbbf77)', fontSize: 15 }}>▸</span>
                            <div>
                              <a href={p.href} target="_blank" rel="noreferrer" style={{ fontSize: 16, fontWeight: 700, color: 'var(--fg2,#e8efe6)', textDecoration: 'none' }}>{p.title}</a>
                              <div style={{ fontSize: 13, color: 'var(--dim2,#9aa397)', marginTop: 3 }}>{p.venue}</div>
                            </div>
                            <span style={{ fontSize: 12, color: 'var(--blue,#7dd3fc)', whiteSpace: 'nowrap' }}>{p.when}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {cmd === 'skills' && (
                    <>
                      <div style={{ fontSize: 13, color: 'var(--green,#4ade80)' }}>$ npm ls --stack</div>
                      <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                        {SKILL_GROUPS.map((g) => (
                          <div key={g.label}>
                            <div style={{ fontSize: 12, color: 'var(--amber,#fbbf77)', marginBottom: 10 }}># {g.label}</div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                              {g.items.map((s) => (
                                <span key={s} className="chip" style={{ fontSize: 12.5, padding: '7px 12px', background: 'var(--chip,#18201a)', border: '1px solid var(--chipbd,#2a352a)', borderRadius: 6, color: 'var(--chipfg,#a7f3a0)' }}>{s}</span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {cmd === 'github' && (
                    <>
                      <div style={{ fontSize: 13, color: 'var(--green,#4ade80)' }}>$ ./github --activity infysumanta</div>
                      <div style={{ marginTop: 18 }}>
                        <GithubPanel />
                      </div>
                    </>
                  )}

                  {cmd === 'projects' && !proj && (
                    <>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                        <div style={{ fontSize: 13, color: 'var(--green,#4ade80)' }}>$ ls -la projects/</div>
                        <div style={{ fontSize: 11, color: 'var(--dim,#6f766c)' }}># click a card to open</div>
                      </div>
                      <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        {projects.map((p) => (
                          <div key={p.id} className="pcard" onClick={p.open} style={{ cursor: 'pointer', border: '1px solid var(--bd,#232823)', borderRadius: 10, overflow: 'hidden', background: 'var(--bg,#0e100e)' }}>
                            <div style={{ height: 104, background: stripe }}>
                              <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                            </div>
                            <div style={{ padding: '15px 15px 16px' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                <span style={{ fontSize: 15.5, fontWeight: 700, color: 'var(--fg2,#e8efe6)' }}>{p.name}</span>
                                <span style={{ fontSize: 11, color: 'var(--amber,#fbbf77)' }}>{p.year}</span>
                              </div>
                              <div style={{ fontSize: 12.5, color: 'var(--dim2,#9aa397)', lineHeight: 1.5, marginTop: 6 }}>{p.blurb}</div>
                              <div style={{ fontSize: 11, color: 'var(--green,#4ade80)', marginTop: 10 }}>{p.techline} <span style={{ color: 'var(--dim,#6f766c)' }}>· open ▸</span></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {cmd === 'projects' && !!proj && (
                    <>
                      <div className="lnk" onClick={() => { setProj(null); setError(''); }} style={{ cursor: 'pointer', fontSize: 12, color: 'var(--dim2,#9aa397)' }}>← cd ..</div>
                      <div style={{ marginTop: 12, fontSize: 13, color: 'var(--green,#4ade80)' }}>$ cat {sel.slug}/README.md</div>
                      <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '300px 1fr', gap: 26, alignItems: 'start' }}>
                        <div style={{ height: 190, borderRadius: 10, overflow: 'hidden', background: stripe }}>
                          <img src={sel.img} alt={sel.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                        </div>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                            <span style={{ fontSize: 22, fontWeight: 700, color: 'var(--fg2,#e8efe6)' }}>{sel.name}</span>
                            <span style={{ fontSize: 12, color: 'var(--amber,#fbbf77)' }}>{sel.year}</span>
                          </div>
                          <p style={{ margin: '10px 0 0', fontSize: 14, lineHeight: 1.7, color: 'var(--dim2,#9aa397)' }}>{sel.long}</p>
                          <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {sel.features.map((f) => (
                              <div key={f} style={{ display: 'flex', gap: 10, fontSize: 13, color: 'var(--fg,#d6ddd4)' }}>
                                <span style={{ color: 'var(--green,#4ade80)' }}>✓</span><span>{f}</span>
                              </div>
                            ))}
                          </div>
                          <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                            {sel.tech.map((t) => (
                              <span key={t} style={{ fontSize: 11, padding: '4px 9px', background: 'var(--chip,#18201a)', border: '1px solid var(--chipbd,#2a352a)', borderRadius: 5, color: 'var(--chipfg,#a7f3a0)' }}>{t}</span>
                            ))}
                          </div>
                          <div style={{ marginTop: 18, display: 'flex', gap: 10 }}>
                            <span className="lnk" style={{ cursor: 'pointer', fontSize: 12, fontWeight: 500, padding: '9px 15px', background: 'var(--green,#4ade80)', color: '#0b0e0b', borderRadius: 6 }}>[ github ]</span>
                            <span className="lnk" style={{ cursor: 'pointer', fontSize: 12, fontWeight: 500, padding: '9px 15px', border: '1px solid var(--bd,#232823)', color: 'var(--fg,#d6ddd4)', borderRadius: 6 }}>[ live demo ]</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {cmd === 'contact' && (
                    <>
                      <div style={{ fontSize: 13, color: 'var(--green,#4ade80)' }}>$ ./contact --dm</div>
                      <h2 style={{ margin: '16px 0 0', fontSize: 34, fontWeight: 700, color: 'var(--fg2,#e8efe6)', letterSpacing: '-.02em' }}>Let&apos;s build something.</h2>
                      <p style={{ margin: '12px 0 0', fontSize: 14.5, lineHeight: 1.7, color: 'var(--dim2,#9aa397)', maxWidth: 560 }}>Want to chat? Shoot me a direct question on Twitter and I&apos;ll respond whenever I can. I ignore all soliciting.</p>
                      <div style={{ marginTop: 22, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                        <a className="lnk" href={SOCIALS.twitter} target="_blank" rel="noreferrer" style={{ cursor: 'pointer', fontSize: 13, fontWeight: 500, padding: '12px 20px', background: 'var(--green,#4ade80)', color: '#0b0e0b', borderRadius: 8, textDecoration: 'none' }}>→ dm on twitter</a>
                        <a className="lnk" href={SOCIALS.github} target="_blank" rel="noreferrer" style={{ cursor: 'pointer', fontSize: 13, fontWeight: 500, padding: '12px 20px', border: '1px solid var(--bd,#232823)', color: 'var(--fg,#d6ddd4)', borderRadius: 8, textDecoration: 'none' }}>github</a>
                        <a className="lnk" href={SOCIALS.linkedin} target="_blank" rel="noreferrer" style={{ cursor: 'pointer', fontSize: 13, fontWeight: 500, padding: '12px 20px', border: '1px solid var(--bd,#232823)', color: 'var(--fg,#d6ddd4)', borderRadius: 8, textDecoration: 'none' }}>linkedin</a>
                        <a className="lnk" href={SOCIALS.instagram} target="_blank" rel="noreferrer" style={{ cursor: 'pointer', fontSize: 13, fontWeight: 500, padding: '12px 20px', border: '1px solid var(--bd,#232823)', color: 'var(--fg,#d6ddd4)', borderRadius: 8, textDecoration: 'none' }}>instagram</a>
                        <a className="lnk" href={SOCIALS.email} style={{ cursor: 'pointer', fontSize: 13, fontWeight: 500, padding: '12px 20px', border: '1px solid var(--bd,#232823)', color: 'var(--fg,#d6ddd4)', borderRadius: 8, textDecoration: 'none' }}>email</a>
                      </div>
                      <div style={{ marginTop: 26, fontSize: 12, color: 'var(--dim,#6f766c)', lineHeight: 1.7 }}>&gt; based in Kolkata, IN · available for full-time &amp; freelance<br />&gt; typical reply time: within a day</div>
                    </>
                  )}

                  {cmd === 'help' && (
                    <>
                      <div style={{ fontSize: 13, color: 'var(--green,#4ade80)' }}>$ help</div>
                      <p style={{ margin: '14px 0 0', fontSize: 13.5, color: 'var(--dim2,#9aa397)' }}>Available commands — type one below or click the menu:</p>
                      <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 9 }}>
                        {HELP_LIST.map((h) => (
                          <div key={h.cmd} style={{ fontSize: 13 }}>
                            <span style={{ color: 'var(--amber,#fbbf77)' }}>{h.cmd}</span>
                            <span style={{ color: 'var(--dim,#6f766c)' }}> — {h.desc}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                </div>
              </div>

              <div style={{ flex: 'none', borderTop: '1px solid var(--bd,#232823)', padding: '12px 16px', background: 'var(--panel,#161a15)' }}>
                {!!error && <div style={{ fontSize: 12, color: '#ff7a6e', marginBottom: 8 }}>zsh: {error} — type <span style={{ color: 'var(--amber,#fbbf77)' }}>help</span></div>}
                <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <span style={{ fontSize: 13, color: 'var(--green,#4ade80)', whiteSpace: 'nowrap' }}>sumanta@portfolio <span style={{ color: 'var(--blue,#7dd3fc)' }}>~</span> $</span>
                  <input className="pin" value={input} onChange={(e) => { setInput(e.target.value); setError(''); }} onKeyDown={(e) => { if (e.key === 'Enter') run((e.target as HTMLInputElement).value); }} placeholder="type a command… (about, projects, skills, contact, help)" style={{ fontSize: 13 }} />
                  <span className="hidem" style={{ fontSize: 11, color: 'var(--dim,#6f766c)' }}>↵ run</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {view === 'simple' && hint && (
        <div style={{ position: 'fixed', top: 64, right: 22, zIndex: 60, animation: 'fadein .4s cubic-bezier(.2,.8,.2,1)', display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 14px 14px 16px', background: 'var(--panel,#161a15)', border: '1px solid var(--chipbd,#2a352a)', borderRadius: 14, boxShadow: '0 16px 50px -14px rgba(0,0,0,.6)', maxWidth: 300 }}>
          <span style={{ fontSize: 16, lineHeight: 1.3 }}>💡</span>
          <div>
            <div style={{ fontSize: 12.5, lineHeight: 1.5, color: 'var(--fg,#d6ddd4)' }}>Want the full picture at a glance? Try the <span style={{ color: 'var(--green,#4ade80)' }}>▦ terminal</span> view.</div>
            <span onClick={() => { setView('terminal'); setHint(false); }} className="lnk" style={{ cursor: 'pointer', display: 'inline-block', marginTop: 10, fontSize: 12, fontWeight: 500, padding: '8px 14px', background: 'var(--green,#4ade80)', color: '#0b0e0b', borderRadius: 8 }}>open terminal →</span>
          </div>
          <span onClick={() => setHint(false)} className="lnk" style={{ cursor: 'pointer', fontSize: 16, color: 'var(--dim,#6f766c)', padding: '0 2px', lineHeight: 1 }}>×</span>
        </div>
      )}
    </div>
  );
}
