import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, Globe, MessageCircle, Contact as ContactIcon } from 'lucide-react';
import styles from './Contact.module.css';

const Contact = ({ data, themeColors }) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const socialVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: item => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: item * 0.1,
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    })
  };

  // Set CSS variables for theming
  const cssVariables = {
    '--primary-color': themeColors.primary,
    '--secondary-color': themeColors.secondary,
    '--accent-color': themeColors.accent,
    '--text-color': themeColors.text,
    '--subtext-color': themeColors.subtext,
  };

  return (
    <section id="contact" className={styles.section} style={cssVariables}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.h2 className={styles.sectionHeading} variants={itemVariants}>
          <motion.span 
            className={styles.sectionHeadingIcon}
            animate={{ rotate: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          >
            <ContactIcon size={32} />
          </motion.span>
          Contact
          <div className={styles.underline}></div>
        </motion.h2>
        
        <motion.p className={styles.sectionSubheading} variants={itemVariants}>
          Let's get in touch! Here's how you can reach me.
        </motion.p>
        
        <div className={styles.contactContainer}>
          <motion.div className={styles.contactInfo} variants={containerVariants}>
            {data.email && (
              <motion.div 
                className={styles.contactCard}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className={styles.contactIcon}>
                  <Mail size={20} />
                </div>
                <div className={styles.contactDetails}>
                  <span className={styles.contactTitle}>Email</span>
                  <span className={styles.contactValue}>{data.email}</span>
                </div>
              </motion.div>
            )}
            
            {data.phone && (
              <motion.div 
                className={styles.contactCard}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className={styles.contactIcon}>
                  <Phone size={20} />
                </div>
                <div className={styles.contactDetails}>
                  <span className={styles.contactTitle}>Phone</span>
                  <span className={styles.contactValue}>{data.phone}</span>
                </div>
              </motion.div>
            )}
            
            {data.location && (
              <motion.div 
                className={styles.contactCard}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className={styles.contactIcon}>
                  <MapPin size={20} />
                </div>
                <div className={styles.contactDetails}>
                  <span className={styles.contactTitle}>Location</span>
                  <span className={styles.contactValue}>{data.location}</span>
                </div>
              </motion.div>
            )}
            
            <motion.div className={styles.socialLinks} variants={containerVariants}>
              {data.socialLinks?.linkedin && (
                <motion.a 
                  href={data.socialLinks.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  custom={0}
                  variants={socialVariants}
                  whileHover={{ 
                    scale: 1.1, 
                    backgroundColor: themeColors.accent,
                    color: '#fff'
                  }}
                >
                  <Linkedin size={20} />
                </motion.a>
              )}
              
              {data.socialLinks?.github && (
                <motion.a 
                  href={data.socialLinks.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  custom={1}
                  variants={socialVariants}
                  whileHover={{ 
                    scale: 1.1, 
                    backgroundColor: themeColors.accent,
                    color: '#fff'
                  }}
                >
                  <Github size={20} />
                </motion.a>
              )}
              
              {data.socialLinks?.twitter && (
                <motion.a 
                  href={data.socialLinks.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  custom={2}
                  variants={socialVariants}
                  whileHover={{ 
                    scale: 1.1, 
                    backgroundColor: themeColors.accent,
                    color: '#fff'
                  }}
                >
                  <Twitter size={20} />
                </motion.a>
              )}
              
              {data.socialLinks?.portfolio && (
                <motion.a 
                  href={data.socialLinks.portfolio} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  custom={3}
                  variants={socialVariants}
                  whileHover={{ 
                    scale: 1.1, 
                    backgroundColor: themeColors.accent,
                    color: '#fff'
                  }}
                >
                  <Globe size={20} />
                </motion.a>
              )}
            </motion.div>
          </motion.div>
          
          <motion.div 
            className={styles.contactForm}
            variants={itemVariants}
          >
            <form>
              <motion.div 
                className={styles.formGroup}
                variants={itemVariants}
              >
                <label className={styles.formLabel}>Name</label>
                <motion.input 
                  type="text" 
                  placeholder="Your Name" 
                  className={styles.formInput}
                  whileFocus={{ borderColor: themeColors.accent }} 
                />
              </motion.div>
              
              <motion.div 
                className={styles.formGroup}
                variants={itemVariants}
              >
                <label className={styles.formLabel}>Email</label>
                <motion.input 
                  type="email" 
                  placeholder="Your Email" 
                  className={styles.formInput}
                  whileFocus={{ borderColor: themeColors.accent }} 
                />
              </motion.div>
              
              <motion.div 
                className={styles.formGroup}
                variants={itemVariants}
              >
                <label className={styles.formLabel}>Subject</label>
                <motion.input 
                  type="text" 
                  placeholder="Subject" 
                  className={styles.formInput}
                  whileFocus={{ borderColor: themeColors.accent }} 
                />
              </motion.div>
              
              <motion.div 
                className={styles.formGroup}
                variants={itemVariants}
              >
                <label className={styles.formLabel}>Message</label>
                <motion.textarea 
                  placeholder="Your Message" 
                  className={styles.formTextarea}
                  whileFocus={{ borderColor: themeColors.accent }}
                ></motion.textarea>
              </motion.div>
              
              <motion.button 
                type="submit" 
                className={styles.formButton}
                variants={itemVariants}
                whileHover={{ opacity: 0.9 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;