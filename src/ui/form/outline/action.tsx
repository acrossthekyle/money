'use client';

import { Pen } from 'lucide-react';

import tw, { cs } from '@/styles';

type Props = {
  isDisabled?: boolean;
  onClick?: () => void;
  title?: string;
};

export default function Action({
  children,
  isDisabled,
  onClick,
  title,
}: React.PropsWithChildren<Props>) {
  if (onClick) {
    return (
      <button
        className={cs(styles.container, styles.hoverable)}
        disabled={isDisabled}
        onClick={onClick}
        title={title}
        type="button"
      >
        {children}
        {!isDisabled && (
          <Pen className={styles.icon} />
        )}
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
    flex flex-col gap-1
    w-full
    p-3
    select-none
    outline-0
    text-left

    motion-safe:duration-300

    disabled:opacity-50
    disabled:!cursor-default
  `,
  hoverable: `
    not-disabled:hover:bg-(--background)/7.5
  `,
  icon: `
    absolute top-1/2 right-3
    -translate-y-1/2
    size-4
    stroke-2

    sm:size-3
  `,
});
