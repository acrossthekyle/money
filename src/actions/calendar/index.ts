import { db } from '@/db';
import type { Budget, Day, Holding, Preference } from '@/types';

import { createBudgetIterations } from '../utils';

import type { RawDay, RawBudget } from './types';
import { displayType } from './utils/type';
import { createDays } from './utils/dates';
import { addToCalendar } from './utils/calendar';
import { assignRealized } from './utils/realized';

type Return = {
  days: Array<Day[]>;
  saved: string;
};

async function perHolding(
  holdings: Holding[],
  holding: Holding,
  budgets: Budget[],
  selectedMonth: string,
  selectedYear: string,
): Promise<RawDay[]> {
  const startingBalance = holding.type === 'credit_card' ? -Number(holding.balance) : Number(holding.balance);

  const data = budgets.filter((budget: Budget) => {
    return budget.parent === holding.id || budget.transferee === holding.id;
  }).map((budget: Budget) => {
    const iterations = createBudgetIterations(budget);

    const transfereeHolding = holdings.find((item: Holding) => {
      if (budget.transferee !== '') {
        return budget.transferee === item.id;
      }

      return false;
    });

    const result = {
      name: budget.name,
      id: budget.id,
      amount: budget.amount,
      type: budget.type,
      iterations,
      isTransfer: budget.transferee !== '',
      holdingType: holding.type,
      transfereeHoldingType: transfereeHolding?.type,
      transfereeType: budget.type === 'debit' ? 'receiver' : 'sender',
      isBudget: true,
    };

    return {
      ...result,
      displayType: displayType(holding.type, result as RawBudget),
    };
  });

  const days = createDays(
    holding.type,
    startingBalance,
    data,
    selectedMonth,
    selectedYear,
    holding.interest,
  );

  return days;
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
