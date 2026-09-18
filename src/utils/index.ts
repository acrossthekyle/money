import { TZDate } from '@date-fns/tz';

export function pad(index: number, padding: number = 2) {
  return String(index).padStart(padding, '0');
};

export function currency(value: number, isCompact?: boolean) {
  return new Intl.NumberFormat('en', {
    notation: isCompact ? 'compact' : 'standard',
    compactDisplay: isCompact ? 'short' : undefined,
    minimumFractionDigits: 2,
  }).format(Math.abs(value));
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
