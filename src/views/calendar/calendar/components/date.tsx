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
        isHighlighted && styles.today,
      ].filter(Boolean).join(' ')}
    >
      <span className={styles.text}>{pad(getDate(parseISO(value)))}</span>
    </span>
  );
};

const styles = tw({
  container: `
    absolute top-1.5 right-2.5
    text-tiny text-(--foreground)
    font-mono font-black
    pointer-events-none

    before:absolute
    before:z-0
    before:top-1/2
    before:left-1/2
    before:-translate-x-1/2
    before:-translate-y-1/2
    before:rounded-sm
    before:w-5.5
    before:h-4

    xl:before:w-6.75
    xl:before:h-5
    xl:text-xs
  `,
  text: `
    relative z-1
  `,
  faded: `
    opacity-33
  `,
  today: `
    !text-(--background)

    md:before:bg-(--foreground)
    md:before:dark:bg-slate-700
    before:!bg-(--foreground)
  `,
});
