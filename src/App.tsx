import { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import StatsBar from './components/StatsBar';
import Loader from './components/Loader';
import { personalInfo, skillGroups, projects, certifications, experiences } from './data/content';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [loading, setLoading] = useState(true);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'certifications', 'contact'];
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reduced motion preference
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.documentElement.style.setProperty('--animation-duration', '0s');
      setLoading(false); // Skip loader for reduced motion users
    }
  }, []);

  // Cursor glow effect (#25)
  useEffect(() => {
    const glow = document.getElementById('cursor-glow');
    if (!glow) return;

    const move = (e: MouseEvent) => {
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
    };

    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [loading]);

  const handleLoaderComplete = useCallback(() => setLoading(false), []);

  if (loading) {
    return <Loader onComplete={handleLoaderComplete} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Cursor glow element */}
      <div id="cursor-glow" />

      <Navbar activeSection={activeSection} />
      <Hero fullName={personalInfo.fullName} tagline={personalInfo.tagline} />
      <StatsBar />
      <About
        location={personalInfo.location}
        availability={personalInfo.availability}
        aboutText={personalInfo.aboutText}
        social={personalInfo.social}
      />
      <Skills skillGroups={skillGroups} />
      <Experience experiences={experiences} />
      <Projects projects={projects} githubUrl={personalInfo.githubUrl} />
      <Certifications certifications={certifications} />
      <Contact />
      <Footer fullName={personalInfo.fullName} social={personalInfo.social} />
      <BackToTop />
    </div>
  );
}

export default App;
