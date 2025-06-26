import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  User, 
  Code, 
  Briefcase, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
  Award,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ChevronDown,
  Star
} from 'lucide-react';

const CreativePortfolioTemplate = ({ formData }) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const portfolioRef = useRef(null);
  
  // Refs for GSAP animations
  const heroRef = useRef(null);
  const cursorRef = useRef(null);
  const navRef = useRef(null);
  const sectionsRef = useRef([]);

  // Default data - only use formData if provided
  const data = {
    fullName: formData?.fullName || 'Alex Rivera',
    profession: formData?.profession || 'Creative Developer',
    bio: formData?.bio || 'Crafting digital experiences that blur the line between art and technology. I transform ideas into immersive web experiences that captivate and inspire.',
    email: formData?.email || 'alex.rivera@example.com',
    phone: formData?.phone || '+1 (555) 123-4567',
    location: formData?.location || 'San Francisco, CA',
    skills: formData?.skills || ['React', 'Three.js', 'GSAP', 'WebGL', 'Node.js', 'Python', 'Design Systems', 'UI/UX'],
    achievements: formData?.achievements || [
      { title: 'Webby Award Winner', description: 'Best Interactive Experience 2024', year: '2024' },
      { title: 'Design Excellence', description: 'Adobe Creative Residency', year: '2023' },
    ],
    experiences: formData?.experiences || [
      { title: 'Senior Creative Developer', company: 'Digital Arts Studio', period: '2023 - Present', description: 'Leading interactive web experiences for Fortune 500 clients' },
      { title: 'Frontend Engineer', company: 'Innovation Lab', period: '2021 - 2023', description: 'Developed cutting-edge web applications with advanced animations' },
    ],
    projects: formData?.projects || [
      { title: 'Immersive Gallery', description: '3D interactive art gallery with WebGL', image: '', link: 'https://example.com/gallery' },
      { title: 'Brand Experience', description: 'Award-winning brand website with GSAP', image: '', link: 'https://example.com/brand' },
      { title: 'Creative Dashboard', description: 'Data visualization with Three.js', image: '', link: 'https://example.com/dashboard' },
    ],
    education: formData?.education || [
      { degree: 'Master of Fine Arts', institution: 'Art Institute', year: '2019 - 2021', description: 'Digital Media & Interactive Design' },
    ],
    socialLinks: formData?.socialLinks || {
      linkedin: 'https://linkedin.com/in/alexrivera',
      github: 'https://github.com/alexrivera',
      twitter: 'https://twitter.com/alexrivera',
    },
    selectedTheme: formData?.selectedTheme || 'dark',
  };

  // Theme colors - only based on formData
  const getThemeColors = () => {
    const themes = {
      dark: { 
        primary: '#121212', 
        secondary: '#1e1e1e', 
        accent: '#8a2be2', 
        text: '#ffffff', 
        subtext: '#cccccc',
        gradient: 'from-purple-600 via-pink-600 to-orange-500'
      },
      light: { 
        primary: '#ffffff', 
        secondary: '#f5f5f5', 
        accent: '#8a2be2', 
        text: '#333333', 
        subtext: '#666666',
        gradient: 'from-blue-600 via-purple-600 to-pink-500'
      },
      blue: { 
        primary: '#0a192f', 
        secondary: '#172a45', 
        accent: '#64ffda', 
        text: '#e6f1ff', 
        subtext: '#8892b0',
        gradient: 'from-cyan-400 via-teal-400 to-blue-500'
      },
      green: { 
        primary: '#1a2f1a', 
        secondary: '#2d482d', 
        accent: '#7fff00', 
        text: '#e6f1e6', 
        subtext: '#b0d890',
        gradient: 'from-green-400 via-emerald-400 to-teal-500'
      },
      purple: { 
        primary: '#2d1b4e', 
        secondary: '#442873', 
        accent: '#ff7edb', 
        text: '#f8f8ff', 
        subtext: '#d8bfd8',
        gradient: 'from-purple-400 via-pink-400 to-rose-500'
      },
      red: { 
        primary: '#2b0a0a', 
        secondary: '#3d1515', 
        accent: '#ff4d4d', 
        text: '#f8e6e6', 
        subtext: '#d89090',
        gradient: 'from-red-400 via-pink-400 to-orange-500'
      },
    };
    return themes[data.selectedTheme] || themes.dark;
  };

  const theme = getThemeColors();

  // Mouse tracking for custom cursor - only within portfolio container
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (portfolioRef.current && portfolioRef.current.contains(e.target)) {
        const rect = portfolioRef.current.getBoundingClientRect();
        setMousePosition({ 
          x: e.clientX - rect.left, 
          y: e.clientY - rect.top 
        });
      }
    };

    const portfolioElement = portfolioRef.current;
    if (portfolioElement) {
      portfolioElement.addEventListener('mousemove', handleMouseMove);
      return () => portfolioElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // GSAP animations
  useEffect(() => {
    // Only load GSAP if not already loaded
    if (typeof window.gsap === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
      script.onload = () => {
        initAnimations();
      };
      document.head.appendChild(script);

      // Add ScrollTrigger
      const scrollTriggerScript = document.createElement('script');
      scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
      scrollTriggerScript.onload = () => {
        if (window.gsap) {
          window.gsap.registerPlugin(window.ScrollTrigger);
        }
      };
      document.head.appendChild(scrollTriggerScript);

      return () => {
        if (document.head.contains(script)) document.head.removeChild(script);
        if (document.head.contains(scrollTriggerScript)) document.head.removeChild(scrollTriggerScript);
      };
    } else {
      initAnimations();
    }
  }, []);

  const initAnimations = () => {
    if (typeof window.gsap === 'undefined') return;
    
    const { gsap } = window;
    const container = portfolioRef.current;
    if (!container) return;

    // Scope animations to portfolio container
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo('.portfolio-hero-title', 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.5 }
      );
      
      gsap.fromTo('.portfolio-hero-subtitle', 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.8 }
      );

      gsap.fromTo('.portfolio-hero-bio', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.1 }
      );

      // Floating elements animation
      gsap.to('.portfolio-floating-1', {
        y: -20,
        rotation: 5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      });

      gsap.to('.portfolio-floating-2', {
        y: -15,
        rotation: -3,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
        delay: 1
      });

      gsap.to('.portfolio-floating-3', {
        y: -25,
        rotation: 8,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
        delay: 2
      });

      // Scroll animations
      if (window.ScrollTrigger) {
        sectionsRef.current.forEach((section, index) => {
          if (section) {
            gsap.fromTo(section.children,
              { y: 80, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: section,
                  start: 'top 80%',
                  scroller: container
                }
              }
            );
          }
        });

        // Skills animation
        gsap.fromTo('.portfolio-skill-item',
          { scale: 0, rotation: 180 },
          {
            scale: 1,
            rotation: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: '.portfolio-skills-container',
              start: 'top 70%',
              scroller: container
            }
          }
        );
      }
    }, container);

    return () => ctx.revert();
  };

  // Navigation items
  const navItems = [
    { id: 'hero', label: 'Home', icon: Sparkles },
    { id: 'about', label: 'About', icon: User },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: ExternalLink },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const scrollToSection = (sectionId) => {
    const element = portfolioRef.current?.querySelector(`#portfolio-${sectionId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMenuOpen(false);
    }
  };

  const containerStyle = {
    backgroundColor: theme.primary,
    color: theme.text,
    fontFamily: 'system-ui, -apple-system, sans-serif',
    lineHeight: '1.5',
    position: 'relative',
    minHeight: '100vh',
    overflowX: 'hidden',
    isolation: 'isolate', // Creates new stacking context
    zIndex: 1,
  };

  return (
    <div ref={portfolioRef} style={containerStyle} className="portfolio-container">
      {/* Custom Cursor - contained within portfolio */}
      <div 
        className="portfolio-cursor"
        style={{
          position: 'absolute',
          width: '24px',
          height: '24px',
          pointerEvents: 'none',
          zIndex: 50,
          mixBlendMode: 'difference',
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          backgroundColor: theme.accent,
          borderRadius: '50%',
          transition: 'transform 0.1s ease-out',
        }}
        ref={cursorRef}
      />

      {/* Floating Background Elements */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div 
          className={`portfolio-floating-1`}
          style={{
            position: 'absolute',
            top: '80px',
            left: '40px',
            width: '128px',
            height: '128px',
            background: `linear-gradient(to right, ${theme.accent}33, ${theme.accent}11)`,
            borderRadius: '50%',
            filter: 'blur(48px)'
          }}
        />
        <div 
          className={`portfolio-floating-2`}
          style={{
            position: 'absolute',
            top: '160px',
            right: '80px',
            width: '192px',
            height: '192px',
            background: `linear-gradient(to right, ${theme.accent}22, ${theme.accent}08)`,
            borderRadius: '50%',
            filter: 'blur(64px)'
          }}
        />
        <div 
          className={`portfolio-floating-3`}
          style={{
            position: 'absolute',
            bottom: '128px',
            left: '25%',
            width: '96px',
            height: '96px',
            background: `linear-gradient(to right, ${theme.accent}44, ${theme.accent}18)`,
            borderRadius: '50%',
            filter: 'blur(32px)'
          }}
        />
      </div>

      {/* Navigation */}
      <nav style={{ position: 'sticky', top: 0, left: 0, right: 0, zIndex: 40, padding: '24px', backgroundColor: `${theme.primary}ee`, backdropFilter: 'blur(10px)' }} ref={navRef}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', background: `linear-gradient(to right, ${theme.text}, ${theme.subtext})`, backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
            {data.fullName.split(' ')[0]}
          </div>
          
          {/* Desktop Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="portfolio-desktop-nav">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                style={{
                  position: 'relative',
                  padding: '8px 16px',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  color: activeSection === item.id ? theme.text : theme.subtext,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.target.style.color = theme.text}
                onMouseLeave={(e) => e.target.style.color = activeSection === item.id ? theme.text : theme.subtext}
              >
                {item.label}
                {activeSection === item.id && (
                  <div 
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      height: '2px',
                      width: '100%',
                      backgroundColor: theme.accent
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              display: 'none',
              padding: '8px',
              borderRadius: '8px',
              backgroundColor: 'transparent',
              border: 'none',
              color: theme.text,
              cursor: 'pointer',
              transition: 'background-color 0.3s ease'
            }}
            className="portfolio-mobile-menu-btn"
            onMouseEnter={(e) => e.target.style.backgroundColor = `${theme.secondary}80`}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: `${theme.primary}e6`,
            backdropFilter: 'blur(16px)',
            padding: '24px',
            borderRadius: '12px',
            marginTop: '16px'
          }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  padding: '12px',
                  textAlign: 'left',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderRadius: '8px',
                  color: theme.text,
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = `${theme.secondary}80`}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="portfolio-hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px' }} ref={heroRef}>
        <div style={{ textAlign: 'center', maxWidth: '1024px', margin: '0 auto' }}>
          <h1 className="portfolio-hero-title" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 'bold', marginBottom: '24px' }}>
            <span style={{
              background: `linear-gradient(to right, ${theme.accent}, ${theme.text})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent'
            }}>
              {data.fullName}
            </span>
          </h1>
          <p className="portfolio-hero-subtitle" style={{ fontSize: 'clamp(1.25rem, 4vw, 2rem)', marginBottom: '32px', color: theme.subtext }}>
            {data.profession}
          </p>
          <p className="portfolio-hero-bio" style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', maxWidth: '512px', margin: '0 auto 48px', color: theme.subtext, lineHeight: '1.6' }}>
            {data.bio}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '24px' }}>
            <button
              onClick={() => scrollToSection('projects')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '16px 32px',
                background: `linear-gradient(to right, ${theme.accent}, ${theme.accent}cc)`,
                color: theme.text,
                borderRadius: '50px',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: 'scale(1)'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              <span>View My Work</span>
              <ArrowRight size={20} />
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              style={{
                padding: '16px 32px',
                border: `2px solid ${theme.subtext}`,
                color: theme.subtext,
                borderRadius: '50px',
                fontWeight: '600',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = theme.text;
                e.target.style.color = theme.text;
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = theme.subtext;
                e.target.style.color = theme.subtext;
              }}
            >
              Get In Touch
            </button>
          </div>
        </div>
        <div style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          animation: 'bounce 2s infinite'
        }}>
          <ChevronDown size={32} style={{ color: theme.subtext }} />
        </div>
      </section>

      {/* About Section */}
      <section id="portfolio-about" style={{ padding: '80px 24px' }} ref={el => sectionsRef.current[0] = el}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 'bold', marginBottom: '64px', textAlign: 'center' }}>
            <span style={{
              background: `linear-gradient(to right, ${theme.accent}, ${theme.text})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent'
            }}>
              About Me
            </span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '18px', color: theme.subtext, marginBottom: '32px', lineHeight: '1.6' }}>
                {data.bio}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <Mail size={20} style={{ color: theme.accent }} />
                  <span style={{ color: theme.subtext }}>{data.email}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <Phone size={20} style={{ color: theme.accent }} />
                  <span style={{ color: theme.subtext }}>{data.phone}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <MapPin size={20} style={{ color: theme.accent }} />
                  <span style={{ color: theme.subtext }}>{data.location}</span>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {data.achievements.map((achievement, index) => (
                <div key={index} style={{
                  padding: '24px',
                  borderRadius: '12px',
                  backgroundColor: `${theme.secondary}80`,
                  backdropFilter: 'blur(8px)',
                  border: `1px solid ${theme.secondary}`
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <Award size={24} style={{ color: theme.accent }} />
                    <div>
                      <h3 style={{ fontSize: '20px', fontWeight: '600', color: theme.text, marginBottom: '8px' }}>{achievement.title}</h3>
                      <p style={{ color: theme.subtext, marginBottom: '8px' }}>{achievement.description}</p>
                      <span style={{ fontSize: '14px', color: theme.subtext }}>{achievement.year}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="portfolio-skills" style={{ padding: '80px 24px' }} ref={el => sectionsRef.current[1] = el}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 'bold', marginBottom: '64px', textAlign: 'center' }}>
            <span style={{
              background: `linear-gradient(to right, ${theme.accent}, ${theme.text})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent'
            }}>
              Skills & Expertise
            </span>
          </h2>
          <div className="portfolio-skills-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
            {data.skills.map((skill, index) => (
              <div
                key={index}
                className="portfolio-skill-item"
                style={{
                  padding: '24px',
                  borderRadius: '12px',
                  backgroundColor: `${theme.secondary}80`,
                  backdropFilter: 'blur(8px)',
                  border: `1px solid ${theme.secondary}`,
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.borderColor = theme.accent;
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.borderColor = theme.secondary;
                }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  margin: '0 auto 16px',
                  borderRadius: '50%',
                  background: `linear-gradient(to right, ${theme.accent}, ${theme.accent}cc)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Star size={24} style={{ color: theme.text }} />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: theme.text }}>{skill}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="portfolio-experience" style={{ padding: '80px 24px' }} ref={el => sectionsRef.current[2] = el}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 'bold', marginBottom: '64px', textAlign: 'center' }}>
            <span style={{
              background: `linear-gradient(to right, ${theme.accent}, ${theme.text})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent'
            }}>
              Experience
            </span>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {data.experiences.map((exp, index) => (
              <div key={index} style={{
                padding: '32px',
                borderRadius: '12px',
                backgroundColor: `${theme.secondary}80`,
                backdropFilter: 'blur(8px)',
                border: `1px solid ${theme.secondary}`,
                transition: 'border-color 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.borderColor = theme.accent}
              onMouseLeave={(e) => e.target.style.borderColor = theme.secondary}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                    <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: theme.text }}>{exp.title}</h3>
                    <span style={{ fontSize: '14px', color: theme.subtext }}>{exp.period}</span>
                  </div>
                  <p style={{ fontSize: '18px', color: theme.subtext, marginBottom: '16px' }}>{exp.company}</p>
                </div>
                <p style={{ color: theme.subtext, lineHeight: '1.6' }}>{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="portfolio-projects" style={{ padding: '80px 24px' }} ref={el => sectionsRef.current[3] = el}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 'bold', marginBottom: '64px', textAlign: 'center' }}>
            <span style={{
              background: `linear-gradient(to right, ${theme.accent}, ${theme.text})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent'
            }}>
              Featured Projects
            </span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            {data.projects.map((project, index) => (
              <div key={index} style={{
                padding: '32px',
                borderRadius: '12px',
                backgroundColor: `${theme.secondary}80`,
                backdropFilter: 'blur(8px)',
                border: `1px solid ${theme.secondary}`,
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.borderColor = theme.accent;
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.borderColor = theme.secondary;
              }}
              >
                <div style={{
                  width: '100%',
                  height: '192px',
                  borderRadius: '8px',
                  background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent}cc)`,
                  marginBottom: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <ExternalLink size={48} style={{ color: `${theme.text}cc` }} />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: theme.text, marginBottom: '12px' }}>{project.title}</h3>
                <p style={{ color: theme.subtext, marginBottom: '24px' }}>{project.description}</p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: theme.text,
                    fontWeight: '600',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.color = theme.accent}
                  onMouseLeave={(e) => e.target.style.color = theme.text}
                >
                  <span>View Project</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="portfolio-education" style={{ padding: '80px 24px' }} ref={el => sectionsRef.current[4] = el}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 'bold', marginBottom: '64px', textAlign: 'center' }}>
            <span style={{
              background: `linear-gradient(to right, ${theme.accent}, ${theme.text})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent'
            }}>
              Education
            </span>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {data.education.map((edu, index) => (
              <div key={index} style={{
                padding: '32px',
                borderRadius: '12px',
                backgroundColor: `${theme.secondary}80`,
                backdropFilter: 'blur(8px)',
                border: `1px solid ${theme.secondary}`
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <GraduationCap size={32} style={{ color: theme.accent }} />
                  <div>
                    <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: theme.text, marginBottom: '8px' }}>{edu.degree}</h3>
                    <p style={{ fontSize: '18px', color: theme.subtext, marginBottom: '8px' }}>{edu.institution}</p>
                    <p style={{ color: theme.subtext, marginBottom: '16px' }}>{edu.year}</p>
                    <p style={{ color: theme.subtext }}>{edu.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="portfolio-contact" style={{ padding: '80px 24px' }} ref={el => sectionsRef.current[5] = el}>
        <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 'bold', marginBottom: '64px', textAlign: 'center' }}>
            <span style={{
              background: `linear-gradient(to right, ${theme.accent}, ${theme.text})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent'
            }}>
              Let's Connect
            </span>
          </h2>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontSize: '20px', color: theme.subtext, marginBottom: '32px' }}>
              Ready to bring your next project to life? Let's discuss how we can work together.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '24px' }}>
              <a
                href={`mailto:${data.email}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '16px 32px',
                  background: `linear-gradient(to right, ${theme.accent}, ${theme.accent}cc)`,
                  color: theme.text,
                  borderRadius: '50px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                <Mail size={20} />
                <span>Send Email</span>
              </a>
              <a
                href={`tel:${data.phone}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '16px 32px',
                  border: `2px solid ${theme.subtext}`,
                  color: theme.subtext,
                  borderRadius: '50px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = theme.text;
                  e.target.style.color = theme.text;
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = theme.subtext;
                  e.target.style.color = theme.subtext;
                }}
              >
                <Phone size={20} />
                <span>Call Me</span>
              </a>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '32px' }}>
            {Object.entries(data.socialLinks).map(([platform, url]) => {
              const Icon = platform === 'linkedin' ? Linkedin : platform === 'github' ? Github : Twitter;
              return (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '16px',
                    borderRadius: '50%',
                    backgroundColor: `${theme.secondary}80`,
                    backdropFilter: 'blur(8px)',
                    border: `1px solid ${theme.secondary}`,
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.1)';
                    e.target.style.borderColor = theme.accent;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.borderColor = theme.secondary;
                  }}
                >
                  <Icon size={24} style={{ color: theme.subtext }} />
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '48px 24px', borderTop: `1px solid ${theme.secondary}` }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ color: theme.subtext }}>
            © {new Date().getFullYear()} {data.fullName}. Crafted with passion and precision.
          </p>
        </div>
      </footer>

      {/* Add bounce animation styles */}
      <style jsx>{`
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          40%, 43% {
            transform: translateX(-50%) translateY(-30px);
          }
          70% {
            transform: translateX(-50%) translateY(-15px);
          }
          90% {
            transform: translateX(-50%) translateY(-4px);
          }
        }
        
        @media (max-width: 768px) {
          .portfolio-desktop-nav {
            display: none !important;
          }
          .portfolio-mobile-menu-btn {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CreativePortfolioTemplate;