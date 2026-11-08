import type { Metadata } from 'next';
import { Suspense } from 'react';

import Ui from '@/ui';
import View from '@/views/forecast';

export const metadata: Metadata = {
  title: `Details ⌁ Month ⌁ Calendar`,
  description: ``,
};

export default function Page() {
  return (
    <Suspense fallback={<Ui.Loaders.Spinner />}>
      <View />
    </Suspense>
  );
};
