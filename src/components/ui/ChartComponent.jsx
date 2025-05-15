import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import styles from './ChartComponent.module.css';

const COLORS = ['#52B69A', '#168AAD', '#99D98C'];

export const StatCard = ({ icon, value, label }) => {
  return (
    <div className={styles.statCard}>
      <div className={styles.statIcon}>{icon}</div>
      <div className={styles.statInfo}>
        <h3>{value}</h3>
        <p>{label}</p>
      </div>
    </div>
  );
};

export const StatsGrid = ({ stats }) => {
  return (
    <div className={styles.statsGrid}>
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          icon={stat.icon}
          value={stat.value}
          label={stat.label}
        />
      ))}
    </div>
  );
};

export const BarChartCard = ({ title, data }) => {
  return (
    <div className={styles.chartCard}>
      <h3>{title}</h3>
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="views" fill="var(--primary-green)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export const PieChartCard = ({ title, data }) => {
  return (
    <div className={styles.chartCard}>
      <h3>{title}</h3>
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export const ChartsGrid = ({ children }) => {
  return <div className={styles.analyticsGrid}>{children}</div>;
};

export const AnalyticsSection = ({ title, children }) => {
  return (
    <div className={styles.analyticsSection}>
      <h2>{title}</h2>
      {children}
    </div>
  );
};