'use client';

import type { Holding } from '@/types';

import { Container } from './components';
import Dates from './dates';
import Holding from './holding';
import Message from './message';
import { useModel } from './model';
import Views from './views';

type Props = {
  holdings: Holding[];
  view: string | null;
};

export default function Filters({ holdings, view }: Props) {
  const { holding, handleDone, handleHolding, handleView, message } = useModel(
    holdings,
  );

  return (
    <>
      <Container>
        <Views holdings={holdings} onHolding={handleHolding} onView={handleView} view={view} />
        <Dates />
      </Container>
      <Holding holding={holding} onDone={handleDone} />
      <Message value={message} />
    </>
  );
};
