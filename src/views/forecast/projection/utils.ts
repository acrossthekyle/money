import type { CalendarDay } from '@/types';

import type { Balances, BalancePoint, BalanceSummary } from './types';

export function balancize(months: Array<CalendarDay[]>): Balances[] {
  const next = months.slice(1);

  return next.reduce<Balances[]>((accumulator, days) => {
    const filtered = days.filter(({ dateable }) => dateable.isInMonth);

    const balances = filtered.map((day: CalendarDay) => day.balance);

    const start = balances[0];
    const average = balances.reduce((accumulator, current) => accumulator + current, 0) / balances.length;
    const end = balances[balances.length - 1];

    return [
      ...accumulator,
      {
        average,
        end,
        month: Number(filtered[0].dateable.month) - 1,
        start,
        year: filtered[0].dateable.year,
      },
    ];
  }, []);
}

export function summarize(data: Balances[]): BalanceSummary {
  const last = data[data.length - 1];

  const end: BalancePoint = {
    value: last.end,
    month: last.month,
    year: last.year,
  };

  let running = 0;

  let lowest: BalancePoint = {
    value: data[0].start,
    month: data[0].month,
    year: data[0].year,
  };

  let highest: BalancePoint = {
    value: data[0].start,
    month: data[0].month,
    year: data[0].year,
  };

  for (const item of data) {
    running += item.average;

    for (const value of [item.start, item.end]) {
      if (value < lowest.value) {
        lowest = {
          value,
          month: item.month,
          year: item.year,
        };
      }
      if (value > highest.value) {
        highest = {
          value,
          month: item.month,
          year: item.year,
        };
      }
    }
  }

  return {
    end,
    average: running / data.length,
    lowest,
    highest,
  };
};
