import { db } from '@/db';
import type { Holding, Preference } from '@/types';

type Return = {
  saved: string;
};

export async function preferences(
  view: string | null,
  holdings: Holding[],
): Promise<Return> {
  const records = await db.read('preferences') as Preference[];

  const saved = records.find(preference => preference.id === 'saved_view');

  let realizedView = view === null ? holdings[0].id : view;

  if (saved) {
    if (view === null) {
      realizedView = saved.value;
    } else if (view !== saved.value) {
      await db.write('preferences', {
        ...saved,
        value: view,
      });
    }
  } else {
    await db.write('preferences', {
      id: 'saved_view',
      value: realizedView,
    });
  }

  return {
    saved: realizedView,
  };
}
