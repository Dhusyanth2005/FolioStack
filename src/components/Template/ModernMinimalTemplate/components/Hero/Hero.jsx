import React, { useEffect, useRef } from 'react';
import styles from './Hero.module.css';

const Hero = ({ data, themeColors }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    // Apply theme colors to CSS variables
    if (sectionRef.current) {
      sectionRef.current.style.setProperty('--primary-color', themeColors.primary);
      sectionRef.current.style.setProperty('--accent-color', themeColors.accent);
      sectionRef.current.style.setProperty('--text-color', themeColors.text);
      sectionRef.current.style.setProperty('--subtext-color', themeColors.subtext);
      sectionRef.current.style.setProperty('--secondary-color', themeColors.secondary);
    }

    // Animation for section entry
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [themeColors]);

  return (
    <section id="hero" className={styles.section} ref={sectionRef}>
      <div className={styles.contentContainer}>
        <h1 className={styles.title}>{data.fullName}</h1>
        <h2 className={styles.subtitle}>{data.profession}</h2>
        <p className={styles.bio}>{data.bio}</p>
      </div>
    </section>
  );
};

export default Hero;