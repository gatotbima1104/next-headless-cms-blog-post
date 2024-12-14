import Footer from "@/components/atom/Footer";
import FeaturedPost from "@/components/FeaturedPost";
import HeroSection from "@/components/HeroSection";
import PopularPost from "@/components/PopularPost";

export default function Home() {
  return (
    <div>
      <HeroSection/>
      <FeaturedPost/>
      <PopularPost/>
      <Footer/>
    </div>
  );
}
