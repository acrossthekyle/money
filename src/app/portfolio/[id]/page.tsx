import type { Metadata } from 'next';
import { Suspense } from 'react';

import { get as getHoldings } from '@/getters/holdings';
import Ui from '@/ui';
import View from '@/views/portfolio-[id]';

import { get } from './get';

type Params = Promise<{
  id: string;
}>;

type GenerateMetadata = {
  params: Params;
};

type Props = {
  params: Params;
};

export async function generateMetadata({
  params,
}: GenerateMetadata): Promise<Metadata> {
  const { id } = await params;

  const { holdings } = await getHoldings();

  const result = holdings.find(holding => holding.id === id);

  if (result === undefined) {
    return {
      title: '404 Not Found',
      description: 'That does not exist',
    };
  }

  return {
    title: `${result.name} ⌁ Portfolio`,
    description: ``,
  };
};

async function AsyncView({ params }: Props) {
  const { id } = await params;

  const data = await get(id);

  return <View data={data} />;
};

export default function Page({ params }: Props) {
  return (
    <Suspense fallback={<Ui.Loaders.Spinner />}>
      <AsyncView params={params} />
    </Suspense>
  );
};
