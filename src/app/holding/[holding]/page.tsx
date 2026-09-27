import { Suspense } from 'react';

import type { SearchParams } from '@/types';
import Ui from '@/ui';
import View from '@/views/holding-[holding]';

import { get } from './get';

type Params = Promise<{
  holding: string;
}>;

type Props = {
  params: Params;
  searchParams: SearchParams;
};

async function AsyncView({ params, searchParams }: Props) {
  const { holding } = await params;
  const { ref } = await searchParams;

  const data = await get(holding, ref as string);

  return <View data={data} />;
};

export default function Page({ params, searchParams }: Props) {
  return (
    <Suspense fallback={<Ui.Loaders.Spinner />}>
      <AsyncView params={params} searchParams={searchParams} />
    </Suspense>
  );
};
