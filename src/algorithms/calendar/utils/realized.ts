import type { Holding } from '@/types';

export function assignRealized(view: string | null, holdings: Holding[]) {
  if (view !== null) {
    return [view];
  }

  return [holdings[0].id];
}
