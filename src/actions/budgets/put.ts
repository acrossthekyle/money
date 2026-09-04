'use server';

import { v4 as uuidv4 } from 'uuid';
import * as z from 'zod';

import { db } from '@/db';
import type { Budget, BudgetFormState } from '@/types';

import { createBudgetIterations } from '../utils';

function balancize(raw: string) {
  const cleaned = raw.replace(/,/g, '').replace('$', '');
  const number = parseFloat(cleaned);

  return number.toFixed(2);
};

const Form = z.object({
  parent: z.string(),
  date: z.string(),
  name: z.string(),
  amount: z.string(),
  category: z.enum([
    'subscription',
    'food',
    'income',
    'transfer',
    'utility',
    'health',
    'insurance',
    'taxes',
    'payment',
  ]),
  type: z.enum(['debit', 'credit']),
  transferee: z.string().nullable().optional(),
  start: z.string(),
  end: z.string().nullable().optional(),
  schedule: z.enum([
    'once',
    'daily',
    'bi-daily',
    'weekly',
    'bi-weekly',
    'monthly',
    'bi-monthly',
    'quarterly',
    'bi-annually',
    'yearly',
  ]),
  notes: z.string().nullable().optional(),
  update: z.enum(['all', 'this', 'prospective', 'future', 'none']),
  erase: z.enum(['true', 'false']),
  purge: z.enum(['true', 'false']),
});

export async function put(
  budget: Budget | null,
  state: BudgetFormState,
  formData: FormData,
): Promise<BudgetFormState> {
  const validated = Form.safeParse({
    parent: formData.get('parent'),
    date: formData.get('date'),
    name: formData.get('name'),
    amount: formData.get('amount'),
    category: formData.get('category'),
    type: formData.get('type'),
    transferee: formData.get('transferee'),
    start: formData.get('start'),
    end: formData.get('end'),
    schedule: formData.get('schedule'),
    notes: formData.get('notes'),
    update: formData.get('update'),
    erase: formData.get('erase'),
    purge: formData.get('purge'),
  });

  if (!validated.success) {
    const rawInput = Object.fromEntries(formData.entries());

    const errors = z.flattenError(validated.error).fieldErrors;

    return {
      data: {
        ...state?.data,
        ...rawInput,
      } as any,
      errors: [
        {
          field: 'name',
          error: errors?.name?.[0] || '',
        },
        {
          field: 'amount',
          error: errors?.amount?.[0] || '',
        },
        {
          field: 'category',
          error: errors?.category?.[0] || '',
        },
        {
          field: 'type',
          error: errors?.type?.[0] || '',
        },
        {
          field: 'start',
          error: errors?.start?.[0] || '',
        },
        {
          field: 'schedule',
          error: errors?.schedule?.[0] || '',
        },
      ].filter(item => !!item.error),
      hasFailed: true,
      isSuccessful: false,
      message: 'Validation failed',
    };
  }

  const writeable = {
    ...validated.data,
    amount: balancize(validated.data.amount),
    transferee: validated.data.transferee === null ? '' : validated.data.transferee,
    date: undefined,
    update: undefined,
    erase: undefined,
    purge: undefined,
  };

  const returnable = {
    ...validated.data,
    amount: balancize(validated.data.amount),
    transferee: validated.data.transferee === null ? '' : validated.data.transferee,
  };

  if (budget === null) {
    await db.write('budgets', {
      ...writeable,
      id: uuidv4(),
      omissions: [],
    });

    return {
      data: returnable,
      hasFailed: false,
      isSuccessful: true,
      message: 'Budget successfully created',
    };
  }

  writeable.id = budget.id;
  writeable.omissions = budget.omissions;
  writeable.parent = budget.parent;

  if (validated.data.erase === 'true') {
    if (budget.schedule === 'once') {
      await db.erase('budgets', budget.id);
    } else {
      await db.write('budgets', {
        ...budget,
        omissions: [
          ...budget.omissions,
          validated.data.date,
        ],
      });
    }

    return {
      data: returnable,
      hasFailed: false,
      isSuccessful: true,
      message: `Budget on ${validated.data.date} successfully deleted`,
    };
  }

  if (validated.data.purge === 'true') {
    await db.erase('budgets', budget.id);

    return {
      data: returnable,
      hasFailed: false,
      isSuccessful: true,
      message: 'Budget successfully deleted',
    };
  }

  if (validated.data.update === 'none' || validated.data.update === 'all') {
    await db.write('budgets', writeable);

    return {
      data: returnable,
      hasFailed: false,
      isSuccessful: true,
      message: `Entire budget successfully updated`,
    };
  }

  const iterations = createBudgetIterations(budget);

  if (validated.data.update === 'this') {
    const thisDateIndex = iterations.findIndex(iteration => iteration === returnable.date);

    if (thisDateIndex >= 0) {
      const past = iterations.slice(0, thisDateIndex);
      const current = [returnable.date];
      const future = iterations.slice(thisDateIndex + 1);

      const updates = [];

      if (past.length > 0) {
        updates.push({
          ...budget,
          id: uuidv4(),
          start: past[0],
          end: past[past.length - 1],
        });
      }

      updates.push({
        ...writeable,
        id: iterations.length === 1 ? writeable.id : uuidv4(),
        start: current[0],
        end: current[0],
        schedule: 'once',
        omissions: budget.omissions,
      });

      if (future.length > 0) {
        updates.push({
          ...budget,
          start: future[0],
        });
      }

      await db.writeAll('budgets', updates);

      return {
        data: returnable,
        hasFailed: false,
        isSuccessful: true,
        message: `Budget instance successfully updated`,
      };
    }
  }

  if (validated.data.update === 'prospective') {
    const thisDateIndex = iterations.findIndex(iteration => iteration === returnable.date);

    if (thisDateIndex >= 0) {
      const past = iterations.slice(0, thisDateIndex);
      const current = [returnable.date];

      const updates = [];

      if (past.length > 0) {
        updates.push({
          ...budget,
          id: uuidv4(),
          start: past[0],
          end: past[past.length - 1],
        });
      }

      updates.push({
        ...writeable,
        start: current[0],
        omissions: budget.omissions,
      });

      await db.writeAll('budgets', updates);

      return {
        data: returnable,
        hasFailed: false,
        isSuccessful: true,
        message: `All current and future budget instances successfully updated`,
      };
    }
  }

  if (validated.data.update === 'future') {
    const thisDateIndex = iterations.findIndex(iteration => iteration === returnable.date);

    if (thisDateIndex >= 0) {
      const past = iterations.slice(0, thisDateIndex + 1);
      const future = iterations.slice(thisDateIndex + 1);

      const updates = [];

      if (past.length > 0) {
        updates.push({
          ...budget,
          id: uuidv4(),
          start: past[0],
          end: past[past.length - 1],
        });
      }

      if (future.length > 0) {
        updates.push({
          ...writeable,
          start: future[0],
        });
      }

      await db.writeAll('budgets', updates);

      return {
        data: returnable,
        hasFailed: false,
        isSuccessful: true,
        message: `All future budget instances successfully updated`,
      };
    }
  }

  return {
    data: returnable,
    hasFailed: false,
    isSuccessful: true,
    message: 'No action taken',
  };
};
