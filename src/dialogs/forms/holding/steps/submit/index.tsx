'use client';

import {
  Action,
  Actions,
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
  children,
  data,
  isActive,
  isEditing,
  onEdit,
  onSubmit,
}: React.PropsWithChildren<Props>) {
  return (
    <Container isActive={isActive}>
      <Outline
        data={data}
        onEdit={onEdit}
      />
      <Actions>
        {children}
        <Action isSubmit onClick={onSubmit}>
          {isEditing ? 'update' : 'add'}
        </Action>
      </Actions>
    </Container>
  );
};
