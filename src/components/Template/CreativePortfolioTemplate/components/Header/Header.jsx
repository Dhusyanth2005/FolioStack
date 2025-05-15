import React, { useState, useEffect } from 'react';
import { animated } from 'react-spring/web';
import { Menu, X } from 'lucide-react';
import styles from './Header.module.css';

const Header = ({ 
  data, 
  themeColors, 
  activeSection, 
  scrollToSection,
  menuOpen,
  setMenuOpen,
  menuAnimation,
  iconColor
}) => {
  const [scrolled, setScrolled] = useState(false);
  const sectionRef = React.useRef(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.style.setProperty('--primary-color', themeColors.primary);
      sectionRef.current.style.setProperty('--secondary-color', themeColors.secondary);
      sectionRef.current.style.setProperty('--accent-color', themeColors.accent);
      sectionRef.current.style.setProperty('--accent-gradient', themeColors.accentGradient);
      sectionRef.current.style.setProperty('--text-color', themeColors.text);
      sectionRef.current.style.setProperty('--subtext-color', themeColors.subtext);
      sectionRef.current.style.setProperty('--glass-effect', themeColors.glassEffect);
      sectionRef.current.style.setProperty('--border-color', themeColors.borderColor);
      sectionRef.current.style.setProperty('--shadow', themeColors.shadow);
      sectionRef.current.style.setProperty('--icon-color', iconColor);
    }
  }, [themeColors, iconColor]);
  
  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header 
      className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
      ref={sectionRef}
    >
      <div className={styles.headerContent}>
        <div className={styles.logo}>
          <h1 className={styles.logoText}>
            <span className={styles.logoMainText}>{data.fullName.split(' ')[0]}</span>
            <span className={styles.logoLastName}>{data.fullName.split(' ').slice(1).join(' ')}</span>
          </h1>
        </div>
        
        <nav className={styles.desktopNav}>
          <ul className={styles.navItems}>
            {navItems.map(item => (
              <li key={item.id} className={styles.navItem}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`${styles.navLink} ${activeSection === item.id ? styles.active : ''}`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        <button 
          className={styles.menuToggle}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation Menu */}
      <animated.div 
        style={menuAnimation} 
        className={styles.mobileMenu}
      >
        <nav className={styles.mobileNav}>
          <ul className={styles.mobileNavItems}>
            {navItems.map(item => (
              <li key={item.id} className={styles.mobileNavItem}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`${styles.mobileNavLink} ${activeSection === item.id ? styles.mobileActive : ''}`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </animated.div>
    </header>
  );
};

export default Header;