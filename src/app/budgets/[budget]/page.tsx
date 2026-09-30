import { Suspense } from 'react';

import Ui from '@/ui';
import View from '@/views/budgets-[budget]';

import { get } from './get';

type Params = Promise<{
  budget: string;
}>;

type Props = {
  params: Params;
};

async function AsyncView({ params }: Props) {
  const { budget } = await params;

  const data = await get(budget);

  return <View data={data} />;
};

export default function Page({ params }: Props) {
  return (
    <Suspense fallback={<Ui.Loaders.Spinner />}>
      <AsyncView params={params} />
    </Suspense>
  );
};
