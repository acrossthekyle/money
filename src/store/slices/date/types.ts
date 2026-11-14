'use client';

import type { StateCreator } from 'zustand';

import type { Store, StoreDateSlice } from '@/types';

type Slice = StateCreator<Store, [['zustand/immer', never]], [], StoreDateSlice>;

export type Get = Parameters<Slice>[1];
export type Set = Parameters<Slice>[0];
