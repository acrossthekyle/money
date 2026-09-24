import { Suspense } from 'react';

import Ui from '@/ui';
import View from '@/views/holding-[id]-edit';

import { get } from './get';

type Params = Promise<{
  id: string;
}>;

type Props = {
  params: Params;
};

async function AsyncView({ params }: Props) {
  const { id } = await params;

  const data = await get(id);

  return <View data={data} />;
};

export default function Page({ params }: Props) {
  return (
    <Suspense fallback={<Ui.Loaders.Spinner />}>
      <AsyncView params={params} />
    </Suspense>
  );
};
