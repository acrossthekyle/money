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
      <button
        className={styles.close}
        onClick={onClose}
        type="button"
      >
        <X className={styles.x} />
      </button>
      <button
        className={styles.bar}
        onClick={onClose}
        type="button"
      />
      {children}
    </header>
  );
};

const styles = tw({
  container: `
    relative
    flex flex-col items-center justify-between
    px-4 pt-4
  `,
  bar: `
    relative
    -mt-1
    p-3
    w-16
    rounded-full

    before:absolute
    before:top-1/2
    before:-translate-y-1/2
    before:inset-2
    before:h-1
    before:w-12
    before:rounded-full
    before:bg-black/75
    dark:before:bg-white/75
  `,
  close: `
    absolute top-4 right-4
    select-none
  `,
  x: `
    w-5 h-5
    stroke-2

    md:w-4
    md:h-4
  `,
});
