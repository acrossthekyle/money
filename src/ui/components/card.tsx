'use client';

import { differenceInDays, parseISO } from 'date-fns';
import { Flag } from 'lucide-react';

import { CARD_RADIUS } from '@/constants';
import tw from '@/styles';
import type { Holding } from '@/types';
import { currency, date } from '@/utils';

type Props = {
  holding: Holding;
  isHeading?: boolean;
  zone: string;
};

type WrapperProps = {
  isHeading?: boolean;
};

function Wrapper({
  children,
  isHeading,
}: React.PropsWithChildren<WrapperProps>) {
  if (isHeading) {
    return (
      <h1 className={styles.container}>{children}</h1>
    );
  }

  return (
    <li className={styles.container}>{children}</li>
  );
}

export default function Card({
  children,
  holding,
  isHeading,
  zone,
}: React.PropsWithChildren<Props>) {
  const days = holding.updated
    ? differenceInDays(date(zone), parseISO(holding.updated))
    : null;

  return (
    <Wrapper isHeading={isHeading}>
      <span className={styles.upper}>
        <span className={styles.type}>{holding.type.replace(/_/g, ' ')}</span>
        <span className={styles.number}>**** {holding.number || '0000'}</span>
      </span>
      <span className={styles.middle}>
        <span className={styles.title}>{holding.name}</span>
      </span>
      <span className={styles.lower}>
        <span className={styles.label}>
          <span>
            Baseline Balance &ndash; Updated
          </span>
          {days === null && (
            <span className={styles.strong}>too long ago</span>
          )}
          {days !== null && (
            <span className={styles.strong}>
              {days === 0 ? 'Today' : `${days} day${days > 1 ? 's' : ''} ago`}
            </span>
          )}
          {(days === null || (days !== null && days > 4)) && (
            <Flag className={styles.warning} />
          )}
        </span>
        <span className={styles.balance}>
          {Number(holding.balance) < 0 ? '-' : ''}${currency(holding.balance)}
        </span>
      </span>
      {children}
    </Wrapper>
  );
};

const styles = tw({
  container: `
    relative
    flex flex-col justify-between gap-6
    px-4 pt-5 pb-4
    bg-(--foreground)
    text-(--background)

    md:px-4
    md:pt-4

    ${CARD_RADIUS}
  `,
  upper: `
    relative
    flex items-center gap-3
    px-0.25
    uppercase
    font-light
    leading-[1]
    text-sm
    tracking-wide

    md:text-xs
  `,
  number: `
    absolute top-0 right-0
    font-mono
  `,
  middle: `
    py-4
  `,
  title: `
    text-3xl
    font-extralight
    whitespace-wrap

    md:text-2xl
  `,
  lower: `
    relative
    flex flex-col items-start justify-center gap-1
    w-full

    md:gap-0
  `,
  label: `
    flex items-center gap-1
    font-light
    text-xs
    tracking-wider
    uppercase

    md:text-tiny
  `,
  strong: `
    font-bold
  `,
  warning: `
    inline-block ml-1
    w-3 h-3
    stroke-2 stroke-red-400
    fill-red-400

    md:w-2.5
    md:h-2.5
  `,
  balance: `
    flex flex-col
    text-4xl
    font-extralight
    tracking-wide

    md:text-3xl
  `,
});
