'use client';

import { Pen, Pin, PinOff, Trash } from 'lucide-react';

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
        title={isPinned ? 'Unset as default portfolio item upon login' : 'Set as default portfolio item upon login'}
        type="button"
      >
        {isPinned ? (
          <PinOff className={styles.icon} />
        ) : (
          <Pin className={styles.icon} />
        )}
      </button>
      <button
        aria-label="edit portfolio item"
        className={styles.action}
        onClick={handleOnEdit}
        type="button"
      >
        <Pen className={styles.icon} />
      </button>
      <button
        aria-label="delete portfolio item"
        className={styles.action}
        onClick={handleOnDelete}
        type="button"
      >
        <Trash className={styles.icon} />
      </button>
    </nav>
  );
};

const styles = tw({
  container: `
    absolute top-0 right-0
    flex gap-2
  `,
  action: `
    p-2
  `,
  icon: `
    size-3.5
    stroke-2
  `,
});
