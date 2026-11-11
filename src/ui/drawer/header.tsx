'use client';

import { ArrowLeftToLine } from 'lucide-react';

import tw, { cs } from '@/styles';

type Props = {
  className?: string;
  onClose?: () => void;
};

export default function Header({
  children,
  className,
  onClose,
}: React.PropsWithChildren<Props>) {
  return (
    <header className={cs(styles.container, className)}>
      {children}
      {onClose && (
        <button className={styles.close} onClick={onClose} type="button">
          <ArrowLeftToLine className={styles.icon} />
        </button>
      )}
    </header>
  );
};

const styles = tw({
  container: `
    relative
    flex flex-col shrink-0 gap-0.5
    p-4 pb-0

    after:absolute
    after:left-0
    after:right-0
    after:-bottom-6
    after:z-100
    after:h-6
    after:bg-linear-to-b
    after:from-(--background)
    after:to-transparent
    after:pointer-events-none

    sm:after:from-zinc-50
    sm:dark:after:from-neutral-900
  `,
  close: `
    absolute top-4 right-4
  `,
  icon: `
    size-6
    stroke-1

    sm:size-4.5
  `,
});
