import { format } from 'date-fns';

import { MONTHS_FULL } from '@/constants';
import tw, { cs } from '@/styles';
import type { CalendarDay } from '@/types'
import { currency } from '@/utils';

type Props = {
  day: CalendarDay;
};

export default function Heading({ day }: Props) {
  return (
    <>
      <h2 id="dialog-header">
        {day.dateable.weekdayFull}, {MONTHS_FULL[Number(day.dateable.month) - 1]} {format(day.dateable.date, 'do')} {day.dateable.year}
      </h2>
      <p className={styles.balance}>
        <span>Projected balance</span>
        <span
          className={
            cs(
              day.balance < 0 && styles.negative,
            )
          }
        >
          {day.balance < 0 && '-'}${currency(day.balance)}
        </span>
      </p>
    </>
  );
};

const styles = tw({
  balance: `
    flex justify-between
    text-current/62.5

    sm:text-sm
  `,
  negative: `
    text-red-400
  `,
})
