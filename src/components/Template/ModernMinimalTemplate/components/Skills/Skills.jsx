import React, { useEffect, useRef } from 'react';
import styles from './Skills.module.css';
import { Code } from 'lucide-react';

const Skills = ({ data, themeColors }) => {
  const sectionRef = useRef(null);
  const skillItemsRef = useRef([]);

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

    // Staggered animation for skill items
    skillItemsRef.current.forEach((item, index) => {
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
    <section id="skills" className={styles.section} ref={sectionRef}>
      <div className={styles.contentContainer}>
        <h2 className={styles.sectionHeading}>
          <Code className={styles.headingIcon} />
          Skills
        </h2>
        <div className={styles.skillsList}>
          {data.skills.map((skill, index) => (
            <div
              key={index}
              className={styles.skillItem}
              ref={el => skillItemsRef.current[index] = el}
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;