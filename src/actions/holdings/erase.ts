'use server';

import { db } from '@/db';

export async function erase(id: string): Promise<void> {
  await db.erase('holdings', id);
};
