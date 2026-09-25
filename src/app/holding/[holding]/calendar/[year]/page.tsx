import { Suspense } from 'react';

import Ui from '@/ui';
import View from '@/views/holding-[holding]-calendar-[year]';

import { get } from './get';

type Params = Promise<{
  holding: string;
  year: string;
}>;

type Props = {
  params: Params;
};

async function AsyncView({ params }: Props) {
  const { holding, year } = await params;

  const data = await get(holding, year);

  return <View data={data} />;
};

export default function Page({ params }: Props) {
  return (
    <Suspense fallback={<Ui.Loaders.Spinner />}>
      <AsyncView params={params} />
    </Suspense>
  );
};
