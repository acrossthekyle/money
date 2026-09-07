import { getDate, parseISO } from 'date-fns';

import tw from '@/styles';
import { pad } from '@/utils';

type Props = {
  isFaded: boolean;
  isHighlighted: boolean;
  value: string;
};

export default function Date({ isFaded, isHighlighted, value }: Props) {
  return (
    <span
      className={[
        styles.container,
        isFaded && styles.faded,
        isHighlighted && styles.highlighted,
      ].filter(Boolean).join(' ')}
    >
      {pad(getDate(parseISO(value)))}
    </span>
  );
};

const styles = tw({
  container: `
    absolute top-2 right-2
    bg-(--background)
    border border-(--foreground)/22.5
    p-1.5
    rounded-sm
    leading-[1]
    text-tiny
    font-bold
    pointer-events-none
  `,
  faded: `
    opacity-33
  `,
  highlighted: `
    bg-slate-200 dark:bg-slate-700
  `,
});
