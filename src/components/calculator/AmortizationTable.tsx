import { useState } from 'react';
import type { MonthlyPayment } from '@/types/mortgage';
import { formatCurrency } from '@/utils/formatters';
import Button from '@/components/ui/Button';
import { exportToCSV } from '@/utils/export'; // функция для экспорта

interface AmortizationTableProps {
  schedule: MonthlyPayment[];
}

const AmortizationTable: React.FC<AmortizationTableProps> = ({ schedule }) => {
  const [showAll, setShowAll] = useState(false);
  const displayedSchedule = showAll ? schedule : schedule.slice(0, 12);

  const handleExportCSV = () => {
    exportToCSV(schedule, 'mortgage-schedule.csv');
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">График платежей</h3>
        <Button onClick={handleExportCSV} variant="outline">Экспорт в CSV</Button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Месяц</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дата</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Платёж</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Основной долг</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Проценты</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Остаток долга</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayedSchedule.map((row) => (
              <tr key={row.month}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.month}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(row.payment)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(row.principal)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(row.interest)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(row.remainingDebt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {schedule.length > 12 && !showAll && (
        <div className="text-center mt-4">
          <Button onClick={() => setShowAll(true)} variant="outline">
            Показать все {schedule.length} месяцев
          </Button>
        </div>
      )}
    </div>
  );
};

export default AmortizationTable;
