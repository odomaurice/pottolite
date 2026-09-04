"use client";

import FaqSection from "@/components/FaqSection";
import FeaturesSection from "@/components/FeaturesSection";
import HardwareSection from "@/components/HardwareSection";
import Hero from "@/components/Hero";
import HomeHeader from "@/components/HomeHeader";
import HomeScrollNav from "@/components/HomeScrollNav";
import IntroVideoSection from "@/components/IntroVideoSection";
import PageBackdrop from "@/components/PageBackdrop";
import PlansSection from "@/components/PlansSection";
import ProblemSection from "@/components/ProblemSection";
import SiteFooter from "@/components/SiteFooter";
import SolutionsSection from "@/components/SolutionsSection";
import SuiteSection from "@/components/SuiteSection";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden font-poppins text-ink">
      <PageBackdrop />
      <HomeHeader />
      <HomeScrollNav />
      <Hero />
      <IntroVideoSection />
      <FeaturesSection />
      <ProblemSection />
      <HardwareSection />
      <SuiteSection />
      <SolutionsSection />
      <PlansSection />
      <TestimonialsSection />
      <FaqSection />
      <SiteFooter />
    </main>
  );
}
