import React, { useState, useEffect } from 'react';

const ResponsiveNavBar = ({ data, themeColors, activeSection, setActiveSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredSection, setHoveredSection] = useState(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation links
  const navSections = ['hero', 'about', 'skills', 'experience', 'projects', 'education', 'contact'];

  // Responsive styles
  const styles = {
    nav: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: isScrolled ? '10px 24px' : '18px 24px',
      position: 'sticky',
      top: 0,
      width: '100%',
      backgroundColor: isScrolled ? `${themeColors.primary}f0` : `${themeColors.primary}95`,
      backdropFilter: 'blur(12px)',
      boxShadow: isScrolled ? `0 4px 20px rgba(0,0,0,0.15)` : 'none',
      zIndex: 1000,
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      boxSizing: 'border-box',
      borderBottom: `1px solid ${isScrolled ? themeColors.accent + '20' : 'transparent'}`
    },
    navLogo: {
      fontSize: '26px',
      fontWeight: 'bold',
      color: themeColors.accent,
      textDecoration: 'none',
      letterSpacing: '0.5px',
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      padding: '6px 10px',
      borderRadius: '8px',
      overflow: 'hidden'
    },
    logoBackground: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      height: '2px',
      width: '100%',
      backgroundColor: themeColors.accent,
      opacity: isScrolled ? 0.7 : 0,
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      transform: `scaleX(${isScrolled ? 1 : 0})`,
      transformOrigin: 'left',
    },
    logoText: {
      transform: isScrolled ? 'scale(0.9)' : 'scale(1)',
      transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      textShadow: isScrolled ? `0 0 8px ${themeColors.accent}50` : 'none'
    },
    navLinks: {
      display: windowWidth > 768 ? 'flex' : menuOpen ? 'flex' : 'none',
      position: windowWidth > 768 ? 'static' : 'absolute',
      flexDirection: windowWidth > 768 ? 'row' : 'column',
      gap: windowWidth > 768 ? '10px' : '0',
      alignItems: windowWidth > 768 ? 'center' : 'stretch',
      top: windowWidth > 768 ? 'auto' : '65px',
      left: windowWidth > 768 ? 'auto' : 0,
      right: windowWidth > 768 ? 'auto' : 0,
      backgroundColor: windowWidth > 768 ? 'transparent' : `${themeColors.primary}f8`,
      backdropFilter: windowWidth > 768 ? 'none' : 'blur(12px)',
      padding: windowWidth > 768 ? '0' : '12px',
      borderRadius: windowWidth > 768 ? '0' : '0 0 16px 16px',
      boxShadow: windowWidth > 768 ? 'none' : '0 15px 25px rgba(0,0,0,0.18)',
      zIndex: 1000,
      border: windowWidth > 768 ? 'none' : `1px solid ${themeColors.accent}30`,
      borderTop: windowWidth > 768 ? 'none' : 'none',
      transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      transform: menuOpen && windowWidth <= 768 ? 'translateY(0)' : windowWidth <= 768 ? 'translateY(-10px)' : 'none',
      opacity: menuOpen || windowWidth > 768 ? 1 : 0,
      pointerEvents: 'auto'
    },
    navLink: {
      color: themeColors.text,
      textDecoration: 'none',
      fontSize: windowWidth > 768 ? '15px' : '16px',
      fontWeight: '500',
      padding: windowWidth > 768 ? '8px 14px' : '14px 16px',
      borderRadius: '8px',
      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      width: windowWidth > 768 ? 'auto' : '100%',
      textAlign: windowWidth > 768 ? 'center' : 'center',
      borderBottom: windowWidth > 768 ? 'none' : `1px solid ${themeColors.accent}15`,
      margin: windowWidth > 768 ? '0' : '3px 0',
      position: 'relative',
      overflow: 'hidden'
    },
    navLinkHoverEffect: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      height: '2px',
      width: '100%',
      backgroundColor: themeColors.accent,
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      transform: 'scaleX(0)',
      transformOrigin: 'left',
      opacity: 0.7
    },
    hamburger: {
      display: windowWidth <= 768 ? 'flex' : 'none',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: '28px',
      height: '22px',
      cursor: 'pointer',
      padding: '6px',
      borderRadius: '8px',
      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      backgroundColor: menuOpen ? `${themeColors.accent}30` : 'transparent',
      zIndex: 1001,
      border: `1px solid ${menuOpen ? themeColors.accent + '40' : 'transparent'}`
    },
    hamburgerLine: {
      width: '100%',
      height: '2px',
      backgroundColor: menuOpen ? themeColors.accent : themeColors.text,
      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      borderRadius: '2px'
    },
    overlay: {
      display: menuOpen && windowWidth <= 768 ? 'block' : 'none',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.6)',
      backdropFilter: 'blur(4px)',
      zIndex: 998,
      opacity: menuOpen ? 1 : 0,
      transition: 'opacity 0.4s ease',
      pointerEvents: 'auto'
    }
  };

  const getNavLinkStyles = (section) => {
    const isActive = activeSection === section;
    const isHovered = hoveredSection === section;
    
    return {
      ...styles.navLink,
      color: isActive || isHovered ? themeColors.accent : themeColors.text,
      backgroundColor: isActive ? `${themeColors.accent}15` : (isHovered ? `${themeColors.accent}10` : 'transparent'),
      transform: isHovered && windowWidth > 768 ? 'translateY(-2px)' : 'none',
      boxShadow: isHovered && windowWidth > 768 ? `0 4px 12px ${themeColors.accent}30` : 'none',
      borderBottom: windowWidth <= 768 ? `1px solid ${themeColors.accent}15` : 'none',
      borderBottomColor: windowWidth <= 768 && (isActive || isHovered) ? `${themeColors.accent}50` : `${themeColors.accent}15`,
      letterSpacing: isHovered ? '0.5px' : 'normal',
      fontWeight: isActive ? '600' : '500'
    };
  };

  const handleNavLinkClick = (section) => {
    setActiveSection(section);
    setMenuOpen(false);
  };

  return (
    <>
      <div 
        style={{
          ...styles.overlay,
          opacity: menuOpen ? 1 : 0,
          transition: 'opacity 0.4s ease'
        }} 
        onClick={() => setMenuOpen(false)}
      ></div>
      <nav style={styles.nav}>
        <a 
          href="#hero" 
          style={styles.navLogo} 
          onClick={() => handleNavLinkClick('hero')}
          onMouseEnter={() => setHoveredSection('logo')}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <span style={styles.logoText}>
            {data.fullName.split(' ')[0]}
          </span>
          <div style={styles.logoBackground}></div>
        </a>
        
        <div 
          style={styles.hamburger} 
          onClick={() => setMenuOpen(!menuOpen)}
          title="Menu"
          aria-label="Toggle navigation menu"
        >
          <span style={{ 
            ...styles.hamburgerLine, 
            transform: menuOpen ? 'rotate(45deg) translate(5px, 7px)' : 'none',
            width: menuOpen ? '100%' : '75%',
            marginLeft: menuOpen ? '0' : 'auto'
          }}></span>
          <span style={{ 
            ...styles.hamburgerLine, 
            opacity: menuOpen ? 0 : 1,
            width: '100%',
            transform: menuOpen ? 'translateX(20px)' : 'none'
          }}></span>
          <span style={{ 
            ...styles.hamburgerLine, 
            transform: menuOpen ? 'rotate(-45deg) translate(5px, -7px)' : 'none',
            width: menuOpen ? '100%' : '50%',
            marginLeft: menuOpen ? '0' : 'auto'
          }}></span>
        </div>
        
        <div style={styles.navLinks}>
          {navSections.map(section => (
            <a
              key={section}
              href={`#${section}`}
              style={getNavLinkStyles(section)}
              onMouseEnter={() => setHoveredSection(section)}
              onMouseLeave={() => setHoveredSection(null)}
              onClick={() => handleNavLinkClick(section)}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
              <div 
                style={{
                  ...styles.navLinkHoverEffect,
                  transform: hoveredSection === section || activeSection === section ? 'scaleX(1)' : 'scaleX(0)'
                }}
              ></div>
            </a>
          ))}
        </div>
      </nav>
    </>
  );
};

export default ResponsiveNavBar;