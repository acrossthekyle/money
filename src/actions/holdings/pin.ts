'use server';

import { db } from '@/db';
import { get as getSettings } from '@/getters/settings';

export async function pin(
  id: string,
): Promise<null | string> {
  const { pinned } = await getSettings();

  const result = pinned === id ? '' : id;

  await db.write('settings', {
    id: 'pinned',
    value: result,
  });

  return result;
};
