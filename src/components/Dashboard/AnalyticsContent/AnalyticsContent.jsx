import React from 'react';
import styles from './AnalyticsContent.module.css';
import { 

  BarChartCard, 
  PieChartCard, 
  ChartsGrid, 
  AnalyticsSection 
} from '../../ui/ChartComponent';
import { 
  FiEye, 
  FiUsers, 
  FiMonitor, 
  FiSmartphone 
} from 'react-icons/fi';

const AnalyticsContent = ({ portfolioData }) => {
  const weeklyViewsData = portfolioData.analytics.weeklyViews.map((views, index) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index],
    views,
  }));

  const deviceData = [
    { name: 'Desktop', value: portfolioData.analytics.popularDevices.desktop },
    { name: 'Mobile', value: portfolioData.analytics.popularDevices.mobile },
    { name: 'Tablet', value: portfolioData.analytics.popularDevices.tablet },
  ];

  const statsData = [
    { 
      icon: <FiEye size={24} className={styles.statIcon} />, 
      value: portfolioData.analytics.totalViews, 
      label: 'Total Views' 
    },
    { 
      icon: <FiUsers size={24} className={styles.statIcon} />, 
      value: portfolioData.analytics.totalUniqueVisitors, 
      label: 'Unique Visitors' 
    },
    { 
      icon: <FiMonitor size={24} className={styles.statIcon} />, 
      value: `${portfolioData.analytics.popularDevices.desktop}%`, 
      label: 'Desktop Users' 
    },
    { 
      icon: <FiSmartphone size={24} className={styles.statIcon} />, 
      value: `${portfolioData.analytics.popularDevices.mobile}%`, 
      label: 'Mobile Users' 
    },
  ];

  return (
    <div className={styles.analyticsContent}>
      <div className={styles.dashboardHeader}>
        <div className={styles.headerLeft}>
          <h1>Advanced Analytics</h1>
          <p className={styles.welcomeText}>Insights about your portfolio performance</p>
        </div>
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
      

      <AnalyticsSection title="Detailed Analytics">
        <ChartsGrid>
          <BarChartCard title="Weekly Traffic" data={weeklyViewsData} />
          <PieChartCard title="Device Distribution" data={deviceData} />
        </ChartsGrid>
      </AnalyticsSection>
    </div>
  );
};

export default AnalyticsContent;