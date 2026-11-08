'use client';

import { useSwipeable } from 'react-swipeable';

import tw, { cs } from '@/styles';

type Props = {
  onClose: () => void;
};

export default function Header({
  children,
  onClose,
}: React.PropsWithChildren<Props>) {
  const handlers = useSwipeable({
    onSwipedDown: onClose,
  });

  return (
    <div
      className={styles.bar}
      onClick={onClose}
      {...handlers}
    />
  );
};

const styles = tw({
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
