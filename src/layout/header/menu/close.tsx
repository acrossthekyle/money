'use client';

import { X } from 'lucide-react';

import tw from '@/styles';

type Props = {
  onClick: () => void;
};

export default function Close({ onClick }: Props) {
  return (
    <button
      aria-label="close"
      className={styles.container}
      onClick={onClick}
      type="button"
    >
      <X className={styles.icon} />
    </button>
  );
};

const styles = tw({
  container: `
    flex justify-center items-end
  `,
  icon: `
    size-7
    stroke-2
  `,
});
