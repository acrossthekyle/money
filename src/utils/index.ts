import { TZDate } from '@date-fns/tz';
import { format, getYear, getMonth, getDate, parseISO } from 'date-fns';

import { DATE_DISPLAY, DATE_URI } from '@/constants';
import type { Dateable, Today } from '@/types';

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

export function image(id: string, folder: string, extension: string = 'jpg') {
  return [
    'https://ik.imagekit.io/acrossthekyle/uploads',
    folder,
    `${id}.${extension}`,
  ].filter(Boolean).join('/');
};

export function dateable(
  zone: string,
  year?: string,
  month?: string,
  day?: string,
): Dateable | Today {
  const today = date(zone);

  if (!year && !month && !day) {
    return {
      year: getYear(today),
      month: pad(getMonth(today) + 1),
      day: pad(getDate(today)),
    } as Today;
  }

  const parsed = parseISO(`${year}-${month}-${day}`);

  return {
    date: parsed,
    iso: `${year}-${month}-${day}`,
    display: format(parsed, DATE_DISPLAY),
    year,
    month,
    day,
    uri: `${year}/${month}/${day}`,
    weekdayFull: format(parsed, 'iiii'),
    weekdayShort: format(parsed, 'iii'),
    today: {
      date: today,
      uri: format(today, DATE_URI),
    },
  } as Dateable;
}
