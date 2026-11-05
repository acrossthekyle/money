'use client';

import tw, { cs } from '@/styles';
import type { CalendarDay } from '@/types';

import { useModel } from './model';
import { toWords } from './utils';

type Props = {
  days: CalendarDay[];
  isPreview?: boolean;
};

export default function Month({ days, isPreview }: Props) {
  const { handleOnClick } = useModel();

  return (
    <ul className={styles.grid}>
      <li aria-hidden="true" role="presentation" />
      <li aria-hidden="true" role="presentation" />
      <li aria-hidden="true" role="presentation" />
      {days.filter(({ dateable }) => dateable.isInMonth).map((day, index) => (
        <li
          className={
            cs(
              styles.item,
              isPreview ? styles.small : styles.large,
            )
          }
          key={day.dateable.iso}
        >
          {day.dateable.isBeforeToday ? (
            <span className={cs(styles.day, styles.disabled)}>
              <span
                className={
                  cs(
                    index < 9 && styles.centered(isPreview),
                    index > 8 && index < 14 && styles.bottom(isPreview),
                    index > 13 && index < 19 && styles.top(isPreview),
                    index > 18 && styles.last(isPreview),
                  )
                }
              >
                {day.dateable.day}
              </span>
            </span>
          ) : (
            <button
              className={
                cs(
                  styles.day,
                  day.balance < 0 && styles.negative,
                  (day.budgets.length > 0 || day.return.amount !== null) && styles.faded,
                )
              }
              onClick={() => handleOnClick(day)}
              type="button"
            >
              <span
                className={
                  cs(
                    index < 9 && styles.centered(isPreview),
                    index > 8 && index < 14 && styles.bottom(isPreview),
                    index > 13 && index < 19 && styles.top(isPreview),
                    index > 18 && styles.last(isPreview),
                  )
                }
              >
                {day.dateable.day}
              </span>
              {!isPreview && (day.budgets.length > 0 || day.return.amount !== null) && (
                <>
                  {day.return.amount !== null ? (
                    <span className={styles.label}>
                      {day.return.label}
                    </span>
                  ) : (
                    <span className={styles.label}>
                      {toWords(day.budgets.length)}<br />
                      Transaction{day.budgets.length > 1 ? 's' : ''}
                    </span>
                  )}
                </>
              )}
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

const styles = tw({
  grid: `
    grid grid-cols-2 grid-rows-17 grid-flow-col gap-0
    h-full w-full
  `,
  disabled: `
    text-current/32.5 dark:text-current/5.5
  `,
  faded: `
    text-current/62.5 dark:text-current/22.5
  `,
  item: `
    flex justify-end gap-0
    font-bold
    leading-[0.9]
    overflow-hidden
  `,
  small: `
    text-2xl
  `,
  large: `
    text-7xl
  `,
  highlighted: `
    !text-(--background)
    !font-bold
  `,
  negative: `
    text-red-400 dark:text-rose-400
  `,
  day: `
    relative
    leading-[0.9]
    outline-0
  `,
  centered: (isPreview: boolean) => tw(`
    block
    ${isPreview ? 'w-5' : 'w-14'}
    text-center
  `),
  bottom: (isPreview: boolean) => tw(`
    block
    ${isPreview ? 'w-7' : 'w-20'}
  `),
  top: (isPreview: boolean) => tw(`
    block
    ${isPreview ? 'w-7' : 'w-20'}
  `),
  last: (isPreview: boolean) => tw(`
    block
    ${isPreview ? 'w-8.5' : 'w-24'}
  `),
  label: `
    absolute bottom-1 left-0
    pb-2
    origin-bottom-left -rotate-90
    text-left text-xtiny text-(--foreground)
    tracking-wider
    leading-3
  `,
});
