import type { Metadata } from 'next';
import { Suspense } from 'react';

import { ForecastProvider } from '@/contexts';
import { get } from '@/getters/details';
import Ui from '@/ui';
import View from '@/views/portfolio-[id]';

type Params = Promise<{
  id: string;
}>;

type Props = {
  params: Params;
};

export const metadata: Metadata = {
  title: `Details ⌁ Portfolio`,
  description: ``,
};

async function AsyncView({ params }: Props) {
  const { id } = await params;

  const data = await get(id);

  return (
    <ForecastProvider
      holding={data.holding}
      transactions={data.transactions}
      zone={data.zone}
    >
      <View data={data} />
    </ForecastProvider>
  );
};

export default function Page({ params }: Props) {
  return (
    <Suspense fallback={<Ui.Loaders.Spinner />}>
      <AsyncView params={params} />
    </Suspense>
  );
};
