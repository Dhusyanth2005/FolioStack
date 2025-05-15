import React, { useState } from 'react';
import { Share2, Copy, ExternalLink, RefreshCw } from 'lucide-react';
import styles from './Preview.module.css';
import ProfessionalTemplate from '../../Template/ProfessionalTemplate1/ProfessionalTemplate1';
import ModernMinimalTemplate from '../../Template/ModernMinimalTemplate/ModernMinimalTemplate';

const Preview = ({ formData, onPublishToggle,userData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Clean formData
  console.log(formData.skills);
const cleanFormData = (data) => {
  if (!data || typeof data !== 'object') return { selectedTemplate: 'Professional' };
  const cleaned = { ...data, selectedTemplate: data.selectedTemplate || 'Professional' };
  const fieldsToClean = [
    'fullName', 'profession', 'bio', 'email', 'phone', 'location',
    'skills', 'achievements', 'experiences', 'projects', 'education', 'socialLinks'
  ];

  fieldsToClean.forEach((key) => {
    const value = data[key];
    if (['fullName', 'profession', 'bio', 'email', 'phone', 'location'].includes(key)) {
      if (!value || (Array.isArray(value) && value.length === 0) || (typeof value === 'object' && Object.keys(value).length === 0)) {
        cleaned[key] = undefined;
      }
    }
    if (['skills', 'achievements', 'experiences', 'projects', 'education'].includes(key)) {
      if (!value || (Array.isArray(value) && value.length === 0)) {
        cleaned[key] = undefined;
      } else if (Array.isArray(value)) {
        const isValidArray = value.every((item) => {
          if (key === 'skills') return typeof item === 'string' && item.trim() !== '';
          if (!item || typeof item !== 'object') return false;
          if (key === 'experiences') return item.title && item.company && item.period && item.description;
          if (key === 'projects') return item.title && item.description;
          if (key === 'achievements') return item.title && item.description && item.year;
          if (key === 'education') return item.degree && item.institution && item.year;
          return true;
        });
        if (!isValidArray) cleaned[key] = undefined;
      }
    }
  });

  if (cleaned.socialLinks && typeof cleaned.socialLinks === 'object') {
    Object.keys(cleaned.socialLinks).forEach((platform) => {
      if (!cleaned.socialLinks[platform] || cleaned.socialLinks[platform].trim() === '') {
        delete cleaned.socialLinks[platform];
      }
    });
    if (Object.keys(cleaned.socialLinks).length === 0) {
      cleaned.socialLinks = undefined;
    }
  }

  return cleaned;
};

  const safeFormData = cleanFormData(formData);
  console.log(safeFormData.skills);
  // Theme colors
  const getThemeColors = () => {
    const themes = [
      { id: 'dark', colors: { primary: '#121212', secondary: '#1e1e1e', accent: '#8a2be2' } },
      { id: 'light', colors: { primary: '#ffffff', secondary: '#f5f5f5', accent: '#8a2be2' } },
      { id: 'blue', colors: { primary: '#0a192f', secondary: '#172a45', accent: '#64ffda' } },
      { id: 'green', colors: { primary: '#1a2f1a', secondary: '#2d482d', accent: '#7fff00' } },
      { id: 'purple', colors: { primary: '#2d1b4e', secondary: '#442873', accent: '#ff7edb' } },
      { id: 'red', colors: { primary: '#2b0a0a', secondary: '#3d1515', accent: '#ff4d4d' } }
    ];
    const themeId = formData.selectedTheme || 'dark';
    return themes.find(theme => theme.id === themeId)?.colors || themes[0].colors;
  };

  const themeColors = getThemeColors();
  const getContrastColor = (hexColor) => {
    const rgb = hexToRgb(hexColor);
    if (!rgb) return '#ffffff';
    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#ffffff';
  };

  const hexToRgb = (hex) => {
    if (!hex) return null;
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const handlePublish = () => {
    setIsLoading(true);
    localStorage.setItem('portfolioFormData', JSON.stringify(safeFormData));
    setTimeout(() => {
      onPublishToggle();
      setIsLoading(false);
    }, 1500);
  };

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const contrastColor = getContrastColor(themeColors.primary);
  const accentContrastColor = getContrastColor(themeColors.accent);

  const renderTemplate = () => {
    const templateId = safeFormData.selectedTemplate;
    switch (templateId) {
      case 'Minimal':
        return <ModernMinimalTemplate key={refreshKey} formData={safeFormData} />;
      case 'Professional':
        return <ProfessionalTemplate key={refreshKey} formData={safeFormData} />;
      case 'Creative':
        return (
          <div key={refreshKey} className={styles.templatePreview} style={{ backgroundColor: themeColors.primary, color: contrastColor }}>
            Creative Template (Component Not Implemented)
          </div>
        );
      default:
        return (
          <div key={refreshKey} className={styles.templatePreview} style={{ backgroundColor: themeColors.primary, color: contrastColor }}>
            Default Template
          </div>
        );
    }
  };

  const generatePortfolioUrl = () => {
    const baseUrl = window.location.origin;
    
    // Clean and format the title
    const titleSlug = formData.title 
      ? formData.title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').trim()
      : 'portfolio';
    
    // Clean and format the fullName
    const nameSlug = formData.fullName 
      ? formData.fullName.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').trim()
      : userData?.name?.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
    
    // Combine title and name in the URL
    return `${baseUrl}/${nameSlug}/${titleSlug}`;
  };

  const copyToClipboard = () => {
    const url = generatePortfolioUrl();
    navigator.clipboard.writeText(url);
    alert('URL copied to clipboard!');
  };

  const openInNewTab = () => {
    localStorage.setItem('portfolioFormData', JSON.stringify(safeFormData));
    window.open('/preview', '_blank');
  };

  return (
    <div className={styles.previewContainer}>
      <div className={styles.previewHeader}>
        <h2>Preview Your Portfolio</h2>
        <div className={styles.previewActions}>
          <button className={styles.refreshButton} onClick={handleRefresh}>
            <RefreshCw size={20} />
          </button>
          <div className={styles.publishToggle}>
            <span>Publish</span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={formData.isPublished}
                onChange={handlePublish}
                disabled={isLoading}
              />
              <span className={`${styles.slider} ${styles.round}`} style={{ backgroundColor: formData.isPublished ? themeColors.accent : '#ccc' }}></span>
            </label>
            <span className={formData.isPublished ? styles.publishedStatus : styles.draftStatus}>
              {formData.isPublished ? 'Published' : 'Draft'}
            </span>
            {isLoading && <div className={styles.loaderDot} style={{ backgroundColor: themeColors.accent }}></div>}
          </div>
        </div>
      </div>
      <div className={styles.previewInfo}>
        <div className={styles.infoItem}>
          <span>Template:</span>
          <strong>
            {formData.selectedTemplate || 'Default'}
          </strong>
        </div>
        <div className={styles.infoItem}>
          <span>Theme:</span>
          <strong style={{ color: themeColors.accent }}>
            {formData.selectedTheme ? formData.selectedTheme.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'Default Theme'}
          </strong>
        </div>
        {formData.isPublished && (
          <div className={styles.publicUrl}>
            <span>Public URL:</span>
            <a href={generatePortfolioUrl()} target="_blank" rel="noopener noreferrer" style={{ color: themeColors.accent }}>
              {generatePortfolioUrl()}
            </a>
            <button className={styles.copyButton} onClick={copyToClipboard}>
              <Copy size={16} />
            </button>
            <button className={styles.shareButton}>
              <Share2 size={16} />
            </button>
          </div>
        )}
      </div>
      <div className={`${styles.previewFrame} ${styles.desktopPreview}`}>
        <div className={styles.browserFrame}>
          <div className={styles.browserHeader}>
            <div className={styles.browserButtons}>
              <span className={styles.browserButton}></span>
              <span className={styles.browserButton}></span>
              <span className={styles.browserButton}></span>
            </div>
            <div className={styles.browserAddress}>
              {formData.isPublished ? generatePortfolioUrl() : 'Preview Mode'}
            </div>
          </div>
          <div className={styles.browserContent}>
            {renderTemplate()}
          </div>
        </div>
      </div>
      <div className={styles.previewFooter}>
        <div className={styles.previewNote}>
          <p>This is a preview of how your portfolio will look to visitors.</p>
        </div>
        <div className={styles.footerActions}>
          <button className={styles.previewButton} onClick={openInNewTab}>
            Open in New Tab <ExternalLink size={16} />
          </button>
          {formData.isPublished ? (
            <button className={styles.unpublishButton} style={{ backgroundColor: '#f44336' }}>
              Unpublish
            </button>
          ) : (
            <button className={styles.publishButton} style={{ backgroundColor: themeColors.accent, color: accentContrastColor }}>
              Publish Portfolio
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Preview;