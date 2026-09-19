import { createBudgetsMap, createDaysMap, updateRunningBalance } from './utils';

export function budgetize(
  calendar,
  data,
  balance,
) {
  const budgets = createBudgetsMap(data);
  const days = createDaysMap(calendar);

  let runningBalance = balance;

  Array.from(days.keys()).sort().forEach((key) => {
    const dayOfMonth = days.get(key);

    const matches = budgets.get(key) || [];
    const debits = [];
    const credits = [];

    matches.forEach((match) => {
      dayOfMonth.budgets.push(match.budget);

      const { amount, income, expense } = updateRunningBalance(
        match.budget.type,
        match.holdingType,
        match.isTransfer,
        match.transfereeHoldingType,
        match.transfereeType,
        runningBalance,
        match.budget.amount,
      );

      runningBalance = amount;

      if (income) {
        credits.push({
          budget: match.budget.id,
          amount: income,
        });
      }

      if (expense) {
        debits.push({
          budget: match.budget.id,
          amount: expense,
        });
      }
    });

    dayOfMonth.balance = Number(runningBalance.toFixed(2));

    if (!dayOfMonth.debits) {
      dayOfMonth.debits = [];
    }

    if (!dayOfMonth.credits) {
      dayOfMonth.credits = [];
    }

    dayOfMonth.debits.push(...debits);
    dayOfMonth.credits.push(...credits);
  });

  return calendar;
};
