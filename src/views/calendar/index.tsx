'use client';

import { OVERVIEWS } from '@/constants';
import { Dialogs } from '@/dialogs';
import tw from '@/styles';
import type { Day, Holding } from '@/types';
import Ui from '@/ui';

import Add from './add';
import Back from './back';
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
    <main>
      <Options>
        <OptionsSection className={styles.section}>
          <Back />
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
      />
      <Ui.Alerts.Message value={message} />
    </main>
  );
};

const styles = tw({
  section: `
    grid grid-cols-2 gap-4

    md:gap-2
    md:flex
    md:flex-row
  `,
});
