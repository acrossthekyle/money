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
    inline-flex items-center
    w-fit
    rounded-full
    text-(--background) text-sm
    uppercase
    py-2 px-4
    whitespace-nowrap
    select-none
  `,
  inactive: `
    bg-(--foreground)
  `,
  active: `
    bg-yellow-300
    !text-black
  `,
});
