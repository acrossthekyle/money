'use client';

import type { Dateable, Holding } from '@/types';

import { Actions, Container } from '../../../components';
import type { Data } from '../../types';
import { Outline } from '../components';

type Props = {
  data: Data;
  date?: Dateable;
  holdings: Holding[];
  isActive: boolean;
  onEdit: (step: string) => void;
  update: string;
};

export default function Section({
  children,
  data,
  date,
  holdings,
  isActive,
  onEdit,
  update,
}: React.PropsWithChildren<Props>) {
  return (
    <Container isActive={isActive}>
      <Outline
        data={data}
        date={date}
        holdings={holdings}
        isEditing={false}
        onEdit={onEdit}
        update={update}
      />
      <Actions>
        {children}
      </Actions>
    </Container>
  );
};
