'use client';

import { useState } from 'react';

import { useHolding } from '@/hooks';
import { Dialogs } from '@/dialogs';
import { Main } from '@/layout';
import tw, { cs } from '@/styles';
import type { Dateable, Holding } from '@/types';
import Ui from '@/ui';

import Filters from './filters';
import Header from './header';
import Item from './item';

type Props = {
  data: {
    date: Dateable;
    holdings: Holding[];
    netWorth: number;
  };
};

export default function View({ data }: Props) {
  const [filter, setFilter] = useState('credit_card');
  const [holding, setHolding] = useState<Holding | undefined>();

  const { onHolding } = useHolding();

  const handleOnFilter = (value: string) => {
    if (value === 'plus') {
      setHolding(undefined);

      onHolding();
    } else {
      setFilter(value);
    }
  };

  const handleOnHolding = (item: Holding) => {
    setHolding(item);

    onHolding();
  };

  return (
    <>
      <Main>
        <Header date={data.date} netWorth={data.netWorth} />
        <Filters current={filter} onClick={handleOnFilter} />
        <ul className={styles.items}>
          {data.holdings.map((holding) => (
            <li
              className={
                cs(
                  styles.item,
                  holding.type === filter && styles.active,
                )
              }
              key={holding.id}
            >
              <Item holding={holding} onManage={handleOnHolding} />
            </li>
          ))}
        </ul>
        <p className={styles.disclaimer}>
          Balances do not include scheduled transactions
        </p>
      </Main>
      <Dialogs.Holding holding={holding} />
    </>
  );
};

const styles = tw({
  items: `
    flex flex-col gap-6
  `,
  item: `
    relative
    flex-col justify-between gap-6
    hidden
    rounded-xl
    text-white
    bg-linear-to-tl from-gray-500 to-zinc-800
    p-4
  `,
  active: `
    !flex
  `,
  disclaimer: `
    text-current/50 text-tiny
    uppercase
    tracking-wide
  `,
})
