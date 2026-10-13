'use client';

import { Banknote, CreditCard, LandPlot, PiggyBank, Plus, Egg } from 'lucide-react';

import tw, { cs } from '@/styles';

import { useModel } from './model';

type Props = {
  header: string;
  isActive: boolean;
  isEditing: boolean;
  onNext: (key: string, value: string) => void;
  value: string;
};

export default function Section({
  header,
  isActive,
  isEditing,
  onNext,
  value,
}: Props) {
  const { handleOnChange, isBlocked, type } = useModel(value);

  return (
    <section className={cs(styles.section, isActive && styles.visible)}>
      <h2 className={styles.header}>
        {header}
      </h2>
      <div className={styles.field}>
        <button
          className={cs(styles.type, type === 'credit_card' && styles.active)}
          onClick={() => handleOnChange('credit_card')}
          type="button"
        >
          <CreditCard className={styles.icon} />
          <span>Card</span>
        </button>
        <button
          className={cs(styles.type, type === 'savings' && styles.active)}
          onClick={() => handleOnChange('savings')}
          type="button"
        >
          <PiggyBank className={styles.icon} />
          <span>Savings</span>
        </button>
        <button
          className={cs(styles.type, type === 'checking' && styles.active)}
          onClick={() => handleOnChange('checking')}
          type="button"
        >
          <Banknote className={styles.icon} />
          <span>Checking</span>
        </button>
        <button
          className={cs(styles.type, type === 'retirement' && styles.active)}
          onClick={() => handleOnChange('retirement')}
          type="button"
        >
          <Egg className={styles.icon} />
          <span>Retirement Holding</span>
        </button>
        <button
          className={cs(styles.type, type === 'property' && styles.active)}
          onClick={() => handleOnChange('property')}
          type="button"
        >
          <LandPlot className={styles.icon} />
          <span>Property/Asset</span>
        </button>
      </div>
      <button
        className={styles.cta}
        disabled={isBlocked}
        onClick={() => onNext('type', type)}
        type="button"
      >
        {isEditing ? 'Save and Review' : 'Next'}
      </button>
    </section>
  );
};

const styles = tw({
  section: `
    flex-col items-center gap-4
    hidden
  `,
  visible: `
    !flex
  `,
  header: `
    block
    mb-1
    text-center text-sm
    w-full
  `,
  field: `
    relative
    flex justify-center gap-2.5
    flex-wrap
    px-4 mb-2
  `,
  type: `
    inline-flex items-center gap-2
    bg-white
    text-black
    rounded-md
    text-tiny
    uppercase
    py-1.25 px-2
    whitespace-nowrap
  `,
  active: `
    !bg-lime-300
  `,
  icon: `
    shrink-0
    w-4 h-4
    stroke-2
  `,
  cta: `
    flex items-center justify-center gap-2
    w-full
    border border-current/12
    bg-white
    rounded-lg
    px-4 py-2
    text-tiny text-black
    uppercase
    font-medium
    tracking-wide

    motion-safe:duration-300

    disabled:opacity-50
    disabled:!cursor-not-allowed
  `,
});
