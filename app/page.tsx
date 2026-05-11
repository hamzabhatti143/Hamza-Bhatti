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
import { getPortfolio } from "@/lib/getPortfolio";

export default async function Home() {
  const data = await getPortfolio();

  return (
    <main className="min-h-screen">
      <PageLoader />
      <ScrollProgress />
      <Navbar personalInfo={data.personalInfo} navLinks={data.navLinks} />
      <Hero personalInfo={data.personalInfo} />
      <Skills skillCategories={data.skillCategories} />
      <Experience experiences={data.experiences} />
      <Projects projects={data.projects} personalInfo={data.personalInfo} />
      <Education education={data.education} />
      <Achievements achievements={data.achievements} stats={data.stats} />
      <Footer personalInfo={data.personalInfo} />
    </main>
  );
}
