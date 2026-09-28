import { getYear } from 'date-fns';

import { IS_CALENDAR_V2_ENABLED } from '@/features';
import { get as getCalendarV1 } from '@/getters/calendar/v1';
import { get as getCalendarV2 } from '@/getters/calendar/v2';
import { get as getHoldings } from '@/getters/holdings';
import { get as getSettings } from '@/getters/settings';
import type { CalendarYear } from '@/types';
import { date } from '@/utils';

export async function get(holding: string, year: string) {
  const { holdings } = await getHoldings();
  const { zone } = await getSettings();

  const result = {
    holding: holdings.find(item => item.id === holding),
    isThisYear: Number(year) === getYear(date(zone)),
    year,
  };

  if (IS_CALENDAR_V2_ENABLED) {
    const { calendar } = await getCalendarV2(holding, year);

    return {
      ...result,
      calendar: calendar as CalendarYear,
    };
  }

  const { calendar } = await getCalendarV1();

  const index = calendar.findIndex(item => item.year === Number(year));

  return {
    ...result,
    calendar: calendar[index] as CalendarYear,
  };
};
