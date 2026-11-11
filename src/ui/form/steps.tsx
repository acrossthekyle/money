'use client';

import { ChevronDown } from 'lucide-react';

import tw from '@/styles';

type Props = {
  onChange: (value: number) => void;
  value: number;
  steps: string[];
};

export default function Steps({
  onChange,
  value,
  steps,
}: Props) {
  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(Number(event.target.value));
  };

  return (
    <div className={styles.container}>
      <div className={styles.jump}>
        <span className={styles.prefix}>Jump to:</span>
        <select
          autoFocus={false}
          className={styles.select}
          id="jump-to"
          onChange={handleOnChange}
          value={value}
          tabIndex={-1}
        >
          {steps.filter(value => value !== 'submit').map((name, index) => (
            <option key={name} value={index}>
              Step {index + 1}: {name}
            </option>
          ))}
        </select>
        <span aria-hidden="true" className={styles.mask} role="presentation">
          Choose a step...
        </span>
        <ChevronDown className={styles.chevron} />
      </div>
    </div>
  );
};

const styles = tw({
  container: `
    flex gap-2
    mt-4
  `,
  jump: `
    relative
    flex items-center gap-0
    w-full
    bg-(--background)
    border border-current/22.5
    rounded-lg
  `,
  prefix: `
    shrink-0
    text-current/62.5
    pl-2 pr-1
    bg-(--background)
    select-none

    sm:text-sm
  `,
  select: `
    appearance-none
    w-full
    pl-4 py-1.25
    rounded-e-lg
    cursor-pointer
    capitalize
    outline-0
  `,
  mask: `
    absolute inset-0 left-17.5
    flex items-center
    bg-(--background)
    rounded-lg
    pl-2
    pointer-events-none

    sm:text-sm
  `,
  chevron: `
    absolute right-2 top-1/2
    -translate-y-1/2
    size-5
    stroke-2

    sm:size-4
  `,
});
