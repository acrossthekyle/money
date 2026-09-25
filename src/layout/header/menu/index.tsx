'use client';

import { TextAlignCenter } from 'lucide-react';

import tw from '@/styles';

import { useModel } from './model';

export default function Menu() {
  const { handleOnClick, isActive } = useModel();

  return (
    <button
      className={styles.container}
      onClick={handleOnClick}
      title="Menu"
      type="button"
    >
      {!isActive && <TextAlignCenter className={styles.icon} />}
    </button>
  );
};

const styles = tw({
  container: `
    text-xs
    uppercase
    font-roboto
    tracking-widest
  `,
  icon: `
    w-5 h-5
    stroke-2
  `,
});
