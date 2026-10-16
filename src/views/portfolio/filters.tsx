'use client';

import { Banknote, CreditCard, LandPlot, PiggyBank, Plus, Egg } from 'lucide-react';

import tw, { cs } from '@/styles';

type Props = {
  current: string;
  onClick: (key: string) => void;
};

type IconProps = {
  icon: string;
};

function Icon({ icon }: IconProps) {
  if (icon === 'credit_card') {
    return <CreditCard className={styles.icon} />
  }

  if (icon === 'checking') {
    return <Banknote className={styles.icon} />
  }

  if (icon === 'savings') {
    return <PiggyBank className={styles.icon} />
  }

  if (icon === 'property') {
    return <LandPlot className={styles.icon} />
  }

  if (icon === 'retirement') {
    return <Egg className={styles.icon} />
  }

  if (icon === 'plus') {
    return <Plus className={styles.icon} />
  }

  return null;
};

const FILTERS = [
  {
    key: 'credit_card',
    label: 'Cards',
  },
  {
    key: 'checking',
    label: 'Checking',
  },
  {
    key: 'savings',
    label: 'Savings',
  },
  {
    key: 'property',
    label: 'Property',
  },
  {
    key: 'retirement',
    label: 'Holdings',
  },
  {
    key: 'plus',
    label: '',
  },
];

export default function Filters({ current, onClick }: Props) {
  return (
    <nav className={styles.container}>
      {FILTERS.map(({ key, label }) => (
        <button
          className={
            cs(
              styles.filter,
              current === key && styles.highlighted,
              current !== key && styles.muted,
              key === 'plus' && styles.cta,
            )
          }
          key={key}
          onClick={() => onClick(key)}
          type="button"
        >
          <Icon icon={key} />
          <span
            className={
              cs(
                styles.label,
                current === key && styles.full,
              )
            }
          >
            {label}
          </span>
        </button>
      ))}
    </nav>
  );
};

const styles = tw({
  container: `
    flex items-center justify-center gap-2
    w-full
  `,
  filter: `
    flex items-center justify-center
    min-w-10 w-auto h-10
    p-2
    border
    rounded-md

    motion-safe:duration-300

    hover:bg-black
    hover:text-white
    hover:dark:bg-white
    hover:dark:text-black
  `,
  highlighted: `
    w-full
    border-transparent
    bg-lime-300
    text-black
  `,
  muted: `
    border-current/6
    bg-(--foreground)/2
  `,
  cta: `
    border-transparent
    bg-lime-300
    text-black
  `,
  icon: `
    shrink-0
    w-4 h-4
    stroke-2
  `,
  label: `
    inline-block
    w-0
    overflow-hidden
    text-tiny
    whitespace-nowrap
    uppercase
    tracking-wide
  `,
  full: `
    pl-2
    w-full
  `,
})
