import { get as getCalendar } from '@/getters/calendar';
import { get as getHoldings } from '@/getters/holdings';
import { get as getSettings } from '@/getters/settings';
import { pad } from '@/utils';

import { createDateable } from './utils';

export async function get(
  holding: string,
  year: string,
  month: string,
  day: string,
) {
  const { holdings } = await getHoldings();
  const { calendar } = await getCalendar();
  const { zone } = await getSettings();

  const key = `${year}-${pad(Number(month) - 1)}`;

  const current = calendar
    .find(year => year.months.find(month => `${pad(month.year)}-${pad(month.month)}` === key))
    ?.months
    ?.find(month => `${pad(month.year)}-${pad(month.month)}` === key);

  return {
    calendar: current,
    date: createDateable(zone, year, month, day),
    holding: holdings.find(item => item.id === holding),
  };
};
