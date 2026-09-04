import { db } from '@/db';
import type { Holding } from '@/types';

type Return = {
  holdings: Holding[];
};

export async function all(): Promise<Return> {
  const holdings = await db.read('holdings') as Holding[];

  return {
    holdings,
  };
}
