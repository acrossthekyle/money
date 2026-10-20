import tw, { cs } from '@/styles';
import { currency } from '@/utils';

type Props = {
  isNegative: boolean;
  value: number;
};

export default function Amount({ isNegative, value }: Props) {
  const parts = currency(String(value)).split('.');
  const dollars = parts[0];
  const cents = parts[1];

  return (
    <span className={styles.container}>
      <span
        className={
          cs(
            styles.amount,
            isNegative && styles.negative,
            !isNegative && styles.positive,
          )
        }
      >
        <span className={styles.sign}>{isNegative ? '-' : '+'}</span>
        ${dollars}
        <span className={styles.cents}>
          .{cents}
        </span>
      </span>
    </span>
  );
};

const styles = tw({
  container: `
    relative
    flex flex-col justify-center gap-1
    w-full
  `,
  amount: `
    flex justify-center
    text-center text-6xl
    font-extralight dark:font-thin

    md:text-5xl
  `,
  sign: `
    pr-2
    text-3xl
    font-extralight
  `,
  cents: `
    pl-1
    text-xl
    font-light
  `,
  negative: `
    text-red-400 dark:text-rose-400
  `,
  positive: `
    text-green-500 dark:text-lime-500
  `,
});
