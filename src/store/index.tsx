'use client';

import React, { createContext, useState } from 'react';

import type { StoreData } from '@/types';

import { create } from './create';
import { useSync } from './sync';
import type { StoreApi } from './types';

export const Context = createContext<StoreApi | null>(null);

type Props = {
  data: StoreData;
};

export default function Store({
  children,
  data,
}: React.PropsWithChildren<Props>) {
  const [store] = useState(() => create(data));

  const { isReady } = useSync(store);

  return (
    <Context.Provider value={store}>
      {isReady ? children : null}
    </Context.Provider>
  );
};
