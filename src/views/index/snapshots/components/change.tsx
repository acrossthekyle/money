import tw from '@/styles';

enum Direction {
  Increase = 'increase',
  Decrease = 'decrease',
  None = 'none',
};

type Return = {
  percentage: number;
  formatted: string;
  direction: Direction;
};

function calculateChange(
  original: number,
  current: number,
): Return {
  if (original === 0 && current === 0) {
    return {
      percentage: 0,
      formatted: '0.00%',
      direction: Direction.None,
    };
  }

  if (original === 0) {
    const isPositive = current > 0;

    return {
      percentage: isPositive ? Infinity : -Infinity,
      formatted: isPositive ? '+•.••%' : '-•.••%',
      direction: isPositive ? Direction.Increase : Direction.Decrease,
    };
  }

  const difference = current - original;
  const percentage = (difference / Math.abs(original)) * 100;

  let direction = Direction.None;

  if (percentage > 0) {
    direction = Direction.Increase;
  } else if (percentage < 0) {
    direction = Direction.Decrease;
  }

  return {
    percentage,
    formatted: `${percentage > 0 ? '+' : ''}${percentage.toFixed(2)}%`,
    direction,
  };
}

type Props = {
  current: number;
  next: number;
};

export default function Change({ current, next }: Props) {
  const result = calculateChange(current, next);

  return (
    <span className={styles.container}>
      <span
        className={
          [
            styles.amount,
            result.direction === 'increase' && styles.positive,
            result.direction === 'decrease' && styles.negative,
          ].filter(Boolean).join(' ')
        }
      >
        {result.formatted}
      </span>
      <span className={styles.footnote}>
        Projected next 30 days
      </span>
    </span>
  );
};

const styles = tw({
  container: `
    mt-2
    flex flex-col gap-0.5
  `,
  amount: `
    text-xs
    font-mono
  `,
  footnote: `
    text-xtiny
    uppercase
    font-medium font-mono
    text-current/50
    tracking-wide
  `,
  positive: `
    text-green-900 dark:text-green-200
  `,
  negative: `
    text-red-600 dark:text-red-300
  `,
});
