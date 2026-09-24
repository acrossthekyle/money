import type { CalendarYear } from '@/types';

export function recalculate(
  calendar: CalendarYear[],
  startingBalance: number
): CalendarYear[] {
  let runningBalance = startingBalance;

  const masterDaysMap = new Map();

  calendar.forEach((year) => {
    year.months.forEach((month) => {
      if (month.isPastMonth) {
        const daysInMonth = month.days.filter(day => day.isInMonth);

        if (daysInMonth.length > 0) {
          runningBalance = daysInMonth[daysInMonth.length - 1].balance;
        }

        return;
      }

      month.days.forEach((day) => {
        if (day.isInMonth) {
          if (day.isBeforeToday) {
            runningBalance = day.balance;
          } else {
            const credits = day.credits
              .filter(credit => credit.budget !== 'return')
              .reduce((sum, ccredit) => sum + ccredit.amount, 0);

            const debits = day.debits
              .filter(debit => debit.budget !== 'return')
              .reduce((sum, debit) => sum + debit.amount, 0);

            runningBalance = runningBalance + credits - debits;

            if (day.return && day.return.amount !== null) {
              runningBalance += day.return.amount;
            }

            day.balance = Number(runningBalance.toFixed(2));
          }

          masterDaysMap.set(day.iso, day);
        }
      });
    });
  });

  calendar.forEach((year) => {
    year.months.forEach((month) => {
      month.days.forEach((day) => {
        if (!day.isInMonth && masterDaysMap.has(day.iso)) {
          const item = masterDaysMap.get(day.iso);

          day.balance = item.balance;
          day.budgets = item.budgets;
          day.debits = item.debits;
          day.credits = item.credits;
          day.return = item.return;
        }
      });
    });
  });

  return calendar;
}
