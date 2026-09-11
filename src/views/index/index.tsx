'use client';

import { Dialogs } from '@/dialogs';
import tw from '@/styles';
import type { Holding, Metric } from '@/types';
import Ui from '@/ui';

import Holdings from './holdings';
import { useModel } from './model';
import Prompt from './prompt';
import Snapshots from './snapshots';

type Props = {
  data: {
    holdings: Holding[];
    metrics: Metric[];
  };
};

export default function View({ data }: Props) {
  const {
    date,
    handleOnAddBudget,
    handleOnAddHolding,
    handleOnEditHolding,
    handleOnReload,
    holding,
    message,
    parent,
  } = useModel();

  return (
    <>
      <main className={styles.container}>
        <Holdings
          onAdd={handleOnAddHolding}
          onBudget={handleOnAddBudget}
          onEdit={handleOnEditHolding}
          metrics={data.metrics}
        />
        <Snapshots metrics={data.metrics} />
        <Ui.Alerts.Message value={message} />
        {data.holdings.length === 0 && (
          <Prompt onClick={handleOnAddHolding} />
        )}
      </main>
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
    </>
  );
};

const styles = tw({
  container: `
    flex flex-col gap-4
    p-4

    md:grid
    md:grid-cols-24
  `,
});
