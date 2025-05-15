import React, { useEffect, useRef } from 'react';
import styles from './Education.module.css';
import { GraduationCap } from 'lucide-react';

const Education = ({ data, themeColors }) => {
  const sectionRef = useRef(null);
  const educationItemsRef = useRef([]);

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

    // Staggered animation for education items
    educationItemsRef.current.forEach((item, index) => {
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
    <section id="education" className={styles.section} ref={sectionRef}>
      <div className={styles.contentContainer}>
        <h2 className={styles.sectionHeading}>
          <GraduationCap className={styles.headingIcon} />
          Education
        </h2>
        {data.education.map((edu, index) => (
          <div
            key={index}
            className={styles.educationItem}
            ref={el => educationItemsRef.current[index] = el}
          >
            <h3 className={styles.degree}>{edu.degree}</h3>
            <p className={styles.institution}>{edu.institution}</p>
            <p className={styles.year}>{edu.year}</p>
            {edu.description && <p className={styles.description}>{edu.description}</p>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;