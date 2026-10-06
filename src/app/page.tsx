import AboutSection from "@/components/AboutSection";
import BenefitsSection from "@/components/BenefitsSection";
import FaqSection from "@/components/FaqSection";
import FeaturesSection from "@/components/FeaturesSection";
import Hero from "@/components/Hero";
import HomeHeader from "@/components/HomeHeader";
import HomeScrollNav from "@/components/HomeScrollNav";
import HowItWorksSection from "@/components/HowItWorksSection";
import PageBackdrop from "@/components/PageBackdrop";
import SiteFooter from "@/components/SiteFooter";
import TeamSection from "@/components/TeamSection";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden font-poppins text-ink">
      <PageBackdrop />
      <HomeHeader />
      <HomeScrollNav />
      <Hero />
      <AboutSection />
      <FeaturesSection />
      <BenefitsSection />
      <HowItWorksSection />
      <TeamSection />
      <FaqSection />
      <SiteFooter />
    </main>
  );
}
