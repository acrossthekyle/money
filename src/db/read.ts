import type { Record } from '@/types';

import { storage } from './storage';

export async function read(table: string, id?: string): Promise<Record | Record[]> {
  const db = await storage();

  const result = await db.read(table, id);

  return result;
};
