'use client';

import tw from '@/styles';

import {
  Action,
  Container,
} from '../../../components';
import type { Data } from '../../types';
import { Outline } from '../components';

type Props = {
  data: Data;
  isActive: boolean;
  onEdit: (step: string) => void;
  onCancel: () => void;
};

export default function Section({
  data,
  isActive,
  onEdit,
  onCancel,
}: Props) {
  return (
    <Container isActive={isActive}>
      <Outline
        data={data}
        onEdit={onEdit}
      />
      <Action
        className={styles.action}
        onClick={onCancel}
      >
        Cancel
      </Action>
    </Container>
  );
};

const styles = tw({
  action: `
    !bg-black
    !text-white
  `,
});
