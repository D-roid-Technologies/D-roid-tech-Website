"use client";

import {
  CheckCircle,
  Globe,
  Smartphone,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import styles from "./promo-section.module.css";
import { Link, useNavigate } from "react-router-dom";


export default function PromoSection() {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("software-development#form");
  };
  return (
    <div className={styles.promoWrapper}>
      <div className={styles.promoCard}>
        <div className={styles.cardContent}>
        
          {/* Hero Section */}
          <div className={styles.hero}>
            <div className={styles.badge}>
              <span className={styles.badgeText}>Limited-Time Offer</span>
            </div>

            <h1 className={styles.title}>
              Get Your <span className={styles.highlight}>FREE</span> Website
              Today
            </h1>

            <p className={styles.subtitle}>
              We're giving new subscribers a{" "}
              <strong>FREE 1-page website + 1 month of free hosting</strong>. No
              upfront cost. No hidden fees. Just your brand, live on the web.
            </p>
          </div>

          {/* Desktop Layout: Two Column */}
          <div className={styles.desktopLayout}>
            {/* Left Column */}
            <div className={styles.leftColumn}>
              {/* Why This Offer Section */}
              <div className={styles.whySection}>
                <h2 className={styles.sectionTitle}>Why This Offer?</h2>
                <p className={styles.sectionText}>
                  Starting online shouldn't be complicated or expensive. Whether
                  you're a startup, freelancer, or small business, this is your
                  chance to launch your digital presence instantly.
                </p>
              </div>

              <div className={styles.ctaButtonSection} onClick={handleButtonClick}>
                <a href="/software-development#form" >

                <button className={styles.ctaButton}>
                  Claim Your Free Website Now
                  <ArrowRight className={styles.ctaIcon} />
                </button>
                <p className={styles.urgencyText}>
                  ⏰ Limited spots available - Don't miss out!
                </p>
                </a>
              </div>
            </div>

            {/* Right Column */}
            <div className={styles.rightColumn}>
              {/* Features Grid */}
              <div className={styles.featuresGrid}>
                <h2 className={styles.sectionTitle}>What You'll Get:</h2>

                <div className={styles.features}>
                  <div className={styles.featureCard}>
                    <div className={styles.featureIcon}>
                      <Globe className={styles.iconSvg} />
                    </div>
                    <h3 className={styles.featureTitle}>Custom Design</h3>
                    <p className={styles.featureText}>
                      A custom 1-page website designed for your brand
                    </p>
                  </div>

                  <div className={styles.featureCard}>
                    <div className={styles.featureIcon}>
                      <CheckCircle className={styles.iconSvg} />
                    </div>
                    <h3 className={styles.featureTitle}>Free Hosting</h3>
                    <p className={styles.featureText}>
                      1 month of free, reliable hosting
                    </p>
                  </div>

                  <div className={styles.featureCard}>
                    <div className={styles.featureIcon}>
                      <Smartphone className={styles.iconSvg} />
                    </div>
                    <h3 className={styles.featureTitle}>Mobile-Friendly</h3>
                    <p className={styles.featureText}>
                      Mobile-friendly, fast-loading site
                    </p>
                  </div>

                  <div className={styles.featureCard}>
                    <div className={styles.featureIcon}>
                      <TrendingUp className={styles.iconSvg} />
                    </div>
                    <h3 className={styles.featureTitle}>Easy Upgrades</h3>
                    <p className={styles.featureText}>
                      Easy upgrade options when you're ready to grow
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.footerSection}>
            <p className={styles.featureTitle}>
              This free launch package is available for a short period only.
              Don't miss out on creating a professional first impression online.
            </p>
          </div>
           <div className={styles.ctaButtonSection} onClick={handleButtonClick}>
                <a href="/software-development#form" >

                <button className={styles.ctaButton}>
                  Claim Your Free Website Now
                  <ArrowRight className={styles.ctaIcon} />
                </button>
                <p className={styles.urgencyText}>
                  ⏰ Limited spots available - Don't miss out!
                </p>
                </a>
              </div>
        </div>
      </div>
    </div>
  );
}
