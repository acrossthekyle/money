'use client';

import { useId } from 'react';

import tw, { cs } from '@/styles';

type Props = {
  className?: string;
  isActive: boolean;
  label: string;
  name: string;
  onSelect: () => void;
  value: string;
};

export default function Section({
  className,
  isActive,
  label,
  name,
  onSelect,
  value,
}: Props) {
  const id = useId();

  return (
    <label
      className={
        cs(
          styles.container,
          className,
          isActive ? styles.active : styles.inactive,
        )
      }
      htmlFor={id}
    >
      <input
        className={styles.input}
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={isActive}
        onChange={onSelect}
      />
      {label}
    </label>
  );
};

const styles = tw({
  container: `
    relative
    flex items-center
    w-full
    rounded-lg
    py-2 px-4
    whitespace-nowrap
    select-none
    border border-current/17.5
    cursor-pointer

    sm:text-sm
  `,
  inactive: `
    bg-(--background)
  `,
  active: `
    bg-(--foreground)/2.5
  `,
  input: `
    appearance-none
    size-3.5
    rounded-full
    bg-(--foreground)/17.5
    mr-3

    motion-safe:duration-300

    checked:bg-(--background)
    checked:border-2
    checked:border-(--foreground)
  `,
});
