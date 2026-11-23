import type { Holding, Syncable } from '@/types';
import { db } from '@/db';

type Return = {
  unsynced: Syncable[];
};

export async function synchronize(
  syncable: Syncable[],
  holdings: Holding[],
): Promise<Return> {
  const synced: Holding[] = [];
  const unsynced: Syncable[] = [];

  syncable.forEach((item: Syncable) => {
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
    unsynced,
  };
};
