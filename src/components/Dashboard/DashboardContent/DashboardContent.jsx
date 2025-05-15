import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './DashboardContent.module.css';
import { 
  BarChartCard, 
  PieChartCard, 
  ChartsGrid, 
  AnalyticsSection 
} from '../../ui/ChartComponent';
import { 
  FolderOpen, 
  Eye, 
  Users, 
  Clock, 
  Plus,
  Edit,
  Globe,
  Trash2
} from 'lucide-react';

const DashboardContent = ({ userData, portfolioData, setActiveSection, fetchData }) => {
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  // Memoize filtered portfolios to prevent recalculation on every render
  const filteredPortfolios = useMemo(() => {
    return filter === 'all'
      ? portfolioData.portfolios
      : portfolioData.portfolios.filter(p => filter === 'published' ? p.published : !p.published);
  }, [filter, portfolioData.portfolios]);

  // Memoize transformed data to prevent recalculation on every render
  const weeklyViewsData = useMemo(() => {
    return portfolioData.analytics.weeklyViews.map((views, index) => ({
      day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index],
      views,
    }));
  }, [portfolioData.analytics.weeklyViews]);

  const deviceData = useMemo(() => [
    { name: 'Desktop', value: portfolioData.analytics.popularDevices.desktop },
    { name: 'Mobile', value: portfolioData.analytics.popularDevices.mobile },
    { name: 'Tablet', value: portfolioData.analytics.popularDevices.tablet },
  ], [portfolioData.analytics.popularDevices]);

  const statsData = useMemo(() => [
    { icon: <FolderOpen size={20} />, value: portfolioData.portfolios.length, label: 'Total Portfolios' },
    { icon: <Eye size={20} />, value: portfolioData.analytics.totalViews, label: 'Total Views' },
    { icon: <Users size={20} />, value: portfolioData.analytics.totalUniqueVisitors, label: 'Unique Visitors' },
    { icon: <Clock size={20} />, value: portfolioData.analytics.avgTimeOnPage, label: 'Average Time on Page' },
  ], [portfolioData.portfolios.length, portfolioData.analytics]);

  // Use callback to prevent recreation of the function on each render
  const handleEditPortfolio = useCallback((portfolio) => {
    setActiveSection('builder');
    navigate('/dashboard', {
      state: { portfolio, isEditing: true, section: 'builder' },
      replace: true
    });
    // Keep the reload as per your previous requirement
    window.location.reload();
  }, [navigate, setActiveSection]);

  // Use callback for setting filter
  const handleFilterChange = useCallback((newFilter) => {
    setFilter(newFilter);
  }, []);

  // Use callback for creating new portfolio
  const handleCreateNew = useCallback(() => {
    setActiveSection('builder');
    navigate('/dashboard', {
      state: { section: 'builder' },
      replace: true
    });
  }, [navigate, setActiveSection]);

  // Handle portfolio deletion
  const handleDeletePortfolio = useCallback(async (portfolioId) => {
    if (!window.confirm('Are you sure you want to delete this portfolio?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      await axios.delete(`https://backendportfolio-v4kd.onrender.com/api/portfolio/delete/${portfolioId}`, {
        headers: { Authorization: token },
      });

      // Refresh portfolio data
      await fetchData();
    } catch (error) {
      console.error('Error deleting portfolio:', error);
      alert('Failed to delete portfolio. Please try again.');
    }
  }, [fetchData]);

  // Handle toggle publish/unpublish
  const handleTogglePublish = useCallback(async (portfolio) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const updatedPortfolio = {
        ...portfolio,
        isPublished: !portfolio.published, // Toggle the published state
      };

      await axios.put(
        `https://backendportfolio-v4kd.onrender.com/api/portfolio/update/${portfolio.id}`,
        updatedPortfolio,
        {
          headers: { Authorization: token },
        }
      );

      // Refresh portfolio data
      await fetchData();
    } catch (error) {
      console.error('Error toggling publish status:', error);
      alert('Failed to update publish status. Please try again.');
    }
  }, [fetchData]);

  return (
    <div className={styles.dashboardContent}>
      <div className={styles.welcomeStatsContainer}>
        <div className={styles.welcomeSection}>
          <h1>Dashboard</h1>
          <p className={styles.welcomeText}>Welcome back, <span>{userData.name}</span>!</p>
          <p className={styles.welcomeSubtext}>Here's what's happening with your portfolios today</p>
          
          <button onClick={handleCreateNew} className={styles.createButton}>
            <Plus size={18} />
            Create New Portfolio
          </button>
        </div>
        
        <div className={styles.statsGrid}>
          {statsData.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <div className={styles.statIcon}>
                {stat.icon}
              </div>
              <div className={styles.statInfo}>
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnalyticsSection title="Traffic Analytics">
        <ChartsGrid>
          <BarChartCard title="Visitor Trends" data={weeklyViewsData} />
          <PieChartCard title="Device Analytics" data={deviceData} />
        </ChartsGrid>
      </AnalyticsSection>

      <div className={styles.portfoliosSection}>
        <div className={styles.sectionHeader}>
          <h2>Your Portfolios</h2>
          <div className={styles.filterButtons}>
            <button
              className={`${styles.filterButton} ${filter === 'all' ? styles.active : ''}`}
              onClick={() => handleFilterChange('all')}
            >
              All
            </button>
            <button
              className={`${styles.filterButton} ${filter === 'published' ? styles.active : ''}`}
              onClick={() => handleFilterChange('published')}
            >
              Published
            </button>
            <button
              className={`${styles.filterButton} ${filter === 'draft' ? styles.active : ''}`}
              onClick={() => handleFilterChange('draft')}
            >
              Drafts
            </button>
          </div>
        </div>

        <div className={styles.portfolioTable}>
          <div className={styles.tableHeader}>
            <div className={styles.tableCell}>Name</div>
            <div className={styles.tableCell}>Template</div>
            <div className={styles.tableCell}>Theme</div>
            <div className={styles.tableCell}>Status</div>
            <div className={styles.tableCell}>Views</div>
            <div className={styles.tableCell}>Last Updated</div>
            <div className={styles.tableCell}>Actions</div>
          </div>
          
          {filteredPortfolios.length === 0 ? (
            <div className={styles.noPortfolios}>
              No portfolios found. Create your first portfolio!
            </div>
          ) : (
            filteredPortfolios.map(portfolio => (
              <div key={portfolio.id} className={styles.tableRow}>
                <div className={styles.tableCell}>
                  <div className={styles.portfolioTitle}>{portfolio.title}</div>
                </div>
                <div className={styles.tableCell}>{portfolio.template}</div>
                <div className={styles.tableCell}>
                  <span className={`${styles.themeTag} ${styles[`theme${portfolio.theme.replace(/\s+/g, '')}`]}`}>
                    {portfolio.theme}
                  </span>
                </div>
                <div className={styles.tableCell}>
                  <span className={portfolio.published ? styles.statusPublished : styles.statusDraft}>
                    {portfolio.published ? 'Published' : 'Draft'}
                  </span>
                </div>
                <div className={styles.tableCell}>{portfolio.views}</div>
                <div className={styles.tableCell}>{portfolio.lastUpdated}</div>
                <div className={styles.tableCell}>
                  <div className={styles.actionButtons}>
                    <button
                      className={styles.editButton}
                      onClick={() => handleEditPortfolio(portfolio)}
                    >
                      <Edit size={14} />
                      <span>Edit</span>
                    </button>
                    <button
                      className={styles.filterButton}
                      onClick={() => handleDeletePortfolio(portfolio.id)}
                    >
                      <Trash2 size={14} />
                      
                    </button>
                    <button
                      className={portfolio.published ? styles.unpublishButton : styles.publishButton}
                      onClick={() => handleTogglePublish(portfolio)}
                    >
                      <Globe size={14} />
                      <span>{portfolio.published ? 'Unpublish' : 'Publish'}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// Use React.memo to prevent unnecessary renders when props don't change
export default React.memo(DashboardContent);