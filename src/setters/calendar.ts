import { calendar } from '@/algorithms/calendar';
import { db } from '@/db';
import { get as getBudgets } from '@/getters/budgets';
import { get as getHoldings } from '@/getters/holdings';
import { get as getSettings } from '@/getters/settings';

export async function set(id: string | null) {
  const { holdings } = await getHoldings();
  const { budgets } = await getBudgets();
  const { zone } = await getSettings();

  const value = await calendar(holdings, budgets, zone, id);

  await db.write('calendar', {
    id: 'calendar',
    value,
  });
};
