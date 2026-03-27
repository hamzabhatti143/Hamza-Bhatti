export const personalInfo = {
  name: "Hamza Bhatti",
  tagline: "Frontend Developer & Agentic-AI Builder",
  bio: "I craft modern web experiences with clean code and an eye for design. Passionate about building at the intersection of frontend engineering and Agentic-AI development.",
  email: "mailto:bhatti3993@gmail.com",
  github: "https://github.com/hamzabhatti143",
  linkedin: "https://www.linkedin.com/in/hamzabhatti143",
  resumeUrl: "/files/Hamzabhatti-web.pdf",
} as const;

export type SkillCategory = {
  category: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  { category: "Frontend",           skills: ["HTML5", "CSS3", "Tailwind CSS", "Responsive Design", "WordPress"] },
  { category: "Languages",          skills: ["TypeScript", "JavaScript", "Python", ".NET Core"] },
  { category: "Frameworks & Tools", skills: ["Next.js", "Node.js", "Docker", "Git & GitHub"] },
  {
    category: "AI & Modern Tech",
    skills: ["Agentic AI with OpenAI SDK", "Claude CLI", "Gemini CLI", "Hugging Face", "AI-Driven Development"],
  },
  {
    category: "Concepts",
    skills: ["Strong Typing", "OOP", "Async Programming", "API Integration", "Microservices", "ADA Accessibility"],
  },
  {
    category: "Other",
    skills: ["Problem Solving", "Debugging", "Code Structuring", "Basic UI/UX Understanding"],
  },
];

export type Project = {
  title: string;
  description: string;
  tech: string[];
  category: string;
  /** GitHub repository URL — update with your actual repos */
  githubUrl?: string;
  /** For CLI projects: shell lines shown in terminal preview */
  cliCommands?: string[];
  /** For CLI projects: `npx ts-node <file>.ts` run command */
  runCommand?: string;
  /** If published to npm: `npx <package>` shortcut */
  npxPackage?: string;
  /** For web projects: URL shown in browser chrome mockup */
  previewUrl?: string;
  /** Live production URL — shown as "Live Demo" button */
  liveUrl?: string;
  /** Accent colour for web card preview gradient */
  accentColor?: string;
};

