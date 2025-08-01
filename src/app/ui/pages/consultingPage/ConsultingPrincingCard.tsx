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

const ConsultingPrincingCard: React.FC = () => {
  const pricingTiers: PricingTier[] = [
    {
      name: "Starter",
      price: "₦500,000 – ₦1,000,000",
      period: "per engagement",
      description:
        "Perfect for startups and small businesses seeking expert advice to kickstart their technology strategy.",
      icon: <LuBetweenVerticalStart className="techsoft-pricing__tier-icon" />,
      features: [
        { text: "Up to 5 hours of consultation", included: true },
        { text: "Technology roadmap review", included: true },
        { text: "Basic IT infrastructure assessment", included: true },
        { text: "Cloud adoption guidance", included: true },
        { text: "Digital transformation starter plan", included: true },
        { text: "Email support (within 48h)", included: true },

        { text: "Custom software architecture design", included: false },
        { text: "On-site workshop & training", included: false },
        { text: "Priority support", included: false },
        { text: "Vendor negotiation & partnership setup", included: false },
        { text: "Comprehensive cybersecurity review", included: false },
      ],
      buttonText: "Start Consulting",
    },
    {
      name: "Pro",
      price: "₦1,000,000 – ₦2,500,000",
      period: "per engagement",
      description:
        "Best for growing businesses needing tailored strategies, process optimization, and hands-on implementation support.",
      icon: <MdApproval className="techsoft-pricing__tier-icon" />,
      isPopular: true,
      features: [
        { text: "Up to 20 hours of consultation", included: true },
        { text: "End-to-end technology strategy", included: true },
        { text: "Detailed IT infrastructure assessment", included: true },
        { text: "Cloud migration planning", included: true },
        { text: "Process automation recommendations", included: true },
        { text: "Cybersecurity best practices audit", included: true },
        { text: "Email & phone support (within 12h)", included: true },
        { text: "Quarterly progress review", included: true },

        { text: "Full implementation management", included: false },
        { text: "Ongoing performance monitoring", included: false },
      ],
      buttonText: "Engage Us",
    },
    {
      name: "Enterprise",
      price: "₦2,500,000 – ₦6,000,000+",
      period: "per engagement",
      description:
        "Comprehensive consulting for enterprises — strategy, execution, and innovation at scale with full technology leadership support.",
      icon: <Building2 className="techsoft-pricing__tier-icon" />,
      features: [
        { text: "Unlimited consultation hours", included: true },
        { text: "Full digital transformation leadership", included: true },
        { text: "Complete IT & cloud infrastructure design", included: true },
        {
          text: "Enterprise architecture & systems integration",
          included: true,
        },
        {
          text: "Advanced cybersecurity and compliance review",
          included: true,
        },
        { text: "Custom software development advisory", included: true },
        { text: "Dedicated account manager", included: true },
        { text: "On-site training & workshops", included: true },
        { text: "Ongoing performance optimization", included: true },
      ],
      buttonText: "Partner With Us",
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
            Strategic technology consulting to drive innovation and growth.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ConsultingPrincingCard;
