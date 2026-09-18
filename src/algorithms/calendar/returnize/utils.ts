export function calculateReturnAmount(rate: number, daysInMonth) {
  const sum = daysInMonth.reduce(
    (accumulator, day) => accumulator + day.balance,
    0,
  );

  const average = sum / daysInMonth.length;

  return Number((average * rate).toFixed(2));
};
