import { Suspense } from 'react';

import Ui from '@/ui';
import View from '@/views/holding-[holding]-budget';

import { get } from './get';

type Params = Promise<{
  holding: string;
}>;

type Props = {
  params: Params;
};

async function AsyncView({ params }: Props) {
  const { holding } = await params;

  const data = await get(holding);

  return <View data={data} />;
};

export default function Page({ params }: Props) {
  return (
    <Suspense fallback={<Ui.Loaders.Spinner />}>
      <AsyncView params={params} />
    </Suspense>
  );
};
