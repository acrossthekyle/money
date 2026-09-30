'use client';

import { TextAlignJustify } from 'lucide-react';

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
      {!isActive && <TextAlignJustify className={styles.icon} />}
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
    w-7 h-7
    stroke-1

    md:w-5.5
    md:h-5.5
    md:stroke-2
  `,
});
