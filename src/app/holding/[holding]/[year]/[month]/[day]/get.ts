import { IS_CALENDAR_V2_ENABLED } from '@/features';
import { get as getCalendarV1 } from '@/getters/calendar/v1';
import { get as getCalendarV2 } from '@/getters/calendar/v2';
import { get as getHoldings } from '@/getters/holdings';
import { get as getSettings } from '@/getters/settings';
import type { CalendarMonth , Dateable } from '@/types';
import { dateable, pad } from '@/utils';

export async function get(
  holding: string,
  year: string,
  month: string,
  day: string,
) {
  const { holdings } = await getHoldings();
  const { zone } = await getSettings();

  const result = {
    date: dateable(zone, year, month, day) as Dateable,
    holding: holdings.find(item => item.id === holding),
  };

  if (IS_CALENDAR_V2_ENABLED) {
    const { calendar } = await getCalendarV2(holding, year, month);

    return {
      ...result,
      calendar: calendar as CalendarMonth,
    };
  }

  const { calendar } = await getCalendarV1();

  const key = `${year}-${pad(Number(month) - 1)}`;

  const current = calendar
    .find(year => year.months.find(month => `${pad(month.year)}-${pad(month.month)}` === key))
    ?.months
    ?.find(month => `${pad(month.year)}-${pad(month.month)}` === key);

  return {
    ...result,
    calendar: current as CalendarMonth,
  };
};
