import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProfessionalTemplate from '../components/Template/ProfessionalTemplate1/ProfessionalTemplate1';
import ModernMinimalTemplate from '../components/Template/ModernMinimalTemplate/ModernMinimalTemplate';
import styles from './userPortfolio.module.css';

const UserPortfolio = () => {
  const { fullname, title } = useParams();
  const [portfolioData, setPortfolioData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await axios.get(
          `https://backendportfolio-v4kd.onrender.com/api/portfolio/public/${fullname}/${title}`
        );
        // Ensure all formData fields have defaults
        const data = {
          title: response.data.title || '',
          fullName: response.data.fullName || '',
          profileImage: response.data.profileImage || '/assets/images/default-profile.png',
          profession: response.data.profession || '',
          bio: response.data.bio || '',
          email: response.data.email || '',
          phone: response.data.phone || '',
          location: response.data.location || '',
          skills: response.data.skills || [],
          achievements: response.data.achievements?.length
            ? response.data.achievements
            : [{ title: '', description: '', year: '' }],
          experiences: response.data.experiences?.length
            ? response.data.experiences
            : [{ title: '', company: '', period: '', description: '' }],
          projects: response.data.projects?.length
            ? response.data.projects
            : [{ title: '', description: '', image: '', link: '' }],
          education: response.data.education?.length
            ? response.data.education
            : [{ degree: '', institution: '', year: '', description: '' }],
          socialLinks: response.data.socialLinks && Object.values(response.data.socialLinks).some(url => url)
            ? response.data.socialLinks
            : {
                linkedin: 'https://linkedin.com/in/johndoe',
                github: 'https://github.com/johndoe',
                twitter: 'https://twitter.com/johndoe',
              },
          selectedTemplate: response.data.selectedTemplate || '1',
          selectedTheme: response.data.selectedTheme || 'dark',
          isPublished: response.data.isPublished || false,
        };
        setPortfolioData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Portfolio fetch error:", error);
        setError(
          error.response?.status === 404
            ? 'not_found'
            : error.response?.data?.message || 'Failed to load portfolio. Please try again.'
        );
        setIsLoading(false);
      }
    };

    fetchPortfolio();
  }, [fullname, title]);

  const renderTemplate = () => {
    if (!portfolioData) {
      return <PortfolioNotAvailable />;
    }

    // Check if essential data is missing
    const hasEssentialData = portfolioData.fullName && portfolioData.title;
    if (!hasEssentialData) {
      return <PortfolioIncomplete />;
    }

    // Map selectedTemplate to template components
    const templateId = portfolioData.selectedTemplate;
    switch (templateId) {
      case '1':
      case 'Professional':
        return <ProfessionalTemplate formData={portfolioData} />;
      case '2':
      case 'Minimal':
        return <ModernMinimalTemplate formData={portfolioData} />;
      case '3':
      case 'Creative':
        return <TemplateComingSoon name="Creative" />;
      default:
        return <ProfessionalTemplate formData={portfolioData} />;
    }
  };

  // Loading state component
  const LoadingState = () => (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingSpinnerWrapper}>
        <div className={styles.loadingSpinner}></div>
      </div>
      <p className={styles.loadingText}>Loading portfolio...</p>
    </div>
  );

  // Not found component
  const NotFoundState = () => (
    <div className={styles.notFoundContainer}>
      <div className={styles.notFoundContent}>
        <div className={styles.notFoundIcon}>404</div>
        <h1 className={styles.notFoundTitle}>Portfolio Not Found</h1>
        <p className={styles.notFoundMessage}>
          The portfolio you're looking for doesn't exist or has been removed.
        </p>
        <a href="/" className={styles.returnHomeButton}>
          Return to Home
        </a>
      </div>
    </div>
  );

  // Error state component
  const ErrorState = ({ message }) => (
    <div className={styles.errorContainer}>
      <div className={styles.errorContent}>
        <div className={styles.errorIcon}>!</div>
        <h2 className={styles.errorTitle}>Something went wrong</h2>
        <p className={styles.errorMessage}>{message}</p>
        <button 
          onClick={() => window.location.reload()} 
          className={styles.retryButton}
        >
          Try Again
        </button>
      </div>
    </div>
  );

  // Template coming soon
  const TemplateComingSoon = ({ name }) => (
    <div className={styles.comingSoonContainer}>
      <div className={styles.comingSoonContent}>
        <div className={styles.comingSoonIcon}>🚀</div>
        <h2 className={styles.comingSoonTitle}>{name} Template</h2>
        <p className={styles.comingSoonMessage}>
          This template is coming soon! We're working hard to bring you more design options.
        </p>
      </div>
    </div>
  );

  // Portfolio not available
  const PortfolioNotAvailable = () => (
    <div className={styles.notAvailableContainer}>
      <div className={styles.notAvailableContent}>
        <div className={styles.notAvailableIcon}>❓</div>
        <h2 className={styles.notAvailableTitle}>Portfolio Data Not Available</h2>
        <p className={styles.notAvailableMessage}>
          We couldn't retrieve this portfolio's data. It may have been removed or is currently unavailable.
        </p>
        <a href="/" className={styles.returnHomeButton}>
          Return to Home
        </a>
      </div>
    </div>
  );

  // Portfolio incomplete
  const PortfolioIncomplete = () => (
    <div className={styles.incompleteContainer}>
      <div className={styles.incompleteContent}>
        <div className={styles.incompleteIcon}>⚠️</div>
        <h2 className={styles.incompleteTitle}>Incomplete Portfolio</h2>
        <p className={styles.incompleteMessage}>
          This portfolio is missing essential information and cannot be displayed properly.
        </p>
        <a href="/" className={styles.returnHomeButton}>
          Return to Home
        </a>
      </div>
    </div>
  );

  if (isLoading) {
    return <LoadingState />;
  }

  if (error === 'not_found') {
    return <NotFoundState />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <div className={styles.portfolioContainer}>
      {renderTemplate()}
    </div>
  );
};

export default UserPortfolio;