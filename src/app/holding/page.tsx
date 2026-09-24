import { Suspense } from 'react';

import Ui from '@/ui';
import View from '@/views/holding';

export default function Page() {
  return (
    <Suspense fallback={<Ui.Loaders.Spinner />}>
      <View />
    </Suspense>
  );
};
