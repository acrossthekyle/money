import { PropsWithChildren, Suspense } from 'react';

import { AlgorithmProvider } from '@/contexts';
import { get as getBudgets } from '@/getters/budgets';
import { get as getHoldings } from '@/getters/holdings';
import { get as getSettings } from '@/getters/settings';

import { prepare } from './prepare';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Layout({
  children,
  params,
}: PropsWithChildren<Props>) {
  const { id } = await params;

  const { budgets } = await getBudgets();
  const { holdings } = await getHoldings();
  const { zone } = await getSettings();

  const { holding, transactions } = await prepare(holdings, budgets, id);

  return (
    <AlgorithmProvider
      holding={holding}
      transactions={transactions}
      zone={zone}
    >
      {children}
    </AlgorithmProvider>
  );
}
