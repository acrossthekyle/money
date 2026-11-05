import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

import { MONTHS } from '@/constants';
import tw from '@/styles';
import type { Dateable } from '@/types'

type Props = {
  active: string;
  date: Dateable;
};

export default function Heading({ active, date }: Props) {
  return (
    <>
      <Link
        className={styles.eyebrow}
        href={`/${active}/year`}
      >
        <ChevronDown className={styles.chevron} />
        <span>{date.year}</span>
      </Link>
      <h1 className={styles.header}>{MONTHS[Number(date.month) - 1]}</h1>
    </>
  );
};

const styles = tw({
  chevron: `
    size-5
    stroke-2
  `,
  header: `
    text-8xl
    font-semibold
  `,
  eyebrow: `
    relative z-10
    flex items-center gap-2
    font-semibold
    text-2xl
    leading-[0.8]
  `,
})
