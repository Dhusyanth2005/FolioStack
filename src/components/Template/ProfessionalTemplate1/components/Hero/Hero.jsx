import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Send, Linkedin, Github, Twitter } from 'lucide-react';
import styles from './Hero.module.css';

const Hero = ({ data, themeColors }) => {
  const heroRef = useRef(null);
  const [imageError, setImageError] = useState(false); // Track image loading errors

  useEffect(() => {
    // Set CSS variables for theme colors
    if (heroRef.current) {
      const root = heroRef.current;
      root.style.setProperty('--primary-color', themeColors.primary);
      root.style.setProperty('--accent-color', themeColors.accent);
      root.style.setProperty('--text-color', themeColors.text);
      root.style.setProperty('--subtext-color', themeColors.subtext);
      root.style.setProperty('--secondary-color', themeColors.secondary);

      // Extract RGB values for animations
      const getColorRGB = (hexColor) => {
        const r = parseInt(hexColor.slice(1, 3), 16);
        const g = parseInt(hexColor.slice(3, 5), 16);
        const b = parseInt(hexColor.slice(5, 7), 16);
        return `${r}, ${g}, ${b}`;
      };

      if (themeColors.accent.startsWith('#')) {
        root.style.setProperty('--accent-rgb', getColorRGB(themeColors.accent));
      }
    }
  }, [themeColors]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 80,
        delay: 0.5,
        damping: 15,
      },
    },
    hover: {
      y: -10,
      scale: 1.03,
      boxShadow: `0 25px 50px ${themeColors.accent}70, 0 10px 25px rgba(0,0,0,0.3)`,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 15,
      },
    },
  };

  const buttonHoverEffect = {
    scale: 1.05,
    y: -5,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10,
    },
  };

  const socialIconVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 12,
      },
    },
    hover: {
      scale: 1.15,
      y: -8,
      rotate: 10,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 8,
      },
    },
  };

  const bgBlobVariants = {
    animate: {
      scale: [1, 1.05, 1.1, 1.05, 1],
      x: [0, -15, -30, -15, 0],
      y: [0, 15, 30, 15, 0],
      opacity: [0.6, 0.7, 0.8, 0.7, 0.6],
      transition: {
        duration: 8,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'reverse',
      },
    },
  };

  // Handle image load errors
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <section ref={heroRef} className={styles.hero}>
      <motion.div
        className={styles.heroBg}
        style={{
          background: `radial-gradient(circle, ${themeColors.accent}30 0%, ${themeColors.accent}10 70%, transparent 100%)`,
        }}
        variants={bgBlobVariants}
        animate="animate"
      />

      <motion.div
        className={styles.heroContent}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.span
          className={styles.greeting}
          style={{ color: themeColors.accent }}
          variants={itemVariants}
        >
          Hello, I'm
        </motion.span>

        <motion.h1
          className={styles.name}
          style={{
            backgroundImage: `linear-gradient(135deg, ${themeColors.text} 0%, ${themeColors.accent} 100%)`,
          }}
          variants={itemVariants}
        >
          {data.fullName}
        </motion.h1>

        <motion.h2
          className={styles.profession}
          style={{ color: themeColors.subtext }}
          variants={itemVariants}
        >
          {data.profession}
        </motion.h2>

        <motion.p
          className={styles.bio}
          style={{ color: themeColors.subtext }}
          variants={itemVariants}
        >
          {data.bio}
        </motion.p>

        <motion.div className={styles.ctaButtons} variants={itemVariants}>
          <motion.button
            className={styles.primaryButton}
            style={{
              backgroundColor: themeColors.accent,
              color: '#fff',
              boxShadow: `0 4px 15px ${themeColors.accent}50`,
            }}
            whileHover={buttonHoverEffect}
            whileTap={{ scale: 0.98 }}
          >
            Download Resume
            <Download className={styles.buttonIcon} size={18} />
          </motion.button>

          <motion.a
            href="#contact"
            className={styles.secondaryButton}
            style={{
              color: themeColors.text,
              border: `2px solid ${themeColors.accent}`,
            }}
            whileHover={{
              ...buttonHoverEffect,
              color: themeColors.accent,
              boxShadow: `0 8px 20px ${themeColors.accent}20`,
            }}
            whileTap={{ scale: 0.98 }}
          >
            Contact Me
            <Send className={styles.buttonIcon} size={18} />
            <motion.div
              className={styles.secondaryButtonUnderline}
              style={{ background: themeColors.accent }}
              initial={{ width: 0 }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
        </motion.div>

        <motion.div className={styles.socialIcons} variants={itemVariants}>
          {data.socialLinks?.linkedin && (
            <motion.a
              href={data.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              variants={socialIconVariants}
              whileHover="hover"
            >
              <motion.div
                className={styles.socialIcon}
                style={{
                  backgroundColor: themeColors.secondary,
                  color: themeColors.accent,
                }}
              >
                <Linkedin size={22} />
              </motion.div>
            </motion.a>
          )}

          {data.socialLinks?.github && (
            <motion.a
              href={data.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              variants={socialIconVariants}
              whileHover="hover"
            >
              <motion.div
                className={styles.socialIcon}
                style={{
                  backgroundColor: themeColors.secondary,
                  color: themeColors.accent,
                }}
              >
                <Github size={22} />
              </motion.div>
            </motion.a>
          )}

          {data.socialLinks?.twitter && (
            <motion.a
              href={data.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              variants={socialIconVariants}
              whileHover="hover"
            >
              <motion.div
                className={styles.socialIcon}
                style={{
                  backgroundColor: themeColors.secondary,
                  color: themeColors.accent,
                }}
              >
                <Twitter size={22} />
              </motion.div>
            </motion.a>
          )}
        </motion.div>
      </motion.div>

      <motion.div
        className={styles.heroImage}
        style={{
          boxShadow: `0 15px 40px ${themeColors.accent}40, 0 5px 15px rgba(0,0,0,0.2)`,
        }}
        variants={imageVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
      >
        <img
          src={imageError || !data.profileImage ? '/assets/images/default-profile.png' : data.profileImage}
          alt={`${data.fullName}'s profile`}
          className={styles.profileImage}
          onError={handleImageError}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: 'inherit',
          }}
        />
        <motion.div
          className={styles.imageOverlay}
          style={{
            background: `linear-gradient(45deg, ${themeColors.accent}40 0%, transparent 100%)`,
          }}
          whileHover={{ opacity: 0.7 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;