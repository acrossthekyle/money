import type { Holding, Syncable } from '@/types';
import { db } from '@/db';

type Return = {
  synced: Holding[];
  unsynced: Syncable[];
};

export async function synchronize(
  syncable: Syncable[],
  holdings: Holding[],
): Promise<Return> {
  const synced: Holding[] = [];
  const unsynced: Syncable[] = [];

  syncable
    .filter((item: Syncable) => {
      return [
        'savings',
        'checking',
        'credit card',
      ].some(type => item.type.includes(type));
    })
    .forEach((item: Syncable) => {
      const found = holdings.find(holding => (holding.plaid || '') === item.id);

      if (found) {
        synced.push({
          ...found,
          balance: String(item.balance),
        });
      } else {
        unsynced.push(item);
      }
    });

  if (synced.length > 0) {
    await db.writeAll('holdings', synced);
  }

  return {
    synced,
    unsynced,
  };
};
