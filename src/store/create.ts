'use client';

import { createStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import type { Store, StoreData } from '@/types';

import {
  createBudgetsSlice,
  createDateSlice,
  createForecastsSlice,
  createHoldingsSlice,
  createMenuSlice,
  createRootSlice,
} from './slices';

export function create(data: StoreData) {
  return createStore<Store, [['zustand/immer', never]]>(
    immer((set, get) => ({
      ...createBudgetsSlice(set, get, data.budgets),
      ...createDateSlice(set, get, data.zone),
      ...createForecastsSlice(set, get),
      ...createHoldingsSlice(set, get, data.holdings, data.pinned),
      ...createMenuSlice(set, get),
      ...createRootSlice(set, get),
    })),
  );
};
