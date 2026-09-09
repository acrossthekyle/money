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
        styles.highlighted,
      ].filter(Boolean).join(' ')}
    >
      {pad(getDate(parseISO(value)))}
    </span>
  );
};

const styles = tw({
  container: `
    absolute top-1.75 right-2.25
    text-tiny
    font-black

    pointer-events-none

    xl:text-xs
  `,
  faded: `
    opacity-33
  `,
  highlighted: `
    before:absolute
    before:z-0
    before:top-1/2
    before:left-1/2
    before:-translate-x-1/2
    before:-translate-y-1/2
    before:rounded-sm
    before:w-5
    before:h-4
    before:bg-(--foreground)/20
    before:dark:bg-slate-700

    md:before:w-5.5
    md:before:h-4
    xl:before:w-6.25
    xl:before:h-5
  `,
});