export const projects: Project[] = [
  {
    title: "Agri Tech AI Platform",
    description:
      "AI-powered agricultural platform using four Agentic AI models with fully containerized microservices architecture built with Docker. Automated matching algorithms improved user compatibility accuracy by 40%.",
    tech: ["Next.js", "Docker", "Hugging Face", "OpenAI Agent SDK", "Microservices", "Python"],
    category: "AI Platform",
    liveUrl: "https://farm-smart-ai.vercel.app/",
    previewUrl: "farm-smart-ai.vercel.app",
    accentColor: "#34d399",
  },
  {
    title: "GIAIC Hackathon — Q2",
    description:
      "A full-stack Next.js web application built for the GIAIC Q2 hackathon, showcasing modern UI patterns, TypeScript typing, and Tailwind CSS styling.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    category: "Web App",
    githubUrl: "https://github.com/hamzabhatti143/Hackaton-Q2",
    liveUrl: "https://hackaton-q2-giaic.vercel.app/",
    previewUrl: "hackaton-q2-giaic.vercel.app",
    accentColor: "#6ee7b7",
  },
  {
    title: "Student Management System",
    description:
      "A CLI-based system for managing student records with CRUD operations, search, and data persistence via file I/O.",
    tech: ["TypeScript", "Node.js"],
    category: "CLI",
    githubUrl: "https://github.com/hamzabhatti143/Student-management-system",
    runCommand: "npx @hamza2004/std_management-system",
    npxPackage: "@hamza2004/std_management-system",
    cliCommands: [
      "$ npx @hamza2004/std_management-system",
      "> System initialised. 24 records loaded.",
      "> Enter command: add",
      "> Name: Ali Hassan  ID: S-0025 ✓",
      "> _",
    ],
  },
  {
    title: "ATM Machine Simulation",
    description:
      "A terminal-based ATM simulation handling deposits, withdrawals, balance checks, and PIN authentication with OOP principles.",
    tech: ["TypeScript", "Node.js"],
    category: "CLI",
    githubUrl: "https://github.com/hamzabhatti143/Atm-Project",
    runCommand: "npx hamzabhatti-atm",
    npxPackage: "hamzabhatti-atm",
    cliCommands: [
      "$ npx hamzabhatti-atm",
      "> Welcome to HB Bank ATM",
      "> Insert card (PIN): ****",
      "> Authentication successful ✓",
      "> Balance: PKR 45,000  > _",
    ],
  },
  {
    title: "Quiz App",
    description:
      "An interactive terminal quiz game with multiple-choice questions, score tracking, and instant feedback after each answer.",
    tech: ["TypeScript", "Node.js"],
    category: "CLI",
    githubUrl: "https://github.com/hamzabhatti143/Quiz",
    runCommand: "npx @hamza2004/quiz",
    npxPackage: "@hamza2004/quiz",
    cliCommands: [
      "$ npx @hamza2004/quiz",
      "> Welcome to HB Quiz!",
      "> Q1: What is 2 + 2?  [A] 3  [B] 4",
      "> Your answer: B  ✓ Correct!",
      "> Score: 1/1  > _",
    ],
  },
  {
    title: "Word Counter",
    description:
      "A CLI tool that analyses text input or files to count words, characters, sentences, and average word length with a clean output summary.",
    tech: ["TypeScript", "Node.js"],
    category: "CLI",
    githubUrl: "https://github.com/hamzabhatti143/words-counter",
    runCommand: "npx @hamza2004/wordcounter",
    npxPackage: "@hamza2004/wordcounter",
    cliCommands: [
      "$ npx @hamza2004/wordcounter",
      "> Enter text or file path:",
      "> Words: 142   Chars: 874",
      "> Sentences: 11   Avg word: 5.2",
      "> _",
    ],
  },
  {
    title: "Currency Converter CLI",
    description:
      "A terminal currency converter that fetches live exchange rates and converts between major world currencies instantly.",
    tech: ["TypeScript", "Node.js"],
    category: "CLI",
    githubUrl: "https://github.com/hamzabhatti143/currency-convertor",
    runCommand: "npx hamza2004-currency-convertor",
    npxPackage: "hamza2004-currency-convertor",
    cliCommands: [
      "$ npx hamza2004-currency-convertor",
      "> From: USD   To: PKR",
      "> Amount: 100",
      "> 100 USD = 27,850 PKR ✓",
      "> _",
    ],
  },
  {
    title: "Todo List CLI",
    description:
      "A terminal-based todo manager to add, complete, and delete tasks with persistent storage so your list survives between sessions.",
    tech: ["TypeScript", "Node.js"],
    category: "CLI",
    githubUrl: "https://github.com/hamzabhatti143/todos",
    runCommand: "npx hamza2004-todos",
    npxPackage: "hamza2004-todos",
    cliCommands: [
      "$ npx hamza2004-todos",
      "> [1] Buy groceries  ✓",
      "> [2] Write report   ○",
      "> add: Review PR",
      "> Task added ✓  > _",
    ],
  },
  {
    title: "Number Guessing Game",
    description:
      "A fun CLI number guessing game where the computer picks a random number and guides you with hot/cold hints until you guess correctly.",
    tech: ["TypeScript", "Node.js"],
    category: "CLI",
    githubUrl: "https://github.com/hamzabhatti143/Number-Guessing-Game",
    runCommand: "npx hamzabhatti-number-game",
    npxPackage: "hamzabhatti-number-game",
    cliCommands: [
      "$ npx hamzabhatti-number-game",
      "> Guess a number (1–100):",
      "> 50  →  Too low! 🔥",
      "> 75  →  Correct! 🎉",
      "> Tries: 2  > _",
    ],
  },
  {
    title: "Todo App + AI Chatbot",
    description:
      "A productivity-focused todo application enhanced with an integrated AI chatbot assistant for smart task suggestions and natural-language task management.",
    tech: ["Next.js", "TypeScript", "AI Integration", "Tailwind CSS"],
    category: "AI Platform",
    githubUrl: "https://github.com/hamzabhatti143/Todo-App-With-Chatbot",
    liveUrl: "https://todo-app-with-ai-chatbot.vercel.app/",
    previewUrl: "todo-app-with-ai-chatbot.vercel.app",
    accentColor: "#a78bfa",
  },
  {
    title: "Currency Converter",
    description:
      "A real-time currency converter built with Next.js, leveraging live exchange rate APIs with async/await patterns, clean UI, and instant conversion feedback.",
    tech: ["Next.js", "TypeScript", "API Integration", "Tailwind CSS"],
    category: "Tool",
    githubUrl: "https://github.com/hamzabhatti143/Currency-Convertor-Nextjs",
    liveUrl: "https://currency-convertor-pied-iota.vercel.app/",
    previewUrl: "currency-convertor-pied-iota.vercel.app",
    accentColor: "#fbbf24",
  },
  {
    title: "Random Password Generator",
    description:
      "A secure password generator with configurable length, character sets (symbols, numbers, uppercase), strength indicator, and one-click clipboard copy.",
    tech: ["TypeScript", "Next.js", "Tailwind CSS"],
    category: "Tool",
    githubUrl: "https://github.com/hamzabhatti143/Random-Password-Generator",
    liveUrl: "https://random-password-generator-ten-iota.vercel.app/",
    previewUrl: "random-password-generator-ten-iota.vercel.app",
    accentColor: "#f43f5e",
  },
  {
    title: "Bulk Email Sender",
    description:
      "A web application for composing and sending bulk emails with recipient list management, template support, and delivery status tracking.",
    tech: ["Next.js", "TypeScript", "Nodemailer", "Tailwind CSS"],
    category: "Tool",
    githubUrl: "https://github.com/hamzabhatti143/Bulk-Email-Sender",
    liveUrl: "https://bulk-email-sender-sooty-tau.vercel.app/",
    previewUrl: "bulk-email-sender-sooty-tau.vercel.app",
    accentColor: "#6366f1",
  },
  {
    title: "Airfolio",
    description:
      "A sleek developer portfolio template with animated hero section, dark/light mode, smooth scroll navigation, and fully responsive layout.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    category: "Website",
    githubUrl: "https://github.com/hamzabhatti143/Airfolio",
    liveUrl: "https://airfolio-demo.netlify.app/",
    previewUrl: "airfolio-demo.netlify.app",
    accentColor: "#c8a96e",
  },
  {
    title: "Morrent — Car Rental",
    description:
      "A full-featured car rental web application with vehicle browsing, category filtering, booking flow, and a polished responsive UI.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    category: "Web App",
    githubUrl: "https://github.com/hamzabhatti143/Morrent",
    liveUrl: "https://morrent-ten.vercel.app/",
    previewUrl: "morrent-ten.vercel.app",
    accentColor: "#3b82f6",
  },
  {
    title: "Super Moms Homeschooling",
    description:
      "A resource-rich WordPress website for homeschooling families, featuring curriculum guides, lesson plans, and community-focused content with a warm, accessible design.",
    tech: ["WordPress", "PHP", "CSS3", "Responsive Design"],
    category: "Website",
    liveUrl: "https://supermomshomeschooling.com/",
    previewUrl: "supermomshomeschooling.com",
    accentColor: "#f97316",
  },
  {
    title: "Garden Decore",
    description:
      "A visually rich WordPress website for garden decoration products, with a clean product catalogue, elegant typography, and a fully mobile-responsive layout.",
    tech: ["WordPress", "PHP", "CSS3", "Responsive Design"],
    category: "Website",
    liveUrl: "https://gardendecore.net/",
    previewUrl: "gardendecore.net",
    accentColor: "#4ade80",
  },
];

