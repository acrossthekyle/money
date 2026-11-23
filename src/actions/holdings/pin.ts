'use server';

import { db } from '@/db';
import type {
  HoldingPinActionInput,
  HoldingPinActionResponse,
} from '@/types';

export async function pin(
  state: HoldingPinActionResponse | null,
  input: HoldingPinActionInput,
): Promise<HoldingPinActionResponse> {
  const { pinned } = await db.tables.settings();

  const result = pinned === input.id ? '' : input.id;

  await db.write('settings', {
    id: 'pinned',
    value: result,
  });

  return {
    id: result,
    isSuccess: true,
  };
};
