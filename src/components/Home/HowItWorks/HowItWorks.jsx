// HowItWorks.jsx
import React from 'react';
import styles from './HowItWorks.module.css';

// SVG Icons for each step
const TemplateIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 5C4 4.44772 4.44772 4 5 4H19C19.5523 4 20 4.44772 20 5V7C20 7.55228 19.5523 8 19 8H5C4.44772 8 4 7.55228 4 7V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4 11C4 10.4477 4.44772 10 5 10H11C11.5523 10 12 10.4477 12 11V19C12 19.5523 11.5523 20 11 20H5C4.44772 20 4 19.5523 4 19V11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 11C16 10.4477 15.5523 10 15 10H19C19.5523 10 20 10.4477 20 11V13C20 13.5523 19.5523 14 19 14H15C14.4477 14 14 13.5523 14 13V11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 17C16 16.4477 15.5523 16 15 16H19C19.5523 16 20 16.4477 20 17V19C20 19.5523 19.5523 20 19 20H15C14.4477 20 14 19.5523 14 19V17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ContentIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.5 4H4.6C4.03995 4 3.75992 4 3.54601 4.10899C3.35785 4.20487 3.20487 4.35785 3.10899 4.54601C3 4.75992 3 5.03995 3 5.6V16.4C3 16.9601 3 17.2401 3.10899 17.454C3.20487 17.6422 3.35785 17.7951 3.54601 17.891C3.75992 18 4.03995 18 4.6 18H7.5M9.5 4L13 7.5M9.5 4V6.4C9.5 6.96005 9.5 7.24008 9.60899 7.45399C9.70487 7.64215 9.85785 7.79513 10.046 7.89101C10.2599 8 10.5399 8 11.1 8H13M13 7.5V12M13 7.5L11.5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="16.5" cy="15.5" r="4.5" stroke="currentColor" strokeWidth="2"/>
    <path d="M16.5 13.5V15.5H18.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PreviewIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.42012 12.7132C2.28394 12.4975 2.21584 12.3897 2.17772 12.2234C2.14909 12.0985 2.14909 11.9015 2.17772 11.7766C2.21584 11.6103 2.28394 11.5025 2.42012 11.2868C3.54553 9.50484 6.8954 5 12.0004 5C17.1054 5 20.4553 9.50484 21.5807 11.2868C21.7169 11.5025 21.785 11.6103 21.8231 11.7766C21.8517 11.9015 21.8517 12.0985 21.8231 12.2234C21.785 12.3897 21.7169 12.4975 21.5807 12.7132C20.4553 14.4952 17.1054 19 12.0004 19C6.8954 19 3.54553 14.4952 2.42012 12.7132Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12.0004 15C13.6573 15 15.0004 13.6569 15.0004 12C15.0004 10.3431 13.6573 9 12.0004 9C10.3435 9 9.00043 10.3431 9.00043 12C9.00043 13.6569 10.3435 15 12.0004 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PublishIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 14L12 11M12 11L9 14M12 11V20M20.8794 12.1206C21.5947 11.4054 21.9523 11.0478 22 10.6242C22.0478 10.2007 21.7903 9.79284 21.2754 9.2779L13.7034 1.70597C13.3067 1.30926 13 1 12.5757 1C12.1514 1 11.8447 1.30926 11.448 1.70597L3.87599 9.2779C3.36108 9.79282 3.10362 10.2007 3.15138 10.6242C3.19914 11.0478 3.55679 11.4054 4.2721 12.1206C4.98741 12.8359 5.34506 13.1936 5.76864 13.2413C6.19222 13.2891 6.60011 13.0316 7.11503 12.5167L11.448 8.18374C11.8447 7.78703 12.1514 7.47777 12.5757 7.47777C13 7.47777 13.3067 7.78703 13.7034 8.18374L18.0364 12.5167C18.5513 13.0316 18.9592 13.2891 19.3828 13.2413C19.8064 13.1936 20.164 12.8359 20.8794 12.1206Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Choose a Template',
      description: 'Browse through our collection of professionally designed templates and select one that matches your style.',
      icon: <TemplateIcon />
    },
    {
      number: '02',
      title: 'Add Your Content',
      description: 'Fill in your information, upload your projects, and customize the design to make it your own.',
      icon: <ContentIcon />
    },
    {
      number: '03',
      title: 'Preview Your Portfolio',
      description: 'See how your portfolio looks in real-time with instant previews for all templates.',
      icon: <PreviewIcon />
    },
    {
      number: '04',
      title: 'Publish & Share',
      description: 'With one click, publish your portfolio and share it with the world using your custom URL.',
      icon: <PublishIcon />
    }
  ];

  return (
    <section className={styles.howItWorks} id="how-it-works">
      <div className={styles.bgElements}>
        <div className={styles.circle1}></div>
        <div className={styles.circle2}></div>
      </div>
      
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2>How It <span className={styles.gradient}>Works</span></h2>
          <p>Building your professional portfolio is easy with our simple 4-step process</p>
        </div>
        
        <div className={styles.stepsContainer}>
          {steps.map((step, index) => (
            <div 
              className={styles.step} 
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 150}
            >
              <div className={styles.stepNumber}>{step.number}</div>
              <div className={styles.stepIcon}>{step.icon}</div>
              <div className={styles.stepContent}>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className={styles.connector}></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;