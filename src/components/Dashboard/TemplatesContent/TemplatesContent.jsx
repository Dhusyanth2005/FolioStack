import React, { useState } from 'react';
import styles from './TemplatesContent.module.css';
import { Star, Crown, Check, Search } from 'lucide-react';

const TemplatesContent = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const templates = [
    {
      id: 1,
      name: 'Modern Minimal',
      description: 'Clean and minimalist design with a focus on content and readability.',
      image: '/api/placeholder/300/200',
      features: ['Responsive layout', 'Clean typography', 'Minimal animations', 'Dark/Light mode'],
      tag: 'FREE',
      category: 'free',
      popular: true
    },
    {
      id: 2,
      name: 'Creative Portfolio',
      description: 'Bold and artistic design with creative layouts for visual portfolios.',
      image: '/api/placeholder/300/200',
      features: ['Gallery layout', 'Project showcase', 'Bold typography', 'Interactive elements'],
      tag: 'FREE',
      category: 'free',
      popular: true
    },
    {
      id: 3,
      name: 'Professional Resume',
      description: 'Traditional resume-style layout ideal for professional portfolios.',
      image: '/api/placeholder/300/200',
      features: ['Resume-style layout', 'Print-friendly', 'Formal design', 'Contact form'],
      tag: 'FREE',
      category: 'free',
      popular: false
    },
    {
      id: 4,
      name: 'Premium Business',
      description: 'Corporate design with professional sections for business portfolios.',
      image: '/api/placeholder/300/200',
      features: ['Business metrics', 'Service showcases', 'Client testimonials', 'Contact form'],
      tag: 'PREMIUM',
      category: 'premium',
      popular: true
    },
    {
      id: 5,
      name: 'Developer Pro',
      description: 'Specialized for developers with code showcases and GitHub integration.',
      image: '/api/placeholder/300/200',
      features: ['Code snippets', 'GitHub stats', 'Project timeline', 'Skills visualization'],
      tag: 'PREMIUM',
      category: 'premium',
      popular: true
    },
    {
      id: 6,
      name: 'Photography Elite',
      description: 'Showcase your photography with fullscreen galleries and minimal interface.',
      image: '/api/placeholder/300/200',
      features: ['Fullscreen galleries', 'Image lightbox', 'Category filtering', 'Custom colors'],
      tag: 'PREMIUM',
      category: 'premium',
      popular: false
    }
  ];

  const filteredTemplates = templates.filter(template => {
    // Filter by active category
    if (activeCategory !== 'all' && activeCategory !== 'popular' && template.category !== activeCategory) {
      return false;
    }
    
    // For popular category
    if (activeCategory === 'popular' && !template.popular) {
      return false;
    }
    
    // Filter by search
    if (searchQuery && !template.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !template.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  const categories = [
    { id: 'all', label: 'All Templates' },
    { id: 'free', label: 'Free Templates' },
    { id: 'premium', label: 'Premium Templates' },
    { id: 'popular', label: 'Popular Templates' }
  ];

  const formatDate = () => {
    const date = new Date();
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <div className={styles.templatesContent}>
      {/* Welcome Header */}
      <div className={styles.welcomeHeader}>
        <div className={styles.headerTextContent}>
          <h1>Template Gallery</h1>
          <p className={styles.welcomeText}>
            Discover professional templates designed to showcase your work and skills. 
            Choose from our collection of free and premium designs to create your perfect portfolio.
          </p>
          <div className={styles.searchBox}>
            <input 
              type="text" 
              placeholder="Search templates..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search size={20} className={styles.searchIcon} />
          </div>
        </div>
        <div className={styles.headerVisual}>
          <div className={styles.headerCards}>
            <div className={styles.headerCard}></div>
            <div className={styles.headerCard}></div>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className={styles.categoryFilters}>
        {categories.map(category => (
          <button 
            key={category.id}
            className={`${styles.categoryButton} ${activeCategory === category.id ? styles.active : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.label}
          </button>
        ))}
        <div className={styles.updateInfo}>
          <span>Last updated: {formatDate()}</span>
        </div>
      </div>

      {/* Templates Grid */}
      <div className={styles.templatesGrid}>
        {filteredTemplates.length > 0 ? (
          filteredTemplates.map((template) => (
            <div key={template.id} className={styles.templateCard}>
              <div className={styles.templatePreview}>
                <img src={template.image} alt={template.name} />
                <div className={styles.templateTag}>
                  {template.tag === 'PREMIUM' ? (
                    <span className={styles.premiumTag}>
                      <Crown size={14} /> Premium
                    </span>
                  ) : (
                    <span className={styles.freeTag}>Free</span>
                  )}
                </div>
                {template.popular && (
                  <div className={styles.popularBadge}>
                    <Star size={14} /> Popular
                  </div>
                )}
              </div>
              <div className={styles.templateContent}>
                <h3>{template.name}</h3>
                <p className={styles.templateDescription}>{template.description}</p>
                <ul className={styles.featuresList}>
                  {template.features.map((feature, idx) => (
                    <li key={idx}>
                      <Check size={14} className={styles.checkIcon} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className={styles.cardFooter}>
                  <button className={styles.previewButton}>Preview</button>
                  <button className={styles.useButton}>Use Template</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.noResults}>
            <p>No templates found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplatesContent;