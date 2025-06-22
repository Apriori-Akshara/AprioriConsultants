import HeroSection from '../../../components/SATTest/HeroSection';
import Features from '../../../components/SATTest/Features';
import TestCards from '../../../components/SATTest/TestCards';
import Navbar from '../../../components/NavbarJS';
import { useSelector } from 'react-redux';

export default function HomePage() {
  const { user } = useSelector((state) => state.auth);
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <HeroSection />
      <Features />
      <TestCards user={user}/>
    </main>
  );
}