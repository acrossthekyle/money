'use client';

import Anchor from 'next/link';

import tw from '@/styles';
import type { Holding } from '@/types';
import { netWorth } from '@/utils';

import Link from './link';
import Worth from './worth';

type Props = {
  current: string;
  holdings: Holding[];
  onClick: () => void;
  pinned: string;
};

export default function Links({ current, holdings, onClick, pinned }: Props) {
  const worth = netWorth(holdings);

  return (
    <nav>
      <ul className={styles.items}>
        {holdings.map((holding) => (
          <li key={holding.id}>
            <Anchor
              className={styles.link}
              href={`/${holding.id}`}
              onClick={onClick}
            >
              <Link holding={holding} current={current} pinned={pinned} />
              <Worth holding={holding} worth={worth} />
            </Anchor>
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
  link: `
    flex flex-col gap-4
    w-full
    p-3
    rounded-xl
    bg-(--background)/22.5
    border border-current/10.5
  `,
});
