import { Suspense } from 'react';

import { get } from '@/getters/root';
import Ui from '@/ui';
import View from '@/views/portfolio';

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
