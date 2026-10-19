export function calculateChange(previous: number, current: number): number {
  if (previous === 0) {
    if (current === 0) {
      return 0;
    }

    return current > 0 ? 100 : -100;
  }

  const change = current - previous;

  let percentageChange = (change / Math.abs(previous)) * 100;

  const MAX_CAP = 200;

  if (percentageChange > MAX_CAP) {
    percentageChange = MAX_CAP;
  }

  if (percentageChange < -MAX_CAP) {
    percentageChange = -MAX_CAP;
  }

  return Number(percentageChange.toFixed(2));
};
