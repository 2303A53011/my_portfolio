import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Writeups from './components/Writeups';
import WriteupReader from './components/WriteupReader';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import StatsBar from './components/StatsBar';
import Loader from './components/Loader';
import { personalInfo, skillGroups, projects, certifications, experiences } from './data/content';

function AppContent() {
  const [activeSection, setActiveSection] = useState('home');
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Scroll tracking — only active on home page
  useEffect(() => {
    if (location.pathname !== '/') return;
    
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'certifications', 'writeups', 'contact'];
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
  }, [location.pathname]);

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

  // Scroll to hash on page navigation/load (for redirecting from subpages back to home sections)
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }, 100);
    }
  }, [location]);

  const handleLoaderComplete = useCallback(() => setLoading(false), []);

  if (loading) {
    return <Loader onComplete={handleLoaderComplete} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Cursor glow element */}
      <div id="cursor-glow" />

      <Routes>
        <Route
          path="/"
          element={
            <>
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
              <Writeups />
              <Contact />
              <Footer fullName={personalInfo.fullName} social={personalInfo.social} />
              <BackToTop />
            </>
          }
        />
        <Route path="/writeups/:slug" element={<WriteupReader />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
