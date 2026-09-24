'use client';

import { CircleQuestionMark } from 'lucide-react';

import { useInfo } from '@/hooks';
import tw from '@/styles';

export default function Info() {
  const { onInfo } = useInfo();

  return (
    <button onClick={onInfo} title="About Project Basalt" type="button">
      <CircleQuestionMark className={styles.icon} />
    </button>
  );
};

const styles = tw({
  icon: `
    w-5 h-5
    stroke-1
  `,
});
