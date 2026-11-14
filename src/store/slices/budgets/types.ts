'use client';

import type { StateCreator } from 'zustand';

import type { Store, StoreBudgetsSlice } from '@/types';

type Slice = StateCreator<Store, [['zustand/immer', never]], [], StoreBudgetsSlice>;

export type Get = Parameters<Slice>[1];
export type Set = Parameters<Slice>[0];
