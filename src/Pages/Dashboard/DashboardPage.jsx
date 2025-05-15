import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './DashboardPage.module.css';
import Sidebar from '../../components/Dashboard/Sidebar/Sidebar';
import DashboardContent from '../../components/Dashboard/DashboardContent/DashboardContent';
import AnalyticsContent from '../../components/Dashboard/AnalyticsContent/AnalyticsContent';
import BuilderContent from '../BuilderPage/BuilderPage';
import TemplatesContent from '../../components/Dashboard/TemplatesContent/TemplatesContent';
import SettingsContent from '../../components/Dashboard/SettingsContent/SettingsContent';
import HelpContent from '../../components/Dashboard/HelpContent/HelpContent';

const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [userData, setUserData] = useState({
    name: 'John Doe',
    avatar: 'JD',
    email: 'john@example.com',
  });
  const [portfolioData, setPortfolioData] = useState({
    portfolios: [],
    analytics: {
      totalViews: 0,
      totalUniqueVisitors: 0,
      weeklyViews: [0, 0, 0, 0, 0, 0, 0],
      popularDevices: { desktop: 0, mobile: 0, tablet: 0 },
      avgTimeOnPage: '0:00',
    },
  });
  
  const location = useLocation();
  const navigate = useNavigate();

  // Check for active section in location state
  useEffect(() => {
    if (location.state?.section) {
      setActiveSection(location.state.section);
    }
  }, [location.state]);

  // Memoize the fetch function to prevent unnecessary re-creation
  const fetchData = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      // Use Promise.all to fetch data in parallel
      const [userResponse, portfolioResponse] = await Promise.all([
        axios.get('https://backendportfolio-v4kd.onrender.com/api/auth/me', {
          headers: { Authorization: token },
        }),
        axios.get('https://backendportfolio-v4kd.onrender.com/api/portfolio/', {
          headers: { Authorization: token },
        })
      ]);

      setUserData({
        name: userResponse.data.fullName,
        avatar: userResponse.data.fullName
          ? userResponse.data.fullName.charAt(0).toUpperCase()
          : 'U',
        email: userResponse.data.email,
      });

      // Transform portfolio data once instead of on each render
      const transformedPortfolios = portfolioResponse.data.map((portfolio) => ({
        id: portfolio._id,
        title: portfolio.title || 'Untitled Portfolio',
        template: portfolio.selectedTemplate || 'Default',
        theme: portfolio.selectedTheme || 'Dark',
        published: portfolio.isPublished || false,
        createdAt: new Date(portfolio.createdAt).toISOString().split('T')[0],
        lastUpdated: new Date(portfolio.updatedAt || portfolio.createdAt).toISOString().split('T')[0],
        views: portfolio.views || 0,
        uniqueVisitors: portfolio.uniqueVisitors || 0,
        profession: portfolio.profession || '',
        bio: portfolio.bio || '',
        skills: portfolio.skills || [],
        achievements: portfolio.achievements || [],
        experiences: portfolio.experiences || [],
        projects: portfolio.projects || [],
        education: portfolio.education || [],
        socialLinks: portfolio.socialLinks || { linkedin: '', github: '', twitter: '' },
      }));

      setPortfolioData({
        portfolios: transformedPortfolios,
        analytics: {
          totalViews: transformedPortfolios.reduce((sum, p) => sum + (p.views || 0), 0),
          totalUniqueVisitors: transformedPortfolios.reduce((sum, p) => sum + (p.uniqueVisitors || 0), 0),
          weeklyViews: [12, 19, 45, 36, 64, 78, 72], // This would come from API in a real app
          popularDevices: { desktop: 65, mobile: 28, tablet: 7 }, // This would come from API
          avgTimeOnPage: '3:12', // This would come from API
        },
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    
    // Clean up any pending requests
    return () => {
      // Implement cancellation logic if needed
    };
  }, [fetchData]);

  // Handle section changes with proper state management
  const handleSectionChange = useCallback((section) => {
    setActiveSection(section);
    // Update location state to maintain navigation history
    navigate('/dashboard', { state: { section }, replace: true });
  }, [navigate]);

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed(prev => !prev);
  }, []);

  // Memoize content rendering to prevent unnecessary re-renders
  const content = useMemo(() => {
    if (isLoading) {
      return (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading your dashboard...</p>
        </div>
      );
    }

    const commonProps = {
      userData,
      portfolioData,
      setActiveSection: handleSectionChange,
      fetchData, // Pass fetchData to DashboardContent
    };

    switch (activeSection) {
      case 'dashboard':
        return <DashboardContent {...commonProps} />;
      case 'builder':
        return <BuilderContent userData={userData} onSave={fetchData} />;
      case 'templates':
        return <TemplatesContent {...commonProps} />;
      case 'analytics':
        return <AnalyticsContent portfolioData={portfolioData} />;
      case 'settings':
        return <SettingsContent userData={userData} />;
      case 'help':
        return <HelpContent />;
      default:
        return <DashboardContent {...commonProps} />;
    }
  }, [activeSection, isLoading, userData, portfolioData, handleSectionChange, fetchData]);

  return (
    <div className={styles.dashboardPage}>
      <Sidebar
        activeSection={activeSection}
        setActiveSection={handleSectionChange}
        userData={userData}
        sidebarCollapsed={sidebarCollapsed}
        toggleSidebar={toggleSidebar}
      />
      <div className={styles.mainContentWrapper}>{content}</div>
    </div>
  );
};

export default React.memo(DashboardPage);