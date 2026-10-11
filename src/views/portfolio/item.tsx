import { Eye, Pen, TriangleAlert } from 'lucide-react';
import Link from 'next/link';

import tw, { cs } from '@/styles';
import type { Dateable, Holding } from '@/types';
import { currency } from '@/utils';

type Props = {
  holding: Holding;
  onManage: (holding: Holding) => void;
};

export default function Item({ holding, onManage }: Props) {
  return (
    <>
      <span className={styles.upper}>
        <span className={styles.type}>{holding.type.replace(/_/g, ' ')}</span>
        <span className={styles.currency}>USD</span>
        <span className={styles.number}>**** {holding.number || '0000'}</span>
      </span>
      <span className={styles.middle}>
        <span className={styles.title}>{holding.name}</span>
      </span>
      <span className={styles.lower}>
        <span className={styles.label}>
          <span>Baseline Balance &mdash; Last Updated</span>
          <span className={styles.strong}>7 days ago</span>
          <TriangleAlert className={styles.warning} />
        </span>
        <span className={styles.balance}>
          {holding.balance < 0 ? '-' : ''}${currency(holding.balance)}
        </span>
      </span>
      <nav aria-label="supplementary navigation" className={styles.options}>
        <Link className={styles.option} href={`/portfolio/${holding.id}`}>
          <Eye className={styles.icon} /> Manage
        </Link>
        <button
          className={styles.option}
          onClick={() => onManage(holding)}
          type="button"
        >
          <Pen className={styles.icon} /> Edit
        </button>
      </nav>
    </>
  );
};

const styles = tw({
  upper: `
    relative
    flex items-center gap-3
    uppercase
    font-geist font-light
    leading-[1]
    text-xs
    tracking-wide
    rounded-t-xl
  `,
  number: `
    absolute top-0 right-0
    font-mono
  `,
  middle: `
    text-xl
    truncate
  `,
  lower: `
    relative
    flex flex-col gap-0 items-start justify-center
    w-full
  `,
  label: `
    flex items-center gap-1
    font-geist font-light
    text-tiny
    tracking-wider
    uppercase
  `,
  strong: `
    font-bold
  `,
  warning: `
    inline-block ml-1
    w-2.5 h-2.5
    stroke-2 stroke-red-300
  `,
  balance: `
    flex flex-col
    text-3xl
    font-extralight
    tracking-wide
  `,
  options: `
    flex gap-4
    w-full
  `,
  option: `
    border border-current/12
    bg-(--foreground)/6
    text-white
    rounded-md
    flex items-center justify-center gap-4
    uppercase
    text-tiny
    p-2 px-4
    w-full

    motion-safe:duration-300

    hover:bg-(--foreground)/100
    hover:text-(--background)
  `,
  icon: `
    w-3 h-3
    stroke-2
  `,
})
