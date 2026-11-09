'use client';

import { TextAlignStart } from 'lucide-react';

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
      <TextAlignStart className={styles.icon} />
    </button>
  );
};

const styles = tw({
  container: `
    p-2
  `,
  icon: `
    size-4.5
    stroke-2
  `,
});
