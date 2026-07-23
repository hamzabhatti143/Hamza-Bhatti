import { getPortfolio } from "@/lib/getPortfolio";
import Navbar from "@/components/Navbar";
import Footer, { type FooterCta } from "@/components/Footer";

// Shared chrome for every non-home route: fixed nav + footer around the page
// content. Server component so it can fetch personalInfo once per request.
// `footerCta` lets a route customise the CTA band so it isn't identical everywhere.
export default async function PageFrame({
  children,
  footerCta,
}: {
  children: React.ReactNode;
  footerCta?: FooterCta;
}) {
  const { personalInfo } = await getPortfolio();
  return (
    <>
      <Navbar personalInfo={personalInfo} />
      <main className="min-h-screen">{children}</main>
      <Footer personalInfo={personalInfo} cta={footerCta} />
    </>
  );
}
