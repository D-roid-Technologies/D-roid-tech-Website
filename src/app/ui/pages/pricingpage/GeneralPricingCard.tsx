import React from "react";
import { Check, Building2 } from "lucide-react";
import "../softwareDevelopment/SoftwarePricingCard.css";
import "./generalPricingCard.css";
import { MdApproval } from "react-icons/md";
import { useNavigate } from "react-router-dom";

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
  goTo: string;
  isPopular?: boolean;
  icon: React.ReactNode;
}

const GeneralPricingCard: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const pricingTiers: PricingTier[] = [
    {
      name: "Software Development - Pro",
      price: "₦1,390,699.99 - ₦3,506,989.99",
      period: "per year",
      description:
        "Advanced software solutions for growing teams — complete with robust analytics, integrations, and premium support.",
      icon: <MdApproval className="techsoft-pricing__tier-icon" />,
      isPopular: true,
      goTo: "/software-development",
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
      name: "Training Programs - Pro",
      price: "₦950,000 - ₦2,500,000",
      period: "per program",
      description:
        "Industry-ready training with hands-on projects, mentorship, and career guidance for aspiring tech professionals.",
      icon: <MdApproval className="techsoft-pricing__tier-icon" />,
      isPopular: true,
      goTo: "/training",
      features: [
        { text: "Full curriculum access", included: true },
        { text: "Live instructor-led classes", included: true },
        { text: "Capstone project & portfolio review", included: true },
        { text: "Mentorship & career guidance", included: true },
        { text: "Certificate of completion", included: true },
        { text: "Access to recordings", included: true },
        { text: "Hands-on project work", included: true },
        { text: "Resume and LinkedIn optimization", included: true },
        { text: "Exclusive alumni network", included: true },
        { text: "Job placement assistance", included: true },
        { text: "One-on-one tutoring sessions", included: true },
        { text: "Internship opportunities", included: true },
        { text: "Custom corporate training", included: false },
      ],
      buttonText: "Join Now",
    },
    {
      name: "Animation / Short Stories - Pro",
      price: "₦1,200,000 - ₦3,000,000",
      period: "per project",
      description:
        "High-quality animation and original storytelling with creative direction, scripting, and full production.",
      icon: <MdApproval className="techsoft-pricing__tier-icon" />,
      isPopular: true,
      goTo: "/animation",
      features: [
        { text: "Up to 5 minutes runtime", included: true },
        { text: "Custom storyboard & scripting", included: true },
        { text: "Professional voiceover", included: true },
        { text: "Full character & scene design", included: true },
        { text: "Background music & sound design", included: true },
        { text: "Motion graphics", included: true },
        { text: "2 free revisions", included: true },
        { text: "Commercial usage rights", included: true },
        { text: "Custom animation style", included: true },
        { text: "Scriptwriting assistance", included: true },
        { text: "Social media optimization", included: true },
        { text: "Priority delivery", included: false },
        { text: "Unlimited runtime", included: false },
      ],
      buttonText: "Start Project",
    },
    {
      name: "Consulting - Pro",
      price: "₦1,500,000 - ₦4,000,000",
      period: "per engagement",
      description:
        "Strategic tech consulting to help you innovate, optimize, and implement effective digital solutions.",
      icon: <MdApproval className="techsoft-pricing__tier-icon" />,
      isPopular: true,
      goTo: "/consulting",
      features: [
        { text: "Strategic technology planning", included: true },
        { text: "Business process optimization", included: true },
        { text: "Architecture review & design", included: true },
        { text: "Tech stack recommendations", included: true },
        { text: "Product roadmap guidance", included: true },
        { text: "Performance & scalability review", included: true },
        { text: "Integration & automation advice", included: true },
        { text: "Cloud migration strategy", included: true },
        { text: "Cybersecurity & compliance assessment", included: true },
        { text: "Monthly progress reporting", included: true },
        { text: "Team training & onboarding", included: true },
        { text: "Custom workshops", included: false },
      ],
      buttonText: "Book Consultation",
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
                  onClick={() => handleNavigate(tier.goTo)}
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

export default GeneralPricingCard;
