'use client';

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
    text-black
    rounded-full
    text-xs
    uppercase
    py-2 px-4
    whitespace-nowrap
    select-none

    md:text-tiny
    md:rounded-md
    md:px-2
    md:py-1.25
    md:gap-2
  `,
  inactive: `
    bg-white
  `,
  active: `
    bg-lime-300
  `,
});
