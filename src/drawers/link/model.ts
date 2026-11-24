'use client';

import { useLink, useStore } from '@/hooks';
import type { DrawerLinkData } from '@/types';

export function useModel() {
  const {
    data,
    instance,
    isActive,
    isBase,
    isDecked,
  } = useLink<DrawerLinkData>();

  const {
    holdings,
  } = useStore();

  return {
    choices: holdings.select(),
    instance,
    isActive,
    isBase,
    isDecked,
    unsynced: data?.unsynced || [],
  };
};
