import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalculationResult, formatCurrency, getFunFact } from '@/lib/calculations';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Share2, Twitter, Facebook, Copy } from 'lucide-react';

interface ResultsSectionProps {
  results: CalculationResult;
  timeHorizon: number;
  returnRate: number;
}

export default function ResultsSection({ results, timeHorizon, returnRate }: ResultsSectionProps) {
  const { monthlySpending, yearlySpending, totalSpending, futureValue, opportunityCost } = results;

  const chartData = [
    {
      name: 'Money Spent',
      value: totalSpending,
      fill: '#FF6B6B'
    },
    {
      name: 'Investment Value',
      value: futureValue,
      fill: '#27AE60'
    }
  ];

  const handleShare = (platform: string) => {
    const message = `I just found out I'm giving up ${formatCurrency(opportunityCost)} by not investing my daily spending! Check out WhyAmIBroke.com to see your own financial reality check! 💸`;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${window.location.href}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`);
        break;
      case 'copy':
        navigator.clipboard.writeText(window.location.href);
        // You could add a toast notification here
        break;
    }
  };

  return (
    <div className="space-y-8">
      {/* Investment Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-secondary text-2xl">💳</div>
              </div>
              <h4 className="text-xl font-bold text-gray-900">Money You'll Spend</h4>
              <p className="text-gray-600 text-sm">On these habits over {timeHorizon} years</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary mb-2">{formatCurrency(totalSpending)}</div>
              <div className="text-sm text-gray-500">Gone forever 💸</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-success text-2xl">📈</div>
              </div>
              <h4 className="text-xl font-bold text-gray-900">If You Invested Instead</h4>
              <p className="text-gray-600 text-sm">If You Invested {formatCurrency(monthlySpending)} Per Month into the S&P 500 index fund at {returnRate.toFixed(1)}% annual rate of return for {timeHorizon} years</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-success mb-2">{formatCurrency(futureValue)}</div>
              <div className="text-sm text-gray-500">Compound interest magic ✨</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Opportunity Cost */}
      <Card className="bg-gradient-to-r from-secondary to-primary text-white">
        <CardContent className="p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">
              Your Opportunity Cost 😱
            </h3>
            <div className="text-5xl font-bold mb-2">{formatCurrency(opportunityCost)}</div>
            <p className="text-lg opacity-90">
              That's how much money you're giving up by not investing!
            </p>
            <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-4 inline-block">
              <p className="text-sm">
                Fun fact: That's enough to buy <span className="font-bold">{getFunFact(opportunityCost)}</span>! 🏝️
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chart Visualization */}
      <Card>
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Visual Reality Check 📈
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={formatCurrency} />
                <Tooltip formatter={(value) => [formatCurrency(value as number), 'Amount']} />
                <Bar dataKey="value" fill="#8884d8" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Social Sharing */}
      <Card>
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Share Your Financial Awakening 📱
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={() => handleShare('twitter')}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Twitter className="w-4 h-4 mr-2" />
              Tweet Your Regret
            </Button>
            <Button
              onClick={() => handleShare('facebook')}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Facebook className="w-4 h-4 mr-2" />
              Facebook Shame
            </Button>
            <Button
              onClick={() => handleShare('copy')}
              variant="outline"
              className="border-gray-600 text-gray-600 hover:bg-gray-50"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Link
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
