import { get as getBudgets } from '@/getters/budgets';
import { get as getCalendar } from '@/getters/calendar';
import { get as getHoldings } from '@/getters/holdings';
import { get as getSettings } from '@/getters/settings';
import type { CalendarMonth , Dateable } from '@/types';
import { dateable } from '@/utils';

export async function get(
  holding: string,
  year: string,
  month: string,
  day: string,
) {
  const { holdings } = await getHoldings();
  const { budgets } = await getBudgets();
  const { zone } = await getSettings();

  const { calendar } = await getCalendar(
    holdings,
    budgets,
    zone,
    holding,
    year,
    month,
  );

  return {
    calendar: calendar as CalendarMonth,
    date: dateable(zone, year, month, day) as Dateable,
    holding: holdings.find(item => item.id === holding),
  };
};
