export type PaymentType = 'annuity' | 'differentiated';

export interface MortgageInput {
  price: number;
  initialPayment: number;
  term: number;
  rate: number;
  paymentType: PaymentType;
}

export interface MonthlyPayment {
  month: number;
  date: string;
  payment: number;
  principal: number;
  interest: number;
  remainingDebt: number;
}

export interface MortgageResult {
  monthlyPayment: number | { first: number; last: number };
  totalPayment: number;
  overpayment: number;
  schedule: MonthlyPayment[];
}
