'use client';

import { Pen, Trash } from 'lucide-react';

import { CTA_RADIUS } from '@/constants';
import tw from '@/styles';
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
          <Pen className={styles.icon} />
          Update
        </button>
        <button
          className={styles.option}
          disabled={isPending}
          onClick={handleOnDelete}
          type="button"
        >
          <Trash className={styles.icon} />
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
    bg-(--background)
    text-(--foreground)
    flex items-center justify-center gap-4
    uppercase
    text-sm
    p-2 px-4
    w-full

    md:text-tiny

    ${CTA_RADIUS}
  `,
  icon: `
    size-3.25

    md:size-2.75
  `,
})
