import tw from '@/styles';
import { formatNumber } from '@/utils';

type Props = {
  type: string;
  value: string;
};

export default function Amount({ type, value }: Props) {
  return (
    <span
      className={[
        styles.container,
        type === 'credit' ? styles.credit : styles.debit,
      ].filter(Boolean).join(' ')}
    >
      <span className={styles.number}>${formatNumber(Number(value))}</span>
    </span>
  );
};

const styles = tw({
  container: `
    absolute left-0
    font-mono
    text-tiny
    w-2 h-2
    rounded-full

    md:left-2
    xl:left-auto
    xl:w-auto
    xl:h-auto
    xl:relative
    xl:text-xs
  `,
  credit: `
    bg-teal-400
    text-teal-400

    xl:bg-transparent
  `,
  debit: `
    bg-red-400
    text-red-400

    xl:bg-transparent
  `,
  number: `
    hidden

    xl:block
  `,
});
