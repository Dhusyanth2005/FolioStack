import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import styles from './Header.module.css';

const Header = () => {
  // Initialize authentication state directly during component creation
  // This prevents the auth buttons flash during initial render
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // This function runs only once during initial render
    return !!localStorage.getItem('token');
  });
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false); // Close mobile menu after clicking
    }
  };
  
  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    // You might want to redirect to home or login page after logout
    // history.push('/') or similar depending on your routing setup
  };
  
  // Adding a conditional rendering wrapper to prevent rendering until hydration is complete
  // This fully eliminates the flash of incorrect UI
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to="/">
            <span className={styles.logoText}>Folio<span>Stack</span></span>
          </Link>
        </div>
        
        <div className={`${styles.menuToggle} ${menuOpen ? styles.active : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        
        <nav className={`${styles.nav} ${menuOpen ? styles.active : ''}`}>
          <ul className={styles.navList}>
            <li><Link to="/" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }} className={styles.navLink}>Home</Link></li>
            <li><Link to="/" onClick={(e) => { e.preventDefault(); scrollToSection('features'); }} className={styles.navLink}>Features</Link></li>
            <li><Link to="/" onClick={(e) => { e.preventDefault(); scrollToSection('how-it-works'); }} className={styles.navLink}>How It Works</Link></li>
            <li><Link to="/" onClick={(e) => { e.preventDefault(); scrollToSection('templates'); }} className={styles.navLink}>Templates</Link></li>
          </ul>
          <div className={styles.authButtons}>
            {isClient && (
              isAuthenticated ? (
                <button onClick={handleLogout} className={styles.logoutBtn}>
                  <LogOut size={20} />
                </button>
              ) : (
                <>
                  <Link to="/login" className={styles.loginBtn}>Login</Link>
                  <Link to="/signup" className={styles.signupBtn}>Sign Up</Link>
                </>
              )
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;