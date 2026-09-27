import type { Holding } from '@/types';

export function getHoldingMetaDataAsString(
  holding?: Holding,
  noNumber?: boolean,
) {
  if (!holding) {
    return '';
  }

  return [
    !!holding?.institution && `${holding?.institution} • `,
    holding?.type.replace(/_/g, ' '),
    !noNumber && !!holding?.number && `(${holding?.number})`,
  ].filter(Boolean).join(' ');
}
