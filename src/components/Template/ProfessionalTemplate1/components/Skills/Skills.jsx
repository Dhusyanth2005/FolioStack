import React, { useEffect, useRef, useMemo } from 'react';
import { Code, Database, Globe, Layers, PenTool, Smartphone, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './Skills.module.css';

const Skills = ({ data, themeColors }) => {
  const sectionRef = useRef(null);

  // Memoize skill groups to prevent unnecessary recalculations
  const skillGroups = useMemo(() => {
    if (data.skillGroups && Object.keys(data.skillGroups).length > 0) {
      return data.skillGroups;
    } else if (data.skills && data.skills.length > 0) {
      // Create a default grouping based on common categories
      const defaultGroups = {
        'Frontend Development': [],
        'Backend Development': [],
        'Design': [],
        'Mobile Development': [],
        'Database': [],
        'Other': []
      };
      
      // Simple categorization based on common technologies
      data.skills.forEach(skill => {
        const lowerSkill = typeof skill === 'string' ? skill.toLowerCase() : skill.name.toLowerCase();
        if (['react', 'vue', 'angular', 'html', 'css', 'javascript', 'typescript', 'bootstrap', 'tailwind'].some(tech => lowerSkill.includes(tech))) {
          defaultGroups['Frontend Development'].push(skill);
        } else if (['node', 'express', 'django', 'flask', 'php', 'laravel', 'spring', 'java', 'python', '.net', 'ruby'].some(tech => lowerSkill.includes(tech))) {
          defaultGroups['Backend Development'].push(skill);
        } else if (['photoshop', 'illustrator', 'figma', 'sketch', 'xd', 'design', 'ui', 'ux'].some(tech => lowerSkill.includes(tech))) {
          defaultGroups['Design'].push(skill);
        } else if (['android', 'ios', 'swift', 'kotlin', 'flutter', 'react native'].some(tech => lowerSkill.includes(tech))) {
          defaultGroups['Mobile Development'].push(skill);
        } else if (['sql', 'mongodb', 'firebase', 'mysql', 'postgres', 'oracle', 'dynamodb', 'database'].some(tech => lowerSkill.includes(tech))) {
          defaultGroups['Database'].push(skill);
        } else {
          defaultGroups['Other'].push(skill);
        }
      });
      
      // Remove empty categories
      return Object.fromEntries(Object.entries(defaultGroups).filter(([_, skills]) => skills.length > 0));
    }
    
    return {};
  }, [data.skillGroups, data.skills]);

  // Set CSS variables once on mount and when themeColors changes
  useEffect(() => {
    // Apply theme colors to CSS variables
    if (sectionRef.current) {
      const root = sectionRef.current;
      root.style.setProperty('--primary-color', themeColors.primary);
      root.style.setProperty('--accent-color', themeColors.accent);
      root.style.setProperty('--text-color', themeColors.text);
      root.style.setProperty('--subtext-color', themeColors.subtext);
      root.style.setProperty('--secondary-color', themeColors.secondary);
    }
  }, [themeColors]);

  // Memoize the category icon mapping function
  const getCategoryIcon = useMemo(() => (category) => {
    const lowerCategory = category.toLowerCase();
    if (lowerCategory.includes('frontend')) {
      return <Layers className={styles.categoryIcon} />;
    } else if (lowerCategory.includes('backend')) {
      return <Code className={styles.categoryIcon} />;
    } else if (lowerCategory.includes('design')) {
      return <PenTool className={styles.categoryIcon} />;
    } else if (lowerCategory.includes('mobile')) {
      return <Smartphone className={styles.categoryIcon} />;
    } else if (lowerCategory.includes('database')) {
      return <Database className={styles.categoryIcon} />;
    } else {
      return <Globe className={styles.categoryIcon} />;
    }
  }, []);

  // Utility functions for skill rendering
  const getSkillLevel = (skill) => {
    if (typeof skill === 'object' && skill.level) {
      return (
        <motion.div 
          className={styles.skillLevelContainer}
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div 
            className={styles.skillLevelBar} 
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          ></motion.div>
        </motion.div>
      );
    }
    return null;
  };

  const getSkillName = (skill) => {
    return typeof skill === 'object' ? skill.name : skill;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      } 
    }
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: "easeOut" 
      } 
    }
  };

  const skillCardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        delay: i * 0.05,
        ease: "easeOut"
      } 
    })
  };

  const tagVariants = {
    hidden: { opacity: 0, x: -8 },
    visible: (i) => ({ 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.4, 
        delay: i * 0.03,
        ease: "easeOut"
      } 
    })
  };

  // Icon animation variant
  const iconVariants = {
    initial: { rotateY: 0 },
    animate: { 
      rotateY: 360,
      transition: { 
        duration: 1.5, 
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 5
      }
    }
  };

  return (
    <motion.section
      id="skills"
      className={styles['skills-section']} 
      ref={sectionRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.contentContainer}>
        <div className={styles.headingWrapper}>
          <motion.div 
            className={styles.headingIcon}
            initial="initial"
            animate="animate"
            variants={iconVariants}
          >
            <Cpu size={28} color="var(--accent-color)" strokeWidth={2} />
          </motion.div>
          
          <motion.h2 
            className={styles.sectionHeading}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Technical Skills
            <motion.div 
              className={styles.underline}
              initial={{ width: 0 }}
              whileInView={{ width: "60px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ width: "100%" }}
            ></motion.div>
          </motion.h2>
        </div>
        
        <motion.p 
          className={styles.sectionSubheading}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          A showcase of my technical expertise and professional competencies that I've developed throughout my career.
        </motion.p>
        
        <motion.div 
          className={styles.skillsContainer}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {Object.keys(skillGroups).length > 0 ? (
            Object.entries(skillGroups).map(([category, skills], categoryIndex) => (
              <motion.div 
                key={category} 
                className={styles.skillCategory}
                variants={categoryVariants}
              >
                <motion.div 
                  className={styles.categoryHeader}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {getCategoryIcon(category)}
                  </motion.div>
                  <h3 className={styles.categoryTitle}>{category}</h3>
                </motion.div>
                
                <div className={styles.skillsGrid}>
                  {skills.map((skill, skillIndex) => {
                    const skillName = getSkillName(skill);
                    
                    return (
                      <motion.div 
                        key={`${category}-${skillName}`}
                        className={styles.skillCard}
                        variants={skillCardVariants}
                        custom={skillIndex}
                        whileHover={{ 
                          y: -6, 
                          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
                          transition: { duration: 0.3 }
                        }}
                      >
                        <div className={styles.skillContent}>
                          <motion.h4 
                            className={styles.skillName}
                            whileHover={{ x: 4, color: "var(--accent-color)" }}
                            transition={{ duration: 0.2 }}
                          >
                            {skillName}
                          </motion.h4>
                          {getSkillLevel(skill)}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))
          ) : (
            <motion.p 
              className={styles.noSkills}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              No skills have been added yet.
            </motion.p>
          )}
        </motion.div>
        
        <motion.div 
          className={styles.skillTagsContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {data.skills && data.skills.length > 0 && (
            data.skills.map((skill, index) => {
              const skillName = getSkillName(skill);
              return (
                <motion.span 
                  key={skillName}
                  className={styles.skillTag}
                  variants={tagVariants}
                  custom={index}
                  whileHover={{ 
                    y: -3, 
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
                    transition: { duration: 0.2 }
                  }}
                >
                  {skillName}
                </motion.span>
              );
            })
          )}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Skills;