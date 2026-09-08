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
    budget,
    date,
    handleOnAddBudget,
    handleOnEditBudget,
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
        canInteract={!Object.values(OVERVIEWS).includes(data.view)}
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
