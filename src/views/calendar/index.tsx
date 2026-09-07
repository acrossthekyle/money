'use client';

import { Dialogs } from '@/dialogs';
import type { Day, Holding } from '@/types';
import Ui from '@/ui';

import Add from './add';
import Calendar from './calendar';
import {
  Container,
  ContainerSection,
  ContainerSectionItems,
} from './components';
import Dates from './dates';
import Forecast from './forecast';
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
    handleOnReload,
    message,
  } = useModel();

  return (
    <>
      <Container>
        <ContainerSection>
          <ContainerSectionItems>
            <Forecast holdings={data.holdings} view={data.view} />
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
      <Ui.Alerts.Message value={message} />
    </>
  );
};
