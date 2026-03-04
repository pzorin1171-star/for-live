import { useState } from 'react';
import CalculatorForm from '@/components/calculator/CalculatorForm';
import Results from '@/components/calculator/Results';
import AmortizationTable from '@/components/calculator/AmortizationTable';
import { calculateMortgage } from '@/lib/mortgage';
import type { MortgageInput, MortgageResult } from '@/types/mortgage';

export default function CalculatorPage() {
  const [result, setResult] = useState<MortgageResult | null>(null);
  const [paymentType, setPaymentType] = useState<'annuity' | 'differentiated'>('annuity');

  const handleCalculate = (data: MortgageInput) => {
    setPaymentType(data.paymentType);
    const calculationResult = calculateMortgage(data);
    setResult(calculationResult);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Ипотечный калькулятор</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <CalculatorForm onCalculate={handleCalculate} />
        </div>
        {result && (
          <div>
            <Results result={result} paymentType={paymentType} />
          </div>
        )}
      </div>

      {result && <AmortizationTable schedule={result.schedule} />}
    </div>
  );
}
