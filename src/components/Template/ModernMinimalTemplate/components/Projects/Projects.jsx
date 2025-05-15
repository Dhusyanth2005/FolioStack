import React, { useEffect, useRef } from 'react';
import styles from './Projects.module.css';
import { Folder } from 'lucide-react';

const Projects = ({ data, themeColors }) => {
  const sectionRef = useRef(null);
  const projectItemsRef = useRef([]);

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

    // Staggered animation for project items
    projectItemsRef.current.forEach((item, index) => {
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
    <section id="projects" className={styles.section} ref={sectionRef}>
      <div className={styles.contentContainer}>
        <h2 className={styles.sectionHeading}>
          <Folder className={styles.headingIcon} />
          Projects
        </h2>
        <div className={styles.projectsGrid}>
          {data.projects.map((project, index) => (
            <div
              key={index}
              className={styles.projectCard}
              ref={el => projectItemsRef.current[index] = el}
            >
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.projectDescription}>{project.description}</p>
              {project.link && (
                <a
                  href={project.link}
                  className={styles.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Project
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;