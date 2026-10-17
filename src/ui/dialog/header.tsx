'use client';

import { useSwipeable } from 'react-swipeable';

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
  const handlers = useSwipeable({
    onSwipedDown: onClose,
  });

  return (
    <header
      className={cs(styles.container, className)}
      {...handlers}
    >
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
    touch-none
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
});
