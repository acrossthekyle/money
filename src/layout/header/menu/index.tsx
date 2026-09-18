'use client';

import { Ellipsis } from 'lucide-react';

import tw from '@/styles';

import { useModel } from './model';

export default function Menu() {
  const { handleOnClick } = useModel();

  return (
    <button
      onClick={handleOnClick}
      title="Menu"
      type="button"
    >
      <Ellipsis className={styles.ellipsis} />
    </button>
  );
};

const styles = tw({
  ellipsis: `
    w-6 h-6
    stroke-2
  `,
});
