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
    relative
    flex flex-col items-start
    p-4
    rounded-xl
    w-full
    bg-(--foreground)/10.5

    dark:bg-(--foreground)/5.5
  `,
});
