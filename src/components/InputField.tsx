
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
}

const InputField = ({ id, label, value, onChange, placeholder, step = 0.01 }: InputFieldProps) => {
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

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </Label>
      <Input
        id={id}
        type="number"
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        step={step}
        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg ${
          isActive ? 'ring-2 ring-blue-200 shadow-md' : ''
        }`}
      />
    </div>
  );
};

export default InputField;
