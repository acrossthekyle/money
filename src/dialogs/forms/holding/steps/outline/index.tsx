'use client';

import { Actions, Container } from '../../../components';
import type { Data } from '../../types';
import { Outline } from '../components';

type Props = {
  data: Data;
  isActive: boolean;
  onEdit: (step: string) => void;
};

export default function Section({
  children,
  data,
  isActive,
  onEdit,
}: React.PropsWithChildren<Props>) {
  return (
    <Container isActive={isActive}>
      <Outline
        data={data}
        onEdit={onEdit}
      />
      <Actions>
        {children}
      </Actions>
    </Container>
  );
};
