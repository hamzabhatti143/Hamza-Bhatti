import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Achievements from "@/components/Achievements";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";
import ScrollProgress from "@/components/ScrollProgress";
import HomeFaq from "@/components/HomeFaq";
import { ReliableFrontend, AgenticAI } from "@/components/HomeFeatures";
import JsonLd from "@/components/JsonLd";
import { getPortfolio } from "@/lib/getPortfolio";
import { SITE, SITE_URL } from "@/lib/site";

export default async function Home() {
  const data = await getPortfolio();

  const homeSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: SITE.name,
      jobTitle: "Frontend Developer & Agentic AI Developer",
      url: SITE_URL,
      image: `${SITE_URL}/images/profile-pic.jpeg`,
      address: { "@type": "PostalAddress", addressLocality: "Karachi", addressCountry: "PK" },
      sameAs: [SITE.github, SITE.linkedin],
      knowsAbout: ["Next.js", "FastAPI", "PostgreSQL", "TypeScript", "SEO", "Technical SEO", "On-Page SEO", "AI Agents", "AI Automation"],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Hamza Bhatti",
      url: SITE_URL,
    },
  ];

  return (
    <main className="min-h-screen">
      <JsonLd data={homeSchema} />
      <PageLoader />
      <ScrollProgress />
      <Navbar personalInfo={data.personalInfo} navLinks={data.navLinks} />
      <Hero personalInfo={data.personalInfo} />

      <ReliableFrontend />

      <Skills skillCategories={data.skillCategories} />
      <Experience experiences={data.experiences} />

      <AgenticAI />

      <Projects projects={data.projects} personalInfo={data.personalInfo} />
      <Education education={data.education} />
      <Achievements achievements={data.achievements} stats={data.stats} />
      <HomeFaq />
      <Footer personalInfo={data.personalInfo} />
    </main>
  );
}
