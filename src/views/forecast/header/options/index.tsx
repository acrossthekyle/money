'use client';

import { SlidersVertical, Pin, PinOff, Trash } from 'lucide-react';

import tw from '@/styles';
import type { Holding } from '@/types';

import { useModel } from './model';

type Props = {
  holding: Holding;
  pinned: string;
};

export default function Options({ holding, pinned }: Props) {
  const { handleOnDelete, handleOnEdit, handleOnPin } = useModel();

  const isPinned = pinned === holding.id;

  return (
    <nav aria-label="options" className={styles.container}>
      <button
        aria-label="pin/unpin portfolio item"
        className={styles.action}
        onClick={handleOnPin}
        title={isPinned ? 'Unset as default upon login' : 'Set as default upon login'}
        type="button"
      >
        {isPinned ? (
          <PinOff className={styles.icon} />
        ) : (
          <Pin className={styles.icon} />
        )}
      </button>
      <button
        className={styles.action}
        onClick={handleOnEdit}
        title="Edit"
        type="button"
      >
        <SlidersVertical className={styles.icon} />
      </button>
      <button
        className={styles.action}
        onClick={handleOnDelete}
        title="Delete"
        type="button"
      >
        <Trash className={styles.icon} />
      </button>
    </nav>
  );
};

const styles = tw({
  container: `
    absolute top-0 -right-2
    flex gap-2
  `,
  action: `
    p-2
  `,
  icon: `
    size-4.5
    stroke-2

    sm:size-3.5
  `,
});
