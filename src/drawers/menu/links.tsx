'use client';

import { Check, ChevronRight } from 'lucide-react';
import Link from 'next/link';

import tw from '@/styles';
import type { Holding } from '@/types';
import { currency } from '@/utils';

type Props = {
  active: string;
  holdings: Holding[];
  onClick: () => void;
};

export default function Links({ active, holdings, onClick }: Props) {
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
                {holding.name}
              </span>
              <span className={styles.type}>
                {holding.type.replace(/_/g, ' ')} • ${currency(holding.balance, true)}
              </span>
              {active === holding.id ? (
                <Check className={styles.check} />
              ) : (
                <ChevronRight className={styles.chevron} />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const styles = tw({
  items: `
    flex flex-col gap-5
    mt-2
  `,
  link: `
    relative
    flex flex-col gap-1.5
  `,
  name: `
    leading-[1]

    sm:text-sm
  `,
  type: `
    text-sm text-current/62.5
    leading-[1]
    capitalize
  `,
  chevron: `
    absolute top-1/2 right-0
    -translate-y-1/2
    size-4.5
    stroke-2
  `,
  check: `
    absolute top-1/2 right-0
    -translate-y-1/2
    size-4
    stroke-2
  `,
});
