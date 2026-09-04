import type { Record } from '@/types';

import { storage } from './storage';

export async function erase(table: string, id: string) {
  const db = await storage();

  const existing = await db.read(table) as Record[];

  if (existing.length) {
    const updated = existing.filter((item: Record) => item.id !== id);

    await db.write(table, updated);
  }
};
