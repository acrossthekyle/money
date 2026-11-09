import { db } from '@/db';
import type { Setting } from '@/types';

type Return = {
  pinned: string;
  zone: string;
};

export async function get(): Promise<Return> {
  const records = await db.read('settings') as Setting[];

  const pinned = records.find(setting => setting.id === 'pinned')?.value || '';
  const zone = records.find(setting => setting.id === 'timezone')?.value || 'UTC';

  return {
    pinned,
    zone,
  };
}
