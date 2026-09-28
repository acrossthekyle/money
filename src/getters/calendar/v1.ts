import { db } from '@/db';
import type { Calendar, CalendarYear } from '@/types';

type Return = {
  calendar: CalendarYear[];
};

export async function get(): Promise<Return> {
  const records = await db.read('calendar') as Calendar[];

  return {
    calendar: records.length > 0 ? records[0].value : [],
  };
}
