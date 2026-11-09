'use client';

import { TextAlignJustifyStart } from 'lucide-react';

import tw from '@/styles';

import { useModel } from './model';

export default function Toggle() {
  const { handleOnClick, isActive } = useModel();

  return (
    <button
      aria-label="toggle menu sidebar"
      onClick={handleOnClick}
      type="button"
    >
      <TextAlignJustifyStart className={styles.icon} />
    </button>
  );
};

const styles = tw({
  icon: `
    size-5
    stroke-1
  `,
});
