'use client';

import tw from '@/styles';
import type { Holding } from '@/types';
import { netWorth } from '@/utils';

import Link from './link';
import Worth from './worth';

type Props = {
  holdings: Holding[];
  onClick: () => void;
  pinned: string;
};

export default function Links({ holdings, onClick, pinned }: Props) {
  const worth = netWorth(holdings);

  return (
    <nav>
      <ul className={styles.items}>
        {holdings.map((holding) => (
          <li className={styles.item} key={holding.id}>
            <Link
              holding={holding}
              onClick={onClick}
              pinned={pinned}
            />
            <Worth holding={holding} worth={worth} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

const styles = tw({
  items: `
    flex flex-col gap-3
  `,
  item: `
    flex flex-col gap-4
    w-full
    p-3
    rounded-xl
    bg-(--background)/22.5
    border border-current/10.5
  `,
});
