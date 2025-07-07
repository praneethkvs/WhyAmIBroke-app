import { cn } from '@/lib/utils';

interface RangeSliderProps {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  label: string;
  displayValue: string;
  className?: string;
}

export default function RangeSlider({
  value,
  min,
  max,
  step = 1,
  onChange,
  label,
  displayValue,
  className
}: RangeSliderProps) {
  return (
    <div className={cn('space-y-3', className)}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{min}{typeof min === 'number' && min < 10 ? ' year' : ''}</span>
          <span>{max}{typeof max === 'number' && max < 100 ? ' years' : '%'}</span>
        </div>
      </div>
      
      <div className="text-center">
        <span className="text-2xl font-bold text-primary">{displayValue}</span>
      </div>
    </div>
  );
}
