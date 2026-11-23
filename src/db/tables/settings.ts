import type { Generic } from '@/types';

import { read } from '../read';

type Return = {
  pinned: string;
  synced: string | null;
  token: string | null;
  zone: string;
};

export async function settings(): Promise<Return> {
  const records = await read('settings') as Generic[];

  const pinned = records.find((item: Generic) => item.id === 'pinned')?.value || '';
  const zone = records.find((item: Generic) => item.id === 'timezone')?.value || 'UTC';
  const token = records.find((item: Generic) => item.id === 'plaid')?.value || null;
  const synced = records.find((item: Generic) => item.id === 'synced')?.value || null;

  return {
    pinned,
    synced,
    token,
    zone,
  };
}
