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
  minLabel?: string;
  maxLabel?: string;
}

export default function RangeSlider({
  value,
  min,
  max,
  step = 1,
  onChange,
  label,
  displayValue,
  className,
  minLabel,
  maxLabel
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
          <span>{minLabel || min}</span>
          <span>{maxLabel || max}</span>
        </div>
      </div>
      
      <div className="text-center">
        <span className="text-2xl font-bold text-primary">{displayValue}</span>
      </div>
    </div>
  );
}
