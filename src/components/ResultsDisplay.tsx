
import { Card } from "@/components/ui/card";
import { DollarSign, TrendingDown, Calendar, CalendarDays } from "lucide-react";
import { useEffect, useState } from "react";

interface ResultsDisplayProps {
  lostRevPerWeek: number;
  cumulativeLoss: number;
  monthlyLoss: number;
  yearlyLoss: number;
  emptyChairs: number;
}

const ResultsDisplay = ({
  lostRevPerWeek,
  cumulativeLoss,
  monthlyLoss,
  yearlyLoss,
  emptyChairs,
}: ResultsDisplayProps) => {
  const [isUpdating, setIsUpdating] = useState(false);

  // Trigger visual feedback when values change
  useEffect(() => {
    setIsUpdating(true);
    const timer = setTimeout(() => setIsUpdating(false), 300);
    return () => clearTimeout(timer);
  }, [lostRevPerWeek, cumulativeLoss, monthlyLoss, yearlyLoss]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const seatLabel = emptyChairs === 1 ? 'Seat' : 'Seats';

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className={`p-6 bg-gradient-to-br from-red-50 to-red-100 border-red-200 transition-all duration-300 text-center ${
          isUpdating ? 'ring-2 ring-red-300 scale-[1.02]' : ''
        }`}>
          <div className="flex items-center justify-center space-x-3 mb-3">
            <div className="p-2 bg-red-500 rounded-lg">
              <TrendingDown className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-red-800">Revenue Lost Per Week</h3>
          </div>
          <p className={`text-4xl font-bold text-red-600 transition-all duration-300 ${
            isUpdating ? 'scale-105' : ''
          }`}>
            {formatCurrency(lostRevPerWeek)}
          </p>
        </Card>

        <Card className={`p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 transition-all duration-300 text-center ${
          isUpdating ? 'ring-2 ring-orange-300 scale-[1.02]' : ''
        }`}>
          <div className="flex items-center justify-center space-x-3 mb-3">
            <div className="p-2 bg-orange-500 rounded-lg">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-orange-800">Total Loss Before {seatLabel} Filled</h3>
          </div>
          <p className={`text-3xl font-bold text-orange-600 transition-all duration-300 ${
            isUpdating ? 'scale-105' : ''
          }`}>
            {formatCurrency(cumulativeLoss)}
          </p>
        </Card>
      </div>

      {/* Extended Projections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className={`p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 transition-all duration-300 text-center ${
          isUpdating ? 'ring-2 ring-purple-300 scale-[1.02]' : ''
        }`}>
          <div className="flex items-center justify-center space-x-3 mb-3">
            <div className="p-2 bg-purple-500 rounded-lg">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-purple-800">Monthly Loss</h3>
          </div>
          <p className={`text-3xl font-bold text-purple-600 transition-all duration-300 ${
            isUpdating ? 'scale-105' : ''
          }`}>
            {formatCurrency(monthlyLoss)}
          </p>
        </Card>

        <Card className={`p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200 transition-all duration-300 text-center ${
          isUpdating ? 'ring-2 ring-indigo-300 scale-[1.02]' : ''
        }`}>
          <div className="flex items-center justify-center space-x-3 mb-3">
            <div className="p-2 bg-indigo-500 rounded-lg">
              <CalendarDays className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-indigo-800">Annual Loss</h3>
          </div>
          <p className={`text-3xl font-bold text-indigo-600 transition-all duration-300 ${
            isUpdating ? 'scale-105' : ''
          }`}>
            {formatCurrency(yearlyLoss)}
          </p>
        </Card>
      </div>

      {/* Live Update Indicator */}
      <div className="text-center">
        <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
          isUpdating 
            ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-200' 
            : 'bg-gray-100 text-gray-600'
        }`}>
          <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
            isUpdating ? 'bg-blue-500 animate-pulse' : 'bg-gray-400'
          }`} />
          <span>{isUpdating ? 'Updating calculations...' : 'Real-time calculations'}</span>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
