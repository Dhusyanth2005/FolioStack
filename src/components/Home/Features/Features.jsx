// Features.jsx
import React from 'react';
import styles from './Features.module.css';

const TemplateIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 5C4 4.44772 4.44772 4 5 4H19C19.5523 4 20 4.44772 20 5V7C20 7.55228 19.5523 8 19 8H5C4.44772 8 4 7.55228 4 7V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4 11C4 10.4477 4.44772 10 5 10H11C11.5523 10 12 10.4477 12 11V19C12 19.5523 11.5523 20 11 20H5C4.44772 20 4 19.5523 4 19V11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 15C16 14.4477 15.5523 14 15 14H15.01C14.4577 14 14.01 14.4477 14.01 15V15.01C14.01 15.5623 14.4577 16.01 15.01 16.01H15C15.5523 16.01 16 15.5623 16 15.01V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 11C20 10.4477 19.5523 10 19 10H19.01C18.4577 10 18.01 10.4477 18.01 11V11.01C18.01 11.5623 18.4577 12.01 19.01 12.01H19C19.5523 12.01 20 11.5623 20 11.01V11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 15C20 14.4477 19.5523 14 19 14H19.01C18.4577 14 18.01 14.4477 18.01 15V15.01C18.01 15.5623 18.4577 16.01 19.01 16.01H19C19.5523 16.01 20 15.5623 20 15.01V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 19C20 18.4477 19.5523 18 19 18H15C14.4477 18 14 18.4477 14 19V19.01C14 19.5623 14.4477 20.01 15 20.01H19C19.5523 20.01 20 19.5623 20 19.01V19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CustomizationIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 15L8.5 18.5M12 15L15.5 18.5M12 15V3M21 12V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DomainIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3.6 9H20.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3.6 15H20.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 3C14.5013 5.73835 15.9228 9.29203 16 13C15.9228 16.708 14.5013 20.2616 12 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 3C9.49872 5.73835 8.07725 9.29203 8 13C8.07725 16.708 9.49872 20.2616 12 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ResponsiveIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 18H12.01M7 21H17C18.1046 21 19 20.1046 19 19V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SeoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 21H14M10 21H6.2C5.0799 21 4.51984 21 4.09202 20.782C3.71569 20.5903 3.40973 20.2843 3.21799 19.908C3 19.4802 3 18.9201 3 17.8V17.8V6.2C3 5.0799 3 4.51984 3.21799 4.09202C3.40973 3.71569 3.71569 3.40973 4.09202 3.21799C4.51984 3 5.0799 3 6.2 3H17.8C18.9201 3 19.4802 3 19.908 3.21799C20.2843 3.40973 20.5903 3.71569 20.782 4.09202C21 4.51984 21 5.0799 21 6.2V17.8C21 18.9201 21 19.4802 20.782 19.908C20.5903 20.2843 20.2843 20.5903 19.908 20.782C19.4802 21 18.9201 21 17.8 21H14M10 21L14 21M15.5 10.5L17.5 8.50005M10 14H14M17.5 8.50005L15.1421 6.14215C14.3431 5.34322 13.0355 5.63604 12.6158 6.6958L8 16C7 18 9 20 11 19L20.5 14.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PublishIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 14L12 11M12 11L9 14M12 11V20M20.8794 12.1206C21.5947 11.4054 21.9523 11.0478 22 10.6242C22.0478 10.2007 21.7903 9.79284 21.2754 9.2779L13.7034 1.70597C13.3067 1.30926 13 1 12.5757 1C12.1514 1 11.8447 1.30926 11.448 1.70597L3.87599 9.2779C3.36108 9.79282 3.10362 10.2007 3.15138 10.6242C3.19914 11.0478 3.55679 11.4054 4.2721 12.1206C4.98741 12.8359 5.34506 13.1936 5.76864 13.2413C6.19222 13.2891 6.60011 13.0316 7.11503 12.5167L11.448 8.18374C11.8447 7.78703 12.1514 7.47777 12.5757 7.47777C13 7.47777 13.3067 7.78703 13.7034 8.18374L18.0364 12.5167C18.5513 13.0316 18.9592 13.2891 19.3828 13.2413C19.8064 13.1936 20.164 12.8359 20.8794 12.1206Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Features = () => {
  const features = [
    {
      icon: <TemplateIcon />,
      title: 'Beautiful Templates',
      description: 'Choose from a variety of professionally designed templates that showcase your work in the best light.'
    },
    {
      icon: <CustomizationIcon />,
      title: 'Easy Customization',
      description: 'No coding required! Just enter your content and watch your portfolio come to life instantly.'
    },
    {
      icon: <DomainIcon />,
      title: 'Custom Domain',
      description: 'Get a personalized URL that\'s easy to share or connect your own custom domain.'
    },
    {
      icon: <ResponsiveIcon />,
      title: 'Responsive Design',
      description: 'Your portfolio will look amazing on any device - desktop, tablet, or mobile.'
    },
    {
      icon: <SeoIcon />,
      title: 'SEO Optimized',
      description: 'Get discovered online with built-in SEO optimization for better visibility.'
    },
    {
      icon: <PublishIcon />,
      title: 'Instant Publishing',
      description: 'Publish your portfolio with one click and make updates anytime.'
    }
  ];

  return (
    <section className={styles.features} id="features">
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2>
            <span className={styles.accent}>Features</span> That Make 
            <span className={styles.gradient}> Portfolio Builder</span> Stand Out
          </h2>
          <p>Everything you need to create a stunning portfolio website without writing a single line of code.</p>
        </div>
        
        <div className={styles.featureGrid}>
          {features.map((feature, index) => (
            <div 
              className={styles.featureCard} 
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <div className={styles.cardGlow}></div>
            </div>
          ))}
        </div>
      </div>
      
      <div className={styles.featuresBg}></div>
    </section>
  );
};

export default Features;