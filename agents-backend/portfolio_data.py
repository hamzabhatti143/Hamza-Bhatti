import json
import os
from pathlib import Path

STATE_FILE = Path(__file__).parent / "portfolio_state.json"

_default_ts = str(Path(__file__).parent.parent / "data" / "portfolio.ts")
TS_PORTFOLIO_PATH = Path(os.getenv("PORTFOLIO_TS_PATH", _default_ts))

PORTFOLIO_DATA: dict = {
    "name": "Hamza Bhatti",
    "tagline": "Frontend Developer & AI-Assisted Builder",
    "bio": "I craft modern web experiences with clean code and an eye for design. Passionate about building at the intersection of frontend engineering and Agentic-AI development.",
    "email": "mailto:bhatti3993@gmail.com",
    "github": "https://github.com/hamzabhatti143",
    "linkedin": "https://www.linkedin.com/in/hamzabhatti143",
    "whatsapp": "https://wa.me/923243373891",
    "phone": "+92 324 3373891",
    "resumeUrl": "/files/Hamzabhatti-web.pdf",
    "skills": {
        "Frontend": ["HTML5", "CSS3", "Tailwind CSS", "Responsive Design", "WordPress"],
        "Languages": ["TypeScript", "JavaScript", "Python", ".NET Core"],
        "Frameworks & Tools": ["Next.js", "Node.js", "Docker", "Git & GitHub"],
        "AI & Modern Tech": [
            "Agentic AI with OpenAI SDK",
            "Claude CLI",
            "Gemini CLI",
            "Hugging Face",
            "AI-Driven Development",
        ],
        "Concepts": [
            "Strong Typing",
            "OOP",
            "Async Programming",
            "API Integration",
            "Microservices",
            "ADA Accessibility",
        ],
        "Other": ["Problem Solving", "Debugging", "Code Structuring", "Basic UI/UX Understanding"],
    },
    "projects": [
        {
            "title": "Agri Tech AI Platform",
            "description": "AI-powered agricultural platform using four Agentic AI models with fully containerized microservices architecture built with Docker. Automated matching algorithms improved user compatibility accuracy by 40%.",
            "tech": ["Next.js", "Docker", "Hugging Face", "OpenAI Agent SDK", "Microservices", "Python"],
            "category": "AI Platform",
            "liveUrl": "https://farm-smart-ai.vercel.app/",
            "previewUrl": "farm-smart-ai.vercel.app",
            "accentColor": "#34d399",
        },
        {
            "title": "GIAIC Hackathon — Q2",
            "description": "A full-stack Next.js web application built for the GIAIC Q2 hackathon, showcasing modern UI patterns, TypeScript typing, and Tailwind CSS styling.",
            "tech": ["Next.js", "TypeScript", "Tailwind CSS"],
            "category": "Web App",
            "githubUrl": "https://github.com/hamzabhatti143/Hackaton-Q2",
            "liveUrl": "https://hackaton-q2-giaic.vercel.app/",
            "previewUrl": "hackaton-q2-giaic.vercel.app",
            "accentColor": "#6ee7b7",
        },
        {
            "title": "Student Management System",
            "description": "A CLI-based system for managing student records with CRUD operations, search, and data persistence via file I/O.",
            "tech": ["TypeScript", "Node.js"],
            "category": "CLI",
            "githubUrl": "https://github.com/hamzabhatti143/Student-management-system",
            "runCommand": "npx @hamza2004/std_management-system",
            "npxPackage": "@hamza2004/std_management-system",
            "cliCommands": [
                "$ npx @hamza2004/std_management-system",
                "> System initialised. 24 records loaded.",
                "> Enter command: add",
                "> Name: Ali Hassan  ID: S-0025 ✓",
                "> _",
            ],
        },
        {
            "title": "ATM Machine Simulation",
            "description": "A terminal-based ATM simulation handling deposits, withdrawals, balance checks, and PIN authentication with OOP principles.",
            "tech": ["TypeScript", "Node.js"],
            "category": "CLI",
            "githubUrl": "https://github.com/hamzabhatti143/Atm-Project",
            "runCommand": "npx hamzabhatti-atm",
            "npxPackage": "hamzabhatti-atm",
            "cliCommands": [
                "$ npx hamzabhatti-atm",
                "> Welcome to HB Bank ATM",
                "> Insert card (PIN): ****",
                "> Authentication successful ✓",
                "> Balance: PKR 45,000  > _",
            ],
        },
        {
            "title": "Quiz App",
            "description": "An interactive terminal quiz game with multiple-choice questions, score tracking, and instant feedback after each answer.",
            "tech": ["TypeScript", "Node.js"],
            "category": "CLI",
            "githubUrl": "https://github.com/hamzabhatti143/Quiz",
            "runCommand": "npx @hamza2004/quiz",
            "npxPackage": "@hamza2004/quiz",
            "cliCommands": [
                "$ npx @hamza2004/quiz",
                "> Welcome to HB Quiz!",
                "> Q1: What is 2 + 2?  [A] 3  [B] 4",
                "> Your answer: B  ✓ Correct!",
                "> Score: 1/1  > _",
            ],
        },
        {
            "title": "Word Counter",
            "description": "A CLI tool that analyses text input or files to count words, characters, sentences, and average word length with a clean output summary.",
            "tech": ["TypeScript", "Node.js"],
            "category": "CLI",
            "githubUrl": "https://github.com/hamzabhatti143/words-counter",
            "runCommand": "npx @hamza2004/wordcounter",
            "npxPackage": "@hamza2004/wordcounter",
            "cliCommands": [
                "$ npx @hamza2004/wordcounter",
                "> Enter text or file path:",
                "> Words: 142   Chars: 874",
                "> Sentences: 11   Avg word: 5.2",
                "> _",
            ],
        },
        {
            "title": "Currency Converter CLI",
            "description": "A terminal currency converter that fetches live exchange rates and converts between major world currencies instantly.",
            "tech": ["TypeScript", "Node.js"],
            "category": "CLI",
            "githubUrl": "https://github.com/hamzabhatti143/currency-convertor",
            "runCommand": "npx hamza2004-currency-convertor",
            "npxPackage": "hamza2004-currency-convertor",
            "cliCommands": [
                "$ npx hamza2004-currency-convertor",
                "> From: USD   To: PKR",
                "> Amount: 100",
                "> 100 USD = 27,850 PKR ✓",
                "> _",
            ],
        },
        {
            "title": "Todo List CLI",
            "description": "A terminal-based todo manager to add, complete, and delete tasks with persistent storage so your list survives between sessions.",
            "tech": ["TypeScript", "Node.js"],
            "category": "CLI",
            "githubUrl": "https://github.com/hamzabhatti143/todos",
            "runCommand": "npx hamza2004-todos",
            "npxPackage": "hamza2004-todos",
            "cliCommands": [
                "$ npx hamza2004-todos",
                "> [1] Buy groceries  ✓",
                "> [2] Write report   ○",
                "> add: Review PR",
                "> Task added ✓  > _",
            ],
        },
        {
            "title": "Number Guessing Game",
            "description": "A fun CLI number guessing game where the computer picks a random number and guides you with hot/cold hints until you guess correctly.",
            "tech": ["TypeScript", "Node.js"],
            "category": "CLI",
            "githubUrl": "https://github.com/hamzabhatti143/Number-Guessing-Game",
            "runCommand": "npx hamzabhatti-number-game",
            "npxPackage": "hamzabhatti-number-game",
            "cliCommands": [
                "$ npx hamzabhatti-number-game",
                "> Guess a number (1–100):",
                "> 50  →  Too low!",
                "> 75  →  Correct!",
                "> Tries: 2  > _",
            ],
        },
        {
            "title": "Todo App + AI Chatbot",
            "description": "A productivity-focused todo application enhanced with an integrated AI chatbot assistant for smart task suggestions and natural-language task management.",
            "tech": ["Next.js", "TypeScript", "AI Integration", "Tailwind CSS"],
            "category": "AI Platform",
            "githubUrl": "https://github.com/hamzabhatti143/Todo-App-With-Chatbot",
            "liveUrl": "https://todo-app-with-ai-chatbot.vercel.app/",
            "previewUrl": "todo-app-with-ai-chatbot.vercel.app",
            "accentColor": "#a78bfa",
        },
        {
            "title": "Currency Converter",
            "description": "A real-time currency converter built with Next.js, leveraging live exchange rate APIs with async/await patterns, clean UI, and instant conversion feedback.",
            "tech": ["Next.js", "TypeScript", "API Integration", "Tailwind CSS"],
            "category": "Tool",
            "githubUrl": "https://github.com/hamzabhatti143/Currency-Convertor-Nextjs",
            "liveUrl": "https://currency-convertor-pied-iota.vercel.app/",
            "previewUrl": "currency-convertor-pied-iota.vercel.app",
            "accentColor": "#fbbf24",
        },
        {
            "title": "Random Password Generator",
            "description": "A secure password generator with configurable length, character sets (symbols, numbers, uppercase), strength indicator, and one-click clipboard copy.",
            "tech": ["TypeScript", "Next.js", "Tailwind CSS"],
            "category": "Tool",
            "githubUrl": "https://github.com/hamzabhatti143/Random-Password-Generator",
            "liveUrl": "https://random-password-generator-ten-iota.vercel.app/",
            "previewUrl": "random-password-generator-ten-iota.vercel.app",
            "accentColor": "#f43f5e",
        },
        {
            "title": "Bulk Email Sender",
            "description": "A web application for composing and sending bulk emails with recipient list management, template support, and delivery status tracking.",
            "tech": ["Next.js", "TypeScript", "Nodemailer", "Tailwind CSS"],
            "category": "Tool",
            "githubUrl": "https://github.com/hamzabhatti143/Bulk-Email-Sender",
            "liveUrl": "https://bulk-email-sender-sooty-tau.vercel.app/",
            "previewUrl": "bulk-email-sender-sooty-tau.vercel.app",
            "accentColor": "#6366f1",
        },
        {
            "title": "Airfolio",
            "description": "A sleek developer portfolio template with animated hero section, dark/light mode, smooth scroll navigation, and fully responsive layout.",
            "tech": ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
            "category": "Website",
            "githubUrl": "https://github.com/hamzabhatti143/Airfolio",
            "liveUrl": "https://airfolio-demo.netlify.app/",
            "previewUrl": "airfolio-demo.netlify.app",
            "accentColor": "#c8a96e",
        },
        {
            "title": "Morrent — Car Rental",
            "description": "A full-featured car rental web application with vehicle browsing, category filtering, booking flow, and a polished responsive UI.",
            "tech": ["Next.js", "TypeScript", "Tailwind CSS"],
            "category": "Web App",
            "githubUrl": "https://github.com/hamzabhatti143/Morrent",
            "liveUrl": "https://morrent-ten.vercel.app/",
            "previewUrl": "morrent-ten.vercel.app",
            "accentColor": "#3b82f6",
        },
        {
            "title": "Super Moms Homeschooling",
            "description": "A resource-rich WordPress website for homeschooling families, featuring curriculum guides, lesson plans, and community-focused content with a warm, accessible design.",
            "tech": ["WordPress", "PHP", "CSS3", "Responsive Design"],
            "category": "Website",
            "liveUrl": "https://supermomshomeschooling.com/",
            "previewUrl": "supermomshomeschooling.com",
            "accentColor": "#f97316",
        },
        {
            "title": "Garden Decore",
            "description": "A visually rich WordPress website for garden decoration products, with a clean product catalogue, elegant typography, and a fully mobile-responsive layout.",
            "tech": ["WordPress", "PHP", "CSS3", "Responsive Design"],
            "category": "Website",
            "liveUrl": "https://gardendecore.net/",
            "previewUrl": "gardendecore.net",
            "accentColor": "#4ade80",
        },
        {
            "title": "Outreaaching Tool For SEO",
            "description": "A powerful outreach tool designed to enhance SEO strategies. Built using Next.js for dynamic rendering, Python for backend processing, and leveraging the Neon Database for efficient data management. The innovative Agentic AI approach optimizes outreach campaigns, ensuring better targeting and engagement.",
            "tech": ["Next.js", "Python", "Neon Database", "Agentic AI"],
            "category": "AI Platform",
            "githubUrl": "https://github.com/hamzabhatti143/Outreach-Tool",
            "liveUrl": "https://outreach-tool-drab.vercel.app/",
            "previewUrl": "outreach-tool-drab.vercel.app",
        },
    ],
    "experience": [
        {
            "role": "Next.js Developer",
            "company": "N6N",
            "period": "July 2025 – December 2025",
            "current": False,
            "points": [
                "Developed and deployed scalable frontend applications using React and Next.js.",
                "Integrated secure RESTful APIs and built responsive UI components with TypeScript and Tailwind CSS.",
                "Implemented automated testing procedures and quality assurance checks, resulting in a 30% reduction in production bugs.",
            ],
        },
        {
            "role": "Front-end Developer",
            "company": "Technical Crime",
            "period": "February 2024 – August 2024",
            "points": [
                "Created intuitive and responsive web interfaces with seamless HTML and CSS navigation and engaging UI controls.",
                "Resolved functionality issues including dead-link removal and ensured the site stayed continuously up to date.",
                "Built and maintained efficient, reusable C# code prioritising performance and responsiveness for high-quality applications.",
            ],
        },
    ],
    "education": [
        {
            "degree": "Bachelor of Business & Information Technology (BBIT)",
            "institution": "Virtual University of Pakistan",
            "description": "Undergraduate degree combining business administration and information technology — covering software engineering, database systems, project management, and entrepreneurship.",
        },
        {
            "degree": "Front-End Development",
            "institution": "PFTP – Professional Freelancing Training Program",
            "description": "Comprehensive training in modern front-end development covering HTML5, CSS3, JavaScript, TypeScript, and Next.js with hands-on project-based learning.",
        },
        {
            "degree": "AI, Metaverse & Web3.0",
            "institution": "Governor Initiative for AI",
            "description": "Advanced program exploring artificial intelligence concepts, agentic AI systems, Web3 technologies, and the metaverse — preparing for the next generation of the web.",
        },
    ],
    "achievements": [
        {
            "title": "Top 10 – Agentic AI Hackathon",
            "issuer": "Innovista · Ranked among top 10 out of 100+ participants",
            "type": "award",
        },
        {
            "title": "Top 50 – Lablab AI Hackathon",
            "issuer": "Selected among hundreds of global participants",
            "type": "award",
        },
        {"title": "AI, Metaverse & Web3.0", "issuer": "Governor Initiative", "type": "certification"},
        {
            "title": "Front-end Development",
            "issuer": "PFTP – Professional Freelancing Training Program",
            "type": "certification",
        },
    ],
}


