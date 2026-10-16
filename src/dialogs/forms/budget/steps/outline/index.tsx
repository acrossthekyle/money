'use client';

import tw from '@/styles';
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
  onCancel: () => void;
  onEdit: (step: string) => void;
  update: string;
};

export default function Section({
  data,
  date,
  holdings,
  isActive,
  onCancel,
  onEdit,
  update,
}: Props) {
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
