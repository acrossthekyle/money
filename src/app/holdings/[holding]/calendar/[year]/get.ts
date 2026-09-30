import { getYear } from 'date-fns';

import { get as getBudgets } from '@/getters/budgets';
import { get as getCalendar } from '@/getters/calendar';
import { get as getHoldings } from '@/getters/holdings';
import { get as getSettings } from '@/getters/settings';
import type { CalendarYear } from '@/types';
import { date } from '@/utils';

export async function get(holding: string, year: string) {
  const { holdings } = await getHoldings();
  const { budgets } = await getBudgets();
  const { zone } = await getSettings();
  const { calendar } = await getCalendar(
    holdings,
    budgets,
    zone,
    holding,
    year,
  );

  return {
    calendar: calendar as CalendarYear,
    holding: holdings.find(item => item.id === holding),
    isThisYear: Number(year) === getYear(date(zone)),
    year,
  };
};
