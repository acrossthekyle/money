'use client';

import { EllipsisVertical } from 'lucide-react';

import tw from '@/styles';

type Props = {
  onClick: () => void;
};

export default function Menu({ onClick }: Props) {
  return (
    <button className={styles.container} onClick={onClick} type="button">
      <EllipsisVertical className={styles.icon} />
    </button>
  );
};

const styles = tw({
  container: `
    absolute top-2 right-2
    p-2
  `,
  icon: `
    size-4.5
    stroke-2 stroke-current/82.5

    sm:size-5
  `,
});
