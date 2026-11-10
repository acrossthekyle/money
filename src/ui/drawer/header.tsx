'use client';

import { X } from 'lucide-react';

import tw, { cs } from '@/styles';

type Props = {
  className?: string;
  onClose: () => void;
};

export default function Header({
  children,
  className,
  onClose,
}: React.PropsWithChildren<Props>) {
  return (
    <header className={cs(styles.container, className)}>
      {children}
      <button className={styles.close} onClick={onClose} type="button">
        <X className={styles.icon} />
      </button>
    </header>
  );
};

const styles = tw({
  container: `
    relative
    flex flex-col

    after:absolute
    after:left-0
    after:right-0
    after:top-full
    after:z-100
    after:h-6
    after:bg-linear-to-b
    after:from-zinc-50
    dark:after:from-zinc-950
    after:to-transparent
    after:pointer-events-none
  `,
  close: `
    absolute top-0 right-0
  `,
  icon: `
    size-6
    stroke-1

    sm:size-5
  `,
});
