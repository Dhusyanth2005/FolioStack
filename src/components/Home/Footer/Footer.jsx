// Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>
            <Link to="/" className={styles.logoText}>
              Folio<span>Stack</span>
            </Link>
            <p>Create stunning portfolio websites in minutes.</p>
            <div className={styles.socialIcons}>
              <a href="#" aria-label="Twitter">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 4.01C21 4.5 20.02 4.84 19 5C17.58 3.69 15.23 3.82 14 5.2C12.91 6.41 12.58 8.25 13.22 9.75C8.99 9.53 5.21 7.35 2.75 4C1.38 6.49 2.11 9.58 4.17 11C3.25 10.97 2.38 10.72 1.64 10.25V10.35C1.64 13.03 3.44 15.29 5.94 15.88C5.13 16.1 4.29 16.1 3.5 15.87C4.13 18.1 6.13 19.7 8.58 19.75C6.43 21.47 3.8 22.2 1.18 21.95C4.33 23.65 7.93 24.36 11.38 23.85C17.5 22.97 22 18.27 22 12.3C22 12.05 21.97 11.8 21.94 11.56C22.94 10.8 23.76 9.84 24.38 8.74C23.5 9.13 22.56 9.38 21.58 9.5C22.61 8.9 23.4 7.93 23.77 6.78C22.81 7.38 21.74 7.79 20.61 8C19.67 7.03 18.3 6.44 16.79 6.5C16.59 6.5 16.38 6.5 16.17 6.54C17.56 6.53 18.84 7.25 19.63 8.44C20.43 9.58 20.66 11.1 20.25 12.5L20.5 12C19.36 17.11 14.78 20.87 9.54 20.95C8.58 20.95 7.17 20.95 6.21 20.95C8.5 20.97 10.77 20.31 12.63 19.04C14.38 17.84 15.8 16.07 16.68 14C17.21 12.68 17.5 11.28 17.5 9.85C17.5 8.7 17.3 7.57 16.92 6.5H17.5C18.74 6.5 19.96 6.95 20.94 7.75L21.58 8.25L22 4.01Z" fill="currentColor"/>
                </svg>
              </a>
              <a href="#" aria-label="Facebook">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM17 11.5H13V16.5H11V11.5H8V9.5H11V8C11 6.34 12.34 5 14 5H17V7H14C13.45 7 13 7.45 13 8V9.5H17V11.5Z" fill="currentColor"/>
                </svg>
              </a>
              <a href="#" aria-label="Instagram">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C14.717 2 15.056 2.01 16.122 2.06C17.187 2.11 17.912 2.277 18.55 2.525C19.21 2.779 19.766 3.123 20.322 3.678C20.878 4.234 21.222 4.79 21.475 5.45C21.723 6.088 21.89 6.813 21.94 7.878C21.99 8.944 22 9.283 22 12C22 14.717 21.99 15.056 21.94 16.122C21.89 17.187 21.723 17.912 21.475 18.55C21.222 19.21 20.878 19.766 20.322 20.322C19.766 20.878 19.21 21.222 18.55 21.475C17.912 21.723 17.187 21.89 16.122 21.94C15.056 21.99 14.717 22 12 22C9.283 22 8.944 21.99 7.878 21.94C6.813 21.89 6.088 21.723 5.45 21.475C4.79 21.222 4.234 20.878 3.678 20.322C3.123 19.766 2.778 19.21 2.525 18.55C2.277 17.912 2.11 17.187 2.06 16.122C2.01 15.056 2 14.717 2 12C2 9.283 2.01 8.944 2.06 7.878C2.11 6.813 2.277 6.088 2.525 5.45C2.778 4.79 3.123 4.234 3.678 3.678C4.234 3.123 4.79 2.778 5.45 2.525C6.088 2.277 6.813 2.11 7.878 2.06C8.944 2.01 9.283 2 12 2ZM12 7C9.24 7 7 9.24 7 12C7 14.76 9.24 17 12 17C14.76 17 17 14.76 17 12C17 9.24 14.76 7 12 7ZM18.5 6.75C18.5 6.06 17.94 5.5 17.25 5.5C16.56 5.5 16 6.06 16 6.75C16 7.44 16.56 8 17.25 8C17.94 8 18.5 7.44 18.5 6.75ZM12 9C13.66 9 15 10.34 15 12C15 13.66 13.66 15 12 15C10.34 15 9 13.66 9 12C9 10.34 10.34 9 12 9Z" fill="currentColor"/>
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H7V10H9V17ZM8 8.5C7.17 8.5 6.5 7.83 6.5 7C6.5 6.17 7.17 5.5 8 5.5C8.83 5.5 9.5 6.17 9.5 7C9.5 7.83 8.83 8.5 8 8.5ZM18 17H16V13.5C16 12.67 15.33 12 14.5 12C13.67 12 13 12.67 13 13.5V17H11V10H13V11.29C13.56 10.53 14.52 10 15.6 10C16.91 10 18 11.09 18 12.4V17Z" fill="currentColor"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div className={styles.footerLinks}>
            <div className={styles.linkColumn}>
              <h4>Navigation</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/">Templates</Link></li>
                <li><Link to="/">Features</Link></li>
                <li><Link to="/">Pricing</Link></li>
              </ul>
            </div>
            
            <div className={styles.linkColumn}>
              <h4>Resources</h4>
              <ul>
                <li><Link to="/">Blog</Link></li>
                <li><Link to="/">Tutorials</Link></li>
                <li><Link to="/">Examples</Link></li>
                <li><Link to="/">Documentation</Link></li>
              </ul>
            </div>
            
            <div className={styles.linkColumn}>
              <h4>Company</h4>
              <ul>
                <li><Link to="/">About Us</Link></li>
                <li><Link to="/">Careers</Link></li>
                <li><Link to="/">Contact</Link></li>
                <li><Link to="/">Press Kit</Link></li>
              </ul>
            </div>
          </div>
          
          <div className={styles.footerNewsletter}>
            <h4>Stay Updated</h4>
            <p>Subscribe to our newsletter for the latest updates</p>
            <form className={styles.newsletterForm}>
              <input type="email" placeholder="Enter your email" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} FolioStack. All rights reserved.</p>
          <div className={styles.footerBottomLinks}>
            <Link to="/">Privacy Policy</Link>
            <Link to="/">Terms of Service</Link>
            <Link to="/">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;