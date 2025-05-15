// CTA.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CTA.module.css';

const CTA = () => {
  return (
    <section className={styles.cta}>
      <div className={styles.ctaBg}></div>
      <div className="container">
        <div className={styles.ctaContent}>
          <h2>Ready to Showcase Your Work to the World?</h2>
          <p>Start building your professional portfolio in minutes. No coding skills required!</p>
          <div className={styles.ctaButtons}>
            <Link to="/create" className={styles.primaryBtn}>Start for Free</Link>
            <Link to="/examples" className={styles.secondaryBtn}>See Examples</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;