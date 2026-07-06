# Astro Terminal Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Next.js "magicui" homepage with the terminal-themed design from `content/Portfolio.dc.html`, migrate the whole site to Astro (static output), and keep the blog on Astro content collections — ready to deploy to Cloudflare Pages.

**Architecture:** Static Astro site. A single React island (`Portfolio.tsx`, `client:load`) renders the entire terminal/simple-view UI with local `useState`. The blog uses Astro's built-in content collections (glob loader + native MDX rendering) instead of the current manual remark/rehype pipeline. No server runtime, no adapter — Cloudflare Pages serves the static `dist/` build.

**Tech Stack:** Astro, `@astrojs/react`, `@astrojs/mdx`, React 19 (already installed), TypeScript.

## Global Constraints

- Output mode is static (`output: 'static'` in `astro.config.mjs`) — no SSR, no `@astrojs/cloudflare` adapter.
- No Tailwind anywhere in the new code — all styling is inline `style` objects + a small global stylesheet, exactly matching `content/Portfolio.dc.html`.
- Drop these deps entirely: all `@radix-ui/*`, `framer-motion`, `next-themes`, `cmdk`, `embla-carousel-react`, `recharts`, `react-hook-form`, `@hookform/resolvers`, `zod`, `sonner`, `vaul`, `react-day-picker`, `input-otp`, `class-variance-authority`, `tailwind-merge`, `clsx`, `lucide-react`, `react-resizable-panels`, `gray-matter`, `react-markdown`, `rehype-pretty-code`, `rehype-stringify`, `remark-gfm`, `remark-parse`, `remark-rehype`, `unified`, `next`, `eslint-config-next`, `tailwindcss`, `@tailwindcss/postcss`.
- Delete these files/dirs once their replacement lands: `src/app/**`, `src/components/ui/**`, `src/components/magicui/**`, `src/components/mdx.tsx`, `src/components/navbar.tsx`, `src/components/mode-toggle.tsx`, `src/components/hackathon-card.tsx`, `src/components/resume-card.tsx`, `src/components/icons.tsx`, `src/components/theme-provider.tsx`, `src/data/resume.tsx`, `src/hooks/use-mobile.ts`, `next.config.ts`, `next-env.d.ts`, `postcss.config.mjs`, `components.json`.
- `content/hello-world.mdx`'s frontmatter (`title`, `publishedAt`, `summary`) is the blog collection schema — do not rename fields.

---

### Task 1: Scaffold Astro project

**Files:**
- Modify: `package.json` (replace scripts/deps)
- Create: `astro.config.mjs`
- Modify: `tsconfig.json`
- Create: `src/pages/index.astro` (placeholder, replaced in Task 3)
- Delete: `postcss.config.mjs`, `components.json`, `next.config.ts`, `next-env.d.ts`

**Interfaces:**
- Produces: a working `astro build` / `astro dev` toolchain that later tasks add pages/components to.

- [ ] **Step 1: Install Astro and drop Next.js**

```bash
pnpm remove next next-themes eslint-config-next tailwindcss @tailwindcss/postcss \
  @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-aspect-ratio \
  @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-collapsible \
  @radix-ui/react-context-menu @radix-ui/react-dialog @radix-ui/react-dropdown-menu \
  @radix-ui/react-hover-card @radix-ui/react-icons @radix-ui/react-label \
  @radix-ui/react-menubar @radix-ui/react-navigation-menu @radix-ui/react-popover \
  @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-scroll-area \
  @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slider \
  @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tabs \
  @radix-ui/react-toggle @radix-ui/react-toggle-group @radix-ui/react-tooltip \
  framer-motion cmdk embla-carousel-react recharts react-hook-form @hookform/resolvers zod \
  sonner vaul react-day-picker input-otp class-variance-authority tailwind-merge clsx \
  lucide-react react-resizable-panels gray-matter react-markdown rehype-pretty-code \
  rehype-stringify remark-gfm remark-parse remark-rehype unified tw-animate-css

pnpm add astro @astrojs/react @astrojs/mdx
pnpm add -D @types/react @types/react-dom
```

