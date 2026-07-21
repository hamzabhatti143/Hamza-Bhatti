import { getPortfolio } from "@/lib/getPortfolio";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Shared chrome for every non-home route: fixed nav + footer around the page
// content. Server component so it can fetch personalInfo once per request.
export default async function PageFrame({ children }: { children: React.ReactNode }) {
  const { personalInfo } = await getPortfolio();
  return (
    <>
      <Navbar personalInfo={personalInfo} />
      <main className="min-h-screen">{children}</main>
      <Footer personalInfo={personalInfo} />
    </>
  );
}
