'use client';

import tw, { cs } from '@/styles';

type Props = {
  isHighlighted?: boolean;
  onClick: () => void;
};

export default function Container({
  children,
  isHighlighted,
  onClick,
}: React.PropsWithChildren<Props>) {
  return (
    <button
      className={cs(styles.container, isHighlighted && styles.highlighted)}
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

    before:absolute
    before:-inset-2
    before:rounded-4xl
    before:bg-transparent

    motion-safe:before:duration-300

    hover:before:!bg-(--foreground)/12

    md:before:rounded-2xl
  `,
  highlighted: `
    before:!bg-(--foreground)/4
  `,
});
