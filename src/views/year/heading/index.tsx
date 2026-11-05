import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

import tw from '@/styles';
import type { Dateable } from '@/types'

type Props = {
  active: string;
  date: Dateable;
};

export default function Heading({ active, date }: Props) {
  return (
    <h1 className={styles.header}>
      <Link
        className={styles.year}
        href={`/${active}/years`}
      >
        <ChevronDown className={styles.chevron} />
        <span>{date.year}</span>
      </Link>
    </h1>
  );
};

const styles = tw({
  year: `
    relative z-10
    flex items-center gap-2
    font-semibold
    text-lg
    leading-[0.8]
  `,
  chevron: `
    size-5
    stroke-2
  `,
})
