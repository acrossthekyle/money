'use client';

import type { StateCreator } from 'zustand';

import type { Store, StoreRootSlice } from '@/types';

type Slice = StateCreator<Store, [['zustand/immer', never]], [], StoreRootSlice>;

export type Get = Parameters<Slice>[1];
export type Set = Parameters<Slice>[0];
