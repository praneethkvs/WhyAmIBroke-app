import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { LucideIcon, Check } from 'lucide-react';
import { FREQUENCY_OPTIONS } from '@/lib/constants';

interface HabitTileProps {
  id: string;
  name: string;
  icon: LucideIcon;
  frequency: 'daily' | 'weekly' | 'monthly';
  defaultPrice: number;
  boomerCallout: string;
  className: string;
  selected: boolean;
  price: number;
  onToggle: (id: string) => void;
  onPriceChange: (id: string, price: number) => void;
  onFrequencyChange: (id: string, frequency: 'daily' | 'weekly' | 'monthly') => void;
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
  onPriceChange,
  onFrequencyChange
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

  const handleFrequencyChange = (newFrequency: 'daily' | 'weekly' | 'monthly') => {
    onFrequencyChange(id, newFrequency);
  };

  const frequencyLabel = FREQUENCY_OPTIONS.find(opt => opt.value === frequency)?.label || 'per day';

  return (
    <Card 
      className={cn(
        'cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 p-3 md:p-6 h-full flex flex-col',
        className,
        selected && 'habit-tile-selected ring-4 ring-primary ring-opacity-50 border-primary'
      )}
      onClick={handleClick}
    >
      <div className="flex items-start space-x-3 mb-3">
        <div className="w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center habit-icon relative">
          <div className={cn(
            "absolute inset-0 flex items-center justify-center transition-all duration-500 transform",
            selected ? "rotate-180 opacity-0" : "rotate-0 opacity-100"
          )}>
            <Icon className="w-4 h-4 md:w-6 md:h-6" />
          </div>
          <div className={cn(
            "absolute inset-0 flex items-center justify-center transition-all duration-500 transform",
            selected ? "rotate-0 opacity-100" : "rotate-180 opacity-0"
          )}>
            <Check className="w-4 h-4 md:w-6 md:h-6" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 text-sm md:text-base truncate">{name}</h4>
          <div className="mt-1" onClick={(e) => e.stopPropagation()}>
            <Select value={frequency} onValueChange={handleFrequencyChange}>
              <SelectTrigger className="w-full h-auto min-h-[1.5rem] text-xs md:text-sm border-none p-0 focus:ring-0 bg-transparent [&>span]:truncate">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FREQUENCY_OPTIONS.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-2 md:p-3 mb-2 md:mb-3 flex-1" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center space-x-2">
          <span className="text-gray-600 text-sm md:text-base">$</span>
          <Input
            type="number"
            placeholder={defaultPrice.toFixed(2)}
            value={inputValue}
            onChange={handleInputChange}
            className="border-none focus:ring-0 text-base md:text-lg p-0 h-auto"
            step="0.01"
            min="0"
          />
        </div>
      </div>
      
      <div className="text-xs text-gray-500 italic leading-tight hidden sm:block mt-auto">
        {boomerCallout}
      </div>
    </Card>
  );
}
