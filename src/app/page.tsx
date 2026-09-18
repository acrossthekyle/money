import { format, getMonth, getYear } from 'date-fns';
import { Suspense } from 'react';

import { calendar as getCalendar } from '@/algorithms/calendar';
import { metrics } from '@/algorithms/metrics';
import { DATE_FORMAT } from '@/constants';
import { get as getBudgets } from '@/getters/budgets';
import { get as getHoldings } from '@/getters/holdings';
import { get as getPreferences } from '@/getters/preferences';
import Ui from '@/ui';
import { date } from '@/utils';
import View from '@/views/index';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

type Props = {
  searchParams: SearchParams;
};

export default async function Page({
  searchParams,
}: Props) {
  const params = await searchParams;

  const { holdings } = await getHoldings();
  const { budgets } = await getBudgets();

  const { saved, zone } = await getPreferences(params.view as string || null, holdings);

  const current = String(params.date || format(date(zone), DATE_FORMAT));
  const month = Number(params.month || getMonth(date(zone)));
  const year = Number(params.year || getYear(date(zone)));

  const { netWorth } = await metrics(holdings);
  const calendar = await getCalendar(
    holdings,
    budgets,
    saved,
    zone,
  );

  return (
    <Suspense fallback={<Ui.Loaders.Spinner />}>
      <View
        data={{
          current: {
            calendar: `${month}-${year}`,
            date: current,
          },
          calendar,
          holdings,
          metrics: {
            netWorth,
          },
          saved,
        }}
      />
    </Suspense>
  );
}
