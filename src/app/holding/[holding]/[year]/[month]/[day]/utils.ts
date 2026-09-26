import { format, parseISO } from 'date-fns';

import { date } from '@/utils';

export function createDateable(
  zone: string,
  year: string,
  month: string,
  day: string,
) {
  const today = date(zone);

  return {
    date: parseISO(`${year}-${month}-${day}`),
    iso: `${year}-${month}-${day}`,
    year,
    month,
    day,
    uri: `${year}/${month}/${day}`,
    today: {
      date: today,
      uri: format(today, 'yyyy/MM/dd'),
    },
  };
};
