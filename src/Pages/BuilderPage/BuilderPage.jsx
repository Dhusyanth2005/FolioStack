import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import ContentForm from '../../components/Builder/ContentForm/ContentForm';
import TemplateSelector from '../../components/Builder/TemplateSelector/TemplateSelector';
import ThemeSelector from '../../components/Builder/ThemeSelector/ThemeSelector';
import Preview from '../../components/Builder/Preview/Preview';
import styles from './BuilderPage.module.css';

const BuilderPage = ({ userData, onSave }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { portfolio, isEditing } = location.state || {};

  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize form data with memoization
  const initialFormData = useMemo(() => ({
    title: portfolio?.title || '',
    fullName: portfolio?.fullName || userData?.fullName || '',
    profileImage: userData?.profileImage || portfolio?.profileImage || '/assets/images/default-profile.png',
    profession: portfolio?.profession || '',
    bio: portfolio?.bio || '',
    email: portfolio?.email || userData?.email || '',
    phone: portfolio?.phone || userData?.phone || '',
    location: portfolio?.location || userData?.location || '',
    skills: portfolio?.skills || [],
    achievements: portfolio?.achievements?.length > 0
      ? portfolio.achievements
      : [{ title: '', description: '', year: '' }],
    experiences: portfolio?.experiences?.length > 0
      ? portfolio.experiences
      : [{ title: '', company: '', period: '', description: '' }],
    projects: portfolio?.projects?.length > 0
      ? portfolio.projects
      : [{ title: '', description: '', image: '', link: '' }],
    education: portfolio?.education?.length > 0
      ? portfolio.education
      : [{ degree: '', institution: '', year: '', description: '' }],
    socialLinks: portfolio?.socialLinks || { linkedin: '', github: '', twitter: '' },
    selectedTemplate: portfolio?.selectedTemplate || 1,
    selectedTheme: portfolio?.selectedTheme || 'dark',
    isPublished: portfolio?.isPublished || false,
  }), [portfolio, userData]);

  const [formData, setFormData] = useState(initialFormData);

  // Sync formData with userData changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      profileImage: userData?.profileImage || prev.profileImage,
      fullName: userData?.fullName || prev.fullName,
      email: userData?.email || prev.email,
      phone: userData?.phone || prev.phone,
      location: userData?.location || prev.location,
    }));
  }, [userData]);

  const templates = useMemo(() => [
    { id: 1, name: 'Professional', image: '/assets/ea774e63432d019731441bd1dd096f8f.webp' },
    { id: 2, name: 'Creative', image: '/assets/images/template2.png' },
    { id: 3, name: 'Minimal', image: '/assets/images/template3.png' },
  ], []);

  const themes = useMemo(() => [
    { id: 'dark', name: 'Dark Mode', primary: '#121212', secondary: '#1e1e1e', accent: '#8a2be2' },
    { id: 'light', name: 'Light Mode', primary: '#ffffff', secondary: '#f5f5f5', accent: '#8a2be2' },
    { id: 'blue', name: 'Blue Ocean', primary: '#0a192f', secondary: '#172a45', accent: '#64ffda' },
    { id: 'green', name: 'Forest', primary: '#1a2f1a', secondary: '#2d482d', accent: '#7fff00' },
    { id: 'purple', name: 'Cosmic Purple', primary: '#2d1b4e', secondary: '#442873', accent: '#ff7edb' },
    { id: 'red', name: 'Ruby', primary: '#2b0a0a', secondary: '#3d1515', accent: '#ff4d4d' },
  ], []);

  const handleContentChange = useCallback((newData) => {
    setFormData((prevData) => ({ ...prevData, ...newData }));
  }, []);

  const handleTemplateSelect = useCallback((templateId) => {
    setFormData((prevData) => ({ ...prevData, selectedTemplate: templateId }));
  }, []);

  const handleThemeSelect = useCallback((themeName) => {
    setFormData((prevData) => ({ ...prevData, selectedTheme: themeName }));
  }, []);

  const handleNextStep = useCallback(() => {
    if (currentStep < 4) {
      setIsLoading(true);
      setTimeout(() => {
        setCurrentStep((prevStep) => prevStep + 1);
        setIsLoading(false);
      }, 300);
    }
  }, [currentStep]);

  const handlePreviousStep = useCallback(() => {
    if (currentStep > 1) {
      setIsLoading(true);
      setTimeout(() => {
        setCurrentStep((prevStep) => prevStep - 1);
        setIsLoading(false);
      }, 300);
    }
  }, [currentStep]);

  const handlePublishToggle = useCallback(() => {
    setFormData((prevData) => ({ ...prevData, isPublished: !prevData.isPublished }));
  }, []);

  const handleSave = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Please log in to save your portfolio');
      }

      // Fetch latest user data to ensure profileImage is current
      const userResponse = await axios.get('https://backendportfolio-v4kd.onrender.com/api/auth/me', {
        headers: { Authorization: token },
      });
      const latestUser = userResponse.data;

      const portfolioData = {
        title: formData.title,
        profession: formData.profession,
        bio: formData.bio,
        skills: formData.skills,
        achievements: formData.achievements,
        experiences: formData.experiences,
        projects: formData.projects,
        education: formData.education,
        socialLinks: formData.socialLinks,
        selectedTemplate: String(formData.selectedTemplate),
        selectedTheme: formData.selectedTheme,
        isPublished: formData.isPublished,
        fullName: formData.fullName,
        profileImage: latestUser.profileImage || formData.profileImage, // Prefer User model's profileImage
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
      };

      const config = { headers: { Authorization: token } };

      let savedPortfolio;
      if (isEditing) {
        savedPortfolio = await axios.put(
          `https://backendportfolio-v4kd.onrender.com/api/portfolio/update/${portfolio.id}`,
          portfolioData,
          config
        );
      } else {
        savedPortfolio = await axios.post(
          'https://backendportfolio-v4kd.onrender.com/api/portfolio/create',
          portfolioData,
          config
        );
      }

      if (onSave) {
        await onSave();
      }

      setIsLoading(false);
      navigate('/dashboard', {
        state: { section: 'dashboard' },
        replace: true,
      });
    } catch (error) {
      setIsLoading(false);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.errors?.[0]?.msg ||
        error.message ||
        'Failed to save portfolio. Please try again.';
      setError(errorMessage);
      console.error('Error saving portfolio:', error);
    }
  }, [formData, isEditing, navigate, onSave, portfolio]);

  const stepContent = useMemo(() => {
    switch (currentStep) {
      case 1:
        return <ContentForm initialData={formData} onSave={handleContentChange} userData={userData} />;
      case 2:
        return (
          <TemplateSelector
            templates={templates}
            selectedTemplate={formData.selectedTemplate}
            onSelect={handleTemplateSelect}
            formData={formData}
          />
        );
      case 3:
        return (
          <ThemeSelector
            themes={themes}
            selectedTheme={formData.selectedTheme}
            onSelect={handleThemeSelect}
            formData={formData}
            selectedTemplate={formData.selectedTemplate}
          />
        );
      case 4:
        return (
          <Preview
            formData={formData}
            onPublishToggle={handlePublishToggle}
            userData={userData}
          />
        );
      default:
        return null;
    }
  }, [
    currentStep,
    formData,
    templates,
    themes,
    handleContentChange,
    handleTemplateSelect,
    handleThemeSelect,
    handlePublishToggle,
    userData,
  ]);

  const stepIndicators = useMemo(() => (
    <div className={styles.stepIndicator}>
      <div className={styles.steps}>
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={`${styles.step} ${currentStep >= step ? styles.active : ''} ${
              currentStep === step ? styles.current : ''
            }`}
          >
            <div className={styles.stepNumber}>{step}</div>
            <div className={styles.stepLabel}>
              {step === 1 ? 'Content' : step === 2 ? 'Template' : step === 3 ? 'Theme' : 'Preview'}
            </div>
          </div>
        ))}
        <div className={styles.progressLine}>
          <div
            className={styles.progressFill}
            style={{ width: `${(currentStep - 1) * 33.33}%` }}
          ></div>
        </div>
      </div>
    </div>
  ), [currentStep]);

  const navigationButtons = useMemo(() => (
    <div className={styles.navigationButtons}>
      {currentStep > 1 && (
        <button
          className={styles.previousBtn}
          onClick={handlePreviousStep}
          disabled={isLoading}
        >
          <ArrowLeft size={16} className={styles.buttonIcon} /> Previous
        </button>
      )}

      {currentStep < 4 ? (
        <button
          className={styles.nextBtn}
          onClick={handleNextStep}
          disabled={isLoading}
        >
          Next <ArrowRight size={16} className={styles.buttonIcon} />
        </button>
      ) : (
        <button
          className={styles.saveBtn}
          onClick={handleSave}
          disabled={isLoading}
        >
          Save & Finish <Check size={16} className={styles.buttonIcon} />
        </button>
      )}
    </div>
  ), [currentStep, handleNextStep, handlePreviousStep, handleSave, isLoading]);

  return (
    <div className={styles.builderPage}>
      <main className={styles.builderContent}>
        {stepIndicators}

        <div className={styles.builderContainer}>
          {isLoading ? (
            <div className={styles.loadingContainer}>
              <div className={styles.loadingSpinner}></div>
            </div>
          ) : (
            <>
              {error && (
                <div className={styles.errorMessage}>{error}</div>
              )}
              {stepContent}
            </>
          )}
        </div>

        {navigationButtons}
      </main>
    </div>
  );
};

export default React.memo(BuilderPage);