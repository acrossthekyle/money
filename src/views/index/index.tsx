'use client';

import type { Day, Holding } from '@/types';

import Add from './add';
import Calendar from './calendar';
import {
  Container,
  ContainerSection,
  ContainerSectionItems,
} from './components';
import Dates from './dates';
import Dialogs from './dialogs';
import Edit from './edit';
import Forecast from './forecast';
import Message from './message';
import { useModel } from './model';
import Prompt from './prompt';

type Props = {
  data: {
    holdings: Holding[];
    days: Array<Day[]>;
    view: string;
  };
};

export default function View({ data }: Props) {
  const {
    budget,
    date,
    handleOnAddBudget,
    handleOnEditBudget,
    handleOnAddHolding,
    handleOnEditHolding,
    handleOnReload,
    hasHoldings,
    holding,
    message,
  } = useModel(data.holdings, data.view);

  return (
    <>
      {!hasHoldings && (
        <Prompt onClick={handleOnAddHolding} />
      )}
      <Container>
        <ContainerSection>
          <ContainerSectionItems>
            <Forecast holdings={data.holdings} view={data.view} />
            <Edit onClick={handleOnEditHolding} view={data.view} />
            <Add onClick={handleOnAddHolding} type="holding" />
            <Add onClick={handleOnAddBudget} type="budget" />
          </ContainerSectionItems>
        </ContainerSection>
        <ContainerSection>
          <ContainerSectionItems>
            <Dates />
          </ContainerSectionItems>
        </ContainerSection>
      </Container>
      <Calendar
        days={data.days}
        canInteract={!data.view.includes('overview')}
        onAdd={handleOnAddBudget}
        onEdit={handleOnEditBudget}
      />
      <Dialogs.Budget
        budget={budget}
        date={date}
        holdings={data.holdings}
        onDone={handleOnReload}
        parent={data.view}
      />
      <Dialogs.Holding
        holding={holding}
        onDone={handleOnReload}
      />
      <Message value={message} />
    </>
  );
};
