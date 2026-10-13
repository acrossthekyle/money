'use server';

import { revalidatePath } from 'next/cache';

import { db } from '@/db';

export async function erase(id: string) {
  await db.erase('holdings', id);

  revalidatePath('/');
};
