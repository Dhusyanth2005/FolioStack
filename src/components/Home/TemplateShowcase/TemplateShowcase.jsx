// TemplateShowcase.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './TemplateShowcase.module.css';

const TemplateShowcase = () => {
  const [activeTemplate, setActiveTemplate] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);
  
  const templates = [
    {
      id: 1,
      name: 'Minimalist',
      description: 'Clean and minimal design that puts your work in the spotlight.',
      color: '#52B69A',
      preview: 'minimalist-preview.jpg',
    },
    {
      id: 2,
      name: 'Creative',
      description: 'Bold and vibrant design for creative professionals.',
      color: '#34A0A4',
      preview: 'creative-preview.jpg',
    },
    {
      id: 3,
      name: 'Corporate',
      description: 'Professional and sleek design for business portfolios.',
      color: '#168AAD',
      preview: 'corporate-preview.jpg',
    },
    {
      id: 4,
      name: 'Photography',
      description: 'Immersive full-screen layout ideal for visual portfolios.',
      color: '#1A759F',
      preview: 'photography-preview.jpg',
    },
    {
      id: 5,
      name: 'Developer',
      description: 'Technical-focused layout with code snippets and project showcases.',
      color: '#1E6091',
      preview: 'developer-preview.jpg',
    }
  ];

  // Auto-rotate through templates
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (!isAnimating) {
        handleNext();
      }
    }, 5000);
    
    return () => clearInterval(intervalRef.current);
  }, [activeTemplate, isAnimating]);

  const handleSlideChange = (index) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveTemplate(index);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  const handleNext = () => {
    const nextIndex = (activeTemplate + 1) % templates.length;
    handleSlideChange(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (activeTemplate - 1 + templates.length) % templates.length;
    handleSlideChange(prevIndex);
  };

  const handleDotClick = (index) => {
    handleSlideChange(index);
  };

  // SVG Icon components
  const ChevronLeft = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M15 18L9 12L15 6" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
  
  const ChevronRight = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M9 18L15 12L9 6" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
  
  const ExternalLink = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M15 3H21V9" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M10 14L21 3" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
  
  const Grid = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M10 3H3V10H10V3Z" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M21 3H14V10H21V3Z" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M21 14H14V21H21V14Z" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M10 14H3V21H10V14Z" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <section className={styles.templateShowcase}>
     

      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>Portfolio Options</span>
          <h2>
            Premium <span className={styles.gradient}>Templates</span>
          </h2>
          <p>Professionally designed templates to showcase your work with elegance and impact</p>
        </div>

        <div className={styles.showcaseContainer}>
          <div className={styles.showcaseWrapper}>
            <div 
              className={styles.showcaseSlider} 
              style={{ transform: `translateX(-${activeTemplate * 100}%)` }}
            >
              {templates.map((template, index) => (
                <div 
                  className={`${styles.templateSlide} ${activeTemplate === index ? styles.activeSlide : ''}`} 
                  key={template.id}
                >
                  <div 
                    className={styles.templatePreview} 
                    style={{ 
                      backgroundImage: `url(/api/placeholder/600/400)`,
                      borderColor: template.color 
                    }}
                  >
                    <div 
                      className={styles.templateGradient} 
                      style={{ 
                        background: `linear-gradient(135deg, ${template.color}40, ${template.color}10)` 
                      }}
                    ></div>
                    
                    <div className={styles.templateContent}>
                      <div className={styles.templateInfo}>
                        <div className={styles.templateBadge} style={{ backgroundColor: `${template.color}30` }}>
                          <span style={{ color: template.color }}>Template</span>
                        </div>
                        <h3>{template.name}</h3>
                        <p>{template.description}</p>
                        <div className={styles.templateActions}>
                          <Link to={`/`} className={styles.previewBtn}>
                            Preview 
                            <span className={styles.iconWrapper}>
                              <ExternalLink />
                            </span>
                          </Link>
                          <button className={styles.infoBtn}>
                            Learn More
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button 
              className={`${styles.navButton} ${styles.prevButton}`} 
              onClick={handlePrev}
              aria-label="Previous template"
            >
              <ChevronLeft />
            </button>
            
            <button 
              className={`${styles.navButton} ${styles.nextButton}`} 
              onClick={handleNext}
              aria-label="Next template"
            >
              <ChevronRight />
            </button>
          </div>

          <div className={styles.templateProgress}>
            <div className={styles.progressTrack}>
              <div 
                className={styles.progressBar} 
                style={{ 
                  width: `${(activeTemplate + 1) * (100 / templates.length)}%`,
                  backgroundColor: templates[activeTemplate].color 
                }}
              ></div>
            </div>
            
            <div className={styles.templateDots}>
              {templates.map((_, index) => (
                <button 
                  key={index} 
                  className={`${styles.dot} ${activeTemplate === index ? styles.activeDot : ''}`}
                  style={{ backgroundColor: activeTemplate === index ? templates[index].color : undefined }}
                  onClick={() => handleDotClick(index)}
                  aria-label={`Go to template ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className={styles.showcaseCta}>
          <Link to="/templates" className={styles.viewAllBtn}>
            <span>View All Templates</span>
            <span className={styles.iconWrapper}>
              <Grid />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TemplateShowcase;