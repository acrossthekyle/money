import type { StoreApi as ZustandStoreApi } from 'zustand';

import type { Store } from '@/types';

export type StoreApi = ZustandStoreApi<Store>;
