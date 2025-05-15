import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, Code, Eye, FolderKanban } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Projects.module.css';

const Projects = ({ data, themeColors }) => {
  const sectionRef = useRef(null);
  const projectRefs = useRef([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

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
      { threshold: 0.2 }
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

  // Animation variants for Framer Motion
  const headingVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.7
      }
    }
  };
  
  const iconVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -45 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.2,
        duration: 0.8
      }
    },
    hover: {
      rotate: 15,
      scale: 1.1,
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };
  
  const underlineVariants = {
    hidden: { width: 0 },
    visible: { 
      width: 60,
      transition: {
        delay: 0.3,
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const projectVariants = {
    hidden: { y: 80, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 50,
        mass: 0.8
      }
    }
  };
  
  const imageVariants = {
    hover: { 
      scale: 1.08,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    initial: { 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };
  
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section id="projects" className={styles.section} ref={sectionRef}>
      <motion.div className={styles.sectionIntro}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className={styles.headingWrapper}>
          
            
          
          
          <motion.h2 
            className={styles.sectionHeading}
            variants={headingVariants}
          >
           <FolderKanban size={32} className={styles.headingIcon}/> Projects
            <motion.div 
              className={styles.underline}
              variants={underlineVariants}
            ></motion.div>
          </motion.h2>
        </div>
        
        <motion.p 
          className={styles.sectionSubheading}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Check out some of my latest work and projects.
        </motion.p>
      </motion.div>
      
      <motion.div 
        className={styles.projectsGrid}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {data.projects && data.projects.length > 0 ? (
          data.projects.map((project, index) => (
            <motion.div 
              key={index} 
              className={styles.projectCard}
              variants={projectVariants}
              ref={el => projectRefs.current[index] = el}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileHover={{ y: -10 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={styles.projectImage}>
                <motion.div
                  variants={imageVariants}
                  animate={hoveredIndex === index ? "hover" : "initial"}
                >
                  {project.image ? (
                    <img src={project.image} alt={project.title} />
                  ) : (
                    <div className={styles.placeholderImage}>
                      <Code size={40} />
                    </div>
                  )}
                </motion.div>
                
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.div 
                      className={styles.projectOverlay}
                      variants={overlayVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      <div className={styles.projectActions}>
                        {project.demoLink && (
                          <a 
                            href={project.demoLink} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className={styles.projectActionButton}
                          >
                            <Eye size={16} />
                            <span>Live Demo</span>
                          </a>
                        )}
                        {project.githubLink && (
                          <a 
                            href={project.githubLink} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className={styles.projectActionButton}
                          >
                            <Github size={16} />
                            <span>Source Code</span>
                          </a>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <motion.div className={styles.projectContent}>
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                >
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <div className={styles.projectTags}>
                    {project.tags && project.tags.map((tag, idx) => (
                      <span key={idx} className={styles.projectTag}>{tag}</span>
                    ))}
                  </div>
                  <p className={styles.projectDesc}>{project.description}</p>
                </motion.div>
                
                {project.link && (
                  <motion.a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.projectLink}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: '0 8px 20px rgba(92, 107, 192, 0.4)'
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Project
                    <ExternalLink size={16} className={styles.projectLinkIcon} />
                  </motion.a>
                )}
              </motion.div>
            </motion.div>
          ))
        ) : (
          <motion.p 
            className={styles.noProjects}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            No projects have been added yet.
          </motion.p>
        )}
      </motion.div>
    </section>
  );
};

export default Projects;