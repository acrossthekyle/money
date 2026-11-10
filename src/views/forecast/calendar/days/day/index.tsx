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
    isHoverable,
    isNegative,
    isBold,
  } = useModel(date, day);

  return (
    <li
      className={
        cs(
          styles.container,
          hasItems && styles.highlighted,
          isFaded && styles.faded,
          isHoverable && styles.hoverable,
          isBold && styles.boldened,
        )
      }
    >
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
          {day.dateable.isInMonth && (
            <span
              className={
                cs(
                  styles.balance,
                  isNegative && styles.negative,
                )
              }
            >
              ${currency(day.balance, true)}
            </span>
          )}
        </button>
      )}
    </li>
  );
};

const styles = tw({
  container: `
    group
    relative
    aspect-square
    bg-(--foreground)/5.5 dark:bg-(--foreground)/12.5
    rounded-xl

    sm:text-sm
  `,
  faded: `
    text-current/90
  `,
  hoverable: `
    hover:bg-(--foreground)/22.5
    hover:dark:bg-(--foreground)/17.5
    hover:text-(--foreground)
  `,
  highlighted: `
    !bg-(--foreground)
    !hover:text-(--foreground)
  `,
  boldened: `
    bg-(--foreground)/12.5 dark:bg-(--foreground)/17.5
    outline-3 outline-current/17.5 dark:outline-current/32.5
  `,
  action: `
    relative
    flex flex-col items-center justify-center
    w-full h-full
    select-none

    disabled:cursor-default

    sm:gap-0.5
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
    text-[min(2.25vw,0.55rem)]
    font-roboto font-medium
  `,
  negative: `
    !text-red-400
  `,
});
