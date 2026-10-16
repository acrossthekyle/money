import { TZDate } from '@date-fns/tz';
import {
  format,
  getYear,
  getMonth,
  getDate,
  getWeek,
  parseISO,
  isBefore,
  isFirstDayOfMonth,
  isThisMonth,
  isToday,
  isWeekend,
} from 'date-fns';

import { DATE_DISPLAY_ABBREVIATED, DATE_ISO, DATE_URI } from '@/constants';
import type { Dateable } from '@/types';

export function pad(index: number, padding: number = 2) {
  return String(index).padStart(padding, '0');
};

export function currency(value: number | string, isCompact?: boolean) {
  return new Intl.NumberFormat('en', {
    notation: isCompact ? 'compact' : 'standard',
    compactDisplay: isCompact ? 'short' : undefined,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(Number(value)));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function date(zone: string, ...params: any[]): TZDate {
  const rest = Array.isArray(params[0]) ? params[0] : params;

  while (rest.length > 0 && rest[rest.length - 1] === undefined) {
    rest.pop();
  }

  if (rest.length === 0 || rest[0] === undefined) {
    return new TZDate(Date.now(), zone);
  }

  return Reflect.construct(TZDate, [...rest, zone]);
};

export function dateable(
  zone: string,
  options?: {
    date?: Date;
    iso?: {
      year: string;
      month: string;
      day: string;
    };
  },
): Dateable {
  const today = date(zone);

  const construct = options?.iso
    ? parseISO(`${options?.iso?.year}-${options?.iso?.month}-${options?.iso?.day}`)
    : options?.date || today;

  const year = pad(getYear(construct));
  const month = pad(getMonth(construct) + 1);
  const day = pad(getDate(construct));

  const isNow = isToday(construct);

  return {
    date: construct,
    day,
    display: format(construct, DATE_DISPLAY_ABBREVIATED),
    isBeforeToday: isNow ? false : isBefore(construct, today),
    iso: `${year}-${month}-${day}`,
    isFirstOfMonth: isFirstDayOfMonth(construct),
    isInMonth: false,
    isThisMonth: isThisMonth(construct),
    isToday: isNow,
    isWeekend: isWeekend(construct),
    month,
    today: {
      date: today,
      day: pad(getDate(today)),
      display: format(today, DATE_DISPLAY_ABBREVIATED),
      iso: format(today, DATE_ISO),
      month: pad(getMonth(today) + 1),
      uri: format(today, DATE_URI),
      week: getWeek(today),
      year: pad(getYear(today)),
    },
    uri: `${year}/${month}/${day}`,
    week: getWeek(construct),
    weekdayFull: format(construct, 'iiii'),
    weekdayShort: format(construct, 'iii'),
    year,
    zone,
  };
}
