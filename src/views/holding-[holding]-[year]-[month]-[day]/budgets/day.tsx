import { format } from 'date-fns';

import { DATE_DISPLAY_ABBREVIATED } from '@/constants';
import tw, { cs } from '@/styles';
import { currency } from '@/utils';

type Props = {
  balance: number;
  date: Date;
};

export default function Day({ date, balance }: Props) {
  return (
    <h3 className={styles.heading}>
      <span>
        {format(date, DATE_DISPLAY_ABBREVIATED)}
      </span>
      <span className={cs(balance < 0 && styles.negative)}>
        ${currency(balance)}
      </span>
    </h3>
  );
};

const styles = tw({
  heading: `
    flex items-center justify-between
    w-full
    mb-2
    font-roboto font-bold
    text-sm
    uppercase
  `,
  negative: `
    text-red-500 dark:text-rose-400
  `,
});
