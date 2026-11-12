'use client';

import tw, { cs } from '@/styles';

import { useModel } from './model';

export default function Items({
  children,
}: React.PropsWithChildren) {
  const { isActive } = useModel();

  return (
    <div
      className={
        cs(
          styles.container,
          isActive ? styles.active : styles.inactive,
        )
      }
    >
      <ul>
        {children}
      </ul>
    </div>
  );
};

const styles = tw({
  container: `
    absolute top-full right-0 z-10000
    min-w-32
    mt-1
    border border-current/12.5
    bg-zinc-50
    rounded-lg
    divide-y divide-current/12.5
    shadow-2xl/100

    dark:bg-neutral-900
  `,
  active: `
    opacity-100
  `,
  inactive: `
    opacity-0
    pointer-events-none
  `,
});
