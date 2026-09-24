import { format } from 'date-fns';

import tw from '@/styles';
import { currency } from '@/utils';

type Props = {
  balance: number;
  date: Date;
};

export default function Day({ date, balance }: Props) {
  return (
    <h3 className={styles.heading}>
      <span>
        {format(date, 'MMMM do')}
      </span>
      <span>
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
});
