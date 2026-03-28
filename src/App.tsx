import React, { useState, useCallback, Suspense } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion';

import Home from './pages/Home'
import About from './pages/About'
import Experience from './pages/Experience'
import Projects from './pages/Projects'
import Contact from './pages/Contact'

import { Loader } from './shared/Loader'
import { Logo } from './shared/Logo'
import Footer from './components/Footer';

// Lazy-load the Resume page (only loaded when navigated to)
const Resume = React.lazy(() => import('./pages/Resume'));

// --- Sub-Component: The Main Scrollable Page (Memoized) ---
const LandingPage = React.memo(() => {
  return (
    <div className='flex flex-col flex-grow'>
      <section id="home" className="min-h-screen pt-32 px-6 container mx-auto">
        <Home />
      </section>
      <section id="about" className="min-h-screen pt-24 px-6 container mx-auto">
        <About />
      </section>
      <section id="experience" className="min-h-screen pt-24 px-6 container mx-auto">
        <Experience />
      </section>
      <section id="projects" className="min-h-screen pt-24 px-6 container mx-auto">
        <Projects />
      </section>
      <section id="contact" className="min-h-[50vh] pt-24 px-6 container mx-auto mb-20">
        <Contact />
      </section>
    </div>
  )
})

LandingPage.displayName = 'LandingPage'

// --- Mobile menu nav link ---
const MobileNavLink = ({ label, onClick }: { label: string; onClick: () => void }) => (
  <motion.button
    onClick={onClick}
    className="w-full text-left px-6 py-3 text-lg font-medium text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors rounded-lg"
    whileTap={{ scale: 0.98 }}
  >
    {label}
  </motion.button>
)

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { scrollY } = useScroll();
  
  // State
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // --- Scroll & Header Logic ---
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 5);

    if (latest > previous && latest > 15) {
      setHidden(true);
    } else {
      setHidden(false);
    }

    if (location.pathname === '/') {
      const sections = ['home', 'about', 'experience', 'projects', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= -200 && rect.top <= 400) {
            setActiveSection(section);
            break;
          }
        }
      }
    }
  });

  // --- Smooth Scroll Function (memoized) ---
  const scrollToSection = useCallback((id: string) => {
    setMobileMenuOpen(false);
    
    const performScroll = () => {
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    };

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(performScroll, 100);
    } else {
      setTimeout(performScroll, 300);
    }
  }, [location.pathname, navigate]);

  const getLinkClass = (id: string) => {
    const base = "cursor-pointer transition-all duration-300 relative px-1 py-1 ";
    const isActive = activeSection === id && location.pathname === '/';
    
    const active = "text-indigo-600 dark:text-indigo-400 font-bold";
    const inactive = "hover:text-indigo-600 dark:hover:text-indigo-400 text-slate-600 dark:text-slate-300";
    
    return isActive ? `${base} ${active}` : `${base} ${inactive}`;
  };

  const navItems = ['about', 'experience', 'projects', 'contact'] as const;

  return (
    <div className='min-h-screen bg-white dark:bg-[#0B1120]'>
      {/* Accent branding strip at very top */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500" />

      <Loader>
        <motion.header
          variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
          animate={hidden ? "hidden" : "visible"}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className={`fixed top-[2px] left-0 right-0 z-40 p-5 transition-all duration-500 ${
            scrolled 
              ? 'bg-white/80 dark:bg-[#0B1120]/80 backdrop-blur-xl shadow-sm border-b border-slate-200/50 dark:border-slate-700/30' 
              : 'bg-transparent'
          }`}
        >
          <nav className='container mx-auto flex justify-between items-center'>
            <div onClick={() => scrollToSection('home')} className="cursor-pointer">
               <Logo />
            </div>

            {/* Desktop navigation */}
            <div className='hidden md:flex items-center space-x-8 text-sm font-medium'>
              {navItems.map((id) => (
                <button key={id} onClick={() => scrollToSection(id)} className={getLinkClass(id)}>
                  <span className="capitalize">{id}</span>
                  {activeSection === id && location.pathname === '/' && (
                    <motion.span
                      layoutId="active-dot"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Mobile hamburger button */}
            <motion.button
              className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <motion.span
                  className="w-full h-0.5 bg-slate-700 dark:bg-slate-300 rounded-full origin-left"
                  animate={mobileMenuOpen ? { rotate: 45, y: -1 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="w-full h-0.5 bg-slate-700 dark:bg-slate-300 rounded-full"
                  animate={mobileMenuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="w-full h-0.5 bg-slate-700 dark:bg-slate-300 rounded-full origin-left"
                  animate={mobileMenuOpen ? { rotate: -45, y: 1 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.button>
          </nav>

          {/* Mobile menu dropdown */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="md:hidden mt-4 overflow-hidden"
              >
                <div className="glass-card rounded-xl p-2 space-y-1">
                  {navItems.map((id) => (
                    <MobileNavLink
                      key={id}
                      label={id.charAt(0).toUpperCase() + id.slice(1)}
                      onClick={() => scrollToSection(id)}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>

        {/* --- ROUTING --- */}
        <main className='flex-grow'>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/resume" element={
                <Suspense fallback={
                  <div className="min-h-screen flex items-center justify-center">
                    <motion.div
                      className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                    />
                  </div>
                }>
                  <Resume />
                </Suspense>
              } />
            </Routes>
          </AnimatePresence>
        </main>
        
        <Footer />
      </Loader>
    </div>
  )
}
