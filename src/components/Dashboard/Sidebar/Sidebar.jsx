import React from 'react';
import { 
  FiGrid, 
  FiTool, 
  FiLayout, 
  FiBarChart2, 
  FiSettings, 
  FiHelpCircle, 
  FiLogOut
} from 'react-icons/fi';
import styles from './Sidebar.module.css';

const Sidebar = ({ activeSection, setActiveSection, userData, sidebarCollapsed, toggleSidebar }) => {
  const navItems = [
    { id: 'dashboard', icon: <FiGrid />, label: 'Dashboard' },
    { id: 'builder', icon: <FiTool />, label: 'Builder' },
    { id: 'templates', icon: <FiLayout />, label: 'Templates' },
    { id: 'analytics', icon: <FiBarChart2 />, label: 'Analytics' },
    { id: 'settings', icon: <FiSettings />, label: 'Settings' },
    { id: 'help', icon: <FiHelpCircle />, label: 'Help' },
  ];
function handlelogOut() {
    localStorage.removeItem('token');
    window.location.href = '/';
  }
  return (
    <div className={`${styles.sidebar} ${sidebarCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.sidebarHeader}>
        <div className={styles.logoContainer} onClick={toggleSidebar}>
          {!sidebarCollapsed && (
            <h1 className={styles.logo}>
              <span className={styles.logoText}>Folio</span>
              <span className={styles.logoAccent}>Stack</span>
            </h1>
          )}
          {sidebarCollapsed && (
            <h1 className={styles.logoShort}>FS</h1>
          )}
        </div>
      </div>

      <nav className={styles.navigation}>
        <ul className={styles.navList}>
          {navItems.map((item) => (
            <li key={item.id} className={styles.navItem}>
              <a
                href="#"
                className={`${styles.navLink} ${activeSection === item.id ? styles.active : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveSection(item.id);
                }}
              >
                <span className={styles.navIcon}>{item.icon}</span>
                <span className={styles.navLabel}>{item.label}</span>
                {activeSection === item.id && <span className={styles.activeIndicator} />}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.userSection}>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>
            {userData.avatar || userData.name.charAt(0).toUpperCase()}
          </div>
          <div className={styles.userDetails}>
            <h4 className={styles.userName}>{userData.name}</h4>
            <p className={styles.userEmail}>{userData.email}</p>
          </div>
        </div>

        <button onClick={handlelogOut} className={styles.logoutButton}>
          <span className={styles.logoutIcon}><FiLogOut /></span>
          <span className={styles.logoutText}>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;