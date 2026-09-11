'use client';

import { Dialogs } from '@/dialogs';
import tw from '@/styles';
import type { Day, Holding } from '@/types';
import Ui from '@/ui';

import Add from './add';
import Calendar from './calendar';
import { Options, OptionsSection } from './components';
import Dates from './dates';
import Forecast from './forecast';
import { useModel } from './model';

type Props = {
  data: {
    holdings: Holding[];
    days: Day[];
    view: string;
  };
};

export default function View({ data }: Props) {
  const {
    balance,
    budget,
    budgets,
    date,
    handleOnAddBudget,
    handleOnEditBudget,
    handleOnMore,
    handleOnReload,
    message,
  } = useModel();

  return (
    <main className={styles.container}>
      <Options>
        <OptionsSection>
          <Forecast holdings={data.holdings} view={data.view} />
          {data.holdings.length > 0 && (
            <Add onClick={handleOnAddBudget} type="budget" />
          )}
        </OptionsSection>
        <Dates />
      </Options>
      <Calendar
        days={data.days}
        onAdd={handleOnAddBudget}
        onEdit={handleOnEditBudget}
        onMore={handleOnMore}
      />
      <Dialogs.Budget
        budget={budget}
        date={date}
        holdings={data.holdings}
        onDone={handleOnReload}
        parent={data.view}
      />
      <Dialogs.Date
        balance={balance}
        budgets={budgets}
        date={date}
        onAdd={handleOnAddBudget}
        onEdit={handleOnEditBudget}
      />
      <Ui.Alerts.Message value={message} />
    </main>
  );
};

const styles = tw({
  container: `
    p-4
    bg-(--foreground)/5.5
  `,
});
