
import Calculator from "@/components/Calculator";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Salon Empty-Chair ROI Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover how much revenue you're losing per empty chair and see how quickly 
            Beautista's hiring solutions pay for themselves.
          </p>
        </div>
        <Calculator />
      </div>
    </div>
  );
};

export default Index;
