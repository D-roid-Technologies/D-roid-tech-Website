import React from 'react';
import { Check, Star } from 'lucide-react';
import { Plan } from './types';
import { formatCurrency } from './utils/paystack';

interface PricingCardProps {
  plan: Plan;
  onSelectPlan: (plan: Plan) => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({ plan, onSelectPlan }) => {
  return (
    <div
      className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
        plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1">
            <Star size={16} />
            Most Popular
          </div>
        </div>
      )}
      
      <div className="p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
        
        <div className="mb-6">
          {plan.customPricing ? (
            <div>
              <span className="text-3xl font-bold text-gray-800">Custom</span>
              <p className="text-gray-600 mt-2">Contact us for pricing</p>
            </div>
          ) : (
            <div>
              <span className="text-4xl font-bold text-gray-800">
                {formatCurrency(plan.price)}
              </span>
              <span className="text-gray-600 ml-2">/{plan.interval}</span>
              {plan.interval === 'year' && (
                <p className="text-green-600 text-sm mt-1">Save 17% compared to monthly</p>
              )}
            </div>
          )}
        </div>
        
        <ul className="space-y-3 mb-8">
        
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3">
              <Check className="text-green-500 flex-shrink-0" size={20} />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
        
        <button
          onClick={() => onSelectPlan(plan)}
          className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
            plan.popular
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transform hover:scale-105'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200 hover:scale-105'
          }`}
        >
          {plan.customPricing ? 'Contact Sales' : 'Get Started'}
        </button>
      </div>
    </div>
  );
};