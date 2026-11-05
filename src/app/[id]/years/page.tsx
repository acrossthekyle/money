import type { Metadata } from 'next';
import { Suspense } from 'react';

import Ui from '@/ui';
import View from '@/views/years';

export const metadata: Metadata = {
  title: `Details ⌁ Years ⌁ Calendar`,
  description: ``,
};

export default function Page() {
  return (
    <Suspense fallback={<Ui.Loaders.Spinner />}>
      <View />
    </Suspense>
  );
};
