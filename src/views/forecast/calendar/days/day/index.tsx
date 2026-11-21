'use client';

import tw, { cs } from '@/styles';
import type { CalendarDay, Dateable } from '@/types';
import { currency } from '@/utils';

import { useModel } from './model';

type Props = {
  date: Dateable;
  day: CalendarDay;
};

export default function Day({ date, day }: Props) {
  const {
    handleOnClick,
    hasItems,
    isDisabled,
    isToday,
    isNegative,
    isSelected,
  } = useModel(date, day);

  return (
    <li className={styles.container}>
      {!day.dateable.isInMonth && (
        <span className={cs(styles.action, styles.placeholder)}>
          {day.dateable.day}
        </span>
      )}
      {day.dateable.isInMonth && (
        <button
          className={
            cs(
              styles.action,
              hasItems && styles.occupied,
              (!isToday && !hasItems && !isSelected && !isDisabled) && styles.hoverable,
              (!hasItems && isSelected) && styles.selected,
              (!hasItems && isToday) && styles.today,
            )
          }
          disabled={isDisabled}
          onClick={handleOnClick}
          type="button"
        >
          {day.dateable.day}
          <span
            className={
              cs(
                styles.balance,
                isNegative && styles.negative,
              )
            }
          >
            ${currency(day.balance, true, day.balance > 99999)}
          </span>
        </button>
      )}
    </li>
  );
};

const styles = tw({
  container: `
    group
    flex items-center justify-center
    aspect-square
    rounded-lg
    text-sm
  `,
  action: `
    flex flex-col items-center justify-center
    w-full h-full
    p-1
    select-none
    rounded-lg
    outline outline-transparent

    motion-safe:duration-300

    disabled:cursor-default
    disabled:text-current/72.5
  `,
  placeholder: `
    rounded-lg
    text-current/62.5
  `,
  today: `
    bg-zinc-200/42.5

    dark:bg-neutral-700/42.5
  `,
  hoverable: `
    hover:bg-zinc-200/62.5
    hover:dark:bg-neutral-700/62.5
  `,
  occupied: `
    bg-(--foreground)/90
    text-(--background)
  `,
  selected: `
    bg-zinc-200/62.5
    !outline-current/22.5

    dark:bg-neutral-700/62.5
  `,
  balance: `
    hidden
    text-tiny text-current/72.5

    sm:block
  `,
  negative: `
    text-red-400

    dark:text-rose-400
  `,
});
