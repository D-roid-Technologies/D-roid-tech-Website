import React from "react";
import { Check, Star, Zap, Building2 } from "lucide-react";
import "../softwareDevelopment/SoftwarePricingCard.css"
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

const AnimationPrincingCard: React.FC = () => {
 const pricingTiers: PricingTier[] = [
   {
     name: "Starter",
     price: "₦350,000 – ₦700,000",
     period: "per project",
     description:
       "Perfect for small animation projects or short stories — bringing your ideas to life with motion and creativity.",
     icon: <LuBetweenVerticalStart className="techsoft-pricing__tier-icon" />,
     features: [
       { text: "Up to 1-minute animation", included: true },
       { text: "Basic storyboard & script support", included: true },
       { text: "Royalty-free background music", included: true },
       { text: "Simple character animation", included: true },
       { text: "1 revision round", included: true },
       { text: "Standard delivery (7–10 days)", included: true },
       { text: "Basic color grading", included: true },

       { text: "Voice-over recording", included: false },
       { text: "Custom illustration & assets", included: false },
       { text: "Priority delivery (under 5 days)", included: false },
       { text: "Multi-language subtitles", included: false },
       { text: "Social media teaser version", included: false },
     ],
     buttonText: "Start Your Story",
   },
   {
     name: "Pro",
     price: "₦700,000 – ₦1,500,000",
     period: "per project",
     description:
       "Best for brands and storytellers who want engaging animations with professional voice-overs and enhanced visuals.",
     icon: <MdApproval className="techsoft-pricing__tier-icon" />,
     isPopular: true,
     features: [
       { text: "Up to 3-minute animation", included: true },
       { text: "Full storyboard & script assistance", included: true },
       { text: "Professional voice-over (1 language)", included: true },
       { text: "Custom illustrations & backgrounds", included: true },
       { text: "Up to 3 revision rounds", included: true },
       { text: "Priority delivery (5–7 days)", included: true },
       { text: "Royalty-free music & sound design", included: true },
       { text: "Social media teaser version", included: true },

       { text: "Multi-language subtitles", included: false },
       { text: "Animated infographics", included: false },
       { text: "Character lip-sync animation", included: false },
     ],
     buttonText: "Bring It to Life",
   },
   {
     name: "Enterprise",
     price: "₦1,500,000 – ₦3,500,000+",
     period: "per project",
     description:
       "Complete animation & storytelling solution — from concept to final delivery, tailored for large productions or campaigns.",
     icon: <Building2 className="techsoft-pricing__tier-icon" />,
     features: [
       { text: "Unlimited animation length", included: true },
       { text: "Full concept development & storyboarding", included: true },
       { text: "Professional voice-over (multi-language)", included: true },
       { text: "Advanced custom illustrations & animation", included: true },
       { text: "Unlimited revision rounds", included: true },
       { text: "Cinematic sound design & mixing", included: true },
       { text: "Priority delivery (custom schedule)", included: true },
       { text: "Social media & ad-ready formats", included: true },
       { text: "On-site production support", included: true },
     ],
     buttonText: "Let’s Tell Your Story",
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
            Creative animation and storytelling crafted to captivate your
            audience.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AnimationPrincingCard;
