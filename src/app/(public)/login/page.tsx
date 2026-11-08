import type { Metadata } from 'next';
import { Suspense } from 'react';

import Ui from '@/ui';
import View from '@/views/login';

export const metadata: Metadata = {
  title: 'Login',
};

export default function Page() {
  return (
    <Suspense fallback={<Ui.Loaders.Spinner />}>
      <View />
    </Suspense>
  );
}
