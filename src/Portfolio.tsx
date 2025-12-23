import React, { useState, useEffect, useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
  useSpring,
  useMotionValue
} from 'framer-motion';
import { 
  Mail, Phone, Linkedin, Download, ExternalLink, Code, Smartphone, Database, Moon, Sun, Award, TrendingUp, Users, Clock, ArrowDown, Menu, X, Sparkles 
} from 'lucide-react';

const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [stars, setStars] = useState([]);
  const [shootingStars, setShootingStars] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);

    // Generate stars
    const generateStars = () => {
      const newStars = [];
      const count = darkMode ? 200 : 100;
      for (let i = 0; i < count; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2.5 + 0.5,
          duration: Math.random() * 4 + 2,
          delay: Math.random() * 3
        });
      }
      setStars(newStars);
    };

    generateStars();

    // Shooting stars
    const createShootingStar = () => {
      const id = Date.now();
      setShootingStars(prev => [...prev, { id, x: Math.random() * 100, y: Math.random() * 30 }]);
      setTimeout(() => {
        setShootingStars(prev => prev.filter(s => s.id !== id));
      }, 2000);
    };

    const shootingInterval = setInterval(() => {
      if (darkMode && Math.random() > 0.7) createShootingStar();
    }, 4000);

    // Mouse tracking
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      mediaQuery.removeEventListener('change', handler);
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(shootingInterval);
    };
  }, [darkMode, mouseX, mouseY]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      element.setAttribute('tabindex', '-1');
      element.focus();
    }
    setMobileMenuOpen(false);
  };

  const motionProps = (props) => prefersReducedMotion ? {} : props;

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-black text-gray-900 dark:text-gray-100 min-h-screen w-full overflow-x-hidden relative">
        
        {/* Custom Cursor */}
        {!prefersReducedMotion && (
          <>
            <motion.div
              className="fixed pointer-events-none z-50 mix-blend-difference hidden md:block"
              animate={{ x: mousePos.x - 6, y: mousePos.y - 6 }}
              transition={{ type: "spring", stiffness: 500, damping: 28 }}
            >
              <motion.div 
                className={`w-3 h-3 rounded-full ${darkMode ? 'bg-cyan-400' : 'bg-amber-400'}`}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            <motion.div
              className="fixed pointer-events-none z-50 mix-blend-difference hidden md:block"
              animate={{ x: mousePos.x - 16, y: mousePos.y - 16 }}
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
            >
              <div className={`w-8 h-8 rounded-full border-2 ${darkMode ? 'border-purple-400' : 'border-orange-400'}`} />
            </motion.div>
          </>
        )}

        {/* Animated Space Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          {/* Stars */}
          {stars.map((star) => (
            <motion.div
              key={star.id}
              className={`absolute rounded-full ${darkMode ? 'bg-white' : 'bg-yellow-200'}`}
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                boxShadow: darkMode ? '0 0 4px rgba(255,255,255,0.8)' : '0 0 3px rgba(255,200,0,0.6)'
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: star.duration,
                repeat: Infinity,
                delay: star.delay,
              }}
            />
          ))}

          {/* Shooting Stars */}
          {darkMode && shootingStars.map((star) => (
            <motion.div
              key={star.id}
              className="absolute w-1 h-24 bg-gradient-to-b from-white via-cyan-300 to-transparent"
              style={{ left: `${star.x}%`, top: `${star.y}%`, transformOrigin: 'top left' }}
              initial={{ x: 0, y: 0, opacity: 0, rotate: 45 }}
              animate={{ x: 300, y: 300, opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, ease: "easeIn" }}
            />
          ))}

          {/* Floating Cosmic Objects - Dark Mode */}
          {darkMode ? (
            <>
              <motion.div
                className="absolute top-20 right-20 w-40 h-40 rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 opacity-20 blur-3xl"
                animate={{
                  y: [0, -40, 0],
                  x: [0, 30, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute bottom-40 left-20 w-56 h-56 rounded-full bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 opacity-15 blur-3xl"
                animate={{
                  y: [0, 50, 0],
                  x: [0, -40, 0],
                  scale: [1, 1.3, 1],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute top-1/2 left-1/3 w-32 h-32 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 opacity-20 blur-2xl"
                animate={{
                  y: [0, -30, 0],
                  x: [0, 20, 0],
                  rotate: [0, 360],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute bottom-20 right-1/4 w-48 h-48 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 opacity-15 blur-3xl"
                animate={{
                  scale: [1, 1.4, 1],
                  rotate: [0, -180, -360],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />
            </>
          ) : (
            <>
              {/* Light Mode - Sun and Morning Glow */}
              <motion.div
                className="absolute top-32 right-40 w-64 h-64 rounded-full bg-gradient-to-br from-yellow-300 via-orange-400 to-red-400 opacity-30 blur-3xl"
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.3, 0.4, 0.3],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute top-10 left-1/4 w-28 h-28 rounded-full bg-gradient-to-br from-orange-300 to-rose-400 opacity-25 blur-2xl"
                animate={{
                  y: [0, -20, 0],
                  x: [0, 15, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute bottom-40 right-1/3 w-40 h-40 rounded-full bg-gradient-to-br from-pink-300 via-rose-400 to-red-400 opacity-20 blur-3xl"
                animate={{
                  y: [0, 30, 0],
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute top-1/2 right-20 w-32 h-32 rounded-full bg-gradient-to-br from-amber-300 to-yellow-400 opacity-25 blur-2xl"
                animate={{
                  x: [0, -25, 0],
                  y: [0, 20, 0],
                }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              />
            </>
          )}
        </div>

        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-indigo-600 focus:text-white focus:px-6 focus:py-3 focus:rounded-lg focus:shadow-2xl"
        >
          Skip to main content
        </a>

        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 z-50 origin-left"
          style={{ scaleX: smoothProgress }}
          aria-hidden="true"
        />

        <Navigation
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          scrollToSection={scrollToSection}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        <main id="main-content" className='w-full relative z-10'>
          <HeroSection scrollToSection={scrollToSection} motionProps={motionProps} darkMode={darkMode} />
          <AboutSection motionProps={motionProps} />
          <SkillsSection motionProps={motionProps} />
          <ExperienceSection motionProps={motionProps} />
          <ProjectsSection motionProps={motionProps} />
          <AchievementsSection motionProps={motionProps} />
          <ContactSection motionProps={motionProps} />
        </main>

        <footer className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md py-10 text-center text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800 relative z-10">
          <p>© 2025 Mahesh Babu Kethineni. Built with React, Framer Motion & Tailwind CSS.</p>
        </footer>
      </div>
    </div>
  );
};

const Navigation = ({ darkMode, setDarkMode, scrollToSection, mobileMenuOpen, setMobileMenuOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Experience', id: 'experience' },
    { name: 'Projects', id: 'projects' },
    { name: 'Contact', id: 'contact' }
  ];

  return (
    <header>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        aria-label="Primary navigation"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <motion.a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}
            className="text-3xl font-black bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent focus:outline-none focus:ring-4 focus:ring-indigo-300 rounded-lg"
            whileHover={{ scale: 1.05 }}
            aria-label="Home - Mahesh Babu Kethineni"
          >
            MBK
          </motion.a>

          <ul className="hidden md:flex items-center gap-8 list-none">
            {navLinks.map((link) => (
              <li key={link.id}>
                <motion.button
                  onClick={() => scrollToSection(link.id)}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-sm font-medium hover:text-indigo-500 focus:text-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-300 rounded px-3 py-2 transition-colors"
                >
                  {link.name}
                </motion.button>
              </li>
            ))}
            <li>
              <motion.button
                onClick={() => setDarkMode(!darkMode)}
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
                className="p-3 rounded-full bg-gray-200 dark:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-indigo-300"
              >
                {darkMode ? <Sun size={22} aria-hidden="true" /> : <Moon size={22} aria-hidden="true" />}
              </motion.button>
            </li>
          </ul>

          <div className="flex items-center gap-4 md:hidden">
            <motion.button
              onClick={() => setDarkMode(!darkMode)}
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-indigo-300"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              className="p-2 focus:outline-none focus:ring-4 focus:ring-indigo-300 rounded"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              id="mobile-menu"
              className="absolute top-full left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-2xl md:hidden overflow-hidden"
            >
              <ul className="px-6 py-8 flex flex-col gap-6 list-none">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="text-xl font-medium text-left hover:text-indigo-500 focus:text-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-300 rounded px-4 py-3 w-full"
                    >
                      {link.name}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
};

const HeroSection = ({ scrollToSection, motionProps, darkMode }) => {
  const words = ["Frontend Developer", "React Specialist", "Mobile App Developer", "UI/UX Enthusiast"];
  const [currentWord, setCurrentWord] = useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  useEffect(() => {
    const interval = setInterval(() => setCurrentWord((prev) => (prev + 1) % words.length), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" ref={ref} aria-labelledby="hero-heading" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 px-6">
      <motion.div style={{ y, opacity }} className="absolute inset-0 -z-10" aria-hidden="true">
        <motion.div 
          className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full ${
            darkMode ? 'bg-indigo-500/10' : 'bg-yellow-400/20'
          } blur-3xl`}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className={`absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full ${
            darkMode ? 'bg-purple-500/10' : 'bg-orange-400/20'
          } blur-3xl`}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </motion.div>

      <motion.div 
        className="text-center z-10 max-w-5xl mx-auto"
        style={{ scale }}
      >
        <motion.span
          {...motionProps({ 
            initial: { opacity: 0, y: -30, scale: 0.8 }, 
            animate: { opacity: 1, y: 0, scale: 1 },
          })}
          animate={{
            boxShadow: [
              "0 0 20px rgba(34, 197, 94, 0.4)",
              "0 0 40px rgba(34, 197, 94, 0.6)",
              "0 0 20px rgba(34, 197, 94, 0.4)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="inline-block px-6 py-3 bg-green-500/20 backdrop-blur-sm text-green-400 rounded-full text-sm font-semibold mb-8 border border-green-500/30"
        >
          ✅ Immediate Joiner
        </motion.span>

        <h1 id="hero-heading" className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
          <motion.span 
            {...motionProps({ 
              initial: { opacity: 0, y: 60 }, 
              animate: { opacity: 1, y: 0 } 
            })}
            transition={{ duration: 0.8 }}
          >
            Mahesh Babu<br />
            <motion.span 
              className="inline-block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
              style={{ 
                backgroundSize: "200% auto",
              }}
              animate={{
                backgroundPosition: ["0% center", "200% center"],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              Kethineni
            </motion.span>
          </motion.span>
        </h1>

        <div className="h-24 mb-10" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentWord}
              {...motionProps({ 
                initial: { opacity: 0, rotateX: 90, y: 40 }, 
                animate: { opacity: 1, rotateX: 0, y: 0 }, 
                exit: { opacity: 0, rotateX: -90, y: -40 } 
              })}
              transition={{ duration: 0.6, type: "spring" }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-gray-600 dark:text-gray-300"
              style={{ transformStyle: "preserve-3d" }}
            >
              {words[currentWord]}
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center"
          {...motionProps({
            initial: { opacity: 0, y: 30 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.4 }
          })}
        >
          <motion.button
            onClick={() => scrollToSection('projects')}
            aria-label="View projects section"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 20px 50px rgba(99, 102, 241, 0.5)",
              y: -5
            }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full font-bold text-lg flex items-center justify-center gap-3 shadow-2xl focus:outline-none focus:ring-4 focus:ring-indigo-400"
          >
            View Projects 
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ExternalLink size={22} aria-hidden="true" />
            </motion.div>
          </motion.button>
          <motion.button
            aria-label="Download resume PDF"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.15)",
              y: -5
            }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-10 py-5 bg-white dark:bg-gray-800 rounded-full font-bold text-lg flex items-center justify-center gap-3 shadow-2xl border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-4 focus:ring-indigo-400 backdrop-blur-sm"
          >
            <Download size={22} aria-hidden="true" /> Download Resume
          </motion.button>
        </motion.div>

        <motion.button
          onClick={() => scrollToSection('about')}
          aria-label="Scroll to About section"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.2 }}
          className="mt-20 focus:outline-none focus:ring-4 focus:ring-indigo-400 rounded-full p-4"
        >
          <ArrowDown size={36} className="mx-auto text-gray-400 dark:text-gray-500" />
        </motion.button>
      </motion.div>
    </section>
  );
};

const AnimatedSection = ({ children, id, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id={id} ref={ref} className={`py-24 px-6 relative ${className}`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        {children}
      </motion.div>
    </section>
  );
};

const AboutSection = ({ motionProps }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const stats = [
    { icon: Clock, value: "3+", label: "Years Experience" },
    { icon: Smartphone, value: "2+", label: "Live Apps" },
    { icon: TrendingUp, value: "40%", label: "Performance Boost" },
    { icon: Users, value: "25%", label: "User Retention" }
  ];

  return (
    <AnimatedSection id="about" className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <motion.div ref={ref} className="text-center mb-20">
          <motion.h2 
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.7, type: "spring" }}
          >
            About <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">Me</span>
          </motion.h2>
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Passionate Frontend & Mobile Developer with 3+ years of experience building high-performance, user-centric applications using React, React Native, and modern web technologies in the insurance domain.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60, rotateY: -45 }}
              animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.7, type: "spring", stiffness: 100 }}
              whileHover={{ 
                scale: 1.08,
                                rotateY: 10,
                boxShadow: "0 20px 40px rgba(99,102,241,0.25)"
              }}
              className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-center shadow-xl"
            >
              <stat.icon className="mx-auto mb-4 text-indigo-500" size={36} />
              <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
              <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

/* ===================== SKILLS ===================== */
const SkillsSection = ({ motionProps }) => {
  const skills = [
    { icon: Code, title: "Frontend", desc: "React, Angular, Next.js, Tailwind" },
    { icon: Smartphone, title: "Mobile", desc: "React Native, Ionic, Capacitor" },
    { icon: Database, title: "State & Data", desc: "Redux, RTK Query, Realm, Strapi" }
  ];

  return (
    <AnimatedSection id="skills">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-5xl font-bold mb-14">
          Technical <span className="text-indigo-500">Skills</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {skills.map((s, i) => (
            <motion.div
              key={i}
              {...motionProps({
                initial: { opacity: 0, y: 60 },
                whileInView: { opacity: 1, y: 0 }
              })}
              transition={{ delay: i * 0.2 }}
              whileHover={{ scale: 1.08 }}
              className="p-10 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-300/30 shadow-xl"
            >
              <s.icon size={50} className="mx-auto mb-6 text-indigo-500" />
              <h3 className="text-2xl font-bold mb-3">{s.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

/* ===================== EXPERIENCE ===================== */
const ExperienceSection = () => (
  <AnimatedSection id="experience" className="bg-gray-50 dark:bg-gray-900">
    <div className="max-w-5xl mx-auto">
      <h2 className="text-5xl font-bold text-center mb-16">
        Work <span className="text-indigo-500">Experience</span>
      </h2>

      <div className="space-y-10">
        <motion.div whileHover={{ scale: 1.03 }} className="p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-xl">
          <h3 className="text-2xl font-bold">Member of Technical Staff</h3>
          <p className="text-indigo-500 font-medium mb-2">Kshema General Insurance</p>
          <p className="text-gray-600 dark:text-gray-400">
            Building scalable React Native & Web applications, improving performance, modularizing legacy code, and integrating analytics.
          </p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.03 }} className="p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-xl">
          <h3 className="text-2xl font-bold">Trainee Executive</h3>
          <p className="text-indigo-500 font-medium mb-2">Itus Insurance Brokers Pvt. Ltd</p>
          <p className="text-gray-600 dark:text-gray-400">
            Developed responsive UI components for multi-device compatibility across mobile
            and web platforms.
          </p>
        </motion.div>
      </div>
    </div>
  </AnimatedSection>
);

/* ===================== PROJECTS ===================== */
const ProjectsSection = () => {
  const projects = [
    {
      title: "Kshema App",
      desc: "Ionic + Angular Insurance App",
      playStoreUrl: "https://play.google.com/store/apps/details?id=app.iagri&hl=en_IN",
    },
    {
      title: "Kshema 2.0",
      desc: "React Native flagship mobile app",
      playStoreUrl: "https://play.google.com/store/apps/details?id=app.iagri&hl=en_IN",
    },
    {
      title: "Kshema Field Assist",
      desc: "Field service management app",
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.kshemafieldassist&hl=en_IN",
    },
    {
      title: "Smart CCE",
      desc: "Offline-first APP",
      playStoreUrl: "https://play.google.com/store/apps/details?id=cce.omdc&hl=en_IN",
    },
  ];

  return (
    <AnimatedSection id="projects">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-5xl font-bold mb-16">
          Featured <span className="text-indigo-500">Projects</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -12, scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.open(p.playStoreUrl, "_blank")}
              className="p-8 rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-2xl cursor-pointer"
            >
              <h3 className="text-2xl font-bold mb-3">{p.title}</h3>
              <p className="opacity-90">{p.desc}</p>

              <span className="mt-6 inline-block text-sm font-semibold opacity-90 underline">
                View on Play Store →
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};


/* ===================== ACHIEVEMENTS ===================== */
const AchievementsSection = () => (
  <AnimatedSection id="achievements" className="bg-gray-50 dark:bg-gray-900">
    <div className="max-w-4xl mx-auto text-center">
      <Award size={60} className="mx-auto mb-6 text-indigo-500" />
      <h2 className="text-4xl font-bold mb-4">Achievements</h2>
      <p className="text-gray-600 dark:text-gray-400">
        Certificate of Appreciation – August 2024 for outstanding performance and delivery excellence.
      </p>
    </div>
  </AnimatedSection>
);

/* ===================== CONTACT ===================== */
const ContactSection = () => (
  <AnimatedSection id="contact">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-5xl font-bold mb-12">
        Get in <span className="text-indigo-500">Touch</span>
      </h2>

      <div className="flex flex-col sm:flex-row justify-center gap-8">
        <a href="mailto:maheshbabukethineni@gmail.com" className="flex items-center gap-3 px-8 py-4 bg-indigo-500 text-white rounded-full shadow-xl">
          <Mail /> Email
        </a>
        <a href="https://www.linkedin.com/in/mahesh-babu-kethineni-3a40a7221/" className="flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-full shadow-xl">
          <Linkedin /> LinkedIn
        </a>
        <a href="tel:+91720792059" className="flex items-center gap-3 px-8 py-4 bg-green-600 text-white rounded-full shadow-xl">
          <Phone /> Call
        </a>
      </div>
    </div>
  </AnimatedSection>
);

export default Portfolio;

                