'use client';

import { Trash } from 'lucide-react';

import tw from '@/styles';

import {
  Action,
  Icon,
} from '../components';

type Props = {
  disabled?: boolean;
  onClick: () => void;
};

export default function Delete({ disabled, onClick }: Props) {
  return (
    <Action
      disabled={disabled}
      onClick={onClick}
      mode="secondary"
    >
      <Icon>
        <Trash className={styles.icon} />
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
