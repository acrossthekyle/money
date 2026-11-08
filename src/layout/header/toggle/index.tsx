'use client';

import { PanelLeftOpen, PanelLeftClose } from 'lucide-react';

import tw from '@/styles';

import { useModel } from './model';

export default function Toggle() {
  const { handleOnClick, isActive } = useModel();

  return (
    <button
      aria-label="toggle menu sidebar"
      className={styles.container}
      onClick={handleOnClick}
      type="button"
    >
      {isActive ? (
        <PanelLeftClose className={styles.icon} />
      ) : (
        <PanelLeftOpen className={styles.icon} />
      )}
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
  `,
});
