'use client';

import type { CalendarDay } from '@/types';

export function recalculate(
  calendar: CalendarDay[],
  startingBalance: number
): CalendarDay[] {
  let runningBalance = startingBalance;

  let firstMonthBalance = startingBalance;
  let lastMonthBalance = startingBalance;

  calendar.forEach((day) => {
    if (day.dateable.isBeforeToday) {
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
        runningBalance += day.return.isPositive ? day.return.amount : -day.return.amount;
      }

      day.balance = Math.round(runningBalance * 100) / 100;
    }
  });

  const actualMonthDays = calendar.filter(day => day.dateable.isInMonth);

  if (actualMonthDays.length > 0) {
    const firstMonthIso = actualMonthDays[0].dateable.iso;
    const lastMonthIso = actualMonthDays[actualMonthDays.length - 1].dateable.iso;

    calendar.forEach((day) => {
      if (day.dateable.iso < firstMonthIso) {
        day.balance = firstMonthBalance;
      } else if (day.dateable.iso > lastMonthIso) {
        day.balance = lastMonthBalance;
      }
    });
  }

  return calendar;
};
