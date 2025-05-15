import React, { useState, useEffect } from 'react';
import { ChevronUp, Linkedin, Github, Twitter } from 'lucide-react';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Experience from './components/Experience/Experience';
import Projects from './components/Projects/Projects';
import Education from './components/Education/Education';
import Contact from './components/Contact/Contact';
import ResponsiveNavBar from './components/ResponsiveNavbar/ResponsiveNavbar';

const ModernMinimalTemplate = ({ formData }) => {
  const [activeSection, setActiveSection] = useState('hero');

  // Default formData
  const data = {
    fullName: formData?.fullName || 'Jane Smith',
    profession: formData?.profession || 'Web Developer',
    bio: formData?.bio || 'A passionate web developer creating clean and efficient digital solutions.',
    email: formData?.email || 'jane.smith@example.com',
    phone: formData?.phone || '+1 (555) 987-6543',
    location: formData?.location || 'New York, NY, USA',
    skills: formData?.skills || ['React', 'JavaScript', 'CSS', 'HTML', 'Git', 'Figma'],
    achievements: formData?.achievements || [
      { title: 'UI/UX Excellence Award', description: 'Recognized for outstanding design.', year: '2024' },
      { title: 'Open Source Advocate', description: 'Contributed to a CSS framework.', year: '2023' },
    ],
    experiences: formData?.experiences || [
      { title: 'Frontend Developer', company: 'Design Studio', period: 'Mar 2022 - Present', description: 'Developed responsive web applications.' },
      { title: 'Junior Developer', company: 'Tech Startup', period: 'Jan 2020 - Feb 2022', description: 'Assisted in building UI components.' },
    ],
    projects: formData?.projects || [
      { title: 'Portfolio Site', description: 'Minimalist personal portfolio.', image: '', link: 'https://example.com/portfolio' },
      { title: 'Task Manager', description: 'Clean task management app.', image: '', link: 'https://example.com/taskmanager' },
    ],
    education: formData?.education || [
      { degree: 'Bachelor of Arts in Design', institution: 'NYU', year: '2016 - 2020', description: 'Focused on UI/UX design.' },
    ],
    socialLinks: formData?.socialLinks || {
      linkedin: 'https://linkedin.com/in/janesmith',
      github: 'https://github.com/janesmith',
      twitter: 'https://twitter.com/janesmith',
    },
    selectedTheme: formData?.selectedTheme || 'green',
  };
  console.log(formData.skills);
  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'education', 'contact'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.getBoundingClientRect().top <= 100) {
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
    const themeId = data.selectedTheme || 'light';
    return themes.find(theme => theme.id === themeId)?.colors || themes[1].colors;
  };

  const themeColors = getThemeColors();

  // Calculate icon color based on accent color brightness
  const hexToRgb = (hex) => {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return { r, g, b };
  };

  const getLuminance = (r, g, b) => {
    const a = [r, g, b].map(v => {
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

  // Styles for minimal design
  const styles = {
    container: {
      backgroundColor: themeColors.primary,
      color: themeColors.text,
      fontFamily: '"Inter", sans-serif',
      minHeight: '100vh',
      position: 'relative',
      width: '100%',
      overflow: 'auto',
      boxSizing: 'border-box',
    },
    
    mainContent: {
      width: '100%',
      boxSizing: 'border-box',
    },
    footer: {
      backgroundColor: themeColors.secondary,
      padding: '20px 0',
      marginTop: '40px',
      borderTop: `1px solid ${themeColors.accent}20`,
      position: 'relative',
    },
    footerContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '15px',
      textAlign: 'center',
    },
    socialIcon: {
      color: themeColors.text,
      transition: 'color 0.2s ease',
      '&:hover': {
        color: themeColors.accent,
      },
    },
  };

  // Map platform names to Lucide icons
  const getSocialIcon = (platform) => {
    switch (platform) {
      case 'linkedin':
        return <Linkedin size={18} />;
      case 'github':
        return <Github size={18} />;
      case 'twitter':
        return <Twitter size={18} />;
      default:
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
       
          <section id="hero"><Hero data={data} themeColors={themeColors} /></section>
          <section id="about"><About data={data} themeColors={themeColors} /></section>
          <section id="skills"><Skills data={data} themeColors={themeColors} /></section>
          <section id="experience"><Experience data={data} themeColors={themeColors} /></section>
          <section id="projects"><Projects data={data} themeColors={themeColors} /></section>
          <section id="education"><Education data={data} themeColors={themeColors} /></section>
          <section id="contact"><Contact data={data} themeColors={themeColors} /></section>
       
      </div>
      <footer style={styles.footer}>
        <div style={{ ...styles.content, ...styles.footerContent }}>
          <div style={{ color: themeColors.subtext, fontSize: '13px' }}>
            © {new Date().getFullYear()} {data.fullName}. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '15px', marginTop: '8px' }}>
            {Object.entries(data.socialLinks).map(([platform, url]) => url && (
              <a
                key={platform}
                href={url}
                style={{ color: themeColors.text, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                {getSocialIcon(platform)}
                <span style={{ marginLeft: '4px', fontSize: '14px' }}>
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </span>
              </a>
            ))}
          </div>
          <button
            onClick={scrollToTop}
            style={{
              marginTop: '15px',
              padding: '8px 16px',
              backgroundColor: themeColors.accent,
              color: iconColor,
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'background-color 0.2s ease',
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = `${themeColors.accent}cc`}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = themeColors.accent}
            aria-label="Back to top"
            title="Back to top"
          >
            <ChevronUp size={18} color={iconColor} />
            Back to Top
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ModernMinimalTemplate;