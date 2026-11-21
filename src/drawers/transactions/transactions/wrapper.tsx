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
    <div className={styles.container}>
      {children}
    </div>
  );
};

const styles = tw({
  container: `
    w-full
    p-3
    rounded-xl
    bg-transparent
    outline-0

    motion-safe:duration-300

    hover:bg-zinc-200/62.5
    hover:dark:bg-neutral-900/62.5
  `,
});
