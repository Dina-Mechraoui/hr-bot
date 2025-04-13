import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/homePage/HeroSection";
import FeaturesSection from "@/components/homePage/FeaturesSection";
import AboutUsSection from "@/components/homePage/AboutUsSection";
import AchievementsSection from "@/components/homePage/AchievementsSection";

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
