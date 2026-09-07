import { getMonth, getYear } from 'date-fns';
import type { Metadata } from 'next';
import { Suspense } from 'react';

import { calendar } from '@/algorithms/calendar';
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

  const view = params.view || null;
  const month = params.month || getMonth(new Date);
  const year = params.year || getYear(new Date);

  const { holdings } = await allHoldings();
  const { days, saved } = await calendar(
    view as string | null,
    month as string,
    year as string,
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
