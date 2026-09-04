import { Suspense } from 'react';

import Ui from '@/ui';
import View from '@/views/login';

export default async function Page() {
  return (
    <Suspense fallback={<Ui.Loaders.Spinner />}>
      <View />
    </Suspense>
  );
}
