import { calendar } from '@/algorithms/calendar/v2';
import type { CalendarMonth, CalendarYear } from '@/types';

import { get as getBudgets } from '../budgets';
import { get as getHoldings } from '../holdings';
import { get as getSettings } from '../settings';

type Return = {
  calendar: CalendarMonth | CalendarYear;
};

export async function get(id: string, year: string, month?: string): Promise<Return> {
  const { holdings } = await getHoldings();
  const { budgets } = await getBudgets();
  const { zone } = await getSettings();

  const value = await calendar(holdings, budgets, zone, id, {
    targetMonth: month ? parseInt(month, 10) - 1 : undefined,
    targetYear: parseInt(year, 10),
  });

  return {
    calendar: month ? value[0].months[0] : value[0],
  };
}
