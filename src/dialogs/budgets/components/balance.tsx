import tw, { cs } from '@/styles';
import { currency } from '@/utils';

type Props = {
  title: string;
  value: number;
};

export default function Balance({ title, value }: Props) {
  return (
    <p className={styles.container}>
      <span
        className={
          cs(
            styles.value,
            value > 0 && styles.positive,
            value < 0 && styles.negative,
          )
        }
      >
        {value < 0 ? '-' : ''}${currency(value)}
      </span>
      <span className={styles.title}>
        {title} Balance
      </span>
    </p>
  );
};

const styles = tw({
  container: `
    relative
    flex flex-col justify-center gap-1
    w-full
    text-center text-lg
    font-roboto

    md:text-base
  `,
  title: `
    uppercase
    text-tiny
  `,
  value: `
    flex gap-4 items-center justify-center
  `,
  negative: `
    text-red-400 dark:text-rose-400
  `,
  positive: `
    text-green-500 dark:text-lime-500
  `,
});
