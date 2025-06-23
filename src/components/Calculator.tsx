
import { useState, useEffect } from "react";
import InputField from "./InputField";
import SliderInput from "./SliderInput";
import ResultsDisplay from "./ResultsDisplay";
import { Card } from "@/components/ui/card";

const Calculator = () => {
  const [avgTicket, setAvgTicket] = useState(85);
  const [clientsPerDay, setClientsPerDay] = useState(5);
  const [emptyChairs, setEmptyChairs] = useState(1);
  const [daysOpen, setDaysOpen] = useState(5);
  const [daysToFill, setDaysToFill] = useState(90);

  // Calculations
  const [weeklyRevPerChair, setWeeklyRevPerChair] = useState(0);
  const [lostRevPerWeek, setLostRevPerWeek] = useState(0);
  const [cumulativeLoss, setCumulativeLoss] = useState(0);
  const [monthlyLoss, setMonthlyLoss] = useState(0);
  const [yearlyLoss, setYearlyLoss] = useState(0);

  useEffect(() => {
    // Real-time calculations
    const weeklyRev = avgTicket * clientsPerDay * daysOpen;
    const lostRev = weeklyRev * emptyChairs;
    const cumLoss = lostRev * (daysToFill / 7);
    const monthlyLossCalc = lostRev * 4.33; // Average weeks per month
    const yearlyLossCalc = lostRev * 52; // 52 weeks per year

    setWeeklyRevPerChair(weeklyRev);
    setLostRevPerWeek(lostRev);
    setCumulativeLoss(cumLoss);
    setMonthlyLoss(monthlyLossCalc);
    setYearlyLoss(yearlyLossCalc);
  }, [avgTicket, clientsPerDay, emptyChairs, daysOpen, daysToFill]);

  const handleInputChange = (field: string, value: number) => {
    // Validation
    switch (field) {
      case 'avgTicket':
        if (value > 0) setAvgTicket(value);
        break;
      case 'clientsPerDay':
        if (value > 0) setClientsPerDay(value);
        break;
      case 'emptyChairs':
        if (value >= 1 && Number.isInteger(value)) setEmptyChairs(value);
        break;
      case 'daysToFill':
        if (value >= 1) setDaysToFill(value);
        break;
    }
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
            label="Average Service Ticket ($)"
            value={avgTicket}
            onChange={(value) => handleInputChange('avgTicket', value)}
            placeholder="85"
          />
          
          <InputField
            id="clientsPerDay"
            label="Clients Per Stylist Per Day"
            value={clientsPerDay}
            onChange={(value) => handleInputChange('clientsPerDay', value)}
            placeholder="5"
          />
          
          <InputField
            id="emptyChairs"
            label="# Empty Chairs"
            value={emptyChairs}
            onChange={(value) => handleInputChange('emptyChairs', value)}
            placeholder="1"
            step={1}
          />
          
          <InputField
            id="daysToFill"
            label="Estimated Days to Fill Seat"
            value={daysToFill}
            onChange={(value) => handleInputChange('daysToFill', value)}
            placeholder="90"
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
      />

      {/* CTA Placeholder */}
      <div id="ctaAnchor" className="h-20 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
        <p className="text-gray-500 font-medium">CTA Section Placeholder</p>
      </div>
    </div>
  );
};

export default Calculator;
