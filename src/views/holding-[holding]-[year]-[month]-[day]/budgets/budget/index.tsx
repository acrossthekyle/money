import tw from '@/styles';
import type { Budget, Dateable, Holding } from '@/types';
import { currency } from '@/utils';

import Delete from './delete';
import Edit from './edit';
import Switch from './switch';

type Props = {
  amount: string;
  budget: Budget;
  date: Dateable;
  day: {
    date: Date;
    iso: string;
  };
  holding: Holding;
  isNegative: boolean;
};

export default function Budget({
  amount,
  budget,
  date,
  day,
  holding,
  isNegative,
}: Props) {
  const isNotAssignedToHolding = budget.parent !== holding.id;

  return (
    <>
      <h4 className={styles.heading}>
        <span>{budget.name}</span>
        <span className={isNegative ? styles.negative : styles.positive}>
          {isNegative ? '-' : '+'}${currency(amount)}
        </span>
      </h4>
      {budget.holding?.from === budget.holding?.to ? (
        <p className={styles.content}>
          {budget.type}
        </p>
      ) : (
        <>
          <p className={styles.content}>
            Debiting from: {budget.holding?.from}
          </p>
          <p className={styles.content}>
            As credit to: {budget.holding?.to}
          </p>
        </>
      )}
      <p className={styles.content}>
        Frequency: {budget.schedule}
      </p>
      <div className={styles.actions}>
        {!isNotAssignedToHolding ? (
          <>
            <Edit budget={budget} day={day} holding={holding} />
            <Delete budget={budget} date={date} day={day} />
          </>
        ) : (
          <Switch budget={budget} date={date} />
        )}
      </div>
    </>
  );
};

const styles = tw({
  heading: `
    flex items-center justify-between
    w-full
    mb-2
    font-roboto font-bold
    uppercase
    text-sm
  `,
  content: `
    flex items-center justify-between
    w-full
    mb-1
    font-roboto
    text-xs
    uppercase
  `,
  negative: `
    text-red-400 dark:text-rose-400
  `,
  positive: `
    text-green-500 dark:text-lime-500
  `,
  actions: `
    flex gap-3
  `,
});
