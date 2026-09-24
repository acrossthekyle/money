'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import tw from '@/styles';
import type { Holding } from '@/types'

type Props = {
  holding: Holding;
};

export default function Name({ holding }: Props) {
  const searchParams = useSearchParams();

  const params = searchParams.toString();

  return (
    <>
      <h1 className={styles.header}>
        <span className={styles.title}>
          {holding.name}
        </span>
        <span className={styles.lid}>
          {!!holding.institution && `${holding.institution} • `}
          {holding.type.replace(/_/g, ' ')}
          {holding.number && ` . . . ${holding.number}`}
        </span>
      </h1>
      <Link
        className={styles.update}
        href={`/holdings${!!params ? `?${params}` : ''}`}
      >
        Edit
      </Link>
    </>
  );
};

const styles = tw({
  header: `
    flex flex-col gap-1
    font-roboto
    uppercase
    text-base
  `,
  title: `
    pr-8
    font-bold
    truncate
  `,
  lid: `
    text-xs
  `,
  update: `
    absolute top-12 right-6 z-10
    py-1 px-2
    font-roboto
    uppercase
    text-xs
    border border-current/62.5
    rounded-sm
    tracking-wide

    motion-safe:duration-300

    hover:border-current/90

    md:text-tiny
  `,
});
