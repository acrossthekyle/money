import { calculateReturnAmount } from './utils';

export function returnize(calendar, rate: string) {
  const parsed = parseFloat(rate);
  const hasValidRate = !isNaN(parsed) && parsed !== 0;
  const monthlyRate = hasValidRate ? Math.pow(1 + (parsed / 100), 1 / 12) - 1 : 0;

  let runningAdjustment = 0;

  calendar.forEach((year) => {
    year.months.forEach((month) => {
      const daysInMonth = month.days.filter(day => day.isInMonth);

      if (daysInMonth.length === 0) {
        return;
      }

      daysInMonth.forEach((day) => {
        day.balance = Number((day.balance + runningAdjustment).toFixed(2));
      });

      const amount = hasValidRate
        ? calculateReturnAmount(monthlyRate, daysInMonth)
        : 0;

      const lastDayOfMonth = daysInMonth[daysInMonth.length - 1];

      lastDayOfMonth.return = amount;
      lastDayOfMonth.balance = Number((lastDayOfMonth.balance + amount).toFixed(2));

      runningAdjustment += amount;
    });
  });

  return calendar;
};
