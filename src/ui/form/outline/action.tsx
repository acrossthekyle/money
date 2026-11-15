'use client';

import tw from '@/styles';

type Props = {
  isDisabled?: boolean;
  onClick: () => void;
  title?: string;
};

export default function Action({
  children,
  isDisabled,
  onClick,
  title,
}: React.PropsWithChildren<Props>) {
  return (
    <button
      className={styles.container}
      disabled={isDisabled}
      onClick={onClick}
      title={title}
      type="button"
    >
      {children}
    </button>
  );
};

const styles = tw({
  container: `
    absolute top-1/2 right-0
    -translate-y-1/2
    py-1.25 px-4
    rounded-full
    text-sm text-(--foreground)
    whitespace-nowrap
    select-none
    bg-transparent
    border border-current/10.5

    motion-safe:duration-300

    disabled:opacity-50
    disabled:!cursor-default

    not-disabled:hover:bg-(--foreground)/4.5

    sm:text-xs
  `,
});
