import type { Metadata } from 'next';
import { Suspense } from 'react';

import { IS_DEMO } from '@/constants';
import Ui from '@/ui';
import View from '@/views/login';

export const metadata: Metadata = {
  title: 'Login',
};

export default function Page() {
  return (
    <Suspense fallback={<Ui.Loaders.Spinner />}>
      <View isDemo={IS_DEMO} />
    </Suspense>
  );
}
