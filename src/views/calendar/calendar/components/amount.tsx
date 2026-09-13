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
    absolute left-1 right-1
    font-mono
    text-xtiny
    h-2
    rounded-full

    md:left-2
    md:w-2
    lg:left-auto
    lg:w-auto
    lg:h-auto
    lg:relative
    lg:text-tiny
    xl:text-xs
  `,
  credit: `
    bg-teal-400
    text-teal-400

    lg:bg-transparent
  `,
  debit: `
    bg-red-400
    text-red-400

    lg:bg-transparent
  `,
  number: `
    hidden

    lg:block
  `,
});
