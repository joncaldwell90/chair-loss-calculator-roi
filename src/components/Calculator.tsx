import { useState, useEffect } from "react";
import InputField from "./InputField";
import SliderInput from "./SliderInput";
import ResultsDisplay from "./ResultsDisplay";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Calculator = () => {
  const [avgTicket, setAvgTicket] = useState(0);
  const [clientsPerDay, setClientsPerDay] = useState(0);
  const [emptyChairs, setEmptyChairs] = useState(0);
  const [daysOpen, setDaysOpen] = useState(5);
  const [weeksToFill, setWeeksToFill] = useState(0);

  // Track which fields have been edited
  const [editedFields, setEditedFields] = useState<Set<string>>(new Set());

  // Calculations
  const [weeklyRevPerChair, setWeeklyRevPerChair] = useState(0);
  const [lostRevPerWeek, setLostRevPerWeek] = useState(0);
  const [cumulativeLoss, setCumulativeLoss] = useState(0);
  const [monthlyLoss, setMonthlyLoss] = useState(0);
  const [yearlyLoss, setYearlyLoss] = useState(0);

  useEffect(() => {
    // Use default values for calculation if field is empty
    const effectiveAvgTicket = avgTicket || 85;
    const effectiveClientsPerDay = clientsPerDay || 5;
    const effectiveEmptyChairs = emptyChairs || 1;
    const effectiveWeeksToFill = weeksToFill || 8; // Changed from 13 to 8

    // Real-time calculations
    const weeklyRev = effectiveAvgTicket * effectiveClientsPerDay * daysOpen;
    const lostRev = weeklyRev * effectiveEmptyChairs;
    const cumLoss = lostRev * effectiveWeeksToFill;
    const monthlyLossCalc = lostRev * 4.33; // Average weeks per month
    const yearlyLossCalc = lostRev * 52; // 52 weeks per year

    setWeeklyRevPerChair(weeklyRev);
    setLostRevPerWeek(lostRev);
    setCumulativeLoss(cumLoss);
    setMonthlyLoss(monthlyLossCalc);
    setYearlyLoss(yearlyLossCalc);
  }, [avgTicket, clientsPerDay, emptyChairs, daysOpen, weeksToFill]);

  const handleInputChange = (field: string, value: number) => {
    // Mark field as edited
    setEditedFields(prev => new Set(prev).add(field));
    
    // Validation
    switch (field) {
      case 'avgTicket':
        if (value >= 0) setAvgTicket(value);
        break;
      case 'clientsPerDay':
        if (value >= 0) setClientsPerDay(value);
        break;
      case 'emptyChairs':
        if (value >= 0 && Number.isInteger(value)) setEmptyChairs(value);
        break;
      case 'weeksToFill':
        if (value >= 0) setWeeksToFill(value);
        break;
    }
  };

  // Check if any fields have been edited (results are active)
  const hasResults = editedFields.size > 0;

  // Format currency for micro-copy
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleBookingClick = () => {
    window.open('https://calendly.com/your-booking-link', '_blank');
  };

  const handleLearnMoreClick = () => {
    window.location.href = '/package-details';
  };

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <Card className="p-8 bg-white shadow-lg border-0">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Enter Your Salon Details
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            id="avgTicket"
            label="Average Service Ticket"
            value={avgTicket}
            onChange={(value) => handleInputChange('avgTicket', value)}
            placeholder="85"
            prefix="$"
            isEdited={editedFields.has('avgTicket')}
          />
          
          <InputField
            id="clientsPerDay"
            label="Clients Per Stylist Per Day"
            value={clientsPerDay}
            onChange={(value) => handleInputChange('clientsPerDay', value)}
            placeholder="5"
            suffix="clients"
            isEdited={editedFields.has('clientsPerDay')}
          />
          
          <InputField
            id="emptyChairs"
            label="# Empty Chairs"
            value={emptyChairs}
            onChange={(value) => handleInputChange('emptyChairs', value)}
            placeholder="1"
            step={1}
            isEdited={editedFields.has('emptyChairs')}
          />
          
          <InputField
            id="weeksToFill"
            label="Estimated Weeks to Fill Seat"
            value={weeksToFill}
            onChange={(value) => handleInputChange('weeksToFill', value)}
            placeholder="8"
            isEdited={editedFields.has('weeksToFill')}
            helperText="Typical range 4-12 weeks"
          />
        </div>

        <div className="mt-6">
          <SliderInput
            id="daysOpen"
            label="Operating Days Per Week"
            value={daysOpen}
            onChange={setDaysOpen}
            min={3}
            max={7}
          />
        </div>
      </Card>

      {/* Results Section */}
      <ResultsDisplay
        lostRevPerWeek={lostRevPerWeek}
        cumulativeLoss={cumulativeLoss}
        monthlyLoss={monthlyLoss}
        yearlyLoss={yearlyLoss}
        emptyChairs={emptyChairs || 1}
      />

      {/* Dynamic CTA Section */}
      <Card className="p-8 bg-white shadow-lg border-0 text-center">
        <div className="space-y-6">
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center flex-wrap">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Button
                      onClick={handleBookingClick}
                      disabled={!hasResults}
                      className={`px-6 py-3 text-lg font-bold rounded-lg transition-all duration-300 shadow-lg ${
                        hasResults 
                          ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                          : 'bg-blue-600 text-white opacity-40 cursor-not-allowed'
                      }`}
                      size="lg"
                    >
                      Book My Hiring Plan Call
                    </Button>
                  </div>
                </TooltipTrigger>
                {!hasResults && (
                  <TooltipContent>
                    <p>Calculate first</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>

            <Button
              onClick={handleLearnMoreClick}
              variant="outline"
              className="px-6 py-3 text-lg font-medium rounded-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-all duration-300"
              size="lg"
            >
              Learn More
            </Button>
          </div>

          {/* Micro-Copy */}
          {hasResults && (
            <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
              <p className="text-lg text-red-800 font-medium">
                Your results show you're losing <span className="font-bold">{formatCurrency(lostRevPerWeek)}</span> per week. 
                Stop the leak in just 15 minutes.
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Calculator;
