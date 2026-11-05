import type { Metadata } from 'next';
import { Suspense } from 'react';

import Ui from '@/ui';
import View from '@/views/login';

export const metadata: Metadata = {
  title: 'Login',
};

async function AsyncView() {
  return (
    <View />
  );
};

export default async function Page() {
  return (
    <Suspense fallback={<Ui.Loaders.Spinner />}>
      <AsyncView />
    </Suspense>
  );
}
