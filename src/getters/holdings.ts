import { cacheLife, cacheTag } from 'next/cache';

import { db } from '@/db';
import type { Holding } from '@/types';

type Return = {
  holdings: Holding[];
};

export async function get(): Promise<Return> {
  'use cache: remote';

  cacheLife('hours');
  cacheTag('holdings');

  const holdings = await db.read('holdings') as Holding[];

  return {
    holdings,
  };
}
