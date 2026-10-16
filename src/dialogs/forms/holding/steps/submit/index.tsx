'use client';

import {
  Action,
  Container,
} from '../../../components';
import type { Data } from '../../types';
import { Outline } from '../components';

type Props = {
  data: Data;
  isActive: boolean;
  isEditing: boolean;
  onEdit: (step: string) => void;
  onSubmit: () => void;
};

export default function Section({
  data,
  isActive,
  isEditing,
  onEdit,
  onSubmit,
}: Props) {
  return (
    <Container isActive={isActive}>
      <Outline
        data={data}
        onEdit={onEdit}
      />
      <Action isSubmit onClick={onSubmit}>
        Looks Good, {isEditing ? 'update' : 'add'} it!
      </Action>
    </Container>
  );
};
