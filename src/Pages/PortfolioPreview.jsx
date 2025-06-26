import React from 'react';
import ProfessionalTemplate from '../components/Template/ProfessionalTemplate1/ProfessionalTemplate1';
import ModernMinimalTemplate from '../components/Template/ModernMinimalTemplate/ModernMinimalTemplate';
import CreativePortfolioTemplate from '../components/Template/CreativePortfolioTemplate/CreativePortfolioTemplate';

const PortfolioPreview = () => {
  // Retrieve formData from localStorage
  const formData = JSON.parse(localStorage.getItem('portfolioFormData')) || { selectedTemplate: 'Professional' };

  const renderTemplate = () => {
    const templateId = formData.selectedTemplate || 'Professional';
    switch (templateId) {
      case 'Minimal':
        return <ModernMinimalTemplate formData={formData} />;
      case 'Professional':
        return <ProfessionalTemplate formData={formData} />;
      case 'Creative':
        return <CreativePortfolioTemplate formData={formData} />;
      default:
        return <div>Default Template</div>;
    }
  };

  return <div>{renderTemplate()}</div>;
};

export default PortfolioPreview;