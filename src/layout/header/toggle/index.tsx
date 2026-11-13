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
  `,
  icon: `
    size-5
    stroke-1

    sm:size-4.5
  `,
});
