'use client';

import { Star } from 'lucide-react';

import tw, { cs } from '@/styles';
import type { Holding } from '@/types';
import Ui from '@/ui';

import { useModel } from './model';

type Props = {
  holding: Holding;
  pinned: string;
};

export default function Options({ holding, pinned }: Props) {
  const {
    handleOnEdit,
    handleOnPin,
    isPinned,
  } = useModel(holding, pinned);

  return (
    <nav aria-label="options" className={styles.container}>
      <button
        onClick={handleOnPin}
        title={isPinned ? 'Unset as default upon login' : 'Set as default upon login'}
        type="button"
      >
        <Star className={cs(styles.star, isPinned && styles.fill)} />
      </button>
      <Ui.Components.Button isGhost onClick={handleOnEdit}>
        Update
      </Ui.Components.Button>
    </nav>
  );
};

const styles = tw({
  container: `
    absolute top-1 right-0 bottom-19
    flex flex-col justify-between items-end
  `,
  star: `
    stroke-1 stroke-current/82.5
    size-4.5
  `,
  fill: `
    fill-current/82.5
  `,
});
