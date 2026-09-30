import { get as getBudgets } from '@/getters/budgets';
import { get as getHoldings } from '@/getters/holdings';

export async function get() {
  const { budgets } = await getBudgets();
  const { holdings } = await getHoldings();

  return {
    budgets: budgets.map((budget) => ({
      ...budget,
      parent: holdings.find(item => item.id === budget.parent)?.name || '',
    })),
  };
};
