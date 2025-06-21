import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Sumanta Kabiraj",
  initials: "SK",
  url: "https://sumantakabiraj.com",
  location: "Kolkata, India",
  locationLink: "https://www.google.com/maps/place/Kolkata",
  description:
    "Full Stack Developer focused on AI-driven real-time healthcare systems, specializing in React, Next.js, Node.js, MongoDB, and GenAI integrations.",
  summary:
    "Experienced Full Stack Developer with a passion for building intelligent, scalable healthcare solutions. Proficient in AI-based conversational systems, secure authentication, EHR integrations, and cloud-native architectures. Skilled in modern web and mobile technologies, including React, Node.js, Go, Python, Azure, and AWS.",
  avatarUrl: "/me.jpeg",
  skills: [
    "React",
    "Next.js",
    "Angular",
    "Typescript",
    "Node.js",
    "Python",
    "Go",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "Docker",
    "AWS",
    "Azure",
    "Tailwind CSS",
    "GraphQL",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    // { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "sumantablog@gmail.com",
    tel: "+917407891855",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/infysumanta",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/sumanta-kabiraj/",
        icon: Icons.linkedin,
        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/infysumanta",
        icon: Icons.x,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:sumantablog@gmail.com",
        icon: Icons.email,
        navbar: false,
      },
    },
  },
  work: [
    {
      company: "Relic Care Inc",
      location: "Remote",
      title: "Sr. Front End Developer",
      start: "June 2024",
      end: "Present",
      logoUrl: "https://reliccare.com/favicon.ico",
      href: "https://reliccare.com",
      badges: ["Remote", "Full Time"],
      description:
        "Led the development of AI-powered conversational tools for healthcare, integrating Medplum and PointClickCare EHRs, building voice/chat systems, Azure B2C authentication, Teams tab apps, and Microsoft Dynamics CRM features.",
    },
    {
      company: "BexCode Services - IT Technology",
      location: "Remote",
      title: "Full Stack Developer | Team Lead",
      start: "Feb 2023",
      end: "Present",
      logoUrl: "https://bexcodeservices.com/favicon.ico",
      href: "https://bexcodeservices.com",
      badges: ["Remote", "Full Time"],
      description:
        "Architected telehealth platforms with real-time features, AI consult generation, EHR integrations (DoseSpot, eFax, eRx), dynamic scheduling, multi-payment gateways, cron-based automation, and AWS Lambda deployments.",
    },
    {
      company: "Tata Consultancy Services",
      location: "Bangalore, India",
      title: "Assistant Systems Engineer",
      start: "Feb 2021",
      end: "Nov 2022",
      logoUrl: "https://www.tcs.com/favicon.ico",
      href: "https://www.tcs.com",
      badges: ["Full Time"],
      description:
        "Developed Node.js backend systems with WebSocket support, managed Linux infrastructure, Azure AD integrations, cron jobs, and VM provisioning for scalable enterprise solutions.",
    },
    {
      company: "Tata Consultancy Services",
      location: "Bangalore, India",
      title: "Assistant Systems Engineer Trainee",
      start: "Feb 2020",
      end: "Feb 2021",
      logoUrl: "https://www.tcs.com/favicon.ico",
      href: "https://www.tcs.com",
      badges: ["Full Time"],
      description:
        "Initial training and backend development support in Node.js, Azure, and Linux-based infrastructure automation.",
    },
    {
      company: "Real Time Consultancy Services (RTCS)",
      location: "Suri, West Bengal",
      title: "Full Stack Developer",
      start: "Jun 2019",
      end: "Feb 2020",
      logoUrl: "https://rtcs.in/favicon.ico",
      href: "https://rtcs.in",
      badges: ["Full Time"],
      description:
        "Built college management, dynamic job portals, and QR-authenticated challan systems using Laravel, Node.js, React, and Redis.",
    },
  ],
  education: [
    {
      school: "Trivenidevi Bhalotia College",
      degree: "Bachelor of Computer Science",
      start: "2016",
      end: "2019",
      logoUrl: "",
      href: "",
    },
    {
      school: "Ondal High School",
      degree: "Higher Secondary (W.B.C.H.S.E - Science)",
      start: "2014",
      end: "2016",
      logoUrl: "",
      href: "",
    },
    {
      school: "Dakshinkhanda High School",
      degree: "Secondary (W.B.B.S.E)",
      start: "2012",
      end: "2014",
      logoUrl: "",
      href: "",
    },
  ],
  projects: [
    {
      title: "Hirelytics - AI Interview Platform",
      href: "https://hirelytics.app/",
      dates: "2024",
      active: true,
      image: "/hirelytics.png",
      video: "/hirelytics.mp4",
      links: [
        {
          icon: (
            <>
              <Icons.github />
            </>
          ),
          type: "GitHub",
          href: "https://github.com/infysumanta/hirelytics",
        },
      ],
      description:
        "End-to-end AI-driven hiring platform with recruiter/candidate workflows, real-time voice interviews, auto evaluation, and attention monitoring.",
      technologies: [
        "React",
        "Node.js",
        "WebRTC",
        "OpenAI",
        "PostgreSQL",
        "Tailwind",
      ],
    },
    {
      title: "Talkthru - Mental Health AI Chatbot",
      href: "",
      dates: "2024",
      active: true,
      image: "/talkthru.png",
      video: "/talkthru.mp4",
      links: [
        {
          icon: (
            <>
              <Icons.github />
            </>
          ),
          type: "GitHub",
          href: "",
        },
      ],
      description:
        "AI mental health chatbot with RAG, GPT-4o, Gemini, emotion detection, semantic memory, CBT support, journaling, and crisis workflows.",
      technologies: ["OpenAI", "Gemini", "VectorDB", "Next.js", "Tailwind"],
    },
    {
      title: "Healthvio - Telehealth Platform",
      href: "",
      dates: "2023",
      active: true,
      image: "/healthvio.png",
      video: "/healthvio.mp4",
      links: [
        {
          icon: (
            <>
              <Icons.github />
            </>
          ),
          type: "GitHub",
          href: "",
        },
      ],
      description:
        "Comprehensive telehealth platform with appointment scheduling, EHR workflows, video calls, dynamic questionnaires, and calendar sync.",
      technologies: [
        "Next.js",
        "Node.js",
        "Agora",
        "Google Calendar",
        "Outlook",
      ],
    },
    {
      title: "Python CLI AI Coder",
      href: "https://github.com/infysumanta/python-cli-ai-coder",
      dates: "2024",
      image: "/python-cli-ai-coder.png",
      video: "/python-cli-ai-coder.mp4",
      links: [
        {
          icon: (
            <>
              <Icons.github />
            </>
          ),
          type: "GitHub",
          href: "",
        },
      ],
      active: true,
      description:
        "CLI tool for AI-assisted code generation, folder structure scaffolding, and iterative full-stack development with GenAI.",
      technologies: ["Python", "CLI", "OpenAI"],
    },
  ],
  hackathons: [],
};
