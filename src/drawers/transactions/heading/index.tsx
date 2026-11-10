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
    <h2 className={styles.container} id="dialog-header">
      <span>
        {day.dateable.weekdayFull}, {MONTHS_FULL[Number(day.dateable.month) - 1]} {format(day.dateable.date, 'do')} {day.dateable.year}
      </span>
      <span className={styles.balance}>
        <span>Projected balance</span>
        <span
          className={
            cs(
              day.balance < 0 && styles.negative,
            )
          }
        >
          {day.balance < 0 && '-'}${currency(day.balance, true)}
        </span>
      </span>
    </h2>
  );
};

const styles = tw({
  container: `
    flex flex-col
  `,
  balance: `
    flex justify-between
    text-current/62.5

    sm:text-sm
  `,
  negative: `
    text-red-400
  `,
})
