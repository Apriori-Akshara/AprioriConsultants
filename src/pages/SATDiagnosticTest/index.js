import HeroSection from '../../../components/SATTest/HeroSection';
import Features from '../../../components/SATTest/Features';
import TestCards from '../../../components/SATTest/TestCards';
import Navbar from '../../../components/NavbarJS';

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <HeroSection />
      <Features />
      <TestCards />
    </main>
  );
}