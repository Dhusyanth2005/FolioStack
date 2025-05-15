import React, { useState, useEffect } from 'react';
import { ChevronUp, Linkedin, Github, Twitter } from 'lucide-react';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Experience from './components/Experience/Experience';
import Projects from './components/Projects/Projects';
import Education from './components/Education/Education';
import Contact from './components/Contact/Contact';
import ResponsiveNavBar from './components/ResponsiveNavbar';

const ProfessionalTemplate = ({ formData }) => {
  const [activeSection, setActiveSection] = useState('hero');

  // Default formData with profileImage
  const data = {
    fullName: formData?.fullName || 'John Doe',
    profession: formData?.profession || 'Software Engineer',
    profileImage: formData?.profileImage || '/assets/images/default-profile.png',
    bio: formData?.bio || 'A dedicated software engineer with over 5 years of experience.',
    email: formData?.email || 'john.doe@example.com',
    phone: formData?.phone || '+1 (555) 123-4567',
    location: formData?.location || 'San Francisco, CA, USA',
    skills: formData?.skills || ['React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'GraphQL', 'Docker', 'MongoDB'],
    achievements: formData?.achievements || [
      { title: 'Employee of the Year', description: 'Recognized for contributions at Tech Corp.', year: '2024' },
      { title: 'Open Source Contributor', description: 'Contributed to a React library.', year: '2023' },
      { title: 'Hackathon Winner', description: 'Won a national coding competition.', year: '2022' },
    ],
    experiences: formData?.experiences || [
      { title: 'Senior Software Engineer', company: 'Tech Corp', period: 'Jan 2022 - Present', description: 'Led a team to build a SaaS platform.' },
      { title: 'Software Engineer', company: 'Innovate Solutions', period: 'Jun 2019 - Dec 2021', description: 'Developed RESTful APIs.' },
      { title: 'Junior Developer', company: 'StartUp Inc.', period: 'Aug 2017 - May 2019', description: 'Built front-end interfaces.' },
    ],
    projects: formData?.projects || [
      { title: 'E-Commerce Platform', description: 'Full-stack e-commerce solution.', image: '', link: 'https://example.com/ecommerce' },
      { title: 'Travel Journal App', description: 'Mobile-first web app for travelers.', image: '', link: 'https://example.com/traveljournal' },
      { title: 'Portfolio Generator', description: 'Dynamic portfolio builder tool.', image: '', link: 'https://example.com/portfoliogenerator' },
    ],
    education: formData?.education || [
      { degree: 'Master of Science in Computer Science', institution: 'Stanford University', year: '2020 - 2022', description: 'Graduated with distinction.' },
      { degree: 'Bachelor of Science in Computer Science', institution: 'UC Berkeley', year: '2016 - 2020', description: 'Graduated with honors.' },
    ],
    socialLinks: formData?.socialLinks || {
      linkedin: 'https://linkedin.com/in/johndoe',
      github: 'https://github.com/johndoe',
      twitter: 'https://twitter.com/johndoe',
    },
    selectedTheme: formData?.selectedTheme || 'dark',
  };

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'education', 'contact'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.getBoundingClientRect().top <= 150) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Theme colors
  const getThemeColors = () => {
    const themes = [
      { id: 'dark', colors: { primary: '#121212', secondary: '#1e1e1e', accent: '#8a2be2', text: '#ffffff', subtext: '#cccccc' } },
      { id: 'light', colors: { primary: '#ffffff', secondary: '#f5f5f5', accent: '#8a2be2', text: '#333333', subtext: '#666666' } },
      { id: 'blue', colors: { primary: '#0a192f', secondary: '#172a45', accent: '#64ffda', text: '#e6f1ff', subtext: '#8892b0' } },
      { id: 'green', colors: { primary: '#1a2f1a', secondary: '#2d482d', accent: '#7fff00', text: '#e6f1e6', subtext: '#b0d890' } },
      { id: 'purple', colors: { primary: '#2d1b4e', secondary: '#442873', accent: '#ff7edb', text: '#f8f8ff', subtext: '#d8bfd8' } },
      { id: 'red', colors: { primary: '#2b0a0a', secondary: '#3d1515', accent: '#ff4d4d', text: '#f8e6e6', subtext: '#d89090' } },
    ];
    const themeId = data.selectedTheme || 'dark';
    return themes.find((theme) => theme.id === themeId)?.colors || themes[0].colors;
  };

  const themeColors = getThemeColors();

  // Functions to calculate icon color based on accent color brightness
  const hexToRgb = (hex) => {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return { r, g, b };
  };

  const getLuminance = (r, g, b) => {
    const a = [r, g, b].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
  };

  const getIconColor = (accent) => {
    const { r, g, b } = hexToRgb(accent);
    const luminance = getLuminance(r, g, b);
    return luminance > 0.179 ? '#000000' : '#ffffff';
  };

  const iconColor = getIconColor(themeColors.accent);

  // Styles for desktop view
  const styles = {
    container: {
      backgroundColor: themeColors.primary,
      color: themeColors.text,
      fontFamily: '"Inter", sans-serif',
      minHeight: '100vh',
      position: 'relative',
      width: '100%',
      overflow: 'hidden',
      boxSizing: 'border-box',
    },
    content: {
      margin: '0 auto',
      padding: '0 20px',
      width: '100%',
      boxSizing: 'border-box',
      overflowX: 'hidden',
    },
    mainContent: {
      width: '100%',
      boxSizing: 'border-box',
    },
    footer: {
      backgroundColor: themeColors.secondary,
      padding: '30px 0',
      marginTop: '60px',
      borderTop: `1px solid ${themeColors.accent}30`,
      position: 'relative',
      width: '100%',
    },
    footerContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px',
      textAlign: 'center',
      width: '100%',
    },
    socialIcon: {
      color: iconColor,
      transition: 'color 0.3s ease',
      display: 'inline-flex',
      alignItems: 'center',
    },
  };

  // Prevent horizontal scrolling
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      html, body {
        max-width: 100%;
        overflow-x: hidden;
        margin: 0;
        padding: 0;
      }
      * {
        box-sizing: border-box;
      }
      section {
        width: 100%;
      }
      section > div {
        max-width: 1200px;
        margin: 0 auto;
        width: 100%;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Map platform names to Lucide icons
  const getSocialIcon = (platform) => {
    const normalizedPlatform = platform.toLowerCase();
    switch (normalizedPlatform) {
      case 'linkedin':
        return <Linkedin size={20} />;
      case 'github':
        return <Github size={20} />;
      case 'twitter':
        return <Twitter size={20} />;
      default:
        console.warn(`No icon found for platform: ${platform}`);
        return null;
    }
  };

  return (
    <div style={styles.container}>
      <ResponsiveNavBar
        data={data}
        themeColors={themeColors}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <div style={styles.mainContent}>
        <section id="hero" style={{ width: '100%' }}>
          <Hero data={data} themeColors={themeColors} />
        </section>
        <div style={styles.content}>
          <section id="about">
            <About data={data} themeColors={themeColors} />
          </section>
          <section id="skills">
            <Skills data={data} themeColors={themeColors} />
          </section>
          <section id="experience">
            <Experience data={data} themeColors={themeColors} />
          </section>
          <section id="projects">
            <Projects data={data} themeColors={themeColors} />
          </section>
          <section id="education">
            <Education data={data} themeColors={themeColors} />
          </section>
          <section id="contact">
            <Contact data={data} themeColors={themeColors} />
          </section>
        </div>
      </div>
      <footer style={styles.footer}>
        <div style={{ ...styles.content, ...styles.footerContent }}>
          <div style={{ color: themeColors.subtext, fontSize: '14px' }}>
            © {new Date().getFullYear()} {data.fullName}. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '20px', marginTop: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {Object.entries(data.socialLinks).map(([platform, url]) => {
              if (!url || url.trim() === '') return null;
              const icon = getSocialIcon(platform);
              if (!icon) return null;
              return (
                <a
                  key={platform}
                  href={url}
                  style={{
                    color: iconColor,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    transition: 'color 0.3s ease',
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseOver={(e) => (e.currentTarget.style.color = themeColors.accent)}
                  onMouseOut={(e) => (e.currentTarget.style.color = iconColor)}
                >
                  <span style={styles.socialIcon}>{icon}</span>
                  <span style={{ marginLeft: '5px' }}>
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </span>
                </a>
              );
            })}
          </div>
          <button
            onClick={scrollToTop}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: themeColors.accent,
              color: iconColor,
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              transition: 'background-color 0.3s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = `${themeColors.accent}cc`)}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = themeColors.accent)}
            aria-label="Back to top"
            title="Back to top"
          >
            <ChevronUp size={20} color={iconColor} />
            Back to Top
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ProfessionalTemplate;