import { Plan } from "../types";

export const plans: Plan[] = [
  {
    id: 'monthly',
    name: 'Monthly Plan',
    price: 5000,
    interval: 'month',
    features: [
      'Access to all basic features',
      'Email support',
      'Up to 5 projects',
      '10GB storage',
      'Basic analytics'
    ]
  },
  {
    id: 'yearly',
    name: 'Yearly Plan',
    price: 50000,
    interval: 'year',
    popular: true,
    features: [
      'All Monthly Plan features',
      'Priority support',
      'Unlimited projects',
      '100GB storage',
      'Advanced analytics',
      'Custom integrations',
      '2 months free (save 17%)'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise Plan',
    price: 0,
    interval: 'custom',
    customPricing: true,
    features: [
      'All Yearly Plan features',
      '24/7 dedicated support',
      'Unlimited everything',
      'Custom storage solutions',
      'White-label options',
      'Dedicated account manager',
      'Custom integrations & APIs',
      'SLA guarantees'
    ]
  }
];