- [ ] **Step 2: Write `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

export default defineConfig({
  output: 'static',
  integrations: [react(), mdx()],
});
```

- [ ] **Step 3: Replace `package.json` scripts**

Edit the `"scripts"` block to:

```json
"scripts": {
  "dev": "astro dev",
  "build": "astro build",
  "preview": "astro preview"
}
```

- [ ] **Step 4: Update `tsconfig.json`**

Replace contents with:

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

- [ ] **Step 5: Delete leftover Next.js config files**

```bash
rm -f postcss.config.mjs components.json next.config.ts next-env.d.ts
rm -rf .next
```

- [ ] **Step 6: Create a placeholder page so the build has an entry point**

Create `src/pages/index.astro`:

```astro
---
---
<html>
  <body>placeholder</body>
</html>
```

- [ ] **Step 7: Verify the toolchain builds**

Run: `pnpm build`
Expected: `dist/index.html` is produced, no errors.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "chore: scaffold Astro, drop Next.js toolchain"
```

---

### Task 2: Base layout and global styles

**Files:**
- Create: `src/layouts/Base.astro`

**Interfaces:**
- Produces: `Base.astro` default-exports a layout accepting a `title` string prop and a `<slot />` for page content. Provides global CSS classes used by `Portfolio.tsx`: `.cursor`, `.mi`, `.lnk`, `.chip`, `.pcard`, `.scroll`, `.pin`, `.tg`, plus the `[data-theme="dark"]` / `[data-theme="light"]` CSS custom properties and the `@media(max-width:860px)` responsive rules.

- [ ] **Step 1: Create `src/layouts/Base.astro`**

```astro
---
interface Props {
  title: string;
}
const { title } = Astro.props;
---
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,500;0,700;1,400&display=swap" rel="stylesheet" />
  <style is:global>
    *{box-sizing:border-box}
    body{margin:0;font-family:'JetBrains Mono',ui-monospace,monospace}
    [data-theme="dark"]{--desk:#080a08;--bg:#0e100e;--panel:#161a15;--panel2:#131713;--bd:#232823;--fg:#d6ddd4;--fg2:#e8efe6;--dim:#6f766c;--dim2:#9aa397;--green:#4ade80;--blue:#7dd3fc;--amber:#fbbf77;--chip:#18201a;--chipbd:#2a352a;--chipfg:#a7f3a0;--stripe1:#131713;--stripe2:#171c17;--sel:#1c2a1c;--shadow:0 30px 90px -30px rgba(0,0,0,.8)}
    [data-theme="light"]{--desk:#e7e3d8;--bg:#f6f3ec;--panel:#eceadf;--panel2:#f0ede4;--bd:#ded9cc;--fg:#3a382f;--fg2:#1e1d17;--dim:#948f7f;--dim2:#6b665a;--green:#2f8f4e;--blue:#2f6bcf;--amber:#a9701f;--chip:#eae5d8;--chipbd:#d3cdbd;--chipfg:#2f6b3f;--stripe1:#e5e0d3;--stripe2:#ece7db;--sel:#e3ecd9;--shadow:0 30px 90px -40px rgba(0,0,0,.28)}
    @keyframes blink{0%,49%{opacity:1}50%,100%{opacity:0}}
    @keyframes fadein{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
    .cursor{animation:blink 1.1s step-end infinite}
    .mi{transition:background .16s,color .16s,border-color .16s}.mi:hover{background:var(--sel)}
    .lnk{transition:opacity .18s}.lnk:hover{opacity:.6}
    .chip{transition:transform .16s,border-color .16s}.chip:hover{transform:translateY(-2px);border-color:var(--green)}
    .pcard{transition:border-color .18s,transform .18s}.pcard:hover{border-color:var(--green)!important;transform:translateY(-3px)}
    .scroll::-webkit-scrollbar{width:8px}.scroll::-webkit-scrollbar-thumb{background:var(--bd);border-radius:4px}.scroll{scrollbar-width:thin;scrollbar-color:var(--bd) transparent}
    .pin{background:transparent;border:none;outline:none;color:var(--fg);font:inherit;flex:1;caret-color:var(--green)}.pin::placeholder{color:var(--dim)}
    .tg{transition:background .16s,color .16s}
    @media(max-width:860px){
     .cwrap{height:auto!important;min-height:100vh;padding:14px 12px 40px!important}
     .win{height:auto!important;max-height:none!important}
     .cbody,.tbody{grid-template-columns:1fr!important}
     .side,.tleft{border-right:none!important;border-bottom:1px solid var(--bd)!important}
     .menu{flex-direction:row!important;overflow-x:auto;gap:8px!important}.menu .mi{white-space:nowrap;flex:none}
     .main{max-height:none!important}
     .tgrid{grid-template-columns:1fr!important}
     .hidem{display:none!important}
    }
  </style>
</head>
<body>
  <slot />
</body>
</html>
```

- [ ] **Step 2: Verify build still succeeds**

Run: `pnpm build`
Expected: no errors (placeholder page from Task 1 doesn't use this layout yet, so this just checks the file has no syntax errors — Astro type-checks `.astro` files during build).

- [ ] **Step 3: Commit**

```bash
git add src/layouts/Base.astro
git commit -m "feat: add base layout with terminal-portfolio global styles"
```

---

### Task 3: Port the Portfolio component

**Files:**
- Create: `src/components/Portfolio.tsx`
- Modify: `src/pages/index.astro` (replace placeholder)

**Interfaces:**
- Produces: `Portfolio` — default export, a zero-prop React component — mounted via `<Portfolio client:load />`.

- [ ] **Step 1: Create `src/components/Portfolio.tsx`**

```tsx
import { useState } from 'react';

type Project = {
  id: number;
  name: string;
  year: string;
  slug: string;
  blurb: string;
  techline: string;
  long: string;
  features: string[];
  tech: string[];
};

const PROJECT_DATA: Project[] = [
  {
    id: 1, name: 'Hirelytics', year: '2024', slug: 'hirelytics',
    blurb: 'AI hiring — voice interviews, auto eval & attention monitoring.',
    techline: 'react · webrtc · openai',
    long: 'A complete AI hiring platform covering both recruiter and candidate workflows — from job creation through automated, AI-graded voice interviews.',
    features: ['Recruiter & candidate workflows', 'Real-time voice interviews (WebRTC)', 'Automated evaluation & scoring', 'Attention monitoring during sessions'],
    tech: ['React', 'Node.js', 'WebRTC', 'OpenAI', 'PostgreSQL', 'Tailwind'],
  },
  {
    id: 2, name: 'Talkthru', year: '2024', slug: 'talkthru',
    blurb: 'Mental-health chatbot — RAG, GPT-4o, emotion detection, CBT.',
    techline: 'openai · gemini · vectordb',
    long: 'A mobile mental-health companion connecting users with an AI therapist through natural chat — with memory, emotion awareness and clinical safety flows.',
    features: ['RAG + GPT-4o & Gemini responses', 'Emotion detection & semantic memory', 'CBT support and guided journaling', 'Crisis detection & escalation workflows'],
    tech: ['OpenAI', 'Gemini', 'VectorDB', 'Next.js', 'Tailwind'],
  },
  {
    id: 3, name: 'Healthvio', year: '2023', slug: 'healthvio',
    blurb: 'Telehealth — scheduling, EHR, video calls & calendar sync.',
    techline: 'next · agora · calendar',
    long: 'A full telehealth product handling the clinical journey end to end — booking, dynamic intake, secure video consults and two-way calendar sync.',
    features: ['Appointment scheduling & EHR workflows', 'In-app video calls (Agora)', 'Dynamic patient questionnaires', 'Google Calendar & Outlook sync'],
    tech: ['Next.js', 'Node.js', 'Agora', 'Google Calendar', 'Outlook'],
  },
  {
    id: 4, name: 'Python CLI Coder', year: '2024', slug: 'py-coder',
    blurb: 'CLI for AI codegen, scaffolding & iterative full-stack dev.',
    techline: 'python · cli · openai',
    long: 'A command-line coding agent that generates code, scaffolds folder structures and iterates on full-stack projects with GenAI — built in a 2-day sprint on ~1M tokens.',
    features: ['AI-assisted code generation', 'Folder-structure scaffolding', 'Iterative full-stack development', 'GenAI-driven refactor loops'],
    tech: ['Python', 'CLI', 'OpenAI'],
  },
];

const EXPERIENCE = [
  { co: 'BexCode Services', role: 'Full Stack Developer · Team Lead · Remote', short: 'Full Stack · Team Lead', whenShort: '2023→now', when: '2023 — Present', note: 'Leading AI-driven healthcare product development end to end.' },
  { co: 'Tata Consultancy Services', role: 'Assistant Systems Engineer', short: 'Asst. Systems Engineer', whenShort: '2021→2022', when: '2021 — 2022', note: 'Built and maintained enterprise-scale web services.' },
  { co: 'Tata Consultancy Services', role: 'Assistant Systems Engineer Trainee', short: 'ASE Trainee', whenShort: '2020→2021', when: '2020 — 2021', note: 'Onboarded across full-stack delivery and cloud tooling.' },
  { co: 'Real Time Consultancy (RTCS)', role: 'Full Stack Developer', short: 'Full Stack Developer', whenShort: '2019→2020', when: '2019 — 2020', note: 'Shipped full-stack features for client products.' },
];

const EDUCATION = [
  { school: 'Trivenidevi Bhalotia College', deg: 'Bachelor of Computer Science', when: '2016 — 19' },
  { school: 'Ondal High School', deg: 'Higher Secondary (W.B.C.H.S.E)', when: '2014 — 16' },
  { school: 'Dakshinkhanda High School', deg: 'Secondary (W.B.B.S.E)', when: '2012 — 14' },
];

const STATS = [
  { n: '6+', l: 'years shipping' },
  { n: '15+', l: 'technologies' },
  { n: '4', l: 'products built' },
  { n: '4', l: 'companies' },
];

const SKILLS = ['react', 'next.js', 'typescript', 'node', 'python', 'go', 'mongodb', 'postgres', 'redis', 'docker', 'aws', 'azure'];

const SKILL_GROUPS = [
  { label: 'frontend', items: ['React', 'Next.js', 'Angular', 'TypeScript', 'Tailwind'] },
  { label: 'backend', items: ['Node.js', 'Python', 'Go', 'GraphQL'] },
  { label: 'data', items: ['PostgreSQL', 'MongoDB', 'Redis'] },
  { label: 'cloud & devops', items: ['Docker', 'AWS', 'Azure'] },
];

const MENU_DEF = [
  { key: 'about', label: 'about', hint: 'whoami' },
  { key: 'experience', label: 'experience', hint: './work' },
  { key: 'education', label: 'education', hint: './edu' },
  { key: 'skills', label: 'skills', hint: 'npm ls' },
  { key: 'projects', label: 'projects', hint: 'ls -la' },
  { key: 'contact', label: 'contact', hint: '--dm' },
];

const HELP_LIST = [
  { cmd: 'about', desc: 'who I am' },
  { cmd: 'experience', desc: 'where I have worked' },
  { cmd: 'education', desc: 'my background' },
  { cmd: 'skills', desc: 'the tech I use' },
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
  projects: 'projects', ls: 'projects', portfolio: 'projects',
  contact: 'contact', dm: 'contact', hire: 'contact', email: 'contact',
  help: 'help', '?': 'help', clear: 'about',
};

const stripe = 'repeating-linear-gradient(45deg,var(--stripe1,#131713),var(--stripe1,#131713) 9px,var(--stripe2,#171c17) 9px,var(--stripe2,#171c17) 18px)';

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
              <div className="tleft" style={{ padding: '32px 30px', borderRight: '1px solid var(--bd,#232823)' }}>
                <div style={{ fontSize: 13, color: 'var(--green,#4ade80)' }}>$ cat profile.json</div>
                <div style={{ marginTop: 16, fontSize: 14, lineHeight: 1.9 }}>
                  <span style={{ color: 'var(--dim,#6f766c)' }}>{'{'}</span><br />
                  &nbsp;&nbsp;<span style={{ color: 'var(--blue,#7dd3fc)' }}>&quot;name&quot;</span>: <span style={{ color: 'var(--amber,#fbbf77)' }}>&quot;Sumanta Kabiraj&quot;</span>,<br />
                  &nbsp;&nbsp;<span style={{ color: 'var(--blue,#7dd3fc)' }}>&quot;role&quot;</span>: <span style={{ color: 'var(--amber,#fbbf77)' }}>&quot;Full-Stack Developer&quot;</span>,<br />
                  &nbsp;&nbsp;<span style={{ color: 'var(--blue,#7dd3fc)' }}>&quot;focus&quot;</span>: <span style={{ color: 'var(--amber,#fbbf77)' }}>&quot;AI · real-time · healthcare&quot;</span>,<br />
                  &nbsp;&nbsp;<span style={{ color: 'var(--blue,#7dd3fc)' }}>&quot;stack&quot;</span>: <span style={{ color: 'var(--amber,#fbbf77)' }}>&quot;React · Next · Node · GenAI&quot;</span>,<br />
                  &nbsp;&nbsp;<span style={{ color: 'var(--blue,#7dd3fc)' }}>&quot;status&quot;</span>: <span style={{ color: 'var(--green,#4ade80)' }}>&quot;available&quot;</span> <span className="cursor" style={{ color: 'var(--green,#4ade80)' }}>▍</span><br />
                  <span style={{ color: 'var(--dim,#6f766c)' }}>{'}'}</span>
                </div>

                <div style={{ marginTop: 22, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
                  {STATS.map((st, i) => (
                    <div key={i} style={{ border: '1px solid var(--bd,#232823)', borderRadius: 8, padding: '12px 10px', background: 'var(--panel2,#131713)' }}>
                      <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--fg2,#e8efe6)', lineHeight: 1 }}>{st.n}</div>
                      <div style={{ fontSize: 10, color: 'var(--dim,#6f766c)', marginTop: 4 }}>{st.l}</div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 34, fontSize: 13, color: 'var(--green,#4ade80)' }}>$ ./experience --list</div>
                <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {EXPERIENCE.map((e, i) => (
                    <div key={i} style={{ display: 'flex', gap: 12 }}>
                      <span style={{ color: 'var(--green,#4ade80)', flex: 'none' }}>▸</span>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--fg2,#e8efe6)' }}>{e.co}</div>
                        <div style={{ fontSize: 13, color: 'var(--dim,#6f766c)', marginTop: 2 }}>{e.short} <span style={{ color: 'var(--blue,#7dd3fc)' }}>· {e.whenShort}</span></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 34, fontSize: 13, color: 'var(--green,#4ade80)' }}>$ ./education --list</div>
                <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {EDUCATION.map((ed, i) => (
                    <div key={i} style={{ display: 'flex', gap: 12 }}>
                      <span style={{ color: 'var(--amber,#fbbf77)', flex: 'none' }}>▸</span>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--fg2,#e8efe6)' }}>{ed.school}</div>
                        <div style={{ fontSize: 12.5, color: 'var(--dim,#6f766c)', marginTop: 2 }}>{ed.deg} <span style={{ color: 'var(--blue,#7dd3fc)' }}>· {ed.when}</span></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 34, fontSize: 13, color: 'var(--green,#4ade80)' }}>$ npm ls --stack</div>
                <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {SKILLS.map((s) => (
                    <span key={s} className="chip" style={{ fontSize: 12, padding: '6px 11px', background: 'var(--chip,#18201a)', border: '1px solid var(--chipbd,#2a352a)', borderRadius: 6, color: 'var(--chipfg,#a7f3a0)' }}>{s}</span>
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
                      <div style={{ height: 118, background: stripe, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: 11, color: 'var(--dim,#6f766c)' }}>{p.slug}</span>
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
                  <div style={{ marginTop: 15, display: 'flex', gap: 16, fontSize: 13 }}>
                    <span className="lnk" style={{ cursor: 'pointer', color: 'var(--blue,#7dd3fc)' }}>[github]</span>
                    <span className="lnk" style={{ cursor: 'pointer', color: 'var(--blue,#7dd3fc)' }}>[linkedin]</span>
                    <span className="lnk" style={{ cursor: 'pointer', color: 'var(--blue,#7dd3fc)' }}>[twitter]</span>
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
                  <div style={{ width: 44, height: 44, flex: 'none', borderRadius: 10, background: stripe, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: 'var(--dim,#6f766c)' }}>SK</div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--fg2,#e8efe6)' }}>Sumanta Kabiraj</div>
                    <div style={{ fontSize: 12, color: 'var(--dim,#6f766c)' }}>Full-Stack Developer</div>
                  </div>
                </div>
                <div style={{ marginTop: 12, display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 11.5, color: 'var(--green,#4ade80)', padding: '5px 10px', background: 'var(--sel,#1c2a1c)', borderRadius: 100 }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green,#4ade80)' }} />Open to work
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

              <div style={{ marginTop: 'auto', display: 'flex', gap: 16, fontSize: 12, color: 'var(--blue,#7dd3fc)' }}>
                <span className="lnk" style={{ cursor: 'pointer' }}>github</span><span className="lnk" style={{ cursor: 'pointer' }}>linkedin</span><span className="lnk" style={{ cursor: 'pointer' }}>twitter</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <div className="main scroll" style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '26px 30px' }}>
                <div key={cmd + (proj || '')} style={{ animation: 'fadein .28s ease' }}>

                  {cmd === 'about' && (
                    <>
                      <div style={{ fontSize: 13, color: 'var(--green,#4ade80)' }}>$ whoami</div>
                      <h1 style={{ margin: '14px 0 0', fontSize: 38, fontWeight: 700, lineHeight: 1.05, letterSpacing: '-.02em', color: 'var(--fg2,#e8efe6)' }}>I build AI systems<br />for healthcare.</h1>
                      <p style={{ margin: '16px 0 0', fontSize: 14.5, lineHeight: 1.7, color: 'var(--dim2,#9aa397)', maxWidth: 620 }}>Experienced Full-Stack Developer with a passion for building intelligent, scalable healthcare solutions — AI conversational systems, secure authentication, EHR integrations &amp; cloud-native architectures across React, Node.js, Go, Python, Azure &amp; AWS.</p>
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

                  {cmd === 'projects' && !proj && (
                    <>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                        <div style={{ fontSize: 13, color: 'var(--green,#4ade80)' }}>$ ls -la projects/</div>
                        <div style={{ fontSize: 11, color: 'var(--dim,#6f766c)' }}># click a card to open</div>
                      </div>
                      <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        {projects.map((p) => (
                          <div key={p.id} className="pcard" onClick={p.open} style={{ cursor: 'pointer', border: '1px solid var(--bd,#232823)', borderRadius: 10, overflow: 'hidden', background: 'var(--bg,#0e100e)' }}>
                            <div style={{ height: 104, background: stripe, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <span style={{ fontSize: 11, color: 'var(--dim,#6f766c)' }}>{p.slug}</span>
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
                        <div style={{ height: 190, borderRadius: 10, background: stripe, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ fontSize: 11, color: 'var(--dim,#6f766c)' }}>{sel.slug}.png</span>
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
                        <span className="lnk" style={{ cursor: 'pointer', fontSize: 13, fontWeight: 500, padding: '12px 20px', background: 'var(--green,#4ade80)', color: '#0b0e0b', borderRadius: 8 }}>→ dm on twitter</span>
                        <span className="lnk" style={{ cursor: 'pointer', fontSize: 13, fontWeight: 500, padding: '12px 20px', border: '1px solid var(--bd,#232823)', color: 'var(--fg,#d6ddd4)', borderRadius: 8 }}>github</span>
                        <span className="lnk" style={{ cursor: 'pointer', fontSize: 13, fontWeight: 500, padding: '12px 20px', border: '1px solid var(--bd,#232823)', color: 'var(--fg,#d6ddd4)', borderRadius: 8 }}>linkedin</span>
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
```

- [ ] **Step 2: Replace `src/pages/index.astro`**

```astro
---
import Base from '../layouts/Base.astro';
import Portfolio from '../components/Portfolio';
---
<Base title="Sumanta Kabiraj — Full-Stack Developer">
  <Portfolio client:load />
</Base>
```

- [ ] **Step 3: Build and manually verify**

Run: `pnpm build`
Expected: no errors.

Run: `pnpm dev`, open the printed local URL, and manually check:
- Default view is "simple" showing the "about" section.
- Clicking each sidebar menu item (about, experience, education, skills, projects, contact) switches sections.
- Typing `help`, `terminal`, `theme`, and an invalid command (e.g. `zzz`) in the input bar all behave correctly (view switch, theme flip, error message).
- Switching to terminal view (top-right toggle) shows the two-pane layout; clicking a project card expands/collapses it.
- In simple view, clicking a project card opens its detail page; "← cd .." returns to the grid.
- The hint tooltip appears once in simple view and dismissing it (× or "open terminal") makes it disappear.

- [ ] **Step 4: Commit**

```bash
git add src/components/Portfolio.tsx src/pages/index.astro
git commit -m "feat: port terminal-portfolio design as Portfolio.tsx island"
```

---

### Task 4: Blog on Astro content collections

**Files:**
- Create: `src/content.config.ts`
- Create: `src/content/blog/hello-world.mdx` (moved from `content/hello-world.mdx`)
- Delete: `content/hello-world.mdx`
- Create: `src/pages/blog/index.astro`
- Create: `src/pages/blog/[slug].astro`

**Interfaces:**
- Produces: `blog` collection with schema `{ title: string, publishedAt: string (date), summary: string }`.

- [ ] **Step 1: Move the post**

```bash
mkdir -p src/content/blog
git mv content/hello-world.mdx src/content/blog/hello-world.mdx
```

- [ ] **Step 2: Define the collection**

Create `src/content.config.ts`:

```ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    publishedAt: z.coerce.date(),
    summary: z.string(),
  }),
});

export const collections = { blog };
```

- [ ] **Step 3: Blog index page**

Create `src/pages/blog/index.astro`:

```astro
---
import { getCollection } from 'astro:content';
import Base from '../../layouts/Base.astro';

const posts = (await getCollection('blog')).sort(
  (a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf()
);
---
<Base title="Blog — Sumanta Kabiraj">
  <div data-theme="dark" style={{ minHeight: '100vh', background: 'var(--desk,#080a08)', color: 'var(--fg,#d6ddd4)', padding: '48px 24px' }}>
    <div style="max-width:720px;margin:0 auto">
      <h1 style="font-size:28px;color:var(--fg2,#e8efe6)">$ ls -la blog/</h1>
      <div style="margin-top:24px;display:flex;flex-direction:column;gap:20px">
        {posts.map((post) => (
          <a href={`/blog/${post.id}`} style="text-decoration:none;color:inherit;border-top:1px solid var(--bd,#232823);padding-top:16px">
            <div style="font-size:18px;font-weight:700;color:var(--fg2,#e8efe6)">{post.data.title}</div>
            <div style="font-size:12px;color:var(--blue,#7dd3fc);margin-top:4px">{post.data.publishedAt.toDateString()}</div>
            <div style="font-size:13px;color:var(--dim2,#9aa397);margin-top:6px">{post.data.summary}</div>
          </a>
        ))}
      </div>
    </div>
  </div>
</Base>
```

- [ ] **Step 4: Blog post page**

Create `src/pages/blog/[slug].astro`:

```astro
---
import { getCollection, render } from 'astro:content';
import Base from '../../layouts/Base.astro';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await render(post);
---
<Base title={`${post.data.title} — Sumanta Kabiraj`}>
  <div data-theme="dark" style={{ minHeight: '100vh', background: 'var(--desk,#080a08)', color: 'var(--fg,#d6ddd4)', padding: '48px 24px' }}>
    <article style="max-width:720px;margin:0 auto">
      <a href="/blog" style="font-size:12px;color:var(--dim2,#9aa397);text-decoration:none">&larr; cd ..</a>
      <h1 style="font-size:32px;color:var(--fg2,#e8efe6);margin-top:16px">{post.data.title}</h1>
      <div style="font-size:12px;color:var(--blue,#7dd3fc);margin-top:6px">{post.data.publishedAt.toDateString()}</div>
      <div style="margin-top:24px;line-height:1.7;font-size:15px">
        <Content />
      </div>
    </article>
  </div>
</Base>
```

- [ ] **Step 5: Build and verify**

Run: `pnpm build`
Expected: `dist/blog/index.html` and `dist/blog/hello-world/index.html` are produced, no errors.

Run: `pnpm dev`, visit `/blog` and confirm the "Hello World" post is listed with its summary and date, then click through to `/blog/hello-world` and confirm the code block and table render.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: port blog to Astro content collections"
```

---

### Task 5: Cleanup, docs, and Cloudflare deploy instructions

**Files:**
- Delete: `src/app/**`, `src/components/ui/**`, `src/components/magicui/**`, `src/components/mdx.tsx`, `src/components/navbar.tsx`, `src/components/mode-toggle.tsx`, `src/components/hackathon-card.tsx`, `src/components/resume-card.tsx`, `src/components/icons.tsx`, `src/components/theme-provider.tsx`, `src/data/resume.tsx`, `src/hooks/use-mobile.ts`
- Modify: `README.md`
- Modify: `.gitignore`

**Interfaces:**
- N/A (cleanup + docs task).

- [ ] **Step 1: Delete superseded files**

```bash
git rm -rf src/app src/components/ui src/components/magicui \
  src/components/mdx.tsx src/components/navbar.tsx src/components/mode-toggle.tsx \
  src/components/hackathon-card.tsx src/components/resume-card.tsx \
  src/components/icons.tsx src/components/theme-provider.tsx \
  src/data/resume.tsx src/hooks
```

- [ ] **Step 2: Update `.gitignore` for Astro**

Add (if not already present):

```
dist/
.astro/
```

- [ ] **Step 3: Rewrite `README.md`**

```markdown
# sumantakabiraj.com

Astro + React island terminal-themed portfolio, deployed as a static site on Cloudflare Pages.

## Development

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build   # outputs to dist/
pnpm preview # preview the production build locally
```

## Deploy (Cloudflare Pages)

1. In the Cloudflare dashboard, create a Pages project connected to this GitHub repo.
2. Build command: `pnpm build`
3. Output directory: `dist`
4. No environment variables or adapter needed — this is a fully static build.
```

- [ ] **Step 4: Full verification pass**

Run: `pnpm build`
Expected: clean build, no errors, no warnings about missing files.

Run:
```bash
grep -rl "next/" src/ 2>/dev/null; grep -rl "@radix-ui" src/ 2>/dev/null; grep -rl "resume.tsx" src/ 2>/dev/null
```
Expected: no output (no leftover references to removed Next.js/Radix/data files).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: remove leftover Next.js files, update docs for Astro + Cloudflare Pages"
```

---

## Self-Review Notes

- Spec coverage: architecture (Task 1), homepage port (Task 3), blog (Task 4), dependency drop list (Tasks 1 & 5), deployment docs (Task 5), testing/verification (manual QA steps in Tasks 3–5) — all covered.
- No placeholders: every step has literal file contents or exact commands.
- Type consistency: `Portfolio.tsx` state shape, `COMMAND_MAP`, and `PROJECT_DATA`/`EXPERIENCE`/etc. are defined once in Task 3 and not redefined elsewhere; blog collection field names (`title`, `publishedAt`, `summary`) match between `content.config.ts` (Task 4 Step 2) and both blog pages (Task 4 Steps 3–4).
