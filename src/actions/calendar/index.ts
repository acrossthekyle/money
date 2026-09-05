import { db } from '@/db';
import type { Budget, Day, Holding, Preference } from '@/types';

import { perHolding } from './holdings';
import { addToCalendar } from './utils/calendar';
import { assignRealized } from './utils/realized';

type Return = {
  days: Array<Day[]>;
  saved: string;
};

export async function calendar(
  view: string | null,
  month: string,
  year: string,
): Promise<Return> {
  const holdings = await db.read('holdings') as Holding[];
  const budgets = await db.read('budgets') as Budget[];
  const preferences = await db.read('preferences') as Preference[];

  let realizedView = view === null ? 'overview_0' : view;

  const saved = preferences.find(preference => preference.id === 'saved_view');

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

  let calendar: Day[] = [];

  await assignRealized(realizedView, holdings).forEach(async (selectedHolding: string) => {
    const holding = holdings.find((holding: Holding) => selectedHolding === holding.id);

    if (holding) {
      const days = await perHolding(
        holdings,
        holding,
        budgets,
        month,
        year,
        false,
      );

      calendar = addToCalendar(calendar, days);
    }
  });

  const output = [];
  const chunkSize = 7;

  for (let i = 0; i < calendar.length; i += chunkSize) {
    const chunk = calendar.slice(i, i + chunkSize);

    output.push(chunk);
  }

  return {
    days: output,
    saved: realizedView,
  };
}
