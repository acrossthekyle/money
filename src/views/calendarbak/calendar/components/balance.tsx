import tw from '@/styles';
import { formatNumber } from '@/utils';

type Props = {
  isFaded?: boolean;
  value: number;
};

export default function Balance({ isFaded, value }: Props) {
  const isNegative = value < 0;

  return (
    <span
      className={[
        styles.container,
        isNegative && styles.negative,
        isFaded && styles.faded,
      ].filter(Boolean).join(' ')}
    >
      <span className={styles.expanded}>${formatNumber(value)}</span>
      <span className={styles.compact}>${formatNumber(value, true)}</span>
    </span>
  );
};

const styles = tw({
  container: `
    hidden
    absolute top-1.5 left-2
    text-tiny
    font-mono
    pointer-events-none

    md:block
    md:text-tiny
    xl:text-xs
  `,
  negative: `
    text-red-400
  `,
  faded: `
    opacity-33
    pointer-events-none
  `,
  expanded: `
    hidden

    lg:block
  `,
  compact: `
    block

    lg:hidden
  `,
});
