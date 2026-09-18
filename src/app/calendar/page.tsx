import { getMonth, getYear } from 'date-fns';
import type { Metadata } from 'next';
import { Suspense } from 'react';

import { calendar } from '@/algorithms/calendar';
import { all as allBudgets } from '@/getters/budgets';
import { all as allHoldings } from '@/getters/holdings';
import { get as preferences } from '@/getters/preferences';
import Ui from '@/ui';
import View from '@/views/calendar';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

type Props = {
  searchParams: SearchParams;
};

export const metadata: Metadata = {
  title: 'Calendar',
};

export default async function Page({
  searchParams,
}: Props) {
  const params = await searchParams;

  const month = Number(params.month || getMonth(new Date));
  const year = Number(params.year || getYear(new Date));

  const { holdings } = await allHoldings();
  const { saved, zone } = await preferences(params.view as string || null, holdings);
  const { budgets } = await allBudgets();
  const { days } = await calendar(
    holdings,
    budgets,
    saved,
    month,
    year,
    zone,
  );

  return (
    <Suspense fallback={<Ui.Loaders.Spinner />}>
      <View
        data={{
          holdings,
          days,
          view: saved,
        }}
      />
    </Suspense>
  );
}
