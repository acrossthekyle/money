'use client';

import { Ellipsis } from 'lucide-react';

import tw, { cs } from '@/styles';

import { useModel } from './model';

export default function Trigger() {
  const { isActive, onToggle } = useModel();

  return (
    <button
      aria-label="toggle menu"
      className={cs(styles.action, isActive ? styles.active : styles.inactive)}
      onClick={onToggle}
      type="button"
    >
      <Ellipsis className={styles.icon} />
    </button>
  );
};

const styles = tw({
  action: `
    text-current/92.5
    rounded-e-lg
    p-2

    motion-safe:duration-300
  `,
  active: `
    bg-zinc-50

    dark:bg-neutral-900
  `,
  inactive: `
    hover:bg-(--foreground)/2.5
  `,
  icon: `
    size-4.5
    stroke-2

    sm:size-3.5
  `,
});
