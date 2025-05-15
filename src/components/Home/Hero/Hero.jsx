import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import styles from './Hero.module.css';

const Hero = () => {
  const heroBgRef = useRef(null);
  const heroRef = useRef(null);
  const browserContentRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorOuterRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Set loaded class after component mounts for animations
    setTimeout(() => {
      setIsLoaded(true);
    }, 200);

    // Background parallax effect
    const moveBg = (e) => {
      if (heroBgRef.current) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        heroBgRef.current.style.transform = `translate(${-x * 20}px, ${-y * 20}px)`;
      }
    };

    // Custom cursor functionality
    const moveCursor = (e) => {
      if (cursorRef.current && cursorOuterRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;

        // Add a slight delay for the outer cursor for a more dynamic effect
        setTimeout(() => {
          cursorOuterRef.current.style.left = `${e.clientX}px`;
          cursorOuterRef.current.style.top = `${e.clientY}px`;
        }, 50);
      }
    };

    // Auto-scroll the portfolio preview
    const scrollPreview = () => {
      if (browserContentRef.current) {
        const content = browserContentRef.current;
        content.style.transform = 'translateY(0)';

        setTimeout(() => {
          content.style.transform = 'translateY(calc(-100% + 450px))';
        }, 2000);
      }
    };

    // Initialize scrolling after component mounts
    const scrollInterval = setInterval(scrollPreview, 15000);
    scrollPreview(); // Initial scroll

    window.addEventListener('mousemove', moveBg);
    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveBg);
      window.removeEventListener('mousemove', moveCursor);
      clearInterval(scrollInterval);
    };
  }, []);

  // Handle "Start Creating" click
  const handleStartCreating = (e) => {
    e.preventDefault(); // Prevent default Link behavior
    const token = localStorage.getItem('token'); // Check for token in localStorage
    if (token) {
      navigate('/dashboard'); // Redirect to dashboard if token exists
    } else {
      navigate('/signup'); // Redirect to create page if no token
    }
  };

  return (
    <section className={`${styles.hero} ${isLoaded ? styles.loaded : ''}`} ref={heroRef}>
      {/* Custom cursor elements */}
      <div className={styles.customCursor} ref={cursorRef}></div>
      <div className={styles.cursorOuter} ref={cursorOuterRef}></div>

      {/* Background elements */}
      <div className={styles.heroBg} ref={heroBgRef}></div>
      <div className={styles.gridLines}></div>

      {/* Floating elements */}
      <div className={styles.floatingCircle} style={{ top: '10%', left: '5%' }}></div>
      <div className={styles.floatingCircle} style={{ top: '60%', left: '15%' }}></div>
      <div className={styles.floatingCircle} style={{ top: '30%', right: '10%' }}></div>

      {/* Particles */}
      <div className={styles.particles}>
        {[...Array(15)].map((_, i) => (
          <div key={i} className={styles.particle}></div>
        ))}
      </div>

      {/* Main content */}
      <div className={`${styles.heroContent} ${styles.fadeInLeft}`}>
        <h1 className={styles.heroTitle}>
          <span>Create Your</span>
          <br />
          <span className={styles.gradient}> Professional Portfolio</span>
          <br />
          <span>in Minutes</span>
        </h1>
        <p className={`${styles.heroSubtitle} ${styles.fadeInUp}`}>
          Choose from beautiful templates, customize with your content, and publish
          your portfolio with just one click. Showcase your work to the world with
          a personalized URL.
        </p>
        <div className={`${styles.heroCta} ${styles.fadeInUp}`} style={{ animationDelay: '0.2s' }}>
          {/* Replace Link with button or div for custom navigation */}
          <button onClick={handleStartCreating} className={styles.primaryBtn}>
            <span>Start Creating</span>
            <span className={styles.btnShine}></span>
          </button>
          <Link to="/signup" className={styles.secondaryBtn}>
            View Examples
            <svg className={styles.arrowIcon} viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>

        <div className={`${styles.heroStats} ${styles.fadeInUp}`} style={{ animationDelay: '0.4s' }}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>25+</span>
            <span className={styles.statLabel}>Beautiful Templates</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>5K+</span>
            <span className={styles.statLabel}>Happy Users</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>100%</span>
            <span className={styles.statLabel}>Customizable</span>
          </div>
        </div>
      </div>

      {/* Portfolio Preview */}
      <div className={`${styles.heroPreview} ${styles.fadeInRight}`}>
        <div className={styles.glow}></div>
        <div className={styles.browser}>
          <div className={styles.browserHeader}>
            <div className={styles.browserDots}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className={styles.browserAddress}>
              <span className={styles.httpsIcon}>
                <svg width="12" height="12" viewBox="0 0 24 24">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </span>
              yourname.portfoliobuilder.com
            </div>
          </div>
          <div className={styles.browserContent}>
            <div className={styles.portfolioModel} ref={browserContentRef}>
              <div className={styles.portfolioHeader}>
                <div className={styles.portfolioLogo}>DevFolio</div>
                <div className={styles.portfolioNav}>
                  <span className={styles.active}>Home</span>
                  <span>Projects</span>
                  <span>Skills</span>
                  <span>Contact</span>
                </div>
              </div>
              <div className={styles.portfolioHero}>
                <div className={styles.portfolioProfile}>
                  <div className={styles.portfolioAvatar}></div>
                  <h2>Alex Johnson</h2>
                  <p>Full Stack Developer & UI/UX Designer</p>
                </div>
              </div>
              <div className={styles.portfolioSection}>
                <h3>Featured Projects</h3>
                <div className={styles.portfolioGrid}>
                  <div
                    className={styles.portfolioItem}
                    style={{ backgroundImage: 'linear-gradient(45deg, var(--primary-green), var(--deep-blue))' }}
                  ></div>
                  <div
                    className={styles.portfolioItem}
                    style={{ backgroundImage: 'linear-gradient(45deg, var(--accent-purple), var(--deep-blue))' }}
                  ></div>
                  <div
                    className={styles.portfolioItem}
                    style={{ backgroundImage: 'linear-gradient(45deg, var(--secondary-teal), var(--primary-green))' }}
                  ></div>
                  <div
                    className={styles.portfolioItem}
                    style={{ backgroundImage: 'linear-gradient(45deg, var(--deep-blue), var(--accent-purple))' }}
                  ></div>
                </div>
              </div>
              <div className={styles.portfolioSection}>
                <h3>Skills & Expertise</h3>
                <div className={styles.skillsGrid}>
                  <div className={styles.skillBar}>
                    <span style={{ width: '95%' }}>React.js</span>
                  </div>
                  <div className={styles.skillBar}>
                    <span style={{ width: '85%' }}>Node.js</span>
                  </div>
                  <div className={styles.skillBar}>
                    <span style={{ width: '90%' }}>UI/UX Design</span>
                  </div>
                  <div className={styles.skillBar}>
                    <span style={{ width: '80%' }}>GraphQL</span>
                  </div>
                </div>
              </div>
              <div className={styles.portfolioSection}>
                <h3>Testimonials</h3>
                <div className={styles.testimonial}>
                  <p>
                    "Alex delivered an exceptional website that exceeded our expectations. His attention to detail and
                    creative approach transformed our vision into reality."
                  </p>
                  <div className={styles.testimonialAuthor}>— Sarah Williams, CEO at TechStart</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.reflection}></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;