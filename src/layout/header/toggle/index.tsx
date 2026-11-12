'use client';

import { ListMinus } from 'lucide-react';

import tw from '@/styles';

import { useModel } from './model';

export default function Toggle() {
  const { handleOnClick } = useModel();

  return (
    <button
      aria-label="toggle menu sidebar"
      className={styles.container}
      onClick={handleOnClick}
      type="button"
    >
      <ListMinus className={styles.icon} />
    </button>
  );
};

const styles = tw({
  container: `
    p-2

    sm:border
    sm:border-current/7.5
    sm:rounded-lg
    sm:bg-zinc-50
    sm:dark:bg-neutral-900
  `,
  icon: `
    size-5
    stroke-1

    sm:size-4.5
  `,
});
