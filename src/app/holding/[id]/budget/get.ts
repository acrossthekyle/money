import { addDays, format } from 'date-fns';

import { DATE_FORMAT } from '@/constants';
import { get as getHoldings } from '@/getters/holdings';
import { get as getSettings } from '@/getters/settings';
import { date } from '@/utils';

export async function get(id: string) {
  const { holdings } = await getHoldings();
  const { zone } = await getSettings();

  return {
    date: format(addDays(date(zone), 1), DATE_FORMAT),
    holdings,
    parent: id,
  };
};
