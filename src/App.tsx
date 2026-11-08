import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReduced } from './lib/gsap';
import { setLenis } from './lib/lenis';
import { sfx } from './lib/sound';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Writeups from './components/Writeups';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import ShaderBg from './components/ShaderBg';
import Terminal from './components/Terminal';
import { personalInfo, skillGroups, projects, certifications, experiences } from './data/content';

function AppContent() {
  const ready = true;
  const [term, setTerm] = useState(false);
  const [fonts, setFonts] = useState(false);

  // Smooth scroll wired to GSAP ticker
  useEffect(() => {
    if (prefersReduced()) return;
    const lenis = new Lenis({ lerp: 0.1 });
    setLenis(lenis);
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  // Wait for webfonts so text splitting measures the final glyphs
  useEffect(() => {
    const done = () => setFonts(true);
    const t = setTimeout(done, 1500);
    document.fonts?.ready.then(done);
    return () => clearTimeout(t);
  }, []);

  // UI sounds (no-ops unless the user turned sound on)
  useEffect(() => {
    let last = 0;
    const over = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest?.('a,button');
      if (t && t !== (over as unknown as { prev?: Element }).prev && performance.now() - last > 60) {
        (over as unknown as { prev?: Element }).prev = t;
        last = performance.now();
        sfx.hover();
      }
    };
    const click = (e: MouseEvent) => (e.target as HTMLElement).closest?.('a,button') && sfx.click();
    window.addEventListener('mouseover', over);
    window.addEventListener('click', click);
    return () => {
      window.removeEventListener('mouseover', over);
      window.removeEventListener('click', click);
    };
  }, []);

  // Terminal hotkey
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setTerm((t) => !t);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (prefersReduced()) return;
    const tween = gsap.to('.scroll-progress', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.2 } });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  // Refresh triggers once everything is loaded; jump to hash
  useEffect(() => {
    if (!ready) return;
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    const t = setTimeout(refresh, 600);
    return () => {
      window.removeEventListener('load', refresh);
      clearTimeout(t);
    };
  }, [ready]);

  return (
    <div className="grain relative min-h-screen overflow-x-clip bg-ink text-bone">
      <ShaderBg />
      <Cursor />
      <div className="scroll-progress fixed inset-x-0 top-0 z-[950] h-[2px] origin-left bg-signal" style={{ transform: 'scaleX(0)' }} />
      <Nav onTerminal={() => setTerm(true)} />
      <Terminal open={term} onClose={() => setTerm(false)} />

      <main id="main" className="relative">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero fullName={personalInfo.fullName} tagline={personalInfo.tagline} ready={fonts} />
                <Marquee />
                <About social={personalInfo.social} />
                <Skills skillGroups={skillGroups} />
                <Experience experiences={experiences} />
                <Projects projects={projects} githubUrl={personalInfo.githubUrl} />
                <Certifications certifications={certifications} />
                <Writeups medium={personalInfo.social.medium} />
                <Contact />
                <Footer fullName={personalInfo.fullName} social={personalInfo.social} />
              </>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
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
