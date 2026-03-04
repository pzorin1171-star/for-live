// src/types/mortgage.ts

export type PaymentType = 'annuity' | 'differentiated';

export interface MortgageInput {
  price: number;            // стоимость недвижимости
  initialPayment: number;   // первоначальный взнос (руб)
  term: number;             // срок в годах
  rate: number;             // процентная ставка (% годовых)
  paymentType: PaymentType;
}

export interface MonthlyPayment {
  month: number;
  date: string;             // в формате YYYY-MM
  payment: number;          // общий платёж
  principal: number;        // основной долг
  interest: number;         // проценты
  remainingDebt: number;    // остаток долга
}

export interface MortgageResult {
  monthlyPayment: number | { first: number; last: number }; // для дифференцированного
  totalPayment: number;      // общая выплата банку
  overpayment: number;       // переплата по процентам
  schedule: MonthlyPayment[];
}
