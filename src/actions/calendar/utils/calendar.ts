import type { Calendar } from '@/types';

import type { Day } from '../types';

export function addToCalendar(calendar: Calendar[], days: Day[]): Calendar[] {
  days.forEach((day: Day) => {
    const foundIndex = calendar.findIndex(date => date.date === day.date);

    const cleanedBudgets = day.budgets.map((budget) => ({
      name: budget.name,
      id: budget.id,
      amount: budget.amount,
      isTransfer: budget.isTransfer,
      type: budget.displayType,
    }));

    if (foundIndex >= 0) {
      calendar[foundIndex] = {
        date: calendar[foundIndex].date,
        balance: Number(calendar[foundIndex].balance) + Number(day.balance),
        budgets: calendar[foundIndex].budgets.concat(cleanedBudgets),
        isPad: day.isPad,
        isToday: day.isToday,
      };
    } else {
      calendar.push({
        date: day.date,
        balance: Number(day.balance),
        budgets: cleanedBudgets,
        isPad: day.isPad,
        isToday: day.isToday,
      });
    }
  });

  return calendar;
};
