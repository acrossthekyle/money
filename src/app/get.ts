import { format, getMonth, getYear } from 'date-fns';

import { metrics } from '@/algorithms/metrics';
import { DATE_FORMAT } from '@/constants';
import { get as getCalendar } from '@/getters/calendar';
import { get as getHolding } from '@/getters/holding';
import { get as getHoldings } from '@/getters/holdings';
import { get as getSettings } from '@/getters/settings';
import { date as zonedDate } from '@/utils';

import type { SearchParams } from './types';

export async function get(params: SearchParams) {
  const { holdings } = await getHoldings();
  const { zone } = await getSettings();
  const { id } = await getHolding();

  const date = String(params.date || format(zonedDate(zone), DATE_FORMAT));
  const month = Number(params.month || getMonth(zonedDate(zone)));
  const year = Number(params.year || getYear(zonedDate(zone)));

  const { netWorth } = await metrics(holdings);

  const { calendar } = await getCalendar();

  const key = `${month}-${year}`;

  const current = calendar
    .find(year => year.months.find(month => `${month.month}-${month.year}` === key))
    ?.months
    ?.find(month => `${month.month}-${month.year}` === key);

  const holding = holdings.find(holding => holding.id === id);

  return {
    calendar: {
      years: calendar,
      month: current,
    },
    date,
    holding,
    holdings,
    metrics: {
      netWorth,
    },
  };
};
