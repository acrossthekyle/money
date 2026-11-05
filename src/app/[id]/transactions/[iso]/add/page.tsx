import type { Metadata } from 'next';
import { Suspense } from 'react';

import Ui from '@/ui';
import View from '@/views/budget';

export const metadata: Metadata = {
  title: `Add`,
  description: ``,
};

export default function Page() {
  return (
    <Suspense fallback={<Ui.Loaders.Spinner />}>
      <View />
    </Suspense>
  );
};
