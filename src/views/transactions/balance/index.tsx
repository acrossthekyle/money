import tw from '@/styles';
import type { CalendarDay } from '@/types';
import { currency } from '@/utils';

type Props = {
  day: CalendarDay;
};

export default function Balance({ day }: Props) {
  return (
    <p className={styles.container}>
      <span className={styles.balance}>
        ${currency(day.balance)}
      </span>
      <span className={styles.title}>
        Balance
      </span>
    </p>
  );
};

const styles = tw({
  container: `
    relative
    flex flex-col
    pt-8
  `,
  balance: `
    text-lg
    font-roboto font-bold
  `,
  title: `
    text-tiny
    font-medium
    uppercase
  `,
});
