import { Suspense } from 'react';

import Ui from '@/ui';
import View from '@/views/holding-[id]-[year]-[month]-[day]';

import { get } from './get';

type Params = Promise<{
  id: string;
  year: string;
  month: string;
  day: string;
}>;

type Props = {
  params: Params;
};

async function AsyncView({ params }: Props) {
  const { id, year, month, day } = await params;

  const data = await get(id, year, month, day);

  return <View data={data} />;
};

export default function Page({ params }: Props) {
  return (
    <Suspense fallback={<Ui.Loaders.Spinner />}>
      <AsyncView params={params} />
    </Suspense>
  );
};