# ── TypeScript generation ──────────────────────────────────────────────────────

def _ts(s: str) -> str:
    escaped = s.replace("\\", "\\\\").replace('"', '\\"').replace("\n", "\\n")
    return f'"{escaped}"'


def generate_portfolio_ts() -> str:
    d = PORTFOLIO_DATA
    out = []

    # personalInfo
    out += [
        "export const personalInfo = {",
        f'  name: {_ts(d["name"])},',
        f'  tagline: {_ts(d["tagline"])},',
        f'  bio: {_ts(d.get("bio", ""))},',
        f'  email: {_ts(d.get("email", ""))},',
        f'  github: {_ts(d.get("github", ""))},',
        f'  linkedin: {_ts(d.get("linkedin", ""))},',
        f'  whatsapp: {_ts(d.get("whatsapp", ""))},',
        f'  phone: {_ts(d.get("phone", ""))},',
        f'  resumeUrl: {_ts(d.get("resumeUrl", ""))},',
        "} as const;",
        "",
    ]

    # SkillCategory
    out += [
        "export type SkillCategory = {",
        "  category: string;",
        "  skills: string[];",
        "};",
        "",
        "export const skillCategories: SkillCategory[] = [",
    ]
    for cat, skills in d.get("skills", {}).items():
        s_ts = ", ".join(_ts(s) for s in skills)
        out.append(f'  {{ category: {_ts(cat)}, skills: [{s_ts}] }},')
    out += ["];", ""]

    # Project type
    out += [
        "export type Project = {",
        "  title: string;",
        "  description: string;",
        "  tech: string[];",
        "  category: string;",
        "  githubUrl?: string;",
        "  cliCommands?: string[];",
        "  runCommand?: string;",
        "  npxPackage?: string;",
        "  previewUrl?: string;",
        "  liveUrl?: string;",
        "  accentColor?: string;",
        "};",
        "",
        "export const projects: Project[] = [",
    ]
    for p in d.get("projects", []):
        tech_ts = ", ".join(_ts(t) for t in p.get("tech", []))
        out.append("  {")
        out.append(f'    title: {_ts(p["title"])},')
        out.append(f'    description:')
        out.append(f'      {_ts(p.get("description", ""))},')
        out.append(f'    tech: [{tech_ts}],')
        out.append(f'    category: {_ts(p.get("category", "General"))},')
        if p.get("githubUrl"):
            out.append(f'    githubUrl: {_ts(p["githubUrl"])},')
        if p.get("runCommand"):
            out.append(f'    runCommand: {_ts(p["runCommand"])},')
        if p.get("npxPackage"):
            out.append(f'    npxPackage: {_ts(p["npxPackage"])},')
        if p.get("cliCommands"):
            out.append("    cliCommands: [")
            for cmd in p["cliCommands"]:
                out.append(f'      {_ts(cmd)},')
            out.append("    ],")
        if p.get("previewUrl"):
            out.append(f'    previewUrl: {_ts(p["previewUrl"])},')
        if p.get("liveUrl"):
            out.append(f'    liveUrl: {_ts(p["liveUrl"])},')
        if p.get("accentColor"):
            out.append(f'    accentColor: {_ts(p["accentColor"])},')
        out.append("  },")
    out += ["];", ""]

    # Experience type
    out += [
        "export type Experience = {",
        "  role: string;",
        "  company: string;",
        "  period: string;",
        "  current?: boolean;",
        "  points: string[];",
        "};",
        "",
        "export const experiences: Experience[] = [",
    ]
    for e in d.get("experience", []):
        out.append("  {")
        out.append(f'    role: {_ts(e["role"])},')
        out.append(f'    company: {_ts(e["company"])},')
        out.append(f'    period: {_ts(e["period"])},')
        if "current" in e:
            out.append(f'    current: {str(e["current"]).lower()},')
        out.append("    points: [")
        for pt in e.get("points", []):
            out.append(f'      {_ts(pt)},')
        out.append("    ],")
        out.append("  },")
    out += ["];", ""]

    # Education type
    out += [
        "export type Education = {",
        "  degree: string;",
        "  institution: string;",
        "  description: string;",
        "};",
        "",
        "export const education: Education[] = [",
    ]
    for e in d.get("education", []):
        out.append("  {")
        out.append(f'    degree: {_ts(e["degree"])},')
        out.append(f'    institution: {_ts(e["institution"])},')
        out.append(f'    description:')
        out.append(f'      {_ts(e.get("description", ""))},')
        out.append("  },")
    out += ["];", ""]

    # Achievement type
    out += [
        'export type Achievement = {',
        '  title: string;',
        '  issuer: string;',
        '  type: "award" | "certification";',
        '};',
        '',
        'export const achievements: Achievement[] = [',
    ]
    for a in d.get("achievements", []):
        out.append(
            f'  {{ title: {_ts(a["title"])}, issuer: {_ts(a["issuer"])}, type: {_ts(a["type"])} }},'
        )
    out += ["];", ""]

    # stats — static
    out += [
        "export const stats = [",
        '  { value: "5+",  label: "Freelance Projects",  sub: "automation & optimization" },',
        '  { value: "3+",  label: "Production AI Apps",  sub: "complex LLM integration" },',
        '  { value: "40%", label: "Accuracy Improved",   sub: "matching algorithm" },',
        '  { value: "30%", label: "Bug Reduction",        sub: "via automated QA at N6N" },',
        "];",
        "",
    ]

    # navLinks — static
    out += [
        "export const navLinks = [",
        '  { label: "Skills",        href: "#skills" },',
        '  { label: "Experience",    href: "#experience" },',
        '  { label: "Projects",      href: "#projects" },',
        '  { label: "Education",     href: "#education" },',
        '  { label: "Achievements",  href: "#achievements" },',
        '  { label: "Contact",       href: "#contact" },',
        "] as const;",
        "",
    ]

    return "\n".join(out)


