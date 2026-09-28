import { calendar } from '@/algorithms/calendar/v1';
import { db } from '@/db';
import { IS_CALENDAR_V2_ENABLED } from '@/features';
import { get as getBudgets } from '@/getters/budgets';
import { get as getHoldings } from '@/getters/holdings';
import { get as getSettings } from '@/getters/settings';

export async function set(id: string) {
  if (IS_CALENDAR_V2_ENABLED) {
    return;
  }

  const { holdings } = await getHoldings();
  const { budgets } = await getBudgets();
  const { zone } = await getSettings();

  const value = await calendar(holdings, budgets, zone, id);

  await db.write('calendar', {
    id: 'calendar',
    value,
  });
};
