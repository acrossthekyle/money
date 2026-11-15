'use client';

import { ArrowRight, Info } from 'lucide-react';

import tw from '@/styles';

type Props = {
  onClick: () => void;
};

export default function Delete({
  children,
  onClick,
}: React.PropsWithChildren<Props>) {
  return (
    <button
      className={styles.container}
      onClick={onClick}
      type="button"
    >
      <span className={styles.header}>
        <Info className={styles.info} /> Danger Zone
      </span>
      <span className={styles.body}>
        {children}
      </span>
      <ArrowRight className={styles.arrow} />
    </button>
  );
};

const styles = tw({
  container: `
    relative
    flex flex-col gap-1
    w-full
    p-3
    mb-2
    rounded-lg
    select-none
    text-left
    bg-zinc-200/32.5 dark:bg-zinc-800/42.5

    motion-safe:duration-300

    hover:bg-zinc-200/62.5
    hover:dark:bg-zinc-800/62.5

    sm:text-sm
  `,
  header: `
    flex items-center gap-3
    font-medium
  `,
  info: `
    size-4
    stroke-rose-400
  `,
  body: `
    block
    pl-7
    text-current/62.5

    sm:text-sm
  `,
  arrow: `
    absolute top-1/2 right-3
    -translate-y-1/2
    size-4
    stroke-2
  `,
});
