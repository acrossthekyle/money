import { db } from '@/db';
import type { Setting } from '@/types';

type Return = {
  zone: string;
};

export async function get(): Promise<Return> {
  const records = await db.read('settings') as Setting[];

  const zone = records.find(setting => setting.id === 'timezone')?.value || 'UTC';

  return {
    zone,
  };
}
