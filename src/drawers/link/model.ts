'use client';

import { useLink } from '@/hooks';
import type { DrawerLinkData } from '@/types';

export function useModel() {
  const {
    input,
    instance,
    isActive,
    isBase,
    isDecked,
    onClose,
  } = useLink<DrawerLinkData>();

  return {
    instance,
    isActive,
    isBase,
    isDecked,
    onClose,
    unsynced: input?.unsynced || [],
  };
};
