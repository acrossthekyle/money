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

    matches.forEach((match) => {
      dayOfMonth.budgets.push(match.budget);

      runningBalance = updateRunningBalance(
        match.budget.type,
        match.holdingType,
        match.isTransfer,
        match.transfereeHoldingType,
        match.transfereeType,
        runningBalance,
        match.budget.amount,
      );
    });

    dayOfMonth.balance = Number(runningBalance.toFixed(2));
  });

  return calendar;
};
