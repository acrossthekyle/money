'use client';

import type { CalendarDay } from '@/types';
import Ui from '@/ui';

import { useModel } from './model';
import Table from './table';
import { getItems } from './utils';

type Props = {
  days: CalendarDay[];
};

export default function Upcoming({ days }: Props) {
  const { handleOnAdd, handleOnEdit } = useModel();

  const iterables = getItems(days);

  if (iterables.length === 0) {
    return null;
  }

  return (
    <Ui.Components.Card.Container>
      <Ui.Components.Card.Header>
        <Ui.Components.Card.Title>
          Upcoming Transactions
        </Ui.Components.Card.Title>
        <Ui.Components.Card.Subtitle>
          {iterables.length} remaining
        </Ui.Components.Card.Subtitle>
      </Ui.Components.Card.Header>
      <Table items={iterables} onClick={handleOnEdit} />
      <Ui.Components.Button isGhost onClick={handleOnAdd}>
        Add Transaction
      </Ui.Components.Button>
    </Ui.Components.Card.Container>
  );
};
