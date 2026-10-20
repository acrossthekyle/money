'use client';

import tw from '@/styles';

type Props = {
  onClick: () => void;
};

export default function Container({
  children,
  onClick,
}: React.PropsWithChildren<Props>) {
  return (
    <button
      className={styles.container}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
};

const styles = tw({
  container: `
    relative
    flex items-center gap-4
    w-full
  `,
});
