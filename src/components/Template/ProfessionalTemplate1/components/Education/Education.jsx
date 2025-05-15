import React, { useEffect, useRef } from 'react';
import { GraduationCap, BookOpen, Award, Calendar } from 'lucide-react';
import styles from './Education.module.css';

const Education = ({ data, themeColors }) => {
  const sectionRef = useRef(null);
  const educationCardsRef = useRef([]);

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
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      sectionObserver.observe(sectionRef.current);
    }

    // Staggered animation for education cards
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.cardVisible);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    educationCardsRef.current.forEach((card, index) => {
      if (card) {
        card.style.transitionDelay = `${index * 0.15}s`;
        cardObserver.observe(card);
      }
    });

    return () => {
      if (sectionRef.current) {
        sectionObserver.unobserve(sectionRef.current);
      }
      educationCardsRef.current.forEach((card) => {
        if (card) cardObserver.unobserve(card);
      });
    };
  }, [themeColors]);

  // Function to get the appropriate icon based on degree
  const getDegreeIcon = (degree) => {
    const lowerDegree = degree.toLowerCase();
    if (lowerDegree.includes('master')) return <GraduationCap size={24} />;
    if (lowerDegree.includes('bachelor')) return <BookOpen size={24} />;
    if (lowerDegree.includes('phd')) return <Award size={24} />;
    return <GraduationCap size={24} />; // Default
  };

  return (
    <section id="education" className={styles.educationSection} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionHeading}>
            Education
            <div className={styles.underline}></div>
          </h2>
          <p className={styles.sectionSubheading}>
            My academic background and qualifications.
          </p>
        </div>
        
        <div className={styles.educationList}>
          {data.education && data.education.length > 0 ? (
            data.education.map((edu, index) => (
              <div 
                key={index} 
                className={styles.educationCard}
                ref={el => educationCardsRef.current[index] = el}
              >
                <div className={styles.educationIcon}>
                  {getDegreeIcon(edu.degree)}
                </div>
                <div className={styles.educationContent}>
                  <h3 className={styles.educationDegree}>{edu.degree}</h3>
                  <h4 className={styles.educationInstitution}>{edu.institution}</h4>
                  <div className={styles.educationYear}>
                    <Calendar size={16} className={styles.yearIcon} />
                    {edu.year}
                  </div>
                  {edu.description && (
                    <p className={styles.educationDesc}>{edu.description}</p>
                  )}
                </div>
                {index === 0 && (
                  <div className={styles.educationBadge}>
                    Latest
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className={styles.noEducation}>
              No education entries have been added yet.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Education;