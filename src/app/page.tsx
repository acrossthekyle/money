import { Suspense } from 'react';

import { metrics } from '@/algorithms/metrics';
import { all as allBudgets } from '@/getters/budgets';
import { all as allHoldings } from '@/getters/holdings';
import { get as preferences } from '@/getters/preferences';
import Ui from '@/ui';
import View from '@/views/index';

export default async function Page() {
  const { holdings } = await allHoldings();
  const { budgets } = await allBudgets();
  const { zone } = await preferences();
  const calculations = await metrics(holdings, budgets, zone);

  return (
    <Suspense fallback={<Ui.Loaders.Spinner />}>
      <View
        data={{
          holdings,
          metrics: calculations,
        }}
      />
    </Suspense>
  );
}
