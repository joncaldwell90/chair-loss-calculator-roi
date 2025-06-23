
import { Card } from "@/components/ui/card";
import { DollarSign, TrendingDown } from "lucide-react";

interface ResultsDisplayProps {
  lostRevPerWeek: number;
  cumulativeLoss: number;
}

const ResultsDisplay = ({
  lostRevPerWeek,
  cumulativeLoss,
}: ResultsDisplayProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-red-500 rounded-lg">
              <TrendingDown className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-red-800">Revenue Lost Per Week</h3>
          </div>
          <p className="text-4xl font-bold text-red-600">
            {formatCurrency(lostRevPerWeek)}
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-orange-500 rounded-lg">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-orange-800">Total Loss Before Seat Filled</h3>
          </div>
          <p className="text-3xl font-bold text-orange-600">
            {formatCurrency(cumulativeLoss)}
          </p>
        </Card>
      </div>
    </div>
  );
};

export default ResultsDisplay;
