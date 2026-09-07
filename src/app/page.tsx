import { Suspense } from 'react';

import { all as allBudgets } from '@/getters/budgets';
import { all as allHoldings } from '@/getters/holdings';
import Ui from '@/ui';
import View from '@/views/index';

export default async function Page() {
  const { holdings } = await allHoldings();
  const { budgets } = await allBudgets();

  return (
    <Suspense fallback={<Ui.Loaders.Spinner />}>
      <View
        data={{
          budgets,
          holdings,
        }}
      />
    </Suspense>
  );
}
