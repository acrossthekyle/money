'use client';

import { LoaderCircle, Pen, Trash } from 'lucide-react';

import tw, { cs } from '@/styles';
import type { Dateable, Holding } from '@/types'
import { Ui } from '@/ui';

import { useModel } from './model';

type Props = {
  date: Dateable;
  holding: Holding;
};

export default function Header({ date, holding }: Props) {
  const {
    handleOnDelete,
    handleOnUpdate,
    isPending,
  } = useModel(date, holding);

  return (
    <Ui.Components.Card holding={holding} isHeading zone={date.zone}>
      <nav aria-label="supplementary navigation" className={styles.options}>
        <button
          className={styles.option}
          disabled={isPending}
          onClick={handleOnUpdate}
          type="button"
        >
          <Pen className={styles.icon} /> Update
        </button>
        <button
          className={styles.option}
          disabled={isPending}
          onClick={handleOnDelete}
          type="button"
        >
          {isPending ? (
            <LoaderCircle className={cs(styles.icon, styles.spin)} />
          ) : (
            <Trash className={styles.icon} />
          )}
          Delete
        </button>
      </nav>
    </Ui.Components.Card>
  );
};

const styles = tw({
  options: `
    flex gap-4
    w-full
  `,
  option: `
    border border-current/12
    bg-white dark:bg-(--foreground)/6
    text-black dark:text-white
    rounded-lg
    flex items-center justify-center gap-4
    uppercase
    text-sm
    p-2 px-4
    w-full

    motion-safe:duration-300

    hover:bg-(--foreground)/100
    hover:text-(--background)

    md:text-tiny
  `,
  icon: `
    w-4 h-4
    stroke-2

    md:w-3
    md:h-3
  `,
  spin: `
    animate-spin
  `,
})