def sync_to_portfolio_ts() -> None:
    try:
        TS_PORTFOLIO_PATH.parent.mkdir(parents=True, exist_ok=True)
        with open(TS_PORTFOLIO_PATH, "w", encoding="utf-8") as f:
            f.write(generate_portfolio_ts())
    except Exception as exc:
        print(f"[sync_to_portfolio_ts] warning: {exc}")


# ── Persistence ────────────────────────────────────────────────────────────────

def save_portfolio() -> None:
    with open(STATE_FILE, "w", encoding="utf-8") as f:
        json.dump(PORTFOLIO_DATA, f, indent=2, ensure_ascii=False)
    sync_to_portfolio_ts()


def load_portfolio() -> None:
    if not STATE_FILE.exists():
        return
    with open(STATE_FILE, encoding="utf-8") as f:
        data = json.load(f)
    # Reject stale state files that still use the old "name" field for projects
    projects = data.get("projects", [])
    if projects and "name" in projects[0] and "title" not in projects[0]:
        print("[load_portfolio] stale portfolio_state.json detected — using built-in data")
        return
    PORTFOLIO_DATA.clear()
    PORTFOLIO_DATA.update(data)


# ── Formatting for agent prompts ───────────────────────────────────────────────

def format_portfolio() -> str:
    d = PORTFOLIO_DATA

    skills_lines = "\n".join(
        f"  {cat}: {', '.join(skills)}"
        for cat, skills in d.get("skills", {}).items()
    )

    projects_lines = "\n".join(
        "  {:2}. {} [{}] — {}".format(
            i + 1,
            p["title"],
            p.get("category", ""),
            ", ".join(p.get("tech", [])),
        )
        + ("\n      " + p["description"] if p.get("description") else "")
        for i, p in enumerate(d.get("projects", []))
    )

    experience_lines = "\n".join(
        f"  {e['role']} at {e['company']} ({e['period']})"
        for e in d.get("experience", [])
    )

    education_lines = "\n".join(
        f"  {e['degree']} — {e['institution']}"
        for e in d.get("education", [])
    )

    achievements_lines = "\n".join(
        f"  [{a['type'].upper()}] {a['title']} — {a['issuer']}"
        for a in d.get("achievements", [])
    )

    return f"""=== Portfolio of {d['name']} ===
Tagline: {d['tagline']}
Email: {d.get('email', '')}
GitHub: {d.get('github', '')}
LinkedIn: {d.get('linkedin', '')}

--- SKILLS ---
{skills_lines}

--- PROJECTS ({len(d.get('projects', []))}) ---
{projects_lines}

--- EXPERIENCE ---
{experience_lines}

--- EDUCATION ---
{education_lines}

--- ACHIEVEMENTS ---
{achievements_lines}
"""
