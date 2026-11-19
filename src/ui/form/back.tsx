'use client';

import { ArrowLeft } from 'lucide-react';

import tw from '@/styles';

type Props = {
  isDisabled?: boolean;
  onBack: () => void;
};

export default function Back({
  isDisabled,
  onBack,
}: Props) {
  return (
    <button
      className={styles.container}
      disabled={isDisabled}
      onClick={onBack}
      type="button"
    >
      <ArrowLeft className={styles.arrow} />
    </button>
  );
};

const styles = tw({
  container: `
    absolute top-4 right-4
    flex items-center justify-center
    w-10 h-10
    bg-(--background)
    border border-current/22.5
    rounded-full

    disabled:opacity-50
    disabled:!cursor-default

    sm:w-9
    sm:h-9
  `,
  arrow: `
    size-4
    stroke-2

    sm:size-3.5
  `,
});
