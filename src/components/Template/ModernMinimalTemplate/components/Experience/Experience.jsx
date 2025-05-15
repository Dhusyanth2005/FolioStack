import React, { useEffect, useRef } from 'react';
import styles from './Experience.module.css';
import { Briefcase } from 'lucide-react';

const Experience = ({ data, themeColors }) => {
  const sectionRef = useRef(null);
  const experienceItemsRef = useRef([]);

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

    // Staggered animation for experience items
    experienceItemsRef.current.forEach((item, index) => {
      if (item) {
        item.style.transitionDelay = `${index * 0.05}s`;
      }
    });

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [themeColors]);

  return (
    <section id="experience" className={styles.section} ref={sectionRef}>
      <div className={styles.contentContainer}>
        <h2 className={styles.sectionHeading}>
          <Briefcase className={styles.headingIcon} />
          Experience
        </h2>
        {data.experiences.map((exp, index) => (
          <div
            key={index}
            className={styles.experienceItem}
            ref={el => experienceItemsRef.current[index] = el}
          >
            <h3 className={styles.title}>{exp.title}</h3>
            <p className={styles.company}>{exp.company}</p>
            <p className={styles.period}>{exp.period}</p>
            <p className={styles.description}>{exp.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;