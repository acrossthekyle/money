import { getMonth, getYear } from 'date-fns';
import type { Metadata } from 'next';
import { Suspense } from 'react';

import { calendar } from '@/algorithms/calendar';
import { preferences } from '@/algorithms/preferences';
import { all as allBudgets } from '@/getters/budgets';
import { all as allHoldings } from '@/getters/holdings';
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

  const { saved } = await preferences(params.view as string || null);
  const { budgets } = await allBudgets();
  const { holdings } = await allHoldings();
  const { days } = await calendar(
    holdings,
    budgets,
    saved,
    month,
    year,
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
