import { OVERVIEWS } from '@/constants';
import { db } from '@/db';
import type { Preference } from '@/types';

type Return = {
  saved: string;
};

export async function preferences(view: string | null): Promise<Return> {
  const records = await db.read('preferences') as Preference[];

  const saved = records.find(preference => preference.id === 'saved_view');

  let realizedView = view === null ? OVERVIEWS.netWorth : view;

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
