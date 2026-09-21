import { db } from '@/db';
import type { Preference } from '@/types';

type Return = {
  id: string | null;
};

export async function get(): Promise<Return> {
  const records = await db.read('preferences') as Preference[];

  const id = records.find(preference => preference.id === 'holding')?.value || null;

  return {
    id,
  };
}
