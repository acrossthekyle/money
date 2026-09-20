import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Suspense } from 'react';

import Ui from '@/ui';
import View from '@/views/login';

export const metadata: Metadata = {
  title: 'Login',
};

async function DataView() {
  const cookieStore = await cookies();

  const alert = cookieStore.get('alert')?.value || '';

  return (
    <View data={{ alert }} />
  );
};

export default async function Page() {
  return (
    <Suspense fallback={<Ui.Loaders.Spinner />}>
      <DataView />
    </Suspense>
  );
}
