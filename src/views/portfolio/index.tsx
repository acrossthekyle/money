'use client';

import { useEffect, useState } from 'react';

import { useHolding } from '@/hooks';
import { Dialogs } from '@/dialogs';
import { Main } from '@/layout';
import tw from '@/styles';
import type { DialogHoldingData, Holding } from '@/types';

import Filters from './filters';
import Header from './header';
import Item from './item';

type Props = {
  data: {
    holdings: Holding[];
    zone: string;
  };
};

export default function View({ data }: Props) {
  const [portfolio, setPortfolio] = useState<string | null>(null);

  const { onHolding } = useHolding<DialogHoldingData>();

  useEffect(() => {
    const saved = localStorage.getItem('portfolio');

    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPortfolio(saved);
    }
  }, []);

  const handleOnFilter = (value: string) => {
    if (value === 'plus') {
      onHolding();
    } else {
      localStorage.setItem('portfolio', value);

      setPortfolio(value);
    }
  };

  if (portfolio === null) {
    return null;
  }

  const filtered = data.holdings.filter(item => item.type === portfolio);

  return (
    <>
      <Main>
        <Header holdings={data.holdings} zone={data.zone} />
        <Filters current={portfolio} onClick={handleOnFilter} />
        <ul className={styles.items}>
          {filtered.map((item) => (
            <li className={styles.item} key={item.id}>
              <Item holding={item} zone={data.zone} />
            </li>
          ))}
        </ul>
      </Main>
      <Dialogs.Holding />
    </>
  );
};

const styles = tw({
  items: `
    flex flex-col gap-3

    md:gap-4
  `,
  item: `
    relative
    flex flex-col justify-between gap-6
    rounded-xl
    text-black dark:text-white
    bg-linear-to-tl from-gray-100 dark:from-gray-500 to-stone-300 dark:to-zinc-800
    p-4
  `,
})
