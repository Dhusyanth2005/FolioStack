import React, { useEffect, useRef } from 'react';
import styles from './About.module.css';
import { User } from 'lucide-react';

const About = ({ data, themeColors }) => {
  const sectionRef = useRef(null);
  const infoItemsRef = useRef([]);

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

    // Staggered animation for info items
    infoItemsRef.current.forEach((item, index) => {
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
    <section id="about" className={styles.section} ref={sectionRef}>
      <div className={styles.contentContainer}>
        <h2 className={styles.sectionHeading}>
          <User className={styles.headingIcon} />
          About
        </h2>
        <p className={styles.bio}>{data.bio}</p>
        <div className={styles.infoContainer}>
          {[
            { label: 'Name', value: data.fullName },
            { label: 'Email', value: data.email },
            { label: 'Phone', value: data.phone },
            { label: 'Location', value: data.location },
          ].filter(item => item.value).map((item, index) => (
            <div
              key={index}
              className={styles.infoItem}
              ref={el => infoItemsRef.current[index] = el}
            >
              <span className={styles.infoLabel}>{item.label}</span>
              <span className={styles.infoValue}>{item.value}</span>
            </div>
          ))}
        </div>
        {data.achievements && data.achievements.length > 0 && (
          <div className={styles.achievementsContainer}>
            <h3 className={styles.achievementsHeading}>Key Achievements</h3>
            <ul className={styles.achievementsList}>
              {data.achievements.map((achievement, index) => (
                <li key={index} className={styles.achievementItem}>
                  {achievement.title} ({achievement.year}) - {achievement.description}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default About;