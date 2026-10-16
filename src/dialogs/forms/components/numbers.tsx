'use client';

import { Minus, Undo2 } from 'lucide-react';

import tw, { cs } from '@/styles';

const NUMBERS = [
  '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '-', 'x',
];

type Props = {
  className?: string;
  onClick: (value: string) => void;
};

export default function Numbers({ className, onClick }: Props) {
  return (
    <ul aria-label="number pad" className={styles.container}>
      {NUMBERS.map((item) => (
        <li
          className={
            cs(
              styles.option,
              className,
              item === 'x' && styles.centered,
            )
          }
          key={item}
        >
          <button
            className={styles.number}
            onClick={() => onClick(item)}
            type="button"
          >
            {item === 'x' && <Undo2 className={styles.icon} />}
            {item === '-' && <Minus className={styles.icon} />}
            {!['x', '-'].includes(item) && <>{item}</>}
          </button>
        </li>
      ))}
    </ul>
  );
};

const styles = tw({
  container: `
    grid grid-cols-3 gap-2
    mb-4
  `,
  option: `
    col-span-1
  `,
  centered: `
    col-start-2
  `,
  number: `
    flex items-center justify-center
    rounded-full
    h-12 w-18
    bg-black
    border border-current/12
    text-base
    select-none
    leading-[0]

    motion-safe:duration-200

    hover:bg-white
    hover:text-black

    md:h-9
    md:w-14
    md:text-sm
  `,
  icon: `
    w-5 h-5
    stroke-1
  `,
});
