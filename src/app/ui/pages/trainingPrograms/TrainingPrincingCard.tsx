import React from "react";
import { Check, Star, Zap, Building2 } from "lucide-react";
import "../softwareDevelopment/SoftwarePricingCard.css";
import { MdApproval } from "react-icons/md";
import { LuBetweenVerticalStart } from "react-icons/lu";

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: PricingFeature[];
  buttonText: string;
  isPopular?: boolean;
  icon: React.ReactNode;
}

const TrainingPrincingCard: React.FC = () => {
  const pricingTiers: PricingTier[] = [
    {
      name: "Beginner Bootcamp",
      price: "₦150,000 – ₦300,000",
      period: "per program",
      description:
        "Perfect for beginners starting their journey into tech. Learn the fundamentals with hands-on guidance.",
      icon: <LuBetweenVerticalStart className="techsoft-pricing__tier-icon" />,
      features: [
        { text: "8-week training program", included: true },
        { text: "Introduction to web development", included: true },
        { text: "HTML, CSS, JavaScript basics", included: true },
        { text: "Small group mentoring sessions", included: true },
        { text: "Access to learning resources", included: true },
        { text: "Certificate of completion", included: true },

        { text: "1-on-1 mentorship", included: false },
        { text: "Career guidance & CV review", included: false },
        { text: "Portfolio project assistance", included: false },
        { text: "Internship placement support", included: false },
      ],
      buttonText: "Start Learning",
    },
    {
      name: "Professional Track",
      price: "₦300,000 – ₦650,000",
      period: "per program",
      description:
        "For intermediate learners aiming to become job-ready with advanced skills and portfolio projects.",
      icon: <MdApproval className="techsoft-pricing__tier-icon" />,
      isPopular: true,
      features: [
        { text: "12-week immersive program", included: true },
        { text: "Frontend & backend development", included: true },
        { text: "React, Node.js, and databases", included: true },
        { text: "Portfolio project development", included: true },
        { text: "Weekly code reviews", included: true },
        { text: "1-on-1 mentorship sessions", included: true },
        { text: "Career guidance & CV review", included: true },
        { text: "Interview preparation", included: true },

        { text: "Internship placement support", included: false },
        { text: "Advanced industry networking", included: false },
      ],
      buttonText: "Level Up",
    },
    {
      name: "Industry-Ready Masterclass",
      price: "₦650,000 – ₦1,200,000",
      period: "per program",
      description:
        "An advanced masterclass designed to make you industry-ready with real-world projects and direct industry exposure.",
      icon: <Building2 className="techsoft-pricing__tier-icon" />,
      features: [
        { text: "16-week advanced program", included: true },
        { text: "Full-stack development mastery", included: true },
        { text: "Capstone industry project", included: true },
        { text: "Advanced problem-solving & algorithms", included: true },
        { text: "1-on-1 industry mentorship", included: true },
        { text: "Internship placement support", included: true },
        { text: "Interview preparation & mock sessions", included: true },
        { text: "Lifetime alumni network access", included: true },
      ],
      buttonText: "Become Industry-Ready",
    },
  ];

  return (
    <section className="techsoft-pricing">
      <div className="techsoft-pricing__container">
        <div className="techsoft-pricing__header">
          <h2 className="techsoft-pricing__title">Choose Your Plan</h2>
          <p className="techsoft-pricing__subtitle">
            Scale your development workflow with our flexible pricing options
          </p>
        </div>

        <div className="techsoft-pricing__grid">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={`techsoft-pricing__card ${
                tier.isPopular ? "techsoft-pricing__card--popular" : ""
              }`}
            >
              {tier.isPopular && (
                <div className="techsoft-pricing__popular-badge">
                  Most Popular
                </div>
              )}

              <div className="techsoft-pricing__card-header">
                <div className="techsoft-pricing__tier-info">
                  {tier.icon}
                  <h3 className="techsoft-pricing__tier-name">{tier.name}</h3>
                </div>
                <div className="techsoft-pricing__price">
                  <span className="techsoft-pricing__price-amount">
                    {tier.price}
                  </span>
                  {/* <span className="techsoft-pricing__price-period">
                    {tier.period}
                  </span> */}
                </div>
                <p className="techsoft-pricing__description">
                  {tier.description}
                </p>
              </div>

              <div className="techsoft-pricing__features">
                <ul className="techsoft-pricing__features-list">
                  {tier.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className={`techsoft-pricing__feature ${
                        !feature.included
                          ? "techsoft-pricing__feature--disabled"
                          : ""
                      }`}
                    >
                      <Check
                        className={`techsoft-pricing__check-icon ${
                          !feature.included
                            ? "techsoft-pricing__check-icon--disabled"
                            : ""
                        }`}
                      />
                      <span>{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* <div className="techsoft-pricing__card-footer">
                <button
                  className={`techsoft-pricing__button ${tier.isPopular
                    ? "techsoft-pricing__button--primary"
                    : "techsoft-pricing__button--secondary"
                    }`}
                >
                  {tier.buttonText}
                </button>
              </div> */}
            </div>
          ))}
        </div>

        <div className="techsoft-pricing__footer">
          <p className="techsoft-pricing__footer-text">
            Hands-on tech training to prepare you for real-world success.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrainingPrincingCard;
