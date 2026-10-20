'use client';

import { OPTION_RADIUS } from '@/constants';
import tw, { cs } from '@/styles';

type Props = {
  className?: string;
  isActive: boolean;
  onClick: () => void;
};

export default function Section({
  children,
  className,
  isActive,
  onClick,
}: React.PropsWithChildren<Props>) {
  return (
    <button
      className={
        cs(
          styles.container,
          className,
          isActive ? styles.active : styles.inactive,
        )
      }
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
};

const styles = tw({
  container: `
    inline-flex items-center gap-3
    w-fit
    text-(--background)
    text-sm
    uppercase
    py-2 px-4
    whitespace-nowrap
    select-none

    md:text-tiny
    md:px-2
    md:py-1.25
    md:gap-2

    ${OPTION_RADIUS}
  `,
  inactive: `
    bg-(--foreground)
  `,
  active: `
    bg-yellow-300
    !text-black
  `,
});
