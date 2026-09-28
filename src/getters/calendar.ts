import { calendar } from '@/algorithms/calendar';
import type { Budget, CalendarMonth, CalendarYear, Holding } from '@/types';

type Return = {
  calendar: CalendarMonth | CalendarYear;
};

export async function get(
  holdings: Holding[],
  budgets: Budget[],
  zone: string,
  id: string,
  year: string,
  month?: string,
): Promise<Return> {
  const value = await calendar(holdings, budgets, zone, id, {
    targetMonth: month ? parseInt(month, 10) - 1 : undefined,
    targetYear: parseInt(year, 10),
  });

  return {
    calendar: month ? value[0].months[0] : value[0],
  };
}
