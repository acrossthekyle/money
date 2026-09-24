import { Suspense } from 'react';

import Ui from '@/ui';
import View from '@/views/holdings';

import { get } from './get';

async function DataView() {
  const data = await get();

  return <View data={data} />;
};

export default function Page() {
  return (
    <Suspense fallback={<Ui.Loaders.Spinner />}>
      <DataView />
    </Suspense>
  );
};
