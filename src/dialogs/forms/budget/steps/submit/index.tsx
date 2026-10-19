'use client';

import type { Dateable, Holding } from '@/types';

import {
  Action,
  Actions,
  Container,
} from '../../../components';
import type { Data } from '../../types';
import { Outline } from '../components';

type Props = {
  data: Data;
  date?: Dateable;
  holdings: Holding[];
  isActive: boolean;
  isEditing: boolean;
  onEdit: (step: string) => void;
  onSubmit: () => void;
  update: string;
};

export default function Section({
  children,
  data,
  date,
  holdings,
  isActive,
  isEditing,
  onEdit,
  onSubmit,
  update,
}: React.PropsWithChildren<Props>) {
  return (
    <Container isActive={isActive}>
      <Outline
        data={data}
        date={date}
        holdings={holdings}
        isEditing={isEditing}
        onEdit={onEdit}
        update={update}
      />
      <Actions>
        {children}
        <Action
          isSubmit
          onClick={onSubmit}
        >
          {isEditing ? 'update' : 'add'}
        </Action>
      </Actions>
    </Container>
  );
};
