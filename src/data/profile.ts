// Shared content for the new (default) design. Duplicated from Portfolio.tsx
// on purpose — see the redesign plan: keeps the old /old-portfolio/terminal design's working
// component untouched instead of reshaping it around a shared module.

export type Project = {
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

export const PROJECT_DATA: Project[] = [
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
  {
    id: 5, name: 'Terminal Portfolio', year: '2026', slug: 'terminal-portfolio', img: '/me.jpeg',
    blurb: 'This site\'s original terminal-themed UI — an Astro SPA kept alive at /old-portfolio/terminal.',
    techline: 'astro · react · localStorage',
    long: 'The portfolio\'s first design: a single-page terminal aesthetic built with Astro and a hydrated React component, with its own dark/light theme persistence. Superseded by this Onest-based redesign but kept live as a legacy route.',
    features: ['Terminal-styled dark/light theme', 'Client-side routing synced to the URL', 'Full section set: about, experience, education, skills, projects, contact'],
    tech: ['Astro', 'React', 'TypeScript'],
    demo: '/old-portfolio/terminal',
  },
  {
    id: 6, name: 'Video Call Appointment App', year: '2023', slug: 'video-call-appointment-app', img: '/me.jpeg',
    blurb: 'Book appointments and join live video consultations in the browser.',
    techline: 'next.js · webrtc · getstream',
    long: 'An appointment-booking app with in-browser video calls, built on Next.js with WebRTC and getstream.io handling the real-time video layer.',
    features: ['Appointment scheduling', 'Real-time video calls (WebRTC)', 'getstream.io video integration', 'Responsive SCSS/Tailwind UI'],
    tech: ['Next.js', 'React', 'SCSS', 'Tailwind', 'WebRTC', 'GetStream.io'],
    github: 'https://github.com/infysumanta/nextjs-videocall-app',
  },
  {
    id: 7, name: 'Full Stack Kanban Application', year: '2022', slug: 'kanban-app', img: '/me.jpeg',
    blurb: 'Drag-and-drop Kanban board backed by a full Node/Express/MongoDB API.',
    techline: 'react · node · mongodb',
    long: 'A full-stack Kanban board — boards, lists and cards with drag-and-drop, backed by a Node.js/Express/MongoDB API.',
    features: ['Drag-and-drop boards, lists & cards', 'REST API on Node/Express', 'MongoDB persistence', 'Tailwind + styled-components UI'],
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind', 'Styled Components'],
    github: 'https://github.com/infysumanta/node-react-kanban-app',
  },
  {
    id: 8, name: 'Dynamic Form Builder', year: '2023', slug: 'form-builder', img: '/me.jpeg',
    blurb: 'Visual drag-and-drop form designer with a Postgres-backed API.',
    techline: 'next.js · node · postgres',
    long: 'A dynamic form builder — design forms visually on the React/Next.js front end and store schemas and submissions through a Node/Express API on Postgres.',
    features: ['Visual drag-and-drop form designer', 'Dynamic field types & validation', 'Node/Express API on Postgres', 'Tailwind + styled-components UI'],
    tech: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Express', 'Tailwind', 'Styled Components'],
    github: 'https://github.com/infysumanta/form-builder',
  },
  {
    id: 9, name: 'Provaswito Art Org Website', year: '2022', slug: 'provaswito-org', img: '/me.jpeg',
    blurb: 'Public website for Provaswito, an art organization.',
    techline: 'web',
    long: 'The public website for Provaswito, an art organization — showcasing events, members and their work.',
    features: ['Organization info & events', 'Member/artist showcase', 'Responsive public website'],
    tech: [],
    github: 'https://github.com/infysumanta/provaswito.org',
  },
  {
    id: 10, name: 'Pizza Booking Application', year: '2022', slug: 'pizza-booking-app', img: '/me.jpeg',
    blurb: 'Real-time pizza ordering app with live order tracking.',
    techline: 'react · node · mongodb',
    long: 'A real-time pizza booking and ordering application — place orders and track status live, built on a Node/Express/MongoDB stack.',
    features: ['Real-time order placement & tracking', 'Node/Express/MongoDB backend', 'Tailwind CSS UI'],
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind'],
    github: 'https://github.com/infysumanta/node-react-real-time-pizza-order-app',
  },
  {
    id: 11, name: 'Visual Studio Code Extensions', year: '2022', slug: 'vscode-extensions-pack', img: '/me.jpeg',
    blurb: 'A collection of custom Visual Studio Code extensions.',
    techline: 'vs code · typescript',
    long: 'A pack of custom Visual Studio Code extensions.',
    features: ['Custom VS Code extension pack'],
    tech: ['TypeScript'],
    github: 'https://github.com/vscode-extensions-pack',
  },
];

export const EXPERIENCE = [
  { co: 'BuildFound (Fddigital)', role: 'Full Stack Developer · Remote', when: 'Sep 2025 — Present', note: 'Building AI MVPs and scalable AI products for startups and enterprises.' },
  { co: 'BexCode Services (Dcode Health)', role: 'Full Stack Developer · Team Lead · Remote', when: 'Feb 2023 — Sep 2025', note: 'Led team management and full-stack delivery, building Node.js services and infrastructure for Dcode Health, a healthcare platform.' },
  { co: 'Tata Consultancy Services', role: 'Assistant System Engineer Developer', when: 'Feb 2020 — Nov 2022', note: 'Back-end web development and MongoDB-based enterprise services.' },
  { co: 'Real Time Consultancy Services', role: 'Software Developer', when: 'Jul 2019 — Feb 2020', note: 'Shipped React.js and MongoDB features for client products.' },
];

export const EDUCATION = [
  { school: 'SRM University Sikkim', deg: 'Master of Computer Applications (MCA) — AI, ML & Data Science', when: 'Jul 2025 — Present' },
  { school: 'Triveni Devi Bhalotia (TDB) College, Raniganj', deg: 'Bachelor of Computer Science', when: '2016 — 19' },
  { school: 'Ondal High School', deg: 'Higher Secondary (W.B.C.H.S.E)', when: '2014 — 16' },
  { school: 'Dakshinkhanda High School', deg: 'Secondary (W.B.B.S.E)', when: '2012 — 14' },
];

export const SOCIALS = {
  github: 'https://github.com/infysumanta',
  linkedin: 'https://www.linkedin.com/in/sumanta-kabiraj/',
  twitter: 'https://x.com/infysumanta',
  instagram: 'https://instagram.com/infysumanta',
  email: 'mailto:me@sumantakabiraj.com',
  cal: 'https://cal.com/sumanta-kabiraj/connect-with-me',
};

export const SKILLS = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'Go', 'React Native', 'Expo', 'Tauri', 'MongoDB', 'PostgreSQL', 'Redis', 'Docker', 'AWS', 'Azure'];

export const BIO_PARAGRAPHS = [
  "I'm a full-stack developer who loves building intelligent, scalable products for healthcare — AI conversational systems, secure auth, EHR integrations and cloud-native architectures.",
  'Currently building AI MVPs and scalable products at BuildFound. Always exploring new tools and techniques to ship better products.',
];

export const HERO = {
  name: 'Sumanta',
  role: 'Full-Stack Developer',
  location: 'Kolkata, IN',
  building: 'AI MVPs at BuildFound',
};
