'use client';

import { Undo2 } from 'lucide-react';

import tw from '@/styles';

import {
  Action,
  Icon,
} from '../components';

type Props = {
  onClick: () => void;
};

export default function Cancel({ onClick }: Props) {
  return (
    <Action onClick={onClick} mode="secondary">
      <Icon>
        <Undo2 className={styles.icon} />
      </Icon>
    </Action>
  );
};

const styles = tw({
  icon: `
    w-3.5 h-3.5
    stroke-2
  `,
});
