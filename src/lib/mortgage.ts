import type { MortgageInput, MortgageResult, MonthlyPayment, PaymentType } from '@/types/mortgage';

/**
 * Расчёт ежемесячного аннуитетного платежа
 * @param amount - сумма кредита
 * @param months - срок в месяцах
 * @param monthlyRate - месячная процентная ставка (в долях, например 0.01 = 1%)
 */
function calculateAnnuityPayment(amount: number, months: number, monthlyRate: number): number {
  if (monthlyRate === 0) return amount / months;
  const factor = Math.pow(1 + monthlyRate, months);
  return amount * (monthlyRate * factor) / (factor - 1);
}

/**
 * Основная функция расчёта ипотеки
 */
export function calculateMortgage(input: MortgageInput): MortgageResult {
  const { price, initialPayment, term, rate, paymentType } = input;

  const loanAmount = price - initialPayment; // сумма кредита
  const months = term * 12;
  const monthlyRate = rate / 100 / 12; // преобразуем годовую ставку в месячную долю

  let schedule: MonthlyPayment[] = [];
  let totalPayment = 0;
  let overpayment = 0;

  if (paymentType === 'annuity') {
    const annuityPayment = calculateAnnuityPayment(loanAmount, months, monthlyRate);
    let remainingDebt = loanAmount;

    for (let month = 1; month <= months; month++) {
      const interestPayment = remainingDebt * monthlyRate;
      const principalPayment = annuityPayment - interestPayment;
      remainingDebt -= principalPayment;

      schedule.push({
        month,
        date: `2025-${String(month).padStart(2, '0')}`, // упрощённо
        payment: annuityPayment,
        principal: principalPayment,
        interest: interestPayment,
        remainingDebt: remainingDebt > 0 ? remainingDebt : 0,
      });

      totalPayment += annuityPayment;
    }

    overpayment = totalPayment - loanAmount;

    return {
      monthlyPayment: annuityPayment,
      totalPayment,
      overpayment,
      schedule,
    };
  } else {
    // Дифференцированный платёж
    const principalPart = loanAmount / months; // постоянная часть основного долга
    let remainingDebt = loanAmount;
    const firstPayment = principalPart + remainingDebt * monthlyRate;

    for (let month = 1; month <= months; month++) {
      const interestPayment = remainingDebt * monthlyRate;
      const payment = principalPart + interestPayment;
      remainingDebt -= principalPart;

      schedule.push({
        month,
        date: `2025-${String(month).padStart(2, '0')}`,
        payment,
        principal: principalPart,
        interest: interestPayment,
        remainingDebt: remainingDebt > 0 ? remainingDebt : 0,
      });

      totalPayment += payment;
    }

    overpayment = totalPayment - loanAmount;
    const lastPayment = schedule[schedule.length - 1].payment;

    return {
      monthlyPayment: { first: firstPayment, last: lastPayment },
      totalPayment,
      overpayment,
      schedule,
    };
  }
}
