import { FREQUENCY_MULTIPLIERS } from './constants';

export interface Habit {
  id: string;
  price: number;
  frequency: 'daily' | 'weekly' | 'monthly';
  selected: boolean;
}

export interface CalculationResult {
  monthlySpending: number;
  yearlySpending: number;
  totalSpending: number;
  futureValue: number;
  opportunityCost: number;
}

export function calculateResults(
  habits: Habit[],
  timeHorizon: number,
  returnRate: number
): CalculationResult {
  // Calculate total monthly spending from selected habits
  const monthlySpending = habits
    .filter(habit => habit.selected)
    .reduce((total, habit) => {
      const multiplier = FREQUENCY_MULTIPLIERS[habit.frequency];
      return total + (habit.price * multiplier);
    }, 0);

  const yearlySpending = monthlySpending * 12;
  const totalSpending = yearlySpending * timeHorizon;
  
  // Compound interest calculation using future value of annuity formula
  const monthlyRate = returnRate / 100 / 12;
  const totalMonths = timeHorizon * 12;
  
  // Future value of annuity: PMT * (((1 + r)^n - 1) / r)
  const futureValue = monthlySpending * 
    ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
  
  const opportunityCost = futureValue - totalSpending;

  return {
    monthlySpending,
    yearlySpending,
    totalSpending,
    futureValue,
    opportunityCost
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

export function getFunFact(amount: number): string {
  if (amount > 1000000) {
    const facts = [
      'a small island',
      'a Tesla Model S', 
      'a luxury yacht',
      'a Hollywood mansion',
      'early retirement',
      'financial freedom',
      'a private jet',
      'multiple Lamborghinis'
    ];
    return facts[Math.floor(Math.random() * facts.length)];
  } else if (amount > 500000) {
    return 'a really nice house';
  } else if (amount > 100000) {
    return 'a Tesla';
  } else if (amount > 50000) {
    return 'a luxury vacation every year';
  } else if (amount > 10000) {
    return 'a lot of avocado toast';
  }
  return 'coffee';
}
