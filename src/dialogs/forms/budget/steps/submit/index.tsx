'use client';

import type { Dateable, Holding } from '@/types';

import {
  Action,
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
  data,
  date,
  holdings,
  isActive,
  isEditing,
  onEdit,
  onSubmit,
  update,
}: Props) {
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
      <Action
        isSubmit
        onClick={onSubmit}
      >
        Looks Good, {isEditing ? 'update' : 'add'} it!
      </Action>
    </Container>
  );
};
