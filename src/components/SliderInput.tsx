
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

interface SliderInputProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
}

const SliderInput = ({ id, label, value, onChange, min, max }: SliderInputProps) => {
  const [isActive, setIsActive] = useState(false);

  const handleSliderChange = (values: number[]) => {
    onChange(values[0]);
    setIsActive(true);
    setTimeout(() => setIsActive(false), 300);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </Label>
        <span className={`text-lg font-semibold bg-blue-50 px-3 py-1 rounded-full transition-all duration-300 ${
          isActive ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-200 scale-105' : 'text-blue-600'
        }`}>
          {value} days
        </span>
      </div>
      <div className="px-2">
        <Slider
          id={id}
          min={min}
          max={max}
          step={1}
          value={[value]}
          onValueChange={handleSliderChange}
          className={`w-full transition-all duration-200 ${
            isActive ? 'scale-[1.02]' : ''
          }`}
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{min} days</span>
          <span>{max} days</span>
        </div>
      </div>
    </div>
  );
};

export default SliderInput;
