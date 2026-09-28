import type { CalendarYear } from '@/types';

export function recalculate(
  calendar: CalendarYear[],
  startingBalance: number
): CalendarYear[] {
  let runningBalance = startingBalance;

  const days = new Map();

  calendar.forEach((year) => {
    year.months.forEach((month) => {
      if (month.isPastMonth) {
        const daysInMonth = month.days.filter(day => day.isInMonth);

        if (daysInMonth.length > 0) {
          runningBalance = daysInMonth[daysInMonth.length - 1].balance;
        }

        return;
      }

      const sortedDays = [...month.days].sort((a, b) => a.iso.localeCompare(b.iso));

      sortedDays.forEach((day) => {
        if (day.isInMonth) {
          if (day.isBeforeToday) {
            runningBalance = day.balance;
          } else {
            let creditsSum = 0;
            let debitsSum = 0;

            for (let i = 0; i < day.credits.length; i++) {
              if (day.credits[i].budget !== 'return') {
                creditsSum += day.credits[i].amount;
              }
            }

            for (let i = 0; i < day.debits.length; i++) {
              if (day.debits[i].budget !== 'return') {
                debitsSum += day.debits[i].amount;
              }
            }

            runningBalance = runningBalance + creditsSum - debitsSum;

            if (day.return && day.return.amount !== null) {
              runningBalance += day.return.amount;
            }

            day.balance = Math.round(runningBalance * 100) / 100;
          }

          days.set(day.iso, day);
        }
      });
    });
  });

  calendar.forEach((year) => {
    year.months.forEach((month) => {
      month.days.forEach((day) => {
        if (!day.isInMonth && days.has(day.iso)) {
          const item = days.get(day.iso);

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
};
