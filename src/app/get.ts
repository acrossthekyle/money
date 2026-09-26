import { getDate, getMonth, getYear } from 'date-fns';

import { get as getHoldings } from '@/getters/holdings';
import { get as getSettings } from '@/getters/settings';
import { date, pad } from '@/utils';

export async function get() {
  const { holdings } = await getHoldings();
  const { zone } = await getSettings();

  const today = date(zone);

  return {
    date: {
      year: getYear(today),
      month: pad(getMonth(today) + 1),
      day: pad(getDate(today)),
    },
    holdings,
  };
};
