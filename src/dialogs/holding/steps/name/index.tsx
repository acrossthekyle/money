'use client';

import tw, { cs } from '@/styles';
import Ui from '@/ui';

import { useModel } from './model';

type Props = {
  header: string;
  isActive: boolean;
  isEditing: boolean;
  onNext: (key: string, value: string) => void;
  placeholder: string;
  value: string;
};

export default function Section({
  header,
  isActive,
  isEditing,
  onNext,
  placeholder,
  value,
}: Props) {
  const { handleOnChange, isBlocked, name } = useModel(value);

  return (
    <section className={cs(styles.section, isActive && styles.visible)}>
      <h2 className={styles.header}>
        {header}
      </h2>
      <div className={styles.field}>
        <Ui.Form.Input
          value={name}
          maxLength={48}
          name="name"
          onChange={handleOnChange}
          placeholder={placeholder}
          type="text"
        />
      </div>
      <button
        className={styles.cta}
        disabled={isBlocked}
        onClick={() => onNext('name', name)}
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
    flex flex-col items-center
    px-4
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
