import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PricingCard } from './PricingCard';
import { plans } from './data/plans';
import { Plan } from './types';
import { CreditCard, Shield, Zap } from 'lucide-react';

export const PricingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSelectPlan = (plan: Plan) => {
    if (plan.customPricing) {
      // For enterprise, you might want to show a contact form
      alert('Please contact our sales team for enterprise pricing.');
      return;
    }
    
    navigate('/checkout', { state: { selectedPlan: plan } });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#071d6a', color: '#ffffff' }}>
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Select the perfect plan for your needs. All plans come with a 30-day money-back guarantee.
          </p>
        </div>

        {/* Features Icons */}
        <div className="flex justify-center gap-12 mb-16">
          <div className="flex items-center gap-3">
            <Shield className="text-green-400" size={24} />
            <span className="text-gray-300">Secure Payments</span>
          </div>
          <div className="flex items-center gap-3">
            <CreditCard className="text-blue-400" size={24} />
            <span className="text-gray-300">Multiple Payment Options</span>
          </div>
          <div className="flex items-center gap-3">
            <Zap className="text-yellow-400" size={24} />
            <span className="text-gray-300">Instant Activation</span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              onSelectPlan={handleSelectPlan}
            />
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-4">Trusted by over 10,000+ businesses</p>
          <div className="flex justify-center gap-8 opacity-60">
            <div className="text-2xl font-bold">₦50M+</div>
            <div className="text-2xl font-bold">10K+</div>
            <div className="text-2xl font-bold">99.9%</div>
          </div>
          <div className="flex justify-center gap-8 text-sm text-gray-400">
            <div>Processed</div>
            <div>Customers</div>
            <div>Uptime</div>
          </div>
        </div>
      </div>
    </div>
  );
};