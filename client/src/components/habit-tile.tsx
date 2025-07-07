import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface HabitTileProps {
  id: string;
  name: string;
  icon: LucideIcon;
  frequency: string;
  defaultPrice: number;
  boomerCallout: string;
  className: string;
  selected: boolean;
  price: number;
  onToggle: (id: string) => void;
  onPriceChange: (id: string, price: number) => void;
}

export default function HabitTile({
  id,
  name,
  icon: Icon,
  frequency,
  defaultPrice,
  boomerCallout,
  className,
  selected,
  price,
  onToggle,
  onPriceChange
}: HabitTileProps) {
  const [inputValue, setInputValue] = useState(price > 0 ? price.toString() : '');

  const handleClick = () => {
    if (!selected && price === 0) {
      onPriceChange(id, defaultPrice);
      setInputValue(defaultPrice.toString());
    }
    onToggle(id);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    const numValue = parseFloat(value) || 0;
    onPriceChange(id, numValue);
  };

  return (
    <Card 
      className={cn(
        'cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 p-6',
        className,
        selected && 'habit-tile-selected'
      )}
      onClick={handleClick}
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 rounded-full flex items-center justify-center habit-icon">
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">{name}</h4>
          <p className="text-sm text-gray-600">per {frequency}</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-3 mb-3" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">$</span>
          <Input
            type="number"
            placeholder={defaultPrice.toFixed(2)}
            value={inputValue}
            onChange={handleInputChange}
            className="border-none focus:ring-0 text-lg p-0 h-auto"
            step="0.01"
            min="0"
          />
        </div>
      </div>
      
      <div className="text-xs text-gray-500 italic">
        {boomerCallout}
      </div>
    </Card>
  );
}
