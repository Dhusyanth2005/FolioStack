import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import styles from './Hero.module.css';

// Register SplitText plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText);
}

const Hero = ({ data, themeColors, iconColor }) => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);
  
  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.style.setProperty('--primary-color', themeColors.primary);
      sectionRef.current.style.setProperty('--secondary-color', themeColors.secondary);
      sectionRef.current.style.setProperty('--accent-color', themeColors.accent);
      sectionRef.current.style.setProperty('--accent-gradient', themeColors.accentGradient);
      sectionRef.current.style.setProperty('--text-color', themeColors.text);
      sectionRef.current.style.setProperty('--subtext-color', themeColors.subtext);
      sectionRef.current.style.setProperty('--shadow', themeColors.shadow);
      sectionRef.current.style.setProperty('--icon-color', iconColor);
    }
  }, [themeColors, iconColor]);
  
  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;
    
    // Split text animation
    let splitHeading, splitSubheading, splitDescription;
    
    if (headingRef.current && subheadingRef.current && descriptionRef.current) {
      // Create split text instances
      splitHeading = new SplitText(headingRef.current, { type: "chars, words" });
      splitSubheading = new SplitText(subheadingRef.current, { type: "chars" });
      splitDescription = new SplitText(descriptionRef.current, { type: "lines" });
      
      // Create timeline
      const tl = gsap.timeline();
      
      // Animate heading
      tl.from(splitHeading.chars, {
        opacity: 0,
        y: 50,
        rotationX: -90,
        stagger: 0.02,
        duration: 0.8,
        ease: "back.out(1.7)"
      });
      
      // Animate subheading
      tl.from(splitSubheading.chars, {
        opacity: 0,
        y: 20,
        stagger: 0.01,
        duration: 0.4,
        ease: "power2.out"
      }, "-=0.4");
      
      // Animate description
      tl.from(splitDescription.lines, {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.2");
      
      // Animate button
      tl.from(buttonRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.3");
      
      // Cleanup
      return () => {
        if (splitHeading) splitHeading.revert();
        if (splitSubheading) splitSubheading.revert();
        if (splitDescription) splitDescription.revert();
        tl.kill();
      };
    }
  }, []);

  const handleScrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      window.scrollTo({
        top: contactSection.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={styles.hero} ref={sectionRef}>
      <div className={styles.heroBackground}>
        <div className={styles.heroGrid}>
          {Array(50).fill(0).map((_, i) => (
            <div key={i} className={styles.gridItem}></div>
          ))}
        </div>
      </div>
      
      <div className={styles.heroContent}>
        <div className={styles.heroTextContainer}>
          <div className={styles.heroProfession} ref={subheadingRef}>
            {data.profession}
          </div>
          
          <h1 className={styles.heroName} ref={headingRef}>
            I'm <span className={styles.highlight}>{data.fullName}</span>
          </h1>
          
          <p className={styles.heroBio} ref={descriptionRef}>
            {data.bio}
          </p>
          
          <div className={styles.heroCta} ref={buttonRef}>
            <button 
              className={styles.heroButton}
              onClick={handleScrollToContact}
            >
              Contact Me <ArrowRight size={18} />
            </button>
            
            <button 
              className={styles.heroSecondaryButton}
              onClick={() => {
                const aboutSection = document.getElementById('about');
                if (aboutSection) {
                  window.scrollTo({
                    top: aboutSection.offsetTop - 70,
                    behavior: 'smooth'
                  });
                }
              }}
            >
              Explore Portfolio
            </button>
          </div>
        </div>
        
        <div className={styles.heroImageContainer}>
          <div className={styles.heroImage}>
            <div className={styles.profileImagePlaceholder}>
              <img src="/api/placeholder/500/500" alt={data.fullName} className={styles.profileImage} />
            </div>
            <div className={styles.heroBadge}>
              <span className={styles.badgeText}>Available for work</span>
            </div>
          </div>
          
          <div className={styles.heroDecorators}>
            <div className={styles.circleDecorator}></div>
            <div className={styles.squareDecorator}></div>
            <div className={styles.triangleDecorator}></div>
          </div>
        </div>
      </div>
      
      <div className={styles.heroScroll}>
        <span className={styles.scrollText}>Scroll Down</span>
        <div className={styles.scrollIndicator}>
          <div className={styles.scrollDot}></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;