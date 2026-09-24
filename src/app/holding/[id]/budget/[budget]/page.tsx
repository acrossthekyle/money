import { Suspense } from 'react';

import Ui from '@/ui';
import View from '@/views/holding-[id]-budget-[budget]';

import { get } from './get';

type Params = Promise<{
  budget: string;
  id: string;
}>;

type Props = {
  params: Params;
};

async function AsyncView({ params }: Props) {
  const { id, budget } = await params;

  const data = await get(id, budget);

  return <View data={data} />;
};

export default function Page({ params }: Props) {
  return (
    <Suspense fallback={<Ui.Loaders.Spinner />}>
      <AsyncView params={params} />
    </Suspense>
  );
};
