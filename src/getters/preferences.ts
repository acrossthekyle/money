import { db } from '@/db';
import type { Holding, Preference } from '@/types';

type Return = {
  saved: string;
};

export async function get(
  view: string | null = null,
  holdings: Holding[] = [],
): Promise<Return> {
  const records = await db.read('preferences') as Preference[];

  const saved = records.find(preference => preference.id === 'holding')?.value || '';

  if (holdings.length === 0) {
    return {
      saved: '',
    };
  }

  let realizedView = view === null ? holdings[0].id : view;

  if (!!saved) {
    if (view === null) {
      realizedView = saved;
    } else if (view !== saved) {
      await db.write('preferences', {
        id: 'holding',
        value: view,
      });
    }
  } else {
    await db.write('preferences', {
      id: 'holding',
      value: realizedView,
    });
  }

  return {
    saved: realizedView,
  };
}
