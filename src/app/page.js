import Footer from "@/components/bars/Footer";
import Navbar from "@/components/bars/Navbar";
import AboutUsSection from "@/components/homePage/AboutUsSection";
import AchievementsSection from "@/components/homePage/AchievementsSection";
import FeaturesSection from "@/components/homePage/FeaturesSection";
import HeroSection from "@/components/homePage/HeroSection";

export default function Home() {
  return (
    <>
      <Navbar/>
      <div className="sm:px-16 md:px-24">
        <HeroSection />
        <FeaturesSection />
        <AboutUsSection />
        <AchievementsSection />
      </div>
      <Footer/>
    </>
    
  );
}
