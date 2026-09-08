import tw from '@/styles';
import { formatNumber } from '@/utils';

type Props = {
  isNegative?: boolean;
  isPositive?: boolean;
};

export default function Amount({
  children,
  isNegative = false,
  isPositive = false,
}: React.PropsWithChildren<Props>) {
  return (
    <span
      className={[
        styles.container,
        isNegative && styles.negative,
        isPositive && styles.positive,
      ].filter(Boolean).join(' ')}
    >
      {isNegative ? '-' : ''}${formatNumber(Number(children as string))}
    </span>
  );
};

const styles = tw({
  container: `
    font-light
    text-2xl
  `,
  negative: `
    text-red-600 dark:text-red-300
  `,
  positive: `
    text-green-900 dark:text-green-200
  `,
});
