import { getMonth, getYear } from 'date-fns';
import { Suspense } from 'react';

import { all as allHoldings } from '@/actions/holdings/all';
import { calendar } from '@/actions/calendar';
import Ui from '@/ui';
import View from '@/views/calendar';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

type Props = {
  searchParams: SearchParams;
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
