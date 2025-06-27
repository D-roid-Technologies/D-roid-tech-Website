import React from "react";
import { Check, Star, Zap, Building2 } from "lucide-react";
import "./SoftwarePricingCard.css";

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

const SoftwarePricingCard: React.FC = () => {
  const pricingTiers: PricingTier[] = [
    {
      name: "Starter",
      price: "₦599.99 - ₦989.99",
      period: "",
      description:
        "Perfect for small teams and startups getting started with professional development tools.",
      icon: <Zap className="techsoft-pricing__tier-icon" />,
      features: [
        { text: "Up to 3 team members", included: true },
        { text: "5 projects included", included: true },
        { text: "Basic analytics dashboard", included: true },
        { text: "Email support", included: true },
        { text: "API access (1,000 calls/month)", included: true },
        { text: "Advanced integrations", included: false },
        { text: "Priority support", included: false },
        { text: "Custom branding", included: false },
      ],
      buttonText: "Get Started",
    },
    {
      name: "Pro",
      price: "₦79",
      period: "",
      description:
        "Ideal for growing teams that need advanced features and enhanced collaboration tools.",
      icon: <Star className="techsoft-pricing__tier-icon" />,
      isPopular: true,
      features: [
        { text: "Up to 15 team members", included: true },
        { text: "Unlimited projects", included: true },
        { text: "Advanced analytics & reporting", included: true },
        { text: "Priority email & chat support", included: true },
        { text: "API access (50,000 calls/month)", included: true },
        { text: "Advanced integrations", included: true },
        { text: "Team collaboration tools", included: true },
        { text: "Custom branding", included: false },
      ],
      buttonText: "Get Started",
    },
    {
      name: "Enterprise",
      price: "₦199",
      period: "",
      description:
        "Comprehensive solution for large organizations with custom requirements and dedicated support.",
      icon: <Building2 className="techsoft-pricing__tier-icon" />,
      features: [
        { text: "Unlimited team members", included: true },
        { text: "Unlimited projects", included: true },
        { text: "Enterprise analytics suite", included: true },
        { text: "24/7 dedicated support", included: true },
        { text: "Unlimited API access", included: true },
        { text: "All integrations included", included: true },
        { text: "Advanced security features", included: true },
        { text: "Custom branding & white-label", included: true },
      ],
      buttonText: "Get Started",
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

              <div className="techsoft-pricing__card-footer">
                <button
                  className={`techsoft-pricing__button ${
                    tier.isPopular
                      ? "techsoft-pricing__button--primary"
                      : "techsoft-pricing__button--secondary"
                  }`}
                >
                  {tier.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="techsoft-pricing__footer">
          <p className="techsoft-pricing__footer-text">
            Innovative software development tailored to your business needs.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SoftwarePricingCard;
