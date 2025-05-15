import React, { useState, useEffect } from 'react';
import styles from './HelpContent.module.css';
import { HelpCircle, Search, ChevronDown, MessageSquare, ExternalLink, Clock, PenTool, Globe } from 'lucide-react';

const HelpContent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeIndex, setActiveIndex] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const faqs = [
    {
      question: 'How do I create a new portfolio?',
      answer: 'To create a new portfolio, navigate to the Builder section and click the "Create New Portfolio" button. Then select a template to get started.',
      icon: <PenTool size={20} className={styles.faqIcon} />
    },
    {
      question: 'How do I customize my portfolio theme?',
      answer: 'In the Builder section, you can select from various themes by clicking on the "Theme" tab in the customization panel.',
      icon: <PenTool size={20} className={styles.faqIcon} />
    },
    {
      question: 'How do I publish my portfolio?',
      answer: 'Once you\'ve completed editing your portfolio, click the "Publish" button in the Builder. Your portfolio will then be live and accessible via your unique URL.',
      icon: <Globe size={20} className={styles.faqIcon} />
    },
    {
      question: 'Can I see who has viewed my portfolio?',
      answer: 'While you cannot see individual visitors, you can view analytics including total views, unique visitors, and device breakdowns in the Analytics section.',
      icon: <Clock size={20} className={styles.faqIcon} />
    },
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const quickLinks = [
    { title: 'Getting Started Guide', icon: <Clock size={20} /> },
    { title: 'Video Tutorials', icon: <ExternalLink size={20} /> },
    { title: 'Templates Gallery', icon: <PenTool size={20} /> },
  ];

  return (
    <div className={`${styles.helpContent} ${isLoaded ? styles.loaded : ''}`}>
      <div className={styles.dashboardHeader}>
        <div className={styles.headerLeft}>
          <h1><HelpCircle size={28} className={styles.titleIcon} /> Help Center</h1>
          <p className={styles.welcomeText}>Get assistance with Portfolio Builder</p>
        </div>
      </div>

      <div className={styles.searchContainer}>
        <div className={styles.searchBox}>
          <Search size={20} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search for help..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.contentGrid}>
        <div className={styles.mainHelpSection}>
          <h2>Frequently Asked Questions</h2>
          {filteredFaqs.length === 0 ? (
            <div className={styles.noResults}>
              <p>No FAQs match your search. Try different keywords or contact support.</p>
            </div>
          ) : (
            filteredFaqs.map((faq, index) => (
              <div 
                key={index} 
                className={`${styles.faqItem} ${activeIndex === index ? styles.active : ''}`}
                onClick={() => toggleFaq(index)}
              >
                <div className={styles.faqHeader}>
                  {faq.icon}
                  <h3>{faq.question}</h3>
                  <ChevronDown 
                    size={20} 
                    className={`${styles.chevron} ${activeIndex === index ? styles.rotate : ''}`} 
                  />
                </div>
                <div className={`${styles.faqAnswer} ${activeIndex === index ? styles.expanded : ''}`}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className={styles.sidebarSection}>
          <div className={styles.quickLinksCard}>
            <h3>Quick Links</h3>
            <ul className={styles.quickLinksList}>
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <span className={styles.quickLinkIcon}>{link.icon}</span>
                  <span>{link.title}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.supportCard}>
            <div className={styles.supportIconCircle}>
              <MessageSquare size={24} />
            </div>
            <h3>Still need help?</h3>
            <p>
              Our support team is available 24/7 to assist you with any questions.
            </p>
            <a href="mailto:support@portfoliobuilder.com" className={styles.contactButton}>
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpContent;