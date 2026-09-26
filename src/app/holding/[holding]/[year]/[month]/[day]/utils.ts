import { format, parseISO } from 'date-fns';

import { DATE_DISPLAY, DATE_URI } from '@/constants';
import { date } from '@/utils';

export function createDateable(
  zone: string,
  year: string,
  month: string,
  day: string,
) {
  const today = date(zone);
  const parsed = parseISO(`${year}-${month}-${day}`);

  return {
    date: parsed,
    iso: `${year}-${month}-${day}`,
    display: format(parsed, DATE_DISPLAY),
    year,
    month,
    day,
    uri: `${year}/${month}/${day}`,
    today: {
      date: today,
      uri: format(today, DATE_URI),
    },
  };
};
