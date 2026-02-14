import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import LiveArena from "@/components/LiveArena";
import Leaderboard from "@/components/Leaderboard";
import StatsCounter from "@/components/StatsCounter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <LiveArena />
        <StatsCounter />
        <Leaderboard />
      </main>
      <Footer />
    </>
  );
}
