'use client';

import type { StateCreator } from 'zustand';

import type { Store, StoreForecastsSlice } from '@/types';

type Slice = StateCreator<Store, [['zustand/immer', never]], [], StoreForecastsSlice>;

export type Get = Parameters<Slice>[1];
export type Set = Parameters<Slice>[0];
