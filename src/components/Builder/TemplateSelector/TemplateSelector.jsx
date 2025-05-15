import React, { useState } from 'react';
import { ChevronRight, CheckCircle } from 'lucide-react';
import styles from './TemplateSelector.module.css';

const TemplateSelector = ({ onSelect, selectedTemplate }) => {
  const templates = [
    {
      id: 'Professional',
      name: 'Professional',
      description: 'Traditional resume-style layout ideal for professional portfolios.',
      image: '/assets/ea774e63432d019731441bd1dd096f8f.webp',
      features: ['Resume-style layout', 'Print-friendly', 'Formal design', 'Contact form'],
      tag: 'FREE'
    },
    {
      id: 'Creative',
      name: 'Creative',
      description: 'Bold and artistic design with creative layouts for visual portfolios.',
      image: '/assets/images/template2.png',
      features: ['Gallery layout', 'Project showcase', 'Bold typography', 'Interactive elements'],
      tag: 'FREE'
    },
    {
      id: 'Minimal',
      name: 'Minimal',
      description: 'Clean and minimalist design with a focus on content and readability.',
      image: '/assets/images/template3.png',
      features: ['Responsive layout', 'Clean typography', 'Minimal animations', 'Dark/Light mode'],
      tag: 'FREE'
    }
  ];

  const [activeTemplate, setActiveTemplate] = useState(selectedTemplate || templates[0].id);

  const handleTemplateSelect = (templateId) => {
    setActiveTemplate(templateId);
    onSelect(templateId);
  };

  return (
    <div className={styles.templateSelector}>
      <div className={styles.sectionHeader}>
        <h2>Choose a Template</h2>
        <button className={styles.exploreMoreBtn}>
          Explore More <ChevronRight size={18} />
        </button>
      </div>
      
      <p className={styles.instruction}>
        Select a template for your portfolio. You can preview your content in each template before making a final choice.
      </p>

      <div className={styles.templatesGrid}>
        {templates.map(template => (
          <div 
            key={template.id} 
            className={`${styles.templateCard} ${activeTemplate === template.id ? styles.selected : ''}`}
            onClick={() => handleTemplateSelect(template.id)}
          >
            <div className={styles.templateImage}>
              <img src={template.image} alt={template.name} />
              <div className={styles.freeTag}>{template.tag}</div>
              {activeTemplate === template.id && (
                <div className={styles.selectedOverlay}>
                  <CheckCircle size={32} className={styles.checkIcon} />
                </div>
              )}
            </div>
            
            <div className={styles.templateInfo}>
              <h3>{template.name}</h3>
              <p>{template.description}</p>
              
              <h4>Features:</h4>
              <ul className={styles.featuresList}>
                {template.features.map((feature, index) => (
                  <li key={index}>
                    <span className={styles.featureDot}></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <button 
              className={activeTemplate === template.id ? styles.selectedBtn : styles.selectBtn}
            >
              {activeTemplate === template.id ? 'Selected' : 'Select Template'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;