import type { Holding } from '@/types';

import { read } from '../read';

type Return = {
  holdings: Holding[];
};

export async function holdings(): Promise<Return> {
  const result = await read('holdings') as Holding[];

  return {
    holdings: result,
  };
}
