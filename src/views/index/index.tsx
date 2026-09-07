'use client';

import { Dialogs } from '@/dialogs';
import type { Budget, Holding } from '@/types';
import Ui from '@/ui';

import Holdings from './holdings';
import { useModel } from './model';
import Prompt from './prompt';

type Props = {
  data: {
    budgets: Budget[];
    holdings: Holding[];
  };
};

export default function View({ data }: Props) {
  const {
    date,
    handleOnAddBudget,
    handleOnAddHolding,
    handleOnEditHolding,
    handleOnReload,
    holdings,
    holding,
    message,
    parent,
  } = useModel(data.holdings, data.budgets);

  return (
    <>
      {holdings.length === 0 && (
        <Prompt onClick={handleOnAddHolding} />
      )}
      <Holdings
        onAdd={handleOnAddHolding}
        onBudget={handleOnAddBudget}
        onEdit={handleOnEditHolding}
        items={holdings}
      />
      <Dialogs.Budget
        date={date}
        holdings={data.holdings}
        onDone={handleOnReload}
        parent={parent}
      />
      <Dialogs.Holding
        holding={holding}
        onDone={handleOnReload}
      />
      <Ui.Alerts.Message value={message} />
    </>
  );
};
