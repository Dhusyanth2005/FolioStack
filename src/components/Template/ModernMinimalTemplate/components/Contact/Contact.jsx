import React, { useEffect, useRef } from 'react';
import styles from './Contact.module.css';
import { Mail } from 'lucide-react';

const Contact = ({ data, themeColors }) => {
  const sectionRef = useRef(null);

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

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [themeColors]);

  return (
    <section id="contact" className={styles.section} ref={sectionRef}>
      <div className={styles.contentContainer}>
        <h2 className={styles.sectionHeading}>
          <Mail className={styles.headingIcon} />
          Contact
        </h2>
        <div className={styles.contactInfo}>
          {data.email && (
            <p className={styles.contactItem}>
              Email: <a href={`mailto:${data.email}`} className={styles.contactLink}>{data.email}</a>
            </p>
          )}
          {data.phone && (
            <p className={styles.contactItem}>
              Phone: <a href={`tel:${data.phone}`} className={styles.contactLink}>{data.phone}</a>
            </p>
          )}
          {data.location && (
            <p className={styles.contactItem}>Location: {data.location}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;