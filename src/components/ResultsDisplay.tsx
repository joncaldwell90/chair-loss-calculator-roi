
import { Card } from "@/components/ui/card";
import { DollarSign, TrendingDown, Clock } from "lucide-react";

interface ResultsDisplayProps {
  lostRevPerWeek: number;
  cumulativeLoss: number;
  breakEvenBoosted: number;
  breakEvenGuaranteed: number;
  boostedFee: number;
  guaranteedFee: number;
}

const ResultsDisplay = ({
  lostRevPerWeek,
  cumulativeLoss,
  breakEvenBoosted,
  breakEvenGuaranteed,
  boostedFee,
  guaranteedFee,
}: ResultsDisplayProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatWeeks = (weeks: number) => {
    return weeks.toFixed(1);
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

      {/* Beautista Package Comparison */}
      <Card className="p-8 bg-gradient-to-br from-green-50 to-blue-50 border-0 shadow-lg">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-blue-500 rounded-lg">
            <Clock className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900">Beautista Package ROI</h3>
        </div>

        <div className="overflow-hidden rounded-lg border border-gray-200">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Package</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Fee</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Weeks to Break Even*</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="hover:bg-green-50 transition-colors duration-200">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Boosted Listing</td>
                <td className="px-6 py-4 text-sm text-gray-900 font-semibold">{formatCurrency(boostedFee)}</td>
                <td className="px-6 py-4 text-sm font-bold text-green-600">
                  {formatWeeks(breakEvenBoosted)} weeks
                </td>
              </tr>
              <tr className="hover:bg-blue-50 transition-colors duration-200">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Guaranteed Talent</td>
                <td className="px-6 py-4 text-sm text-gray-900 font-semibold">{formatCurrency(guaranteedFee)}</td>
                <td className="px-6 py-4 text-sm font-bold text-blue-600">
                  {formatWeeks(breakEvenGuaranteed)} weeks
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 mt-4 italic">
          *Payback weeks = Fee ÷ Weekly loss
        </p>
      </Card>
    </div>
  );
};

export default ResultsDisplay;