export type Experience = {
  role: string;
  company: string;
  period: string;
  current?: boolean;
  points: string[];
};

export const experiences: Experience[] = [
  {
    role: "Next.js Developer",
    company: "N6N",
    period: "July 2025 – December 2025",
    current: false,
    points: [
      "Developed and deployed scalable frontend applications using React and Next.js.",
      "Integrated secure RESTful APIs and built responsive UI components with TypeScript and Tailwind CSS.",
      "Implemented automated testing procedures and quality assurance checks, resulting in a 30% reduction in production bugs.",
    ],
  },
  {
    role: "Front-end Developer",
    company: "Technical Crime",
    period: "February 2024 – August 2024",
    points: [
      "Created intuitive and responsive web interfaces with seamless HTML and CSS navigation and engaging UI controls.",
      "Resolved functionality issues including dead-link removal and ensured the site stayed continuously up to date.",
      "Built and maintained efficient, reusable C# code prioritising performance and responsiveness for high-quality applications.",
    ],
  },
];

export type Education = {
  degree: string;
  institution: string;
  description: string;
};

export const education: Education[] = [
  {
    degree: "Bachelor of Business & Information Technology (BBIT)",
    institution: "Virtual University of Pakistan",
    description:
      "Undergraduate degree combining business administration and information technology — covering software engineering, database systems, project management, and entrepreneurship.",
  },
  {
    degree: "Front-End Development",
    institution: "PFTP – Professional Freelancing Training Program",
    description:
      "Comprehensive training in modern front-end development covering HTML5, CSS3, JavaScript, TypeScript, and Next.js with hands-on project-based learning.",
  },
  {
    degree: "AI, Metaverse & Web3.0",
    institution: "Governor Initiative for AI",
    description:
      "Advanced program exploring artificial intelligence concepts, agentic AI systems, Web3 technologies, and the metaverse — preparing for the next generation of the web.",
  },
];

export type Achievement = {
  title: string;
  issuer: string;
  type: "award" | "certification";
};

export const achievements: Achievement[] = [
  { title: "Top 10 – Agentic AI Hackathon", issuer: "Innovista · Ranked among top 10 out of 100+ participants", type: "award" },
  { title: "Top 50 – Lablab AI Hackathon", issuer: "Selected among hundreds of global participants", type: "award" },
  { title: "AI, Metaverse & Web3.0", issuer: "Governor Initiative", type: "certification" },
  { title: "Front-end Development", issuer: "PFTP – Professional Freelancing Training Program", type: "certification" },
];

export const stats = [
  { value: "5+",  label: "Freelance Projects",  sub: "automation & optimization" },
  { value: "3+",  label: "Production AI Apps",  sub: "complex LLM integration" },
  { value: "40%", label: "Accuracy Improved",   sub: "matching algorithm" },
  { value: "30%", label: "Bug Reduction",        sub: "via automated QA at N6N" },
];

export const navLinks = [
  { label: "Skills",        href: "#skills" },
  { label: "Experience",    href: "#experience" },
  { label: "Projects",      href: "#projects" },
  { label: "Education",     href: "#education" },
  { label: "Achievements",  href: "#achievements" },
  { label: "Contact",       href: "#contact" },
] as const;
