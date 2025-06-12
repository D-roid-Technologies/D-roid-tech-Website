import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import "./DroidLanding.css";
import Navbar from "../../components/navbar/NavBar";
import { Assets } from "../../../utils/constant/Assets";

const DroidLanding = () => {
  // Animation controls
  const controls = useAnimation();
  const [heroRef, heroInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [featuresRef, featuresInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [specsRef, specsInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [reviewsRef, reviewsInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Hero section animations
  const heroVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const heroItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Features animations
  const featuresVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        when: "beforeChildren",
      },
    },
  };

  const featureCardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  // Specs animations
  const specsVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const specsItemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  };

  const specsImageVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
  };

  // Reviews animations
  const reviewsVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        when: "beforeChildren",
      },
    },
  };

  const reviewCardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  // Phone floating animation
  const phoneVariants = {
    float: {
      y: [0, 15, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse" as "reverse",
        ease: "easeInOut",
      },
    },
  };

  // Trigger animations when in view
  useEffect(() => {
    if (heroInView) controls.start("visible");
  }, [controls, heroInView]);

  return (
    <div className="droid-landing dark-theme">
      <Navbar />
      {/* Hero Section */}
      <br />
      <br />
      <motion.section
        className="hero-section"
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={heroVariants}
      >
        <div className="container">
          <div className="hero-grid">
            <motion.div className="hero-content" variants={heroVariants}>
              <motion.h1 variants={heroItemVariants}>
                D'roid Companion
              </motion.h1>
              <motion.h2 variants={heroItemVariants}>
                Built for the Future. Designed for You.
              </motion.h2>
              <motion.p variants={heroItemVariants}>
                Experience technology that adapts to your lifestyle. The D'roid
                Mobile is more than just a phone — it's your creative companion,
                productivity partner, and entertainment powerhouse, all in one
                sleek, powerful device.
              </motion.p>
              <motion.div className="hero-cta" variants={heroItemVariants}>
                <button className="cta-primary">Pre-order Now</button>
                <button className="cta-secondary">Explore Features</button>
              </motion.div>
              <motion.div className="hero-tagline" variants={heroItemVariants}>
                <p>Be bold. Be fast. Be D'roid.</p>
              </motion.div>
            </motion.div>
            <motion.div
              className="hero-phone"
              variants={phoneVariants}
              animate="float"
            >
              <img
                src={Assets.images.phone_One}
                alt="D'roid Companion"
                className="phone-img"
              />
              <div className="phone-glow"></div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="features-section"
        ref={featuresRef}
        initial="hidden"
        animate={featuresInView ? "visible" : "hidden"}
        variants={featuresVariants}
      >
        <div className="container">
          <h2 className="section-title">Unmatched Features</h2>
          <motion.div className="features-grid" variants={featuresVariants}>
            <motion.div className="feature-card" variants={featureCardVariants}>
              <div className="feature-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12,16.5C9.5,16.5 7.5,14.5 7.5,12C7.5,9.5 9.5,7.5 12,7.5C14.5,7.5 16.5,9.5 16.5,12C16.5,14.5 14.5,16.5 12,16.5M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,19H5V5H19V19Z" />
                </svg>
              </div>
              <h3>Pro-Grade Camera</h3>
              <p>
                108MP quad camera system with night vision and AI-powered
                photography
              </p>
            </motion.div>

            <motion.div className="feature-card" variants={featureCardVariants}>
              <div className="feature-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M3,15V9H5V15H3M19,9V15H21V9H19M1,19H23V21H1V19M7,11V13H17V11H7M11,3H13V5H11V3M7,5H9V3H7V5M15,3H17V5H15V3M1,5V7H3V5H1M21,5V7H23V5H21M1,15H3V17H1V15M21,15H23V17H21V15Z" />
                </svg>
              </div>
              <h3>120Hz AMOLED Display</h3>
              <p>6.7" edge-to-edge display with HDR10+ and 1B colors</p>
            </motion.div>

            <motion.div className="feature-card" variants={featureCardVariants}>
              <div className="feature-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12.3,8.93L9.88,6.5H15.5V10H17.5V4H9.88L12.3,1.57L10.92,0.15L6.42,4.65L5.7,5.35L5,6.05L10.92,12L12.3,10.6L9.88,8.17H15.5A3.5,3.5 0 0,1 19,11.67V17.5H17V11.67A1.5,1.5 0 0,0 15.5,10.17H9.88L12.3,8.93M19,19A1,1 0 0,1 18,20A1,1 0 0,1 17,19V18A1,1 0 0,1 18,17A1,1 0 0,1 19,18V19Z" />
                </svg>
              </div>
              <h3>Next-Gen Processor</h3>
              <p>D'roid X1 chip with 5nm architecture and AI acceleration</p>
            </motion.div>

            <motion.div className="feature-card" variants={featureCardVariants}>
              <div className="feature-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12,20A6,6 0 0,1 6,14C6,10 12,3.25 12,3.25C12,3.25 18,10 18,14A6,6 0 0,1 12,20Z" />
                </svg>
              </div>
              <h3>All-Day Battery</h3>
              <p>
                5000mAh battery with 65W fast charging and wireless power share
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Specs Section */}
      <motion.section
        className="specs-section"
        ref={specsRef}
        initial="hidden"
        animate={specsInView ? "visible" : "hidden"}
        variants={specsVariants}
      >
        <div className="container">
          <div className="specs-grid">
            <motion.div className="specs-image" variants={specsImageVariants}>
              <img src={Assets.images.phone_Two} alt="D'roid Specifications" />
            </motion.div>
            <motion.div className="specs-content" variants={specsVariants}>
              <h2 className="section-title">Technical Specifications</h2>
              <motion.div className="specs-list" variants={specsVariants}>
                <motion.div className="spec-item" variants={specsItemVariants}>
                  <span className="spec-name">Display:</span>
                  <span className="spec-value">
                    6.7" Dynamic AMOLED 2X, 120Hz
                  </span>
                </motion.div>
                <motion.div className="spec-item" variants={specsItemVariants}>
                  <span className="spec-name">Processor:</span>
                  <span className="spec-value">D'roid X1 Octa-core (5nm)</span>
                </motion.div>
                <motion.div className="spec-item" variants={specsItemVariants}>
                  <span className="spec-name">Memory:</span>
                  <span className="spec-value">
                    12GB RAM + 256GB/512GB storage
                  </span>
                </motion.div>
                <motion.div className="spec-item" variants={specsItemVariants}>
                  <span className="spec-name">Camera:</span>
                  <span className="spec-value">
                    108MP + 12MP + 8MP + 5MP quad rear, 32MP front
                  </span>
                </motion.div>
                <motion.div className="spec-item" variants={specsItemVariants}>
                  <span className="spec-name">Battery:</span>
                  <span className="spec-value">
                    5000mAh with 65W fast charging
                  </span>
                </motion.div>
                <motion.div className="spec-item" variants={specsItemVariants}>
                  <span className="spec-name">OS:</span>
                  <span className="spec-value"> D'roidOS 3.0 (Android 13)</span>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Reviews Section */}
      <motion.section
        className="reviews-section"
        ref={reviewsRef}
        initial="hidden"
        animate={reviewsInView ? "visible" : "hidden"}
        variants={reviewsVariants}
      >
        <div className="container">
          <h2 className="section-title">What People Are Saying</h2>
          <motion.div className="reviews-grid" variants={reviewsVariants}>
            <motion.div className="review-card" variants={reviewCardVariants}>
              <div className="review-rating">★★★★★</div>
              <p className="review-text">
                "The D'roid Mobile has completely changed how I work and play.
                The battery life is insane!"
              </p>
              <div className="review-author">- Sarah J., Tech Blogger</div>
            </motion.div>
            <motion.div className="review-card" variants={reviewCardVariants}>
              <div className="review-rating">★★★★☆</div>
              <p className="review-text">
                "Camera quality is unmatched. The night mode shots look like
                they were taken in daylight."
              </p>
              <div className="review-author">- Michael T., Photographer</div>
            </motion.div>
            <motion.div className="review-card" variants={reviewCardVariants}>
              <div className="review-rating">★★★★★</div>
              <p className="review-text">
                "Performance is buttery smooth. Games and apps load instantly
                with no lag whatsoever."
              </p>
              <div className="review-author">- David L., Mobile Gamer</div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Experience D'roid?</h2>
            <p>Join the next generation of mobile technology today.</p>
            <button className="cta-primary">Order Now</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DroidLanding;
