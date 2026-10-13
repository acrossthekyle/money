'use client';

import tw, { cs } from '@/styles';
import type { Holding } from '@/types';

import { useModel } from './model';

type Props = {
  header: string;
  holdings: Holding[];
  isActive: boolean;
  isEditing: boolean;
  onNext: (key: string, value: string) => void;
  value: string;
};

export default function Section({
  header,
  holdings,
  isActive,
  isEditing,
  onNext,
  value,
}: Props) {
  const { handleOnChange, transferee } = useModel(value);

  return (
    <section className={cs(styles.section, isActive && styles.visible)}>
      <h2 className={styles.header}>
        {header}
      </h2>
      <div className={styles.field}>
        {holdings.map((holding) => (
          <button
            className={cs(styles.type, transferee === holding.id && styles.active)}
            key={holding.id}
            onClick={() => handleOnChange(holding.id)}
            type="button"
          >
            <span>{holding.name}</span>
          </button>
        ))}
      </div>
      <button
        className={styles.cta}
        onClick={() => onNext('transferee', transferee)}
        type="button"
      >
        {isEditing ? 'Save and Review' : (transferee ? 'Next' : 'Skip')}
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
