import React from 'react';
import styles from './HomePage.module.css';
import Header from '../../components/Home/Header/Header';
import Hero from '../../components/Home/Hero/Hero';
import Features from '../../components/Home/Features/Features';
import HowItWorks from '../../components/Home/HowItWorks/HowItWorks';
import TemplateShowcase from '../../components/Home/TemplateShowcase/TemplateShowcase';
import CTAsection from '../../components/Home/CTAsection/CTA';
import Footer from '../../components/Home/Footer/Footer';

const HomePage = () => {
  
  return (
    <div className={styles.homePage}>
      <Header />
      <main>
        <section id="hero">
          <Hero />
        </section>
        <section id="features">
          <Features />
        </section>
        <section id="how-it-works">
          <HowItWorks />
        </section>
        <section id="templates">
          <TemplateShowcase />
        </section>
        <section id="cta">
          <CTAsection />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
