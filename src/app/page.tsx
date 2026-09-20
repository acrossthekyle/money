import { Suspense } from 'react';

import Ui from '@/ui';
import View from '@/views/index';

import { get } from './get';
import type { SearchParams } from './types';

type Props = {
  searchParams: Promise<SearchParams>;
};

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;

  const data = await get(params);

  return (
    <Suspense fallback={<Ui.Loaders.Spinner />}>
      <View data={data} />
    </Suspense>
  );
}
