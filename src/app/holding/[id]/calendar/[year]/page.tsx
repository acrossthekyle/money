import { Suspense } from 'react';

import Ui from '@/ui';
import View from '@/views/holding-[id]-calendar-[year]';

import { get } from './get';

type Params = Promise<{
  id: string;
  year: string;
}>;

type Props = {
  params: Params;
};

async function AsyncView({ params }: Props) {
  const { id, year } = await params;

  const data = await get(id, year);

  return <View data={data} />;
};

export default function Page({ params }: Props) {
  return (
    <Suspense fallback={<Ui.Loaders.Spinner />}>
      <AsyncView params={params} />
    </Suspense>
  );
};
