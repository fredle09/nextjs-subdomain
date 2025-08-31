import { Suspense } from "react";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroSection from "@/features/landing/hero-section";
import AboutSection from "@/features/landing/about-section";
import BridgeBlogSection from "@/bridges/landing/blog/section";

export const dynamic = "force-static";

export const revalidate = 60;

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <Suspense>
          <BridgeBlogSection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
