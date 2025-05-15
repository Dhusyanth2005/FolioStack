import React, { useEffect, useRef } from 'react';
import { 
  Briefcase, 
  Calendar, 
  Building, 
  Award, 
  ArrowRight, 
  ChevronRight 
} from 'lucide-react';
import styles from './Experience.module.css';

const Experience = ({ data, themeColors }) => {
  const sectionRef = useRef(null);
  const timelineItemsRef = useRef([]);
  const mobileItemsRef = useRef([]);

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

    // Staggered animation for timeline items
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.cardVisible);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    timelineItemsRef.current.forEach((item) => {
      if (item) cardObserver.observe(item);
    });

    mobileItemsRef.current.forEach((item) => {
      if (item) cardObserver.observe(item);
    });

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      
      timelineItemsRef.current.forEach((item) => {
        if (item) cardObserver.unobserve(item);
      });
      
      mobileItemsRef.current.forEach((item) => {
        if (item) cardObserver.unobserve(item);
      });
    };
  }, [themeColors]);

  return (
    <section id="experience" className={styles.section} ref={sectionRef}>
      <div className={styles.contentContainer}>
        <h2 className={styles.sectionHeading}>
          <Briefcase className={styles.headingIcon} size={32} />
          Experience
          <div className={styles.underline}></div>
        </h2>
        <p className={styles.sectionSubheading}>
          My professional journey and work experience.
        </p>
        
        {/* Desktop Timeline View */}
        <div className={styles.timelineContainer}>
          <div className={styles.timelineLine}>
            <div className={styles.timelineProgress}></div>
          </div>
          
          {data.experiences && data.experiences.length > 0 ? (
            data.experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              return (
                <div 
                  key={index}
                  ref={(el) => (timelineItemsRef.current[index] = el)}
                  className={`${styles.experienceCard} ${isEven ? styles.experienceCardLeft : styles.experienceCardRight}`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className={`${styles.experienceDot} ${isEven ? styles.experienceDotLeft : styles.experienceDotRight}`}>
                    {index === 0 && <div className={styles.currentJobPulse}></div>}
                  </div>
                  
                  <div className={styles.experienceHeader}>
                    <div className={styles.experienceDate}>
                      <Calendar size={16} className={styles.experienceIcon} />
                      {exp.period}
                    </div>
                    <div className={styles.experienceCompany}>
                      <Building size={16} className={styles.experienceIcon} />
                      {exp.company}
                    </div>
                  </div>
                  
                  <h3 className={styles.experienceTitle}>
                    <ChevronRight size={20} className={styles.titleIcon} />
                    {exp.title}
                  </h3>
                  
                  <div className={styles.experienceContentWrapper}>
                    <p className={styles.experienceDesc}>{exp.description}</p>
                    
                    {exp.achievements && exp.achievements.length > 0 && (
                      <div className={styles.achievementsList}>
                        <div className={styles.achievementsTitle}>
                          <Award size={16} className={styles.achievementIcon} />
                          Key Achievements
                        </div>
                        <ul>
                          {exp.achievements.map((achievement, i) => (
                            <li key={i}>
                              <ArrowRight size={14} className={styles.listIcon} />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {exp.skills && exp.skills.length > 0 && (
                      <div className={styles.skillTags}>
                        {exp.skills.map((skill, i) => (
                          <span key={i} className={styles.skillTag}>{skill}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p className={styles.emptyState}>
              No experience entries have been added yet.
            </p>
          )}
        </div>
        
        {/* Mobile List View */}
        <div className={styles.mobileExperienceList}>
          {data.experiences && data.experiences.length > 0 && (
            data.experiences.map((exp, index) => (
              <div 
                key={index} 
                ref={(el) => (mobileItemsRef.current[index] = el)}
                className={styles.mobileExperienceCard}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className={styles.mobileCardHeader}>
                  <div className={styles.experienceDate}>
                    <Calendar size={16} className={styles.experienceIcon} />
                    {exp.period}
                  </div>
                  <div className={styles.experienceCompany}>
                    <Building size={16} className={styles.experienceIcon} />
                    {exp.company}
                  </div>
                </div>
                
                <h3 className={styles.experienceTitle}>
                  <ChevronRight size={20} className={styles.titleIcon} />
                  {exp.title}
                </h3>
                
                <div className={styles.experienceContentWrapper}>
                  <p className={styles.experienceDesc}>{exp.description}</p>
                  
                  {exp.achievements && exp.achievements.length > 0 && (
                    <div className={styles.achievementsList}>
                      <div className={styles.achievementsTitle}>
                        <Award size={16} className={styles.achievementIcon} />
                        Key Achievements
                      </div>
                      <ul>
                        {exp.achievements.map((achievement, i) => (
                          <li key={i}>
                            <ArrowRight size={14} className={styles.listIcon} />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {exp.skills && exp.skills.length > 0 && (
                    <div className={styles.skillTags}>
                      {exp.skills.map((skill, i) => (
                        <span key={i} className={styles.skillTag}>{skill}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Experience;