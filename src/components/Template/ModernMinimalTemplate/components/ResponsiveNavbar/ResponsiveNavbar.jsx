import React, { useState, useEffect } from 'react';
import styles from './ResponsiveNavbar.module.css';
import { Menu, X } from 'lucide-react';

const ResponsiveNavBar = ({ data, themeColors, activeSection, setActiveSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Apply theme colors to CSS variables
    const navbar = document.querySelector(`.${styles.navbar}`);
    if (navbar) {
      navbar.style.setProperty('--primary-color', themeColors.primary);
      navbar.style.setProperty('--accent-color', themeColors.accent);
      navbar.style.setProperty('--text-color', themeColors.text);
      navbar.style.setProperty('--subtext-color', themeColors.subtext);
      navbar.style.setProperty('--secondary-color', themeColors.secondary);
    }
  }, [themeColors]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (section) => {
    setActiveSection(section);
    setIsMenuOpen(false);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = ['hero', 'about', 'skills', 'experience', 'projects', 'education', 'contact'];

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.logo}>{data.fullName}</div>
        <button className={styles.menuButton} onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className={`${styles.navLinks} ${isMenuOpen ? styles.active : ''}`}>
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className={`${styles.navLink} ${activeSection === item ? styles.active : ''}`}
              onClick={() => handleNavClick(item)}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default ResponsiveNavBar;