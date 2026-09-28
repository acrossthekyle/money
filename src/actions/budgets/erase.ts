'use server';

import { db } from '@/db';
import type { Budget, BudgetFormState } from '@/types';

export async function erase(
  budget: Budget,
  state: BudgetFormState,
  formData: FormData,
): Promise<BudgetFormState> {
  if (formData.get('erase') === 'true') {
    if (budget.schedule === 'once') {
      await db.erase('budgets', budget.id);
    } else {
      await db.write('budgets', {
        ...budget,
        omissions: [
          ...budget.omissions,
          formData.get('date') as string,
        ],
      });
    }

    return {
      data: budget,
      hasFailed: false,
      isSuccessful: true,
      message: `Budget on ${formData.get('date')} successfully deleted`,
    };
  }

  if (formData.get('purge') === 'true') {
    await db.erase('budgets', budget.id);

    return {
      data: budget,
      hasFailed: false,
      isSuccessful: true,
      message: 'Budget successfully deleted',
    };
  }

  return {
    data: budget,
    hasFailed: false,
    isSuccessful: true,
    message: 'No action taken',
  };
};
