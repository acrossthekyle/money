import tw from '@/styles';
import type { CalendarReturn } from '@/types';
import { currency } from '@/utils';

type Props = {
  data?: CalendarReturn;
};

export default function Return({ data }: Props) {
  if (data === undefined) {
    return null;
  }

  return (
    <li>
      <p className={styles.container}>
        <span className={styles.info}>
          <span className={styles.capitalize}>Monthly</span>
          <span>{data.type} via</span>
          <span>{data.label}</span>
        </span>
        <span>${currency(data.amount || '0', true)}</span>
      </p>
    </li>
  );
};

const styles = tw({
  container: `
    flex justify-between items-center gap-8
    w-full
    font-bold
    text-xl
    leading-[1]
    select-none
  `,
  info: `
    flex flex-col
  `,
  capitalize: `
    capitalize
  `,
});
