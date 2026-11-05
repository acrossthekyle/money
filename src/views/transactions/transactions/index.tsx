'use client';

import { Fragment } from 'react';

import tw from '@/styles';
import type { CalendarDay } from '@/types';

import Add from './add';
import { useModel } from './model';
import Return from './return';
import Transaction from './item';
import { getItems } from './utils';

type Props = {
  active: string;
  day: CalendarDay;
};

export default function Transactions({ active, day }: Props) {
  const {
    handleOnSwipe,
    swiped,
  } = useModel();

  const items = getItems(day);

  return (
    <nav className={styles.container}>
      {items.length > 0 ? (
        <ul className={styles.items}>
          {items.map((item, index) => (
            <Fragment key={index}>
              {item.type === 'transaction' && (
                <Transaction
                  active={active}
                  day={day}
                  data={item.budget}
                  isSwiped={swiped === item.budget?.id}
                  onSwipe={handleOnSwipe}
                />
              )}
              {item.type === 'return' && (
                <Return data={item.return} />
              )}
            </Fragment>
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>
          No<br />
          Transactions<br />
          Exist
        </p>
      )}
      <Add active={active} day={day} />
    </nav>
  );
};

const styles = tw({
  container: `
    flex flex-col items-start justify-end gap-6
    h-full w-full
    pt-4
  `,
  items: `
    flex flex-col gap-6
    w-full
  `,
  empty: `
    font-bold
    text-xl
    leading-[1]
  `,
});
