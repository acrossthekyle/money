import type { CalendarDay } from '@/types';
import { currency } from '@/utils';
import { getBudgetDisplayData } from '@/utils/budgets';

type Balances = {
  income: number[];
  expenses: number[];
};

export function getChange(current: number, next: number) {
  if (current === 0) {
    return next === 0 ? 0 : '+100';
  }

  const change = ((next - current) / Math.abs(current)) * 100;
  const result = Number(change.toFixed(2));

  return result > 0 ? `+${currency(result, true)}` : `-${currency(result, true)}`;
};

export function getFlow(days: CalendarDay[]) {
  const balances = days
    .filter(({ dateable }) => dateable.isInMonth)
    .reduce<Balances>((accumulator, day: CalendarDay) => {
      day.budgets.map(budget => {
        const { amount, isNegative } = getBudgetDisplayData(
          day.debits,
          budget,
        );

        if (isNegative) {
          accumulator.expenses.push(Number(amount));
        } else {
          accumulator.income.push(Number(amount));
        }
      });

      if (day.return.amount !== null) {
        if (day.return.amount > 0) {
          accumulator.income.push(Number(day.return.amount));
        } else {
          accumulator.expenses.push(Number(day.return.amount));
        }
      }

      return accumulator;
    }, { income: [], expenses: [] });

  const income = balances.income.reduce((accumulator, value) => accumulator + value, 0);
  const expenses = balances.expenses.reduce((accumulator, value) => accumulator + value, 0);

  return {
    income,
    expenses,
  };
}
