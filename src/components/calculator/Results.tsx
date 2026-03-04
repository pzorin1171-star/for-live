import type { MortgageResult, PaymentType } from '@/types/mortgage';
import { formatCurrency } from '@/utils/formatters';

interface ResultsProps {
  result: MortgageResult;
  paymentType: PaymentType;
}

const Results: React.FC<ResultsProps> = ({ result, paymentType }) => {
  const { monthlyPayment, totalPayment, overpayment } = result;

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Результаты расчёта</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Ежемесячный платёж</p>
          {paymentType === 'annuity' ? (
            <p className="text-2xl font-bold text-primary">{formatCurrency(monthlyPayment as number)}</p>
          ) : (
            <>
              <p className="text-lg">
                Первый: <span className="font-bold">{formatCurrency((monthlyPayment as any).first)}</span>
              </p>
              <p className="text-lg">
                Последний: <span className="font-bold">{formatCurrency((monthlyPayment as any).last)}</span>
              </p>
            </>
          )}
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Общая выплата банку</p>
          <p className="text-2xl font-bold text-primary">{formatCurrency(totalPayment)}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Переплата по процентам</p>
          <p className="text-2xl font-bold text-red-600">{formatCurrency(overpayment)}</p>
        </div>
      </div>
    </div>
  );
};

export default Results;
