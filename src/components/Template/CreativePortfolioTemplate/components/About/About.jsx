import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import styles from './About.module.css';

export default function About({ data, themeColors, registerSection }) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (sectionRef.current) {
      registerSection(sectionRef.current);
      
      sectionRef.current.style.setProperty('--primary-color', themeColors.primary);
      sectionRef.current.style.setProperty('--secondary-color', themeColors.secondary);
      sectionRef.current.style.setProperty('--accent-color', themeColors.accent);
      sectionRef.current.style.setProperty('--text-color', themeColors.text);
      sectionRef.current.style.setProperty('--subtext-color', themeColors.subtext);
    }
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
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
  }, [registerSection, themeColors]);
  
  return (
    <section 
      ref={sectionRef} 
      id="about" 
      className={`${styles.about} ${isVisible ? styles.visible : ''}`}
    >
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            About <span className={styles.highlight}>Me</span>
          </h2>
          <div className={styles.underline}></div>
        </div>
        
        <div className={styles.content}>
          <div className={styles.info}>
            <div className={styles.bioWrapper}>
              <p className={styles.bio}>{data.bio}</p>
              <p className={styles.bioExtended}>
                I am passionate about creating elegant solutions to complex problems through code. 
                With a focus on user experience and clean architecture, I strive to build applications 
                that are not only functional but also intuitive and enjoyable to use.
              </p>
            </div>
            
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className={styles.contactLabel}>Email</h4>
                  <p className={styles.contactValue}>{data.email}</p>
                </div>
              </div>
              
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className={styles.contactLabel}>Phone</h4>
                  <p className={styles.contactValue}>{data.phone}</p>
                </div>
              </div>
              
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className={styles.contactLabel}>Location</h4>
                  <p className={styles.contactValue}>{data.location}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.stats}>
            <div className={styles.statsItem}>
              <div className={styles.statsNumber}>5+</div>
              <div className={styles.statsLabel}>Years Experience</div>
            </div>
            
            <div className={styles.statsItem}>
              <div className={styles.statsNumber}>50+</div>
              <div className={styles.statsLabel}>Projects Completed</div>
            </div>
            
            <div className={styles.statsItem}>
              <div className={styles.statsNumber}>20+</div>
              <div className={styles.statsLabel}>Happy Clients</div>
            </div>
            
            <div className={styles.statsItem}>
              <div className={styles.statsNumber}>10+</div>
              <div className={styles.statsLabel}>Awards Received</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}