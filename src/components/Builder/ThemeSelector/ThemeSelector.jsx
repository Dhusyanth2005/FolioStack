// ThemeSelector.jsx
import React, { useState } from 'react';
import { CheckCircle, Palette } from 'lucide-react';
import styles from './ThemeSelector.module.css';

const ThemeSelector = ({ onSelect, selectedTheme }) => {
  const themes = [
    {
      id: 'dark',
      name: 'Dark Mode',
      colors: {
        primary: '#121212',
        secondary: '#1e1e1e',
        accent: '#8a2be2'
      },
      description: 'Elegant dark theme with purple accents'
    },
    {
      id: 'light',
      name: 'Light Mode',
      colors: {
        primary: '#ffffff',
        secondary: '#f5f5f5',
        accent: '#8a2be2'
      },
      description: 'Clean light theme with purple accents'
    },
    {
      id: 'blue',
      name: 'Blue Ocean',
      colors: {
        primary: '#0a192f',
        secondary: '#172a45',
        accent: '#64ffda'
      },
      description: 'Deep blue theme with teal accents'
    },
    {
      id: 'green',
      name: 'Forest',
      colors: {
        primary: '#1a2f1a',
        secondary: '#2d482d',
        accent: '#7fff00'
      },
      description: 'Rich green theme with neon accents'
    },
    {
      id: 'purple',
      name: 'Cosmic Purple',
      colors: {
        primary: '#2d1b4e',
        secondary: '#442873',
        accent: '#ff7edb'
      },
      description: 'Deep purple theme with pink accents'
    },
    {
      id: 'red',
      name: 'Ruby',
      colors: {
        primary: '#2b0a0a',
        secondary: '#3d1515',
        accent: '#ff4d4d'
      },
      description: 'Dark red theme with bright accents'
    }
  ];

  const [activeTheme, setActiveTheme] = useState(selectedTheme || themes[0].id);

  const handleThemeSelect = (themeId) => {
    setActiveTheme(themeId);
    onSelect(themeId);
  };

  return (
    <div className={styles.themeSelector}>
      <div className={styles.sectionHeader}>
        <h2>
          <Palette className={styles.headerIcon} size={28} />
          Choose a Theme
        </h2>
        <div className={styles.activeBadge} style={{ 
          backgroundColor: themes.find(t => t.id === activeTheme)?.colors.accent,
          color: getContrastColor(themes.find(t => t.id === activeTheme)?.colors.accent)
        }}>
          {themes.find(t => t.id === activeTheme)?.name} Active
        </div>
      </div>
      
      <p className={styles.instruction}>
        Select a color theme for your portfolio. The theme will be applied to your selected template.
      </p>

      <div className={styles.themesGrid}>
        {themes.map(theme => (
          <div 
            key={theme.id}
            className={`${styles.themeCard} ${activeTheme === theme.id ? styles.selected : ''}`}
            onClick={() => handleThemeSelect(theme.id)}
            style={{ 
              borderColor: activeTheme === theme.id ? theme.colors.accent : 'transparent',
              boxShadow: activeTheme === theme.id ? `0 4px 20px rgba(${hexToRgb(theme.colors.accent)}, 0.3)` : ''
            }}
          >
            <div className={styles.themePreview}>
              <div 
                className={styles.themePrimary} 
                style={{ backgroundColor: theme.colors.primary }}
              />
              <div 
                className={styles.themeSecondary} 
                style={{ backgroundColor: theme.colors.secondary }}
              />
              <div 
                className={styles.themeAccent} 
                style={{ backgroundColor: theme.colors.accent }}
              />
            </div>
            
            <div className={styles.themeInfo}>
              <h3>{theme.name}</h3>
              <p>{theme.description}</p>
              
              <div className={styles.colorLabels}>
                <div className={styles.colorLabel}>
                  <span className={styles.colorDot} style={{ backgroundColor: theme.colors.primary }}></span>
                  <code>{theme.colors.primary}</code>
                </div>
                <div className={styles.colorLabel}>
                  <span className={styles.colorDot} style={{ backgroundColor: theme.colors.accent }}></span>
                  <code>{theme.colors.accent}</code>
                </div>
              </div>
            </div>
            
            <div className={styles.themeSelectIndicator}>
              {activeTheme === theme.id && (
                <div className={styles.selectedMark} style={{ backgroundColor: theme.colors.accent }}>
                  <CheckCircle size={18} className={styles.checkIcon} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper function to calculate contrasting text color
function getContrastColor(hexColor) {
  // Convert hex to RGB
  const rgb = hexToRgb(hexColor);
  if (!rgb) return '#ffffff';
  
  // Calculate brightness (simple formula)
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  
  // Return black or white depending on brightness
  return brightness > 128 ? '#000000' : '#ffffff';
}

// Helper function to convert hex to rgb
function hexToRgb(hex) {
  if (!hex) return null;
  
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

export default ThemeSelector;