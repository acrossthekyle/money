'use client';

import { Pen, Pin, PinOff, Trash } from 'lucide-react';

import tw from '@/styles';
import type { Holding } from '@/types';
import Ui from '@/ui';

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
        <span className={styles.label}>{isPinned ? 'Unpin' : 'Pin'}</span>
        {isPinned ? (
          <PinOff className={styles.icon} />
        ) : (
          <Pin className={styles.icon} />
        )}
      </button>
      <Ui.Components.Menu.Container>
        <Ui.Components.Menu.Trigger />
        <Ui.Components.Menu.Items>
          <Ui.Components.Menu.Item onClick={handleOnEdit}>
            <Pen />
            <Ui.Components.Menu.Label>Edit</Ui.Components.Menu.Label>
          </Ui.Components.Menu.Item>
          <Ui.Components.Menu.Item
            isDestructive
            isLast
            onClick={handleOnDelete}
          >
            <Trash />
            <Ui.Components.Menu.Label>Delete</Ui.Components.Menu.Label>
          </Ui.Components.Menu.Item>
        </Ui.Components.Menu.Items>
      </Ui.Components.Menu.Container>
    </nav>
  );
};

const styles = tw({
  container: `
    absolute top-0 right-0
    flex
    border border-current/17.5
    bg-(--background)/32.5
    rounded-lg
    divide-x divide-current/12.5
  `,
  action: `
    flex items-center gap-2
    p-2
    text-current/92.5
    rounded-s-lg

    motion-safe:duration-300

    hover:bg-(--foreground)/2.5
  `,
  label: `
    text-sm

    sm:text-xs
  `,
  icon: `
    size-3.5
    stroke-2

    sm:size-3
  `,
});
