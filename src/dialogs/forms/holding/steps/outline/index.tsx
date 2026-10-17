'use client';

import { Container } from '../../../components';
import type { Data } from '../../types';
import { Outline } from '../components';

type Props = {
  data: Data;
  isActive: boolean;
  onEdit: (step: string) => void;
};

export default function Section({
  data,
  isActive,
  onEdit,
}: Props) {
  return (
    <Container isActive={isActive}>
      <Outline
        data={data}
        onEdit={onEdit}
      />
    </Container>
  );
};
