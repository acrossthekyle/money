'use client';

import tw from '@/styles';

type Props = {
  isClickable: boolean;
  onClick: () => void;
};

export default function Wrapper({
  children,
  isClickable,
  onClick,
}: React.PropsWithChildren<Props>) {
  if (isClickable) {
    return (
      <button
        className={styles.container}
        onClick={onClick}
        type="button"
      >
        {children}
      </button>
    );
  }

  return (
    <span className={styles.container}>
      {children}
    </span>
  );
};

const styles = tw({
  container: `
    flex gap-3
    w-full
    p-3
    rounded-xl
    text-left
  `,
});
