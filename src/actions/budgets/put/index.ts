'use server';

import { v4 as uuidv4 } from 'uuid';

import { db } from '@/db';
import type {
  Budget,
  BudgetPutActionInput,
  BudgetPutActionResponse,
} from '@/types';
import { createBudgetIterations } from '@/utils/budgets';

import { balancize } from '../../utils';

import { validator } from './validator';

export async function put(
  state: BudgetPutActionResponse | null,
  input: BudgetPutActionInput,
): Promise<BudgetPutActionResponse> {
  const validated = validator.safeParse({
    name: input.data.name,
    amount: input.data.amount,
    category: input.data.category,
    type: input.data.type,
    transferee: input.data.transferee,
    start: input.data.start,
    end: input.data.end,
    schedule: input.data.schedule,
  });

  if (!validated.success) {
    return {
      budgets: [],
      isSuccess: false,
      message: 'One or more fields are incorrect or missing',
    };
  }

  const result: Budget = {
    ...validated.data,
    ...{
      id: input.id || uuidv4(),
      amount: balancize(String(Math.abs(Number(validated.data.amount)))),
      transferee: validated.data.transferee || '',
      end: validated.data.end || '',
      parent: input.holding,
      omissions: [],
    },
  };

  if (input.id === null) {
    await db.write('budgets', result);

    return {
      budgets: [result],
      isSuccess: true,
      message: 'Success',
    };
  }

  const { budgets } = await db.tables.budgets();
  const { zone } = await db.tables.settings();

  const budget = budgets.find((item: Budget) => item.id === input.id);

  if (!budget) {
    return {
      budgets: [],
      isSuccess: false,
      message: 'Transaction does not exist',
    };
  }

  result.omissions = budget.omissions;

  if (input.applysTo === 'none' || input.applysTo === 'all') {
    await db.write('budgets', result);

    return {
      budgets: [result],
      isSuccess: true,
      message: 'Success',
    };
  }

  const iterations = createBudgetIterations(budget, zone);
  const dateIndex = iterations.findIndex(item => item === input.iso);

  if (input.applysTo === 'this') {
    if (dateIndex >= 0 && input.iso) {
      const past = iterations.slice(0, dateIndex);
      const current = [input.iso];
      const future = iterations.slice(dateIndex + 1);

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
        ...result,
        id: iterations.length === 1 ? result.id : uuidv4(),
        start: current[0],
        end: current[0],
        schedule: 'once',
      });

      if (future.length > 0) {
        updates.push({
          ...budget,
          start: future[0],
        });
      }

      await db.writeAll('budgets', updates);

      return {
        budgets: updates,
        isSuccess: true,
        message: 'Success',
      };
    }

    return {
      budgets: [],
      isSuccess: false,
      message: 'Date not found',
    };
  }

  if (input.applysTo === 'prospective') {
    if (dateIndex >= 0 && input.iso) {
      const past = iterations.slice(0, dateIndex);
      const current = [input.iso];

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
        ...result,
        start: current[0],
      });

      await db.writeAll('budgets', updates);

      return {
        budgets: updates,
        isSuccess: true,
        message: 'Success',
      };
    }

    return {
      budgets: [],
      isSuccess: false,
      message: 'Date not found',
    };
  }

  if (input.applysTo === 'future') {
    if (dateIndex >= 0) {
      const past = iterations.slice(0, dateIndex + 1);
      const future = iterations.slice(dateIndex + 1);

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
          ...result,
          start: future[0],
        });
      }

      await db.writeAll('budgets', updates);

      return {
        budgets: updates,
        isSuccess: true,
        message: 'Success',
      };
    }

    return {
      budgets: [],
      isSuccess: false,
      message: 'Date not found',
    };
  }

  return {
    budgets: [],
    isSuccess: false,
    message: 'Nothing happened',
  };
};
