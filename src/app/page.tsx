import { Suspense } from 'react';

import Ui from '@/ui';
import View from '@/views/index';

import { get } from './get';
import type { SearchParams } from './types';

type Props = {
  searchParams: Promise<SearchParams>;
};

async function DataView({
  searchParams,
}: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;

  const data = await get(params);

  return <View data={data} />;
};

export default function Page({ searchParams }: Props) {
  return (
    <Suspense fallback={<Ui.Loaders.Spinner />}>
      <DataView searchParams={searchParams} />
    </Suspense>
  );
};
