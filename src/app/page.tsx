import { Suspense } from 'react';

import Ui from '@/ui';
import View from '@/views/index';

import { get } from './get';

async function AsyncView() {
  const data = await get();

  return <View data={data} />;
};

export default function Page() {
  return (
    <Suspense fallback={<Ui.Loaders.Spinner />}>
      <AsyncView />
    </Suspense>
  );
};
