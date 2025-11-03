import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { personalInfo, skillGroups, projects, certifications} from './data/content';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'certifications', 'contact'];
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

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.documentElement.style.setProperty('--animation-duration', '0s');
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar activeSection={activeSection} />
      <Hero fullName={personalInfo.fullName} tagline={personalInfo.tagline} />
      <About
        role={personalInfo.role}
        location={personalInfo.location}
        availability={personalInfo.availability}
        aboutText={personalInfo.aboutText}
        social={personalInfo.social}
      />
      <Skills skillGroups={skillGroups} />
      <Projects projects={projects} githubUrl={personalInfo.githubUrl} />
      <Certifications certifications={certifications} />
      <Contact />
      <Footer fullName={personalInfo.fullName} social={personalInfo.social} />
    </div>
  );
}

export default App;
