'use client';

import tw, { cs } from '@/styles';

type Props = {
  isActive: boolean;
  label: string;
  onSelect: () => void;
};

export default function Section({
  isActive,
  label,
  onSelect,
}: Props) {
  return (
    <>
      <button
        className={styles.container}
        onClick={onSelect}
        type="button"
      >
        <span
          className={
            cs(
              styles.circle,
              isActive ? styles.active : styles.inactive,
            )
          }
        />
        {label}
      </button>
    </>
  );
};

const styles = tw({
  container: `
    relative
    flex items-center
    w-full
    rounded-md
    py-2 px-4
    whitespace-nowrap
    select-none
    border border-current/10.5
    cursor-pointer
    bg-(--foreground)/5.5
    outline-0

    sm:text-sm
  `,
  circle: `
    appearance-none
    size-3.5
    rounded-full
    bg-(--background)/32.5
    border-2
    mr-3

    motion-safe:duration-300
  `,
  active: `
    bg-(--background)
    border-(--foreground)
  `,
  inactive: `
    border-transparent
  `,
});
