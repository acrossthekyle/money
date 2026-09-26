import type { Holding } from '@/types';

export function getHoldingMetaDataAsString(holding?: Holding) {
  if (!holding) {
    return '';
  }

  return [
    !!holding?.institution && `${holding?.institution}`,
    holding?.type.replace(/_/g, ' '),
    !!holding?.number && `(${holding?.number})`,
  ].filter(Boolean).join(' ');
}
