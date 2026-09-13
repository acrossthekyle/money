'use client';

import { Dialogs } from '@/dialogs';
import tw from '@/styles';
import type { Day, Holding } from '@/types';
import Ui from '@/ui';

import Add from './add';
import Calendar from './calendar';
import { Budgets, Options, OptionsSection } from './components';
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
    handleOnAddHolding,
    handleOnCloseMore,
    handleOnEditBudget,
    handleOnMore,
    handleOnReload,
    message,
  } = useModel(data.days);

  if (data.holdings.length === 0) {
    return (
      <>
        <main className={styles.container}>
          <Ui.Alerts.Prompt onClick={handleOnAddHolding} />
        </main>
        <Dialogs.Holding onDone={handleOnReload} />
      </>
    );
  }

  return (
    <>
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
          date={date}
          days={data.days}
          onAdd={handleOnAddBudget}
          onEdit={handleOnEditBudget}
          onMore={handleOnMore}
        />
        <section className={styles.budgets}>
          <Budgets
            balance={balance}
            budgets={budgets}
            date={date}
            onEdit={handleOnEditBudget}
          />
        </section>
      </main>
      <Dialogs.Budget
        budget={budget}
        date={date}
        holdings={data.holdings}
        onDone={handleOnReload}
        parent={data.view}
      />
      <Dialogs.More>
        <Budgets
          balance={balance}
          budgets={budgets}
          canClose
          date={date}
          onClose={handleOnCloseMore}
          onEdit={handleOnEditBudget}
        />
      </Dialogs.More>
      <Ui.Alerts.Message value={message} />
    </>
  );
};

const styles = tw({
  container: `
    p-4 pb-0
  `,
  budgets: `
    block

    md:hidden
  `,
});
