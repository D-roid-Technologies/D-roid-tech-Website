import React from "react";
import { Check, Star, Zap, Building2 } from "lucide-react";
import "./SoftwarePricingCard.css";
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

const SoftwarePricingCard: React.FC = () => {
  const pricingTiers: PricingTier[] = [
    {
      name: "Starter",
      price: "₦703,859.99 – ₦1,390,699.99",
      period: "per year",
      description:
        "Ideal for small teams and startups getting started with essential development and collaboration tools.",
      icon: <LuBetweenVerticalStart className="techsoft-pricing__tier-icon" />,
      features: [
        { text: "Up to 3 team members", included: true },
        { text: "5 active projects", included: true },
        { text: "Task and project management", included: true },
        { text: "Basic analytics dashboard", included: true },
        { text: "Activity log (last 7 days)", included: true },
        { text: "Standard email support (24–48h response)", included: true },
        { text: "Google Calendar & Slack integration", included: true },
        { text: "API access (1,000 requests/month)", included: true },
        { text: "1 GB storage (25MB per file)", included: true },
        { text: "Light/Dark mode UI", included: true },
        {
          text: "Role-based permissions (Admin, Editor, Viewer)",
          included: true,
        },
        { text: "Two-factor authentication", included: true },

        { text: "Advanced third-party integrations", included: false },
        { text: "Custom branding and UI theming", included: false },
        { text: "Priority customer support", included: false },
        { text: "Onboarding assistance", included: false },
        { text: "Webhooks & custom workflows", included: false },
        { text: "Unlimited storage", included: false },
      ],
      buttonText: "Start with Starter",
    },
    {
      name: "Pro",
      price: "₦1,390,699.99 - ₦3,506,989.99",
      period: "",
      description:
        "Ideal for growing teams that need advanced features and enhanced collaboration tools.",
      icon: <MdApproval className="techsoft-pricing__tier-icon" />,
      isPopular: true,
      features: [
        { text: "Up to 15 team members", included: true },
        { text: "25 active projects", included: true },
        { text: "Advanced analytics dashboard", included: true },
        { text: "Activity log (30 days)", included: true },
        { text: "Priority email support (under 12h response)", included: true },
        {
          text: "Google Calendar, Slack & GitHub integrations",
          included: true,
        },
        { text: "API access (10,000 requests/month)", included: true },
        { text: "10 GB storage (100MB per file)", included: true },
        { text: "Light/Dark mode UI", included: true },
        { text: "Role-based permissions with audit logs", included: true },
        { text: "Two-factor authentication", included: true },
        { text: "Advanced third-party integrations", included: true },
        { text: "Custom branding and UI theming", included: true },

        { text: "Onboarding assistance", included: false },
        { text: "Webhooks & custom workflows", included: false },
        { text: "Unlimited storage", included: false },
      ],
      buttonText: "Get Started",
    },
    {
      name: "Enterprise",
      price: "₦3,506,989.99 - ₦7,709,109.99",
      period: "",
      description:
        "Comprehensive solution for large organizations with custom requirements and dedicated support.",
      icon: <Building2 className="techsoft-pricing__tier-icon" />,
      features: [
        { text: "Unlimited team members", included: true },
        { text: "Unlimited projects", included: true },
        { text: "Custom analytics and reporting suite", included: true },
        { text: "Activity log (unlimited history)", included: true },
        { text: "Dedicated account manager & phone support", included: true },
        { text: "Advanced integrations & SSO", included: true },
        { text: "API access (unlimited requests)", included: true },
        { text: "Unlimited storage", included: true },
        { text: "Custom UI and branded workspace", included: true },
        { text: "Granular permission controls", included: true },
        { text: "Audit logs & compliance reports", included: true },
        { text: "Webhooks & custom workflow automations", included: true },
        { text: "Onboarding & migration support", included: true },

        { text: "Requires contract & SLA", included: true },
        { text: "Onboarding assistance", included: true },
        { text: "Webhooks & custom workflows", included: true },
        { text: "Unlimited storage", included: true },
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
            Innovative software development tailored to your business needs.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SoftwarePricingCard;
