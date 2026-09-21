import { format, getMonth, getYear } from 'date-fns';

import { calendar as getCalendar } from '@/algorithms/calendar';
import { metrics } from '@/algorithms/metrics';
import { DATE_FORMAT } from '@/constants';
// import { get as getBudgets } from '@/getters/budgets';
import { get as getHoldings } from '@/getters/holdings';
import { get as getPreferences } from '@/getters/preferences';
import { get as getSettings } from '@/getters/settings';
import { date as zonedDate } from '@/utils';

import type { SearchParams } from './types';

export async function get(params: SearchParams) {
  const { holdings } = await getHoldings();
  // const { budgets } = await getBudgets();
  const { zone } = await getSettings();
  const { saved } = await getPreferences(
    params.view as string || null,
    holdings,
  );

  const date = String(params.date || format(zonedDate(zone), DATE_FORMAT));
  const month = Number(params.month || getMonth(zonedDate(zone)));
  const year = Number(params.year || getYear(zonedDate(zone)));

  const { netWorth } = await metrics(holdings);

  const calendar = await getCalendar(
    // holdings,
    // budgets,
    // saved,
    // zone,
  );

  const key = `${month}-${year}`;

  const current = calendar
    .find(year => year.months.find(month => month.id === key))
    ?.months
    ?.find(month => month.id === key);

  const holding = holdings.find(holding => holding.id === saved);

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
