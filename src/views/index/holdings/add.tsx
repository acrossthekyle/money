'use client';

import { Plus } from 'lucide-react';

import tw from '@/styles';

type Props = {
  onClick: () => void;
};

export default function Add({ onClick }: Props) {
  return (
    <li className={styles.container}>
      <button
        className={styles.action}
        onClick={onClick}
        type="button"
      >
        <Plus className={styles.icon} /> Add Account/Asset
      </button>
    </li>
  );
};

const styles = tw({
  container: `
    flex items-center justify-center
    w-full h-50
    rounded-lg
    bg-(--foreground)/2.5 dark:bg-(--foreground)/5.5
    border border-current/7.5
    p-4
  `,
  action: `
    flex items-center gap-1
    border border-(--foreground)/22.5
    px-3 py-1
    rounded-full
    text-xs text-(--background)
    font-medium
    bg-(--foreground)
    uppercase

    motion-safe:duration-300

    hover:bg-(--background)
    hover:text-(--foreground)
    hover:border-(--foreground)/62.5

    md:text-tiny
  `,
  icon: `
    w-2.5 h-2.5
    stroke-3
  `,
});
