import {
  personalInfo,
  skillCategories,
  projects,
  experiences,
  education,
  achievements,
  stats,
  navLinks,
  type SkillCategory,
  type Project,
  type Experience,
  type Education,
  type Achievement,
} from "@/data/portfolio";

export type { SkillCategory, Project, Experience, Education, Achievement };

export type PersonalInfo = {
  name: string;
  tagline: string;
  bio: string;
  email: string;
  github: string;
  linkedin: string;
  whatsapp: string;
  phone: string;
  resumeUrl: string;
};

export type PortfolioData = {
  personalInfo: PersonalInfo;
  skillCategories: SkillCategory[];
  projects: Project[];
  experiences: Experience[];
  education: Education[];
  achievements: Achievement[];
  stats: { value: string; label: string; sub: string }[];
  navLinks: readonly { label: string; href: string }[];
};

const localFallback: PortfolioData = {
  personalInfo: { ...personalInfo },
  skillCategories,
  projects,
  experiences,
  education,
  achievements,
  stats,
  navLinks,
};

export async function getPortfolio(): Promise<PortfolioData> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) return localFallback;

  try {
    const res = await fetch(`${backendUrl}/portfolio`, { cache: "no-store" });
    if (!res.ok) return localFallback;
    const remote = await res.json();
    return {
      ...localFallback,
      personalInfo: {
        ...localFallback.personalInfo,
        tagline: remote.tagline ?? localFallback.personalInfo.tagline,
      },
      projects: remote.projects ?? localFallback.projects,
      skillCategories: remote.skillCategories ?? localFallback.skillCategories,
      education: remote.education ?? localFallback.education,
    };
  } catch {
    return localFallback;
  }
}
