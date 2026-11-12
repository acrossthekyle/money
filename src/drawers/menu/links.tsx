'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import tw from '@/styles';
import type { Holding } from '@/types';

import Avatar from './avatar';

type Props = {
  holdings: Holding[];
  onClick: () => void;
};

export default function Links({ holdings, onClick }: Props) {
  return (
    <nav>
      <ul className={styles.items}>
        {holdings.map((holding) => (
          <li key={holding.id}>
            <Link
              className={styles.link}
              href={`/${holding.id}`}
              onClick={onClick}
            >
              <span className={styles.name}>
                <Avatar type={holding.type} />
                {holding.name}
              </span>
              <span className={styles.type}>
                {holding.type.replace(/_/g, ' ')}
              </span>
              <ChevronRight className={styles.chevron} />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const styles = tw({
  header: `
    py-4
    text-sm text-current/62.5
  `,
  items: `
    flex flex-col gap-3
    mt-4
  `,
  link: `
    flex items-center
    bg-(--foreground)/7.5
    p-2
    rounded-lg

    motion-safe:duration-300

    hover:bg-(--foreground)/12.5

    sm:text-sm
  `,
  name: `
    flex items-center gap-3
    pl-1
  `,
  type: `
    text-tiny text-current/62.5
    border border-dashed border-current/32.5
    bg-(--background)/17.5
    py-0.75 px-2
    ml-auto mr-2
    rounded-md
    uppercase
    leading-[1]

    sm:text-xtiny
  `,
  chevron: `
    size-4
    stroke-1
  `,
});
