import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Suspense } from 'react';

import Ui from '@/ui';
import View from '@/views/login';

export const metadata: Metadata = {
  title: 'Login',
};

export default async function Page() {
  const cookieStore = await cookies();
  const alert = cookieStore.get('alert')?.value || '';

  return (
    <Suspense fallback={<Ui.Loaders.Spinner />}>
      <View data={{ alert }} />
    </Suspense>
  );
}
