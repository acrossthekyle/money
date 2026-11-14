'use server';

import { db } from '@/db';
import { get as getSettings } from '@/getters/settings';
import type {
  HoldingPinActionInput,
  HoldingPinActionResponse,
} from '@/types';

export async function pin(
  state: HoldingPinActionResponse | null,
  input: HoldingPinActionInput,
): Promise<HoldingPinActionResponse> {
  const { pinned } = await getSettings();

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
