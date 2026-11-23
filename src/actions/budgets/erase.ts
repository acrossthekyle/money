'use server';

import { db } from '@/db';
import type {
  Budget,
  BudgetEraseActionInput,
  BudgetEraseActionResponse,
} from '@/types';

export async function erase(
  state: BudgetEraseActionResponse | null,
  input: BudgetEraseActionInput,
): Promise<BudgetEraseActionResponse> {
  const { budgets } = await db.tables.budgets();

  const budget = budgets.find((item: Budget) => item.id === input.id);

  if (!budget) {
    return {
      budget: {} as Budget,
      isSuccess: false,
      wasPurged: false,
    };
  }

  if (input.isPurge) {
    await db.erase('budgets', input.id);

    return {
      budget,
      isSuccess: true,
      wasPurged: true,
    };
  }

  const result = {
    ...budget,
    omissions: [
      ...(budget.omissions || []),
      ...(input.iso ? input.iso : ''),
    ],
  };

  await db.write('budgets', result);

  return {
    budget: result,
    isSuccess: true,
    wasPurged: false,
  };
};
