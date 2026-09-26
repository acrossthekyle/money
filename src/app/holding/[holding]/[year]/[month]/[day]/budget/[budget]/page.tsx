import { Suspense } from 'react';

import Ui from '@/ui';
import View from '@/views/holding-[holding]-[year]-[month]-[day]-budget-[budget]';

import { get } from './get';

type Params = Promise<{
  budget: string;
  holding: string;
  year: string;
  month: string;
  day: string;
}>;

type Props = {
  params: Params;
};

async function AsyncView({ params }: Props) {
  const { day, budget, holding, month, year } = await params;

  const data = await get(holding, budget, year, month, day);

  return <View data={data} />;
};

export default function Page({ params }: Props) {
  return (
    <Suspense fallback={<Ui.Loaders.Spinner />}>
      <AsyncView params={params} />
    </Suspense>
  );
};
