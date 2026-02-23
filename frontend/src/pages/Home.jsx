import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Header, 
  HeroSection, 
  Divider, 
  PhilosophySection, 
  ValuePropositionSection 
} from '../components/home';
import VerticalCarousel from '../components/VerticalCarousel';

const Home = () => {
  const navigate = useNavigate();

  const handleAuthClick = () => {
    navigate('/profile');
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ backgroundColor: '#f8e5d7' }}
    >
      {/* Noise Texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: "url('/noise.webp')",
          backgroundRepeat: 'repeat'
        }}
      />

      {/* Subtle Gradient Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-neutral-900/5" />

      {/* Header */}
      <Header onAuthClick={handleAuthClick} />

      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection />
        <Divider />
        <PhilosophySection />
        <ValuePropositionSection />
        <VerticalCarousel />
        
        {/* Bottom Spacing */}
        <div className="h-32" />
      </main>
    </div>
  );
};

export default Home;