
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

interface InputFieldProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  step?: number;
  isEdited?: boolean;
  prefix?: string;
  suffix?: string;
  helperText?: string;
}

const InputField = ({ id, label, value, onChange, placeholder, step = 0.01, isEdited = false, prefix, suffix, helperText }: InputFieldProps) => {
  const [isActive, setIsActive] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value) || 0;
    onChange(newValue);
    setIsActive(true);
  };

  const handleFocus = () => setIsActive(true);
  const handleBlur = () => {
    setTimeout(() => setIsActive(false), 200);
  };

  // Show placeholder value if input is empty
  const displayValue = value === 0 ? '' : value;

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </Label>
      <div className="relative">
        {prefix && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg font-medium pointer-events-none">
            {prefix}
          </div>
        )}
        <Input
          id={id}
          type="number"
          value={displayValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          step={step}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 transition-all duration-200 text-lg ${
            prefix ? 'pl-8' : ''
          } ${
            suffix ? 'pr-16' : ''
          } ${
            isEdited 
              ? 'border-blue-500 ring-2 ring-blue-200 shadow-md bg-blue-50' 
              : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
          } ${
            isActive && !isEdited ? 'ring-2 ring-blue-200 shadow-md' : ''
          }`}
        />
        {suffix && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
            {suffix}
          </div>
        )}
      </div>
      {helperText && (
        <p className="text-xs text-gray-500 mt-1">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default InputField;
