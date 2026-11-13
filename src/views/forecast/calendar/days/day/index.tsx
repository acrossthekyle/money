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
    isFaded,
    isDisabled,
    isToday,
    isHoverable,
    isNegative,
    isSelected,
  } = useModel(date, day);

  return (
    <li
      className={
        cs(
          styles.container,
          hasItems && styles.occupied,
          isFaded && styles.faded,
          isHoverable && styles.hoverable,
          isSelected && styles.selected,
          isToday && styles.today,
        )
      }
    >
      {!day.dateable.isInMonth && (
        <span
          className={cs(styles.action, styles.disabled)}
        >
          {day.dateable.day}
        </span>
      )}
      {day.dateable.isInMonth && (
        <button
          className={
            cs(
              styles.action,
              hasItems && styles.dark,
              isDisabled && styles.disabled,
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
                String(day.balance).split('.')[0].length > 4 && styles.shrink,
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
    rounded-xl

    sm:text-sm
  `,
  faded: `
    text-current/90
  `,
  today: `
    !bg-(--foreground)/10.5

    dark:!bg-(--foreground)/7.5
  `,
  hoverable: `
    hover:bg-(--foreground)/5.5
    hover:text-(--foreground)

    hover:dark:bg-(--foreground)/2.5
  `,
  occupied: `
    !bg-(--foreground)/90
  `,
  selected: `
    bg-(--foreground)/10.5
    outline outline-current/22.5

    dark:bg-(--foreground)/12.5
  `,
  action: `
    flex flex-col items-center justify-center
    p-1
    select-none
    rounded-xl

    disabled:cursor-default
  `,
  disabled: `
    text-current/62.5
  `,
  dark: `
    text-(--background)

    group-hover:!text-(--background)
    group-hover:!dark:text-(--foreground)
  `,
  balance: `
    text-tiny text-current/72.5

    sm:text-xs
  `,
  shrink: `
    text-xtiny

    sm:text-tiny
  `,
  negative: `
    !text-red-400
  `,
});
