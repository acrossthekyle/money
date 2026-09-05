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
    holding,
    message,
  } = useModel(data.holdings, data.view);

  return (
    <>
      <Container>
        <ContainerSection>
          <ContainerSectionItems>
            <Forecast holdings={data.holdings} view={data.view} />
            <Edit onClick={handleOnEditHolding} view={data.view} />
            <Add onClick={handleOnAddHolding} />
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
