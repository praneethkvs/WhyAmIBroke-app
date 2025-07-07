import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PiggyBank } from 'lucide-react';
import HabitTile from '@/components/habit-tile';
import RangeSlider from '@/components/ui/range-slider';
import ResultsSection from '@/components/results-section';
import { HABITS } from '@/lib/constants';
import { calculateResults, type Habit } from '@/lib/calculations';

export default function Calculator() {
  const [habits, setHabits] = useState<Habit[]>(
    HABITS.map(habit => ({
      id: habit.id,
      price: 0,
      frequency: habit.frequency as 'daily' | 'weekly' | 'monthly',
      selected: false
    }))
  );
  
  const [timeHorizon, setTimeHorizon] = useState(30);
  const [returnRate, setReturnRate] = useState(10.0);
  const [showResults, setShowResults] = useState(false);

  const handleHabitToggle = (id: string) => {
    setHabits(prev => prev.map(habit => 
      habit.id === id ? { ...habit, selected: !habit.selected } : habit
    ));
  };

  const handlePriceChange = (id: string, price: number) => {
    setHabits(prev => prev.map(habit => 
      habit.id === id ? { ...habit, price } : habit
    ));
  };

  const handleFrequencyChange = (id: string, frequency: 'daily' | 'weekly' | 'monthly') => {
    setHabits(prev => prev.map(habit => 
      habit.id === id ? { ...habit, frequency } : habit
    ));
  };

  const handleCalculate = () => {
    const selectedHabits = habits.filter(habit => habit.selected && habit.price > 0);
    console.log('Selected habits:', selectedHabits);
    console.log('All habits:', habits);
    if (selectedHabits.length === 0) {
      alert('Please select at least one habit and set a price to calculate your financial regret!');
      return;
    }
    setShowResults(true);
  };

  const results = calculateResults(habits, timeHorizon, returnRate);

  // Calculate real-time spending for display
  const calculateRealTimeSpending = () => {
    return habits
      .filter(habit => habit.selected && habit.price > 0)
      .reduce((total, habit) => {
        const multiplier = habit.frequency === 'daily' ? 30 : habit.frequency === 'weekly' ? 4.33 : 1;
        return total + (habit.price * multiplier);
      }, 0);
  };

  const monthlySpending = calculateRealTimeSpending();
  const yearlySpending = monthlySpending * 12;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <PiggyBank className="text-primary text-2xl" />
              <h1 className="text-xl font-bold text-gray-900">WhyAmIBroke.com</h1>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <span className="text-sm text-gray-500">Making financial awareness fun (and painful) 💸</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-success text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Find Out Why You're Broke 💸
          </h2>
          <p className="text-xl md:text-2xl font-light mb-8 opacity-90">
            See how your daily spending habits could make you a millionaire instead
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 inline-block">
            <p className="text-lg font-medium">
              That $5 coffee? It could be worth <span className="text-accent font-bold">$45,000</span> in 30 years! 😱
            </p>
          </div>
        </div>
      </section>

      {/* Calculator App */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
        
        {/* Step 1: Habit Selection */}
        <div className="mb-8 md:mb-12">
          <div className="text-center mb-4 md:mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
              Step 1: Pick Your Financial Poison 🍷
            </h3>
            <p className="text-gray-600 text-sm md:text-base px-4">Select the habits that are draining your bank account</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mb-8 auto-rows-fr">
            {HABITS.map(habit => (
              <HabitTile
                key={habit.id}
                id={habit.id}
                name={habit.name}
                icon={habit.icon}
                defaultPrice={habit.defaultPrice}
                boomerCallout={habit.boomerCallout}
                className={habit.className}
                selected={habits.find(h => h.id === habit.id)?.selected || false}
                price={habits.find(h => h.id === habit.id)?.price || 0}
                frequency={habits.find(h => h.id === habit.id)?.frequency || habit.frequency}
                onToggle={handleHabitToggle}
                onPriceChange={handlePriceChange}
                onFrequencyChange={handleFrequencyChange}
              />
            ))}
          </div>
        </div>

        {/* Real-time Spending Summary */}
        {habits.some(h => h.selected && h.price > 0) && (
          <div className="mb-8 md:mb-12">
            <div className="text-center mb-4 md:mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                Your Current Spending Habits 📊
              </h3>
              <p className="text-gray-600 text-sm md:text-base px-4">Real-time calculation based on your selected habits</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-3xl mx-auto">
              <div className="relative overflow-hidden bg-gradient-to-br from-red-400 via-red-500 to-red-600 rounded-2xl p-6 md:p-8 text-center border-2 border-red-300 shadow-2xl transform hover:scale-105 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
                <div className="relative z-10">
                  <div className="text-4xl mb-2 animate-bounce">💸</div>
                  <div className="text-3xl md:text-4xl font-black text-white mb-3 drop-shadow-lg animate-pulse">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0
                    }).format(monthlySpending)}
                  </div>
                  <div className="text-lg md:text-xl text-white font-bold tracking-wide">MONTHLY DRAIN</div>
                  <div className="text-sm text-red-100 mt-2 font-medium">Money vanishing into thin air!</div>
                  <div className="absolute -top-2 -right-2 text-6xl opacity-20 animate-spin-slow">💰</div>
                </div>
              </div>
              
              <div className="relative overflow-hidden bg-gradient-to-br from-orange-400 via-red-500 to-red-600 rounded-2xl p-6 md:p-8 text-center border-2 border-orange-300 shadow-2xl transform hover:scale-105 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
                <div className="relative z-10">
                  <div className="text-4xl mb-2 animate-bounce delay-150">🔥</div>
                  <div className="text-3xl md:text-4xl font-black text-white mb-3 drop-shadow-lg animate-pulse">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0
                    }).format(yearlySpending)}
                  </div>
                  <div className="text-lg md:text-xl text-white font-bold tracking-wide">YEARLY INFERNO</div>
                  <div className="text-sm text-orange-100 mt-2 font-medium">Your wallet is literally on fire!</div>
                  <div className="absolute -bottom-2 -left-2 text-6xl opacity-20 animate-bounce">💀</div>
                </div>
              </div>
            </div>
            
            {monthlySpending > 0 && (
              <div className="mt-6 text-center">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-full font-bold text-sm md:text-lg shadow-lg animate-pulse border-2 border-yellow-300">
                  <span className="text-lg md:text-xl">⚠️</span>
                  <span className="hidden sm:inline">FINANCIAL REALITY CHECK INCOMING!</span>
                  <span className="sm:hidden">REALITY CHECK INCOMING!</span>
                  <span className="text-lg md:text-xl">⚠️</span>
                </div>
                
                {yearlySpending > 10000 && (
                  <div className="mt-4 inline-block bg-black text-red-400 px-4 py-2 rounded-lg font-bold text-sm border border-red-500 animate-pulse">
                    🚨 DANGER ZONE: {Math.round(yearlySpending / 1000)}K+ PER YEAR! 🚨
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Step 2: Time Horizon & Settings */}
        <div className="mb-8 md:mb-12">
          <Card>
            <CardContent className="p-4 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 text-center">
                Step 2: How Long Are You Willing to Wait? ⏰
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <RangeSlider
                  value={timeHorizon}
                  min={1}
                  max={50}
                  onChange={setTimeHorizon}
                  label="Investment Time Horizon"
                  displayValue={`${timeHorizon} years`}
                />

                <RangeSlider
                  value={returnRate}
                  min={3}
                  max={15}
                  step={0.5}
                  onChange={setReturnRate}
                  label="Expected Annual Return (S&P 500 avg: 10%)"
                  displayValue={`${returnRate.toFixed(1)}%`}
                />
              </div>

              <div className="mt-6 md:mt-8 text-center">
                <Button
                  onClick={handleCalculate}
                  className="bg-primary hover:bg-primary/90 text-white font-semibold py-3 md:py-4 px-6 md:px-8 rounded-xl text-base md:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                  size="lg"
                >
                  Calculate My Financial Regret 💸
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Step 3: Results */}
        {showResults && (
          <ResultsSection
            results={results}
            timeHorizon={timeHorizon}
            returnRate={returnRate}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <PiggyBank className="text-primary text-2xl" />
              <h3 className="text-xl font-bold">WhyAmIBroke.com</h3>
            </div>
            <p className="text-gray-400 mb-6">
              Making financial awareness fun (and slightly traumatic) since 2024
            </p>
            <div className="text-sm text-gray-500">
              <p className="mb-2">
                ⚠️ <strong>Disclaimer:</strong> This calculator is for entertainment and educational purposes. 
                Past performance doesn't guarantee future results. Please consult a financial advisor for serious investment decisions.
              </p>
              <p>
                Built with ❤️ and a lot of coffee (that we probably shouldn't have bought) ☕
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
