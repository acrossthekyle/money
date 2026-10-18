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
      {FILTERS.map(({ key }) => (
        <button
          className={
            cs(
              styles.filter,
              current === key && styles.highlighted,
              current !== key && styles.muted,
              key === 'plus' && styles.add,
            )
          }
          key={key}
          onClick={() => onClick(key)}
          type="button"
        >
          <Icon icon={key} />
        </button>
      ))}
    </nav>
  );
};

const styles = tw({
  container: `
    grid grid-cols-6 gap-2
    w-full
  `,
  filter: `
    flex items-center justify-center
    aspect-square
    border
    rounded-4xl

    motion-safe:duration-300

    hover:bg-(--foreground)
    hover:text-(--background)

    md:rounded-2xl
  `,
  highlighted: `
    w-full
    border-transparent
    bg-(--foreground)
    text-(--background)
  `,
  muted: `
    border-current/6
    bg-(--foreground)/2
  `,
  add: `
    border-transparent
    bg-yellow-300
    text-black
  `,
  icon: `
    shrink-0
    w-5 h-5
    stroke-2

    md:w-4
    md:h-4
  `,
})
