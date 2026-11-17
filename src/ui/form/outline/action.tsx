'use client';

import { ArrowRight } from 'lucide-react';

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
      <ArrowRight className={styles.arrow} />
    </button>
  );
};

const styles = tw({
  container: `
    flex flex-col gap-1
    w-full
    text-left
    select-none
    outline-0

    motion-safe:duration-300

    disabled:opacity-50
    disabled:!cursor-default
  `,
  arrow: `
    absolute top-1/2 right-0
    -translate-y-1/2
    size-4.5
    stroke-2

    sm:size-4
  `,
});
